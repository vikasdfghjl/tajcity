"use client";

import { useSyncExternalStore } from "react";
import {
  CLOCK_TICK_MS,
  PLAN_STORAGE_KEY,
  THEME_STORAGE_KEY,
  TOAST_DURATION_MS,
} from "@/config/constants";

/**
 * Tiny external stores shared across client islands. Each one reads on the client only
 * and reports a neutral server snapshot, so prerendering never touches the clock,
 * localStorage or matchMedia.
 */

type Listener = () => void;

function createStore<T>(initial: T) {
  let value = initial;
  const listeners = new Set<Listener>();
  return {
    get: () => value,
    set(next: T) {
      if (Object.is(next, value)) {
        return;
      }
      value = next;
      listeners.forEach((listener) => listener());
    },
    subscribe(listener: Listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private mode or storage full: the plan still works for this visit
  }
}

/* ---------- Clock ---------- */

const clock = createStore<number | null>(null);
let clockTimer: ReturnType<typeof setInterval> | undefined;

function subscribeClock(listener: Listener) {
  const unsubscribe = clock.subscribe(listener);
  if (!clockTimer) {
    clock.set(Date.now());
    clockTimer = setInterval(() => clock.set(Date.now()), CLOCK_TICK_MS);
  }
  return () => {
    unsubscribe();
  };
}

/** Current time, refreshed every 30 seconds. `null` during prerender and hydration. */
export function useNow(): Date | null {
  const now = useSyncExternalStore(subscribeClock, clock.get, () => null);
  return now === null ? null : new Date(now);
}

/* ---------- Theme ---------- */

export type Theme = "light" | "dark";

function subscribeTheme(listener: Listener) {
  const observer = new MutationObserver(listener);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function useTheme(): Theme | null {
  return useSyncExternalStore(subscribeTheme, getTheme, () => null);
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Theme still applies for this visit
  }
}

/* ---------- Plan (saved place ids, in visiting order) ---------- */

const EMPTY_PLAN: string[] = [];
const plan = createStore<string[]>(EMPTY_PLAN);
let planLoaded = false;

function subscribePlan(listener: Listener) {
  const unsubscribe = plan.subscribe(listener);
  if (!planLoaded) {
    planLoaded = true;
    plan.set(readStorage<string[]>(PLAN_STORAGE_KEY, EMPTY_PLAN));
  }
  const onStorage = (event: StorageEvent) => {
    if (event.key === PLAN_STORAGE_KEY) {
      plan.set(readStorage<string[]>(PLAN_STORAGE_KEY, EMPTY_PLAN));
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    unsubscribe();
    window.removeEventListener("storage", onStorage);
  };
}

function getPlan(): string[] {
  return plan.get();
}

export function usePlan(): string[] {
  return useSyncExternalStore(subscribePlan, getPlan, () => EMPTY_PLAN);
}

function commitPlan(next: string[]) {
  planLoaded = true;
  plan.set(next);
  writeStorage(PLAN_STORAGE_KEY, next);
}

export const planActions = {
  toggle(id: string) {
    const current = getPlan();
    commitPlan(current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  },
  remove(id: string) {
    commitPlan(getPlan().filter((item) => item !== id));
  },
  replace(ids: string[]) {
    commitPlan([...new Set(ids)]);
  },
  reorder(ids: string[]) {
    commitPlan(ids);
  },
  clear() {
    commitPlan(EMPTY_PLAN);
  },
};

/* ---------- Sheets (one open at a time) ---------- */

export type SheetState = { type: "place"; id: string } | { type: "plan" } | null;

const sheet = createStore<SheetState>(null);

export function useSheet(): SheetState {
  return useSyncExternalStore(sheet.subscribe, sheet.get, () => null);
}

// The element that opened the current sheet, so focus can return there on close
let sheetTrigger: HTMLElement | null = null;

function openSheet(next: Exclude<SheetState, null>) {
  if (sheet.get() === null && document.activeElement instanceof HTMLElement) {
    sheetTrigger = document.activeElement;
  }
  sheet.set(next);
}

export const sheetActions = {
  openPlace: (id: string) => openSheet({ type: "place", id }),
  openPlan: () => openSheet({ type: "plan" }),
  close: () => sheet.set(null),
  /** Hand focus back to whatever opened the sheet, if it is still on the page. */
  restoreFocus() {
    if (sheetTrigger?.isConnected) {
      sheetTrigger.focus({ preventScroll: true });
    }
    sheetTrigger = null;
  },
};

/* ---------- Toasts (one at a time, newest wins) ---------- */

export interface Toast {
  id: number;
  message: string;
  action?: { label: string; run: () => void };
}

const toast = createStore<Toast | null>(null);
let toastTimer: ReturnType<typeof setTimeout> | undefined;
let toastId = 0;

export function useToast(): Toast | null {
  return useSyncExternalStore(toast.subscribe, toast.get, () => null);
}

export function showToast(message: string, action?: Toast["action"]) {
  clearTimeout(toastTimer);
  toast.set({ id: ++toastId, message, action });
  toastTimer = setTimeout(() => toast.set(null), TOAST_DURATION_MS);
}

export function dismissToast() {
  clearTimeout(toastTimer);
  toast.set(null);
}

/* ---------- Media queries ---------- */

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (listener) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", listener);
      return () => list.removeEventListener("change", listener);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

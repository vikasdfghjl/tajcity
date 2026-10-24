"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { setTheme, useTheme } from "@/lib/stores";
import { cn } from "@/lib/cn";

const ICON_CLASS =
  "col-start-1 row-start-1 transition-[translate,rotate,opacity] duration-500 ease-out-expo";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={theme ? `Switch to ${next} theme` : "Switch theme"}
      className={cn(
        "relative grid size-11 place-items-center overflow-hidden rounded-full transition-transform active:scale-95",
        className,
      )}
    >
      {/* Both icons are in the first paint and the dark variant picks one, so nothing swaps on hydration */}
      <Moon
        size={20}
        weight="bold"
        aria-hidden="true"
        className={cn(ICON_CLASS, "dark:-translate-y-[18px] dark:rotate-[40deg] dark:opacity-0")}
      />
      <Sun
        size={20}
        weight="bold"
        aria-hidden="true"
        className={cn(
          ICON_CLASS,
          "translate-y-[18px] -rotate-[40deg] opacity-0 dark:translate-y-0 dark:rotate-0 dark:opacity-100",
        )}
      />
    </button>
  );
}

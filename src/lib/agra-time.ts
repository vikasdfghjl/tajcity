import { getMoonIllumination, getTimes } from "suncalc";

export const TAJ_COORDS = { lat: 27.1751, lng: 78.0421 } as const;

const IST_OFFSET_MINUTES = 330;
const MINUTE = 60_000;
const DAY = 24 * 60 * MINUTE;

const timeFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const dayFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  weekday: "short",
  day: "numeric",
  month: "short",
});

/** "06:31" in Agra time, regardless of the visitor's own time zone. */
export function formatIST(date: Date): string {
  return timeFormatter.format(date);
}

/** "Fri, 30 Oct" in Agra time. */
export function formatISTDay(date: Date): string {
  return dayFormatter.format(date);
}

/** Calendar parts of a moment as seen on a clock in Agra. */
function istParts(date: Date) {
  const shifted = new Date(date.getTime() + IST_OFFSET_MINUTES * MINUTE);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth(),
    day: shifted.getUTCDate(),
    weekday: shifted.getUTCDay(),
  };
}

/** 12:00 noon in Agra on the same Agra calendar day as `date`. */
function istNoon(date: Date, dayOffset = 0): Date {
  const { year, month, day } = istParts(date);
  return new Date(Date.UTC(year, month, day + dayOffset, 12) - IST_OFFSET_MINUTES * MINUTE);
}

export function isFridayInAgra(date: Date): boolean {
  return istParts(date).weekday === 5;
}

export interface TajDay {
  sunrise: Date;
  sunset: Date;
  /** Gates open 30 minutes before sunrise and close 30 minutes before sunset. */
  opens: Date;
  closes: Date;
  isFriday: boolean;
}

export function getTajDay(date: Date, dayOffset = 0): TajDay {
  const noon = istNoon(date, dayOffset);
  const { sunrise, sunset } = getTimes(noon, TAJ_COORDS.lat, TAJ_COORDS.lng);
  // Agra always has a sunrise and sunset; fall back to noon only to satisfy the types
  const rise = sunrise ?? noon;
  const set = sunset ?? noon;
  return {
    sunrise: rise,
    sunset: set,
    opens: new Date(rise.getTime() - 30 * MINUTE),
    closes: new Date(set.getTime() - 30 * MINUTE),
    isFriday: isFridayInAgra(noon),
  };
}

export type TajStatus =
  | { kind: "open"; closes: Date; minutesLeft: number }
  | { kind: "opens-later"; opens: Date }
  | { kind: "closed-friday"; nextOpen: Date }
  | { kind: "closed-tonight"; nextOpen: Date };

function nextOpeningAfter(date: Date): Date {
  for (let offset = 1; offset <= 7; offset++) {
    const day = getTajDay(date, offset);
    if (!day.isFriday) {
      return day.opens;
    }
  }
  return getTajDay(date, 1).opens;
}

export function getTajStatus(now: Date): TajStatus {
  const today = getTajDay(now);
  if (today.isFriday) {
    return { kind: "closed-friday", nextOpen: nextOpeningAfter(now) };
  }
  if (now < today.opens) {
    return { kind: "opens-later", opens: today.opens };
  }
  if (now < today.closes) {
    const minutesLeft = Math.round((today.closes.getTime() - now.getTime()) / MINUTE);
    return { kind: "open", closes: today.closes, minutesLeft };
  }
  return { kind: "closed-tonight", nextOpen: nextOpeningAfter(now) };
}

/** Next date (on or after today) that is a Friday in Agra. */
export function nextFriday(now: Date): Date {
  for (let offset = 0; offset < 7; offset++) {
    const noon = istNoon(now, offset);
    if (isFridayInAgra(noon)) {
      return noon;
    }
  }
  return istNoon(now, 7);
}

export interface NightViewing {
  fullMoon: Date;
  /** The five nights around the full moon, minus Fridays. */
  nights: Date[];
  isTonight: boolean;
}

/**
 * Night viewing runs on the full moon night and the two nights either side,
 * except Fridays and the month of Ramadan (which we cannot compute, so we say so in the UI).
 */
export function getNextNightViewing(now: Date): NightViewing {
  const start = istNoon(now, -2).getTime();
  let fullMoon = new Date(start);
  let previousPhase = getMoonIllumination(new Date(start)).phase;

  // Step through the next ~33 days in 2-hour steps and catch the moment the phase crosses 0.5
  for (let t = start + 2 * 60 * MINUTE; t < start + 33 * DAY; t += 2 * 60 * MINUTE) {
    const phase = getMoonIllumination(new Date(t)).phase;
    if (previousPhase < 0.5 && phase >= 0.5) {
      fullMoon = new Date(t);
      break;
    }
    previousPhase = phase;
  }

  const nights = [-2, -1, 0, 1, 2]
    .map((offset) => istNoon(fullMoon, offset))
    .filter((night) => !isFridayInAgra(night));

  const lastNight = nights[nights.length - 1];
  // If this window is already over, look for the next one
  if (lastNight && istNoon(now).getTime() > lastNight.getTime()) {
    return getNextNightViewing(new Date(fullMoon.getTime() + 10 * DAY));
  }

  const todayNoon = istNoon(now).getTime();
  return {
    fullMoon,
    nights,
    isTonight: nights.some((night) => night.getTime() === todayNoon),
  };
}

/** Decimal hour of the day in Agra, e.g. 6.5 for 06:30. */
export function istHour(date: Date): number {
  const shifted = new Date(date.getTime() + IST_OFFSET_MINUTES * MINUTE);
  return shifted.getUTCHours() + shifted.getUTCMinutes() / 60;
}

/** "6:15" style label for a decimal hour on the dial. */
export function formatDecimalHour(hour: number): string {
  const wrapped = ((hour % 24) + 24) % 24;
  const h = Math.floor(wrapped);
  const m = Math.round((wrapped - h) * 60);
  const safeH = m === 60 ? h + 1 : h;
  const safeM = m === 60 ? 0 : m;
  return `${String(safeH % 24).padStart(2, "0")}:${String(safeM).padStart(2, "0")}`;
}

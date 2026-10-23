"use client";

import { MoonStars, SunHorizon, Sun } from "@phosphor-icons/react";
import {
  formatIST,
  formatISTDay,
  getNextNightViewing,
  getTajDay,
  getTajStatus,
  type TajStatus,
} from "@/lib/agra-time";
import { useNow } from "@/lib/stores";
import { cn } from "@/lib/cn";

function describe(status: TajStatus): { headline: string; detail: string; isOpen: boolean } {
  switch (status.kind) {
    case "open": {
      const hours = Math.floor(status.minutesLeft / 60);
      const minutes = status.minutesLeft % 60;
      const left = hours > 0 ? `${hours} h ${minutes} min` : `${minutes} min`;
      return {
        headline: "The Taj is open",
        detail: `Gates close at ${formatIST(status.closes)}, ${left} from now`,
        isOpen: true,
      };
    }
    case "opens-later":
      return {
        headline: `Opens at ${formatIST(status.opens)}`,
        detail: "Half an hour before sunrise. Queue early at the East Gate.",
        isOpen: false,
      };
    case "closed-friday":
      return {
        headline: "Closed today, it's Friday",
        detail: `Reopens ${formatISTDay(status.nextOpen)} at ${formatIST(status.nextOpen)}`,
        isOpen: false,
      };
    case "closed-tonight":
      return {
        headline: "Closed for the day",
        detail: `Reopens ${formatISTDay(status.nextOpen)} at ${formatIST(status.nextOpen)}`,
        isOpen: false,
      };
  }
}

function nightLabel(nights: Date[], isTonight: boolean): string {
  if (isTonight) {
    return "Tonight";
  }
  const first = nights[0];
  const last = nights[nights.length - 1];
  if (!first || !last) {
    return "Next full moon";
  }
  // formatISTDay gives "Tue, 3 Nov"; keep "3 Nov"
  const [firstDay, firstMonth] = (formatISTDay(first).split(", ")[1] ?? "").split(" ");
  const lastLabel = formatISTDay(last).split(", ")[1] ?? "";
  if (first.getTime() === last.getTime()) {
    return lastLabel;
  }
  return lastLabel.endsWith(firstMonth ?? "")
    ? `${firstDay}-${lastLabel}`
    : `${firstDay} ${firstMonth}-${lastLabel}`;
}

/** Live opening status for the Taj, computed from today's sunrise and sunset in Agra. */
export function LiveStatus() {
  const now = useNow();

  if (!now) {
    return (
      <div
        aria-hidden="true"
        className="h-[184px] rounded-[20px] border border-white/15 bg-black/30 backdrop-blur-md"
      />
    );
  }

  const status = getTajStatus(now);
  const today = getTajDay(now);
  const night = getNextNightViewing(now);
  const { headline, detail, isOpen } = describe(status);

  return (
    <section
      aria-label="Taj Mahal status right now"
      className="rounded-[20px] border border-white/15 bg-black/30 p-4 backdrop-blur-md sm:p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="relative mt-1.5 flex size-2.5 shrink-0">
            {isOpen && (
              <span className="absolute inset-0 animate-live-ping rounded-full bg-[#5fd39a]" />
            )}
            <span
              className={cn(
                "relative size-2.5 rounded-full",
                isOpen ? "bg-[#5fd39a]" : "bg-[#ff8f85]",
              )}
            />
          </span>
          <div>
            <p className="text-[17px] leading-tight font-semibold">{headline}</p>
            <p className="mt-1 text-sm leading-snug text-white/75">{detail}</p>
          </div>
        </div>
        <p className="shrink-0 font-mono text-xs text-white/60">{formatIST(now)} IST</p>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-white/15 pt-4">
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-white/65">
            <SunHorizon size={14} weight="bold" aria-hidden="true" />
            Sunrise
          </dt>
          <dd className="mt-1 font-mono text-[15px]">{formatIST(today.sunrise)}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-white/65">
            <Sun size={14} weight="bold" aria-hidden="true" />
            Sunset
          </dt>
          <dd className="mt-1 font-mono text-[15px]">{formatIST(today.sunset)}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-xs text-white/65">
            <MoonStars size={14} weight="bold" aria-hidden="true" />
            Night view
          </dt>
          <dd className="mt-1 font-mono text-[15px]">
            {nightLabel(night.nights, night.isTonight)}
          </dd>
        </div>
      </dl>
    </section>
  );
}

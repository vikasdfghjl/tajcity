"use client";

import { CalendarX } from "@phosphor-icons/react";
import { formatISTDay, isFridayInAgra, nextFriday } from "@/lib/agra-time";
import { useNow } from "@/lib/stores";

export function FridayTile() {
  const now = useNow();
  const isFriday = now ? isFridayInAgra(now) : false;
  const upcoming = now ? nextFriday(now) : null;

  return (
    <div className="flex h-full flex-col justify-between gap-10 rounded-card bg-accent p-6 text-accent-ink sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <CalendarX size={32} aria-hidden="true" />
        <p
          className="rounded-full bg-accent-ink/15 px-3 py-1.5 font-mono text-xs"
          aria-live="polite"
        >
          {now === null ? " " : isFriday ? "Today is a Friday" : `Next: ${formatISTDay(upcoming!)}`}
        </p>
      </div>
      <div>
        <h3 className="text-[2rem] leading-[1.02] font-semibold sm:text-[2.6rem]">
          The Taj is closed every Friday.
        </h3>
        <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed opacity-85">
          Only worshippers attend the afternoon prayer. On a Friday, do Agra Fort and the Baby Taj
          by day, then watch the sunset over the Taj from Mehtab Bagh across the river.
        </p>
      </div>
    </div>
  );
}

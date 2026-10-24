"use client";

import { FACTS_CHECKED_ON, IST_TIME_ZONE, MONTH_VERDICT_LABEL } from "@/config/constants";
import { useState } from "react";
import { GuideAnswer } from "@/components/guide/GuideAnswer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Segmented } from "@/components/ui/Segmented";
import { AGRA_CLIMATE, GUIDE_TOPICS } from "@/data/guide";
import type { MonthVerdict } from "@/data/types";
import { useNow } from "@/lib/stores";
import { cn } from "@/lib/cn";

const VERDICT_SWATCH: Record<MonthVerdict, string> = {
  best: "bg-open",
  good: "bg-open/45",
  fog: "bg-ink-3",
  hot: "bg-closed",
  wet: "bg-accent",
};

const istMonthIndex = (date: Date) =>
  Number(
    new Intl.DateTimeFormat("en-IN", { timeZone: IST_TIME_ZONE, month: "numeric" }).format(date),
  ) - 1;

/** Twelve months of IMD normals. Opens on this month in Agra; tap any month for its note. */
function ClimateStrip() {
  const now = useNow();
  const [picked, setPicked] = useState<number | null>(null);
  const current = now ? istMonthIndex(now) : null;
  const shown = picked ?? current;
  const month = shown === null ? null : AGRA_CLIMATE[shown];

  return (
    <div className="rounded-card border border-line bg-surface p-4 sm:p-5">
      <h3 className="text-sm font-semibold">Month by month</h3>
      <div role="group" aria-label="Months" className="mt-3 grid grid-cols-6 gap-1.5">
        {AGRA_CLIMATE.map((item, index) => (
          <button
            key={item.month}
            type="button"
            aria-pressed={index === shown}
            onClick={() => setPicked(index)}
            className={cn(
              "flex min-h-14 flex-col items-center justify-center gap-1 rounded-[10px] border transition-colors",
              index === shown
                ? "border-accent bg-accent-soft"
                : "border-transparent hover:bg-sunken",
            )}
          >
            <span className="text-xs font-medium text-ink-2">
              {item.month}
              <span className="sr-only">, {MONTH_VERDICT_LABEL[item.verdict]}</span>
            </span>
            <span className="font-mono text-sm">{item.high}°</span>
            <span
              aria-hidden="true"
              className={cn("h-1 w-5 rounded-full", VERDICT_SWATCH[item.verdict])}
            />
          </button>
        ))}
      </div>

      <p className="mt-4 min-h-[3.5rem] text-[15px] leading-snug" aria-live="polite">
        {month && (
          <>
            <span className="font-semibold">
              {month.month}
              {shown === current && " (now)"}:
            </span>{" "}
            <span className="font-mono text-sm text-ink-2">
              {month.high}° / {month.low}°, {month.rainMm} mm
            </span>
            <span className="mt-1 block text-ink-2">{month.note}.</span>
          </>
        )}
      </p>

      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-line pt-3 text-xs text-ink-3">
        {(Object.keys(VERDICT_SWATCH) as MonthVerdict[]).map((verdict) => (
          <li key={verdict} className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className={cn("h-1 w-4 rounded-full", VERDICT_SWATCH[verdict])}
            />
            {MONTH_VERDICT_LABEL[verdict]}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-ink-3">Average daily high and low, IMD 1991–2020.</p>
    </div>
  );
}

export function VisitorGuide() {
  const [topicId, setTopicId] = useState(GUIDE_TOPICS[0].id);
  const topic = GUIDE_TOPICS.find((item) => item.id === topicId) ?? GUIDE_TOPICS[0];

  return (
    <section id="guide" aria-labelledby="guide-title" className="scroll-mt-16 py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <SectionHeading
          id="guide"
          title="Your Agra questions, answered"
          intro="Getting here and around, touts, guides, the gates and the weather. Answered from the official Taj site and checked sources, with each one linked."
        />

        <Segmented
          label="Topic"
          value={topicId}
          onChange={setTopicId}
          options={GUIDE_TOPICS.map((item) => ({ value: item.id, label: item.label }))}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-24">
              <p className="text-xl leading-snug font-semibold sm:text-2xl">{topic.intro}</p>
              {topic.id === "weather" && <ClimateStrip />}
              <p className="text-xs text-ink-3">
                Checked {FACTS_CHECKED_ON}. Rules and prices change; confirm on the day.
              </p>
            </div>
          </div>

          {/* Keyed by topic so each topic opens fresh, with its first answer expanded */}
          <div key={topic.id} className="min-w-0 border-t border-line lg:col-span-8">
            {topic.entries.map((entry, index) => (
              <GuideAnswer key={entry.question} entry={entry} open={index === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

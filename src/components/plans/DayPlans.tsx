"use client";

import { ArrowUpRight, Lightbulb, ListChecks } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { photoUrl } from "@/components/ui/CommonsImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Segmented } from "@/components/ui/Segmented";
import { ITINERARY_PRESETS } from "@/data/agraData";
import { getPlace } from "@/data/places";
import { planActions, sheetActions, showToast, usePlan } from "@/lib/stores";

type PresetId = string;

const TAB_LABEL: Record<string, string> = {
  "1-day-express": "One day",
  "2-day-royal": "Two days",
  "foodie-trail": "Food trail",
};

export function DayPlans() {
  const [presetId, setPresetId] = useState<PresetId>(ITINERARY_PRESETS[0].id);
  const plan = usePlan();
  const preset = ITINERARY_PRESETS.find((item) => item.id === presetId) ?? ITINERARY_PRESETS[0];

  const applyPreset = () => {
    const previous = [...plan];
    const ids = preset.stops.map((stop) => stop.placeId).filter((id) => getPlace(id));
    planActions.replace(ids);
    sheetActions.openPlan();
    if (previous.length > 0) {
      showToast("Your day was replaced", {
        label: "Undo",
        run: () => planActions.replace(previous),
      });
    }
  };

  return (
    <section id="plans" aria-labelledby="plans-title" className="scroll-mt-16 py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <SectionHeading
          id="plans"
          title="Ready-made days"
          intro="Routed to beat the traffic and land every monument in its best light. Use one as it is, or load it and reorder it to suit you."
        />

        <Segmented
          label="Choose a plan"
          value={presetId}
          onChange={setPresetId}
          options={ITINERARY_PRESETS.map((item) => ({
            value: item.id,
            label: TAB_LABEL[item.id] ?? item.badge,
          }))}
          className="mb-10"
        />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={preset.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-10 lg:grid-cols-12 lg:gap-16"
          >
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <h3 className="text-[1.75rem] leading-tight font-semibold">{preset.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{preset.summary}</p>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-line py-5">
                  <div>
                    <dt className="text-xs text-ink-3">How long</dt>
                    <dd className="mt-1 text-sm font-medium">{preset.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-3">Budget per person</dt>
                    <dd className="mt-1 font-mono text-sm">
                      {preset.estimatedBudget.split(" (")[0].replace(" per person", "")}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-xs text-ink-3">Best for</dt>
                    <dd className="mt-1 text-sm">{preset.idealFor}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={applyPreset}
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-[15px] font-semibold text-accent-ink transition-transform active:scale-[0.98] sm:w-auto"
                >
                  <ListChecks size={18} weight="bold" />
                  Use this plan
                </button>
              </div>
            </div>

            <ol className="relative lg:col-span-8">
              <span
                aria-hidden="true"
                className="absolute top-3 bottom-3 left-[4.75rem] w-px bg-line sm:left-[5.75rem]"
              />
              {preset.stops.map((stop, index) => {
                const place = getPlace(stop.placeId);
                const startTime = stop.time.split(" - ")[0];
                return (
                  <motion.li
                    key={`${stop.placeId}-${index}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative grid grid-cols-[4rem_1fr] gap-6 pb-10 last:pb-0 sm:grid-cols-[5rem_1fr]"
                  >
                    <time className="pt-0.5 text-right font-mono text-sm text-ink-3">
                      {startTime}
                    </time>
                    <span
                      aria-hidden="true"
                      className="absolute top-2 left-[4.75rem] size-2.5 -translate-x-1/2 rounded-full bg-accent ring-4 ring-bg sm:left-[5.75rem]"
                    />
                    <div className="pl-2">
                      <div className="flex items-start gap-4">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-lg leading-snug font-semibold">{stop.title}</h4>
                          <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
                            {stop.activity}
                          </p>
                        </div>
                        {place?.photo && (
                          // oxlint-disable-next-line nextjs/no-img-element -- Commons thumbnail, see CommonsImage
                          <img
                            src={photoUrl(place.photo, 330)}
                            alt=""
                            loading="lazy"
                            className="hidden size-20 shrink-0 rounded-tile object-cover sm:block"
                          />
                        )}
                      </div>
                      <p className="mt-3 flex gap-2 text-sm leading-snug text-ink-2">
                        <Lightbulb size={18} className="shrink-0 text-accent" aria-hidden="true" />
                        {stop.tip}
                      </p>
                      {place && (
                        <button
                          type="button"
                          onClick={() => sheetActions.openPlace(place.id)}
                          className="mt-3 inline-flex min-h-10 items-center gap-1 rounded-full text-sm font-semibold text-accent hover:underline"
                        >
                          About {place.name.split(" (")[0]}
                          <ArrowUpRight size={14} weight="bold" />
                        </button>
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

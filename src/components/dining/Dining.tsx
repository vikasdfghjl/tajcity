"use client";

import { DEFAULT_MEAL, MEAL_TABS, PRICE_LEVEL_LABEL } from "@/config/constants";
import { Buildings, Eye } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AddToPlanButton } from "@/components/ui/AddToPlanButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Segmented } from "@/components/ui/Segmented";
import { PLACES, distanceFromTajKm, shortHours, type Meal, type Place } from "@/data/places";
import { istHour } from "@/lib/agra-time";
import { sheetActions, useNow } from "@/lib/stores";
import { cn } from "@/lib/cn";

/** Cards shown before "Show all", so a long dinner list doesn't bury the map below it. */
const INITIAL_VISIBLE = 6;

type DiningPlace = Place & { dining: NonNullable<Place["dining"]> };

// Closest to the Taj first, which is how most visitors pick where to eat next
const DINING: DiningPlace[] = PLACES.filter((place): place is DiningPlace => !!place.dining).sort(
  (a, b) => distanceFromTajKm(a) - distanceFromTajKm(b),
);

/** The meal that is on (or next up) at this IST hour. */
function mealAt(hour: number): Meal {
  let meal: Meal = MEAL_TABS[0].value;
  for (const tab of MEAL_TABS) {
    if (hour >= tab.from) {
      meal = tab.value;
    }
  }
  return meal;
}

function mealLabel(meal: Meal): string {
  return MEAL_TABS.find((tab) => tab.value === meal)?.label ?? meal;
}

function listMeals(meals: Meal[]): string {
  const labels = MEAL_TABS.filter((tab) => meals.includes(tab.value)).map((tab) =>
    tab.label.toLowerCase(),
  );
  return labels.length > 1
    ? `${labels.slice(0, -1).join(", ")} and ${labels[labels.length - 1]}`
    : (labels[0] ?? "");
}

function FilterToggle({
  pressed,
  onToggle,
  children,
}: {
  pressed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onToggle}
      className={cn(
        "inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-[transform,color,background-color,border-color] active:scale-95",
        pressed
          ? "border-accent bg-accent-soft text-accent"
          : "border-line text-ink-2 hover:border-ink-3 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

/** India's vegetarian mark: a green dot in a green square. */
function VegMark() {
  return (
    <span
      aria-hidden="true"
      className="grid size-3.5 shrink-0 place-items-center rounded-[3px] border-[1.5px] border-open"
    >
      <span className="size-1.5 rounded-full bg-open" />
    </span>
  );
}

/** The day as five segments, filled where the place serves that meal. */
function MealStrip({ meals, active }: { meals: Meal[]; active: Meal }) {
  return (
    <div className="flex shrink-0 gap-1">
      <span className="sr-only">Serves {listMeals(meals)}</span>
      {MEAL_TABS.map((tab) => {
        const serves = meals.includes(tab.value);
        return (
          <span
            key={tab.value}
            aria-hidden="true"
            title={tab.label}
            className={cn(
              "h-1.5 w-4 rounded-full",
              !serves && "bg-sunken",
              serves && (tab.value === active ? "bg-accent" : "bg-ink-3/45"),
            )}
          />
        );
      })}
    </div>
  );
}

function DiningCard({ place, meal }: { place: DiningPlace; meal: Meal }) {
  const { dining } = place;
  return (
    <article className="group relative flex flex-col rounded-card border border-line bg-surface p-4 transition-[border-color,box-shadow] duration-300 hover:border-ink-3 hover:shadow-card sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-mono text-xs text-ink-3">
            {dining.cuisine} · {place.distanceFromTaj.split(" (")[0]}
          </p>
          <h3 className="mt-1.5 text-lg leading-tight font-semibold">
            <button
              type="button"
              onClick={() => sheetActions.openPlace(place.id)}
              className="text-left after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
            >
              {place.name}
            </button>
          </h3>
        </div>
        <AddToPlanButton id={place.id} />
      </div>

      <p className="mt-2 line-clamp-2 text-[15px] leading-snug text-ink-2">{place.tagline}</p>

      <ul className="mt-4 flex flex-wrap items-center gap-1.5 text-xs font-medium">
        <li className="rounded-full bg-sunken px-2.5 py-1 font-mono text-ink">
          <span aria-hidden="true">
            {"₹".repeat(dining.priceLevel)}
            <span className="text-ink-3/50">{"₹".repeat(4 - dining.priceLevel)}</span>
          </span>
          <span className="sr-only">{PRICE_LEVEL_LABEL[dining.priceLevel]}</span>
        </li>
        {dining.pureVeg && (
          <li className="flex items-center gap-1.5 rounded-full bg-sunken px-2.5 py-1 text-ink-2">
            <VegMark />
            Pure veg
          </li>
        )}
        {dining.tajView && (
          <li className="flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-1 text-accent">
            <Eye size={14} weight="bold" aria-hidden="true" />
            Taj view
          </li>
        )}
        {dining.rooftop && (
          <li className="flex items-center gap-1 rounded-full bg-sunken px-2.5 py-1 text-ink-2">
            <Buildings size={14} weight="bold" aria-hidden="true" />
            Rooftop
          </li>
        )}
      </ul>

      {/* Pinned to the bottom so strips line up across a row of uneven cards */}
      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between gap-3 border-t border-line pt-3.5">
          <MealStrip meals={dining.meals} active={meal} />
          <p className="truncate font-mono text-xs text-ink-3">{shortHours(place)}</p>
        </div>
      </div>
    </article>
  );
}

export function Dining() {
  const now = useNow();
  const [picked, setPicked] = useState<Meal | null>(null);
  const [pureVeg, setPureVeg] = useState(false);
  const [tajView, setTajView] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Until the visitor picks, open on the meal that's on now in Agra
  const current = now ? mealAt(istHour(now)) : DEFAULT_MEAL;
  const meal = picked ?? current;

  const matchesToggles = (place: DiningPlace) =>
    (!pureVeg || place.dining.pureVeg) && (!tajView || place.dining.tajView);
  const results = DINING.filter(
    (place) => place.dining.meals.includes(meal) && matchesToggles(place),
  );
  const shown = expanded ? results : results.slice(0, INITIAL_VISIBLE);
  const filterKey = `${meal}-${pureVeg}-${tajView}`;

  const resetExpanded = () => setExpanded(false);

  return (
    <section id="eat" aria-labelledby="eat-title" className="scroll-mt-16 py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <SectionHeading
          id="eat"
          title="Where to eat, meal by meal"
          intro="From ghee parathas at dawn to frontier grills at night: sixteen restaurants and cafés, closest to the Taj first. For street food and petha, see Explore."
        />

        <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Segmented
            label="Meal"
            value={meal}
            onChange={(value) => {
              setPicked(value);
              resetExpanded();
            }}
            options={MEAL_TABS.map((tab) => ({
              value: tab.value,
              label: tab.label,
              count: DINING.filter(
                (place) => place.dining.meals.includes(tab.value) && matchesToggles(place),
              ).length,
            }))}
            className="self-start"
          />
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
            <FilterToggle
              pressed={pureVeg}
              onToggle={() => {
                setPureVeg(!pureVeg);
                resetExpanded();
              }}
            >
              <VegMark />
              Pure veg
            </FilterToggle>
            <FilterToggle
              pressed={tajView}
              onToggle={() => {
                setTajView(!tajView);
                resetExpanded();
              }}
            >
              <Eye size={16} weight="bold" aria-hidden="true" />
              Taj view
            </FilterToggle>
          </div>
        </div>

        <p className="mb-6 font-mono text-xs text-ink-3" aria-live="polite">
          {results.length} {results.length === 1 ? "place" : "places"} for{" "}
          {mealLabel(meal).toLowerCase()}
          {now && !picked && " · on now in Agra"}
        </p>

        {results.length === 0 ? (
          <div className="rounded-card border border-dashed border-line px-6 py-14 text-center">
            <p className="text-xl font-semibold">Nothing fits all of that</p>
            <p className="mx-auto mt-2 max-w-sm text-ink-2">
              No {pureVeg ? "pure-veg " : ""}
              {tajView ? "Taj-view " : ""}spot here serves {mealLabel(meal).toLowerCase()}. Try
              another meal or drop a filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setPureVeg(false);
                setTajView(false);
                resetExpanded();
              }}
              className="mt-6 min-h-11 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={filterKey}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5"
              >
                {shown.map((place) => (
                  <DiningCard key={place.id} place={place} meal={meal} />
                ))}
              </motion.div>
            </AnimatePresence>
            {results.length > INITIAL_VISIBLE && (
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                className="mx-auto mt-6 flex min-h-11 items-center rounded-full border border-line px-5 text-sm font-semibold transition-colors hover:border-ink-3"
              >
                {expanded
                  ? "Show fewer"
                  : `Show all ${results.length} for ${mealLabel(meal).toLowerCase()}`}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}

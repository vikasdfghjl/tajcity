"use client";

import { EXPLORE_TABS } from "@/config/constants";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useDeferredValue, useState } from "react";
import { PlaceCard } from "@/components/explore/PlaceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Segmented } from "@/components/ui/Segmented";
import { PLACES, type Place, type PlaceKind } from "@/data/places";
import { cn } from "@/lib/cn";

function matches(place: Place, query: string): boolean {
  const haystack = [
    place.name,
    place.tagline,
    place.description,
    ...place.tags,
    ...place.mustTryOrSee,
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

export function Explore() {
  const [kind, setKind] = useState<PlaceKind>("monument");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim());
  const isSearching = deferredQuery.length > 0;

  const results = isSearching
    ? PLACES.filter((place) => matches(place, deferredQuery))
    : PLACES.filter((place) => place.kind === kind);

  // Six results get the asymmetric layout: one tall feature beside five supporting cards
  const useFeatureGrid = !isSearching && results.length === 6;

  return (
    <section id="explore" aria-labelledby="explore-title" className="scroll-mt-16 py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <SectionHeading
          id="explore"
          title="Where to go, what to eat"
          intro="Six monuments, six food institutions and two craft stops. Tap any of them for hours, fees and the local trick, or add it straight to your day."
        />

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Segmented
            label="Category"
            value={kind}
            onChange={(value) => {
              setKind(value);
              setQuery("");
            }}
            options={EXPLORE_TABS.map((option) => ({
              ...option,
              count: PLACES.filter((place) => place.kind === option.value).length,
            }))}
            className={cn(isSearching && "opacity-50")}
          />

          <div className="relative w-full sm:max-w-xs">
            <label htmlFor="explore-search" className="sr-only">
              Search places and dishes
            </label>
            <MagnifyingGlass
              size={18}
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-3"
              aria-hidden="true"
            />
            <input
              id="explore-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try petha, sunset, Akbar"
              autoComplete="off"
              className="min-h-12 w-full rounded-full border border-line bg-surface pr-12 pl-11 text-[15px] text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-1.5 grid size-9 -translate-y-1/2 place-items-center rounded-full text-ink-3 hover:bg-sunken hover:text-ink"
              >
                <X size={16} weight="bold" />
              </button>
            )}
          </div>
        </div>

        {isSearching && (
          <p className="mb-5 font-mono text-sm text-ink-3" aria-live="polite">
            {results.length} {results.length === 1 ? "match" : "matches"} for &ldquo;{deferredQuery}
            &rdquo;
          </p>
        )}

        {results.length === 0 ? (
          <div className="rounded-card border border-dashed border-line px-6 py-16 text-center">
            <p className="text-xl font-semibold">Nothing matches that yet</p>
            <p className="mx-auto mt-2 max-w-sm text-ink-2">
              Try a dish like jalebi or a place like Sikandra, or clear the search to browse by
              category.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-6 min-h-11 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink"
            >
              Clear search
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isSearching ? `q-${deferredQuery}` : kind}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2",
                "lg:mx-0 lg:grid lg:snap-none lg:gap-x-6 lg:gap-y-10 lg:overflow-visible lg:px-0",
                results.length <= 2 ? "lg:grid-cols-2" : "lg:grid-cols-3",
                useFeatureGrid && "lg:grid-rows-[auto_auto_auto]",
              )}
            >
              {results.map((place, index) => {
                const featured = useFeatureGrid && index === 0;
                return (
                  <PlaceCard
                    key={place.id}
                    place={place}
                    featured={featured}
                    className={cn(
                      "w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-auto",
                      featured && "lg:col-span-2 lg:row-span-2",
                    )}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

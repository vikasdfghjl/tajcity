"use client";

import { MAP_LOAD_MARGIN, PLACE_KIND_LABEL, TAJ_PLACE_ID } from "@/config/constants";
import { ArrowRight, CaretRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useInView } from "motion/react";
import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Segmented } from "@/components/ui/Segmented";
import { ROUTES_FROM_TAJ } from "@/data/transit";
import { PLACES, directionsUrl, distanceFromTajKm, type Place } from "@/data/places";
import { sheetActions, useTheme } from "@/lib/stores";
import { cn } from "@/lib/cn";

const AgraMap = dynamic(() => import("@/components/map/AgraMap"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

function MapSkeleton() {
  return <div className="h-full w-full animate-pulse bg-sunken" aria-hidden="true" />;
}

type Filter = "all" | "monument" | "eat";

// Everything sorted by how far it is from the Taj, which is how people plan a day here
const ORDERED: Place[] = [...PLACES].sort((a, b) => distanceFromTajKm(a) - distanceFromTajKm(b));

/** Road time from the Taj when we have it, otherwise the distance note from the place data. */
function travelNote(place: Place): string {
  const route = ROUTES_FROM_TAJ.find((row) => row.toId === place.id);
  if (place.id === TAJ_PLACE_ID) return "Start here";
  return route ? `${route.distance}, ${route.time}` : place.distanceFromTaj.split(" (")[0];
}

export function MapSection() {
  const theme = useTheme();
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const isNear = useInView(frameRef, { once: true, margin: MAP_LOAD_MARGIN });

  const visible = useMemo(
    () =>
      ORDERED.filter((place) =>
        filter === "all"
          ? true
          : filter === "monument"
            ? place.kind === "monument"
            : place.kind !== "monument",
      ),
    [filter],
  );
  const visibleIds = useMemo(() => new Set(visible.map((place) => place.id)), [visible]);
  const selected = ORDERED.find((place) => place.id === selectedId) ?? null;

  const select = (id: string) => {
    setSelectedId(id);
    // Scroll only the list (sideways on phones, down on desktop), never the page
    const list = listRef.current;
    const item = document.getElementById(`map-item-${id}`);
    if (list && item) {
      list.scrollTo({ left: item.offsetLeft - 16, top: item.offsetTop - 8, behavior: "smooth" });
    }
  };

  return (
    <section
      id="map"
      aria-labelledby="map-title"
      className="scroll-mt-16 bg-sunken/60 py-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <SectionHeading
          id="map"
          title="Everything, measured from the Taj"
          intro="Numbered by distance from the East Gate. Monument pins are exact; food and craft pins mark the neighbourhood, and Directions takes you to the door."
        />

        <Segmented
          label="Show on map"
          value={filter}
          onChange={(value) => {
            setFilter(value);
            setSelectedId(null);
          }}
          options={[
            { value: "all", label: "Everything" },
            { value: "monument", label: "Monuments" },
            { value: "eat", label: "Food, dining and craft" },
          ]}
          className="mb-6"
        />

        <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
          <div
            ref={frameRef}
            className="relative h-[58svh] min-h-[380px] overflow-hidden rounded-card border border-line bg-sunken lg:col-span-8 lg:h-[680px]"
          >
            {isNear && theme && (
              <AgraMap
                places={ORDERED}
                visibleIds={visibleIds}
                selectedId={selectedId}
                theme={theme}
                onSelect={select}
              />
            )}

            <AnimatePresence>
              {selected && (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="glass absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-tile border border-line p-3 shadow-card sm:inset-x-auto sm:left-3 sm:w-[360px]"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{selected.name}</p>
                    <p className="truncate font-mono text-xs text-ink-3">{travelNote(selected)}</p>
                  </div>
                  <a
                    href={directionsUrl(selected)}
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-10 shrink-0 rounded-full border border-line px-3.5 py-2 text-sm font-semibold"
                  >
                    Directions
                  </a>
                  <button
                    type="button"
                    onClick={() => sheetActions.openPlace(selected.id)}
                    aria-label={`Open details for ${selected.name}`}
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-accent-ink"
                  >
                    <ArrowRight size={18} weight="bold" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ol
            ref={listRef}
            aria-label="Places by distance from the Taj"
            className="no-scrollbar relative -mx-4 flex snap-x gap-2 overflow-x-auto px-4 lg:col-span-4 lg:mx-0 lg:max-h-[680px] lg:flex-col lg:overflow-y-auto lg:px-0"
          >
            {visible.map((place) => {
              const number = ORDERED.indexOf(place) + 1;
              const isSelected = place.id === selectedId;
              return (
                <li
                  key={place.id}
                  id={`map-item-${place.id}`}
                  className="w-[70%] shrink-0 snap-start sm:w-[40%] lg:w-auto"
                >
                  <button
                    type="button"
                    onClick={() => select(place.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-tile border p-3 text-left transition-colors",
                      isSelected
                        ? "border-accent bg-accent-soft"
                        : "border-line bg-surface hover:border-ink-3",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full font-mono text-xs font-semibold",
                        isSelected ? "bg-accent text-accent-ink" : "bg-ink text-bg",
                      )}
                    >
                      {number}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-semibold">{place.name}</span>
                      <span className="block truncate text-xs text-ink-3">
                        {PLACE_KIND_LABEL[place.kind]},{" "}
                        <span className="font-mono">{travelNote(place)}</span>
                      </span>
                    </span>
                    <CaretRight
                      size={16}
                      className="hidden shrink-0 text-ink-3 lg:block"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

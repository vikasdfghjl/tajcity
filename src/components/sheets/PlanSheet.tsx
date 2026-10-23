"use client";

import { PLACE_KIND_LABEL, STARTER_PRESET_ID, TAJ_PLACE_ID, THUMB_WIDTH } from "@/config/constants";
import {
  ArrowSquareOut,
  DotsSixVertical,
  MapTrifold,
  ShareNetwork,
  Trash,
  Warning,
  X,
} from "@phosphor-icons/react";
import { Reorder, useDragControls } from "motion/react";
import { useState } from "react";
import { SheetFrame } from "@/components/sheets/SheetFrame";
import { photoUrl } from "@/components/ui/CommonsImage";
import { ITINERARY_PRESETS } from "@/data/itineraries";
import { getPlace, routeUrl, shortHours, type Place } from "@/data/places";
import { planActions, sheetActions, showToast, usePlan, useSheet } from "@/lib/stores";
import { cn } from "@/lib/cn";

function PlanRow({ place, index }: { place: Place; index: number }) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={place.id}
      dragListener={false}
      dragControls={controls}
      className="relative flex items-center gap-3 rounded-tile bg-sunken p-2 pr-1.5"
      whileDrag={{ scale: 1.02, boxShadow: "var(--shadow)" }}
    >
      <button
        type="button"
        aria-label={`Drag to reorder ${place.name}`}
        onPointerDown={(event) => controls.start(event)}
        className="grid h-11 w-8 shrink-0 cursor-grab touch-none place-items-center text-ink-3 active:cursor-grabbing"
      >
        <DotsSixVertical size={20} weight="bold" />
      </button>
      <div className="relative size-12 shrink-0 overflow-hidden rounded-[10px] bg-surface">
        {place.photo ? (
          // oxlint-disable-next-line nextjs/no-img-element -- Commons thumbnail, see CommonsImage
          <img
            src={photoUrl(place.photo, THUMB_WIDTH)}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="grid h-full place-items-center bg-accent font-mono text-sm text-accent-ink">
            {index + 1}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold">
          <span className="mr-1.5 font-mono text-xs text-ink-3">{index + 1}</span>
          {place.name}
        </p>
        <p className="truncate text-xs text-ink-3">
          {PLACE_KIND_LABEL[place.kind]}, {shortHours(place)}
        </p>
      </div>
      <button
        type="button"
        onClick={() => planActions.remove(place.id)}
        aria-label={`Remove ${place.name}`}
        className="grid size-10 shrink-0 place-items-center rounded-full text-ink-3 transition-colors hover:bg-surface hover:text-closed"
      >
        <X size={16} weight="bold" />
      </button>
    </Reorder.Item>
  );
}

function presetIds(presetId: string): string[] {
  const preset = ITINERARY_PRESETS.find((item) => item.id === presetId);
  return preset ? preset.stops.map((stop) => stop.placeId).filter((id) => getPlace(id)) : [];
}

export function PlanSheet() {
  const sheet = useSheet();
  const plan = usePlan();
  const [confirmClear, setConfirmClear] = useState(false);
  const places = plan.map(getPlace).filter((place): place is Place => Boolean(place));
  const route = routeUrl(places);
  const hasTaj = plan.includes(TAJ_PLACE_ID);

  const sharePlan = async () => {
    const text = [
      "My day in Agra",
      ...places.map((place, index) => `${index + 1}. ${place.name} (${shortHours(place)})`),
      route ? `Route: ${route}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    try {
      if (navigator.share) {
        await navigator.share({ title: "My day in Agra", text });
        return;
      }
      await navigator.clipboard.writeText(text);
      showToast("Plan copied, paste it anywhere");
    } catch (error) {
      // Closing the share sheet is not a failure worth reporting
      if (error instanceof DOMException && error.name === "AbortError") return;
      showToast("Couldn't share. Check clipboard permissions and try again");
    }
  };

  const clearPlan = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    const previous = [...plan];
    planActions.clear();
    setConfirmClear(false);
    showToast("Day cleared", { label: "Undo", run: () => planActions.replace(previous) });
  };

  return (
    <SheetFrame
      open={sheet?.type === "plan"}
      onClose={() => {
        setConfirmClear(false);
        sheetActions.close();
      }}
      title="My day in Agra"
      description={
        places.length > 0
          ? `${places.length} ${places.length === 1 ? "stop" : "stops"}. Drag to set the order. Saved on this device.`
          : "Nothing saved yet."
      }
      footer={
        places.length > 0 && (
          <div className="grid gap-2">
            {route ? (
              <a
                href={route}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-5 text-[15px] font-semibold text-accent-ink transition-transform active:scale-[0.98]"
              >
                <MapTrifold size={18} weight="bold" />
                Open route in Maps
                <ArrowSquareOut size={14} className="opacity-70" aria-hidden="true" />
              </a>
            ) : (
              <p className="py-2 text-center text-sm text-ink-3">
                Add one more stop to get a route.
              </p>
            )}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={sharePlan}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line text-sm font-semibold transition-colors hover:border-ink-3"
              >
                <ShareNetwork size={16} weight="bold" />
                Share
              </button>
              <button
                type="button"
                onClick={clearPlan}
                className={cn(
                  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border text-sm font-semibold transition-colors",
                  confirmClear
                    ? "border-closed bg-closed text-surface"
                    : "border-line text-ink-2 hover:border-ink-3",
                )}
              >
                <Trash size={16} weight="bold" />
                {confirmClear ? "Tap to confirm" : "Clear"}
              </button>
            </div>
          </div>
        )
      }
    >
      {places.length === 0 ? (
        <div className="py-8 text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-accent-soft text-accent">
            <MapTrifold size={30} />
          </div>
          <p className="mx-auto mt-5 max-w-[30ch] text-ink-2">
            Add places with the plus button, or start from the one-day classic and adjust it.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => planActions.replace(presetIds(STARTER_PRESET_ID))}
              className="min-h-12 rounded-full bg-accent px-5 text-[15px] font-semibold text-accent-ink"
            >
              Start from the one-day classic
            </button>
            <a
              href="#explore"
              onClick={sheetActions.close}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-5 text-[15px] font-semibold"
            >
              Browse places
            </a>
          </div>
        </div>
      ) : (
        <>
          {hasTaj && (
            <p className="mb-4 flex gap-2.5 rounded-tile bg-accent-soft p-3.5 text-sm leading-snug text-ink">
              <Warning
                size={20}
                weight="fill"
                className="shrink-0 text-accent"
                aria-hidden="true"
              />
              The Taj is closed on Fridays. Going on a Friday? Swap it for Mehtab Bagh at sunset.
            </p>
          )}
          <Reorder.Group
            axis="y"
            values={plan}
            onReorder={planActions.reorder}
            className="flex flex-col gap-2"
            data-vaul-no-drag
          >
            {places.map((place, index) => (
              <PlanRow key={place.id} place={place} index={index} />
            ))}
          </Reorder.Group>
        </>
      )}
    </SheetFrame>
  );
}

"use client";

import { DESKTOP_MEDIA_QUERY, TAJ_PLACE_ID } from "@/config/constants";
import { CommonsImage } from "@/components/ui/CommonsImage";
import { AddToPlanButton } from "@/components/ui/AddToPlanButton";
import { shortHours, type Place } from "@/data/places";
import { sheetActions } from "@/lib/stores";
import { cn } from "@/lib/cn";

interface PlaceCardProps {
  place: Place;
  featured?: boolean;
  className?: string;
}

/** Sheroes has no photo of its own; it gets a type-led panel rather than an unrelated picture. */
function TypePanel({ place }: { place: Place }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-accent p-5 text-accent-ink sm:p-6">
      <span lang="hi" className="font-deva text-2xl opacity-80">
        {place.hindiName}
      </span>
      <p className="text-[1.65rem] leading-[1.08] font-semibold tracking-[-0.03em] sm:text-3xl">
        {place.tagline}
      </p>
    </div>
  );
}

export function PlaceCard({ place, featured, className }: PlaceCardProps) {
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-card bg-sunken",
          featured
            ? "aspect-[4/5] lg:aspect-auto lg:min-h-0 lg:flex-1"
            : "aspect-[4/5] lg:aspect-[4/3]",
        )}
      >
        {place.photo ? (
          <CommonsImage
            photo={place.photo}
            alt={
              place.photo.pictured
                ? `${place.photo.pictured}, a dish served at ${place.name}`
                : place.name
            }
            sizes={
              featured ? `${DESKTOP_MEDIA_QUERY} 60vw, 80vw` : `${DESKTOP_MEDIA_QUERY} 30vw, 80vw`
            }
            className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
          />
        ) : (
          <TypePanel place={place} />
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg leading-tight font-semibold">
            <button
              type="button"
              onClick={() => sheetActions.openPlace(place.id)}
              className="text-left after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
            >
              {place.name}
            </button>
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-snug text-ink-2">{place.tagline}</p>
          <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-ink-3">
            <span>
              {place.id === TAJ_PLACE_ID
                ? "Your starting point"
                : `${place.distanceFromTaj.split(" (")[0]} from the Taj`}
            </span>
            <span>{shortHours(place)}</span>
          </p>
        </div>
        <AddToPlanButton id={place.id} />
      </div>
    </article>
  );
}

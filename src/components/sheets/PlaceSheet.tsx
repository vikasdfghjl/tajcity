"use client";

import {
  DESKTOP_MEDIA_QUERY,
  FACTS_CHECKED_ON,
  MEAL_TABS,
  PLACE_KIND_LABEL,
  TAJ_PLACE_ID,
} from "@/config/constants";
import {
  ArrowSquareOut,
  Clock,
  CurrencyInr,
  ForkKnife,
  Lightbulb,
  MapPin,
  NavigationArrow,
  Sun,
} from "@phosphor-icons/react";
import { useState } from "react";
import { SheetFrame } from "@/components/sheets/SheetFrame";
import { AddToPlanButton } from "@/components/ui/AddToPlanButton";
import { CommonsImage } from "@/components/ui/CommonsImage";
import { directionsUrl, getPlace, type DiningDetails, type Place } from "@/data/places";
import { sheetActions, useSheet } from "@/lib/stores";
import { cn } from "@/lib/cn";

/** "Breakfast, lunch, dinner. South Indian, pure veg, rooftop with a Taj view." */
function diningSummary(dining: DiningDetails): string {
  const meals = MEAL_TABS.filter((tab) => dining.meals.includes(tab.value))
    .map((tab) => tab.label)
    .join(", ");
  const traits = [
    dining.cuisine,
    dining.pureVeg && !dining.cuisine.includes("vegetarian") && "pure veg",
    dining.rooftop && (dining.tajView ? "rooftop with a Taj view" : "rooftop"),
    !dining.rooftop && dining.tajView && "Taj view",
  ].filter(Boolean);
  return `${meals}. ${traits.join(", ")}.`;
}

function Fact({
  icon,
  label,
  children,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  tone?: "warn";
}) {
  return (
    <div className="rounded-tile bg-sunken p-3.5">
      <dt className="flex items-center gap-1.5 text-xs font-medium text-ink-3">
        {icon}
        {label}
      </dt>
      <dd
        className={cn(
          "mt-1.5 text-sm leading-snug",
          tone === "warn" ? "font-semibold text-closed" : "text-ink",
        )}
      >
        {children}
      </dd>
    </div>
  );
}

function PlaceDetails({ place }: { place: Place }) {
  const closedOnFriday = place.closedOn?.includes("Friday");

  return (
    <>
      {place.photo && (
        <figure className="-mx-1">
          <div className="aspect-[16/10] overflow-hidden rounded-card bg-sunken">
            <CommonsImage
              photo={place.photo}
              alt={
                place.photo.pictured
                  ? `${place.photo.pictured}, served at ${place.name}`
                  : place.name
              }
              sizes={`${DESKTOP_MEDIA_QUERY} 440px, 100vw`}
            />
          </div>
          <figcaption className="mt-2 px-1 text-xs text-ink-3">
            {place.photo.pictured && (
              <span className="text-ink-2">Pictured: {place.photo.pictured}. </span>
            )}
            Photo{" "}
            <a
              href={place.photo.page}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-line underline-offset-2 hover:text-ink"
            >
              {place.photo.author}, {place.photo.license}
            </a>
          </figcaption>
        </figure>
      )}

      <dl className="mt-5 grid grid-cols-2 gap-2">
        <Fact icon={<Clock size={14} weight="bold" />} label="Hours">
          {place.timings}
        </Fact>
        <Fact icon={<Sun size={14} weight="bold" />} label="Best time">
          {place.bestTime}
        </Fact>
        {!place.entryFee && place.priceRange && (
          <div className="col-span-2">
            <Fact icon={<CurrencyInr size={14} weight="bold" />} label="Price">
              {place.priceRange}
            </Fact>
          </div>
        )}
        {place.entryFee && (
          <div className="col-span-2 rounded-tile bg-sunken p-3.5">
            <dt className="flex items-center gap-1.5 text-xs font-medium text-ink-3">
              <CurrencyInr size={14} weight="bold" />
              Entry
            </dt>
            <dd className="mt-2">
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  ["Indian", place.entryFee.indian],
                  ["SAARC, BIMSTEC", place.entryFee.saarc],
                  ["Foreign", place.entryFee.foreigner],
                ].map(([label, price]) => (
                  <div key={label} className="rounded-[10px] bg-surface px-2 py-2">
                    <p className="font-mono text-[15px] text-ink">{price}</p>
                    <p className="mt-0.5 text-[11px] leading-tight text-ink-3">{label}</p>
                  </div>
                ))}
              </div>
              {place.entryFee.note && (
                <p className="mt-2.5 text-xs leading-snug text-ink-2">{place.entryFee.note}</p>
              )}
            </dd>
          </div>
        )}
        {place.dining && (
          <div className="col-span-2">
            <Fact icon={<ForkKnife size={14} weight="bold" />} label="Serves">
              {diningSummary(place.dining)}
            </Fact>
          </div>
        )}
        <div className="col-span-2">
          <Fact icon={<MapPin size={14} weight="bold" />} label="Where">
            {place.address}
            {place.id !== TAJ_PLACE_ID && (
              <span className="mt-1 block text-ink-3">{place.distanceFromTaj} from the Taj</span>
            )}
          </Fact>
        </div>
        {place.closedOn && (
          <div className="col-span-2">
            <Fact
              icon={<Clock size={14} weight="bold" />}
              label="Closed"
              tone={closedOnFriday ? "warn" : undefined}
            >
              {place.closedOn}
            </Fact>
          </div>
        )}
      </dl>

      <p className="mt-6 text-[15px] leading-relaxed text-ink-2">{place.description}</p>

      <div className="mt-6 flex gap-3 rounded-tile bg-accent-soft p-4">
        <Lightbulb size={22} weight="fill" className="shrink-0 text-accent" aria-hidden="true" />
        <p className="text-[15px] leading-relaxed text-ink">{place.insiderTip}</p>
      </div>

      <h3 className="mt-7 text-sm font-semibold">
        {place.kind === "food" || place.kind === "dining" ? "What to order" : "Don't miss"}
      </h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {place.mustTryOrSee.map((item) => (
          <li key={item} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-2">
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-line pt-5">
        <h3 className="text-xs font-semibold text-ink-2">
          Facts checked {FACTS_CHECKED_ON} against
        </h3>
        <ul className="mt-2 space-y-1.5">
          {place.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-ink-3 underline decoration-line underline-offset-2 hover:text-ink"
              >
                {source.label}
                <ArrowSquareOut size={12} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink-3">Prices and hours change. Confirm on the day.</p>
      </div>

      {place.approximate && (
        <p className="mt-6 text-xs text-ink-3">
          The map pin marks the neighbourhood. Directions open Google Maps at the exact address.
        </p>
      )}
    </>
  );
}

export function PlaceSheet() {
  const sheet = useSheet();
  const isOpen = sheet?.type === "place";
  // Keep showing the last place while the sheet animates closed
  const [shownId, setShownId] = useState<string | null>(null);
  if (sheet?.type === "place" && sheet.id !== shownId) {
    setShownId(sheet.id);
  }
  const place = shownId ? getPlace(shownId) : undefined;

  return (
    <SheetFrame
      open={isOpen}
      onClose={sheetActions.close}
      title={place?.name ?? "Place"}
      description={
        place ? (
          <span className="flex flex-wrap items-baseline gap-x-2">
            <span lang="hi" className="font-deva text-base text-ink-3">
              {place.hindiName}
            </span>
            <span>
              {PLACE_KIND_LABEL[place.kind]}. {place.tagline}
            </span>
          </span>
        ) : null
      }
      footer={
        place && (
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <AddToPlanButton id={place.id} variant="wide" />
            <a
              href={directionsUrl(place)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-1.5 rounded-full border border-line px-4 text-[15px] whitespace-nowrap font-semibold transition-colors hover:border-ink-3"
            >
              <NavigationArrow size={18} weight="bold" />
              Directions
              <ArrowSquareOut size={14} className="text-ink-3" aria-hidden="true" />
            </a>
          </div>
        )
      }
    >
      {place && <PlaceDetails place={place} />}
    </SheetFrame>
  );
}

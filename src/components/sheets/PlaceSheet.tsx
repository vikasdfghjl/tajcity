"use client";

import {
  ArrowSquareOut,
  Clock,
  CurrencyInr,
  Lightbulb,
  MapPin,
  NavigationArrow,
  Sun,
} from "@phosphor-icons/react";
import { useState } from "react";
import { SheetFrame } from "@/components/sheets/SheetFrame";
import { AddToPlanButton } from "@/components/ui/AddToPlanButton";
import { CommonsImage } from "@/components/ui/CommonsImage";
import { KIND_LABEL, directionsUrl, getPlace, type Place } from "@/data/places";
import { sheetActions, useSheet } from "@/lib/stores";
import { cn } from "@/lib/cn";

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
  const fee = place.entryFee
    ? `Indian ${place.entryFee.indian.split(" (")[0]}, foreign ${place.entryFee.foreigner.split(" (")[0]}`
    : place.priceRange;
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
              sizes="(min-width: 1024px) 440px, 100vw"
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
        <Fact
          icon={<CurrencyInr size={14} weight="bold" />}
          label={place.entryFee ? "Entry" : "Price"}
        >
          {fee}
        </Fact>
        <Fact icon={<MapPin size={14} weight="bold" />} label="From the Taj">
          {place.distanceFromTaj}
        </Fact>
        <Fact icon={<Sun size={14} weight="bold" />} label="Best time">
          {place.bestTime}
        </Fact>
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
        {place.kind === "food" ? "What to order" : "Don't miss"}
      </h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {place.mustTryOrSee.map((item) => (
          <li key={item} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink-2">
            {item}
          </li>
        ))}
      </ul>

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
              {KIND_LABEL[place.kind]}. {place.tagline}
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
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line px-5 text-[15px] font-semibold transition-colors hover:border-ink-3"
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

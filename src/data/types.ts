/** Shared shapes for everything in src/data. */

export type PlaceKind = "monument" | "food" | "craft";

/** A reference a fact was checked against. */
export interface Source {
  label: string;
  url: string;
}

export interface Photo {
  /** Wikimedia Commons thumbnail folder, e.g. ".../thumb/b/b2/File.JPG" */
  base: string;
  /** URL-encoded file name, repeated in every thumbnail URL */
  file: string;
  width: number;
  height: number;
  author: string;
  license: string;
  page: string;
  /** What the photo shows when it is a dish rather than the venue itself */
  pictured?: string;
  /** CSS object-position for tight crops */
  focus?: string;
}

export interface EntryFee {
  indian: string;
  /** SAARC and BIMSTEC nationals */
  saarc: string;
  foreigner: string;
  /** Discounts, extra tickets and free entry rules */
  note?: string;
}

export interface Place {
  id: string;
  kind: PlaceKind;
  name: string;
  hindiName: string;
  tagline: string;
  description: string;
  timings: string;
  /** Only set when the place actually closes on a regular day */
  closedOn?: string;
  entryFee?: EntryFee;
  priceRange?: string;
  address: string;
  /** Road distance (and time where useful) from the Taj's East Gate */
  distanceFromTaj: string;
  bestTime: string;
  insiderTip: string;
  mustTryOrSee: string[];
  /** Extra search keywords */
  tags: string[];
  lat: number;
  lng: number;
  /** True when the pin marks the neighbourhood rather than the exact door */
  approximate: boolean;
  /** Google Maps search text that lands on the exact place */
  mapsQuery: string;
  photo?: Photo;
  sources: Source[];
}

export interface ItineraryStop {
  time: string;
  placeId: string;
  title: string;
  activity: string;
  tip: string;
}

export interface ItineraryPreset {
  id: string;
  title: string;
  duration: string;
  idealFor: string;
  summary: string;
  estimatedBudget: string;
  stops: ItineraryStop[];
}

export interface TransitRoute {
  from: string;
  /** Place id of the destination */
  toId: string;
  distance: string;
  time: string;
}

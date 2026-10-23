import {
  EARTH_RADIUS_KM,
  GOOGLE_MAPS_DIRECTIONS_URL,
  GOOGLE_MAPS_SEARCH_URL,
  MAX_ROUTE_STOPS,
  TAJ_COORDS,
} from "@/config/constants";
import { CRAFT_STOPS } from "@/data/crafts";
import { FOOD_SPOTS } from "@/data/food";
import { MONUMENTS } from "@/data/monuments";
import type { Place } from "@/data/types";

export type { Photo, Place, PlaceKind } from "@/data/types";

/** Every place in the app, in category order. */
export const PLACES: Place[] = [...MONUMENTS, ...FOOD_SPOTS, ...CRAFT_STOPS];

const PLACE_BY_ID = new Map(PLACES.map((place) => [place.id, place]));

export function getPlace(id: string): Place | undefined {
  return PLACE_BY_ID.get(id);
}

/** Straight-line distance from the Taj in km, used for ordering only. */
export function distanceFromTajKm(place: Pick<Place, "lat" | "lng">): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(place.lat - TAJ_COORDS.lat);
  const dLng = toRad(place.lng - TAJ_COORDS.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(TAJ_COORDS.lat)) * Math.cos(toRad(place.lat)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function directionsUrl(place: Pick<Place, "mapsQuery">): string {
  return `${GOOGLE_MAPS_SEARCH_URL}&query=${encodeURIComponent(place.mapsQuery)}`;
}

/** Google Maps route through every stop, in plan order. */
export function routeUrl(places: Pick<Place, "mapsQuery">[]): string | null {
  if (places.length < 2) {
    return null;
  }
  const stops = places
    .slice(0, MAX_ROUTE_STOPS)
    .map((place) => encodeURIComponent(place.mapsQuery));
  const origin = stops[0];
  const destination = stops[stops.length - 1];
  const waypoints = stops.slice(1, -1).join("%7C");
  return `${GOOGLE_MAPS_DIRECTIONS_URL}&origin=${origin}&destination=${destination}${
    waypoints ? `&waypoints=${waypoints}` : ""
  }`;
}

/** First segment of a long hours string, e.g. "Sunrise to sunset" */
export function shortHours(place: Pick<Place, "timings">): string {
  return place.timings.split(/[;(]/)[0].trim();
}

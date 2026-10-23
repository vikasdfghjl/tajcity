"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";
import type { Place } from "@/data/places";
import {
  MAP_BOUNDS_EXCLUDE,
  MAP_FIT_PADDING,
  MAP_FLY_SPEED,
  MAP_FOCUS_ZOOM,
  MAP_INITIAL_ZOOM,
  MAP_STYLE_URL,
  TAJ_COORDS,
  mapWorkerUrl,
} from "@/config/constants";
import type { Theme } from "@/lib/stores";

const PIN_BASE =
  "grid size-8 place-items-center rounded-full border-2 font-mono text-[12px] font-semibold shadow-[0_6px_16px_-6px_rgb(0_0_0/0.5)] transition-transform duration-300 cursor-pointer";
// Pins use the theme tokens, so they flip with light and dark without extra wiring
const PIN_IDLE = "border-surface bg-ink text-bg";
const PIN_ACTIVE = "border-surface bg-accent text-accent-ink scale-125 z-10";

interface AgraMapProps {
  places: Place[];
  visibleIds: Set<string>;
  selectedId: string | null;
  theme: Theme;
  onSelect: (id: string) => void;
}

export default function AgraMap({ places, visibleIds, selectedId, theme, onSelect }: AgraMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef(new Map<string, { marker: Marker; element: HTMLButtonElement }>());
  const onSelectRef = useRef(onSelect);
  const initialTheme = useRef(theme);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  // Create the map once; places are static so markers are built here too
  useEffect(() => {
    let cancelled = false;
    const markers = markersRef.current;

    void import("maplibre-gl").then((maplibre) => {
      if (cancelled || !containerRef.current) return;
      const { Map, Marker, LngLatBounds, NavigationControl } = maplibre;
      maplibre.setWorkerUrl(mapWorkerUrl(maplibre.getVersion()));

      const map = new Map({
        container: containerRef.current,
        style: MAP_STYLE_URL[initialTheme.current],
        center: [TAJ_COORDS.lng, TAJ_COORDS.lat],
        zoom: MAP_INITIAL_ZOOM,
        cooperativeGestures: true,
        attributionControl: { compact: true },
      });
      map.addControl(new NavigationControl({ showCompass: false }), "top-right");
      mapRef.current = map;

      // Frame the city; far-out stops only get framed when picked
      const bounds = new LngLatBounds();
      places.forEach((place, index) => {
        const element = document.createElement("button");
        element.type = "button";
        element.className = `${PIN_BASE} ${PIN_IDLE}`;
        element.textContent = String(index + 1);
        element.setAttribute("aria-label", `${index + 1}. ${place.name}`);
        element.addEventListener("click", (event) => {
          event.stopPropagation();
          onSelectRef.current(place.id);
        });
        const marker = new Marker({ element }).setLngLat([place.lng, place.lat]).addTo(map);
        markers.set(place.id, { marker, element });
        if (!MAP_BOUNDS_EXCLUDE.includes(place.id)) bounds.extend([place.lng, place.lat]);
      });
      map.fitBounds(bounds, { padding: MAP_FIT_PADDING, duration: 0 });
    });

    return () => {
      cancelled = true;
      markers.forEach(({ marker }) => marker.remove());
      markers.clear();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [places]);

  useEffect(() => {
    mapRef.current?.setStyle(MAP_STYLE_URL[theme]);
  }, [theme]);

  useEffect(() => {
    markersRef.current.forEach(({ element }, id) => {
      element.style.display = visibleIds.has(id) ? "" : "none";
    });
  }, [visibleIds]);

  useEffect(() => {
    markersRef.current.forEach(({ element }, id) => {
      element.className = `${PIN_BASE} ${id === selectedId ? PIN_ACTIVE : PIN_IDLE}`;
    });
    const place = places.find((item) => item.id === selectedId);
    if (place && mapRef.current) {
      mapRef.current.flyTo({
        center: [place.lng, place.lat],
        zoom: MAP_FOCUS_ZOOM,
        speed: MAP_FLY_SPEED,
        essential: false,
      });
    }
  }, [selectedId, places]);

  return <div ref={containerRef} className="h-full w-full" />;
}

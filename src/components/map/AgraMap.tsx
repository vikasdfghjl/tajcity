"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";
import type { Place } from "@/data/places";
import type { Theme } from "@/lib/stores";

const STYLE_URL: Record<Theme, string> = {
  light: "https://tiles.openfreemap.org/styles/positron",
  dark: "https://tiles.openfreemap.org/styles/dark",
};

const PIN_BASE =
  "grid size-8 place-items-center rounded-full border-2 font-mono text-[12px] font-semibold shadow-[0_6px_16px_-6px_rgb(0_0_0/0.5)] transition-transform duration-300 cursor-pointer";
const PIN_IDLE: Record<Theme, string> = {
  light: "border-white bg-[#12141a] text-white",
  dark: "border-[#0b0e15] bg-[#eceef3] text-[#0b0e15]",
};
const PIN_ACTIVE = "border-white bg-[#2b44a8] text-white scale-125 z-10";

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
      // The bundler moves maplibre's chunk, so its relative worker URL 404s. Load the
      // self-contained worker for this exact version from the CDN instead.
      maplibre.setWorkerUrl(
        `https://cdn.jsdelivr.net/npm/maplibre-gl@${maplibre.getVersion()}/dist/maplibre-gl-worker.mjs`,
      );

      const map = new Map({
        container: containerRef.current,
        style: STYLE_URL[initialTheme.current],
        center: [78.0421, 27.1751],
        zoom: 12,
        cooperativeGestures: true,
        attributionControl: { compact: true },
      });
      map.addControl(new NavigationControl({ showCompass: false }), "top-right");
      mapRef.current = map;

      // Frame the city; Fatehpur Sikri is 38 km out and only gets framed when picked
      const bounds = new LngLatBounds();
      places.forEach((place, index) => {
        const element = document.createElement("button");
        element.type = "button";
        element.className = `${PIN_BASE} ${PIN_IDLE[initialTheme.current]}`;
        element.textContent = String(index + 1);
        element.setAttribute("aria-label", `${index + 1}. ${place.name}`);
        element.addEventListener("click", (event) => {
          event.stopPropagation();
          onSelectRef.current(place.id);
        });
        const marker = new Marker({ element }).setLngLat([place.lng, place.lat]).addTo(map);
        markers.set(place.id, { marker, element });
        if (place.id !== "fatehpur-sikri") bounds.extend([place.lng, place.lat]);
      });
      map.fitBounds(bounds, { padding: 48, duration: 0 });
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
    mapRef.current?.setStyle(STYLE_URL[theme]);
  }, [theme]);

  useEffect(() => {
    markersRef.current.forEach(({ element }, id) => {
      element.style.display = visibleIds.has(id) ? "" : "none";
    });
  }, [visibleIds]);

  useEffect(() => {
    markersRef.current.forEach(({ element }, id) => {
      element.className = `${PIN_BASE} ${id === selectedId ? PIN_ACTIVE : PIN_IDLE[theme]}`;
    });
    const place = places.find((item) => item.id === selectedId);
    if (place && mapRef.current) {
      mapRef.current.flyTo({
        center: [place.lng, place.lat],
        zoom: 14.5,
        speed: 1.4,
        essential: false,
      });
    }
  }, [selectedId, places, theme]);

  return <div ref={containerRef} className="h-full w-full" />;
}

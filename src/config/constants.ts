/**
 * Every app-wide constant lives here: URLs, storage keys, timings, breakpoints,
 * coordinates, map and dial settings, labels and contact details.
 *
 * Not here on purpose: content datasets (places, light phases, itineraries) live in
 * src/data, and values derived from that content stay next to the code that derives them.
 */

/* ---------- Time ---------- */

export const MINUTE_MS = 60_000;
export const DAY_MS = 24 * 60 * MINUTE_MS;

/** India Standard Time is UTC+05:30 all year (no daylight saving). */
export const IST_OFFSET_MINUTES = 330;
export const IST_TIME_ZONE = "Asia/Kolkata";

/** How often the shared clock ticks for live status. */
export const CLOCK_TICK_MS = 30_000;
export const TOAST_DURATION_MS = 5_000;

/* ---------- Taj Mahal rules ---------- */

/** Place ids the UI refers to directly. */
export const TAJ_PLACE_ID = "taj-mahal";
export const INLAY_PLACE_ID = "pietra-dura-inlay";

export const TAJ_COORDS = { lat: 27.1751, lng: 78.0421 } as const;

/** Mean Earth radius, for straight-line distances from the Taj. */
export const EARTH_RADIUS_KM = 6371;

/** Gates open this long before sunrise and close this long before sunset. */
export const TAJ_GATE_OFFSET_MINUTES = 30;

/** Weekday the Taj is closed to visitors (0 = Sunday). */
export const TAJ_CLOSED_WEEKDAY = 5;

/** Night viewing slots start at 20:00 and the last ends at 23:59. */
export const NIGHT_VIEWING_START_HOUR = 20;

/** Night viewing runs on the full moon night plus this many nights either side. */
export const NIGHT_VIEWING_NIGHTS_EACH_SIDE = 2;

/** Moon phase search: step size and how far ahead to look. */
export const MOON_SEARCH_STEP_MS = 2 * 60 * MINUTE_MS;
export const MOON_SEARCH_WINDOW_MS = 33 * DAY_MS;

/* ---------- Content ---------- */

/** When the place facts were last checked against their listed sources. */
export const FACTS_CHECKED_ON = "October 2026";

/* ---------- Storage keys ---------- */

export const THEME_STORAGE_KEY = "tajcity-theme";
export const PLAN_STORAGE_KEY = "tajcity-plan-v2";

/* ---------- Theme ---------- */

/** Browser chrome colours; keep in sync with --bg in globals.css. */
export const THEME_COLOR = { light: "#f2f3ef", dark: "#0b0e15" } as const;

export const DARK_SCHEME_QUERY = "(prefers-color-scheme: dark)";

/** The single theme-color meta, owned by the theme script so a manual pick reaches the browser chrome. */
export const THEME_COLOR_META_ID = "theme-color";

/* ---------- Layout ---------- */

/** Matches Tailwind's `lg` breakpoint, where sheets become side panels and the tab bar hides. */
export const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

/* ---------- Navigation ---------- */

export const SECTIONS = [
  { id: "light", label: "Light" },
  { id: "explore", label: "Explore" },
  { id: "map", label: "Map" },
  { id: "plans", label: "Day plans" },
  { id: "essentials", label: "Essentials" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

/** Sections that get a tab in the mobile tab bar (the plan button is added separately). */
export const TAB_BAR_SECTIONS: readonly SectionId[] = ["light", "explore", "map"];

/** IntersectionObserver band that decides which section counts as "current". */
export const ACTIVE_SECTION_ROOT_MARGIN = "-45% 0px -50% 0px";

/** Header switches from transparent to frosted after this fraction of the viewport. */
export const HEADER_SOLID_AFTER_VIEWPORT = 0.75;

/* ---------- Labels ---------- */

export const PLACE_KIND_LABEL = {
  monument: "Monument",
  food: "Food",
  craft: "Craft",
} as const;

export const EXPLORE_TABS = [
  { value: "monument", label: "Monuments" },
  { value: "food", label: "Food" },
  { value: "craft", label: "Craft" },
] as const;

export const PRESET_TAB_LABEL: Record<string, string> = {
  "1-day-express": "One day",
  "2-day-royal": "Two days",
  "foodie-trail": "Food trail",
};

/** Preset offered from the empty plan sheet. */
export const STARTER_PRESET_ID = "1-day-express";

/* ---------- Images (Wikimedia Commons) ---------- */

export const COMMONS_THUMB_BASE = "https://thumb.wikimedia.org/wikipedia/commons/thumb";

/** Commons only serves these thumbnail widths; any other width returns an error. */
export const COMMONS_WIDTHS = [330, 500, 960, 1280, 1920] as const;

/** Width used for small list thumbnails. */
export const THUMB_WIDTH = 330;

/** Default `src` width before the browser picks from the srcset. */
export const FALLBACK_IMAGE_WIDTH = 960;

/* ---------- Google Maps links (plain URLs, no API key) ---------- */

export const GOOGLE_MAPS_SEARCH_URL = "https://www.google.com/maps/search/?api=1";
export const GOOGLE_MAPS_DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1";

/** Origin + destination + up to 9 waypoints. */
export const MAX_ROUTE_STOPS = 11;

/* ---------- Map (MapLibre + OpenFreeMap) ---------- */

export const MAP_STYLE_URL = {
  light: "https://tiles.openfreemap.org/styles/positron",
  dark: "https://tiles.openfreemap.org/styles/dark",
} as const;

/** The bundler moves maplibre's chunk, so its worker is loaded from the CDN at the same version. */
export const mapWorkerUrl = (version: string) =>
  `https://cdn.jsdelivr.net/npm/maplibre-gl@${version}/dist/maplibre-gl-worker.mjs`;

export const MAP_INITIAL_ZOOM = 12;
export const MAP_FOCUS_ZOOM = 14.5;
export const MAP_FLY_SPEED = 1.4;
export const MAP_FIT_PADDING = 48;

/** Lazy-load the map once its frame is this close to the viewport. */
export const MAP_LOAD_MARGIN = "600px 0px";

/** Far-out stops left out of the initial city framing (Fatehpur Sikri is 38 km away). */
export const MAP_BOUNDS_EXCLUDE = ["fatehpur-sikri"];

/* ---------- Light dial ---------- */

export const DIAL_START_HOUR = 5;
export const DIAL_END_HOUR = 24;
export const DIAL_STEP_HOURS = 0.25;
export const DIAL_TRACK_HEIGHT_PX = 96;
export const DIAL_HOUR_LABELS = [6, 9, 12, 15, 18, 21, 24];

/** A representative October day, used before the visitor's clock is known. */
export const DEFAULT_SUN_ANCHORS = { sunrise: 6.25, sunset: 17.6 } as const;

/** Shortcut chips under the dial; some times follow today's sunrise and sunset. */
export const DIAL_QUICK_JUMPS = [
  { label: "Sunrise", hour: (sun: { sunrise: number }) => sun.sunrise + 0.2 },
  { label: "Midday", hour: () => 12.5 },
  { label: "Golden hour", hour: (sun: { sunset: number }) => sun.sunset - 1.1 },
  { label: "Full moon", hour: () => 22 },
] as const;

/* ---------- Contact and official links ---------- */

export const HELPLINES = [
  { label: "Police and emergency", number: "112" },
  { label: "UP Tourism helpline", number: "1363" },
] as const;

export const OFFICIAL_PORTALS = [
  { label: "Archaeological Survey of India", href: "https://asi.nic.in" },
  { label: "Uttar Pradesh Tourism", href: "https://www.uptourism.gov.in" },
  { label: "IRCTC trains to Agra", href: "https://www.irctc.co.in" },
] as const;

/**
 * Data behind the light dial. Phase boundaries and colour grading are anchored to the
 * real sunrise and sunset for the day, so the dial is accurate in December and in June.
 */

import { DIAL_END_HOUR, DIAL_START_HOUR, NIGHT_VIEWING_START_HOUR } from "@/config/constants";

export type CrowdLevel = "Quiet" | "Building" | "Peak" | "Busy" | "Gates closed" | "Limited";

export interface LightPhase {
  id: string;
  name: string;
  crowd: CrowdLevel;
  light: string;
  gate: string;
  tip: string;
  perks: string[];
}

export const PHASES: Record<string, LightPhase> = {
  "before-open": {
    id: "before-open",
    name: "Before the gates",
    crowd: "Gates closed",
    light: "Blue hour. The dome is a grey silhouette against a lightening sky.",
    gate: "Queue at the East Gate 30 to 40 minutes before opening with an online ticket.",
    tip: "The first people through walk straight to the reflecting pool. Be one of them.",
    perks: ["Shortest security line of the day", "Cool air, quiet lanes in Tajganj"],
  },
  sunrise: {
    id: "sunrise",
    name: "Sunrise",
    crowd: "Quiet",
    light: "Soft pink on the marble, shifting to pearl white within the hour.",
    gate: "East Gate, ticket booked online the night before.",
    tip: "Shoot the central watercourse in the first 20 minutes, before anyone steps into frame.",
    perks: [
      "Unobstructed reflection photos",
      "Mist over the Yamuna in winter",
      "Ideal walking temperature",
    ],
  },
  morning: {
    id: "morning",
    name: "Morning",
    crowd: "Building",
    light: "Clean, even daylight. Good for detail shots of the inlay.",
    gate: "East or South Gate. Tour buses from Delhi start arriving around 10.",
    tip: "Do the mausoleum interior now, before the queue for it doubles.",
    perks: ["All interiors open and lit", "Shade is still easy to find"],
  },
  midday: {
    id: "midday",
    name: "Midday",
    crowd: "Peak",
    light: "Hard overhead sun and blinding white marble. Flat, high-contrast photos.",
    gate: "Skip it if you can. Spend these hours at Agra Fort or over a long lunch.",
    tip: "The marble floor gets hot. Shoe covers are given out with the mausoleum ticket.",
    perks: ["Interiors at their brightest", "Close-ups of carving under the arches"],
  },
  golden: {
    id: "golden",
    name: "Golden hour",
    crowd: "Busy",
    light: "Honey and amber on the dome, long shadows across the gardens.",
    gate: "East Gate, or watch from Mehtab Bagh across the river.",
    tip: "Stand on the riverside terrace behind the Taj for the warmest light on the marble.",
    perks: ["Warmest colour of the day", "Sky reflected in the Yamuna"],
  },
  closed: {
    id: "closed",
    name: "After closing",
    crowd: "Gates closed",
    light: "Dusk. The Taj closes 30 minutes before sunset.",
    gate: "Gates are shut. Head to dinner on Fatehabad Road or Sadar Bazaar.",
    tip: "On a night-viewing night, report at Shilpgram near the East Gate 30 minutes before your slot, with ID.",
    perks: ["Street food at Sadar Bazaar comes alive after 6 PM"],
  },
  night: {
    id: "night",
    name: "Full moon night",
    crowd: "Limited",
    light:
      "A silver glow on the full moon night and two nights either side, except Fridays and Ramzan.",
    gate: "Book on the ASI ticket portal. Eight 30-minute slots of up to 50 people, from 8 PM to midnight.",
    tip: "Phones are not allowed for night viewing; a still camera is, after the security check.",
    perks: [
      "Tickets ₹510 Indian, ₹750 foreign, ₹500 for children 3 to 15",
      "At most 400 visitors a night",
    ],
  },
};

export interface SunAnchors {
  /** Decimal IST hours for today's sunrise and sunset */
  sunrise: number;
  sunset: number;
}

export function phaseAt(hour: number, { sunrise, sunset }: SunAnchors): LightPhase {
  const opens = sunrise - 0.5;
  const closes = sunset - 0.5;
  if (hour < opens) return PHASES["before-open"];
  if (hour < sunrise + 1.25) return PHASES.sunrise;
  if (hour < 11) return PHASES.morning;
  if (hour < closes - 1.5) return PHASES.midday;
  if (hour < closes) return PHASES.golden;
  if (hour < NIGHT_VIEWING_START_HOUR) return PHASES.closed;
  return PHASES.night;
}

export interface GradeStop {
  hour: number;
  /** Colour wash laid over the photo */
  tint: string;
  brightness: number;
  saturate: number;
  /** Warmth added on top of the tint, 0 to 1 */
  sepia: number;
  /** Hue shift in degrees; negative pushes toward pink and red */
  hue: number;
  /** 0 to 1, how visible the moon glow is */
  moon: number;
}

export function gradeStops({ sunrise, sunset }: SunAnchors): GradeStop[] {
  // prettier-ignore
  return [
    { hour: DIAL_START_HOUR, tint: "rgba(14, 22, 66, 0.7)",    brightness: 0.4,  saturate: 0.4,  sepia: 0,    hue: 0,   moon: 0 },
    { hour: sunrise - 0.6, tint: "rgba(80, 70, 150, 0.55)",  brightness: 0.58, saturate: 0.6,  sepia: 0.1,  hue: 0,   moon: 0 },
    { hour: sunrise,       tint: "rgba(255, 128, 150, 0.5)", brightness: 0.88, saturate: 1.05, sepia: 0.25, hue: -20, moon: 0 },
    { hour: sunrise + 1,   tint: "rgba(255, 200, 160, 0.22)", brightness: 1,   saturate: 1,    sepia: 0.08, hue: 0,   moon: 0 },
    { hour: 11,            tint: "rgba(255, 255, 255, 0)",   brightness: 1.12, saturate: 0.82, sepia: 0,    hue: 0,   moon: 0 },
    { hour: 15,            tint: "rgba(255, 244, 220, 0.1)", brightness: 1.06, saturate: 0.9,  sepia: 0.05, hue: 0,   moon: 0 },
    { hour: sunset - 1.2,  tint: "rgba(255, 160, 60, 0.5)",  brightness: 1.02, saturate: 1.25, sepia: 0.35, hue: -6,  moon: 0 },
    { hour: sunset,        tint: "rgba(232, 86, 48, 0.58)",  brightness: 0.8,  saturate: 1.3,  sepia: 0.4,  hue: -14, moon: 0 },
    { hour: sunset + 0.8,  tint: "rgba(28, 34, 100, 0.66)",  brightness: 0.45, saturate: 0.6,  sepia: 0,    hue: 0,   moon: 0.2 },
    { hour: 21,            tint: "rgba(16, 28, 84, 0.66)",   brightness: 0.42, saturate: 0.3,  sepia: 0,    hue: 0,   moon: 1 },
    { hour: DIAL_END_HOUR,   tint: "rgba(10, 18, 60, 0.7)",    brightness: 0.36, saturate: 0.25, sepia: 0,    hue: 0,   moon: 1 },
  ];
}

/**
 * Typical crowd pattern, 0 to 100. An estimate from visitor reports, not live data;
 * the UI labels it as such. `null` means the gates are shut.
 */
export const CROWD_CURVE: { hour: number; value: number | null }[] = [
  { hour: 5, value: null },
  { hour: 5.75, value: 12 },
  { hour: 6.5, value: 22 },
  { hour: 7.5, value: 34 },
  { hour: 8.5, value: 50 },
  { hour: 9.5, value: 68 },
  { hour: 10.5, value: 86 },
  { hour: 11.5, value: 94 },
  { hour: 12.5, value: 92 },
  { hour: 13.5, value: 86 },
  { hour: 14.5, value: 80 },
  { hour: 15.5, value: 77 },
  { hour: 16.5, value: 72 },
  { hour: 17.1, value: 60 },
  { hour: 17.4, value: null },
  { hour: 20, value: null },
  { hour: 20.1, value: 14 },
  { hour: 22, value: 16 },
  { hour: 23.9, value: 10 },
  { hour: 24, value: null },
];

# Taj City

A mobile-first visitor companion for Agra, built with Next.js 16, React 19, Tailwind CSS v4 and Motion.
It answers the questions visitors actually have on the day: is the Taj open right now, when is the
light best, where should I eat, how far is everything, and what's my plan.

## What it does

- **Live Taj status.** Opening and closing times are calculated from today's sunrise and sunset in
  Agra (gates open 30 minutes before sunrise and close 30 minutes before sunset), shown in IST
  whatever the visitor's own time zone. Fridays are handled, and the next full-moon night-viewing
  window is computed from the lunar phase.
- **Light dial.** Drag through the day and a real photo of the Taj is colour-graded to that hour.
  Phase boundaries follow today's actual sunrise and sunset. A crowd curve (a labelled estimate)
  and advice on gates and timing update as you drag.
- **Explore.** Monuments, food institutions and craft stops with live search. A swipe rail on
  phones, an asymmetric grid on desktop. Every place opens a detail sheet with hours, fees, the
  local tip and directions.
- **Map.** MapLibre with OpenFreeMap tiles (free, no key), lazy-loaded on approach, themed for
  light and dark, with numbered pins synced to a distance-ordered list.
- **My day.** Save stops from anywhere, drag to reorder, open the whole route in Google Maps in
  order, share it, and undo removals. Saved on the device.
- **Ready-made days.** Three routed itineraries you can load into your plan in one tap.

## Design decisions

- **Palette:** cool "Makrana marble" neutrals with a single lapis-lazuli accent, taken from the
  Taj's pietra dura inlay. Every text pairing passes WCAG AA in both themes.
- **Type:** Geist for UI, Geist Mono for times and distances, Tiro Devanagari Hindi for place
  names in Hindi.
- **Mobile first:** a floating tab bar in the thumb zone, bottom sheets that become side panels
  from `lg`, touch targets of 40px or more, `svh` units and safe-area insets.
- **Motion with a job:** entrance choreography in the hero, shared-layout pills, sheet physics and
  the dial's spring. Everything respects `prefers-reduced-motion`.
- **Honest content:** photos are openly licensed from Wikimedia Commons and credited in each
  sheet and in the footer. Dish photos are captioned as dishes, and estimates are labelled as
  estimates.

## Architecture

```
src/
  app/            layout (fonts, no-flash theme script), page, design tokens
  components/     one folder per section, plus ui/ primitives and sheets/
  data/           place content, coordinates and photo metadata, light-dial model
  lib/            agra-time.ts (sun and moon maths in IST), stores.ts (external stores)
```

Shared client state (clock, theme, plan, open sheet, toasts) lives in small
`useSyncExternalStore` stores rather than context, so server-rendered sections stay server
components and nothing touches the clock or `localStorage` during prerender. The page builds to
fully static HTML.

## Run it

```bash
npm install
```

```bash
npm run dev
```

Lint, format and build:

```bash
npm run lint && npm run format:check && npm run build
```

## Credits

Photos from Wikimedia Commons under their stated licences (listed in the site footer). Map data
© OpenStreetMap contributors, tiles by OpenFreeMap. Sun and moon calculations by SunCalc.

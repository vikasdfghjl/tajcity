import type { TransitRoute } from "@/data/types";

/** Approximate road distances and drive times from the Taj; real times depend on traffic. */
export const ROUTES_FROM_TAJ: TransitRoute[] = [
  { from: "Taj Mahal", toId: "agra-fort", distance: "2.5 km", time: "8 to 10 min" },
  { from: "Taj Mahal", toId: "mehtab-bagh", distance: "7.5 km", time: "18 to 20 min" },
  { from: "Taj Mahal", toId: "sadar-bazaar-shopping", distance: "4.8 km", time: "12 to 15 min" },
  { from: "Taj Mahal", toId: "sadar-chaat-gali", distance: "4.8 km", time: "12 to 15 min" },
  { from: "Taj Mahal", toId: "itmad-ud-daulah", distance: "6 km", time: "about 15 min" },
  { from: "Taj Mahal", toId: "akbar-tomb-sikandra", distance: "14 km", time: "25 to 30 min" },
  { from: "Taj Mahal", toId: "fatehpur-sikri", distance: "38 km", time: "55 to 65 min" },
];

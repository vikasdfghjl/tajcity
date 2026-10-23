import { CRAFT_AND_GEMS_DATA, FOOD_DATA, MONUMENTS_DATA, PlaceItem } from "@/data/agraData";

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

const COMMONS = "https://thumb.wikimedia.org/wikipedia/commons/thumb";

function commons(
  path: string,
  file: string,
  meta: Omit<Photo, "base" | "file" | "page"> & { page: string },
): Photo {
  return { base: `${COMMONS}/${path}/${file}`, file, ...meta };
}

export const HERO_PHOTO = commons("b/b2", "Taj_Mahal_Tomb_at_sunrise.JPG", {
  width: 4288,
  height: 2848,
  author: "MarcBW",
  license: "CC BY-SA 3.0",
  page: "https://commons.wikimedia.org/wiki/File:Taj_Mahal_Tomb_at_sunrise.JPG",
  focus: "50% 60%",
});

const PHOTOS: Record<string, Photo> = {
  "taj-mahal": commons("7/74", "Taj_Mahal%2C_Agra%2C_India_edit2.jpg", {
    width: 3840,
    height: 2525,
    author: "Yann, edited by King of Hearts",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Taj_Mahal,_Agra,_India_edit2.jpg",
  }),
  "agra-fort": commons("8/8d", "Agra_03-2016_16_Agra_Fort.jpg", {
    width: 5410,
    height: 3607,
    author: "A.Savin",
    license: "FAL",
    page: "https://commons.wikimedia.org/wiki/File:Agra_03-2016_16_Agra_Fort.jpg",
  }),
  "fatehpur-sikri": commons("b/b5", "Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg", {
    width: 2938,
    height: 2536,
    author: "Marcin Białek",
    license: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg",
    focus: "50% 35%",
  }),
  "mehtab-bagh": commons("a/ab", "View_of_Taj_Mahal_from_Mehtab_Bagh_gardens.jpg", {
    width: 3888,
    height: 2592,
    author: "LittleDwangs",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:View_of_Taj_Mahal_from_Mehtab_Bagh_gardens.jpg",
  }),
  "itmad-ud-daulah": commons(
    "8/8c",
    "Framed_View_of_Itmad-ud-Daulah%E2%80%99s_Tomb%2C_Agra%2C_India.jpg",
    {
      width: 5874,
      height: 3671,
      author: "Rohit Sharma",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Framed_View_of_Itmad-ud-Daulah%E2%80%99s_Tomb,_Agra,_India.jpg",
    },
  ),
  "akbar-tomb-sikandra": commons("a/a6", "Tumba_de_Akbar_el_Grande-Sikandra-India01.JPG", {
    width: 3318,
    height: 2421,
    author: "Diego Delso",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Tumba_de_Akbar_el_Grande-Sikandra-India01.JPG",
  }),
  "panchhi-petha": commons("b/bc", "Petha_kesari.JPG", {
    width: 5184,
    height: 3456,
    author: "PJ.wikilovesfood",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Petha_kesari.JPG",
    pictured: "Kesar petha",
  }),
  "deviram-sweets": commons("9/91", "Jalebi-_Kolkata_-_West_Bengal_-_DSC_0011.jpg", {
    width: 5708,
    height: 3872,
    author: "Tapas Kumar Halder",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Jalebi-_Kolkata_-_West_Bengal_-_DSC_0011.jpg",
    pictured: "Jalebi",
  }),
  "pinch-of-spice": commons("3/3e", "Dal_Makhani..JPG", {
    width: 4896,
    height: 3672,
    author: "Miansari66",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Dal_Makhani..JPG",
    pictured: "Dal makhani",
  }),
  "mama-frankie": commons("2/25", "Chicken_Kathi_Roll_%285646735923%29.jpg", {
    width: 2048,
    height: 1536,
    author: "Andy Mitchell",
    license: "CC BY-SA 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Chicken_Kathi_Roll_(5646735923).jpg",
    pictured: "Chicken kathi roll",
  }),
  "sadar-chaat-gali": commons("7/7f", "Aloo_Tikki_Chaat.JPG", {
    width: 3072,
    height: 2304,
    author: "Nanditamomai",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Aloo_Tikki_Chaat.JPG",
    pictured: "Aloo tikki chaat",
  }),
  "pietra-dura-inlay": commons("4/48", "Marbleworks-1.jpg", {
    width: 2295,
    height: 1531,
    author: "David Castor",
    license: "Public domain",
    page: "https://commons.wikimedia.org/wiki/File:Marbleworks-1.jpg",
  }),
  "sadar-bazaar-shopping": commons("8/8d", "Sadar_Bazar%2C_Agra.jpg", {
    width: 2272,
    height: 1704,
    author: "Siddhartha Shukla",
    license: "CC BY-SA 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Sadar_Bazar,_Agra.jpg",
  }),
};

/** Monument pins are exact. Food and craft pins mark the neighbourhood, so `approximate` is set. */
const GEO: Record<string, { lat: number; lng: number; approximate?: boolean; query: string }> = {
  "taj-mahal": { lat: 27.1751, lng: 78.0421, query: "Taj Mahal East Gate, Agra" },
  "agra-fort": { lat: 27.1795, lng: 78.0211, query: "Agra Fort, Agra" },
  "fatehpur-sikri": { lat: 27.0945, lng: 77.664, query: "Buland Darwaza, Fatehpur Sikri" },
  "mehtab-bagh": { lat: 27.18, lng: 78.0433, query: "Mehtab Bagh, Agra" },
  "itmad-ud-daulah": { lat: 27.1928, lng: 78.0308, query: "Itimad-ud-Daulah Tomb, Agra" },
  "akbar-tomb-sikandra": { lat: 27.22, lng: 77.9506, query: "Akbar's Tomb, Sikandra, Agra" },
  "panchhi-petha": {
    lat: 27.1985,
    lng: 78.0055,
    approximate: true,
    query: "Panchhi Petha Store, Hari Parvat, Agra",
  },
  "deviram-sweets": {
    lat: 27.1668,
    lng: 78.0102,
    approximate: true,
    query: "Deviram Sweets, Pratappura, Agra",
  },
  "pinch-of-spice": {
    lat: 27.1598,
    lng: 78.0478,
    approximate: true,
    query: "Pinch of Spice, Fatehabad Road, Agra",
  },
  "sheroes-hangout": {
    lat: 27.1607,
    lng: 78.0437,
    approximate: true,
    query: "Sheroes Hangout, Fatehabad Road, Agra",
  },
  "mama-frankie": {
    lat: 27.1597,
    lng: 78.0123,
    approximate: true,
    query: "Mama Franky House, Sadar Bazaar, Agra",
  },
  "sadar-chaat-gali": {
    lat: 27.1592,
    lng: 78.0108,
    approximate: true,
    query: "Chaat Gali, Sadar Bazaar, Agra",
  },
  "pietra-dura-inlay": {
    lat: 27.1689,
    lng: 78.0447,
    approximate: true,
    query: "Marble inlay workshop, Tajganj, Agra",
  },
  "sadar-bazaar-shopping": {
    lat: 27.1601,
    lng: 78.0116,
    approximate: true,
    query: "Sadar Bazaar, Agra Cantt",
  },
};

export type PlaceKind = "monument" | "food" | "craft";

export interface Place extends Omit<PlaceItem, "image" | "category"> {
  kind: PlaceKind;
  photo?: Photo;
  lat: number;
  lng: number;
  approximate: boolean;
  mapsQuery: string;
}

function toPlace(item: PlaceItem, kind: PlaceKind): Place {
  const geo = GEO[item.id];
  return {
    ...item,
    kind,
    photo: PHOTOS[item.id],
    lat: geo.lat,
    lng: geo.lng,
    approximate: geo.approximate ?? false,
    mapsQuery: geo.query,
  };
}

export const PLACES: Place[] = [
  ...MONUMENTS_DATA.map((item) => toPlace(item, "monument")),
  ...FOOD_DATA.map((item) => toPlace(item, "food")),
  ...CRAFT_AND_GEMS_DATA.map((item) => toPlace(item, "craft")),
];

const PLACE_BY_ID = new Map(PLACES.map((place) => [place.id, place]));

export function getPlace(id: string): Place | undefined {
  return PLACE_BY_ID.get(id);
}

export const KIND_LABEL: Record<PlaceKind, string> = {
  monument: "Monument",
  food: "Food",
  craft: "Craft",
};

/** Straight-line distance from the Taj in km, used for ordering only. */
export function distanceFromTajKm(place: Pick<Place, "lat" | "lng">): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const taj = GEO["taj-mahal"];
  const dLat = toRad(place.lat - taj.lat);
  const dLng = toRad(place.lng - taj.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(taj.lat)) * Math.cos(toRad(place.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function directionsUrl(place: Pick<Place, "mapsQuery">): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapsQuery)}`;
}

/** Google Maps route through every stop, in plan order (Maps allows up to 9 waypoints). */
export function routeUrl(places: Pick<Place, "mapsQuery">[]): string | null {
  if (places.length < 2) {
    return null;
  }
  const stops = places.slice(0, 11).map((place) => encodeURIComponent(place.mapsQuery));
  const origin = stops[0];
  const destination = stops[stops.length - 1];
  const waypoints = stops.slice(1, -1).join("%7C");
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${
    waypoints ? `&waypoints=${waypoints}` : ""
  }`;
}

/** First segment of a long hours string, e.g. "Sunrise to Sunset" */
export function shortHours(place: Pick<Place, "timings">): string {
  return place.timings.split("(")[0].trim();
}

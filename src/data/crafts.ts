import { commonsPhoto } from "@/data/commons";
import { SOURCES } from "@/data/sources";
import type { Place } from "@/data/types";

/** Craft and shopping stops. Pins mark the neighbourhood; mapsQuery finds the area. */
export const CRAFT_STOPS: Place[] = [
  {
    id: "pietra-dura-inlay",
    kind: "craft",
    name: "Marble inlay workshops (parchin kari)",
    hindiName: "पच्चीकारी",
    tagline: "Watch the Taj's stone-inlay craft being made today",
    description:
      "Parchin kari is the Mughal form of pietra dura: semi-precious stones cut and set into marble. How much Florentine craftsmen influenced it is debated, but the style reached its peak under Shah Jahan, on the Taj. Workshops around Tajganj still cut stone on hand-turned wheels.",
    timings: "Roughly 10 AM to 8 PM",
    priceRange: "From small coasters to large tabletops",
    address: "Workshops around Tajganj, Agra",
    distanceFromTaj: "1.5 km",
    bestTime: "Afternoon, when artisans are at work",
    insiderTip:
      "Test before you buy: soapstone and alabaster mark under a fingernail, real marble doesn't, and genuine marble glows softly when you hold a phone torch against it.",
    mustTryOrSee: [
      "Artisans shaping stone on hand-turned wheels",
      "Inlaid coasters, boxes and plates",
      "Marble that glows under a torch",
    ],
    tags: ["Craft", "Pietra dura", "Inlay", "Marble", "Souvenirs"],
    lat: 27.1689,
    lng: 78.0447,
    approximate: true,
    mapsQuery: "Marble inlay workshop, Tajganj, Agra",
    photo: commonsPhoto("4/48", "Marbleworks-1.jpg", {
      width: 2295,
      height: 1531,
      author: "David Castor",
      license: "Public domain",
      page: "https://commons.wikimedia.org/wiki/File:Marbleworks-1.jpg",
    }),
    sources: [SOURCES.wikiPietraDura],
  },
  {
    id: "sadar-bazaar-shopping",
    kind: "craft",
    name: "Sadar Bazaar shoes and leather",
    hindiName: "सदर बाज़ार",
    tagline: "Leather shoes and bags from one of India's biggest shoemaking cities",
    description:
      "Agra is a major centre of India's footwear industry, making roughly a quarter of the country's footwear exports. Sadar Bazaar, in the cantonment, is the easiest place to browse leather shoes, bags and jackets alongside handicraft shops.",
    timings: "Late morning to late evening",
    closedOn: "Tuesdays (weekly market holiday)",
    priceRange: "Bargain-friendly",
    address: "Sadar Bazaar, Agra Cantt",
    distanceFromTaj: "4.8 km",
    bestTime: "Evening, combined with dinner in the bazaar",
    insiderTip:
      "Avoid Tuesdays. Check stitching and leather stamps, and haggle politely at smaller stalls; fixed-price shops won't move.",
    mustTryOrSee: ["Leather shoes and boots", "Leather bags and jackets", "Handicraft shops"],
    tags: ["Shopping", "Leather", "Shoes", "Bazaar"],
    lat: 27.1601,
    lng: 78.0116,
    approximate: true,
    mapsQuery: "Sadar Bazaar, Agra Cantt",
    photo: commonsPhoto("8/8d", "Sadar_Bazar%2C_Agra.jpg", {
      width: 2272,
      height: 1704,
      author: "Siddhartha Shukla",
      license: "CC BY-SA 2.0",
      page: "https://commons.wikimedia.org/wiki/File:Sadar_Bazar,_Agra.jpg",
    }),
    sources: [SOURCES.agraFootwear, SOURCES.wikiSadarBazaar],
  },
];

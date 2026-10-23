import type { Source } from "@/data/types";

/**
 * References the place data was checked against. Official sources (ASI, the Agra
 * Development Authority's Taj site, the Agra district site, UNESCO, IP India) come first;
 * well-known publications fill in the food and craft details official sites don't cover.
 */
export const SOURCES = {
  tajHours: {
    label: "Taj Mahal visiting hours (official)",
    url: "https://tajmahal.gov.in/visiting-hours.aspx",
  },
  agraTicketing: {
    label: "Agra monuments ticketing (official)",
    url: "https://tajmahal.gov.in/ticketing.aspx",
  },
  tajRules: {
    label: "Taj Mahal dos and don'ts (official)",
    url: "https://tajmahal.gov.in/dos-and-donts.aspx",
  },
  tajNightView: {
    label: "Taj Mahal night viewing (official)",
    url: "https://tajmahal.gov.in/night-view.aspx",
  },
  agraFortDistrict: {
    label: "Agra Fort, Agra district (official)",
    url: "https://agra.nic.in/tourist-place/agra-fort/",
  },
  akbarTombDistrict: {
    label: "Akbar's Tomb, Agra district (official)",
    url: "https://agra.nic.in/tourist-place/akbars-tomb/",
  },
  unescoTaj: { label: "UNESCO: Taj Mahal", url: "https://whc.unesco.org/en/list/252/" },
  unescoAgraFort: { label: "UNESCO: Agra Fort", url: "https://whc.unesco.org/en/list/251/" },
  unescoFatehpurSikri: {
    label: "UNESCO: Fatehpur Sikri",
    url: "https://whc.unesco.org/en/list/255/",
  },
  britannicaAgraFort: {
    label: "Britannica: Agra Fort",
    url: "https://www.britannica.com/topic/Agra-Fort",
  },
  wikiFatehpurSikri: {
    label: "Wikipedia: Fatehpur Sikri",
    url: "https://en.wikipedia.org/wiki/Fatehpur_Sikri",
  },
  wikiMehtabBagh: {
    label: "Wikipedia: Mehtab Bagh",
    url: "https://en.wikipedia.org/wiki/Mehtab_Bagh",
  },
  wikiItmadUdDaulah: {
    label: "Wikipedia: Tomb of I'timad-ud-Daulah",
    url: "https://en.wikipedia.org/wiki/Tomb_of_I%27tim%C4%81d-ud-Daulah",
  },
  wikiAkbarsTomb: {
    label: "Wikipedia: Akbar's tomb",
    url: "https://en.wikipedia.org/wiki/Akbar%27s_tomb",
  },
  wikiPietraDura: {
    label: "Wikipedia: Pietra dura",
    url: "https://en.wikipedia.org/wiki/Pietra_dura",
  },
  wikiSheroes: {
    label: "Wikipedia: Sheroes Hangout",
    url: "https://en.wikipedia.org/wiki/Sheroes_Hangout",
  },
  wikiSadarBazaar: {
    label: "Wikipedia: Sadar Bazaar, Agra",
    url: "https://en.wikipedia.org/wiki/Sadar_Bazaar,_Agra",
  },
  ipIndiaPethaGi: {
    label: "IP India GI register: Agra Petha (application 1157)",
    url: "https://search.ipindia.gov.in/GIRPublicSearch/Application/Details/1157",
  },
  nationalPetha: {
    label: "The National: the story of Agra's petha",
    url: "https://www.thenational.ae/lifestyle/food/how-the-indian-delicacy-petha-pays-bittersweet-tribute-to-the-taj-mahal-1.1200568",
  },
  outlookAgraFood: {
    label: "Outlook Traveller: a guide to eating through Agra",
    url: "https://www.outlooktraveller.com/experiences/food-and-drink/foodies-delight-a-guide-to-eating-through-agra",
  },
  betterIndiaAgraEateries: {
    label: "The Better India: Agra's iconic eateries",
    url: "https://thebetterindia.com/357477/agra-list-of-iconic-eateries-to-try-chole-bhature-petha-bedhai-jaleebi-dosa-chaat-house",
  },
  afarSheroes: {
    label: "Afar: Sheroes, a café with a mission",
    url: "https://www.afar.com/magazine/sheroes-run-by-acid-attack-survivors-is-more-than-a-cafe",
  },
  pinchOfSpiceListing: {
    label: "ThreeBestRated: Pinch of Spice, Agra",
    url: "https://threebestrated.in/pinch-of-spice-non-veg-restuarants-agra-up-GRnun",
  },
  mamaFrankyListing: {
    label: "ThreeBestRated: Mama Franky House, Agra",
    url: "https://threebestrated.in/mama-chicken-mama-franky-house-non-veg-restuarants-agra-up-AZ8pA",
  },
  agraFootwear: {
    label: "FashionUnited: Agra's footwear industry",
    url: "https://fashionunited.in/news/fashion/locally-made-leather-footwear-to-cost-less/2015030911354",
  },
} satisfies Record<string, Source>;

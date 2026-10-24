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
  desiVibesListing: {
    label: "EazyDiner: Desi Vibes, Tajganj",
    url: "https://www.eazydiner.com/agra/desi-vibes-tajganj-agra-708291",
  },
  desiVibesGuide: {
    label: "EazyDiner: Desi Vibes Agra, menu and ambience",
    url: "https://www.eazydiner.com/food-trends/desi-vibes-agra-why-its-one-of-the-best-restaurants-and-places-to-eat-in-agra",
  },
  udupiBrindavanPearl: {
    label: "Pearl: Udupi Brindavan, Agra",
    url: "https://joinpearl.co/restaurants/agra/udupi-brindavan",
  },
  udupiBrindavanListing: {
    label: "ThreeBestRated: Udupi Brindavan, Agra",
    url: "https://threebestrated.in/udupi-brindavan-pure-vegetarian-restuarants-agra-up-QGljd",
  },
  naivedyamListing: {
    label: "EazyDiner: Naivedyam, Fatehabad Road",
    url: "https://www.eazydiner.com/agra/naivedyam-fatehabad-road-agra-704563",
  },
  deepeeListing: {
    label: "Wanderlog: Deepee Restaurant (formerly Dasaprakash)",
    url: "https://wanderlog.com/place/details/3051133/deepee-restaurant-formerly-dasaprakash",
  },
  palmBurjListing: {
    label: "Wanderlog: The Palm Burj, Agra",
    url: "https://wanderlog.com/place/details/2945336/the-palm-burj-best-rooftop--best-lounge--best-club--best-pub--best-restaurant-in-agra",
  },
  tajnumaListing: {
    label: "magicpin: Tajnuma, Tajganj",
    url: "https://magicpin.in/Agra/Tajganj/Restaurant/Tajnuma/store/20878ac",
  },
  esphahanOfficial: {
    label: "The Oberoi Amarvilas: Esphahan (official)",
    url: "https://www.oberoihotels.com/hotels-in-agra-amarvilas-resort/dining/esphahan/",
  },
  bellevueOfficial: {
    label: "The Oberoi Amarvilas: Bellevue (official)",
    url: "https://www.oberoihotels.com/hotels-in-agra-amarvilas-resort/dining/bellevue/",
  },
  peshawriListing: {
    label: "EazyDiner: Peshawri, ITC Mughal",
    url: "https://www.eazydiner.com/agra/peshawri-itc-mughal-tajganj-668426",
  },
  peshawriDishes: {
    label: "Restaurants for Kings: Peshawri, Agra",
    url: "https://restaurantsforkings.com/city/agra/peshawri",
  },
  soCityAgraBreakfast: {
    label: "So City: breakfast spots in Agra",
    url: "https://so.city/agra/article/from-pancakes-to-paranthas-9-best-breakfast-spots-in-agra-to-kickstart-your-day",
  },
  lonelyPlanetAgraEating: {
    label: "Lonely Planet: restaurants in Agra",
    url: "https://www.lonelyplanet.com/india/uttar-pradesh/agra/restaurants",
  },
  shankaraHappyCow: {
    label: "HappyCow: Shankara Vegis, Agra",
    url: "https://www.happycow.net/reviews/shankara-vegis-agra-32289",
  },
  joneysListing: {
    label: "Trip.com: Joney's Place, Tajganj",
    url: "https://au.trip.com/restaurant/india/agra/detail/joney-s-place-501931",
  },
  sugarNThymeListing: {
    label: "Yappe: Sugar N Thyme, Agra",
    url: "https://yappe.in/uttar-pradesh/agra/sugar-n-thyme/29608",
  },
  thirdWaveFatehabad: {
    label: "Third Wave Coffee: Fatehabad Road store (official)",
    url: "https://stores.thirdwavecoffeeroasters.com/store-pages/third-wave-coffee-fatehabad-agra",
  },
  saltCafeListing: {
    label: "Wanderlog: The Salt Cafe, Agra",
    url: "https://wanderlog.com/place/details/108294/the-salt-cafe",
  },
  tripxlAgraFood: {
    label: "TripXL: best food in Agra",
    url: "https://tripxl.com/blog/best-food-in-agra/",
  },
  tajTimeLimit2019: {
    label: "Business Today: three-hour limit at the Taj (June 2019)",
    url: "https://www.businesstoday.in/current/economy-politics/pay-fine-spend-more-3-hours-taj-mahal/story/355420.html",
  },
  wikiAgraCantt: {
    label: "Wikipedia: Agra Cantonment railway station",
    url: "https://en.wikipedia.org/wiki/Agra_Cantonment_railway_station",
  },
  wikiGatimaan: {
    label: "Wikipedia: Gatimaan Express",
    url: "https://en.wikipedia.org/wiki/Gatimaan_Express",
  },
  wikiAgraAirport: {
    label: "Wikipedia: Agra Airport",
    url: "https://en.wikipedia.org/wiki/Agra_Airport",
  },
  wikiYamunaExpressway: {
    label: "Wikipedia: Yamuna Expressway",
    url: "https://en.wikipedia.org/wiki/Yamuna_Expressway",
  },
  uberAgra: {
    label: "Uber: getting around Agra (official)",
    url: "https://www.uber.com/global/en/r/cities/agra-uttar-pradesh-in/",
  },
  goAsiaAgraTransport: {
    label: "GoAsia: getting around Agra (October 2026)",
    url: "https://goasia.cc/en/india/agra-to-agra",
  },
  smarterTravelAgra: {
    label: "SmarterTravel: Agra warnings and dangers",
    url: "https://www.smartertravel.com/tips-agra-warnings-dangers-stay-safe/",
  },
  tajScamsGuide: {
    label: "Taj Mahal Day Tour: common Taj Mahal scams",
    url: "https://www.tajmahaldaytour.net/blog/taj-mahal-travel-scams/",
  },
  queueSkipScam: {
    label: "The CSR Journal: queue-skipping scam reported at the Taj",
    url: "https://thecsrjournal.in/irish-couple-reports-scam-over-taj-mahal-queue-skipping-fees",
  },
  tajSecurityPolice: {
    label: "Asianet: Taj Security Police help a visitor at the West Gate",
    url: "https://newsable.asianetnews.com/india/agra-constable-helps-foreign-tourist-drape-saree-at-taj-mahal-video-articleshow-mmusxz2",
  },
  wikiClimateAgra: {
    label: "Wikipedia: Climate of Agra (IMD normals 1991–2020)",
    url: "https://en.wikipedia.org/wiki/Climate_of_Agra",
  },
  wionTajFog: {
    label: "WION: winter fog hides the Taj (December 2023)",
    url: "https://www.wionews.com/india-news/india-tourists-left-disappointed-at-iconic-as-winter-fog-shrouds-iconic-taj-mahal-673948",
  },
  bestTimeTaj: {
    label: "Finding Our Adventure: best time to visit the Taj, month by month",
    url: "https://www.findingouradventure.com/travel-diaries/best-time-to-visit-the-taj-mahal",
  },
  agraFootwear: {
    label: "FashionUnited: Agra's footwear industry",
    url: "https://fashionunited.in/news/fashion/locally-made-leather-footwear-to-cost-less/2015030911354",
  },
} satisfies Record<string, Source>;

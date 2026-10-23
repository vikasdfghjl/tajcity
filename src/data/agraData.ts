export interface PlaceItem {
  id: string;
  name: string;
  hindiName: string;
  category: "monument" | "food" | "craft" | "gem";
  subCategory?: string;
  rating: number;
  reviewCount: number;
  image?: string; // Only set when we have a photo of this exact place
  tagline: string;
  description: string;
  timings: string;
  closedOn?: string;
  entryFee?: {
    indian: string;
    foreigner: string;
    saarc?: string;
  };
  priceRange?: string; // e.g. "₹ - Budget" or "₹₹ - Moderate"
  location: string;
  distanceFromTaj: string;
  bestTime: string;
  insiderTip: string;
  mustTryOrSee: string[];
  tags: string[];
}

export interface ItineraryPreset {
  id: string;
  title: string;
  badge: string;
  duration: string;
  idealFor: string;
  summary: string;
  estimatedBudget: string;
  stops: {
    time: string;
    placeId: string;
    title: string;
    activity: string;
    tip: string;
  }[];
}

export const MONUMENTS_DATA: PlaceItem[] = [
  {
    id: "taj-mahal",
    name: "The Taj Mahal",
    hindiName: "ताज महल",
    category: "monument",
    subCategory: "UNESCO Wonder",
    rating: 4.9,
    reviewCount: 382000,
    image: "/images/taj_hero.jpg",
    tagline: "The world's supreme poetry in white Makrana marble",
    description:
      "Commissioned in 1632 by Mughal Emperor Shah Jahan to house the tomb of his favorite wife Mumtaz Mahal, this ivory-white marble mausoleum on the south bank of the Yamuna is the pinnacle of Mughal architecture and one of the New Seven Wonders of the World.",
    timings: "Sunrise to Sunset (Approx. 6:00 AM - 6:30 PM)",
    closedOn: "Every Friday (Only open for afternoon mosque prayers for locals)",
    entryFee: {
      indian: "₹50 (Mausoleum interior: +₹200)",
      foreigner: "₹1,100 (Mausoleum interior: +₹200)",
      saarc: "₹540",
    },
    location: "Dharmapuri, Forest Colony, Tajganj, Agra",
    distanceFromTaj: "0 km (Ground Zero)",
    bestTime: "Sunrise (5:45 AM - 7:30 AM) for golden glow and thinnest crowds",
    insiderTip:
      "Always enter via the East Gate (VIP/Pre-booked) — it moves 3x faster than the crowded West Gate. Do not bring tripods, power banks, tobacco, or books inside.",
    mustTryOrSee: [
      "The Central Pool Reflection at dawn",
      "Pietra Dura semi-precious floral inlays on marble walls",
      "Optical illusion of the Main Gateway (Darwaza-i-Rauza)",
      "View across the Yamuna river towards Mehtab Bagh",
    ],
    tags: ["UNESCO", "Iconic", "Mausoleum", "Sunrise", "Must Visit"],
  },
  {
    id: "agra-fort",
    name: "Agra Fort (Lal Qila)",
    hindiName: "आगरा किला",
    category: "monument",
    subCategory: "Imperial Fortress",
    rating: 4.7,
    reviewCount: 142000,
    image: "/images/agra_fort.jpg",
    tagline: "The seat of Mughal emperors with breathtaking Taj vistas",
    description:
      "A massive 16th-century fortress of red sandstone sprawling along the Yamuna river. It served as the main residence of the Mughal emperors until 1638. Inside lies the tragic Musamman Burj, an octagonal marble tower where Shah Jahan was imprisoned by his son Aurangzeb, gazing at the Taj Mahal.",
    timings: "Sunrise to Sunset (6:00 AM - 6:00 PM)",
    closedOn: "Open all 7 days",
    entryFee: {
      indian: "₹50",
      foreigner: "₹650",
    },
    location: "Agra Fort, Rakabganj, Agra",
    distanceFromTaj: "2.5 km (10 mins via auto)",
    bestTime: "Late afternoon (2:30 PM - 5:00 PM) when red sandstone turns deep amber",
    insiderTip:
      "Stand at the balcony of Musamman Burj for the exact viewpoint where Shah Jahan spent his last 8 years looking at Mumtaz's tomb across the water.",
    mustTryOrSee: [
      "Musamman Burj (Shah Jahan's prison balcony)",
      "Sheesh Mahal (Palace of Mirrors with Belgian glass)",
      "Diwan-i-Khas & Diwan-i-Aam imperial halls",
      "Jahangir's Palace monumental sandstone carving",
    ],
    tags: ["UNESCO", "Fort", "Sandstone", "Architecture", "Viewpoint"],
  },
  {
    id: "fatehpur-sikri",
    name: "Fatehpur Sikri",
    hindiName: "फतेहपुर सीकरी",
    category: "monument",
    subCategory: "Ancient Capital",
    rating: 4.6,
    reviewCount: 68000,
    tagline: "Emperor Akbar's mystical ghost city & Buland Darwaza",
    description:
      "Built by Emperor Akbar in 1571 to honor Sufi saint Sheikh Salim Chishti, this UNESCO World Heritage city was abandoned after just 14 years due to water shortage. It remains impeccably preserved with soaring gateways, courtyards, and white marble shrines.",
    timings: "Sunrise to Sunset (6:00 AM - 6:00 PM)",
    closedOn: "Open all 7 days",
    entryFee: {
      indian: "₹50",
      foreigner: "₹610",
    },
    location: "Fatehpur Sikri (36 km west of Agra)",
    distanceFromTaj: "38 km (1 hour drive)",
    bestTime: "Morning (8:30 AM - 12:00 PM) before the desert sun gets intense",
    insiderTip:
      "Tie a red sacred thread at the jali screen of Salim Chishti's Dargah — centuries of emperors and travelers have made wishes here. Beware of unlicensed aggressive guides outside Buland Darwaza.",
    mustTryOrSee: [
      "Buland Darwaza (54m high 'Door of Victory')",
      "White marble tomb of Salim Chishti",
      "Panch Mahal (5-tier breezy pavilion)",
      "Diwan-i-Khas with the ornate central lotus pillar",
    ],
    tags: ["UNESCO", "Day Trip", "History", "Akbar", "Sufi Shrine"],
  },
  {
    id: "mehtab-bagh",
    name: "Mehtab Bagh (Moonlight Garden)",
    hindiName: "मेहताब बाग",
    category: "monument",
    subCategory: "Sunset Oasis",
    rating: 4.5,
    reviewCount: 45000,
    tagline: "The tranquil riverside garden with unobstructed sunset Taj silhouettes",
    description:
      "A Charbagh complex situated north of the Taj Mahal across the Yamuna River. Aligned perfectly with the Taj, it was built by Emperor Babur and later restored. It provides breathtaking views without the high security lines or crowded marble courtyards.",
    timings: "6:00 AM - 6:00 PM",
    closedOn: "Open all 7 days (Great alternative when Taj is closed on Friday!)",
    entryFee: {
      indian: "₹25",
      foreigner: "₹300",
    },
    location: "Opposite Taj Mahal, Nagla Devjit, Agra",
    distanceFromTaj: "7.5 km (by road via Yamuna bridge)",
    bestTime: "Golden Hour & Sunset (4:45 PM - 6:15 PM)",
    insiderTip:
      "If you're visiting Agra on a Friday when the Taj Mahal is closed, come here! You can sit on the lush lawn right at the riverbank with pristine views of the monument bathed in pink sunset light.",
    mustTryOrSee: [
      "Taj Mahal sunset reflection without people in your frame",
      "Photographers' point near the river fence",
      "Ancient octagonal pool foundations",
    ],
    tags: ["Sunset", "Photography", "Friday Alternative", "Gardens"],
  },
  {
    id: "itmad-ud-daulah",
    name: "Itmad-ud-Daulah (The Baby Taj)",
    hindiName: "एतमाद-उद-दौला (बेबी ताज)",
    category: "monument",
    subCategory: "Jewel Box Tomb",
    rating: 4.6,
    reviewCount: 39000,
    tagline: "The delicate forerunner and artistic blueprint of the Taj Mahal",
    description:
      "Built between 1622 and 1628 by Empress Nur Jahan for her father Mirza Ghiyas Beg, this tomb marked the transition from red sandstone to white marble with semi-precious stone Pietra Dura inlays. Its delicate lattice jali work is considered by scholars even finer than the Taj itself.",
    timings: "6:00 AM - 6:00 PM",
    closedOn: "Open all 7 days",
    entryFee: {
      indian: "₹30",
      foreigner: "₹310",
    },
    location: "Moti Bagh, Agra, Uttar Pradesh",
    distanceFromTaj: "6 km (15 mins via car)",
    bestTime: "Morning (9:00 AM - 11:30 AM) when daylight pours through marble screens",
    insiderTip:
      "Hardly any crowd! You can walk right up to the wall carvings, see the Persian wine vases, cypresses, and intricate fruit bowls inlaid with onyx and jasper.",
    mustTryOrSee: [
      "Persian wine-flasks and floral Pietra Dura inlay motifs",
      "Intricate riverfront sandstone pavilions",
      "Geometric marble flooring",
    ],
    tags: ["Hidden Gem", "Delicate Inlay", "Nur Jahan", "Peaceful"],
  },
  {
    id: "akbar-tomb-sikandra",
    name: "Akbar's Tomb, Sikandra",
    hindiName: "अकबर का मक़बरा, सिकंदरा",
    category: "monument",
    subCategory: "Dynasty Tomb",
    rating: 4.5,
    reviewCount: 29000,
    tagline: "The resting place of Mughal Empire's greatest ruler amid roaming blackbucks",
    description:
      "A monumental pyramid-shaped tomb built with red sandstone and white marble minarets, set inside a sprawling 119-acre walled park. Blackbucks, deer, and peacocks freely wander across the lush gardens surrounding the Emperor's tomb chamber.",
    timings: "6:00 AM - 6:00 PM",
    closedOn: "Open all 7 days",
    entryFee: {
      indian: "₹30",
      foreigner: "₹310",
    },
    location: "Sikandra, Agra (on Delhi-Agra Highway NH19)",
    distanceFromTaj: "14 km (25 mins drive)",
    bestTime: "Early morning or late afternoon",
    insiderTip:
      "Look at the Southern Gate (Buland Gate of Sikandra) — its calligraphic inscriptions and tile-work rival the finest monuments in Central Asia.",
    mustTryOrSee: [
      "Southern Grand Gateway with 4 marble minarets",
      "Spotted deer and peacocks roaming the gardens",
      "Acoustic reverberation inside Akbar's subterranean tomb chamber",
    ],
    tags: ["History", "Gardens", "Wildlife", "Grand Gateway"],
  },
];

export const FOOD_DATA: PlaceItem[] = [
  {
    id: "panchhi-petha",
    name: "Original Panchhi Petha",
    hindiName: "पंछी पेठा",
    category: "food",
    subCategory: "Legendary Sweet",
    rating: 4.8,
    reviewCount: 94000,
    tagline: "Agra's trademark translucent ash gourd sweet in 30+ royal flavors",
    description:
      "Agra and Petha are inseparable. Prepared from peeled winter melon (white pumpkin), alum, and sugar syrup, this dessert was supposedly invented by royal chefs during the Taj Mahal's construction to energize 20,000 workers. Panchhi Petha is the golden gold-standard since 1950.",
    timings: "9:00 AM - 10:30 PM",
    priceRange: "₹ - Affordable (₹180 - ₹450 / kg)",
    location: "Hari Parvat Crossing & Sadar Bazaar, Agra",
    distanceFromTaj: "4.5 km",
    bestTime: "Evening for fresh batches packaged in airtight boxes",
    insiderTip:
      "BEWARE of copycats: there are 500 fake 'Panchhi' signs. Buy ONLY from the verified flagship store at Hari Parvat Crossing or Sadar Bazaar. Ask for 'Angoori Petha' (soft spherical dipped in sweet grape syrup) and 'Paan Petha'!",
    mustTryOrSee: [
      "Angoori Petha (melt-in-mouth juicy balls)",
      "Kesar Petha (rich saffron infusion)",
      "Paan Petha (stuffed with gulkand and dry fruits)",
      "Dalmoth Namkeen (Agra's spicy lentil-sev snack)",
    ],
    tags: ["Must Eat", "GI Tagged", "Heritage Sweets", "Souvenir"],
  },
  {
    id: "deviram-sweets",
    name: "Deviram Sweets & Confectioners",
    hindiName: "देवीराम स्वीट्स",
    category: "food",
    subCategory: "Iconic Breakfast",
    rating: 4.7,
    reviewCount: 52000,
    image: "/images/agra_food.jpg",
    tagline: "The holy morning ritual: crispy Bedmi Poori, spicy Aloo, and hot Jalebi",
    description:
      "For over a century, locals from across Agra congregate at Deviram by 7:30 AM. Deep-fried, puffed urad dal Bedmi Pooris served with a smoking-hot, fenugreek-and-asafoetida spiced potato curry, sweet pumpkin sonth chutney, followed by crispy saffron-soaked jalebis.",
    timings: "7:00 AM - 10:30 PM (Bedmi Poori served 7:00 AM - 12:30 PM)",
    priceRange: "₹ - Budget (₹80 - ₹150 per person)",
    location: "Pratappura Crossing, Rakabganj, Agra",
    distanceFromTaj: "3.8 km",
    bestTime: "Morning 7:30 AM - 9:30 AM (Right after sunrise Taj Mahal visit!)",
    insiderTip:
      "Order the 'Bedmi Poori combo' with 'Nagori Halwa' or 'Jalebi'. The contrasting burst of fiery hot hing-aloo and crispy sweet syrupy jalebi is a rite of passage for every Agra traveler.",
    mustTryOrSee: [
      "Bedmi Poori with Methi Chutney & Aloo Sabzi",
      "Crispy Desi Ghee Jalebi",
      "Nagori Halwa (tiny crisp puri with semolina pudding)",
      "Kulhad Masala Chai",
    ],
    tags: ["Breakfast Legend", "Street Classic", "Bedmi Puri", "Locals Favorite"],
  },
  {
    id: "pinch-of-spice",
    name: "Pinch of Spice",
    hindiName: "पिंच ऑफ स्पाइस",
    category: "food",
    subCategory: "Fine Dining Mughlai",
    rating: 4.7,
    reviewCount: 38000,
    tagline: "Agra's undisputed benchmark for royal Mughlai & North Indian curries",
    description:
      "A sophisticated, award-winning culinary destination on Fatehabad Road. Celebrated for its velvety gravies, clay-oven tandoor kebabs, and royal Awadhi & Mughlai recipes cooked with artisanal slow-simmering methods.",
    timings: "12:00 PM - 11:30 PM",
    priceRange: "₹₹₹ - Fine Dining (₹800 - ₹1,500 per person)",
    location: "Fatehabad Road, Tajganj, Agra",
    distanceFromTaj: "2.1 km",
    bestTime: "Dinner (8:00 PM - 10:30 PM) — Book 1-2 hours in advance during peak season",
    insiderTip:
      "Their signature 'Chicken Tikka Lababdar' and 'Dal Pinch of Spice' (slow-cooked black lentils simmered for 24 hours with butter and cream) are unmatched anywhere in western UP.",
    mustTryOrSee: [
      "Chicken Tikka Lababdar (rich tomato-cashew gravy)",
      "Dal Pinch of Spice (24-hour slow cooked black lentils)",
      "Galouti Kebab with Roomali Roti",
      "Paneer Pasanda in saffron curry",
    ],
    tags: ["Fine Dining", "Royal Mughlai", "Family Friendly", "Fatehabad Road"],
  },
  {
    id: "sheroes-hangout",
    name: "Sheroes Hangout Café",
    hindiName: "शीरोज़ हैंगआउट",
    category: "food",
    subCategory: "Social Impact & Soul Food",
    rating: 4.9,
    reviewCount: 31000,
    tagline: "An inspiring café powered with courage by acid attack survivor warriors",
    description:
      "Located minutes from the Taj Mahal, Sheroes is a pay-what-you-wish community café operated entirely by courageous acid attack survivors. It features an in-house library, art exhibits, comforting shakes, noodles, pasta, parathas, and meaningful conversations that move every visitor.",
    timings: "10:00 AM - 10:00 PM",
    priceRange: "Pay What You Wish (Contribution based)",
    location: "Opposite Gateway Hotel, Taj Nagari Phase 1, Fatehabad Rd, Agra",
    distanceFromTaj: "1.8 km",
    bestTime: "Afternoon (2:00 PM - 5:00 PM) for chai, snacks, and talks",
    insiderTip:
      "Take time to talk with the staff and write in their visitor logbook. It will be the most touching, human memory of your entire trip to Agra.",
    mustTryOrSee: [
      "Ginger Masala Chai & Fresh Mint Mojito",
      "Cheese Loaded Nachos & Hakka Noodles",
      "Handmade crafts and survivor art postcards",
    ],
    tags: ["Heartwarming", "Pay What You Wish", "Café", "Near Taj", "Must Support"],
  },
  {
    id: "mama-frankie",
    name: "Mama Frankie House",
    hindiName: "मामा फ्रेंकी",
    category: "food",
    subCategory: "Evening Street Food",
    rating: 4.6,
    reviewCount: 26000,
    tagline: "Sizzling kathi rolls, butter chicken frankies & spicy mutton wraps",
    description:
      "The undisputed evening youth hangout of Sadar Bazaar. Famous for its flaky paratha rolls wrapped around smoking tandoori meats, melting butter, green chilies, onions, and secret chaat masala.",
    timings: "12:30 PM - 11:00 PM",
    priceRange: "₹ - Budget (₹100 - ₹250 per roll)",
    location: "A-Shop No 36, Sadar Bazaar, Agra Cantt",
    distanceFromTaj: "4.8 km",
    bestTime: "Evening (6:30 PM - 9:30 PM) when the griddle is blazing",
    insiderTip:
      "Try the 'Double Egg Chicken Mutton Mix Frankie' or the 'Butter Paneer Tikka Frankie' with a squeeze of fresh lime.",
    mustTryOrSee: [
      "Butter Chicken Frankie",
      "Mutton Seekh Kebab Roll",
      "Spicy Chaap Roll for vegetarians",
    ],
    tags: ["Street Food", "Late Night", "Sadar Bazaar", "Kathi Rolls"],
  },
  {
    id: "sadar-chaat-gali",
    name: "Agra Chaat Gali (Sadar Bazaar)",
    hindiName: "सदर चाट गली",
    category: "food",
    subCategory: "Street Chaat Hub",
    rating: 4.7,
    reviewCount: 41000,
    tagline: "Sensory explosion of Agra Bhalla, crispy Golgappe & Dahi Gujiya",
    description:
      "A vibrant culinary alley inside Sadar Bazaar packed with legendary chaat-walas. Agra is famous for its 'Bhalla' — unlike Delhi's aloo tikki, Agra's Bhalla is double-fried in pure desi ghee until shatteringly crisp, then drowned in spiced sweet dahi, zesty mint, and sonth chutney.",
    timings: "4:00 PM - 10:30 PM",
    priceRange: "₹ - Street Food (₹50 - ₹120 per plate)",
    location: "Chaat Gali, Sadar Bazaar, Agra",
    distanceFromTaj: "4.8 km",
    bestTime: "Post 6:00 PM when the bazaar is lit with fairy lights",
    insiderTip:
      "Order the 'Agra Desi Ghee Bhalla' from Pandit Chaat Bhandar or Shri Ji Chaat. Eat it hot right by the griddle!",
    mustTryOrSee: [
      "Agra Ka Bhalla (crispy potato croquette with beaten spiced curd)",
      "Pani Puri with 6 types of flavored water (Hing, Pudina, Saunf, Jeera)",
      "Dahi Gujiya (lentil dumplings filled with dry fruits)",
    ],
    tags: ["Chaat", "Street Food", "Desi Ghee", "Evening Vibe"],
  },
];

export const CRAFT_AND_GEMS_DATA: PlaceItem[] = [
  {
    id: "pietra-dura-inlay",
    name: "Pietra Dura (Parchin Kari) Marble Workshops",
    hindiName: "पच्चीकारी मार्बल हस्तकला",
    category: "craft",
    rating: 4.8,
    reviewCount: 18000,
    image: "/images/marble_craft.jpg",
    tagline: "Direct descendants of Taj Mahal's 17th-century master stonemasons",
    description:
      "The delicate art of inlaying semi-precious stones (lapis lazuli, malachite, carnelian, jasper, mother-of-pearl) into pure white Makrana marble was brought to Agra by Italian artisans under Emperor Jahangir and perfected for the Taj Mahal. Watch masters carve micro-grooves by hand with emerald emery wheels.",
    timings: "10:00 AM - 8:00 PM",
    priceRange: "₹₹ - Souvenirs from ₹500 to ₹50,000+",
    location: "Gokulpura & Tajganj Artisan Colonies, Agra",
    distanceFromTaj: "1.5 km",
    bestTime: "Afternoon 1:00 PM - 4:00 PM",
    insiderTip:
      "How to spot real marble: Press a fingernail into an unpolished underside. Soapstone and alabaster are soft enough to mark with a fingernail; real Makrana marble is not. Then hold a phone torch against it: genuine marble glows softly around the beam.",
    mustTryOrSee: [
      "Live demonstration of hand chiseling and stone fitting",
      "Coasters and jewelry boxes with floral motifs",
      "Illuminating marble plates under UV/flashlight",
    ],
    tags: ["Heritage Craft", "Artisan", "Pietra Dura", "Souvenirs"],
  },
  {
    id: "sadar-bazaar-shopping",
    name: "Sadar Bazaar Leather & Handicrafts",
    hindiName: "सदर बाज़ार लेदर मार्केट",
    category: "craft",
    rating: 4.5,
    reviewCount: 33000,
    tagline: "India's shoe capital: handcrafted leather boots, jackets & rugs",
    description:
      "Agra is the footwear manufacturing capital of India, producing nearly 65% of the domestic leather shoes and substantial global exports. Sadar Bazaar is packed with authorized factory outlets and custom cobblers making Goodyear-welted shoes, genuine leather jackets, and camel-skin bags.",
    timings: "11:00 AM - 10:00 PM",
    closedOn: "Every Tuesday (Market holiday)",
    priceRange: "₹₹ - Great bargains",
    location: "Sadar Bazaar, Cantonment, Agra",
    distanceFromTaj: "4.8 km",
    bestTime: "Evening (5:00 PM - 9:00 PM)",
    insiderTip:
      "Tuesdays are weekly off for Sadar Bazaar shops. Check for the genuine leather stamp and negotiate politely around 15-20% below initial quoted prices in smaller stalls.",
    mustTryOrSee: [
      "Handmade leather brogues and Chelsea boots",
      "Zardozi gold-thread embroidered wall tapestries",
      "Brass lamps and vintage knick-knacks",
    ],
    tags: ["Shopping", "Leather", "Shoes", "Night Market"],
  },
];

export const ITINERARY_PRESETS: ItineraryPreset[] = [
  {
    id: "1-day-express",
    title: "The 24-Hour Express Taj & Heritage Trail",
    badge: "Most Popular",
    duration: "1 Full Day (Dawn to Dinner)",
    idealFor: "Day trippers from Delhi (Gatimaan Express / Vande Bharat) or overnight visitors",
    summary:
      "Captures the crown jewels: Sunrise at Taj Mahal, authentic Bedmi Poori breakfast, majestic Agra Fort, sunset view at Mehtab Bagh, and evening street food & petha.",
    estimatedBudget: "₹1,800 - ₹3,500 per person (including entry tickets, auto, and all meals)",
    stops: [
      {
        time: "05:45 AM - 08:30 AM",
        placeId: "taj-mahal",
        title: "The Taj Mahal at Sunrise",
        activity:
          "Enter through the East Gate just as the gates open. Watch the marble turn from misty lavender to fiery gold. Take serene pool reflections before crowds arrive.",
        tip: "Book your ticket online the previous night on the ASI portal with mausoleum entry.",
      },
      {
        time: "08:45 AM - 10:00 AM",
        placeId: "deviram-sweets",
        title: "Legendary Breakfast at Deviram",
        activity:
          "Savor steaming hing-infused Bedmi Poori with spicy aloo, topped off with crisp desi-ghee jalebis and ginger kulhad chai.",
        tip: "Ask for an extra plate of Nagori Halwa.",
      },
      {
        time: "10:30 AM - 01:00 PM",
        placeId: "agra-fort",
        title: "Agra Fort (Lal Qila)",
        activity:
          "Walk the grand courtyards of Akbar and Shah Jahan. Stand at the Musamman Burj balcony where Shah Jahan gazed at the Taj Mahal.",
        tip: "Hire an official ASI guide at the Amar Singh Gate ticket counter (ensure they have an ASI badge).",
      },
      {
        time: "01:30 PM - 03:00 PM",
        placeId: "sheroes-hangout",
        title: "Lunch & Soul at Sheroes Hangout Café",
        activity:
          "Relish comforting shakes, noodles, and parathas while supporting acid attack survivor heroines. A heartfelt, grounding experience.",
        tip: "Donate generously on their pay-what-you-wish system.",
      },
      {
        time: "03:30 PM - 04:45 PM",
        placeId: "pietra-dura-inlay",
        title: "Pietra Dura Marble Inlay Demonstration",
        activity:
          "Witness 5th-generation artisans carve lapis lazuli and carnelian into white Makrana marble plates using ancient wooden bows.",
        tip: "Learn how to tell real marble from cheap soapstone.",
      },
      {
        time: "05:15 PM - 06:30 PM",
        placeId: "mehtab-bagh",
        title: "Sunset Across the Yamuna at Mehtab Bagh",
        activity:
          "Watch the Taj Mahal's silhouette glow under pastel sunset hues with the river flowing in between, completely peaceful.",
        tip: "Bring a wide-angle lens for the reflection over the riverbank.",
      },
      {
        time: "07:30 PM - 09:30 PM",
        placeId: "panchhi-petha",
        title: "Sadar Bazaar Chaat & Petha Shopping",
        activity:
          "Stroll down Chaat Gali for crispy Agra Bhalla, sample fresh Angoori and Paan Petha at Panchhi, and wrap up with Mama Frankie rolls.",
        tip: "Grab vacuum-sealed Petha boxes for travel back home.",
      },
    ],
  },
  {
    id: "2-day-royal",
    title: "The 2-Day Emperor's Grand Mughal Odyssey",
    badge: "Deep Explorer",
    duration: "2 Full Days (Weekend Getaway)",
    idealFor: "History buffs, couples, photographers, and families wanting a relaxed pace",
    summary:
      "Includes everything in Day 1 plus Akbar's abandoned ghost city of Fatehpur Sikri, the jewel-like Baby Taj (Itmad-ud-Daulah), Sikandra deer park, and a royal fine-dining Mughlai dinner.",
    estimatedBudget: "₹3,500 - ₹7,000 per person",
    stops: [
      {
        time: "Day 1 (All Day)",
        placeId: "taj-mahal",
        title: "Taj Mahal, Agra Fort, & Sadar Bazaar Street Trail",
        activity: "Complete the Day 1 Classic Express to soak in the central monuments.",
        tip: "Sleep early for Day 2's morning road trip to Fatehpur Sikri.",
      },
      {
        time: "Day 2, 08:30 AM - 12:30 PM",
        placeId: "fatehpur-sikri",
        title: "Fatehpur Sikri Road Trip & Buland Darwaza",
        activity:
          "Drive 36km to the fortified Mughal capital. Walk through Buland Darwaza and tie a wish thread at Salim Chishti's marble tomb.",
        tip: "Book an air-conditioned cab for the round trip (₹1,500 - ₹2,000).",
      },
      {
        time: "Day 2, 01:30 PM - 03:00 PM",
        placeId: "pinch-of-spice",
        title: "Royal Mughlai Feast at Pinch of Spice",
        activity:
          "Dine on 24-hour slow-cooked Dal Pinch of Spice, Chicken Tikka Lababdar, and fluffy butter naans.",
        tip: "Top off with Shahi Tukda or Kulfi Falooda.",
      },
      {
        time: "Day 2, 03:30 PM - 05:00 PM",
        placeId: "itmad-ud-daulah",
        title: "Itmad-ud-Daulah (The Baby Taj)",
        activity:
          "Inspect the intricate marble jali screens and Persian vase stone inlays with zero crowds by the river.",
        tip: "Take macro photos of the exquisite gemstone flower petals.",
      },
      {
        time: "Day 2, 05:30 PM - 06:45 PM",
        placeId: "akbar-tomb-sikandra",
        title: "Sikandra Akbar's Tomb & Deer Park",
        activity:
          "Stroll alongside blackbucks and peacocks on the expansive grounds as the sun sets over the red-sandstone arches.",
        tip: "Great stop on your way back towards Delhi via highway NH19.",
      },
    ],
  },
  {
    id: "foodie-trail",
    title: "The Agra Culinary & Sweet-Tooth Pilgrimage",
    badge: "Food Lover",
    duration: "Half-Day to Full-Day Food Walk",
    idealFor: "Passionate foodies seeking authentic century-old recipes and street wonders",
    summary:
      "A dedicated sensory journey through Bedmi Poori, 30 styles of Petha, smoky Mughlai kebabs, crispy Agra Bhalla, and sizzling Frankies.",
    estimatedBudget: "₹600 - ₹1,200 per person (food feast)",
    stops: [
      {
        time: "08:00 AM",
        placeId: "deviram-sweets",
        title: "Breakfast: Bedmi Poori & Nagori Halwa at Deviram",
        activity: "Spicy urad-dal poori, methi aloo, and golden jalebi straight from the kadai.",
        tip: "Come hungry, portions are hearty!",
      },
      {
        time: "01:00 PM",
        placeId: "sheroes-hangout",
        title: "Social Lunch: Sheroes Hangout Café",
        activity: "Fresh cold coffee, sandwiches, and heartfelt community support.",
        tip: "Meet the courageous staff and hear their uplifting journeys.",
      },
      {
        time: "05:00 PM",
        placeId: "sadar-chaat-gali",
        title: "Evening Kickoff: Sadar Chaat Gali",
        activity: "Agra Bhalla fried in pure desi ghee, Gol Gappe with 5 spicy tangy waters.",
        tip: "Don't miss the Dahi Gujiya with roasted cumin and pomegranate seeds.",
      },
      {
        time: "07:30 PM",
        placeId: "mama-frankie",
        title: "Snack: Butter Chicken & Mutton Frankies",
        activity: "Crisp flaky layered rolls filled with juicy tandoori spiced filling.",
        tip: "Add extra butter and green chili mint chutney.",
      },
      {
        time: "09:00 PM",
        placeId: "panchhi-petha",
        title: "Sweet Finale: Panchhi Petha Tasting",
        activity: "Taste-test Angoori, Kesar, Sandalwood, Coconut, and Chocolate Petha.",
        tip: "Buy airtight gift boxes that stay fresh for 15+ days.",
      },
    ],
  },
];

export const TAJ_VISIT_SIMULATOR = [
  {
    id: "dawn",
    name: "Dawn / Sunrise",
    timeWindow: "05:45 AM - 08:00 AM",
    glowColor: "rgba(245, 158, 11, 0.4)",
    crowdLevel: "Low to Moderate",
    crowdScore: 35,
    tempAdvice: "Crisp & cool morning breeze. Ideal walking weather.",
    photoQuality: "⭐⭐⭐⭐⭐ Divine / Golden Hour",
    photoTips:
      "Position yourself at the main reflection pool in the first 20 minutes after gates open. The marble reflects soft pink hues before shifting to glowing pearl white.",
    keyAdvantages: [
      "Shortest entry line of the day (especially East Gate)",
      "Unobstructed photos of the central watercourse",
      "Peaceful morning silence and mist over Yamuna",
    ],
    recommendedGate: "East Gate (Ticket booked online 24h before)",
  },
  {
    id: "midday",
    name: "Midday Sun",
    timeWindow: "11:00 AM - 03:00 PM",
    glowColor: "rgba(255, 255, 255, 0.5)",
    crowdLevel: "Peak Crowds",
    crowdScore: 95,
    tempAdvice: "Intense direct sunlight & hot marble floors. Wear shoe covers or socks.",
    photoQuality: "⭐⭐⭐ High contrast & harsh shadows",
    photoTips:
      "Switch to architectural detail shots and close-ups of Pietra Dura stone inlays under shady arches of the mosque and jawab.",
    keyAdvantages: [
      "Marble gleams with blinding bright white brilliance",
      "All interiors and underground corridors fully lit",
    ],
    recommendedGate:
      "Avoid if possible. Better to visit Agra Fort or lunch at Pinch of Spice during this window.",
  },
  {
    id: "sunset",
    name: "Golden Sunset",
    timeWindow: "04:30 PM - 06:30 PM",
    glowColor: "rgba(225, 29, 72, 0.45)",
    crowdLevel: "High",
    crowdScore: 80,
    tempAdvice: "Pleasant dropping temperatures, warm orange glow.",
    photoQuality: "⭐⭐⭐⭐⭐ Breathtaking Silhouettes",
    photoTips:
      "Head to the riverbank terrace behind the Taj or cross over to Mehtab Bagh across the river for jaw-dropping sunset framing.",
    keyAdvantages: [
      "Warm honey and amber reflections on the white marble dome",
      "Stunning sky colors reflecting off the Yamuna river",
      "Lively evening street buzz around Tajganj",
    ],
    recommendedGate: "East Gate or view from Mehtab Bagh across the river",
  },
  {
    id: "full-moon",
    name: "Full Moon Night Viewing",
    timeWindow: "08:30 PM - 12:30 AM (5 nights per month)",
    glowColor: "rgba(147, 197, 253, 0.4)",
    crowdLevel: "Strictly Limited (50 persons per batch)",
    crowdScore: 15,
    tempAdvice: "Cool and magical night breeze.",
    photoQuality: "⭐⭐⭐⭐ Ethereal Silver Glow (Tripods prohibited)",
    photoTips:
      "Use night mode on your phone or high ISO camera without flash. The monument looks like a floating silver dream.",
    keyAdvantages: [
      "Extremely rare and mystical romantic experience",
      "Complete quiet with only the Yamuna's gentle sounds",
    ],
    recommendedGate:
      "ASI Agra Office pre-booking required 24 hours in advance at 22 Mall Road, Agra.",
  },
];

export const AGRA_SMART_TIPS = [
  {
    id: "friday-rule",
    icon: "⚠️",
    title: "The Strict Friday Law",
    importance: "CRITICAL",
    summary:
      "The Taj Mahal is CLOSED to tourists every Friday. Only local Muslims with valid ID are permitted inside for afternoon Friday prayers.",
    solution:
      "If you are in Agra on Friday, visit Agra Fort, Fatehpur Sikri, Itmad-ud-Daulah, and head to Mehtab Bagh at sunset to view the Taj Mahal from across the river!",
  },
  {
    id: "online-tickets",
    icon: "🎟️",
    title: "Skip the 45-Min Ticket Queue",
    importance: "HIGH",
    summary:
      "Physical ticket lines at the gates can stretch for over 45 minutes during peak morning hours.",
    solution:
      "Book your ticket on the official ASI website (asi.nic.in) or scan the official ASI QR boards outside the gate. Foreign tickets include free shoe covers and a water bottle at the turnstile.",
  },
  {
    id: "500m-eco-zone",
    icon: "🛺",
    title: "500-Meter Eco Pollution Zone",
    importance: "MUST KNOW",
    summary:
      "To protect the white marble from air pollution, diesel and petrol vehicles are strictly prohibited within 500 meters of the Taj Mahal.",
    solution:
      "Taxis and autos drop you at Shilpgram (East Gate) or the West Gate parking lot. From there, take the authorized battery-operated EV golf carts (₹20 per person) or take a 7-minute walk.",
  },
  {
    id: "security-rules",
    icon: "🚫",
    title: "Prohibited Items Inside Taj Mahal",
    importance: "AVOID DELAYS",
    summary:
      "Security checking at the entrance is rigorous (similar to airport security). Carrying banned items forces you to walk back to luggage lockers.",
    solution:
      "DO NOT bring: tripods, drone cameras, power banks, lighters, cigarettes, chewing tobacco, knives, food items, big backpacks, or playing cards. Mobile phones, small water bottles, and DSLRs are allowed.",
  },
  {
    id: "marble-scam",
    icon: "💎",
    title: "Souvenir Scam Prevention: Real vs Fake Marble",
    importance: "SHOPPING SMART",
    summary:
      "Many rogue souvenir shops sell soft soapstone (gorara) or alabaster, polished to look like genuine Makrana marble, at exorbitant prices.",
    solution:
      "Run the fingernail test on an unpolished underside: soapstone and alabaster mark under a fingernail, real marble does not. Then hold your phone torch against the stone: genuine marble is translucent and glows around the beam, and translucent inlay stones like carnelian light up from within.",
  },
  {
    id: "petha-copycats",
    icon: "🍬",
    title: "Authentic Petha Verification",
    importance: "FOOD LOVERS",
    summary:
      "Over 90% of shops labeled 'Panchhi Petha' on the highway and streets are unlicensed duplicates.",
    solution:
      "Buy exclusively from the original Panchhi stores located at Hari Parvat Crossing or Sadar Bazaar. Always check the hologram and batch packaging date.",
  },
];

export const DISTANCE_MATRIX = [
  {
    from: "Agra Cantt Railway Station",
    to: "Taj Mahal (East Gate)",
    distance: "6.2 km",
    time: "15-20 mins",
  },
  { from: "Taj Mahal", to: "Agra Fort", distance: "2.5 km", time: "8-10 mins" },
  { from: "Taj Mahal", to: "Mehtab Bagh", distance: "7.5 km", time: "18-20 mins" },
  { from: "Taj Mahal", to: "Sadar Bazaar", distance: "4.8 km", time: "12-15 mins" },
  { from: "Taj Mahal", to: "Itmad-ud-Daulah (Baby Taj)", distance: "6.0 km", time: "15 mins" },
  { from: "Taj Mahal", to: "Fatehpur Sikri", distance: "38 km", time: "55-65 mins" },
  { from: "Taj Mahal", to: "Akbar's Tomb Sikandra", distance: "14 km", time: "25-30 mins" },
];

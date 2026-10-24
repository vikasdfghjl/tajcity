import { SOURCES } from "@/data/sources";
import type { ClimateMonth, GuideTopic } from "@/data/types";

/**
 * The questions first-time visitors ask, grouped by topic. Rules and fees come from the
 * official Taj Mahal site; transport, scams and weather from Wikipedia, IMD normals and
 * established travel publications. Numbers we could not verify (auto fares, guide fees)
 * are deliberately left out in favour of how to check them on the spot.
 */
export const GUIDE_TOPICS: GuideTopic[] = [
  {
    id: "around",
    label: "Getting around",
    intro: "How to reach Agra, and how to move between the sights without overpaying.",
    entries: [
      {
        question: "Which station should I get off at?",
        answer:
          "Agra Cantt is the main station and the one most visitors use, about 5.7 km from the Taj. The Gatimaan Express from Delhi's Hazrat Nizamuddin ends here. Agra Fort, Raja ki Mandi and Idgah are smaller stations in the city.",
        points: [
          "The Gatimaan Express runs six days a week and not on Fridays, the same day the Taj is closed.",
        ],
        sources: [SOURCES.wikiAgraCantt, SOURCES.wikiGatimaan],
      },
      {
        question: "Can I fly into Agra?",
        answer:
          "Only just. Agra Airport at Kheria is a small civil terminal on an Indian Air Force base, with a handful of domestic flights. Most visitors arrive from Delhi by train or road.",
        sources: [SOURCES.wikiAgraAirport],
      },
      {
        question: "How long is the drive from Delhi?",
        answer:
          "The Yamuna Expressway runs about 165 km from Greater Noida to the edge of Agra, with a 100 km/h limit for cars. Tolls are charged per kilometre and collected by FASTag.",
        sources: [SOURCES.wikiYamunaExpressway],
      },
      {
        question: "Do Uber and Ola work in Agra?",
        answer:
          "Yes. Uber runs cars, taxis and bike taxis in Agra, and Ola is widely used too. Both show the fare before you book, which is also the best benchmark for bargaining with a street auto.",
        points: [
          "Expect surge pricing after big trains arrive and at rush hour.",
          "Install both apps before you arrive, while you have good data.",
        ],
        sources: [SOURCES.uberAgra, SOURCES.goAsiaAgraTransport],
      },
      {
        question: "How much should an auto or e-rickshaw cost?",
        answer:
          "There is no fixed answer: autos rarely run their meters, so every ride is a negotiation. Agree the price before you get in, check it against the Uber or Ola estimate, and carry small notes because drivers often have no change.",
        points: [
          'Say "no shopping" before you agree the fare, so there are no surprise stops.',
          "Drivers waiting right outside the Taj and Agra Fort ask the most. Walk a short way first.",
          "Shared e-rickshaws run along the popular routes. Agree the fare before you board these too.",
        ],
        sources: [SOURCES.goAsiaAgraTransport],
      },
      {
        question: "How close can a car or auto get to the Taj?",
        answer:
          "Not very. Polluting vehicles are banned within 500 metres, so you are dropped at the Shilpgram parking (for the East Gate) or Amrood ka Tila (for the West Gate). Battery buses and golf carts run from there to the gates.",
        points: [
          "The golf cart costs ₹25 for Indian visitors and is included in foreign, SAARC and BIMSTEC tickets.",
        ],
        sources: [SOURCES.tajRules],
      },
    ],
  },
  {
    id: "scams",
    label: "Touts and scams",
    intro:
      "The streets around the Taj are full of people who earn from first-timers. These are the patterns to recognise.",
    entries: [
      {
        question: "Someone says the Taj is closed today. Is it?",
        answer:
          "Almost certainly not. The Taj closes only on Fridays; every other day it opens 30 minutes before sunrise. The \"it's closed, let me take you somewhere else\" line usually ends at a shop. The live card at the top of this page shows today's status.",
        sources: [SOURCES.tajHours, SOURCES.tajScamsGuide],
      },
      {
        question: "A man at the gate offers to skip the queue for a fee",
        answer:
          "Decline. There is no paid queue-jump. Foreign and Indian visitors already have separate queues, and queue-skipping fees have been reported to the police as a scam.",
        sources: [SOURCES.tajHours, SOURCES.queueSkipScam],
      },
      {
        question: "Should I buy a ticket from someone outside?",
        answer:
          "No. Buy only at the ticket windows at the East and West Gates, or online from the ASI. Tickets sold outside are marked up or fake, and online tickets are cheaper anyway.",
        sources: [SOURCES.agraTicketing, SOURCES.tajScamsGuide],
      },
      {
        question: "My driver or guide wants to stop at a shop",
        answer:
          "You never have to. Drivers and touts earn commission from marble, carpet and jewellery shops, and the prices there are not bargains. Say no before the trip starts, and repeat it.",
        points: [
          '"Government-approved emporium" is a sales line, not a guarantee.',
          "Testing marble yourself takes ten seconds: see Know this before you go.",
        ],
        sources: [SOURCES.smarterTravelAgra, SOURCES.goAsiaAgraTransport],
      },
      {
        question: "Where should I watch my pockets?",
        answer:
          "On the long walk from the battery bus drop-off to the security check, where pickpockets work the crowd. Keep phones and wallets in front pockets or a zipped bag.",
        sources: [SOURCES.smarterTravelAgra],
      },
      {
        question: "Who can I ask for help?",
        answer:
          "The Taj Security Police at the gates are there to help visitors. For an emergency call 112; for tourist help, the UP Tourism helpline is 1363.",
        sources: [SOURCES.tajSecurityPolice],
      },
    ],
  },
  {
    id: "guides",
    label: "Guides",
    intro: "You don't need a guide to see the Taj, but a good one adds the stories.",
    entries: [
      {
        question: "Do I need a guide?",
        answer:
          "No. You can walk the whole complex on your own, and the place notes in this app cover what to look for. A licensed guide is worth it if you want the history told well and help with photos.",
        sources: [SOURCES.tajRules],
      },
      {
        question: "How do I know a guide is licensed?",
        answer:
          'Ask to see their identity card before you set off. The official rule is to hire only approved guides and photographers who display ID. Men at the gates who say they are "government guides" usually are not.',
        sources: [SOURCES.tajRules, SOURCES.tajScamsGuide],
      },
      {
        question: "What should I agree before we start?",
        answer: "Settle it all up front, while you can still walk away.",
        points: [
          "The total price for your group, not per person",
          "How long the tour lasts, and which gate you start from",
          "The language you want",
          "No shopping stops, in so many words",
        ],
        sources: [SOURCES.goAsiaAgraTransport],
      },
      {
        question: "Can I use an audio guide app instead?",
        answer:
          "Not with earphones: headphones are on the Taj's official list of banned items. Read the notes on your phone instead, or listen before you go in.",
        sources: [SOURCES.tajRules],
      },
    ],
  },
  {
    id: "at-the-taj",
    label: "At the Taj",
    intro: "Gates, tickets, bags and the facilities inside the complex.",
    entries: [
      {
        question: "Which gate should I use?",
        answer:
          "The East Gate or the West Gate. Both sell tickets and let visitors in. The South Gate is exit only.",
        points: [
          "Ticket windows open an hour before sunrise and close 45 minutes before sunset.",
          "Foreign and Indian visitors queue separately; signs show which line is yours.",
        ],
        sources: [SOURCES.tajHours],
      },
      {
        question: "What does a ticket cost, and what's included?",
        answer:
          "₹50 for Indians, ₹540 for SAARC and BIMSTEC citizens and ₹1,100 for other foreign visitors. Entering the main mausoleum is ₹200 extra for everyone. Children under 15 go free. Carry a government photo ID.",
        points: [
          "Foreign, SAARC and BIMSTEC tickets include shoe covers, a half-litre bottle of water, a map and the battery bus or golf cart.",
          "Online tickets are ₹5 cheaper for Indians and ₹50 cheaper for foreigners.",
        ],
        sources: [SOURCES.agraTicketing, SOURCES.tajRules],
      },
      {
        question: "How long can I stay inside?",
        answer:
          "Plan on three hours. The ASI introduced a three-hour limit in 2019, with an extra charge at the exit for overstaying. Ask at the counter whether it is being enforced on your day.",
        sources: [SOURCES.tajTimeLimit2019],
      },
      {
        question: "Where do I leave my bag and shoes?",
        answer:
          "Both gates have cloakrooms for anything on the banned list. Shoes come off (or covers go on) at the mausoleum, where there are free shoe racks just below the platform.",
        points: ["Small bags and no books mean a quicker security check."],
        sources: [SOURCES.agraTicketing, SOURCES.tajRules],
      },
      {
        question: "Are there wheelchairs, first aid and water?",
        answer:
          "Yes. Wheelchairs are available at the entry gates, and wheelchairs and a first aid box are kept at the ASI office inside the Taj, phone +91 562 233 0498. Water bottles are allowed in.",
        sources: [SOURCES.tajRules, SOURCES.agraDistrictTaj],
      },
      {
        question: "Can I take photos?",
        answer:
          "Yes, everywhere in the gardens and on the platform, but not inside the main mausoleum. Tripods and drones are not allowed.",
        sources: [SOURCES.tajRules],
      },
      {
        question: "Is there anything else inside the complex?",
        answer: "The Taj Museum, inside the complex. It is open 10 AM to 5 PM and entry is free.",
        sources: [SOURCES.tajRules],
      },
    ],
  },
  {
    id: "weather",
    label: "Weather",
    intro: "Agra swings from foggy winter mornings to 42°C in May. Pick your month, and your hour.",
    entries: [
      {
        question: "When is the best time to visit?",
        answer:
          "November to March: highs in the 20s and almost no rain. It is also the busiest season, so book trains and tickets ahead.",
        sources: [SOURCES.wikiClimateAgra, SOURCES.smarterTravelAgra],
      },
      {
        question: "Will fog hide the Taj at sunrise?",
        answer:
          "In December and January it can. Dense morning fog sometimes hides the Taj completely, as it did on 27 December 2023, and views often clear only by mid-morning. If fog is forecast, go at 9 or 10 AM instead of sunrise.",
        sources: [SOURCES.wionTajFog, SOURCES.bestTimeTaj],
      },
      {
        question: "How hot does it get?",
        answer:
          "May averages highs of 42°C and June is barely cooler. Go at opening, carry water (it is allowed inside), and rest through the middle of the day.",
        sources: [SOURCES.wikiClimateAgra, SOURCES.tajRules],
      },
      {
        question: "What about the monsoon?",
        answer:
          "July and August are the wettest months, with 200 to 250 mm of rain each, against almost none from November to February. Carry a light rain layer.",
        sources: [SOURCES.wikiClimateAgra],
      },
    ],
  },
];

/** IMD climatological normals for Agra, 1991–2020. */
export const AGRA_CLIMATE: ClimateMonth[] = [
  {
    month: "Jan",
    high: 22,
    low: 7,
    rainMm: 13,
    verdict: "fog",
    note: "Cold mornings; fog can hide the Taj at sunrise",
  },
  { month: "Feb", high: 26, low: 10, rainMm: 11, verdict: "best", note: "Clear, mild and dry" },
  {
    month: "Mar",
    high: 32,
    low: 14,
    rainMm: 8,
    verdict: "good",
    note: "Warm afternoons; mornings are best",
  },
  { month: "Apr", high: 38, low: 20, rainMm: 9, verdict: "hot", note: "Hot by late morning" },
  {
    month: "May",
    high: 42,
    low: 24,
    rainMm: 21,
    verdict: "hot",
    note: "The hottest month; go at opening",
  },
  {
    month: "Jun",
    high: 41,
    low: 26,
    rainMm: 46,
    verdict: "hot",
    note: "Very hot until the monsoon breaks",
  },
  { month: "Jul", high: 36, low: 25, rainMm: 246, verdict: "wet", note: "The wettest month" },
  {
    month: "Aug",
    high: 33,
    low: 24,
    rainMm: 199,
    verdict: "wet",
    note: "Humid, with frequent showers",
  },
  {
    month: "Sep",
    high: 34,
    low: 24,
    rainMm: 111,
    verdict: "wet",
    note: "Rain easing, still humid",
  },
  { month: "Oct", high: 35, low: 19, rainMm: 25, verdict: "good", note: "Drying out; warm days" },
  {
    month: "Nov",
    high: 29,
    low: 13,
    rainMm: 3,
    verdict: "best",
    note: "Driest month; crisp, clear days",
  },
  {
    month: "Dec",
    high: 24,
    low: 8,
    rainMm: 3,
    verdict: "fog",
    note: "Cool; foggy mornings are common",
  },
];

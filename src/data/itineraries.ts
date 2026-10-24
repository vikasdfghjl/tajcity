import type { ItineraryPreset } from "@/data/types";

/** Ready-made days. Times assume a winter sunrise around 6:30 AM; shift them with the seasons. */
export const ITINERARY_PRESETS: ItineraryPreset[] = [
  {
    id: "1-day-express",
    title: "One day: the Taj, the fort and Sadar Bazaar",
    duration: "One full day, dawn to dinner",
    idealFor: "Day trips from Delhi on the Gatimaan Express or Vande Bharat, or a single overnight",
    summary:
      "Sunrise at the Taj, a bedai breakfast, Agra Fort, an afternoon with artisans, sunset from Mehtab Bagh and an evening of chaat and petha.",
    estimatedBudget:
      "Roughly ₹1,800 to ₹3,500 per person, including Indian-rate tickets, autos and meals",
    stops: [
      {
        time: "06:00 - 08:30",
        placeId: "taj-mahal",
        title: "The Taj Mahal at sunrise",
        activity:
          "Be at the East Gate as it opens, 30 minutes before sunrise, and head straight for the reflecting pool while the light is pink.",
        tip: "Buy tickets the night before on the ASI portal, with the mausoleum add-on.",
      },
      {
        time: "08:45 - 10:00",
        placeId: "deviram-sweets",
        title: "Bedai breakfast at Deviram",
        activity:
          "Hot bedai with spiced potato curry, then jalebi straight from the pan, with kulhad chai.",
        tip: "Bedai is a morning dish, so don't leave it late.",
      },
      {
        time: "10:30 - 13:00",
        placeId: "agra-fort",
        title: "Agra Fort",
        activity:
          "Walk Akbar's courtyards and Shah Jahan's marble palaces, ending at the Musamman Burj with its view of the Taj.",
        tip: "Foreigners get a cheaper fort ticket on the same day as a Taj visit.",
      },
      {
        time: "13:30 - 15:00",
        placeId: "sheroes-hangout",
        title: "Lunch at Sheroes Hangout",
        activity: "A relaxed café lunch at a café run by acid attack survivors.",
        tip: "Leave time to talk with the team.",
      },
      {
        time: "15:30 - 16:45",
        placeId: "pietra-dura-inlay",
        title: "A marble inlay workshop",
        activity:
          "Watch artisans cut and set semi-precious stone into marble, the craft used on the Taj.",
        tip: "Run the fingernail and torch tests before buying anything.",
      },
      {
        time: "17:00 - 18:00",
        placeId: "mehtab-bagh",
        title: "Sunset at Mehtab Bagh",
        activity: "Watch the Taj glow across the Yamuna from the garden's riverside edge.",
        tip: "The garden closes at sunset, so arrive with time to spare.",
      },
      {
        time: "19:30 - 21:30",
        placeId: "sadar-chaat-gali",
        title: "Sadar Bazaar: chaat, rolls and petha",
        activity:
          "Agra bhalla and basket chaat in Chaat Gali, a roll at Mama Franky, then petha to take home.",
        tip: "Sadar Bazaar's shops close on Tuesdays. For a sit-down dinner instead, the Eat section lists rooftops with a Taj view.",
      },
    ],
  },
  {
    id: "2-day-royal",
    title: "Two days: Agra and Fatehpur Sikri",
    duration: "Two full days",
    idealFor: "History lovers, photographers and anyone who wants a slower pace",
    summary:
      "Day one as in the one-day plan. Day two starts with dosa, then adds Fatehpur Sikri, a Mughlai lunch, the Baby Taj and Akbar's tomb at Sikandra.",
    estimatedBudget: "Roughly ₹3,500 to ₹7,000 per person, including a cab for Fatehpur Sikri",
    stops: [
      {
        time: "Day 1",
        placeId: "taj-mahal",
        title: "The Taj, Agra Fort and Sadar Bazaar",
        activity: "Follow the one-day plan for the city's central sights.",
        tip: "Turn in early; day two starts with a drive.",
      },
      {
        time: "Day 2, 08:00 - 08:45",
        placeId: "udupi-brindavan",
        title: "Dosa breakfast at Udupi Brindavan",
        activity: "A pure-veg South Indian breakfast of butter masala dosa and idli.",
        tip: "It opens at 8 AM, so have the cab collect you from here.",
      },
      {
        time: "Day 2, 09:00 - 13:00",
        placeId: "fatehpur-sikri",
        title: "Fatehpur Sikri",
        activity:
          "Drive about an hour to Akbar's abandoned capital. Walk through the Buland Darwaza to Salim Chishti's white marble tomb, then tour the palace complex.",
        tip: "Agree the round-trip cab fare, including waiting time, before you set off.",
      },
      {
        time: "Day 2, 14:00 - 15:00",
        placeId: "pinch-of-spice",
        title: "Mughlai lunch at Pinch of Spice",
        activity: "Slow-cooked black dal, a lababdar curry and tandoori breads.",
        tip: "Book a table in the winter high season.",
      },
      {
        time: "Day 2, 15:30 - 16:45",
        placeId: "itmad-ud-daulah",
        title: "Itmad-ud-Daulah, the Baby Taj",
        activity: "Study the jali screens and stone inlay up close, usually without crowds.",
        tip: "Bring a phone with a good macro mode for the inlay.",
      },
      {
        time: "Day 2, 17:00 - sunset",
        placeId: "akbar-tomb-sikandra",
        title: "Akbar's tomb at Sikandra",
        activity:
          "Walk the garden as blackbuck graze and the sandstone warms in the evening light.",
        tip: "Sikandra sits on the road to Delhi, a good last stop if you're heading back.",
      },
    ],
  },
  {
    id: "foodie-trail",
    title: "A day of eating: bedai to petha",
    duration: "Half a day to a full day",
    idealFor: "Food lovers who want Agra's classics in one go",
    summary:
      "Bedai and jalebi for breakfast, ghee parathas, filter coffee, a café lunch, an evening of chaat and rolls in Sadar Bazaar and petha to finish.",
    estimatedBudget: "Roughly ₹800 to ₹1,500 per person for food",
    stops: [
      {
        time: "08:00",
        placeId: "deviram-sweets",
        title: "Breakfast: bedai and jalebi at Deviram",
        activity: "Spiced lentil puris with potato curry, then hot jalebi.",
        tip: "Come hungry; portions are generous.",
      },
      {
        time: "09:30",
        placeId: "ram-babu-paratha",
        title: "Second breakfast: Ram Babu parathas",
        activity: "Share one ghee-soaked methi-matar paratha with aloo sabzi and jhol.",
        tip: "One between two is plenty after bedai.",
      },
      {
        time: "11:30",
        placeId: "naivedyam",
        title: "Filter coffee at Naivedyam",
        activity: "Strong South Indian filter coffee, and a dosa if you still have room.",
        tip: "It opens at 10:30 AM and fills up at lunch, so come before noon.",
      },
      {
        time: "13:00",
        placeId: "sheroes-hangout",
        title: "Lunch: Sheroes Hangout",
        activity: "Cold coffee, sandwiches and a slower hour.",
        tip: "Ask about the café's story if the team is free.",
      },
      {
        time: "17:30",
        placeId: "sadar-chaat-gali",
        title: "Evening: Chaat Gali",
        activity: "Agra bhalla, basket chaat and golgappe.",
        tip: "Pick the busiest stall; turnover keeps things fresh.",
      },
      {
        time: "19:30",
        placeId: "mama-frankie",
        title: "Rolls at Mama Franky House",
        activity: "Flaky paratha rolls with kebab, chicken or paneer.",
        tip: "Ask for extra mint chutney.",
      },
      {
        time: "21:00",
        placeId: "panchhi-petha",
        title: "Finish with Panchhi Petha",
        activity: "Taste angoori, kesar and paan petha, and pick up boxes to take home.",
        tip: "Buy at the brand's own stores and check the date on the box.",
      },
    ],
  },
];

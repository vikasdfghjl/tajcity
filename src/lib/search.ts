import { PLACE_KIND_LABEL } from "@/config/constants";
import { GUIDE_TOPICS } from "@/data/guide";
import type { GuideEntry, Place } from "@/data/types";

/**
 * Search for visitors who type questions, not keywords. Queries are split into words,
 * filler words are dropped, each word expands to its synonyms, and a word matches only at
 * the start of a word in the text, so "guide" finds "guides" but never "misguided".
 */

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "any",
  "are",
  "at",
  "be",
  "best",
  "can",
  "do",
  "does",
  "for",
  "from",
  "get",
  "go",
  "good",
  "how",
  "i",
  "in",
  "is",
  "it",
  "many",
  "me",
  "much",
  "my",
  "near",
  "need",
  "of",
  "on",
  "or",
  "should",
  "the",
  "there",
  "to",
  "today",
  "we",
  "what",
  "when",
  "where",
  "which",
  "who",
  "will",
  "with",
  "you",
]);

/** Each key also matches every word in its list. Keep lists short and literal. */
const SYNONYMS: Record<string, string[]> = {
  bathroom: ["toilet"],
  restroom: ["toilet"],
  washroom: ["toilet"],
  loo: ["toilet"],
  cab: ["taxi", "uber", "ola"],
  taxi: ["cab", "uber", "ola"],
  rickshaw: ["auto", "e-rickshaw"],
  tuk: ["auto"],
  train: ["station", "railway", "gatimaan"],
  railway: ["station", "train"],
  fly: ["airport", "flight"],
  flight: ["airport", "fly"],
  cost: ["price", "fee", "₹"],
  price: ["cost", "fee", "₹"],
  fee: ["price", "cost", "ticket"],
  ticket: ["fee", "entry"],
  open: ["opens", "opening", "hours", "closed", "closes"],
  closed: ["close", "closes", "open"],
  hours: ["timings", "open"],
  scam: ["tout", "fake", "commission"],
  tout: ["scam", "fake"],
  safe: ["scam", "pickpocket", "police"],
  help: ["police", "emergency", "helpline"],
  eat: ["food", "restaurant", "breakfast", "lunch", "dinner"],
  food: ["eat", "restaurant", "dish"],
  restaurant: ["food", "eat", "dining"],
  veg: ["vegetarian", "pure"],
  vegetarian: ["veg", "pure"],
  coffee: ["café", "cafe"],
  cafe: ["café", "coffee"],
  weather: ["fog", "rain", "hot", "temperature", "season"],
  fog: ["foggy", "weather"],
  rain: ["monsoon", "wet"],
  hot: ["heat", "summer"],
  wheelchair: ["accessible", "wheelchairs"],
  bag: ["cloakroom", "luggage"],
  luggage: ["cloakroom", "bag"],
  shoes: ["shoe"],
  photo: ["photos", "photography", "camera"],
  camera: ["photo", "photography"],
};

function escape(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Query words with filler removed and simple plurals folded (fridays → friday). */
export function queryTerms(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^\p{L}\p{N}₹]+/u)
    .filter((word) => word && !STOPWORDS.has(word))
    .map((word) =>
      word.length > 3 && word.endsWith("s") && !word.endsWith("ss") ? word.slice(0, -1) : word,
    );
}

const wordStart = (variants: string[]) =>
  new RegExp(`(^|[^\\p{L}\\p{N}])(${variants.map(escape).join("|")})`, "iu");

/** One pattern per term: the word itself or any synonym, at the start of a word. */
function termPatterns(terms: string[]): RegExp[] {
  return terms.map((term) => wordStart([term, ...(SYNONYMS[term] ?? [])]));
}

const matchesAll = (patterns: RegExp[], text: string) =>
  patterns.every((pattern) => pattern.test(text));

/** How well a question fits: 2 per query word it contains, 1 per word matched by a synonym. */
function questionScore(terms: string[], patterns: RegExp[], question: string): number {
  return terms.reduce(
    (score, term, index) =>
      score + (wordStart([term]).test(question) ? 2 : patterns[index].test(question) ? 1 : 0),
    0,
  );
}

function placeText(place: Place): string {
  return [
    place.name,
    place.hindiName,
    place.tagline,
    place.timings,
    place.closedOn,
    place.address,
    PLACE_KIND_LABEL[place.kind],
    place.dining?.cuisine,
    ...place.tags,
    ...place.mustTryOrSee,
  ]
    .filter(Boolean)
    .join(" · ");
}

function entryText(entry: GuideEntry, topicLabel: string): string {
  return [topicLabel, entry.question, entry.answer, ...(entry.points ?? [])].join(" · ");
}

export interface GuideMatch {
  topicLabel: string;
  entry: GuideEntry;
}

export interface SearchResults {
  places: Place[];
  answers: GuideMatch[];
}

export function search(query: string, places: Place[]): SearchResults {
  const terms = queryTerms(query);
  if (terms.length === 0) {
    return { places: [], answers: [] };
  }
  const patterns = termPatterns(terms);

  const answers = GUIDE_TOPICS.flatMap((topic) =>
    topic.entries.map((entry) => ({ topicLabel: topic.label, entry })),
  )
    .filter(({ entry, topicLabel }) => matchesAll(patterns, entryText(entry, topicLabel)))
    // Answers whose question best echoes the query come first
    .sort(
      (a, b) =>
        questionScore(terms, patterns, b.entry.question) -
        questionScore(terms, patterns, a.entry.question),
    );

  let found = places.filter((place) => matchesAll(patterns, placeText(place)));
  // Descriptions are long prose, so only fall back to them when nothing else matched
  if (found.length === 0 && answers.length === 0) {
    found = places.filter((place) =>
      matchesAll(patterns, `${placeText(place)} · ${place.description}`),
    );
  }

  return { places: found, answers };
}

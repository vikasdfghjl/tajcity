import { COMMONS_THUMB_BASE } from "@/config/constants";
import type { Photo } from "@/data/types";

/** Builds Photo metadata for a Wikimedia Commons file from its hash folder and encoded name. */
export function commonsPhoto(
  folder: string,
  file: string,
  meta: Omit<Photo, "base" | "file">,
): Photo {
  return { base: `${COMMONS_THUMB_BASE}/${folder}/${file}`, file, ...meta };
}

export const HERO_PHOTO = commonsPhoto("b/b2", "Taj_Mahal_Tomb_at_sunrise.JPG", {
  width: 4288,
  height: 2848,
  author: "MarcBW",
  license: "CC BY-SA 3.0",
  page: "https://commons.wikimedia.org/wiki/File:Taj_Mahal_Tomb_at_sunrise.JPG",
  focus: "50% 60%",
});

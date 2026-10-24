import type { MetadataRoute } from "next";
import { APP_ICON_SIZES, SITE_DESCRIPTION, THEME_COLOR } from "@/config/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Taj City: Agra, timed right",
    short_name: "Taj City",
    description: SITE_DESCRIPTION,
    lang: "en-IN",
    start_url: "/",
    display: "standalone",
    background_color: THEME_COLOR.light,
    theme_color: THEME_COLOR.light,
    categories: ["travel", "navigation"],
    icons: APP_ICON_SIZES.flatMap((size) => [
      { src: `/icon/${size}`, sizes: `${size}x${size}`, type: "image/png", purpose: "any" },
      // Full-bleed background, so the same image also works as a maskable icon
      { src: `/icon/${size}`, sizes: `${size}x${size}`, type: "image/png", purpose: "maskable" },
    ]),
  };
}

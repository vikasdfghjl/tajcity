import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Tiro_Devanagari_Hindi } from "next/font/google";
import { Providers } from "@/components/Providers";
import { THEME_COLOR, THEME_STORAGE_KEY } from "@/config/constants";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
const tiro = Tiro_Devanagari_Hindi({
  variable: "--font-tiro",
  subsets: ["devanagari"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taj City | Agra, timed right",
  description:
    "A mobile-first companion for Agra: live Taj Mahal opening status, sunrise and crowd timing, where to eat, a map of every stop and a day plan you can reorder and share.",
  keywords: [
    "Agra travel guide",
    "Taj Mahal timings today",
    "Taj Mahal sunrise",
    "Agra street food",
    "Panchhi Petha",
    "Agra itinerary",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: THEME_COLOR.light },
    { media: "(prefers-color-scheme: dark)", color: THEME_COLOR.dark },
  ],
};

// Runs before first paint so a stored or system dark theme never flashes light
const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${tiro.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

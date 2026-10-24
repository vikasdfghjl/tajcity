import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Tiro_Devanagari_Hindi } from "next/font/google";
import { Providers } from "@/components/Providers";
import {
  DARK_SCHEME_QUERY,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  THEME_COLOR,
  THEME_COLOR_META_ID,
  THEME_STORAGE_KEY,
} from "@/config/constants";
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

// The share image, icons and web manifest come from the opengraph-image, icon, apple-icon
// and manifest files next to this layout
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: "default" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_IN",
    url: "/",
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
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
  // No themeColor here: Next's media-keyed metas only follow the system, so the theme script
  // owns a single theme-color meta that also follows a manual pick
};

// Runs before first paint so a stored or system dark theme never flashes light
const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t!=="light"&&t!=="dark"){t=matchMedia(${JSON.stringify(DARK_SCHEME_QUERY)}).matches?"dark":"light"}document.documentElement.dataset.theme=t;var m=document.createElement("meta");m.id=${JSON.stringify(THEME_COLOR_META_ID)};m.name="theme-color";m.content=${JSON.stringify(THEME_COLOR)}[t];document.head.append(m)}catch(e){}})()`;

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

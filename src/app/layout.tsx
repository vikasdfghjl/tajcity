import type { Metadata, Viewport } from "next";
import { Cinzel, Outfit } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taj City | Interactive Agra Visitor & Heritage Food Guide",
  description:
    "Your ultimate interactive companion to visiting Agra, India. Discover the Taj Mahal sunrise secrets, Agra Fort, authentic Bedmi Poori, legendary Panchhi Petha, custom day itineraries, and insider tips.",
  keywords: [
    "Agra Travel Guide",
    "Taj Mahal Visiting Tips",
    "Agra Street Food",
    "Best Petha in Agra",
    "Deviram Bedmi Puri",
    "Agra Fort",
    "Mehtab Bagh Sunset",
    "Fatehpur Sikri Day Trip",
    "Agra Itinerary 1 Day 2 Day",
  ],
  authors: [{ name: "Taj City Interactive Guide" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={`${cinzel.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}

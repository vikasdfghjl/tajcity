import { Essentials } from "@/components/essentials/Essentials";
import { Explore } from "@/components/explore/Explore";
import { Hero } from "@/components/hero/Hero";
import { LightDial } from "@/components/light/LightDial";
import { MapSection } from "@/components/map/MapSection";
import { DayPlans } from "@/components/plans/DayPlans";
import { PlaceSheet } from "@/components/sheets/PlaceSheet";
import { PlanSheet } from "@/components/sheets/PlanSheet";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { TabBar } from "@/components/site/TabBar";
import { Toaster } from "@/components/ui/Toaster";

export default function Home() {
  return (
    <>
      <a
        href="#light"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <LightDial />
        <Explore />
        <MapSection />
        <DayPlans />
        <Essentials />
      </main>
      <Footer />
      <TabBar />
      <Toaster />
      <PlaceSheet />
      <PlanSheet />
    </>
  );
}

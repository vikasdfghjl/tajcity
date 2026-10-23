"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { MotionConfig } from "motion/react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TajSimulator } from "@/components/TajSimulator";
import { PlacesExplorer } from "@/components/PlacesExplorer";
import { FoodExplorer } from "@/components/FoodExplorer";
import { ArtisanCrafts } from "@/components/ArtisanCrafts";
import { ItineraryBuilder } from "@/components/ItineraryBuilder";
import { TipsAndFAQ } from "@/components/TipsAndFAQ";
import { Footer } from "@/components/Footer";
import { PlaceItem, MONUMENTS_DATA, FOOD_DATA } from "@/data/agraData";

const subscribeTheme = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
};

const getThemeSnapshot = (): "light" | "dark" => {
  const saved = localStorage.getItem("tajcity-theme");
  return saved === "dark" ? "dark" : "light";
};

const getServerThemeSnapshot = (): "light" | "dark" => "light";

export default function Home() {
  const [manualTheme, setManualTheme] = useState<"light" | "dark" | null>(null);

  const storedTheme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const currentTheme = manualTheme ?? storedTheme;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const [searchQuery, setSearchQuery] = useState("");
  // Prepopulate with Taj Mahal & Deviram Sweets for an instantly rewarding initial state
  const [savedPlaces, setSavedPlaces] = useState<PlaceItem[]>([
    MONUMENTS_DATA[0], // Taj Mahal
    FOOD_DATA[1], // Deviram Sweets
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleTheme = () => {
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    setManualTheme(nextTheme);
    localStorage.setItem("tajcity-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const savedItemIds = savedPlaces.map((place) => place.id);

  const handleToggleSaveItem = (place: PlaceItem) => {
    setSavedPlaces((previousPlaces) => {
      const alreadySaved = previousPlaces.some((item) => item.id === place.id);
      if (alreadySaved) {
        return previousPlaces.filter((item) => item.id !== place.id);
      }
      return [...previousPlaces, place];
    });
  };

  const handleRemoveItem = (id: string) => {
    setSavedPlaces((previousPlaces) => previousPlaces.filter((item) => item.id !== id));
  };

  const handleApplyPreset = (places: PlaceItem[]) => {
    // Replace saved places with the preset and open drawer for instant feedback
    setSavedPlaces(places);
    setIsDrawerOpen(true);
  };

  const handleClearItems = () => {
    setSavedPlaces([]);
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSelectQuickCategory = (category: "monument" | "food" | "craft" | "all") => {
    if (category === "all") {
      setSearchQuery("");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--bg-canvas)",
        }}
      >
        <Header
          savedItemCount={savedPlaces.length}
          currentTheme={currentTheme}
          onToggleTheme={handleToggleTheme}
          onOpenItineraryDrawer={handleOpenDrawer}
        />

        <main style={{ flex: 1 }}>
          <Hero
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onSelectQuickCategory={handleSelectQuickCategory}
          />

          <TajSimulator />

          <PlacesExplorer
            searchQuery={searchQuery}
            savedItemIds={savedItemIds}
            onToggleSaveItem={handleToggleSaveItem}
            onClearSearch={handleClearSearch}
          />

          <FoodExplorer
            searchQuery={searchQuery}
            savedItemIds={savedItemIds}
            onToggleSaveItem={handleToggleSaveItem}
            onClearSearch={handleClearSearch}
          />

          <ArtisanCrafts />

          <ItineraryBuilder
            savedItems={savedPlaces}
            isDrawerOpen={isDrawerOpen}
            onCloseDrawer={handleCloseDrawer}
            onRemoveItem={handleRemoveItem}
            onApplyPreset={handleApplyPreset}
            onClearItems={handleClearItems}
          />

          <TipsAndFAQ />
        </main>

        <Footer />

        {/* Mobile Bottom Navigation Bar (Visible only on mobile screens) */}
        <nav className="mobile-bottom-nav" aria-label="Mobile quick navigation">
          <a href="#monuments" className="mobile-nav-item">
            <span className="icon">🏛️</span>
            <span>Monuments</span>
          </a>
          <a href="#food" className="mobile-nav-item">
            <span className="icon">🍲</span>
            <span>Food</span>
          </a>
          <a href="#simulator" className="mobile-nav-item">
            <span className="icon">☀️</span>
            <span>Light</span>
          </a>
          <button type="button" onClick={handleOpenDrawer} className="mobile-nav-item">
            <span className="icon">🧭</span>
            <span>Plan ({savedPlaces.length})</span>
          </button>
          <button
            type="button"
            onClick={handleToggleTheme}
            className="mobile-nav-item"
            aria-label="Toggle Theme"
            suppressHydrationWarning
          >
            <span className="icon" suppressHydrationWarning>
              {currentTheme === "light" ? "🌙" : "☀️"}
            </span>
            <span suppressHydrationWarning>{currentTheme === "light" ? "Dark" : "Light"}</span>
          </button>
        </nav>
      </div>
    </MotionConfig>
  );
}

"use client";

import React, { useState } from "react";
import { FOOD_DATA, PlaceItem } from "@/data/agraData";
import { PlaceImage } from "@/components/PlaceImage";

interface FoodExplorerProps {
  searchQuery: string;
  savedItemIds: string[];
  onToggleSaveItem: (place: PlaceItem) => void;
  onClearSearch: () => void;
}

export function FoodExplorer({
  searchQuery,
  savedItemIds,
  onToggleSaveItem,
  onClearSearch,
}: FoodExplorerProps) {
  const [activeTasteCategory, setActiveTasteCategory] = useState<string>("all");

  const tasteTabs = [
    { id: "all", label: "All Culinary Gems" },
    { id: "sweet", label: "Royal Petha" },
    { id: "breakfast", label: "Bedmi Poori & Jalebi" },
    { id: "mughlai", label: "Royal Mughlai" },
    { id: "street", label: "Street Chaat & Rolls" },
  ];

  // Flat filtering with guard clauses
  const filteredFoodSpots = FOOD_DATA.filter((spot) => {
    // Search match
    if (searchQuery.trim().length > 0) {
      const normalizedQuery = searchQuery.toLowerCase().trim();
      const matchesName = spot.name.toLowerCase().includes(normalizedQuery);
      const matchesDescription = spot.description.toLowerCase().includes(normalizedQuery);
      const matchesItems = spot.mustTryOrSee.some((dish) =>
        dish.toLowerCase().includes(normalizedQuery),
      );
      if (!matchesName && !matchesDescription && !matchesItems) {
        return false;
      }
    }

    // Category match
    if (activeTasteCategory === "sweet") {
      return spot.tags.includes("Heritage Sweets") || spot.tags.includes("GI Tagged");
    }
    if (activeTasteCategory === "breakfast") {
      return spot.tags.includes("Breakfast Legend") || spot.tags.includes("Bedmi Puri");
    }
    if (activeTasteCategory === "mughlai") {
      return spot.tags.includes("Royal Mughlai");
    }
    if (activeTasteCategory === "street") {
      return (
        spot.tags.includes("Street Food") ||
        spot.tags.includes("Chaat") ||
        spot.tags.includes("Kathi Rolls")
      );
    }

    return true;
  });

  return (
    <section id="food" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-brass">Culinary Heritage</span>
          <h2>Legendary Street Food, Mughlai & Petha</h2>
          <p>
            Agra&apos;s culinary heritage was crafted in royal Mughal kitchens and refined over
            centuries in historic bazaar alleys. Here are the authentic, verified taste institutions
            you must experience.
          </p>
        </div>

        {/* Category Tabs - Swipeable on mobile */}
        <div
          className="horizontal-scroll-chips"
          role="group"
          aria-label="Filter food spots"
          style={{
            marginBottom: "1.8rem",
          }}
        >
          {tasteTabs.map((tab) => {
            const isSelected = activeTasteCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveTasteCategory(tab.id)}
                style={{
                  padding: "0.55rem 1.15rem",
                  borderRadius: "var(--pill-radius)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  minHeight: "40px",
                  backgroundColor: isSelected ? "var(--color-brass)" : "var(--bg-surface)",
                  color: isSelected ? "var(--text-on-accent)" : "var(--text-secondary)",
                  border: isSelected
                    ? "1px solid var(--color-brass)"
                    : "1px solid var(--border-subtle)",
                  boxShadow: isSelected
                    ? "0 2px 8px rgba(158, 111, 33, 0.25)"
                    : "var(--shadow-subtle)",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Guard Clause: No results */}
        {filteredFoodSpots.length === 0 ? (
          <div
            className="glass-panel"
            style={{
              padding: "3rem 1.5rem",
              textAlign: "center",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🍲</div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              No food spots match your search
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                marginBottom: "1rem",
              }}
            >
              Try searching for &quot;Bedmi&quot;, &quot;Petha&quot;, &quot;Chaat&quot;, or
              &quot;Kebab&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveTasteCategory("all");
                onClearSearch();
              }}
              className="btn-secondary"
            >
              Clear Search & Show All Food
            </button>
          </div>
        ) : (
          /* Food Cards Grid */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(285px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {filteredFoodSpots.map((spot) => {
              const isSaved = savedItemIds.includes(spot.id);

              return (
                <article
                  key={spot.id}
                  className="glass-panel"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  {/* Image container */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "210px",
                      overflow: "hidden",
                    }}
                  >
                    <PlaceImage place={spot} sizes="(max-width: 768px) 100vw, 33vw" />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, transparent 60%)",
                      }}
                    />

                    {/* Category Tag */}
                    <span
                      style={{
                        position: "absolute",
                        top: "0.85rem",
                        left: "0.85rem",
                        backgroundColor: "rgba(255, 255, 255, 0.92)",
                        color: "#151a24",
                        padding: "0.22rem 0.65rem",
                        borderRadius: "var(--pill-radius)",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      }}
                    >
                      {spot.subCategory ?? "Agra Cuisine"}
                    </span>

                    {/* Price Range Pill */}
                    <span
                      style={{
                        position: "absolute",
                        top: "0.85rem",
                        right: "0.85rem",
                        backgroundColor: "rgba(0, 0, 0, 0.65)",
                        backdropFilter: "blur(6px)",
                        padding: "0.22rem 0.6rem",
                        borderRadius: "var(--pill-radius)",
                        fontSize: "0.72rem",
                        color: "#ffffff",
                        fontWeight: 600,
                      }}
                    >
                      {spot.priceRange?.split(" ")[0]}
                    </span>

                    {/* Rating badge */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0.75rem",
                        left: "0.85rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        color: "#ffffff",
                      }}
                    >
                      <span>⭐ {spot.rating}</span>
                      <span
                        style={{
                          color: "rgba(255, 255, 255, 0.8)",
                          fontSize: "0.72rem",
                        }}
                      >
                        ({spot.reviewCount.toLocaleString("en-IN")} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div
                    style={{
                      padding: "1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "0.25rem",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                        }}
                      >
                        {spot.name}
                      </h3>
                      <span
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--color-brass)",
                          fontFamily: "var(--font-heading)",
                          fontWeight: 600,
                        }}
                      >
                        {spot.hindiName}
                      </span>
                    </div>

                    <p
                      style={{
                        color: "var(--color-sandstone)",
                        fontSize: "0.84rem",
                        fontWeight: 500,
                        marginBottom: "0.65rem",
                      }}
                    >
                      {spot.tagline}
                    </p>

                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.88rem",
                        lineHeight: 1.5,
                        marginBottom: "0.9rem",
                      }}
                    >
                      {spot.description}
                    </p>

                    {/* Operational Info */}
                    <div
                      style={{
                        backgroundColor: "var(--bg-elevated)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "10px",
                        padding: "0.7rem 0.85rem",
                        fontSize: "0.82rem",
                        marginBottom: "0.9rem",
                      }}
                    >
                      <div
                        style={{
                          color: "var(--text-primary)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        <strong>Location:</strong> {spot.location} ({spot.distanceFromTaj} from Taj)
                      </div>
                      <div
                        style={{
                          color: "var(--text-muted)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        <strong>Hours:</strong> {spot.timings}
                      </div>
                      <div style={{ color: "var(--color-brass)", fontWeight: 500 }}>
                        <strong>Best Window:</strong> {spot.bestTime}
                      </div>
                    </div>

                    {/* Must-Order Dishes */}
                    <div style={{ marginBottom: "0.9rem" }}>
                      <span
                        style={{
                          fontSize: "0.74rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          color: "var(--text-muted)",
                          display: "block",
                          marginBottom: "0.35rem",
                        }}
                      >
                        Signature Dishes:
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.35rem",
                        }}
                      >
                        {spot.mustTryOrSee.map((dish, index) => (
                          <span
                            key={index}
                            style={{
                              backgroundColor: "var(--bg-elevated)",
                              border: "1px solid var(--border-subtle)",
                              borderRadius: "6px",
                              padding: "0.2rem 0.5rem",
                              fontSize: "0.76rem",
                              color: "var(--text-primary)",
                            }}
                          >
                            {dish}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Insider Secret Callout */}
                    <div
                      style={{
                        backgroundColor: "var(--color-brass-soft)",
                        borderLeft: "3px solid var(--color-brass)",
                        padding: "0.6rem 0.75rem",
                        fontSize: "0.82rem",
                        color: "var(--text-primary)",
                        borderRadius: "0 8px 8px 0",
                        marginBottom: "0.9rem",
                      }}
                    >
                      <strong>Local Secret:</strong> {spot.insiderTip}
                    </div>

                    {/* Card Footer Button */}
                    <div
                      style={{
                        marginTop: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        paddingTop: "0.75rem",
                        borderTop: "1px solid var(--border-subtle)",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => onToggleSaveItem(spot)}
                        style={{
                          width: "100%",
                          minHeight: "40px",
                          padding: "0.55rem 1rem",
                          borderRadius: "var(--pill-radius)",
                          fontSize: "0.84rem",
                          fontWeight: 600,
                          transition: "all 0.15s ease",
                          backgroundColor: isSaved
                            ? "var(--color-emerald-soft)"
                            : "var(--color-brass-soft)",
                          color: isSaved ? "var(--color-emerald)" : "var(--color-brass)",
                          border: isSaved
                            ? "1px solid var(--color-emerald)"
                            : "1px solid var(--border-brass)",
                        }}
                      >
                        {isSaved ? "✓ Added to My Plan" : "+ Add Food Stop to Plan"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

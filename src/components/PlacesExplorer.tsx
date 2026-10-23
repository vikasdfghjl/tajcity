"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MONUMENTS_DATA, PlaceItem } from "@/data/agraData";

interface PlacesExplorerProps {
  searchQuery: string;
  savedItemIds: string[];
  onToggleSaveItem: (place: PlaceItem) => void;
}

export function PlacesExplorer({
  searchQuery,
  savedItemIds,
  onToggleSaveItem,
}: PlacesExplorerProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const filterCategories = [
    { id: "all", label: "All Monuments" },
    { id: "unesco", label: "UNESCO Wonders" },
    { id: "viewpoint", label: "Sunset & Views" },
    { id: "gem", label: "Hidden Gems" },
  ];

  // Flat filtering logic with early returns
  const filteredMonuments = MONUMENTS_DATA.filter((place) => {
    // Search match
    if (searchQuery.trim().length > 0) {
      const normalizedQuery = searchQuery.toLowerCase().trim();
      const matchesName = place.name.toLowerCase().includes(normalizedQuery);
      const matchesDescription = place.description.toLowerCase().includes(normalizedQuery);
      const matchesTag = place.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
      if (!matchesName && !matchesDescription && !matchesTag) {
        return false;
      }
    }

    // Category filter match
    if (activeFilter === "unesco") {
      return place.tags.includes("UNESCO");
    }
    if (activeFilter === "viewpoint") {
      return (
        place.tags.includes("Viewpoint") ||
        place.tags.includes("Sunset") ||
        place.tags.includes("Friday Alternative")
      );
    }
    if (activeFilter === "gem") {
      return (
        place.tags.includes("Hidden Gem") ||
        place.tags.includes("Delicate Inlay") ||
        place.tags.includes("Gardens")
      );
    }

    return true;
  });

  const toggleCardExpansion = (placeId: string) => {
    setExpandedCardId((previousId) => (previousId === placeId ? null : placeId));
  };

  return (
    <section id="monuments" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-sandstone">Architectural Heritage</span>
          <h2>Imperial Monuments & Royal Forts</h2>
          <p>
            Agra holds centuries of Mughal grandeur beyond just the Taj Mahal. Explore Emperor
            Akbar&apos;s abandoned red capital, Shah Jahan&apos;s marble prison fort, and serene
            riverside mausoleums.
          </p>
        </div>

        {/* Filter Pills - Swipeable on mobile */}
        <div
          className="horizontal-scroll-chips"
          style={{
            marginBottom: "1.8rem",
          }}
        >
          {filterCategories.map((filter) => {
            const isSelected = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                style={{
                  padding: "0.55rem 1.15rem",
                  borderRadius: "var(--pill-radius)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  minHeight: "40px",
                  backgroundColor: isSelected ? "var(--color-sandstone)" : "var(--bg-surface)",
                  color: isSelected ? "#ffffff" : "var(--text-secondary)",
                  border: isSelected
                    ? "1px solid var(--color-sandstone)"
                    : "1px solid var(--border-subtle)",
                  boxShadow: isSelected
                    ? "0 2px 8px rgba(184, 75, 41, 0.25)"
                    : "var(--shadow-subtle)",
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Guard Clause: No results found */}
        {filteredMonuments.length === 0 ? (
          <div
            className="glass-panel"
            style={{
              padding: "3rem 1.5rem",
              textAlign: "center",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🏛️</div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              No monuments match your search
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                marginBottom: "1rem",
              }}
            >
              Try searching for &quot;Taj&quot;, &quot;Fort&quot;, &quot;Sikri&quot;, or clearing
              the filter.
            </p>
            <button type="button" onClick={() => setActiveFilter("all")} className="btn-secondary">
              Reset Filters
            </button>
          </div>
        ) : (
          /* Cards Grid */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(285px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {filteredMonuments.map((place) => {
              const isSaved = savedItemIds.includes(place.id);
              const isExpanded = expandedCardId === place.id;

              return (
                <article
                  key={place.id}
                  className="glass-panel"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  {/* Image Container with Next.js Image */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "210px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, transparent 60%)",
                      }}
                    />

                    {/* SubCategory Tag */}
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
                      {place.subCategory ?? "Heritage"}
                    </span>

                    {/* Distance Pill */}
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
                        fontWeight: 500,
                      }}
                    >
                      📍 {place.distanceFromTaj}
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
                      <span>⭐ {place.rating}</span>
                      <span
                        style={{
                          color: "rgba(255, 255, 255, 0.8)",
                          fontSize: "0.72rem",
                        }}
                      >
                        ({place.reviewCount.toLocaleString("en-IN")} reviews)
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
                        {place.name}
                      </h3>
                      <span
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--color-brass)",
                          fontFamily: "var(--font-heading)",
                          fontWeight: 600,
                        }}
                      >
                        {place.hindiName}
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
                      {place.tagline}
                    </p>

                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.88rem",
                        lineHeight: 1.5,
                        marginBottom: "0.9rem",
                      }}
                    >
                      {place.description}
                    </p>

                    {/* Timings & Friday warning */}
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
                        <strong>Hours:</strong> {place.timings}
                      </div>
                      {place.closedOn && (
                        <div
                          style={{
                            color: place.closedOn.includes("Friday")
                              ? "var(--color-ruby)"
                              : "var(--color-brass)",
                            fontWeight: 600,
                          }}
                        >
                          <strong>Notice:</strong> {place.closedOn}
                        </div>
                      )}
                      {place.entryFee && (
                        <div
                          style={{
                            color: "var(--text-muted)",
                            marginTop: "0.25rem",
                          }}
                        >
                          <strong>Entry:</strong> Indian: {place.entryFee.indian} | Foreigner:{" "}
                          {place.entryFee.foreigner}
                        </div>
                      )}
                    </div>

                    {/* Collapsible Insider Tip & Highlights */}
                    {isExpanded && (
                      <div
                        style={{
                          borderTop: "1px solid var(--border-subtle)",
                          paddingTop: "0.8rem",
                          marginBottom: "0.9rem",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "var(--color-sandstone-soft)",
                            borderLeft: "3px solid var(--color-sandstone)",
                            padding: "0.6rem 0.75rem",
                            fontSize: "0.82rem",
                            color: "var(--text-primary)",
                            marginBottom: "0.75rem",
                            borderRadius: "0 8px 8px 0",
                          }}
                        >
                          <strong>Insider Tip:</strong> {place.insiderTip}
                        </div>

                        <div style={{ fontSize: "0.82rem", color: "var(--text-primary)" }}>
                          <strong>Highlights to see:</strong>
                          <ul
                            style={{
                              paddingLeft: "1.2rem",
                              marginTop: "0.35rem",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {place.mustTryOrSee.map((highlight, index) => (
                              <li key={index} style={{ marginBottom: "0.2rem" }}>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Card Actions Footer */}
                    <div
                      style={{
                        marginTop: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "0.75rem",
                        borderTop: "1px solid var(--border-subtle)",
                        gap: "0.5rem",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => toggleCardExpansion(place.id)}
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--color-sandstone)",
                          fontWeight: 500,
                        }}
                      >
                        {isExpanded ? "Less ▲" : "Visitor Secrets ▼"}
                      </button>

                      <button
                        type="button"
                        onClick={() => onToggleSaveItem(place)}
                        style={{
                          padding: "0.45rem 0.9rem",
                          borderRadius: "var(--pill-radius)",
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          transition: "all 0.15s ease",
                          backgroundColor: isSaved
                            ? "var(--color-emerald-soft)"
                            : "var(--color-sandstone-soft)",
                          color: isSaved ? "var(--color-emerald)" : "var(--color-sandstone)",
                          border: isSaved
                            ? "1px solid var(--color-emerald)"
                            : "1px solid var(--border-highlight)",
                        }}
                      >
                        {isSaved ? "✓ In My Plan" : "+ Add to Plan"}
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

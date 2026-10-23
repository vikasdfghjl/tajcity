"use client";

import React, { useEffect, useEffectEvent, useRef, useState } from "react";
import {
  ITINERARY_PRESETS,
  PlaceItem,
  MONUMENTS_DATA,
  FOOD_DATA,
  CRAFT_AND_GEMS_DATA,
} from "@/data/agraData";

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ItineraryBuilderProps {
  savedItems: PlaceItem[];
  isDrawerOpen: boolean;
  onCloseDrawer: () => void;
  onRemoveItem: (id: string) => void;
  onApplyPreset: (items: PlaceItem[]) => void;
  onClearItems: () => void;
}

export function ItineraryBuilder({
  savedItems,
  isDrawerOpen,
  onCloseDrawer,
  onRemoveItem,
  onApplyPreset,
  onClearItems,
}: ItineraryBuilderProps) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("1-day-express");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const activePreset =
    ITINERARY_PRESETS.find((preset) => preset.id === selectedPresetId) ?? ITINERARY_PRESETS[0];

  const handleApplyCurrentPreset = () => {
    const allKnownPlaces = [...MONUMENTS_DATA, ...FOOD_DATA, ...CRAFT_AND_GEMS_DATA];
    const placesToSave: PlaceItem[] = [];

    activePreset.stops.forEach((stop) => {
      const matchedPlace = allKnownPlaces.find((item) => item.id === stop.placeId);
      if (matchedPlace && !placesToSave.some((p) => p.id === matchedPlace.id)) {
        placesToSave.push(matchedPlace);
      }
    });

    // Loading a preset replaces the plan, so confirm before dropping stops the user added
    const droppedItems = savedItems.filter(
      (item) => !placesToSave.some((place) => place.id === item.id),
    );
    if (droppedItems.length > 0) {
      const droppedNames = droppedItems.map((item) => item.name).join(", ");
      const confirmed = window.confirm(
        `Loading this trail will replace your current plan and remove: ${droppedNames}. Continue?`,
      );
      if (!confirmed) {
        return;
      }
    }

    onApplyPreset(placesToSave);
  };

  const handleDrawerKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onCloseDrawer();
      return;
    }

    const panel = panelRef.current;
    if (event.key !== "Tab" || !panel) {
      return;
    }

    // Keep Tab focus cycling inside the drawer while it is open
    const focusableElements = panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusableElements.length === 0) {
      return;
    }
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (!panel.contains(activeElement)) {
      event.preventDefault();
      firstElement.focus();
    } else if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });

  useEffect(() => {
    if (!isDrawerOpen) {
      return;
    }

    const previouslyFocusedElement = document.activeElement as HTMLElement | null;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    document.addEventListener("keydown", handleDrawerKeyDown);

    return () => {
      document.removeEventListener("keydown", handleDrawerKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      previouslyFocusedElement?.focus();
    };
  }, [isDrawerOpen]);

  const handleCopyItinerary = async () => {
    // Guard clause: no items to copy
    if (savedItems.length === 0) {
      return;
    }

    const itineraryText = [
      "MY AGRA DAY PLAN (Generated via Taj City Companion)",
      "--------------------------------------------------",
      ...savedItems.map(
        (item, index) =>
          `${index + 1}. ${item.name} (${item.hindiName})\n   Location: ${item.location}\n   Timings: ${item.timings}\n   Insider Tip: ${item.insiderTip}\n`,
      ),
      "--------------------------------------------------",
      "Essential Agra Rule: Taj Mahal is CLOSED on Fridays!",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(itineraryText);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    setTimeout(() => setCopyStatus("idle"), 3000);
  };

  const copyButtonLabel = {
    idle: "Copy My Day Plan",
    copied: "✓ Copied to Clipboard!",
    failed: "Couldn't copy. Check clipboard permissions and try again",
  }[copyStatus];

  return (
    <section id="itineraries" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-sandstone">Route Engineering</span>
          <h2>Curated & Custom Day Itineraries</h2>
          <p>
            Whether you have 24 hours on the express train from Delhi or a full regal weekend, here
            are battle-tested routes designed to minimize traffic delays and maximize golden hour
            moments.
          </p>
        </div>

        {/* Preset Selector Tabs - Swipeable on mobile */}
        <div
          className="horizontal-scroll-chips"
          role="group"
          aria-label="Itinerary presets"
          style={{
            marginBottom: "1.8rem",
          }}
        >
          {ITINERARY_PRESETS.map((preset) => {
            const isSelected = preset.id === activePreset.id;
            return (
              <button
                key={preset.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedPresetId(preset.id)}
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
                  color: isSelected ? "var(--text-on-accent)" : "var(--text-secondary)",
                  border: isSelected
                    ? "1px solid var(--color-sandstone)"
                    : "1px solid var(--border-subtle)",
                  boxShadow: isSelected
                    ? "0 2px 8px rgba(184, 75, 41, 0.25)"
                    : "var(--shadow-subtle)",
                }}
              >
                {preset.title.split(":")[0]} ({preset.badge})
              </button>
            );
          })}
        </div>

        {/* Active Preset Display Card */}
        <div
          className="glass-panel"
          style={{
            padding: "clamp(1.2rem, 3.5vw, 2.2rem)",
            maxWidth: "960px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              marginBottom: "1.2rem",
              borderBottom: "1px solid var(--border-subtle)",
              paddingBottom: "1.2rem",
            }}
          >
            <div>
              <span className="badge-sandstone" style={{ marginBottom: "0.35rem" }}>
                {activePreset.duration}
              </span>
              <h3
                style={{
                  fontSize: "1.5rem",
                  margin: "0.3rem 0",
                  color: "var(--text-primary)",
                  fontWeight: 700,
                }}
              >
                {activePreset.title}
              </h3>
              <p style={{ color: "var(--color-sandstone)", fontSize: "0.88rem" }}>
                Best for: {activePreset.idealFor}
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                }}
              >
                Estimated Budget:
              </div>
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--color-emerald)",
                }}
              >
                {activePreset.estimatedBudget}
              </div>
              <button
                type="button"
                onClick={handleApplyCurrentPreset}
                className="btn-primary"
                style={{
                  marginTop: "0.5rem",
                  padding: "0.45rem 1rem",
                  fontSize: "0.82rem",
                }}
              >
                Load into Planner
              </button>
            </div>
          </div>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.92rem",
              lineHeight: 1.55,
              marginBottom: "1.6rem",
            }}
          >
            {activePreset.summary}
          </p>

          {/* Timeline of Stops */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.1rem",
              position: "relative",
              paddingLeft: "1.4rem",
              borderLeft: "2px dashed var(--border-highlight)",
            }}
          >
            {activePreset.stops.map((stop, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  backgroundColor: "var(--bg-elevated)",
                  borderRadius: "10px",
                  padding: "1.1rem",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                {/* Node Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-1.85rem",
                    top: "1.1rem",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-sandstone)",
                    boxShadow: "0 0 6px rgba(184, 75, 41, 0.4)",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  <strong
                    style={{
                      fontSize: "1.05rem",
                      color: "var(--text-primary)",
                      fontWeight: 700,
                    }}
                  >
                    {stop.title}
                  </strong>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "var(--color-brass)",
                      backgroundColor: "var(--color-brass-soft)",
                      padding: "0.15rem 0.55rem",
                      borderRadius: "6px",
                      border: "1px solid var(--border-brass)",
                    }}
                  >
                    {stop.time}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.5,
                    marginBottom: "0.55rem",
                  }}
                >
                  {stop.activity}
                </p>

                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-primary)",
                    backgroundColor: "var(--color-sandstone-soft)",
                    padding: "0.35rem 0.65rem",
                    borderRadius: "6px",
                  }}
                >
                  <strong>Tip:</strong> {stop.tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide-out Itinerary Drawer (Bottom sheet on mobile, sidebar on desktop) */}
      {isDrawerOpen && (
        <div id="itinerary-drawer-backdrop" className="itinerary-backdrop" onClick={onCloseDrawer}>
          <div
            id="itinerary-drawer-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="itinerary-drawer-title"
            className="itinerary-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drag Handle */}
            <div
              className="mobile-drag-handle"
              style={{
                width: "44px",
                height: "5px",
                borderRadius: "3px",
                backgroundColor: "var(--border-subtle)",
                margin: "0 auto 0.75rem auto",
              }}
            />

            {/* Drawer Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.2rem",
                paddingBottom: "0.9rem",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <div>
                <h3
                  id="itinerary-drawer-title"
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                  }}
                >
                  My Agra Day Plan
                </h3>
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                  }}
                >
                  {savedItems.length} {savedItems.length === 1 ? "stop" : "stops"} selected
                </span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onCloseDrawer}
                aria-label="Close plan"
                style={{
                  fontSize: "1.3rem",
                  color: "var(--text-muted)",
                  minWidth: "40px",
                  minHeight: "40px",
                }}
              >
                ✕
              </button>
            </div>

            {/* Guard Clause: Empty State */}
            {savedItems.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem 1rem",
                  margin: "auto 0",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🗺️</div>
                <h4
                  style={{
                    fontSize: "1.1rem",
                    marginBottom: "0.4rem",
                    color: "var(--text-primary)",
                  }}
                >
                  Your Day Plan is Empty
                </h4>
                <p
                  style={{
                    fontSize: "0.86rem",
                    color: "var(--text-secondary)",
                    marginBottom: "1.4rem",
                    lineHeight: 1.5,
                  }}
                >
                  Click &quot;+ Add to Plan&quot; on any monument or food spot, or load one of our
                  curated presets.
                </p>
                <button
                  type="button"
                  onClick={handleApplyCurrentPreset}
                  className="btn-primary"
                  style={{ fontSize: "0.85rem" }}
                >
                  Load 1-Day Express Trail
                </button>
              </div>
            ) : (
              /* Saved Items List */
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    marginBottom: "1.25rem",
                    flex: 1,
                  }}
                >
                  {savedItems.map((item, index) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        padding: "0.85rem",
                        backgroundColor: "var(--bg-elevated)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "10px",
                        gap: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          borderRadius: "50%",
                          backgroundColor: "var(--color-sandstone)",
                          color: "var(--text-on-accent)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: "0.15rem",
                        }}
                      >
                        {index + 1}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: "0.92rem",
                            color: "var(--text-primary)",
                          }}
                        >
                          {item.name}
                        </div>
                        <div
                          style={{
                            fontSize: "0.76rem",
                            color: "var(--color-brass)",
                            marginBottom: "0.15rem",
                          }}
                        >
                          {item.subCategory} • {item.distanceFromTaj} from Taj
                        </div>
                        <div
                          style={{
                            fontSize: "0.76rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          Hours: {item.timings}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        title="Remove stop"
                        aria-label={`Remove ${item.name} from plan`}
                        style={{
                          color: "var(--color-ruby)",
                          fontSize: "1rem",
                          minWidth: "40px",
                          minHeight: "40px",
                          marginTop: "-0.5rem",
                          marginRight: "-0.5rem",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Drawer Footer Actions */}
                <div
                  style={{
                    paddingTop: "0.85rem",
                    borderTop: "1px solid var(--border-subtle)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleCopyItinerary}
                    className="btn-primary"
                    style={{ width: "100%" }}
                  >
                    {copyButtonLabel}
                  </button>

                  <button
                    type="button"
                    onClick={onClearItems}
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      textAlign: "center",
                      padding: "0.35rem",
                    }}
                  >
                    Clear All Stops
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

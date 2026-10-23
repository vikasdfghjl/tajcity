"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TAJ_VISIT_SIMULATOR } from "@/data/agraData";

export function TajSimulator() {
  const [selectedSlotId, setSelectedSlotId] = useState<string>("dawn");

  const currentSlot =
    TAJ_VISIT_SIMULATOR.find((slot) => slot.id === selectedSlotId) ?? TAJ_VISIT_SIMULATOR[0];

  return (
    <section id="simulator" className="section-padding">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header">
          <span className="badge-sandstone">Lighting & Crowd Guide</span>
          <h2>The Taj Mahal Lighting Simulator</h2>
          <p>
            The translucent Makrana marble changes character drastically throughout the day. Pick
            your arrival window to see crowd forecasts, lighting hues, and professional photography
            angles.
          </p>
        </div>

        {/* Time Selector Pills - Swipeable on mobile */}
        <div
          className="horizontal-scroll-chips"
          style={{
            marginBottom: "1.8rem",
          }}
        >
          {TAJ_VISIT_SIMULATOR.map((slot) => {
            const isSelected = slot.id === currentSlot.id;
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedSlotId(slot.id)}
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
                {slot.name} ({slot.timeWindow.split(" ")[0]})
              </button>
            );
          })}
        </div>

        {/* Interactive Visual Card with Dynamic Glow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlot.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="glass-panel"
            style={{
              padding: "clamp(1.2rem, 3.5vw, 2.2rem)",
              maxWidth: "1050px",
              margin: "0 auto",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Ambient dynamic slot glow */}
            <div
              style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                background: currentSlot.glowColor,
                filter: "blur(60px)",
                opacity: 0.6,
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              {/* Left Column: Visual representation & Metrics */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.8rem",
                  }}
                >
                  <span className="badge-sandstone">{currentSlot.timeWindow}</span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--color-brass)",
                    }}
                  >
                    {currentSlot.photoQuality}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.65rem",
                    fontWeight: 700,
                    marginBottom: "0.4rem",
                    color: "var(--text-primary)",
                  }}
                >
                  {currentSlot.name}
                </h3>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.92rem",
                    lineHeight: 1.55,
                    marginBottom: "1.4rem",
                  }}
                >
                  {currentSlot.tempAdvice}
                </p>

                {/* Crowd Density Gauge */}
                <div style={{ marginBottom: "1.4rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.82rem",
                      marginBottom: "0.35rem",
                    }}
                  >
                    <span style={{ color: "var(--text-muted)" }}>Crowd Density Level:</span>
                    <strong
                      style={{
                        color:
                          currentSlot.crowdScore > 75
                            ? "var(--color-ruby)"
                            : currentSlot.crowdScore > 40
                              ? "var(--color-brass)"
                              : "var(--color-emerald)",
                      }}
                    >
                      {currentSlot.crowdLevel} ({currentSlot.crowdScore}%)
                    </strong>
                  </div>
                  <div
                    style={{
                      height: "7px",
                      width: "100%",
                      backgroundColor: "var(--border-subtle)",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${currentSlot.crowdScore}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{
                        height: "100%",
                        backgroundColor:
                          currentSlot.crowdScore > 75
                            ? "var(--color-ruby)"
                            : currentSlot.crowdScore > 40
                              ? "var(--color-brass)"
                              : "var(--color-emerald)",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                </div>

                {/* Gate Recommendation Pill */}
                <div
                  style={{
                    padding: "0.85rem 1rem",
                    borderRadius: "10px",
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    fontSize: "0.86rem",
                  }}
                >
                  <strong style={{ color: "var(--color-sandstone)" }}>
                    Recommended Gate Strategy:
                  </strong>
                  <div style={{ color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                    {currentSlot.recommendedGate}
                  </div>
                </div>
              </div>

              {/* Right Column: Key Advantages & Photo Pro-Tips */}
              <div
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  borderRadius: "12px",
                  padding: "1.35rem",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <h4
                  style={{
                    fontSize: "0.98rem",
                    color: "var(--color-sandstone)",
                    marginBottom: "0.6rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontWeight: 700,
                  }}
                >
                  Photography Secrets
                </h4>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--text-primary)",
                    lineHeight: 1.55,
                    marginBottom: "1rem",
                  }}
                >
                  {currentSlot.photoTips}
                </p>

                <h4
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    marginBottom: "0.5rem",
                    fontWeight: 600,
                  }}
                >
                  Key Highlights:
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.45rem",
                  }}
                >
                  {currentSlot.keyAdvantages.map((advantage, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <span style={{ color: "var(--color-emerald)", flexShrink: 0 }}>✓</span>
                      <span>{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

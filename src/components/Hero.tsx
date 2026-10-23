"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

interface HeroProps {
  onSearchQueryChange: (query: string) => void;
  onSelectQuickCategory: (category: "monument" | "food" | "craft" | "all") => void;
}

export function Hero({ onSearchQueryChange, onSelectQuickCategory }: HeroProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;
    setSearchInput(nextQuery);
    onSearchQueryChange(nextQuery);
  };

  const handleChipClick = (category: "monument" | "food" | "craft" | "all") => {
    onSelectQuickCategory(category);
    const targetElement = document.getElementById(category === "food" ? "food" : "monuments");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "76vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "3.5rem 1rem 3rem 1rem",
      }}
    >
      {/* Background Image Layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/taj_hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          filter: "brightness(0.55) contrast(1.1)",
          zIndex: 0,
        }}
      />

      {/* Seamless radial gradient fading into current theme canvas */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.35) 50%, var(--bg-canvas) 100%)",
          zIndex: 1,
        }}
      />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "860px",
          margin: "0 auto",
        }}
      >
        {/* Heritage Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ marginBottom: "0.85rem" }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.25rem 0.75rem",
              fontSize: "0.74rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              borderRadius: "var(--pill-radius)",
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              color: "#151a24",
              boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            }}
          >
            UNESCO World Heritage Gateway • Uttar Pradesh, India
          </span>
        </motion.div>

        {/* Grand Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          style={{
            fontSize: "clamp(2rem, 6.2vw, 3.6rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "0.9rem",
            color: "#ffffff",
            textShadow: "0 2px 20px rgba(0, 0, 0, 0.6)",
          }}
        >
          Beyond the Marble. <br />
          <span
            style={{
              background: "linear-gradient(135deg, #ffffff 20%, #fbd5b5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Taste the Heritage.
          </span>{" "}
          <br />
          Live the Mughal Legacy.
        </motion.h1>

        {/* Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          style={{
            fontSize: "clamp(0.94rem, 2.4vw, 1.15rem)",
            color: "rgba(255, 255, 255, 0.92)",
            maxWidth: "660px",
            margin: "0 auto 1.6rem auto",
            fontWeight: 400,
            lineHeight: 1.55,
            textShadow: "0 1px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          Your curated companion for exploring Agra: secret sunrise angles, century-old Bedmi Poori
          and Petha institutions, and custom 1-day & 2-day routes.
        </motion.p>

        {/* Interactive Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            maxWidth: "600px",
            margin: "0 auto 1.4rem auto",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--pill-radius)",
              padding: "0.35rem 0.5rem 0.35rem 1rem",
              boxShadow: "var(--shadow-card)",
              minHeight: "48px",
            }}
          >
            <span
              style={{
                fontSize: "1rem",
                marginRight: "0.5rem",
                opacity: 0.7,
              }}
            >
              🔍
            </span>
            <input
              id="hero-quick-search-input"
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              placeholder="Search Bedmi, Petha, Fort, Sunset..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--text-primary)",
                fontSize: "0.95rem",
                fontFamily: "inherit",
                minWidth: 0,
              }}
            />
            {searchInput.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  onSearchQueryChange("");
                }}
                style={{
                  color: "var(--text-muted)",
                  padding: "0.3rem 0.5rem",
                  fontSize: "0.85rem",
                }}
              >
                ✕
              </button>
            )}
            <a
              href="#monuments"
              className="btn-primary"
              style={{
                padding: "0.5rem 1.1rem",
                fontSize: "0.84rem",
                minHeight: "36px",
                flexShrink: 0,
              }}
            >
              Explore
            </a>
          </div>

          {/* Quick Filter Tag Buttons */}
          <div
            className="horizontal-scroll-chips"
            style={{
              marginTop: "0.85rem",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={() => handleChipClick("monument")}
              className="btn-secondary"
              style={{
                padding: "0.35rem 0.8rem",
                fontSize: "0.78rem",
                whiteSpace: "nowrap",
                minHeight: "34px",
                flexShrink: 0,
              }}
            >
              🏛️ Monuments
            </button>
            <button
              type="button"
              onClick={() => handleChipClick("food")}
              className="btn-secondary"
              style={{
                padding: "0.35rem 0.8rem",
                fontSize: "0.78rem",
                whiteSpace: "nowrap",
                minHeight: "34px",
                flexShrink: 0,
              }}
            >
              🍲 Street Food
            </button>
            <button
              type="button"
              onClick={() => handleChipClick("craft")}
              className="btn-secondary"
              style={{
                padding: "0.35rem 0.8rem",
                fontSize: "0.78rem",
                whiteSpace: "nowrap",
                minHeight: "34px",
                flexShrink: 0,
              }}
            >
              💎 Marble Craft
            </button>
          </div>
        </motion.div>

        {/* Live Fact Counter 2x2 on Mobile, 4x1 on Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "0.75rem",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: "0.75rem 0.5rem",
              textAlign: "center",
              backgroundColor: "var(--bg-surface)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "var(--color-sandstone)",
              }}
            >
              3
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>UNESCO Wonders</div>
          </div>

          <div
            className="glass-panel"
            style={{
              padding: "0.75rem 0.5rem",
              textAlign: "center",
              backgroundColor: "var(--bg-surface)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "var(--color-brass)",
              }}
            >
              30+
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Petha Varieties</div>
          </div>

          <div
            className="glass-panel"
            style={{
              padding: "0.75rem 0.5rem",
              textAlign: "center",
              backgroundColor: "var(--bg-surface)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "var(--color-sandstone)",
              }}
            >
              05:45 AM
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Golden Sunrise</div>
          </div>

          <div
            className="glass-panel"
            style={{
              padding: "0.75rem 0.5rem",
              textAlign: "center",
              backgroundColor: "var(--bg-surface)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "var(--color-emerald)",
              }}
            >
              500m
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>EV Golf Cart Zone</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

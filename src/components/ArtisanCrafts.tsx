"use client";

import React, { useState } from "react";
import Image from "next/image";

export function ArtisanCrafts() {
  const [scratchTestPassed, setScratchTestPassed] = useState(false);

  return (
    <section id="crafts" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-brass">Living Heritage</span>
          <h2>Pietra Dura & Master Artisan Traditions</h2>
          <p>
            When the Taj Mahal was completed in 1648, thousands of master stonemasons settled along
            the Yamuna. Their direct descendants still practice <em>Parchin Kari</em> (semi-precious
            stone inlay) in Agra today.
          </p>
        </div>

        {/* Feature Split Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {/* Artisan Image Container */}
          <div
            className="glass-panel"
            style={{
              position: "relative",
              height: "380px",
              overflow: "hidden",
              borderRadius: "16px",
            }}
          >
            <Image
              src="/images/marble_craft.jpg"
              alt="Master artisan creating Pietra Dura marble inlay in Agra"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 60%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "1.25rem",
                left: "1.25rem",
                right: "1.25rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  color: "#151a24",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "var(--pill-radius)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.4rem",
                }}
              >
                Parchin Kari (Pietra Dura)
              </span>
              <h3
                style={{
                  fontSize: "1.25rem",
                  color: "#ffffff",
                  marginBottom: "0.25rem",
                }}
              >
                Hand-Chiseled Makrana Marble
              </h3>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "rgba(255, 255, 255, 0.85)",
                  lineHeight: 1.45,
                }}
              >
                Gemstones like Afghan Lapis Lazuli, Persian Turquoise, and Carnelian are ground on
                hand-turned emery wheels to fit seamlessly into micro-grooves.
              </p>
            </div>
          </div>

          {/* Interactive Authenticity Checker Card */}
          <div
            className="glass-panel"
            style={{
              padding: "clamp(1.25rem, 3vw, 2rem)",
              display: "flex",
              flexDirection: "column",
              gap: "1.1rem",
            }}
          >
            <div>
              <span className="badge-ruby" style={{ marginBottom: "0.4rem" }}>
                Buyer Protection Guide
              </span>
              <h3
                style={{
                  fontSize: "1.4rem",
                  marginBottom: "0.4rem",
                  color: "var(--text-primary)",
                  fontWeight: 700,
                }}
              >
                How to Spot Real vs Fake Marble in Agra
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                }}
              >
                Rogue souvenir shops often coat soft, cheap soapstone (alabaster or gorara) with
                synthetic polish and claim it is authentic Makrana marble. Here is how to test it
                yourself:
              </p>
            </div>

            {/* Test 1: The Scratch Test */}
            <div
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "10px",
                padding: "0.9rem",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "var(--color-sandstone)",
                  marginBottom: "0.25rem",
                }}
              >
                1. The Coin / Key Scratch Test
              </div>
              <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)" }}>
                Take the edge of a coin or house key and scratch the unpolished underside of the
                plate. Real Makrana marble will <strong>never scratch</strong>. Cheap soapstone will
                produce white dust immediately.
              </p>
            </div>

            {/* Test 2: The Flashlight Translucency Test */}
            <div
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "10px",
                padding: "0.9rem",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "var(--color-brass)",
                  marginBottom: "0.25rem",
                }}
              >
                2. The Smartphone Torch Test
              </div>
              <p style={{ fontSize: "0.84rem", color: "var(--text-secondary)" }}>
                Hold your phone flashlight flush against the underside of the stone inlay. Genuine
                semi-precious carnelian and lapis lazuli glow with deep translucent radiance.
                Plastic resin blocks the beam completely.
              </p>
            </div>

            {/* Interactive verification button */}
            <button
              type="button"
              onClick={() => setScratchTestPassed((prev) => !prev)}
              className="btn-secondary"
              style={{
                fontSize: "0.85rem",
                width: "100%",
                borderColor: scratchTestPassed ? "var(--color-emerald)" : "var(--border-subtle)",
                color: scratchTestPassed ? "var(--color-emerald)" : "var(--text-primary)",
                backgroundColor: scratchTestPassed
                  ? "var(--color-emerald-soft)"
                  : "var(--bg-surface)",
              }}
            >
              {scratchTestPassed
                ? "✓ Authenticity Rule Memorized"
                : "Tap to Save the Scratch & Torch Rule"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

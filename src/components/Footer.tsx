"use client";

import React from "react";

const CURRENT_YEAR = 2026;

export function Footer() {
  return (
    <footer
      id="main-footer"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "3.5rem 1.5rem 2rem 1.5rem",
        marginTop: "3rem",
        transition: "background-color 0.25s ease, border-color 0.25s ease",
      }}
    >
      <div className="container">
        {/* Top Helpline Grid */}
        <div
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "14px",
            padding: "1.25rem 1.5rem",
            marginBottom: "2.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.2rem",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.72rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-sandstone)",
                fontWeight: 600,
              }}
            >
              Emergency Helpline
            </span>
            <div
              style={{
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              📞 112 (Police & Emergency)
            </div>
          </div>

          <div>
            <span
              style={{
                fontSize: "0.72rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-sandstone)",
                fontWeight: 600,
              }}
            >
              UP Tourism 24/7 Helpline
            </span>
            <div
              style={{
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              📞 1363 (Tourist Assistance)
            </div>
          </div>

          <div>
            <span
              style={{
                fontSize: "0.72rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-sandstone)",
                fontWeight: 600,
              }}
            >
              Tourist Police Station
            </span>
            <div
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              📍 Tajganj Police Booth
            </div>
          </div>
        </div>

        {/* Brand & Quick Navigation */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "0.4rem",
              }}
            >
              TAJ CITY
            </div>
            <p
              style={{
                fontSize: "0.86rem",
                color: "var(--text-secondary)",
                lineHeight: 1.55,
              }}
            >
              An independent, interactive visitor guidance SPA dedicated to celebrating Agra&apos;s
              architectural marvels, culinary institutions, and living artisan traditions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: "0.92rem",
                color: "var(--color-sandstone)",
                marginBottom: "0.65rem",
                fontWeight: 700,
              }}
            >
              Explore Agra
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                fontSize: "0.86rem",
                color: "var(--text-secondary)",
              }}
            >
              <li>
                <a href="#monuments" style={{ transition: "color 0.15s ease" }}>
                  Taj Mahal & Agra Fort
                </a>
              </li>
              <li>
                <a href="#food" style={{ transition: "color 0.15s ease" }}>
                  Bedmi Poori & Panchhi Petha
                </a>
              </li>
              <li>
                <a href="#simulator" style={{ transition: "color 0.15s ease" }}>
                  Taj Lighting & Crowd Guide
                </a>
              </li>
              <li>
                <a href="#itineraries" style={{ transition: "color 0.15s ease" }}>
                  1-Day & 2-Day Curated Routes
                </a>
              </li>
            </ul>
          </div>

          {/* Official Resources */}
          <div>
            <h4
              style={{
                fontSize: "0.92rem",
                color: "var(--color-sandstone)",
                marginBottom: "0.65rem",
                fontWeight: 700,
              }}
            >
              Official Portals
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                fontSize: "0.86rem",
                color: "var(--text-secondary)",
              }}
            >
              <li>
                <a
                  href="https://asi.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--color-brass)" }}
                >
                  Archaeological Survey of India (ASI Tickets) ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.uptourism.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--color-brass)" }}
                >
                  Uttar Pradesh Tourism Official ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.irctc.co.in"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--color-brass)" }}
                >
                  IRCTC Gatimaan / Vande Bharat Booking ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits Bar */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
          }}
        >
          <div>© {CURRENT_YEAR} Taj City Interactive Guide. Crafted for visitors to Agra.</div>
          <div>Friday Notice: The Taj Mahal is closed every Friday for tourists.</div>
        </div>
      </div>
    </footer>
  );
}

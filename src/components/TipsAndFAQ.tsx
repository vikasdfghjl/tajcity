"use client";

import React, { useState } from "react";
import { AGRA_SMART_TIPS, DISTANCE_MATRIX } from "@/data/agraData";

export function TipsAndFAQ() {
  const [activeTipId, setActiveTipId] = useState<string | null>(AGRA_SMART_TIPS[0].id);

  const toggleTip = (id: string) => {
    setActiveTipId((previousId) => (previousId === id ? null : id));
  };

  return (
    <section id="secrets" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-sandstone">Travel Intelligence</span>
          <h2>Agra Visitor Rules & Transit Matrix</h2>
          <p>
            Avoid ruined plans, 45-minute ticket queues, and transport hassles with these verified
            official guidelines.
          </p>
        </div>

        {/* Two Column Layout: Smart Tips Accordion + Distance Matrix */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* Column 1: Accordion of Rules */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                marginBottom: "0.4rem",
                color: "var(--text-primary)",
                fontWeight: 700,
              }}
            >
              Essential Rules & Scams to Avoid
            </h3>

            {AGRA_SMART_TIPS.map((tip) => {
              const isOpen = activeTipId === tip.id;

              return (
                <div
                  key={tip.id}
                  className="glass-panel"
                  style={{
                    overflow: "hidden",
                    border: isOpen
                      ? "1px solid var(--border-highlight)"
                      : "1px solid var(--border-card)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleTip(tip.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${tip.id}-details`}
                    style={{
                      width: "100%",
                      padding: "1rem 1.15rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textAlign: "left",
                      gap: "0.75rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ fontSize: "1.2rem" }}>{tip.icon}</span>
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: "0.95rem",
                            color: "var(--text-primary)",
                          }}
                        >
                          {tip.title}
                        </div>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                            color:
                              tip.importance === "CRITICAL"
                                ? "var(--color-ruby)"
                                : "var(--color-brass)",
                          }}
                        >
                          [{tip.importance}]
                        </span>
                      </div>
                    </div>
                    <span
                      aria-hidden="true"
                      style={{
                        color: "var(--color-sandstone)",
                        fontSize: "0.85rem",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`${tip.id}-details`}
                      style={{
                        padding: "0 1.15rem 1.15rem 1.15rem",
                        borderTop: "1px solid var(--border-subtle)",
                        paddingTop: "0.8rem",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.86rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.55,
                          marginBottom: "0.75rem",
                        }}
                      >
                        {tip.summary}
                      </p>

                      <div
                        style={{
                          backgroundColor: "var(--color-emerald-soft)",
                          borderLeft: "3px solid var(--color-emerald)",
                          borderRadius: "0 8px 8px 0",
                          padding: "0.55rem 0.75rem",
                          fontSize: "0.82rem",
                          color: "var(--text-primary)",
                        }}
                      >
                        <strong>What to do:</strong> {tip.solution}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Column 2: Distance & Transit Hub Matrix */}
          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                marginBottom: "0.85rem",
                color: "var(--text-primary)",
                fontWeight: 700,
              }}
            >
              Transit & Commute Matrix
            </h3>

            <div
              className="glass-panel"
              style={{
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.86rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                }}
              >
                Plan your travel realistically across Agra. Pre-paid autorickshaws and app-based
                cabs operate across all central monument hubs.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {DISTANCE_MATRIX.map((route, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.65rem 0.8rem",
                      backgroundColor: "var(--bg-elevated)",
                      borderRadius: "8px",
                      border: "1px solid var(--border-subtle)",
                      fontSize: "0.84rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "var(--text-primary)",
                        }}
                      >
                        {route.from} ➔ {route.to}
                      </div>
                      <div
                        style={{
                          fontSize: "0.74rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        Distance: {route.distance}
                      </div>
                    </div>

                    <span
                      style={{
                        backgroundColor: "var(--color-sandstone-soft)",
                        color: "var(--color-sandstone)",
                        padding: "0.2rem 0.55rem",
                        borderRadius: "var(--pill-radius)",
                        fontWeight: 600,
                        fontSize: "0.76rem",
                        border: "1px solid var(--border-highlight)",
                      }}
                    >
                      {route.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Transit Tip Callout */}
              <div
                style={{
                  backgroundColor: "var(--color-sandstone-soft)",
                  borderRadius: "8px",
                  padding: "0.75rem 0.85rem",
                  border: "1px solid var(--border-highlight)",
                  fontSize: "0.82rem",
                  color: "var(--text-primary)",
                  marginTop: "0.3rem",
                }}
              >
                <strong>Auto Tip:</strong> Fares from Agra Cantt Station to Tajganj are
                approximately ₹150 - ₹200. Always agree on the fare prior to departure or book via
                Uber Auto.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";

interface HeaderProps {
  savedItemCount: number;
  currentTheme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenItineraryDrawer: () => void;
}

export function Header({
  savedItemCount,
  currentTheme,
  onToggleTheme,
  onOpenItineraryDrawer,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((previousState) => !previousState);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header id="main-navigation" className="site-header">
      <div className="container header-inner">
        {/* Brand / Logo */}
        <a href="#" className="header-brand" aria-label="Taj City Agra Companion Home">
          <div className="header-brand-icon">🏛</div>
          <div className="header-brand-text">
            <span className="brand-title">TAJ CITY</span>
            <span className="brand-subtitle">Agra Companion</span>
          </div>
        </a>

        {/* Live Visitor Notice Pill (Desktop) */}
        <div
          className="desktop-status-pill"
          style={{
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.3rem 0.85rem",
            borderRadius: "var(--pill-radius)",
            backgroundColor: "var(--color-brass-soft)",
            border: "1px solid rgba(158, 111, 33, 0.2)",
            fontSize: "0.8rem",
            fontWeight: 500,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "var(--color-brass)",
            }}
          />
          <span style={{ color: "var(--color-brass)" }}>
            <strong>Visitor Notice:</strong> Taj opens 30m before sunrise (Closed Fridays)
          </span>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="desktop-nav" aria-label="Desktop primary navigation">
          <a href="#monuments">Monuments</a>
          <a href="#food">Food & Petha</a>
          <a href="#simulator">Light Simulator</a>
          <a href="#itineraries">Itineraries</a>
          <a href="#secrets">Visitor Rules</a>
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="theme-toggle-btn"
            title={currentTheme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            aria-label="Toggle color theme"
            suppressHydrationWarning
          >
            {currentTheme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Action Button: Itinerary Drawer Trigger */}
          <button
            id="open-itinerary-button"
            type="button"
            onClick={onOpenItineraryDrawer}
            className="btn-primary header-plan-btn"
            aria-label={`View My Plan (${savedItemCount} items saved)`}
          >
            <span className="plan-label-full">My Plan</span>
            <span className="plan-label-short">Plan</span>
            {savedItemCount > 0 && <span className="header-plan-badge">{savedItemCount}</span>}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-dropdown"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-dropdown"
          className="mobile-nav-dropdown"
          aria-label="Mobile Navigation Menu"
        >
          {/* Mobile Notice */}
          <div
            className="mobile-friday-alert"
            style={{
              backgroundColor: "var(--color-brass-soft)",
            }}
          >
            <span>ℹ️</span>
            <span style={{ color: "var(--color-brass)", fontWeight: 500 }}>
              Taj Mahal is open Sunrise–Sunset (Closed every Friday)
            </span>
          </div>

          <a href="#monuments" onClick={closeMobileMenu} className="mobile-nav-link">
            <span>🏛️</span>
            <span>Monuments & Forts</span>
          </a>
          <a href="#food" onClick={closeMobileMenu} className="mobile-nav-link">
            <span>🍲</span>
            <span>Food & Panchhi Petha</span>
          </a>
          <a href="#simulator" onClick={closeMobileMenu} className="mobile-nav-link">
            <span>☀️</span>
            <span>Taj Lighting Simulator</span>
          </a>
          <a href="#itineraries" onClick={closeMobileMenu} className="mobile-nav-link">
            <span>🧭</span>
            <span>Curated Routes</span>
          </a>
          <a href="#secrets" onClick={closeMobileMenu} className="mobile-nav-link">
            <span>ℹ️</span>
            <span>Visitor Rules & Distance Matrix</span>
          </a>
        </nav>
      )}
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";

export const SECTIONS = [
  { id: "light", label: "Light" },
  { id: "explore", label: "Explore" },
  { id: "map", label: "Map" },
  { id: "plans", label: "Day plans" },
  { id: "essentials", label: "Essentials" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

/** Which section sits in the middle band of the viewport, via IntersectionObserver. */
export function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });
    const hero = document.getElementById("top");
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    if (hero) {
      heroObserver.observe(hero);
    }
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  return active;
}

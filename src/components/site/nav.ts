"use client";

import { useEffect, useState } from "react";
import { ACTIVE_SECTION_ROOT_MARGIN, SECTIONS, type SectionId } from "@/config/constants";

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
      { rootMargin: ACTIVE_SECTION_ROOT_MARGIN },
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
      { rootMargin: ACTIVE_SECTION_ROOT_MARGIN },
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

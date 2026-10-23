"use client";

import { ListChecks } from "@phosphor-icons/react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useActiveSection } from "@/components/site/nav";
import { HEADER_SOLID_AFTER_VIEWPORT, SECTIONS } from "@/config/constants";
import { sheetActions, usePlan } from "@/lib/stores";
import { cn } from "@/lib/cn";

export function Header() {
  const { scrollY } = useScroll();
  const [overHero, setOverHero] = useState(true);
  const active = useActiveSection();
  const plan = usePlan();

  // Transparent over the hero photo, frosted once the page content scrolls under it
  useMotionValueEvent(scrollY, "change", (y) => {
    setOverHero(y < window.innerHeight * HEADER_SOLID_AFTER_VIEWPORT);
  });

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,color,box-shadow] duration-500",
        overHero ? "text-white" : "glass text-ink shadow-[0_1px_0_var(--line)]",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6">
        <a href="#top" className="flex items-baseline gap-2" aria-label="Taj City, back to top">
          <span className="text-lg font-semibold tracking-[-0.03em]">Taj City</span>
          <span
            lang="hi"
            className={cn("font-deva text-[15px]", overHero ? "text-white/70" : "text-ink-3")}
          >
            आगरा
          </span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 lg:flex">
          {SECTIONS.map((section) => {
            const isActive = active === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  overHero ? "text-white/80 hover:text-white" : "text-ink-2 hover:text-ink",
                  isActive && !overHero && "text-ink",
                )}
              >
                {isActive && !overHero && (
                  <motion.span
                    layoutId="header-active"
                    className="absolute inset-0 rounded-full bg-sunken"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative">{section.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className={overHero ? "hover:bg-white/10" : "hover:bg-sunken"} />
          <button
            type="button"
            onClick={sheetActions.openPlan}
            className={cn(
              "hidden min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-[transform,background-color] active:scale-[0.97] lg:flex",
              overHero ? "bg-white text-[#12141a]" : "bg-accent text-accent-ink",
            )}
          >
            <ListChecks size={18} weight="bold" />
            My day
            <span className="font-mono text-xs opacity-75">{plan.length}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

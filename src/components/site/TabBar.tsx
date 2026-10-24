"use client";

import { Compass, ListChecks, MapTrifold, SunHorizon, type Icon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useActiveSection } from "@/components/site/nav";
import { SECTIONS, TAB_BAR_SECTIONS, type SectionId } from "@/config/constants";
import { sheetActions, usePlan, useSheet } from "@/lib/stores";
import { cn } from "@/lib/cn";

const TAB_ICONS: Partial<Record<SectionId, Icon>> = {
  light: SunHorizon,
  explore: Compass,
  map: MapTrifold,
};

const TABS = TAB_BAR_SECTIONS.map((id) => ({
  id,
  label: SECTIONS.find((section) => section.id === id)?.label ?? id,
  Icon: TAB_ICONS[id] ?? Compass,
}));

/** Floating thumb-zone navigation for phones and tablets. Hidden from lg upwards. */
export function TabBar() {
  const active = useActiveSection();
  const plan = usePlan();
  const sheet = useSheet();

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed right-[max(0.75rem,env(safe-area-inset-right))] bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-[max(0.75rem,env(safe-area-inset-left))] z-40 lg:hidden"
    >
      <div className="glass mx-auto flex h-16 max-w-md items-center justify-between rounded-full border border-line p-1.5 shadow-card">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative flex h-full flex-1 flex-col items-center justify-center gap-0.5 rounded-full text-[11px] font-medium transition-colors",
                isActive ? "text-ink" : "text-ink-3",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-active"
                  className="absolute inset-0 rounded-full bg-sunken"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <Icon size={22} weight={isActive ? "fill" : "regular"} className="relative" />
              <span className="relative">{label}</span>
            </a>
          );
        })}
        <button
          type="button"
          onClick={sheetActions.openPlan}
          aria-expanded={sheet?.type === "plan"}
          className="relative flex h-full flex-[1.4] items-center justify-center gap-1.5 rounded-full whitespace-nowrap bg-accent text-sm font-semibold text-accent-ink transition-transform active:scale-[0.97]"
        >
          <ListChecks size={20} weight="bold" />
          My day
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={plan.length}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="grid min-w-5 place-items-center rounded-full bg-accent-ink/20 px-1.5 font-mono text-xs"
            >
              {plan.length}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </nav>
  );
}

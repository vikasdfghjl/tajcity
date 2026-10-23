"use client";

import { Check, Plus } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { getPlace } from "@/data/places";
import { planActions, sheetActions, showToast, usePlan } from "@/lib/stores";
import { cn } from "@/lib/cn";

interface AddToPlanButtonProps {
  id: string;
  variant?: "icon" | "wide";
  className?: string;
}

/** Adds or removes a stop and confirms it with a toast; undo restores the exact previous order. */
export function togglePlace(id: string, plan: string[]) {
  const name = getPlace(id)?.name ?? "Stop";
  const previous = [...plan];
  planActions.toggle(id);
  if (previous.includes(id)) {
    showToast(`Removed ${name}`, { label: "Undo", run: () => planActions.reorder(previous) });
  } else {
    showToast(`Added ${name} to your day`, { label: "View", run: sheetActions.openPlan });
  }
}

export function AddToPlanButton({ id, variant = "icon", className }: AddToPlanButtonProps) {
  const plan = usePlan();
  const isSaved = plan.includes(id);
  const name = getPlace(id)?.name ?? "this stop";

  if (variant === "wide") {
    return (
      <button
        type="button"
        onClick={() => togglePlace(id, plan)}
        className={cn(
          "flex min-h-12 items-center justify-center gap-2 rounded-full px-4 text-[15px] font-semibold whitespace-nowrap transition-[transform,background-color] active:scale-[0.98]",
          isSaved ? "bg-accent-soft text-accent" : "bg-accent text-accent-ink",
          className,
        )}
      >
        {isSaved ? <Check size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
        {isSaved ? "In your day" : "Add to my day"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => togglePlace(id, plan)}
      aria-label={isSaved ? `Remove ${name} from my day` : `Add ${name} to my day`}
      className={cn(
        "relative z-10 grid size-11 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] active:scale-90",
        isSaved
          ? "border-accent bg-accent text-accent-ink"
          : "border-line bg-surface text-ink hover:border-ink-3",
        className,
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={isSaved ? "saved" : "add"}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          className="grid place-items-center"
        >
          {isSaved ? <Check size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

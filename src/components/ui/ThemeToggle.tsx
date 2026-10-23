"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { setTheme, useTheme } from "@/lib/stores";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={theme ? `Switch to ${next} theme` : "Switch theme"}
      className={cn(
        "relative grid size-10 place-items-center overflow-hidden rounded-full transition-transform active:scale-95",
        className,
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={theme ?? "unknown"}
          initial={{ y: 18, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -18, opacity: 0, rotate: 40 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className="grid place-items-center"
        >
          {theme === "dark" ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

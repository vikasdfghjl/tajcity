"use client";

import { motion } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/cn";

interface SegmentedProps<T extends string> {
  label: string;
  options: { value: T; label: string; count?: number }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

/** Pill segmented control. The selected pill slides between options as a shared layout element. */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: SegmentedProps<T>) {
  const layoutId = useId();
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "no-scrollbar inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-sunken p-1",
        className,
      )}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative min-h-10 shrink-0 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors duration-300",
              isSelected ? "text-accent-ink" : "text-ink-2 hover:text-ink",
            )}
          >
            {isSelected && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {option.label}
              {option.count !== undefined && (
                <span className="font-mono text-xs opacity-70">{option.count}</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

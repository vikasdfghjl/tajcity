"use client";

import { AnimatePresence, motion } from "motion/react";
import { dismissToast, useToast } from "@/lib/stores";

export function Toaster() {
  const toast = useToast();

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(6.25rem+env(safe-area-inset-bottom))] z-40 flex justify-center px-4 lg:bottom-6"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="pointer-events-auto flex max-w-md items-center gap-3 rounded-full bg-ink py-2 pr-2 pl-5 text-sm text-bg shadow-card"
          >
            <span className="truncate">{toast.message}</span>
            {toast.action && (
              <button
                type="button"
                onClick={() => {
                  toast.action?.run();
                  dismissToast();
                }}
                className="min-h-9 shrink-0 rounded-full bg-bg/15 px-4 font-semibold transition-colors hover:bg-bg/25"
              >
                {toast.action.label}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

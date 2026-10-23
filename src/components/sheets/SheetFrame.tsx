"use client";

import { X } from "@phosphor-icons/react";
import { Drawer } from "vaul";
import { sheetActions, useMediaQuery } from "@/lib/stores";

interface SheetFrameProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * One sheet shell for the whole app: a draggable bottom sheet on phones, a floating
 * side panel from lg upwards. vaul (Radix Dialog underneath) handles focus trap,
 * Escape, scroll lock and drag-to-dismiss.
 */
export function SheetFrame({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: SheetFrameProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(next) => !next && onClose()}
      direction={isDesktop ? "right" : "bottom"}
      // vaul disables Radix auto-focus by default; without it the focus trap never engages
      autoFocus
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-[#05070c]/50 backdrop-blur-[2px]" />
        <Drawer.Content
          onCloseAutoFocus={(event) => {
            // Sheets open from many places without a Drawer.Trigger, so return focus ourselves
            event.preventDefault();
            sheetActions.restoreFocus();
          }}
          className="fixed inset-x-0 bottom-0 z-50 flex max-h-[92svh] flex-col rounded-t-[28px] bg-surface text-ink shadow-card outline-none lg:inset-y-3 lg:right-3 lg:left-auto lg:max-h-none lg:w-[440px] lg:rounded-[24px]"
        >
          <div
            className="mx-auto mt-3 h-1.5 w-11 shrink-0 rounded-full bg-line lg:hidden"
            aria-hidden="true"
          />
          <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-3 lg:pt-6">
            <div className="min-w-0">
              <Drawer.Title className="text-2xl leading-tight font-semibold tracking-[-0.03em]">
                {title}
              </Drawer.Title>
              <Drawer.Description asChild>
                <div className="mt-1 text-sm text-ink-2">{description}</div>
              </Drawer.Description>
            </div>
            <Drawer.Close
              aria-label="Close"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-sunken text-ink-2 transition-colors hover:text-ink"
            >
              <X size={18} weight="bold" />
            </Drawer.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
            {children}
          </div>
          {footer && (
            <div className="border-t border-line px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {footer}
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

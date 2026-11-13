import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Close } from "./Icons";
import { cn } from "../../lib/utils";
import { EASE } from "../../lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  size?: "md" | "lg" | "xl";
  children: ReactNode;
}

const widths = { md: "max-w-xl", lg: "max-w-3xl", xl: "max-w-5xl" };

export default function Modal({ open, onClose, title, eyebrow, size = "md", children }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={cn(
              "relative z-10 flex max-h-[92svh] w-full flex-col overflow-hidden border border-line-strong bg-r1 shadow-glow",
              widths[size]
            )}
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="absolute inset-x-0 top-0 h-px hair-top" />
            <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-7">
              <div className="min-w-0">
                {eyebrow && <div className="label-xs mb-1 text-ice/80">{eyebrow}</div>}
                <h3 className="truncate font-display text-[15px] font-semibold uppercase tracking-[0.08em]">
                  {title}
                </h3>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close"
                className="grid h-8 w-8 shrink-0 place-items-center border border-line text-mute transition-colors hover:border-line-strong hover:text-fg"
              >
                <Close />
              </button>
            </header>
            <div className="overflow-y-auto overscroll-contain">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

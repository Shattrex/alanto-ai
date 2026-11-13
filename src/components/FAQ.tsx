import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQ as ITEMS } from "../data/content";
import { SECTION } from "../config/site";
import { cn } from "../lib/utils";
import { Plus } from "./ui/Icons";
import Reveal from "./ui/Reveal";
import { Section } from "./ui/Section";
import BookButton from "./ui/BookButton";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id={SECTION.faq}>
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="label mb-6">FAQ</div>
          <h2 className="display text-[clamp(2rem,4.2vw,3.6rem)]">QUESTIONS, ANSWERED.</h2>
          <p className="mt-6 max-w-sm text-[15.5px] leading-relaxed text-mute">
            Straight answers, in plain English.
          </p>
          <BookButton variant="secondary" size="md" arrow className="mt-8" />
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="border-t border-line">
            {ITEMS.map((it, i) => {
              const isOpen = open === i;
              return (
                <li key={it.q} className="border-b border-line">
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      className="group flex w-full items-center gap-5 py-5 text-left md:py-6"
                    >
                      <span className="label-xs w-7 shrink-0 text-dim">{String(i + 1).padStart(2, "0")}</span>
                      <span className={cn("flex-1 font-display text-[17px] font-medium tracking-[-0.01em] transition-colors md:text-[20px]", isOpen ? "text-fg" : "text-fg/80 group-hover:text-fg")}>
                        {it.q}
                      </span>
                      <span className={cn("grid h-8 w-8 shrink-0 place-items-center border transition-all duration-300", isOpen ? "rotate-45 border-ice/50 text-ice" : "border-line text-mute group-hover:border-line-strong")}>
                        <Plus size={13} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-${i}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-7 pl-12 pr-4 text-[17px] leading-relaxed text-mute md:pl-12">{it.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { NOT_LIST } from "../data/authority";
import { EASE, cn } from "../lib/utils";
import { Section } from "./ui/Section";

/** Crosses out the wrong categories one by one, then reveals the real one. */
export default function NotSocialMedia() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });
  const [crossed, setCrossed] = useState(0);

  useEffect(() => {
    if (!inView || crossed > NOT_LIST.length) return;
    const t = setTimeout(() => setCrossed((c) => c + 1), crossed === 0 ? 500 : 800);
    return () => clearTimeout(t);
  }, [inView, crossed]);

  const revealed = crossed > NOT_LIST.length;

  return (
    <Section className="overflow-hidden">
      <div className="grid-bg mask-radial pointer-events-none absolute inset-0 opacity-50" />
      <div className="shell relative" ref={ref}>
        <div className="label mb-10 flex items-center gap-4">
          <span className="text-ice">09</span>
          <span className="h-px w-10 bg-line-strong" />
          <span>POSITIONING</span>
        </div>
        <h2 className="display mb-14 text-[clamp(1.5rem,3.2vw,2.6rem)] text-mute md:mb-20">
          ALANTO IS NOT SOCIAL MEDIA MANAGEMENT.
        </h2>

        <ul className="space-y-2 md:space-y-3">
          {NOT_LIST.map((t, i) => {
            const done = crossed > i;
            return (
              <li key={t} className="relative w-fit max-w-full">
                <span
                  className={cn(
                    "display block text-[clamp(1.6rem,6.2vw,5.4rem)] leading-[1.02] transition-colors duration-700",
                    done ? "text-dim" : "text-fg"
                  )}
                >
                  {t}
                </span>
                <motion.span
                  aria-hidden
                  className="absolute left-0 top-1/2 h-[2px] origin-left bg-ice shadow-[0_0_12px_rgba(185,217,255,0.7)]"
                  style={{ width: "100%" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: done ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              </li>
            );
          })}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative mt-16 border-t border-line pt-12 md:mt-24 md:pt-16"
        >
          <div className="absolute inset-x-0 top-0 h-px hair-top" />
          <div className="label mb-5 text-ice">IT IS</div>
          <p className="display text-silver-h text-[clamp(2rem,6.6vw,6rem)]">
            DIGITAL TWIN
            <br />
            INFRASTRUCTURE
          </p>
          <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-mute md:text-[19px]">
            Alanto captures what makes the professional valuable and builds an expanding digital layer
            around that expertise.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { OPERATING_STAGES } from "../data/authority";
import { cn } from "../lib/utils";
import Reveal from "./ui/Reveal";
import { Section, SectionHeader } from "./ui/Section";

const N = OPERATING_STAGES.length;
const TICK = 2200;

/** Four connected stages with a signal travelling through all of them. */
export default function OperatingModel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setActive((a) => (a + 1) % N), TICK);
    return () => clearInterval(t);
  }, [inView]);

  const pct = (active / (N - 1)) * 100;

  return (
    <Section tone="raised">
      <div className="shell" ref={ref}>
        <SectionHeader
          index="10"
          eyebrow="OPERATING MODEL"
          title={
            <>
              FROM EXPERTISE
              <br />
              TO INFRASTRUCTURE.
            </>
          }
        />

        <Reveal>
          <div className="relative">
            {/* desktop horizontal track */}
            <div className="absolute left-[12.5%] right-[12.5%] top-[27px] hidden h-px bg-line-strong md:block">
              <motion.span
                className="absolute -top-[3px] h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-white shadow-[0_0_16px_4px_rgba(185,217,255,0.8)]"
                animate={{ left: `${pct}%` }}
                transition={{ duration: active === 0 ? 0.5 : TICK / 1000 - 0.4, ease: [0.45, 0, 0.2, 1] }}
              />
              <motion.span
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent to-ice/70"
                animate={{ width: `${pct}%` }}
                transition={{ duration: active === 0 ? 0.5 : TICK / 1000 - 0.4, ease: [0.45, 0, 0.2, 1] }}
              />
            </div>
            {/* mobile vertical track */}
            <div className="absolute bottom-6 left-[27px] top-6 w-px bg-line-strong md:hidden">
              <motion.span
                className="absolute -left-[3px] h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-white shadow-[0_0_16px_4px_rgba(185,217,255,0.8)]"
                animate={{ top: `${pct}%` }}
                transition={{ duration: TICK / 1000 - 0.4, ease: [0.45, 0, 0.2, 1] }}
              />
            </div>

            <ol className="relative grid gap-10 md:grid-cols-4 md:gap-0">
              {OPERATING_STAGES.map((s, i) => {
                const on = i <= active;
                const current = i === active;
                return (
                  <li key={s.n} className="relative pl-[72px] md:px-5 md:pl-5 md:text-center">
                    <div className="absolute left-0 top-0 md:static md:mx-auto md:mb-8 md:w-fit">
                      <div
                        className={cn(
                          "relative grid h-[54px] w-[54px] place-items-center border bg-base font-mono text-[13px] tracking-widest transition-all duration-700",
                          on ? "border-ice/60 text-fg" : "border-line text-dim",
                          current && "shadow-glow"
                        )}
                      >
                        {s.n}
                        {current && <span className="absolute inset-0 animate-[ping-ring_2.2s_ease-out_infinite] border border-ice/50" />}
                      </div>
                    </div>
                    <h3
                      className={cn(
                        "display text-[clamp(1.6rem,2.6vw,2.2rem)] transition-colors duration-700",
                        on ? "text-fg" : "text-dim"
                      )}
                    >
                      {s.title}
                    </h3>
                    <ul className="mt-5 space-y-2.5 md:mx-auto md:max-w-[200px]">
                      {s.items.map((it) => (
                        <li
                          key={it}
                          className={cn(
                            "flex items-center gap-3 text-[14px] transition-colors duration-700 md:justify-center",
                            on ? "text-mute" : "text-dim/70"
                          )}
                        >
                          <span className={cn("h-px w-3 md:hidden", on ? "bg-ice/70" : "bg-line-strong")} />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

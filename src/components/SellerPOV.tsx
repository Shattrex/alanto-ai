import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { BROKER_A, BROKER_B, SELLER_STORY } from "../data/authority";
import { CTA } from "../config/site";
import { EASE, cn } from "../lib/utils";
import BookButton from "./ui/BookButton";
import Button from "./ui/Button";
import { Check, Dash } from "./ui/Icons";
import Reveal from "./ui/Reveal";
import { Section, SectionHeader } from "./ui/Section";

type Scene = "story" | "compare" | "verdict";

function BrokerPanel({
  data,
  rich,
  chosen,
  dimmed,
  onChoose,
  canChoose,
}: {
  data: typeof BROKER_A;
  rich: boolean;
  chosen: boolean;
  dimmed: boolean;
  onChoose: () => void;
  canChoose: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col border bg-r1 transition-all duration-700",
        rich ? "border-line-strong" : "border-line",
        chosen && "border-ice/50 shadow-glow",
        dimmed && "opacity-40"
      )}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-white/10" />
          ))}
        </span>
        <span className="flex-1 truncate border border-line bg-base px-3 py-1 font-mono text-[10.5px] text-dim">
          {rich ? "brokername.com" : "directory.example.com/listing"}
        </span>
      </div>

      <div className="p-5 md:p-7">
        <div className="mb-6 flex items-center gap-4">
          <div
            className={cn(
              "grid h-14 w-14 shrink-0 place-items-center rounded-full border",
              rich ? "border-ice/40 bg-ice/[0.06]" : "border-line bg-r3"
            )}
          >
            <span className={cn("block h-5 w-5 rounded-full", rich ? "bg-ice/60" : "bg-white/10")} />
          </div>
          <div>
            <div className="font-display text-xl font-semibold uppercase tracking-[0.03em]">{data.name}</div>
            <div className="label-xs mt-1">{data.kind}</div>
          </div>
        </div>

        <ul className="space-y-0 border border-line">
          {data.traits.map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, x: rich ? 14 : -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: EASE }}
              className={cn(
                "flex items-center gap-3 border-b border-line px-4 py-3 text-[13.5px] last:border-b-0",
                rich ? "text-fg" : "text-dim"
              )}
            >
              {rich ? <Check size={12} className="shrink-0 text-ice" /> : <Dash size={12} className="shrink-0 text-dim" />}
              {t}
            </motion.li>
          ))}
        </ul>

        {canChoose && (
          <Button variant="secondary" className="mt-6 w-full" onClick={onChoose}>
            {data.name} FEELS SAFER
          </Button>
        )}
      </div>
    </div>
  );
}

export default function SellerPOV() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const [scene, setScene] = useState<Scene>("story");
  const [lines, setLines] = useState(0);
  const [choice, setChoice] = useState<"A" | "B" | null>(null);

  useEffect(() => {
    if (!inView || scene !== "story" || lines >= SELLER_STORY.length) return;
    const t = setTimeout(() => setLines((l) => l + 1), lines === 0 ? 300 : 1100);
    return () => clearTimeout(t);
  }, [inView, scene, lines]);

  const restart = () => {
    setScene("story");
    setLines(0);
    setChoice(null);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <Section>
      <div className="shell" ref={ref}>
        <SectionHeader
          index="07"
          eyebrow="SELLER POV"
          title="BECOME THE SELLER FOR 60 SECONDS."
        />

        <Reveal>
          <div className="panel relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px hair-top" />
            <div className="flex items-center justify-between border-b border-line px-4 py-3 md:px-6">
              <span className="label-xs text-fg">SELLER POV</span>
              <div className="flex items-center gap-2">
                {(["story", "compare", "verdict"] as Scene[]).map((s, i) => (
                  <span
                    key={s}
                    className={cn("h-px w-8 transition-colors duration-500", i <= ["story", "compare", "verdict"].indexOf(scene) ? "bg-ice" : "bg-line-strong")}
                  />
                ))}
                <span className="label-xs ml-2">0{["story", "compare", "verdict"].indexOf(scene) + 1} / 03</span>
              </div>
            </div>

            <div className="relative min-h-[460px] p-5 md:p-10">
              <div className="grid-bg-sm pointer-events-none absolute inset-0 opacity-40" />
              <AnimatePresence mode="wait">
                {scene === "story" && (
                  <motion.div key="story" exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="relative mx-auto max-w-2xl py-6 md:py-10">
                    <ul className="space-y-4 md:space-y-5">
                      {SELLER_STORY.map((l, i) => (
                        <motion.li
                          key={l}
                          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                          animate={i < lines ? { opacity: i === lines - 1 ? 1 : 0.55, y: 0, filter: "blur(0px)" } : {}}
                          transition={{ duration: 0.9, ease: EASE }}
                          className={cn(
                            "font-display font-medium leading-[1.15] tracking-[-0.015em]",
                            i === SELLER_STORY.length - 1 ? "text-[clamp(1.5rem,3.4vw,2.4rem)] text-fg" : "text-[clamp(1.25rem,2.6vw,1.9rem)]"
                          )}
                        >
                          {l}
                        </motion.li>
                      ))}
                    </ul>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: lines >= SELLER_STORY.length ? 1 : 0 }} transition={{ duration: 0.8 }} className="mt-10">
                      <Button size="lg" arrow disabled={lines < SELLER_STORY.length} onClick={() => setScene("compare")}>
                        CONTINUE
                      </Button>
                    </motion.div>
                  </motion.div>
                )}

                {scene !== "story" && (
                  <motion.div key="cmp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="relative">
                    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                      <BrokerPanel data={BROKER_A} rich={false} chosen={choice === "A"} dimmed={!!choice && choice !== "A"} canChoose={scene === "compare"} onChoose={() => { setChoice("A"); setScene("verdict"); }} />
                      <BrokerPanel data={BROKER_B} rich chosen={choice === "B"} dimmed={!!choice && choice !== "B"} canChoose={scene === "compare"} onChoose={() => { setChoice("B"); setScene("verdict"); }} />
                    </div>

                    <div className="mt-10 text-center">
                      <div className="label mb-3 text-ice">THE QUESTION</div>
                      <p className="display text-[clamp(1.4rem,3.2vw,2.5rem)]">
                        WHICH BROKER FEELS LIKE THE SAFER CALL?
                      </p>
                    </div>

                    {scene === "verdict" && (
                      <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: EASE }}
                        className="mx-auto mt-12 max-w-3xl border-t border-line pt-10 text-center"
                      >
                        <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-mute md:text-[17px]">
                          Both brokers may have the same 27 years of experience. Only one made it visible.
                        </p>
                        <p className="display mt-7 bg-gradient-to-r from-white via-ice to-white bg-clip-text text-[clamp(1.5rem,3.6vw,2.9rem)] text-transparent">
                          ALANTO BUILDS THE DIGITAL INFRASTRUCTURE BEHIND BROKER B.
                        </p>
                        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                          <BookButton label={CTA.seeForBusiness} size="lg" arrow />
                          <Button variant="ghost" size="lg" onClick={restart}>
                            REPLAY
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

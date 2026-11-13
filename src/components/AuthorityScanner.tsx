import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SCAN_RESULTS, SCAN_STEPS } from "../data/authority";
import { SECTION } from "../config/site";
import { EASE, cn } from "../lib/utils";
import BookButton from "./ui/BookButton";
import Button from "./ui/Button";
import DemoBadge from "./ui/DemoBadge";
import { Check } from "./ui/Icons";
import Reveal from "./ui/Reveal";
import { Section, SectionHeader } from "./ui/Section";

type Phase = "idle" | "scanning" | "done";
const STEP_MS = 1150;

const FIELDS = [
  { key: "name", label: "Name", placeholder: "Jordan Smith" },
  { key: "company", label: "Brokerage / Company", placeholder: "Smith & Co. Business Advisors" },
  { key: "market", label: "Primary Market", placeholder: "Tampa Bay, FL" },
  { key: "specialty", label: "Specialty", placeholder: "Home services businesses" },
] as const;

export default function AuthorityScanner() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (phase !== "scanning") return;
    const t = setTimeout(() => {
      if (step >= SCAN_STEPS.length - 1) setPhase("done");
      else setStep((s) => s + 1);
    }, STEP_MS);
    return () => clearTimeout(t);
  }, [phase, step]);

  const run = (e: FormEvent) => {
    e.preventDefault();
    setStep(0);
    setPhase("scanning");
  };

  const subject = [values.name, values.company].filter(Boolean).join(" · ");

  return (
    <Section id={SECTION.scanner}>
      <div className="shell">
        <SectionHeader
          index="03"
          eyebrow="AUTHORITY GAP SCANNER"
          title="DISCOVER YOUR AUTHORITY GAP."
          sub="Run a simulated scan to see how a visibility analysis is structured."
        />

        <Reveal>
          <div className="panel overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px hair-top" />
            {/* tool header */}
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <span className="label-xs text-fg">AUTHORITY SCAN</span>
                <span className="label-xs hidden text-dim sm:inline">/ PROFESSIONAL VISIBILITY ANALYSIS</span>
              </div>
              <DemoBadge>DEMO ANALYSIS</DemoBadge>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,400px)_1fr]">
              {/* form */}
              <form onSubmit={run} className="border-b border-line p-5 md:p-8 lg:border-b-0 lg:border-r">
                <div className="space-y-5">
                  {FIELDS.map((f) => (
                    <label key={f.key} className="block">
                      <span className="label-xs mb-2 block">{f.label}</span>
                      <input
                        value={values[f.key] ?? ""}
                        onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        disabled={phase === "scanning"}
                        autoComplete="off"
                        className="h-12 w-full border border-line bg-base px-4 text-[14px] text-fg outline-none transition-colors placeholder:text-dim focus:border-ice/60 disabled:opacity-50"
                      />
                    </label>
                  ))}
                </div>
                <Button type="submit" size="lg" className="mt-7 w-full" disabled={phase === "scanning"}>
                  {phase === "scanning" ? "SCANNING..." : phase === "done" ? "RUN AGAIN" : "RUN AUTHORITY SCAN"}
                </Button>
                <p className="label-xs mt-4 normal-case leading-relaxed tracking-[0.03em] text-dim">
                  Simulation only. No live search or data lookup is performed and the same sample figures
                  are shown for every input.
                </p>
              </form>

              {/* output */}
              <div className="relative min-h-[420px] p-5 md:p-8">
                <div className="grid-bg-sm pointer-events-none absolute inset-0 opacity-50" />
                <AnimatePresence mode="wait">
                  {phase === "idle" && (
                    <motion.div key="idle" exit={{ opacity: 0 }} className="relative">
                      <div className="label-xs mb-6 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 border border-mute" />
                        AWAITING SCAN
                      </div>
                      <div className="space-y-6 opacity-60">
                        {SCAN_RESULTS.map((r) => (
                          <div key={r.label}>
                            <div className="mb-2 flex justify-between">
                              <span className="label-xs">{r.label}</span>
                              <span className="label-xs text-dim">-- / 100</span>
                            </div>
                            <div className="h-[3px] bg-white/[0.05]" />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {phase === "scanning" && (
                    <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
                      <div className="label-xs mb-6 flex items-center gap-2 text-ice">
                        <span className="dot-live h-1.5 w-1.5 rounded-full bg-ice" />
                        SCAN IN PROGRESS
                      </div>
                      <ul className="space-y-4">
                        {SCAN_STEPS.map((s, i) => {
                          const done = i < step;
                          const active = i === step;
                          return (
                            <li key={s} className={cn("flex items-center gap-4 font-mono text-[12.5px] transition-opacity", done || active ? "opacity-100" : "opacity-30")}>
                              <span className={cn("grid h-5 w-5 shrink-0 place-items-center border", done ? "border-ice/60 text-ice" : active ? "border-fg/50" : "border-line")}>
                                {done ? <Check size={11} /> : active ? <span className="dot-live h-1.5 w-1.5 rounded-full bg-fg" /> : null}
                              </span>
                              <span className={active ? "text-fg" : "text-mute"}>{s}</span>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="mt-8 h-px w-full bg-line-strong">
                        <motion.div
                          className="h-px bg-ice shadow-[0_0_10px_rgba(185,217,255,0.8)]"
                          initial={{ width: 0 }}
                          animate={{ width: `${((step + 1) / SCAN_STEPS.length) * 100}%` }}
                          transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {phase === "done" && (
                    <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
                      <div className="mb-7 flex flex-wrap items-center justify-between gap-2">
                        <span className="label-xs text-fg">{subject ? `PREPARED FOR · ${subject}` : "SAMPLE PROFILE ANALYSIS"}</span>
                        <DemoBadge>DEMO ANALYSIS</DemoBadge>
                      </div>
                      <div className="space-y-6">
                        {SCAN_RESULTS.map((r, i) => (
                          <div key={r.label}>
                            <div className="mb-2 flex items-baseline justify-between">
                              <span className="label-xs text-fg/90">{r.label}</span>
                              <span className="font-display text-[22px] font-semibold tabular-nums tracking-tight">
                                {r.value}
                                <span className="ml-1 text-[12px] font-normal text-dim">/ 100</span>
                              </span>
                            </div>
                            <div className="relative h-[3px] bg-white/[0.07]">
                              <motion.div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-ice/50 to-ice shadow-[0_0_12px_rgba(185,217,255,0.5)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${r.value}%` }}
                                transition={{ duration: 1.2, delay: 0.15 + i * 0.12, ease: EASE }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8, ease: EASE }}
                        className="mt-9 border border-ice/30 bg-ice/[0.04] p-5 md:p-6"
                      >
                        <div className="label flex items-center gap-3 text-ice">
                          <span className="dot-live h-1.5 w-1.5 rounded-full bg-ice" />
                          AUTHORITY GAP DETECTED
                        </div>
                        <p className="mt-3 text-[15px] leading-relaxed text-fg/90">
                          Your visible digital authority does not yet reflect your real-world experience.
                        </p>
                        <BookButton label="SEE WHAT ALANTO WOULD BUILD" arrow className="mt-5 w-full sm:w-auto" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

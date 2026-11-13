import { SECTION } from "../config/site";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DEFAULT_QUESTION, SUGGESTED_QUESTIONS, buildOutputs, type OutputAsset, type OutputType } from "../data/outputs";
import { EASE, cn } from "../lib/utils";
import Button from "./ui/Button";
import { ArrowUpRight } from "./ui/Icons";
import Modal from "./ui/Modal";
import OutputPreview from "./OutputPreview";
import DemoBadge from "./ui/DemoBadge";
import Reveal from "./ui/Reveal";
import { Section, SectionHeader } from "./ui/Section";

type Phase = "idle" | "routing" | "generating" | "done";

function Glyph({ type }: { type: OutputType }) {
  const s = "rgba(255,255,255,0.45)";
  const a = "#B9D9FF";
  return (
    <svg width="56" height="34" viewBox="0 0 56 34" fill="none" aria-hidden>
      {type === "video" && (
        <>
          <rect x=".5" y=".5" width="55" height="33" stroke={s} />
          <path d="M23 10l12 7-12 7z" stroke={a} />
        </>
      )}
      {type === "youtube" && (
        <>
          <rect x=".5" y="3.5" width="55" height="27" rx="6" stroke={s} />
          <path d="M23 11l11 6-11 6z" stroke={a} />
        </>
      )}
      {type === "article" && (
        <>
          <rect x=".5" y=".5" width="55" height="12" stroke={a} strokeOpacity=".6" />
          <path d="M0 20h56M0 26h40M0 32h48" stroke={s} />
        </>
      )}
      {type === "linkedin" && (
        <>
          <circle cx="9" cy="9" r="8" stroke={a} strokeOpacity=".7" />
          <path d="M24 5h30M24 12h22M0 24h56M0 31h38" stroke={s} />
        </>
      )}
      {type === "faq" && (
        <>
          <path d="M0 4h8M14 4h40M0 17h8M14 17h30M0 30h8M14 30h36" stroke={s} />
          <path d="M0 4h8M0 17h8M0 30h8" stroke={a} />
        </>
      )}
      {type === "website" && (
        <>
          <rect x=".5" y=".5" width="55" height="33" stroke={s} />
          <path d="M0 8h56" stroke={s} />
          <rect x="6" y="14" width="26" height="14" stroke={a} strokeOpacity=".6" />
          <path d="M38 15h12M38 20h12M38 25h8" stroke={s} />
        </>
      )}
    </svg>
  );
}

function Connector({ active }: { active: boolean }) {
  return (
    <>
      <div className="relative hidden h-px w-full bg-line-strong lg:block">
        {active && <span className="scan-bar absolute inset-y-0 left-0 block h-px w-1/4 bg-ice shadow-[0_0_10px_rgba(185,217,255,0.9)]" />}
      </div>
      <div className="relative mx-auto h-12 w-px bg-line-strong lg:hidden">
        {active && <span className="drop-v absolute left-1/2 h-2 w-px -translate-x-1/2 bg-ice shadow-[0_0_10px_rgba(185,217,255,0.9)]" />}
      </div>
    </>
  );
}

export default function AuthorityOutput() {
  const [question, setQuestion] = useState(DEFAULT_QUESTION);
  const [phase, setPhase] = useState<Phase>("idle");
  const [count, setCount] = useState(0);
  const [asked, setAsked] = useState(DEFAULT_QUESTION);
  const [open, setOpen] = useState<OutputAsset | null>(null);

  const outputs = useMemo(() => buildOutputs(asked), [asked]);

  useEffect(() => {
    if (phase === "routing") {
      const t = setTimeout(() => {
        setCount(0);
        setPhase("generating");
      }, 1700);
      return () => clearTimeout(t);
    }
    if (phase === "generating") {
      if (count >= outputs.length) {
        setPhase("done");
        return;
      }
      const t = setTimeout(() => setCount((c) => c + 1), 380);
      return () => clearTimeout(t);
    }
  }, [phase, count, outputs.length]);

  const run = () => {
    setAsked(question.trim() || DEFAULT_QUESTION);
    setCount(0);
    setPhase("routing");
  };
  const busy = phase === "routing" || phase === "generating";

  return (
    <Section id={SECTION.example}>
      <div className="shell">
        <SectionHeader
          eyebrow="SEE AN EXAMPLE"
          title={
            <>
              ONE SELLER QUESTION.
              <br />
              SIX PIECES OF CONTENT.
            </>
          }
          sub="Pick a question a seller might ask and see what we would create from it."
        />

        <Reveal>
          <div className="panel overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px hair-top" />
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 md:px-6">
              <span className="label-xs text-fg">EXAMPLE</span>
              <DemoBadge>SIMULATION</DemoBadge>
            </div>

            <div className="grid items-center gap-y-0 p-5 md:p-8 lg:grid-cols-[minmax(0,330px)_minmax(80px,1fr)_auto_minmax(80px,0.6fr)_minmax(0,1.9fr)] lg:gap-x-0">
              {/* input */}
              <div>
                <label htmlFor="seller-q" className="label-xs mb-2 block text-fg">A SELLER'S QUESTION</label>
                <textarea
                  id="seller-q"
                  rows={3}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={busy}
                  className="w-full resize-none border border-line bg-base p-4 text-[15px] leading-relaxed text-fg outline-none transition-colors focus:border-ice/60 disabled:opacity-60"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      disabled={busy}
                      onClick={() => setQuestion(q)}
                      className={cn(
                        "border px-2.5 py-1.5 text-left text-[11.5px] leading-snug transition-colors disabled:opacity-50",
                        q === question ? "border-ice/40 text-fg" : "border-line text-mute hover:border-line-strong hover:text-fg"
                      )}
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <Button size="lg" arrow className="mt-5 w-full" onClick={run} disabled={busy}>
                  {busy ? "WORKING..." : phase === "done" ? "TRY AGAIN" : "SHOW ME"}
                </Button>
              </div>

              <Connector active={phase === "routing"} />

              {/* twin node */}
              <div className="my-1 flex flex-col items-center gap-3 py-2 lg:my-0">
                <div className="relative grid h-24 w-24 place-items-center">
                  {busy && <span className="absolute inset-0 animate-[ping-ring_2.4s_ease-out_infinite] rounded-full border border-ice/60" />}
                  <span className="absolute inset-0 rounded-full border border-line-strong" />
                  <span className="absolute inset-2 rounded-full border border-dashed border-ice/30 [animation:spin-slow_30s_linear_infinite]" />
                  <span className="absolute inset-5 rounded-full border border-line-strong bg-r2" />
                  <span className={cn("relative h-2 w-2 rounded-full", busy ? "bg-white shadow-[0_0_14px_#fff]" : "bg-ice dot-live")} />
                </div>
                <div className="text-center">
                  <div className="label-xs text-fg">ALANTO</div>
                  <div className="label-xs">DIGITAL TWIN</div>
                  <div className={cn("label-xs mt-1.5", busy ? "text-ice" : "text-dim")}>
                    {phase === "routing" ? "READING QUESTION" : phase === "generating" ? "COMPOSING ASSETS" : phase === "done" ? "COMPLETE" : "IDLE"}
                  </div>
                </div>
              </div>

              <Connector active={phase === "generating"} />

              {/* outputs */}
              <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {outputs.map((o, i) => {
                  const shown = phase === "done" || (phase === "generating" && i < count);
                  return shown ? (
                    <motion.button
                      key={o.type + asked}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      onClick={() => setOpen(o)}
                      className="group relative flex min-h-[168px] flex-col border border-line-strong bg-r2 p-4 text-left transition-colors hover:border-ice/50 hover:bg-r3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <Glyph type={o.type} />
                        <ArrowUpRight className="text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ice" />
                      </div>
                      <div className="label-xs mt-4 text-ice/80">{o.label}</div>
                      <div className="mt-1.5 line-clamp-3 text-[13.5px] font-medium leading-snug text-fg">{o.title}</div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <span className="label-xs text-dim">{o.meta}</span>
                        <span className="label-xs opacity-0 transition-opacity group-hover:opacity-100">PREVIEW</span>
                      </div>
                    </motion.button>
                  ) : (
                    <div
                      key={o.type + "ph"}
                      className="relative flex min-h-[168px] flex-col justify-between border border-dashed border-line p-4"
                    >
                      <Glyph type={o.type} />
                      <div>
                        <div className="label-xs text-dim">{o.label}</div>
                        <div className="label-xs mt-1 text-dim/70">{phase === "idle" ? "AWAITING QUESTION" : "QUEUED"}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <Modal
          open={!!open}
          onClose={() => setOpen(null)}
          title={open?.label ?? ""}
          eyebrow="EXAMPLE CONTENT · PREVIEW"
          size="lg"
        >
          {open && <OutputPreview asset={open} />}
        </Modal>
      </div>
    </Section>
  );
}

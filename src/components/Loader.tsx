import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STAGES = [
  { at: 0, title: "Reading Richard’s identity", sub: "Voice, posture, cadence, conviction." },
  { at: 5, title: "Mapping 20 years of expertise", sub: "Finance. Operations. Sales. Leadership." },
  { at: 10, title: "Building the office avatar", sub: "Authority. Education. Presence." },
  { at: 16, title: "Building the conversational avatar", sub: "Stories, insights, direct talk." },
  { at: 22, title: "Composing premium image posts", sub: "Real positioning. Zero generic graphics." },
  { at: 26, title: "Compiling the script engine", sub: "Hooks, objections, ROI, transitions." },
];

const DURATION = 30;

export default function Loader({ onDone }: { onDone: () => void }) {
  const [elapsed, setElapsed] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(DURATION, (now - start) / 1000);
      setElapsed(t);
      if (t < DURATION) raf = requestAnimationFrame(tick);
      else onDoneRef.current();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pct = Math.min(100, (elapsed / DURATION) * 100);
  const stage = useMemo(() => {
    let current = STAGES[0];
    for (const s of STAGES) if (elapsed >= s.at) current = s;
    return current;
  }, [elapsed]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#120c09] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,125,62,0.22),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center px-6 text-center">
        <div className="relative h-44 w-44">
          <span className="ring-pulse absolute inset-0 rounded-full border border-ember-400/50" />
          <span
            className="ring-pulse absolute inset-0 rounded-full border border-gold-300/40"
            style={{ animationDelay: "0.7s" }}
          />
          <div className="absolute inset-3 overflow-hidden rounded-full border border-white/15 shadow-gold">
            <img src="/richard/office.jpg" alt="" className="h-full w-full object-cover object-top" />
            <div className="scan-line pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ember-400/0 via-ember-400/40 to-ember-400/0" />
          </div>
        </div>

        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.35em] text-ember-300">
          Alanto system · compiling
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-4"
          >
            <h2 className="font-display text-3xl italic text-white sm:text-4xl">{stage.title}</h2>
            <p className="mt-2 text-sm text-white/50">{stage.sub}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 w-full">
          <div className="mb-2 flex justify-between text-[11px] uppercase tracking-[0.2em] text-white/40">
            <span>Generating alter ego</span>
            <span>{Math.round(pct)}%</span>
          </div>
          <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-ember-400 via-gold-300 to-ember-400"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-white/30">
            {Math.max(0, Math.ceil(DURATION - elapsed))}s remaining
          </p>
        </div>
      </div>
    </motion.div>
  );
}

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ENGINE_FEED, ENGINE_NODES, ENGINE_STATS } from "../data/authority";
import { SECTION } from "../config/site";
import DemoBadge from "./ui/DemoBadge";
import Reveal from "./ui/Reveal";
import { Section, SectionHeader } from "./ui/Section";
import SignalNetwork from "./ui/SignalNetwork";

export default function AuthorityEngine() {
  const [feed, setFeed] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFeed((f) => (f + 1) % ENGINE_FEED.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <Section id={SECTION.engine} tone="raised" className="overflow-hidden">
      <div className="shell">
        <SectionHeader
          index="08"
          eyebrow="AUTHORITY ENGINE"
          title={
            <>
              YOUR EXPERTISE DOESN'T GET POSTED ONCE.
              <br />
              <span className="text-silver">IT COMPOUNDS.</span>
            </>
          }
        />

        <Reveal y={30}>
          <div className="grid gap-px border border-line bg-line lg:grid-cols-[1fr_300px]">
            {/* visualization */}
            <div className="relative bg-base p-4 md:p-8">
              <div className="grid-bg-sm pointer-events-none absolute inset-0 opacity-50" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(185,217,255,0.06),transparent_65%)]" />
              <div className="relative">
                <SignalNetwork nodes={ENGINE_NODES} offset={-10} rx={470} ry={226} labelSize={13} />
              </div>
            </div>

            {/* system panel */}
            <aside className="flex flex-col bg-r1 p-5 md:p-7">
              <div className="mb-6 flex items-center justify-between gap-2">
                <span className="label-xs text-fg">AUTHORITY ENGINE</span>
              </div>

              <div className="border border-ice/25 bg-ice/[0.04] px-4 py-3.5">
                <div className="label-xs">STATUS</div>
                <div className="mt-2 flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.22em] text-ice">
                  <span className="dot-live h-2 w-2 rounded-full bg-ice shadow-[0_0_10px_rgba(185,217,255,0.9)]" />
                  ACTIVE
                </div>
              </div>

              <dl className="mt-5 divide-y divide-line border-y border-line">
                {ENGINE_STATS.map((s) => (
                  <div key={s.label} className="flex items-end justify-between py-4">
                    <dt className="label-xs max-w-[130px] leading-relaxed">{s.label}</dt>
                    <dd className="font-display text-[44px] font-semibold leading-none tracking-[-0.04em]">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 min-h-[60px] flex-1">
                <div className="label-xs mb-2 text-dim">EXAMPLE ACTIVITY</div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={feed}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-start gap-2 font-mono text-[11.5px] leading-relaxed text-mute"
                  >
                    <span className="mt-[7px] h-px w-3 shrink-0 bg-ice" />
                    {ENGINE_FEED[feed]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 space-y-2 border-t border-line pt-4">
                <DemoBadge>EXAMPLE ENVIRONMENT</DemoBadge>
                <p className="label-xs normal-case leading-relaxed tracking-[0.03em] text-dim">
                  Demonstration figures. Not real customer metrics.
                </p>
              </div>
            </aside>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

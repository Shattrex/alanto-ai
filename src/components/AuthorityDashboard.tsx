import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AUTHORITY_AXES,
  AUTHORITY_BEFORE,
  AUTHORITY_NOW,
  CONTENT_BARS,
  CONTENT_QUEUE,
  COVERAGE,
  DASH_TABS,
  HEATMAP,
  HEATMAP_COLS,
  HEATMAP_ROWS,
  KPIS,
  MONTHS,
  OPPORTUNITIES,
  SEARCH_SERIES,
  SEARCH_TOPICS,
  SURFACE_BARS,
  VISIBILITY_SERIES,
  type DashTab,
} from "../data/metrics";
import { cn } from "../lib/utils";
import { AreaChart, ColumnChart, ColumnLabels, Donut, HBars, Heatmap, Radar, Sparkline } from "./charts/Charts";
import AlantoLogo from "./AlantoLogo";
import DemoBadge from "./ui/DemoBadge";
import Reveal from "./ui/Reveal";
import { Section, SectionHeader } from "./ui/Section";

function Card({ title, children, className, right }: { title: string; children: ReactNode; className?: string; right?: ReactNode }) {
  return (
    <div className={cn("border border-line bg-r1 p-5", className)}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="label-xs text-fg/90">{title}</span>
        {right ?? <DemoBadge className="scale-90 origin-right" />}
      </div>
      {children}
    </div>
  );
}

const Legend = ({ items }: { items: { name: string; tone: "ice" | "silver" }[] }) => (
  <div className="mb-3 flex flex-wrap gap-5">
    {items.map((s) => (
      <span key={s.name} className="label-xs flex items-center gap-2">
        <span className="h-px w-5" style={{ background: s.tone === "ice" ? "#B9D9FF" : "#8F9097" }} />
        {s.name}
      </span>
    ))}
  </div>
);

function TabBody({ tab }: { tab: DashTab }) {
  switch (tab) {
    case "OVERVIEW":
      return (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card title="VISIBILITY TREND · 12 MONTHS" className="lg:col-span-2">
            <Legend items={VISIBILITY_SERIES} />
            <AreaChart series={VISIBILITY_SERIES} labels={MONTHS} />
          </Card>
          <Card title="KNOWLEDGE COVERAGE">
            <Donut data={COVERAGE} centerValue="64%" centerLabel="COVERED" />
          </Card>
          <Card title="VISIBILITY BY SURFACE" className="lg:col-span-3">
            <div className="grid gap-x-12 gap-y-3.5 sm:grid-cols-2">
              <HBars data={SURFACE_BARS.slice(0, 3)} />
              <HBars data={SURFACE_BARS.slice(3)} />
            </div>
          </Card>
        </div>
      );
    case "SEARCH":
      return (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card title="QUERY VOLUME TREND" className="lg:col-span-2">
            <Legend items={SEARCH_SERIES} />
            <AreaChart series={SEARCH_SERIES} labels={MONTHS} />
          </Card>
          <Card title="TRACKED TOPICS · VISIBILITY">
            <HBars data={SEARCH_TOPICS.map((t) => ({ label: t.topic, value: t.vis }))} />
          </Card>
        </div>
      );
    case "AUTHORITY":
      return (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="AUTHORITY PROFILE">
            <div className="mb-2 flex gap-5">
              <span className="label-xs flex items-center gap-2"><span className="h-px w-5 bg-ice" />AFTER</span>
              <span className="label-xs flex items-center gap-2"><span className="h-px w-5 border-t border-dashed border-mute" />BEFORE</span>
            </div>
            <Radar axes={AUTHORITY_AXES} now={AUTHORITY_NOW} before={AUTHORITY_BEFORE} />
          </Card>
          <Card title="COVERAGE · TOPIC × SURFACE">
            <Heatmap rows={HEATMAP_ROWS} cols={HEATMAP_COLS} values={HEATMAP} />
          </Card>
        </div>
      );
    case "CONTENT":
      return (
        <div className="grid gap-4 lg:grid-cols-5">
          <Card title="AUTHORITY ASSETS BY TYPE" className="lg:col-span-3">
            <ColumnChart data={CONTENT_BARS} />
            <ColumnLabels data={CONTENT_BARS} />
          </Card>
          <Card title="PRODUCTION QUEUE" className="lg:col-span-2">
            <ul className="divide-y divide-line">
              {CONTENT_QUEUE.map((q) => (
                <li key={q.title} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <div className="truncate text-[13px] text-fg/90">{q.title}</div>
                    <div className="label-xs mt-0.5 text-dim">{q.type}</div>
                  </div>
                  <span className={cn("label-xs shrink-0 border px-2 py-1", q.status === "PUBLISHED" ? "border-ice/30 text-ice" : "border-line")}>
                    {q.status}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      );
    case "OPPORTUNITIES":
      return (
        <Card title="TOPIC OPPORTUNITIES · RANKED">
          <ul className="divide-y divide-line">
            {OPPORTUNITIES.map((o, i) => (
              <li key={o.topic} className="grid items-center gap-x-6 gap-y-2 py-4 sm:grid-cols-[28px_1.4fr_1fr_70px]">
                <span className="label-xs text-dim">0{i + 1}</span>
                <div>
                  <div className="text-[14px] text-fg">{o.topic}</div>
                  <div className="label-xs mt-1 normal-case tracking-[0.03em] text-dim">{o.note}</div>
                </div>
                <div className="relative h-[3px] bg-white/[0.07]">
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-ice/40 to-ice"
                    initial={{ width: 0 }}
                    animate={{ width: `${o.score}%` }}
                    transition={{ duration: 1, delay: i * 0.08 }}
                  />
                </div>
                <span className="font-display text-xl font-semibold tabular-nums sm:text-right">{o.score}</span>
              </li>
            ))}
          </ul>
        </Card>
      );
  }
}

export default function AuthorityDashboard() {
  const [tab, setTab] = useState<DashTab>("OVERVIEW");

  return (
    <Section>
      <div className="shell">
        <SectionHeader
          index="11"
          eyebrow="MEASUREMENT"
          title="MARKET AUTHORITY"
          sub="What performance visibility looks like inside an engagement. Every figure on this page is example data."
        />

        <Reveal y={36}>
          <div className="relative border border-line-strong bg-base shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
            <div className="absolute inset-x-0 top-0 h-px hair-top" />

            {/* app bar */}
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line px-4 py-3 md:px-5">
              <div className="flex items-center gap-3">
                <AlantoLogo variant="symbol" height={16} />
                <span className="h-3 w-px bg-line-strong" />
                <span className="label-xs text-fg">MARKET AUTHORITY</span>
              </div>
              <DemoBadge>DEMO DATA</DemoBadge>
            </div>

            {/* tabs */}
            <div className="-mb-px flex overflow-x-auto border-b border-line px-2 md:px-4 [&::-webkit-scrollbar]:hidden" role="tablist">
              {DASH_TABS.map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "relative shrink-0 px-4 py-3.5 font-mono text-[10.5px] uppercase tracking-[0.2em] transition-colors md:px-5",
                    tab === t ? "text-fg" : "text-mute hover:text-fg"
                  )}
                >
                  {t}
                  {tab === t && <motion.span layoutId="dash-tab" className="absolute inset-x-0 -bottom-px h-px bg-ice" />}
                </button>
              ))}
            </div>

            <div className="p-4 md:p-6">
              {/* KPIs */}
              <div className="mb-4 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-6">
                {KPIS.map((k) => (
                  <div key={k.label} className="relative bg-r1 p-4">
                    <div className="label-xs leading-snug">{k.label}</div>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="font-display text-[28px] font-semibold leading-none tracking-[-0.03em]">{k.value}</span>
                      <span className="text-[12px] text-dim">{k.unit}</span>
                    </div>
                    <div className="mt-1 font-mono text-[10px] text-ice">{k.delta}</div>
                    <Sparkline data={k.series} className="mt-3 h-7 w-full" />
                    <div className="mt-2 font-mono text-[8.5px] uppercase tracking-[0.2em] text-dim">DEMO DATA</div>
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <TabBody tab={tab} />
                </motion.div>
              </AnimatePresence>

              <p className="label-xs mt-5 normal-case tracking-[0.03em] text-dim">
                LIVE METRICS CONNECT HERE. Demo data shown. Not a customer result.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

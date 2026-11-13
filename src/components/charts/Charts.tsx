import { useId } from "react";
import { motion } from "framer-motion";
import { EASE } from "../../lib/utils";

const ICE = "#B9D9FF";
const SILVER = "#8F9097";
const tone = { ice: ICE, silver: SILVER };

/** Smooth path through points (Catmull-Rom → Bezier). */
function smooth(pts: [number, number][]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

/* ------------------------------- Sparkline ------------------------------- */
export function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const w = 120;
  const h = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - 3 - ((v - min) / (max - min || 1)) * (h - 6)] as [number, number]);
  const d = smooth(pts);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none" aria-hidden>
      <motion.path d={d} fill="none" stroke={ICE} strokeWidth="1.4" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: EASE }} />
    </svg>
  );
}

/* ------------------------------- Area chart ------------------------------- */
interface Series {
  name: string;
  data: number[];
  tone: keyof typeof tone;
}

export function AreaChart({ series, labels }: { series: Series[]; labels: string[] }) {
  const uid = useId().replace(/:/g, "");
  const W = 640;
  const H = 240;
  const padL = 34;
  const padB = 26;
  const padT = 12;
  const max = Math.ceil(Math.max(...series.flatMap((s) => s.data)) / 20) * 20;
  const x = (i: number) => padL + (i / (labels.length - 1)) * (W - padL - 8);
  const y = (v: number) => padT + (1 - v / max) * (H - padT - padB);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Trend chart (demo data)">
      <defs>
        {series.map((s, i) => (
          <linearGradient key={i} id={`${uid}a${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tone[s.tone]} stopOpacity={i === 0 ? 0.28 : 0.1} />
            <stop offset="100%" stopColor={tone[s.tone]} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <g key={t}>
          <line x1={padL} x2={W - 8} y1={y(max * t)} y2={y(max * t)} stroke="rgba(255,255,255,0.06)" />
          <text x={padL - 8} y={y(max * t) + 3} textAnchor="end" fontSize="9" fill="#5C5D64" className="font-mono">
            {Math.round(max * t)}
          </text>
        </g>
      ))}
      {labels.map((l, i) => (
        <text key={i} x={x(i)} y={H - 6} textAnchor="middle" fontSize="9" fill="#5C5D64" className="font-mono">
          {l}
        </text>
      ))}
      {series.map((s, i) => {
        const pts = s.data.map((v, j) => [x(j), y(v)] as [number, number]);
        const line = smooth(pts);
        const area = `${line} L${x(s.data.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z`;
        return (
          <g key={s.name}>
            <motion.path d={area} fill={`url(#${uid}a${i})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.4 }} />
            <motion.path
              d={line}
              fill="none"
              stroke={tone[s.tone]}
              strokeWidth={i === 0 ? 1.8 : 1.3}
              strokeDasharray={i === 0 ? undefined : "4 4"}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: EASE }}
              style={i === 0 ? { filter: "drop-shadow(0 0 5px rgba(185,217,255,0.5))" } : undefined}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* -------------------------------- Bar chart -------------------------------- */
export function HBars({ data }: { data: { label: string; value: number }[] }) {
  return (
    <ul className="space-y-3.5">
      {data.map((d, i) => (
        <li key={d.label}>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-[13px] text-fg/85">{d.label}</span>
            <span className="label-xs tabular-nums">{d.value}</span>
          </div>
          <div className="relative h-[3px] bg-white/[0.07]">
            <motion.span
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-ice/40 to-ice"
              initial={{ width: 0 }}
              animate={{ width: `${d.value}%` }}
              transition={{ duration: 1.1, delay: i * 0.07, ease: EASE }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ColumnChart({ data }: { data: { label: string; value: number }[] }) {
  const H = 170;
  const max = Math.max(...data.map((d) => d.value)) * 1.15;
  return (
    <div className="flex h-[210px] items-end gap-3 border-b border-line px-1 pb-0">
      {data.map((d, i) => (
        <div key={d.label} className="flex h-full flex-1 flex-col justify-end">
          <span className="label-xs mb-2 text-center tabular-nums text-fg/80">{d.value}</span>
          <motion.div
            className="w-full border border-ice/30 bg-gradient-to-t from-ice/5 to-ice/35"
            initial={{ height: 0 }}
            animate={{ height: (d.value / max) * H }}
            transition={{ duration: 1, delay: i * 0.08, ease: EASE }}
          />
        </div>
      ))}
    </div>
  );
}

export function ColumnLabels({ data }: { data: { label: string }[] }) {
  return (
    <div className="mt-2 flex gap-3 px-1">
      {data.map((d) => (
        <span key={d.label} className="label-xs flex-1 text-center">
          {d.label}
        </span>
      ))}
    </div>
  );
}

/* --------------------------------- Donut --------------------------------- */
export function Donut({ data, centerLabel, centerValue }: { data: { label: string; value: number }[]; centerLabel: string; centerValue: string }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const R = 52;
  const C = 2 * Math.PI * R;
  let acc = 0;
  const shades = ["#F4F4F2", "#B9D9FF", "#8F9097", "#5C5D64", "#33343A"];
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 140 140" className="h-[150px] w-[150px] shrink-0 -rotate-90" role="img" aria-label="Distribution (demo data)">
        <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
        {data.map((d, i) => {
          const len = (d.value / total) * C;
          const off = (acc / total) * C;
          acc += d.value;
          return (
            <motion.circle
              key={d.label}
              cx="70"
              cy="70"
              r={R}
              fill="none"
              stroke={shades[i % shades.length]}
              strokeWidth="14"
              strokeDasharray={`${Math.max(len - 2, 0)} ${C}`}
              strokeDashoffset={-off}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 * i, duration: 0.8 }}
            />
          );
        })}
        <g transform="rotate(90 70 70)">
          <text x="70" y="72" textAnchor="middle" fontSize="22" fontWeight="600" fill="#F4F4F2" className="font-display">
            {centerValue}
          </text>
          <text x="70" y="86" textAnchor="middle" fontSize="6.5" fill="#8F9097" letterSpacing="1.6" className="font-mono">
            {centerLabel}
          </text>
        </g>
      </svg>
      <ul className="space-y-2">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2.5 text-[12.5px] text-mute">
            <span className="h-2 w-2" style={{ background: shades[i % shades.length] }} />
            {d.label}
            <span className="label-xs ml-1 tabular-nums">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------- Radar --------------------------------- */
export function Radar({ axes, now, before }: { axes: string[]; now: number[]; before: number[] }) {
  const cx = 150;
  const cy = 130;
  const R = 90;
  const n = axes.length;
  const pt = (i: number, v: number) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    return `${(cx + Math.cos(a) * R * (v / 100)).toFixed(1)},${(cy + Math.sin(a) * R * (v / 100)).toFixed(1)}`;
  };
  const poly = (vals: number[]) => vals.map((v, i) => pt(i, v)).join(" ");
  return (
    <svg viewBox="0 0 300 260" className="mx-auto h-auto w-full max-w-[380px]" role="img" aria-label="Authority profile (demo data)">
      {[25, 50, 75, 100].map((r) => (
        <polygon key={r} points={axes.map((_, i) => pt(i, r)).join(" ")} fill="none" stroke="rgba(255,255,255,0.07)" />
      ))}
      {axes.map((a, i) => {
        const [x, y] = pt(i, 100).split(",").map(Number);
        const [lx, ly] = pt(i, 122).split(",").map(Number);
        return (
          <g key={a}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.07)" />
            <text x={lx} y={ly + 3} textAnchor="middle" fontSize="8" fill="#8F9097" letterSpacing="1.2" className="font-mono">
              {a.toUpperCase()}
            </text>
          </g>
        );
      })}
      <polygon points={poly(before)} fill="rgba(143,144,151,0.10)" stroke="#8F9097" strokeDasharray="3 3" />
      <motion.polygon
        points={poly(now)}
        fill="rgba(185,217,255,0.16)"
        stroke={ICE}
        strokeWidth="1.6"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
        style={{ transformOrigin: `${cx}px ${cy}px`, filter: "drop-shadow(0 0 6px rgba(185,217,255,0.4))" }}
      />
    </svg>
  );
}

/* -------------------------------- Heatmap -------------------------------- */
export function Heatmap({ rows, cols, values }: { rows: string[]; cols: string[]; values: number[][] }) {
  return (
    <div>
      <div className="mb-2 grid gap-1.5" style={{ gridTemplateColumns: `90px repeat(${cols.length}, 1fr)` }}>
        <span />
        {cols.map((c) => (
          <span key={c} className="label-xs text-center text-[9px]">
            {c}
          </span>
        ))}
      </div>
      <div className="space-y-1.5">
        {rows.map((r, ri) => (
          <div key={r} className="grid items-center gap-1.5" style={{ gridTemplateColumns: `90px repeat(${cols.length}, 1fr)` }}>
            <span className="label-xs text-[9.5px]">{r}</span>
            {values[ri].map((v, ci) => (
              <motion.span
                key={ci}
                className="block h-8 border border-line"
                style={{ background: `rgba(185,217,255,${0.06 + v * 0.55})` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (ri + ci) * 0.05 }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

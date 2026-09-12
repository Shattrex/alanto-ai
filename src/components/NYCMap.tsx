import { useEffect, useMemo, useRef } from "react";
import { SELLERS } from "../content";

type Pos = { x: number; y: number };
type Side = "left" | "right" | "top" | "bottom" | "none";

/** Where each seller parks once the Alter Ego is live, and which way its
 *  talk tile opens. Fixed slots keep the tiles from ever overlapping. */
const AFTER_SLOTS: { pos: Pos; tile: Side }[] = [
  { pos: { x: 30, y: 24 }, tile: "left" },
  { pos: { x: 70, y: 24 }, tile: "right" },
  { pos: { x: 30, y: 60 }, tile: "left" },
  { pos: { x: 70, y: 60 }, tile: "right" },
  { pos: { x: 50, y: 15 }, tile: "top" },
  { pos: { x: 50, y: 68 }, tile: "bottom" },
  { pos: { x: 39, y: 42 }, tile: "none" },
  { pos: { x: 61, y: 42 }, tile: "none" },
];

export default function NYCMap({ after }: { after: boolean }) {
  const layer = useRef<HTMLDivElement>(null);
  const sellers = useMemo(
    () =>
      SELLERS.map((s, i) => ({
        ...s,
        angle: (i / SELLERS.length) * Math.PI * 2,
        radius: 36 + (i % 3) * 5,
        speed: 0.16 + (i % 4) * 0.045,
        slot: AFTER_SLOTS[i] ?? { pos: { x: 50, y: 50 }, tile: "none" as Side },
      })),
    []
  );

  useEffect(() => {
    const el = layer.current;
    if (!el) return;
    const nodes = [...el.querySelectorAll<HTMLElement>("[data-seller]")];
    let raf = 0;
    let t = 0;
    const tick = () => {
      t += 0.016;
      nodes.forEach((node, i) => {
        const s = sellers[i];
        if (!s) return;
        const target = after
          ? s.slot.pos
          : polar(50, 50, s.angle + t * s.speed, s.radius + Math.sin(t * 1.35 + i) * 2.4);
        const cx = Number(node.dataset.x ?? target.x);
        const cy = Number(node.dataset.y ?? target.y);
        const ease = after ? 0.035 : 0.14;
        const nx = cx + (target.x - cx) * ease;
        const ny = cy + (target.y - cy) * ease;
        node.dataset.x = String(nx);
        node.dataset.y = String(ny);
        node.style.left = `${nx}%`;
        node.style.top = `${ny}%`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [after, sellers]);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#071018] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/80">
          <Pin />
          New York, NY · Manhattan
        </div>
        <div className="flex gap-1.5 text-[10px] font-semibold uppercase tracking-wider">
          <span className="rounded-md bg-ember-400 px-2 py-1 text-white">3D</span>
          <span className="rounded-md bg-white/10 px-2 py-1 text-white/50">Satellite</span>
        </div>
      </div>

      <div className="relative h-[560px] overflow-hidden sm:h-[620px]">
        <ManhattanArt />

        <div className="absolute left-4 top-4 z-30 rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
          {after ? "Sellers moving to Richard" : "Sellers in market — not converting"}
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="reveal-pop relative">
            <span className="ring-pulse absolute -inset-4 rounded-full border border-gold-300/80" />
            <span className="absolute -inset-10 rounded-full bg-ember-400/25 blur-2xl" />
            <div className="relative h-[88px] w-[88px] overflow-hidden rounded-full border-[3px] border-gold-300 shadow-gold">
              <img
                src="/richard/office.jpg"
                alt="Richard Morgin"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <p className="relative mt-2 whitespace-nowrap text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gold-200">
              Richard
            </p>
          </div>
        </div>

        <div ref={layer} className="absolute inset-0 z-10">
          {sellers.map((s, i) => (
            <div
              key={s.id}
              data-seller
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: "50%", top: "50%" }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/85 text-[11px] font-bold text-white shadow-lg transition-transform"
                style={{ background: s.color, transform: after ? "scale(1.08)" : "none" }}
              >
                {s.name[0]}
              </div>
              {after && s.slot.tile !== "none" && (
                <TalkTile name={s.name} quote={s.quote} side={s.slot.tile} index={i} />
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-5 left-1/2 z-30 w-[min(92%,420px)] -translate-x-1/2 rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-center text-xs text-white/70 backdrop-blur">
          {after
            ? "Same city. Same man. He is now the conversation — so they come to him."
            : "Sellers are circling New York. They see the industry — they never reach Richard."}
        </div>
      </div>
    </div>
  );
}

function TalkTile({
  name,
  quote,
  side,
  index,
}: {
  name: string;
  quote: string;
  side: Exclude<Side, "none">;
  index: number;
}) {
  // Outer wrapper owns the positioning transform so the reveal animation
  // (which also drives transform) can never fight the centering.
  const place = {
    left: "sm:left-auto sm:right-[46px] sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 sm:bottom-auto",
    right: "sm:right-auto sm:left-[46px] sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 sm:bottom-auto",
    top: "sm:left-1/2 sm:-translate-x-1/2 sm:bottom-[46px] sm:top-auto sm:translate-y-0",
    bottom: "sm:left-1/2 sm:-translate-x-1/2 sm:top-[46px] sm:bottom-auto sm:translate-y-0",
  }[side];

  // The map is far narrower on phones, so only two tiles show there and they
  // point inward instead of off the edge.
  const mobilePlace =
    side === "left"
      ? "left-[46px] top-1/2 -translate-y-1/2"
      : "right-[46px] top-1/2 -translate-y-1/2";
  const mobileHidden = index === 0 || index === 3 ? "" : "hidden sm:block";

  return (
    <div
      className={`absolute z-40 w-[150px] sm:w-[172px] ${mobilePlace} ${place} ${mobileHidden}`}
    >
      <div
        className="reveal rounded-xl border border-white/15 bg-[#1a140f]/95 px-3 py-2 text-left text-[11px] leading-snug text-white/90 shadow-xl backdrop-blur"
        style={{ animationDelay: `${0.5 + index * 0.22}s` }}
      >
        <p className="text-[9px] font-semibold uppercase tracking-wider text-gold-300">{name}</p>
        <p className="mt-0.5">“{quote}”</p>
      </div>
    </div>
  );
}

function polar(cx: number, cy: number, angle: number, r: number): Pos {
  return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r * 0.7 };
}

function ManhattanArt() {
  return (
    <svg
      viewBox="0 0 900 640"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="water" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a1c2e" />
          <stop offset="100%" stopColor="#061018" />
        </linearGradient>
        <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e3145" />
          <stop offset="100%" stopColor="#121c28" />
        </linearGradient>
      </defs>
      <rect width="900" height="640" fill="url(#water)" />
      <ellipse cx="120" cy="560" rx="260" ry="90" fill="#0d2438" opacity="0.75" />
      <ellipse cx="800" cy="110" rx="200" ry="100" fill="#0d2438" opacity="0.65" />

      <g transform="translate(190,30) skewY(-8)">
        <path
          d="M95 15 L215 5 L258 70 L292 525 L42 552 L16 88 Z"
          fill="url(#land)"
          stroke="#33506b"
          strokeWidth="2"
        />
        {Array.from({ length: 15 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="38"
            y1={68 + i * 32}
            x2="278"
            y2={54 + i * 32}
            stroke="#4a6b88"
            strokeWidth="0.8"
            opacity="0.38"
          />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={52 + i * 32}
            y1="25"
            x2={68 + i * 30}
            y2="542"
            stroke="#4a6b88"
            strokeWidth={i === 3 ? "1.6" : "0.8"}
            opacity={i === 3 ? "0.5" : "0.32"}
          />
        ))}
        <rect x="118" y="170" width="62" height="98" fill="#17351f" opacity="0.95" rx="2" />
        <text x="149" y="222" textAnchor="middle" fill="#93c4a0" fontSize="9" letterSpacing="1.4">
          CENTRAL PARK
        </text>

        {ISO_BLOCKS.map((b) => (
          <g key={b.id} transform={`translate(${b.x},${b.y})`}>
            <polygon
              points={`0,8 10,0 20,8 20,${8 + b.h} 10,${16 + b.h} 0,${8 + b.h}`}
              fill={b.side}
            />
            <polygon points={`10,0 20,8 20,${8 + b.h} 10,${b.h}`} fill={b.dark} />
            <polygon points={`0,8 10,0 20,8 10,16`} fill={b.top} />
          </g>
        ))}
      </g>

      <text x="60" y="600" fill="#6a8499" fontSize="11" letterSpacing="6">
        HUDSON RIVER
      </text>
      <text x="710" y="70" fill="#6a8499" fontSize="11" letterSpacing="6">
        EAST RIVER
      </text>
    </svg>
  );
}

const ISO_BLOCKS = [
  { id: 1, x: 66, y: 88, h: 28, top: "#4a6278", side: "#2a3d50", dark: "#1c2b3a" },
  { id: 2, x: 96, y: 112, h: 44, top: "#c9a227", side: "#3a2f12", dark: "#241c0c" },
  { id: 3, x: 176, y: 96, h: 36, top: "#5a738a", side: "#2e4256", dark: "#1a2836" },
  { id: 4, x: 208, y: 140, h: 22, top: "#3e566c", side: "#243646", dark: "#15202c" },
  { id: 5, x: 58, y: 300, h: 50, top: "#d4b55c", side: "#3d3418", dark: "#241e0e" },
  { id: 6, x: 206, y: 306, h: 34, top: "#4e6780", side: "#2a3d52", dark: "#172433" },
  { id: 7, x: 240, y: 250, h: 26, top: "#465d72", side: "#283848", dark: "#151f2a" },
  { id: 8, x: 82, y: 430, h: 24, top: "#3e566c", side: "#243646", dark: "#15202c" },
  { id: 9, x: 196, y: 452, h: 42, top: "#e87d3e", side: "#4a2a16", dark: "#2a170c" },
  { id: 10, x: 148, y: 78, h: 18, top: "#3a5166", side: "#223344", dark: "#141e28" },
  { id: 11, x: 52, y: 198, h: 26, top: "#50687e", side: "#2c4054", dark: "#192635" },
  { id: 12, x: 214, y: 206, h: 30, top: "#465d72", side: "#283848", dark: "#151f2a" },
  { id: 13, x: 86, y: 358, h: 20, top: "#3c546a", side: "#253646", dark: "#141d27" },
  { id: 14, x: 170, y: 388, h: 26, top: "#b8921f", side: "#3a3010", dark: "#221c0a" },
  { id: 15, x: 118, y: 480, h: 16, top: "#3a5166", side: "#223344", dark: "#141e28" },
  { id: 16, x: 244, y: 420, h: 30, top: "#4e6780", side: "#2a3d52", dark: "#172433" },
];

function Pin() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-ember-400">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
    </svg>
  );
}

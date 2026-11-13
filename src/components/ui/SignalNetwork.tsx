import { useId, useMemo } from "react";

interface Props {
  nodes: string[];
  centerLabel?: string;
  centerStatus?: string;
  rx?: number;
  ry?: number;
  /** angular offset in degrees (defaults to half a step so top/bottom stay clear) */
  offset?: number;
  /** node label font size in viewBox units (raise when the network renders small) */
  labelSize?: number;
}

const W = 1200;
const VB_Y = 52;
const VB_H = 516;
const CX = 600;
const CY = 310;
const ICE = "#B9D9FF";

/**
 * Animated infrastructure network around a central identity.
 * Desktop: SVG constellation with signals travelling outward (SMIL).
 * Mobile: simplified panel with a vertical signal + node grid.
 */
export default function SignalNetwork({
  nodes,
  centerLabel = "DIGITAL TWIN",
  centerStatus = "ONLINE",
  rx = 470,
  ry = 225,
  offset,
  labelSize = 10.5,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const off = offset ?? 180 / nodes.length;

  const items = useMemo(
    () =>
      nodes.map((label, i) => {
        const a = ((-90 + off + (i * 360) / nodes.length) * Math.PI) / 180;
        const x = CX + rx * Math.cos(a);
        const y = CY + ry * Math.sin(a);
        const dx = x - CX;
        const dy = y - CY;
        const len = Math.hypot(dx, dy);
        const sign = i % 2 ? 1 : -1;
        const qx = (CX + x) / 2 + (-dy / len) * 26 * sign;
        const qy = (CY + y) / 2 + (dx / len) * 26 * sign;
        return {
          label,
          x,
          y,
          w: label.length * labelSize * 0.8 + 46,
          d: `M${CX} ${CY} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`,
          dur: 5 + (i % 4) * 0.7,
          begin: (i * 0.83) % 5.5,
        };
      }),
    [nodes, off, rx, ry, labelSize]
  );

  return (
    <>
      {/* ---------- Desktop constellation ---------- */}
      <svg
        viewBox={`0 ${VB_Y} ${W} ${VB_H}`}
        className="hidden h-auto w-full md:block"
        role="img"
        aria-label={`${centerLabel} connected to ${nodes.join(", ")}`}
      >
        <defs>
          <radialGradient id={`${uid}core`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(185,217,255,0.22)" />
            <stop offset="55%" stopColor="rgba(185,217,255,0.05)" />
            <stop offset="100%" stopColor="rgba(185,217,255,0)" />
          </radialGradient>
          <filter id={`${uid}glow`} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        <ellipse cx={CX} cy={CY} rx={rx} ry={ry} fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 8" />
        <ellipse cx={CX} cy={CY} rx={rx * 0.62} ry={ry * 0.62} fill="none" stroke="rgba(255,255,255,0.035)" />
        <circle cx={CX} cy={CY} r="230" fill={`url(#${uid}core)`} />

        {/* connection lines */}
        {items.map((n) => (
          <g key={n.label}>
            <path d={n.d} fill="none" stroke="rgba(185,217,255,0.2)" strokeWidth="1" />
            <path d={n.d} fill="none" stroke="rgba(185,217,255,0.45)" strokeWidth="1" className="line-flow" />
          </g>
        ))}

        {/* arrival pulses */}
        {items.map((n) => (
          <circle key={`p-${n.label}`} cx={n.x} cy={n.y} r="0" fill="none" stroke={ICE} opacity="0" className="signal">
            <animate attributeName="r" values="0;0;4;26;26" keyTimes="0;0.4;0.41;0.64;1" dur={`${n.dur}s`} begin={`${n.begin}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0;0.7;0;0" keyTimes="0;0.4;0.41;0.64;1" dur={`${n.dur}s`} begin={`${n.begin}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* travelling signals */}
        {items.map((n) => (
          <g key={`s-${n.label}`} className="signal" opacity="0">
            <circle r="7" fill={ICE} opacity="0.35" filter={`url(#${uid}glow)`} />
            <circle r="2.4" fill="#fff" />
            <animateMotion dur={`${n.dur}s`} begin={`${n.begin}s`} repeatCount="indefinite" path={n.d} calcMode="linear" keyPoints="0;1;1" keyTimes="0;0.4;1" />
            <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.05;0.35;0.4;1" dur={`${n.dur}s`} begin={`${n.begin}s`} repeatCount="indefinite" />
          </g>
        ))}

        {/* nodes */}
        {items.map((n, i) => (
          <g
            key={n.label}
            className="net-node net-in"
            style={{ animationDelay: `${0.4 + i * 0.12}s` }}
            transform={`translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})`}
          >
            <rect x={-n.w / 2} y={-(labelSize * 1.62)} width={n.w} height={labelSize * 3.24} rx="2" fill="#0B0B0D" stroke="rgba(255,255,255,0.15)" />
            <circle cx={-n.w / 2 + 15} cy="0" r="2" fill={ICE} className="dot-live" style={{ animationDelay: `${i * 0.25}s` }} />
            <text
              x={-n.w / 2 + 28}
              y={labelSize * 0.36}
              fill="#F4F4F2"
              fontSize={labelSize}
              letterSpacing="2"
              className="font-mono"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* core */}
        <g>
          <circle cx={CX} cy={CY} r="118" fill="none" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 8" className="svg-rot" />
          <circle cx={CX} cy={CY} r="92" fill="none" stroke="rgba(185,217,255,0.28)" strokeDasharray="46 14 4 14" className="svg-rot-rev" />
          <circle cx={CX} cy={CY} r="66" fill="none" stroke={ICE} strokeOpacity="0.5" className="core-ping signal" />
          <circle cx={CX} cy={CY} r="66" fill="#0B0B0D" stroke="rgba(255,255,255,0.25)" />
          <circle cx={CX} cy={CY} r="58" fill="none" stroke="rgba(255,255,255,0.07)" />
          <text x={CX} y={CY - 4} textAnchor="middle" fill="#F4F4F2" fontSize={Math.max(11, labelSize + 0.5)} letterSpacing="2.4" className="font-mono">
            {centerLabel}
          </text>
          <circle cx={CX - 27} cy={CY + 17} r="2.2" fill={ICE} className="dot-live" />
          <text x={CX - 19} y={CY + 20.5} fill={ICE} fontSize="9.5" letterSpacing="2.4" className="font-mono">
            {centerStatus}
          </text>
        </g>
      </svg>

      {/* ---------- Mobile: simplified interactive panel ---------- */}
      <div className="md:hidden">
        <div className="panel mx-auto max-w-[280px] overflow-hidden p-5 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(185,217,255,0.14),transparent_70%)]" />
          <div className="relative font-mono text-[12px] uppercase tracking-[0.24em] text-fg">{centerLabel}</div>
          <div className="relative mt-2 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ice">
            <span className="dot-live h-1.5 w-1.5 rounded-full bg-ice" />
            {centerStatus}
          </div>
        </div>
        <div className="relative mx-auto h-10 w-px bg-gradient-to-b from-ice/50 to-line">
          <span className="drop-v signal absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white shadow-glow-sm" />
        </div>
        <div className="grid grid-cols-2 gap-px border border-line bg-line">
          {nodes.map((n, i) => (
            <div
              key={n}
              className={`relative flex items-center gap-2.5 overflow-hidden bg-r1 px-3.5 py-3.5 ${
                i === nodes.length - 1 && nodes.length % 2 === 1 ? "col-span-2" : ""
              }`}
            >
              <span className="dot-live h-1.5 w-1.5 shrink-0 rounded-full bg-ice" style={{ animationDelay: `${i * 0.3}s` }} />
              <span className="font-mono text-[9.5px] uppercase leading-tight tracking-[0.12em] text-fg">{n}</span>
              <span className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
                <span className="scan-bar block h-px w-1/3 bg-ice/70" style={{ animationDelay: `${i * 0.35}s` }} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

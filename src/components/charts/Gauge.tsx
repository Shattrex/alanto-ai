import { useRef } from "react";
import { useInView } from "framer-motion";

/** Semi-circular measurement gauge with ticks and needle. */
export default function Gauge({
  value,
  label,
  caption,
}: {
  value: number;
  label: string;
  caption: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const v = Math.max(0, Math.min(100, value));
  const arc = "M30 124 A90 90 0 0 1 210 124";
  const ease = "cubic-bezier(.22,1,.36,1)";

  return (
    <svg ref={ref} viewBox="0 0 240 168" className="h-auto w-full" role="img" aria-label={`${label} ${value}`}>
      {/* ticks */}
      {Array.from({ length: 41 }).map((_, i) => {
        const a = Math.PI - (i / 40) * Math.PI;
        const major = i % 5 === 0;
        const r1 = major ? 98 : 101;
        const r2 = 107;
        return (
          <line
            key={i}
            x1={120 + Math.cos(a) * r1}
            y1={124 - Math.sin(a) * r1}
            x2={120 + Math.cos(a) * r2}
            y2={124 - Math.sin(a) * r2}
            stroke={major ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.14)"}
          />
        );
      })}
      <path d={arc} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
      <path
        d={arc}
        fill="none"
        stroke="#B9D9FF"
        strokeWidth="5"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={inView ? 1 - v / 100 : 1}
        style={{ transition: `stroke-dashoffset 1.8s ${ease} .2s`, filter: "drop-shadow(0 0 6px rgba(185,217,255,0.5))" }}
      />
      {/* needle */}
      <g
        style={{
          transform: `rotate(${inView ? -90 + v * 1.8 : -90}deg)`,
          transformOrigin: "120px 124px",
          transition: `transform 1.8s ${ease} .2s`,
        }}
      >
        <line x1="120" y1="124" x2="120" y2="52" stroke="#F4F4F2" strokeWidth="1.4" />
        <circle cx="120" cy="52" r="2" fill="#fff" />
      </g>
      <circle cx="120" cy="124" r="6" fill="#0B0B0D" stroke="rgba(255,255,255,0.5)" />
      <text x="30" y="146" textAnchor="middle" fill="#5C5D64" fontSize="8" className="font-mono" letterSpacing="1.5">
        0
      </text>
      <text x="210" y="146" textAnchor="middle" fill="#5C5D64" fontSize="8" className="font-mono" letterSpacing="1.5">
        100
      </text>
      <text x="120" y="156" textAnchor="middle" fill="#B9D9FF" fontSize="8.5" className="font-mono" letterSpacing="2.2">
        {caption}
      </text>
    </svg>
  );
}

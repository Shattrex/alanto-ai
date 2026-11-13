import { useId } from "react";
import { cn } from "../../lib/utils";

/**
 * Abstract geometric cover art (6 compositions) used for articles and film
 * thumbnails until real artwork is supplied.
 */
export default function GeoCover({ seed = 0, className }: { seed?: number; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const v = ((seed % 6) + 6) % 6;
  const stroke = "rgba(255,255,255,0.14)";
  const ice = "#B9D9FF";

  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      className={cn("absolute inset-0 h-full w-full", className)}
      aria-hidden
    >
      <defs>
        <radialGradient id={`${uid}g`} cx="70%" cy="40%" r="70%">
          <stop offset="0%" stopColor="rgba(185,217,255,0.16)" />
          <stop offset="100%" stopColor="rgba(185,217,255,0)" />
        </radialGradient>
        <linearGradient id={`${uid}l`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="100%" stopColor={ice} />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill="#0B0B0D" />
      <rect width="400" height="250" fill={`url(#${uid}g)`} />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`h${i}`} x1="0" x2="400" y1={i * 31.25} y2={i * 31.25} stroke="rgba(255,255,255,0.03)" />
      ))}

      {v === 0 &&
        [28, 56, 84, 112, 140, 168].map((r, i) => (
          <circle
            key={r}
            cx="270"
            cy="125"
            r={r}
            fill="none"
            stroke={i === 3 ? ice : stroke}
            strokeOpacity={i === 3 ? 0.55 : 1}
            strokeDasharray={i === 3 ? "3 5" : undefined}
          />
        ))}

      {v === 1 &&
        Array.from({ length: 22 }).map((_, i) => (
          <line
            key={i}
            x1={-40 + i * 24}
            y1="250"
            x2={120 + i * 24}
            y2="0"
            stroke={i === 13 ? `url(#${uid}l)` : stroke}
            strokeWidth={i === 13 ? 1.4 : 1}
            strokeOpacity={i === 13 ? 1 : 0.4 + (i % 4) * 0.15}
          />
        ))}

      {v === 2 &&
        Array.from({ length: 12 }).flatMap((_, r) =>
          Array.from({ length: 22 }).map((_, c) => {
            const d = Math.hypot(c - 15, r - 5) / 14;
            return (
              <circle
                key={`${r}-${c}`}
                cx={22 + c * 17.5}
                cy={22 + r * 19.5}
                r={Math.max(0.6, 2.2 - d * 2)}
                fill={d < 0.35 ? ice : "#fff"}
                fillOpacity={Math.max(0.06, 0.7 - d)}
              />
            );
          })
        )}

      {v === 3 && (
        <g fill="none">
          <circle cx="140" cy="125" r="78" stroke="rgba(255,255,255,0.6)" />
          <circle cx="140" cy="125" r="60" stroke={stroke} />
          <circle cx="285" cy="125" r="78" stroke={stroke} strokeDasharray="2 6" />
          <line x1="218" x2="207" y1="125" y2="125" stroke={ice} />
          <line x1="218" x2="207" y1="125" y2="125" stroke={ice} />
          <path d="M218 112v26M207 112v26" stroke={ice} strokeOpacity="0.8" />
          <path d="M140 125H285" stroke={ice} strokeOpacity="0.25" strokeDasharray="3 4" />
        </g>
      )}

      {v === 4 &&
        Array.from({ length: 14 }).map((_, i) => {
          const h = 14 + Math.pow(i, 1.75) * 2.3;
          return (
            <rect
              key={i}
              x={34 + i * 25}
              y={226 - h}
              width="12"
              height={h}
              fill={i > 10 ? "rgba(185,217,255,0.55)" : "rgba(255,255,255,0.08)"}
              stroke={stroke}
            />
          );
        })}

      {v === 5 && (
        <g fill="none">
          {[40, 80, 120].map((r) => (
            <circle key={r} cx="200" cy="125" r={r} stroke={stroke} />
          ))}
          <path d="M200 125 L320 60 A137 137 0 0 1 337 125 Z" fill="rgba(185,217,255,0.08)" stroke={ice} strokeOpacity="0.4" />
          <path d="M60 125H340M200 0V250" stroke={stroke} />
          <circle cx="288" cy="82" r="3" fill={ice} />
        </g>
      )}
    </svg>
  );
}

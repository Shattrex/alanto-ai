import type { ReactNode } from "react";
import { useAssetExists } from "../../hooks/useAssetExists";
import { cn } from "../../lib/utils";
import CornerMarks from "./CornerMarks";
import { Play } from "./Icons";

export type SlotVariant = "portrait" | "video" | "asset";

interface Props {
  /** Real file path. If it doesn't exist, a branded placeholder is shown. */
  src?: string;
  kind?: "image" | "video";
  alt: string;
  /** Upper-left product label, e.g. "DIGITAL TWIN MEDIA" */
  label: string;
  /** Lower-left descriptor, e.g. "VIDEO SLOT" */
  sublabel?: string;
  /** Upper-right status, e.g. "COMING SOON" */
  status?: string;
  variant?: SlotVariant;
  /** Sets the aspect ratio / size. e.g. "aspect-video" */
  className?: string;
  compact?: boolean;
  fallback?: ReactNode;
}

export default function MediaSlot({
  src,
  kind = "image",
  alt,
  label,
  sublabel,
  status = "COMING SOON",
  variant = "asset",
  className,
  compact = false,
  fallback,
}: Props) {
  const state = useAssetExists(src);

  return (
    <div className={cn("relative isolate overflow-hidden border border-line bg-r2", className)}>
      {state === "yes" && src ? (
        kind === "video" ? (
          <video
            src={src}
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full bg-black object-cover"
          />
        ) : (
          <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        )
      ) : (
        <Placeholder
          variant={variant}
          label={label}
          sublabel={sublabel}
          status={state === "checking" ? "" : status}
          compact={compact}
          fallback={fallback}
        />
      )}
    </div>
  );
}

function Placeholder({
  variant,
  label,
  sublabel,
  status,
  compact,
  fallback,
}: {
  variant: SlotVariant;
  label: string;
  sublabel?: string;
  status: string;
  compact: boolean;
  fallback?: ReactNode;
}) {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-r3 to-r1">
      <div className="grid-bg-sm absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(185,217,255,0.10),transparent_65%)]" />
      {fallback ?? <Art variant={variant} />}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 overflow-hidden opacity-60">
        <div className="scan-line h-full w-full bg-gradient-to-b from-transparent via-ice/10 to-transparent" />
      </div>
      <CornerMarks size={compact ? 6 : 9} inset={compact ? 4 : 8} />
      {!compact && (
        <>
          <div className="absolute left-5 top-4 font-mono text-[9px] uppercase tracking-[0.2em] text-mute">
            {label}
          </div>
          {status && (
            <div
              className={
                "absolute border border-line-strong px-1.5 py-[2px] font-mono text-[8.5px] uppercase tracking-[0.2em] text-fg/80 " +
                (variant === "portrait" ? "bottom-4 right-5" : "right-5 top-4")
              }
            >
              {status}
            </div>
          )}
          {sublabel && (
            <div className="absolute bottom-4 left-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-dim">
              <span className="h-1 w-1 bg-ice/70" />
              {sublabel}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Art({ variant }: { variant: SlotVariant }) {
  if (variant === "portrait") {
    return (
      <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMax meet" className="absolute inset-0 h-full w-full" aria-hidden>
        <g fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1">
          <circle cx="100" cy="96" r="34" />
          <path d="M34 250c2-52 28-78 66-78s64 26 66 78" />
          <path d="M100 130v18" strokeDasharray="2 3" />
        </g>
        <g fill="none" stroke="rgba(185,217,255,0.5)" strokeWidth="1">
          <path d="M58 58v-10h10M142 58v-10h-10M58 134v10h10M142 134v10h-10" />
        </g>
        <circle cx="100" cy="96" r="1.6" fill="#B9D9FF" />
      </svg>
    );
  }
  if (variant === "video") {
    return (
      <>
        <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-base/40 text-fg/80 md:h-16 md:w-16">
          <Play size={16} />
        </div>
        <div className="absolute inset-x-5 bottom-10 h-px bg-line-strong">
          <div className="h-px w-1/5 bg-ice/70" />
        </div>
      </>
    );
  }
  return (
    <svg viewBox="0 0 200 125" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full p-8" aria-hidden>
      <g fill="none" stroke="rgba(255,255,255,0.16)">
        <rect x="55" y="22" width="90" height="82" />
        <rect x="65" y="32" width="70" height="30" stroke="rgba(185,217,255,0.4)" />
        <path d="M65 74h60M65 82h46M65 90h54" strokeDasharray="1 3" />
      </g>
    </svg>
  );
}

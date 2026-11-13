import { BRAND, type LogoVariant } from "../config/brand";
import { cn } from "../lib/utils";

interface Props {
  variant?: LogoVariant;
  /** Height of the logo in px */
  height?: number;
  /** Show the DIGITAL TWIN INFRASTRUCTURE descriptor under the placeholder wordmark */
  descriptor?: boolean;
  className?: string;
}

/**
 * THE one place the logo is rendered. Real assets are controlled from
 * src/config/brand.ts. Until then a simple placeholder mark + text is drawn.
 */
export default function AlantoLogo({ variant = "horizontal", height = 22, descriptor = false, className }: Props) {
  if (BRAND.useFileAssets) {
    return (
      <img
        src={BRAND.assets[variant]}
        alt={BRAND.name}
        style={{ height }}
        className={cn("block w-auto select-none", className)}
        draggable={false}
      />
    );
  }

  const dark = variant === "black";
  const showMark = variant !== "wordmark";
  const showWord = variant !== "symbol";
  const color = dark ? "#070707" : "#F4F4F2";

  return (
    <span
      className={cn("inline-flex items-center gap-[0.7em] leading-none", className)}
      style={{ color, fontSize: height }}
      aria-label={BRAND.name}
    >
      {showMark && <PlaceholderMark size={height} />}
      {showWord && (
        <span className="flex flex-col">
          <span
            className="font-display font-semibold"
            style={{ fontSize: height * 0.66, letterSpacing: "0.34em", marginRight: "-0.34em" }}
          >
            {BRAND.name}
          </span>
          {descriptor && (
            <span
              className="mt-[0.7em] font-mono font-normal opacity-60"
              style={{ fontSize: Math.max(7, height * 0.27), letterSpacing: "0.3em" }}
            >
              {BRAND.descriptor}
            </span>
          )}
        </span>
      )}
    </span>
  );
}

function PlaceholderMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden className="shrink-0">
      <rect x=".75" y=".75" width="30.5" height="30.5" stroke="currentColor" strokeOpacity=".85" />
      <path d="M7 24 L16 7 L25 24" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14" y="19.5" width="4" height="4" fill="currentColor" />
    </svg>
  );
}

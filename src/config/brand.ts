/**
 * ALANTO BRAND CONFIGURATION
 * ---------------------------------------------------------------------------
 * The logo is rendered from ONE component (`components/AlantoLogo.tsx`) which
 * reads this file. To swap in the real logo:
 *
 *   1. Drop the final files into /public/brand/ using the exact names below.
 *   2. Set `useFileAssets` to `true`.
 *
 * Until then a simple placeholder mark + wordmark is drawn in code.
 */
export const BRAND = {
  name: "ALANTO",
  descriptor: "DIGITAL TWIN INFRASTRUCTURE",

  /** Flip to `true` once the real SVG files exist in /public/brand */
  useFileAssets: false,

  assets: {
    /** Symbol only */
    symbol: "/brand/alanto-symbol.svg",
    /** Wordmark only */
    wordmark: "/brand/alanto-wordmark.svg",
    /** Symbol + wordmark, side by side */
    horizontal: "/brand/alanto-horizontal.svg",
    /** Full lockup, single-colour white (for dark backgrounds) */
    white: "/brand/alanto-white.svg",
    /** Full lockup, single-colour black (for light backgrounds) */
    black: "/brand/alanto-black.svg",
    /** Browser tab icon (also referenced from index.html) */
    favicon: "/brand/alanto-favicon.svg",
  },
} as const;

export type LogoVariant = Exclude<keyof typeof BRAND.assets, "favicon">;

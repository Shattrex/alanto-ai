/**
 * CENTRAL SITE CONFIGURATION
 * ---------------------------------------------------------------------------
 * Everything you are likely to change later lives here or in /src/data.
 */

/**
 * Cal.com booking link. Replace with your real URL, e.g.
 *   "https://cal.com/alanto/private-demo"
 * Every "BOOK PRIVATE DEMO" / "DISCUSS DEPLOYMENT" / "SEE ALANTO FOR MY
 * BUSINESS" button reads this value. While it isn't a real http(s) URL the
 * site opens the placeholder PRIVATE DEMO modal instead.
 */
export const CAL_URL: string = "ADD_CAL_LINK_HERE";
export const isCalConfigured = /^https?:\/\//i.test(CAL_URL);

/**
 * Primary commercial. Change it once, here.
 * Accepts: Google Drive /preview, YouTube/Vimeo embed URLs, Bunny / Cloudflare
 * Stream iframes, or a direct .mp4 / .webm (local /public file, Vercel Blob,
 * CDN). See components/ui/VideoEmbed.tsx.
 */
export const MAIN_COMMERCIAL_VIDEO =
  "https://drive.google.com/file/d/1HVzz2jbZfUzu9xr-_nz1eMA0ykoFYICq/preview";

/** Standard call-to-action labels (all route through the booking handler) */
export const CTA = {
  bookDemo: "BOOK PRIVATE DEMO",
  discuss: "TALK TO US",
  seeForBusiness: "SEE ALANTO FOR MY BUSINESS",
  watch: "WATCH THE VIDEO",
} as const;

/** Section anchors */
export const SECTION = {
  top: "top",
  product: "product",
  authorityGap: "authority-gap",
  scanner: "scanner",
  digitalTwin: "digital-twin",
  examples: "examples",
  engine: "engine",
  insights: "insights",
  films: "films",
  faq: "faq",
  how: "how-it-works",
  example: "example",
  pricing: "pricing",
} as const;

export const NAV_LINKS = [
  { label: "The Problem", id: SECTION.authorityGap },
  { label: "How It Works", id: SECTION.how },
  { label: "Example", id: SECTION.example },
  { label: "Pricing", id: SECTION.pricing },
  { label: "FAQ", id: SECTION.faq },
] as const;

export const FOOTER_LINKS = {
  product: NAV_LINKS,
  legal: ["Privacy", "Terms"] as const,
};

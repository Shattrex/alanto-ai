/** Market Authority dashboard — ALL VALUES ARE DEMO DATA, not customer results. */

export const DASH_TABS = ["OVERVIEW", "SEARCH", "AUTHORITY", "CONTENT", "OPPORTUNITIES"] as const;
export type DashTab = (typeof DASH_TABS)[number];

export const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export const KPIS = [
  { label: "Search Visibility", value: "71", unit: "/100", delta: "+12", series: [22, 26, 25, 31, 38, 41, 46, 52, 58, 63, 68, 71] },
  { label: "Seller Intent Visits", value: "1,284", unit: "", delta: "+34%", series: [120, 140, 135, 190, 240, 260, 330, 410, 520, 760, 1010, 1284] },
  { label: "Branded Discovery", value: "+38", unit: "%", delta: "+9", series: [4, 6, 9, 10, 14, 17, 21, 25, 29, 33, 36, 38] },
  { label: "Knowledge Coverage", value: "64", unit: "%", delta: "+21", series: [8, 12, 18, 22, 27, 33, 40, 46, 52, 57, 61, 64] },
  { label: "Content Assisted Visits", value: "412", unit: "", delta: "+18%", series: [20, 28, 40, 55, 80, 110, 160, 210, 260, 320, 380, 412] },
  { label: "Booked Conversations", value: "9", unit: "", delta: "+3", series: [0, 0, 1, 1, 2, 2, 3, 4, 5, 6, 8, 9] },
];

export const VISIBILITY_SERIES = [
  { name: "Search visibility", data: [22, 26, 25, 31, 38, 41, 46, 52, 58, 63, 68, 71], tone: "ice" as const },
  { name: "Branded discovery", data: [4, 6, 9, 10, 14, 17, 21, 25, 29, 33, 36, 38], tone: "silver" as const },
];

export const SURFACE_BARS = [
  { label: "Website", value: 82 },
  { label: "Search", value: 71 },
  { label: "YouTube", value: 54 },
  { label: "LinkedIn", value: 47 },
  { label: "AI discovery", value: 39 },
  { label: "Reviews", value: 28 },
];

export const COVERAGE = [
  { label: "Valuation", value: 28 },
  { label: "Preparation", value: 24 },
  { label: "Process", value: 20 },
  { label: "Buyers", value: 16 },
  { label: "Market", value: 12 },
];

export const SEARCH_SERIES = [
  { name: "Seller-intent queries", data: [30, 34, 40, 38, 48, 55, 62, 71, 80, 96, 118, 140], tone: "ice" as const },
  { name: "Informational queries", data: [60, 64, 70, 78, 82, 90, 98, 104, 112, 120, 132, 145], tone: "silver" as const },
];

export const SEARCH_TOPICS = [
  { topic: "Business valuation questions", vis: 78 },
  { topic: "Preparing a company for sale", vis: 66 },
  { topic: "Selling process timeline", vis: 52 },
  { topic: "Buyer expectations", vis: 41 },
  { topic: "Confidentiality when selling", vis: 33 },
  { topic: "Local market conditions", vis: 24 },
];

export const AUTHORITY_AXES = ["Search", "Education", "Video", "Knowledge", "Identity", "Distribution"];
export const AUTHORITY_NOW = [71, 58, 49, 64, 74, 52];
export const AUTHORITY_BEFORE = [41, 27, 19, 31, 36, 24];

export const HEATMAP_ROWS = ["Valuation", "Preparation", "Process", "Buyers", "Market"];
export const HEATMAP_COLS = ["Site", "Search", "Video", "LinkedIn", "AI"];
export const HEATMAP = [
  [0.9, 0.8, 0.6, 0.5, 0.4],
  [0.8, 0.7, 0.5, 0.45, 0.35],
  [0.6, 0.5, 0.3, 0.3, 0.2],
  [0.5, 0.4, 0.25, 0.2, 0.15],
  [0.3, 0.2, 0.1, 0.25, 0.1],
];

export const CONTENT_BARS = [
  { label: "Videos", value: 38 },
  { label: "Articles", value: 24 },
  { label: "FAQ entries", value: 36 },
  { label: "LinkedIn insights", value: 20 },
  { label: "Resource pages", value: 6 },
];

export const CONTENT_QUEUE = [
  { title: "Preparing a company for sale", type: "ARTICLE", status: "PUBLISHED" },
  { title: "What buyers look for first", type: "VIDEO", status: "IN REVIEW" },
  { title: "Do my employees need to know?", type: "FAQ", status: "PUBLISHED" },
  { title: "How is a business priced?", type: "YOUTUBE", status: "DRAFTING" },
  { title: "Local market commentary", type: "INSIGHT", status: "QUEUED" },
];

export const OPPORTUNITIES = [
  { topic: "Owner dependence and transferability", score: 92, note: "High seller intent, thin coverage" },
  { topic: "Financial readiness before listing", score: 84, note: "Frequently searched, few expert answers" },
  { topic: "Confidential marketing process", score: 71, note: "Strong trust signal" },
  { topic: "Timeline from offer to close", score: 63, note: "Common late-stage question" },
  { topic: "Regional buyer activity", score: 48, note: "Differentiating local angle" },
];

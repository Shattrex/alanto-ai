/** Authority Gap visual + Scanner + Seller POV + Engine + Operating Model data */

/* ---------------- Authority Gap (illustrative) ---------------- */
export const REAL_AUTHORITY = [
  { label: "20+ years experience", value: 96 },
  { label: "Deals", value: 92 },
  { label: "Relationships", value: 90 },
  { label: "Industry knowledge", value: 94 },
  { label: "Negotiation experience", value: 88 },
  { label: "Local reputation", value: 85 },
  { label: "Seller conversations", value: 91 },
];

export const DIGITAL_AUTHORITY = [
  { label: "Corporate bio", value: 34 },
  { label: "Generic profile", value: 22 },
  { label: "Limited video", value: 14 },
  { label: "Little searchable expertise", value: 12 },
  { label: "No owned knowledge library", value: 6 },
  { label: "Weak individual visibility", value: 10 },
];

/* ---------------- Authority Scanner (demo) ---------------- */
export const SCAN_STEPS = [
  "Scanning Search Presence...",
  "Mapping Digital Footprint...",
  "Analyzing Educational Authority...",
  "Checking Professional Visibility...",
  "Mapping Expertise Coverage...",
];

export const SCAN_RESULTS = [
  { label: "SEARCH PRESENCE", value: 41 },
  { label: "EDUCATIONAL AUTHORITY", value: 27 },
  { label: "VIDEO PRESENCE", value: 19 },
  { label: "KNOWLEDGE FOOTPRINT", value: 31 },
  { label: "PERSONAL AUTHORITY", value: 36 },
];

/* ---------------- Twin deployment ---------------- */
export const DEPLOY_STEPS = [
  "CAPTURING IDENTITY",
  "SYNTHESIZING VOICE",
  "EXTRACTING EXPERTISE",
  "BUILDING KNOWLEDGE PROFILE",
  "MAPPING SELLER QUESTIONS",
  "CREATING AUTHORITY ENGINE",
];

/** step range during which each system is "processing"; ready once passed */
export const TWIN_SYSTEMS = [
  { key: "IDENTITY", from: 0, to: 0, done: "READY" },
  { key: "VOICE", from: 1, to: 1, done: "READY" },
  { key: "EXPERTISE", from: 2, to: 2, done: "READY" },
  { key: "KNOWLEDGE", from: 3, to: 4, done: "READY" },
  { key: "AUTHORITY ENGINE", from: 5, to: 5, done: "ONLINE" },
];

export const IDENTITY_FIELDS = [
  { key: "image", label: "Professional Image" },
  { key: "voice", label: "Voice Profile" },
  { key: "market", label: "Market" },
  { key: "expertise", label: "Expertise" },
  { key: "positioning", label: "Positioning" },
  { key: "experience", label: "Experience" },
] as const;

/* ---------------- Seller POV ---------------- */
export const SELLER_STORY = [
  "You're 58.",
  "You spent 27 years building an HVAC company.",
  "Your business is worth approximately $4.6M.",
  "You're considering the biggest transaction of your professional life.",
  "You research two brokers.",
];

export const BROKER_A = {
  name: "BROKER A",
  kind: "Directory listing",
  traits: [
    "Corporate directory profile",
    "Generic posts",
    "Sparse personal presence",
    "Little educational content",
    "Few visible opinions",
    "Limited searchable expertise",
  ],
};

export const BROKER_B = {
  name: "BROKER B",
  kind: "Personal authority site",
  traits: [
    "Personal authority website",
    "Educational videos",
    "Seller-specific insights",
    "Searchable knowledge",
    "Market commentary",
    "Professional thought leadership",
    "Strong identity",
  ],
};

/* ---------------- Authority Engine ---------------- */
export const HERO_NODES = [
  "GOOGLE",
  "WEBSITE",
  "LINKEDIN",
  "YOUTUBE",
  "SELLER EDUCATION",
  "AI DISCOVERY",
  "MARKET INSIGHTS",
];

export const ENGINE_NODES = [
  "GOOGLE",
  "WEBSITE",
  "LINKEDIN",
  "YOUTUBE",
  "AI DISCOVERY",
  "SELLER QUESTIONS",
  "REVIEWS",
  "MARKET COMMENTARY",
  "EDUCATIONAL CONTENT",
];

export const ENGINE_STATS = [
  { label: "KNOWLEDGE ASSETS", value: "124" },
  { label: "TRACKED TOPICS", value: "38" },
  { label: "DISTRIBUTION SURFACES", value: "7" },
];

export const ENGINE_FEED = [
  "Seller question mapped to knowledge asset",
  "Educational answer queued for review",
  "New topic cluster added to library",
  "Search surface updated",
  "Market commentary drafted",
  "Knowledge coverage recalculated",
];

/* ---------------- Not social media ---------------- */
export const NOT_LIST = [
  "SOCIAL MEDIA MANAGEMENT",
  "AI AVATAR SUBSCRIPTION",
  "CONTENT FACTORY",
  "MORE POSTS",
];

/* ---------------- Operating model ---------------- */
export const OPERATING_STAGES = [
  {
    n: "01",
    title: "CAPTURE",
    items: ["Identity", "Voice", "Experience", "Expertise", "Positioning"],
  },
  {
    n: "02",
    title: "BUILD",
    items: ["Digital Twin", "Knowledge system", "Authority foundation", "Brand structure"],
  },
  {
    n: "03",
    title: "DEPLOY",
    items: ["Video", "Searchable knowledge", "Educational assets", "Professional distribution"],
  },
  {
    n: "04",
    title: "COMPOUND",
    items: ["New questions", "New expertise", "New authority assets", "Greater digital presence"],
  },
];

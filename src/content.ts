export const RICHARD_BIO =
  "Richard Morgin is a senior Franchise Consultant and Transition Mentor who helps professionals and business owners make strategic moves into franchise ownership, business growth, and long-term wealth creation. Through the Alanto AI System, we are building Richard’s digital alter ego around his real experience, personality, voice, appearance, and straight-talking advisory style, allowing his expertise to stay visible and educate prospects even when he is not personally in front of the camera. The initial content infrastructure will include two distinct AI video styles: one polished, professional office-style avatar for authority and educational content, and one more natural, conversational avatar for personal insights, stories, and direct prospect communication. Alongside these, we will develop three premium image posts built around Richard’s real positioning and experiences rather than generic franchise graphics. A structured script plan will guide the entire system, covering strong hooks, common buyer and seller questions, franchise education, objections, ROI and due diligence, corporate-to-ownership transitions, and Richard’s own lessons from more than 20 years in finance, operations, sales, and leadership. The goal is to make the alter ego feel like an extension of Richard himself, not simply an AI avatar, while creating a repeatable content engine that can expand over time.";

export const PORTRAITS = [
  {
    src: "/richard/office.jpg",
    label: "Office Authority",
    caption: "Polished. Educational. The advisor in the room.",
  },
  {
    src: "/richard/gym.jpg",
    label: "Natural Conversational",
    caption: "Real. Direct. The man behind the desk.",
  },
] as const;

export const IMAGE_POSTS = [
  {
    src: "/richard/post-1.jpg",
    title: "Franchising Creates More Than Businesses",
    sub: "Opportunities, financial freedom, and a better future — not a generic graphic.",
  },
  {
    src: "/richard/post-2.jpg",
    title: "From Corporate Burnout to Ownership",
    sub: "A proven path to control time, income, and future — without starting from scratch.",
  },
  {
    src: "/richard/post-3.jpg",
    title: "Your Next Chapter Doesn’t Have to Be Uncertain",
    sub: "The right guidance turns experience into a business that actually fits a life.",
  },
] as const;

/**
 * `file` takes priority over `driveId`: a local mp4 in /public/video plays at
 * full quality in the native player, while Drive's embed re-encodes and stalls.
 */
export const ALTER_VIDEOS = [
  {
    id: "office-authority",
    driveId: "16bhW890a1ipOQX-AjEsGtArbfEA5BH4R",
    file: "",
    title: "Alter Ego — Office Authority",
    sub: "Polished avatar for education, trust, and executive presence.",
    poster: "/richard/office.jpg",
  },
] as const;

export const USE_CASE_LINES = [
  "One Alter Ego puts Richard on every feed at once — without him ever picking up a camera.",
  "Prospects arrive already educated. Objections get answered before the call even starts.",
  "This is not lead gen. Lead gen chases strangers. An Alter Ego attracts the right ones.",
  "While other consultants buy ads, Richard occupies the conversation in his industry.",
  "Presence compounds. One installed system outperforms a month of content hustle.",
];

export const BOOKING_URL = "https://cal.com/damil-mirza-bsqqlh/30min";

export const OFFER_INCLUDES = [
  { title: "Dual AI video system", detail: "Office-authority avatar + natural conversational avatar, trained on Richard’s real voice, look, and cadence." },
  { title: "Premium image engine", detail: "Signature posts built from his positioning and stories — never stock franchise clipart." },
  { title: "Full script architecture", detail: "Hooks, buyer/seller questions, objections, ROI, due diligence, and corporate-to-owner transitions." },
  { title: "Always-on presence", detail: "His expertise stays visible and teaching while he is in meetings, on calls, or offline." },
  { title: "Repeatable content OS", detail: "A system that expands — not a one-off batch of videos that dies in a Drive folder." },
  { title: "6-month partnership", detail: "We install it, run it, and prove it. The benchmark: one deal closed inside the contract." },
];

export const SELLERS = [
  { id: "m", name: "Marcus T.", quote: "He’s talking about this free stuff — actually useful.", color: "#E87D3E" },
  { id: "e", name: "Elena K.", quote: "Nice. He’s providing real value, not a pitch deck.", color: "#C9A227" },
  { id: "j", name: "James R.", quote: "He seems more credible than the last three brokers.", color: "#5B8DEF" },
  { id: "p", name: "Priya S.", quote: "I’m gonna work with him. This feels like the real thing.", color: "#D45D8C" },
  { id: "d", name: "David L.", quote: "Straight talk. Twenty years in the room. I’m booking.", color: "#3CBFA0" },
  { id: "a", name: "Aisha M.", quote: "Everyone I know is watching this. I’m in.", color: "#B57BFF" },
  { id: "s", name: "Sam C.", quote: "This isn’t lead-gen spam. He’s educating the market.", color: "#F0A36A" },
  { id: "n", name: "Nina V.", quote: "I already trust him and we haven’t spoken yet.", color: "#E23B2E" },
] as const;

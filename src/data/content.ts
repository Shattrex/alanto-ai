/** Engagement, insights, films and FAQ */

/* ---------------- Engagement ---------------- */
export const ENGAGEMENT = {
  title: "ALANTO MARKET AUTHORITY",
  sub: "We set up your Digital Twin and keep your expertise showing up online, so sellers find you and trust you before the first call.",
  implementation: { label: "SET-UP", price: "$7,500", note: "One-time" },
  operations: { label: "ONGOING WORK", price: "$3,500", per: "/ MONTH", note: "Managed for you" },
  includes: [
    "Interview to capture your experience and voice",
    "Your Digital Twin, set up and ready",
    "Videos, articles and answers for sellers",
    "Your own website and search presence",
    "New content as new seller questions come in",
    "A monthly report on what is working",
  ],
  fine: "Engagements are subject to qualification and scope.",
};

/* ---------------- Insights ---------------- */
export interface Article {
  title: string;
  tag: string;
  /** Add when published: /insights/slug or full URL */
  href?: string;
  /** Add a cover image path later, e.g. "/insights/why-brokers-invisible.jpg" */
  cover?: string;
}

export const ARTICLES: Article[] = [
  { title: "Why great brokers become digitally invisible", tag: "AUTHORITY" },
  { title: "The Authority Gap", tag: "FRAMEWORK" },
  { title: "The future of professional expertise", tag: "OUTLOOK" },
  { title: "What sellers research before calling a broker", tag: "SELLER BEHAVIOR" },
  { title: "Digital Twin vs personal branding", tag: "POSITIONING" },
  { title: "Why generic broker content fails", tag: "CONTENT" },
];

/* ---------------- Films ---------------- */
export interface Film {
  title: string;
  featured?: boolean;
  /** Provide a video URL/file to make a slot playable */
  src?: string;
  thumb?: string;
}

export const FILMS: Film[] = [
  { title: "What is a Digital Twin?" },
  { title: "The Authority Gap" },
  { title: "Why Alanto isn't social media" },
  { title: "The Seller POV" },
  { title: "One expert. Everywhere." },
  { title: "The future of broker authority" },
];

/* ---------------- FAQ ---------------- */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "What is a Digital Twin?",
    a: "It is a digital version of you: your experience, your voice and the way you explain things. We use it to produce videos, articles and answers about selling a business, so your expertise shows up online even when you are not in the room.",
  },
  {
    q: "Is it just AI making things up?",
    a: "No. Everything starts with you: a real interview about your experience and how you work. Technology helps produce and share it. The substance comes from you.",
  },
  {
    q: "Do I get to approve what is published?",
    a: "Yes. Nothing goes out in your name without your sign-off.",
  },
  {
    q: "How much of my time does it take?",
    a: "Your time is limited and mostly at the start, in the interview sessions. After that it is review and approval. The exact commitment is confirmed on your first call.",
  },
  {
    q: "Who controls my image and voice?",
    a: "You do. They are used only with your consent and for what is agreed in your engagement. The specific terms are written into the agreement.",
  },
  {
    q: "Do you guarantee deals or leads?",
    a: "No. Nobody honestly can. We build the visibility and trust that make you easier to find and easier to choose. What you do with the conversations is up to you.",
  },
];

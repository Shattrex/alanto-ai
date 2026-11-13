/**
 * EXAMPLE PROFILES
 * Media paths are asset SLOTS. Drop finished files into /public/examples/<id>/
 * and they appear automatically; until then branded placeholders are shown.
 * Identity text below is generic, role-based example copy, not claims about
 * real clients. Replace with real intake data later.
 */
export interface ExampleProfile {
  id: string;
  name: string;
  role: string;
  initials: string;
  deploymentLabel: string;
  identity: {
    image: string;
    voice: string;
    market: string;
    expertise: string;
    positioning: string;
    experience: string;
  };
  media: {
    profile: string;
    twinVideo: string;
    content: string[];
    articleCover?: string;
  };
  /** Seller / buyer questions mapped into the knowledge system (example) */
  questions: string[];
  topics: string[];
}

const dir = (id: string) => `/examples/${id}`;

export const PROFILES: ExampleProfile[] = [
  {
    id: "linda",
    name: "LINDA",
    role: "Business Broker",
    initials: "L",
    deploymentLabel: "EXAMPLE DEPLOYMENT",
    identity: {
      image: "Reference portrait set",
      voice: "Recorded voice sample",
      market: "Primary market, set at intake",
      expertise: "Selling owner-operated businesses",
      positioning: "The broker who explains the process first",
      experience: "Career history, captured at intake",
    },
    media: {
      profile: `${dir("linda")}/profile.jpg`,
      twinVideo: `${dir("linda")}/twin-video.mp4`,
      content: [`${dir("linda")}/content-01.jpg`, `${dir("linda")}/content-02.jpg`],
      articleCover: `${dir("linda")}/article-cover.jpg`,
    },
    questions: [
      "What is my business really worth to a buyer?",
      "How early should I prepare before selling?",
      "Should my employees know before I list?",
    ],
    topics: ["Valuation", "Seller readiness", "Buyer qualification", "Confidentiality"],
  },
  {
    id: "rick",
    name: "RICK",
    role: "Franchise Consultant",
    initials: "R",
    deploymentLabel: "EXAMPLE DEPLOYMENT",
    identity: {
      image: "Reference portrait set",
      voice: "Recorded voice sample",
      market: "Prospective franchise owners",
      expertise: "Franchise evaluation and matching",
      positioning: "Clear-eyed guidance before the decision",
      experience: "Career history, captured at intake",
    },
    media: {
      profile: `${dir("rick")}/profile.jpg`,
      twinVideo: `${dir("rick")}/twin-video.mp4`,
      content: [`${dir("rick")}/content-01.jpg`, `${dir("rick")}/content-02.jpg`],
    },
    questions: [
      "How do I evaluate a franchise before I commit?",
      "What should I ask a franchisor?",
      "Is franchising right for a first-time owner?",
    ],
    topics: ["Franchise evaluation", "Due diligence", "First-time owners", "Brand fit"],
  },
  {
    id: "example-broker",
    name: "EXAMPLE BROKER",
    role: "Business Broker / South Florida",
    initials: "EB",
    deploymentLabel: "DEMONSTRATION ENVIRONMENT",
    identity: {
      image: "Reference portrait set",
      voice: "Recorded voice sample",
      market: "South Florida",
      expertise: "Lower middle-market business sales",
      positioning: "Calm, specific and seller-first",
      experience: "Career history, captured at intake",
    },
    media: {
      profile: `${dir("example-broker")}/profile.jpg`,
      twinVideo: `${dir("example-broker")}/twin-video.mp4`,
      content: [],
    },
    questions: [
      "What do South Florida buyers look for?",
      "How is a business priced for sale?",
      "What happens after I accept an offer?",
    ],
    topics: ["Regional market", "Pricing", "Deal process", "Buyer expectations"],
  },
];

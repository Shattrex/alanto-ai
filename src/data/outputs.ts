/**
 * "One question → entire authority footprint" example outputs.
 * All content here is clearly EXAMPLE content. No client outcomes are claimed.
 */
export type OutputType = "video" | "article" | "linkedin" | "faq" | "youtube" | "website";

export interface OutputAsset {
  type: OutputType;
  label: string;
  title: string;
  excerpt: string;
  meta: string;
  body: string[];
  bullets?: string[];
}

export const DEFAULT_QUESTION = "How early should I prepare my company before selling it?";

export const SUGGESTED_QUESTIONS = [
  DEFAULT_QUESTION,
  "What is my business really worth to a buyer?",
  "Should my employees know before I list the company?",
];

const NOTE =
  "Example output. In a live deployment this answer is composed from the professional's captured expertise, voice and positioning, then reviewed before anything is published.";

export function buildOutputs(question: string): OutputAsset[] {
  const q = question.trim() || DEFAULT_QUESTION;
  const isDefault = q === DEFAULT_QUESTION;

  if (!isDefault) {
    const short = q.replace(/\?$/, "");
    return [
      {
        type: "video",
        label: "VIDEO",
        title: short + "?",
        excerpt: "A short on-camera answer delivered by the Digital Twin.",
        meta: "EXAMPLE SCRIPT",
        body: [NOTE],
      },
      {
        type: "article",
        label: "ARTICLE",
        title: short + ": a plain-language guide",
        excerpt: "A long-form article built from the professional's own perspective.",
        meta: "EXAMPLE ARTICLE",
        body: [NOTE],
      },
      {
        type: "linkedin",
        label: "LINKEDIN INSIGHT",
        title: short + "?",
        excerpt: "A short professional insight written in the professional's voice.",
        meta: "EXAMPLE POST",
        body: [NOTE],
      },
      {
        type: "faq",
        label: "SELLER FAQ",
        title: "Seller FAQ: " + short,
        excerpt: "A searchable question-and-answer entry for the knowledge library.",
        meta: "EXAMPLE FAQ",
        body: [NOTE],
      },
      {
        type: "youtube",
        label: "YOUTUBE ANSWER",
        title: short + "? (Answered)",
        excerpt: "A search-friendly video answer with title, description and chapters.",
        meta: "EXAMPLE VIDEO",
        body: [NOTE],
      },
      {
        type: "website",
        label: "WEBSITE RESOURCE",
        title: "Resource: " + short,
        excerpt: "A permanent page on the professional's own site.",
        meta: "EXAMPLE PAGE",
        body: [NOTE],
      },
    ];
  }

  return [
    {
      type: "video",
      label: "VIDEO",
      title: "How early should you prepare your company for sale?",
      excerpt: "A short on-camera answer delivered by the Digital Twin.",
      meta: "EXAMPLE SCRIPT",
      body: [
        "Most owners think about selling when they are ready to stop. Buyers think about your company long before that moment.",
        "The earlier you prepare, the more of the value you built is actually visible to a buyer: clean financials, documented processes, and a business that does not depend on you in every decision.",
        "So the honest answer is: sooner than feels necessary. Start with a conversation, not a listing.",
      ],
      bullets: ["Clean, consistent financials", "Documented operations", "Reduced owner dependence"],
    },
    {
      type: "article",
      label: "ARTICLE",
      title: "Preparing a company for sale: why earlier is almost always better",
      excerpt: "A long-form article built from the professional's own perspective.",
      meta: "EXAMPLE ARTICLE",
      body: [
        "A sale is the end of a process that starts well before a listing goes live. Owners who begin preparing early tend to have more options, more leverage and fewer surprises.",
        "Buyers pay for earnings they can trust and transfer. That usually means financial statements that tell one consistent story, processes that exist outside the owner's head, and a team that can operate without constant direction.",
        "None of this happens in a few weeks. Giving yourself a runway lets you fix issues on your own timeline rather than during negotiation.",
        "The practical first step is a candid assessment: what would a buyer see today, and what would they question?",
      ],
    },
    {
      type: "linkedin",
      label: "LINKEDIN INSIGHT",
      title: "The best time to prepare to sell is before you want to.",
      excerpt: "A short professional insight written in the professional's voice.",
      meta: "EXAMPLE POST",
      body: [
        "The best time to prepare your company for sale is before you want to sell it.",
        "Buyers reward clarity: consistent financials, documented operations, and a business that runs without you in every decision.",
        "Those things take time to build, and time is the one thing you cannot negotiate for later.",
        "If you are even thinking about an exit, start the conversation early.",
      ],
    },
    {
      type: "faq",
      label: "SELLER FAQ",
      title: "Seller FAQ: preparing to sell",
      excerpt: "A searchable question-and-answer entry for the knowledge library.",
      meta: "EXAMPLE FAQ",
      body: [
        "Q: How early should I prepare my company before selling it?",
        "A: Earlier than most owners expect. Preparation covers financial clarity, documented operations and reducing dependence on the owner, and each of those takes time to do well.",
        "Q: Can I prepare without committing to sell?",
        "A: Yes. Preparing improves the business whether or not you ultimately sell.",
        "Q: What is the first step?",
        "A: A candid review of how the company looks to an outside buyer today.",
      ],
    },
    {
      type: "youtube",
      label: "YOUTUBE ANSWER",
      title: "How Early Should You Prepare Your Business For Sale? (Answered)",
      excerpt: "A search-friendly video answer with title, description and chapters.",
      meta: "EXAMPLE VIDEO",
      body: [
        "A clear, short answer to one of the most common questions sellers search before they ever call a broker.",
        "Description, chapters and related questions are generated alongside the video so the answer is easy to find and easy to follow.",
      ],
      bullets: ["00:00 The short answer", "00:25 What buyers look for", "01:10 Where to start"],
    },
    {
      type: "website",
      label: "WEBSITE RESOURCE",
      title: "Resource: preparing your company for sale",
      excerpt: "A permanent page on the professional's own site.",
      meta: "EXAMPLE PAGE",
      body: [
        "A permanent, searchable resource page that sits on the professional's own website and links to the related video, article and FAQ.",
        "Over time these pages form an owned knowledge library that search engines and AI assistants can read and cite.",
      ],
      bullets: ["Overview", "Preparation checklist", "Related questions", "Talk to the professional"],
    },
  ];
}

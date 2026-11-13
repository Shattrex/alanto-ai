import { SECTION } from "../config/site";
import Reveal from "./ui/Reveal";
import { Section, SectionHeader } from "./ui/Section";

const STEPS = [
  {
    title: "We interview you",
    body: "A conversation about your experience, your market and how you talk to sellers.",
  },
  {
    title: "We build your Digital Twin",
    body: "Your answers become a library of the questions sellers ask and what you would say.",
  },
  {
    title: "We create the content",
    body: "Videos, articles and answers for your website, Google, YouTube and LinkedIn. You approve everything first.",
  },
  {
    title: "It keeps growing",
    body: "New seller questions turn into new content, so your presence builds month after month.",
  },
];

export default function HowItWorks() {
  return (
    <Section id={SECTION.how} tone="raised">
      <div className="shell">
        <SectionHeader eyebrow="HOW IT WORKS" title="FOUR SIMPLE STEPS." />
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="bg-r1 p-7 md:p-8">
              <div className="font-display text-[44px] font-semibold leading-none tracking-[-0.04em] text-ice/80">
                {i + 1}
              </div>
              <h3 className="mt-6 font-display text-[21px] font-medium leading-snug tracking-[-0.01em] text-fg">{s.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-mute">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

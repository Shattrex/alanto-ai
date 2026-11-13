import { BROKER_A, BROKER_B, SELLER_STORY } from "../data/authority";
import { cn } from "../lib/utils";
import { Check } from "./ui/Icons";
import Reveal from "./ui/Reveal";
import { Section, SectionHeader } from "./ui/Section";

function BrokerCard({ broker, strong }: { broker: typeof BROKER_A; strong: boolean }) {
  return (
    <div className={cn("relative border p-7 md:p-9", strong ? "border-ice/40 bg-r2" : "border-line bg-r1")}>
      {strong && <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-ice/70 to-transparent" />}
      <div className="label-xs mb-1">{broker.name}</div>
      <div className={cn("font-display text-[22px] font-medium", strong ? "text-fg" : "text-mute")}>{broker.kind}</div>
      <ul className="mt-6 space-y-3">
        {broker.traits.map((t) => (
          <li key={t} className="flex items-start gap-3 text-[16px] leading-snug">
            <Check size={14} className={cn("mt-1 shrink-0", strong ? "text-ice" : "text-dim")} />
            <span className={strong ? "text-fg/90" : "text-mute"}>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Simple static story: what a seller sees when comparing two brokers. */
export default function SellerStory() {
  return (
    <Section>
      <div className="shell">
        <SectionHeader eyebrow="THE SELLER'S VIEW" title="WHAT YOUR NEXT SELLER SEES." />

        <Reveal>
          <div className="mb-10 max-w-2xl space-y-1.5 text-[19px] leading-relaxed text-fg/90">
            {SELLER_STORY.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-5 md:grid-cols-2">
            <BrokerCard broker={BROKER_A} strong={false} />
            <BrokerCard broker={BROKER_B} strong />
          </div>
          <p className="mt-10 font-display text-[clamp(1.5rem,3vw,2.2rem)] font-medium tracking-[-0.02em] text-fg">
            Who would you call first?
          </p>
          <p className="label-xs mt-3 normal-case tracking-[0.03em] text-dim">An illustrative scenario, not a statistic.</p>
        </Reveal>
      </div>
    </Section>
  );
}

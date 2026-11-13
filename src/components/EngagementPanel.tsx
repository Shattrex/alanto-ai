import { ENGAGEMENT } from "../data/content";
import { CTA, SECTION } from "../config/site";
import BookButton from "./ui/BookButton";
import CornerMarks from "./ui/CornerMarks";
import { Check } from "./ui/Icons";
import Reveal from "./ui/Reveal";
import { Section, SectionHeader } from "./ui/Section";

/** One institutional engagement panel. No SaaS pricing cards. */
export default function EngagementPanel() {
  const e = ENGAGEMENT;
  return (
    <Section id={SECTION.pricing} tone="raised">
      <div className="shell">
        <SectionHeader eyebrow="PRICING" title="ONE SIMPLE ENGAGEMENT." />

        <Reveal y={36}>
          <div className="relative border border-line-strong bg-base">
            <CornerMarks size={14} inset={-5} />
            <div className="absolute inset-x-0 top-0 h-px hair-top" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(185,217,255,0.07),transparent_50%)]" />

            <div className="relative grid lg:grid-cols-[1.05fr_1fr]">
              {/* left: offer */}
              <div className="border-b border-line p-7 md:p-12 lg:border-b-0 lg:border-r">
                <div className="label-xs mb-5 flex items-center gap-2 text-ice">
                  <span className="dot-live h-1.5 w-1.5 rounded-full bg-ice" />
                  DONE FOR YOU
                </div>
                <h3 className="display text-[clamp(1.9rem,3.8vw,3.3rem)]">{e.title}</h3>
                <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-mute">{e.sub}</p>

                <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
                  <div className="bg-r1 p-6">
                    <div className="label-xs mb-1 text-dim">ONE TIME</div>
                    <div className="label-xs text-fg">{e.implementation.label}</div>
                    <div className="mt-5 font-display text-[clamp(2.4rem,4vw,3.4rem)] font-semibold leading-none tracking-[-0.04em]">
                      {e.implementation.price}
                    </div>
                    <div className="label-xs mt-3 text-dim">{e.implementation.note}</div>
                  </div>
                  <div className="bg-r1 p-6">
                    <div className="label-xs mb-1 text-dim">EVERY MONTH</div>
                    <div className="label-xs text-fg">{e.operations.label}</div>
                    <div className="mt-5 flex items-baseline gap-2 font-display text-[clamp(2.4rem,4vw,3.4rem)] font-semibold leading-none tracking-[-0.04em]">
                      {e.operations.price}
                      <span className="font-mono text-[11px] font-normal tracking-[0.18em] text-mute">{e.operations.per}</span>
                    </div>
                    <div className="label-xs mt-3 text-dim">{e.operations.note}</div>
                  </div>
                </div>

                <div className="mt-8">
                  <BookButton label={CTA.discuss} size="lg" arrow className="w-full sm:w-auto" />
                  <p className="label-xs mt-5 normal-case tracking-[0.03em] text-dim">{e.fine}</p>
                </div>
              </div>

              {/* right: included */}
              <div className="p-7 md:p-12">
                <div className="label-xs mb-6 text-fg">WHAT YOU GET</div>
                <ul className="divide-y divide-line border-y border-line">
                  {e.includes.map((it, i) => (
                    <li key={it} className="flex items-center gap-4 py-3.5">
                      <span className="label-xs w-6 text-dim">0{i + 1}</span>
                      <span className="flex-1 text-[16px] text-fg/90">{it}</span>
                      <Check size={13} className="text-ice/80" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

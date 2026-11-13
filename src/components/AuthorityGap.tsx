import { motion } from "framer-motion";
import { DIGITAL_AUTHORITY, REAL_AUTHORITY } from "../data/authority";
import { SECTION } from "../config/site";
import { EASE, cn } from "../lib/utils";
import DemoBadge from "./ui/DemoBadge";
import Reveal from "./ui/Reveal";
import { Section, SectionHeader } from "./ui/Section";

function Meter({ items, strong }: { items: { label: string; value: number }[]; strong: boolean }) {
  return (
    <ul className="space-y-5">
      {items.map((it, i) => (
        <li key={it.label}>
          <div className={cn("mb-2 text-[16px]", strong ? "text-fg" : "text-mute")}>{it.label}</div>
          <div className="relative h-[4px] bg-white/[0.06]">
            <motion.div
              className={cn(
                "absolute inset-y-0 left-0",
                strong ? "bg-gradient-to-r from-white/40 to-white shadow-[0_0_14px_rgba(255,255,255,0.35)]" : "bg-white/25"
              )}
              initial={{ width: 0 }}
              whileInView={{ width: `${it.value}%` }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.3, delay: 0.1 + i * 0.07, ease: EASE }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function AuthorityGap() {
  return (
    <Section id={SECTION.authorityGap} tone="raised">
      <div className="shell">
        <SectionHeader
          eyebrow="THE PROBLEM"
          title="WHAT YOU KNOW IS FAR AHEAD OF WHAT SELLERS CAN FIND."
          sub="After years of deals, your reputation is strong in the room. Online, most brokers look like everyone else. We call that the Authority Gap™."
        />

        <Reveal>
          <div className="mb-4 flex justify-end">
            <DemoBadge>ILLUSTRATION ONLY</DemoBadge>
          </div>
          <div className="grid gap-px border border-line bg-line md:grid-cols-2">
            <div className="relative bg-r1 p-7 md:p-10">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/60 to-transparent" />
              <div className="mb-8 font-display text-[22px] font-medium text-fg">What you've built</div>
              <Meter items={REAL_AUTHORITY.slice(0, 5)} strong />
            </div>
            <div className="relative bg-r1 p-7 md:p-10">
              <div className="mb-8 font-display text-[22px] font-medium text-mute">What sellers find online</div>
              <Meter items={DIGITAL_AUTHORITY.slice(0, 5)} strong={false} />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

import { ARTICLES, type Article } from "../data/content";
import { SECTION } from "../config/site";
import { cn } from "../lib/utils";
import { ArrowUpRight } from "./ui/Icons";
import GeoCover from "./ui/GeoCover";
import MediaSlot from "./ui/MediaSlot";
import Reveal from "./ui/Reveal";
import { Section, SectionHeader } from "./ui/Section";

function Card({ a, i, feature }: { a: Article; i: number; feature?: boolean }) {
  const live = !!a.href;
  const inner = (
    <>
      <MediaSlot
        src={a.cover}
        alt={a.title}
        label=""
        variant="asset"
        compact
        fallback={<GeoCover seed={i} />}
        className={cn("w-full border-0 border-b", feature ? "aspect-[16/9] md:aspect-auto md:min-h-[320px] md:flex-1" : "aspect-[16/9]")}
      />
      <div className={cn("flex flex-col", feature ? "p-6 md:p-8" : "p-5")}>
        <div className="mb-4 flex items-center justify-between">
          <span className="label-xs text-ice/80">{a.tag}</span>
          <span className="label-xs text-dim">0{i + 1}</span>
        </div>
        <h3
          className={cn(
            "font-display font-semibold leading-[1.1] tracking-[-0.02em] transition-colors group-hover:text-white",
            feature ? "text-[clamp(1.5rem,2.6vw,2.2rem)]" : "text-[19px]"
          )}
        >
          {a.title}
        </h3>
        <div className="mt-5 flex items-center justify-between">
          <span className="label-xs border border-line px-2 py-1">{live ? "READ" : "ARTICLE SLOT · COMING SOON"}</span>
          <ArrowUpRight className="text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ice" />
        </div>
      </div>
    </>
  );

  const cls = cn(
    "panel group flex h-full flex-col overflow-hidden transition-colors duration-500 hover:border-line-strong",
    !live && "cursor-default"
  );
  return (
    <Reveal delay={(i % 3) * 0.08} className={cn("h-full", feature && "md:col-span-2 md:row-span-2")}>
      {live ? (
        <a href={a.href} className={cls}>
          {inner}
        </a>
      ) : (
        <article className={cls}>{inner}</article>
      )}
    </Reveal>
  );
}

export default function Insights() {
  return (
    <Section id={SECTION.insights}>
      <div className="shell">
        <SectionHeader
          index="13"
          eyebrow="EDITORIAL"
          title="ALANTO INSIGHTS"
          sub="Perspective on professional authority, buyer and seller research, and the future of expertise."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Card key={a.title} a={a} i={i} feature={i === 0} />
          ))}
        </div>
      </div>
    </Section>
  );
}

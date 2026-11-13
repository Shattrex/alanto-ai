import { PROFILES, type ExampleProfile } from "../data/profiles";
import { CTA, SECTION } from "../config/site";
import BookButton from "./ui/BookButton";
import DemoBadge from "./ui/DemoBadge";
import MediaSlot from "./ui/MediaSlot";
import Reveal from "./ui/Reveal";
import { Section, SectionHeader } from "./ui/Section";

const MODULES = (p: ExampleProfile) => [
  { k: "IDENTITY", v: `${p.role} · portrait and voice profile` },
  { k: "DIGITAL TWIN", v: "On-camera presenter, built from the professional" },
  { k: "AUTHORITY ASSETS", v: "Articles, answers and explainers" },
  { k: "CONTENT SURFACES", v: "Website · LinkedIn · YouTube" },
  { k: "KNOWLEDGE SYSTEM", v: `${p.topics.slice(0, 3).join(" · ")}` },
  { k: "MEDIA", v: "Twin video and image library" },
];

function DeploymentCard({ p, i }: { p: ExampleProfile; i: number }) {
  return (
    <Reveal delay={i * 0.1} className="h-full">
      <article className="panel group flex h-full flex-col transition-colors duration-500 hover:border-line-strong">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* media */}
        <div className="relative">
          <MediaSlot
            src={p.media.twinVideo}
            kind="video"
            alt={`${p.name} Digital Twin`}
            label="DIGITAL TWIN MEDIA"
            sublabel="VIDEO SLOT"
            status="COMING SOON"
            variant="video"
            className="aspect-video w-full border-0 border-b"
          />
        </div>

        {/* identity */}
        <div className="flex items-center gap-4 border-b border-line p-5">
          <MediaSlot
            src={p.media.profile}
            alt={p.name}
            label=""
            variant="portrait"
            compact
            className="aspect-square h-16 w-16 shrink-0"
          />
          <div className="min-w-0">
            <div className="font-display text-[19px] font-semibold uppercase tracking-[0.03em]">{p.name}</div>
            <div className="mt-0.5 text-[13px] text-mute">{p.role}</div>
          </div>
        </div>
        <div className="border-b border-line px-5 py-2.5">
          <DemoBadge>{p.deploymentLabel}</DemoBadge>
        </div>

        {/* modules */}
        <dl className="flex-1 divide-y divide-line">
          {MODULES(p).map((m, idx) => (
            <div key={m.k} className="grid grid-cols-[38px_1fr] gap-x-3 px-5 py-3.5">
              <span className="label-xs pt-0.5 text-dim">0{idx + 1}</span>
              <div>
                <dt className="label-xs text-fg/90">{m.k}</dt>
                <dd className="mt-1 text-[13px] leading-snug text-mute">{m.v}</dd>
              </div>
            </div>
          ))}
        </dl>

        {/* asset strip */}
        <div className="grid grid-cols-3 gap-2 border-t border-line p-4">
          {[0, 1, 2].map((n) => {
            const src = n === 0 ? p.media.content[0] : n === 1 ? p.media.content[1] : p.media.articleCover;
            return (
              <MediaSlot
                key={n}
                src={src}
                alt={`${p.name} asset ${n + 1}`}
                label="ASSET"
                variant="asset"
                compact
                className="aspect-[4/3]"
              />
            );
          })}
        </div>
      </article>
    </Reveal>
  );
}

export default function LiveDeployments() {
  return (
    <Section id={SECTION.examples} tone="raised">
      <div className="shell">
        <SectionHeader
          index="06"
          eyebrow="EXAMPLE ENVIRONMENTS"
          title="LIVE DEPLOYMENTS"
          sub="Example environments showing how a Digital Twin and its authority assets come together for one professional."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {PROFILES.map((p, i) => (
            <DeploymentCard key={p.id} p={p} i={i} />
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-[13.5px] leading-relaxed text-mute">
            Demonstration environments. Finished media is added as it is supplied. No client results,
            leads or revenue figures are implied.
          </p>
          <BookButton label={CTA.seeForBusiness} variant="secondary" size="lg" arrow />
        </Reveal>
      </div>
    </Section>
  );
}

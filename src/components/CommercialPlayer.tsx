import { MAIN_COMMERCIAL_VIDEO, SECTION } from "../config/site";
import CornerMarks from "./ui/CornerMarks";
import Reveal from "./ui/Reveal";
import { Section, SectionHeader } from "./ui/Section";
import VideoEmbed from "./ui/VideoEmbed";

/** Primary commercial in a simple frame. */
export default function CommercialPlayer() {
  return (
    <Section id={SECTION.product} className="pt-4 md:pt-8">
      <div className="shell">
        <SectionHeader
          eyebrow="WATCH FIRST"
          align="center"
          title="WHAT ALANTO DOES, IN TWO MINUTES."
        />

        <Reveal y={30}>
          <div className="relative mx-auto max-w-[1040px]">
            <div className="pointer-events-none absolute -inset-x-10 -bottom-16 -top-10 bg-[radial-gradient(ellipse_at_50%_60%,rgba(185,217,255,0.12),transparent_65%)]" />
            <div className="relative border border-line-strong bg-r1 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
              <CornerMarks size={14} inset={-5} />
              <div className="relative aspect-video w-full bg-black">
                <VideoEmbed src={MAIN_COMMERCIAL_VIDEO} title="Alanto: main commercial" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

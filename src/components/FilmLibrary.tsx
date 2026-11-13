import { useState } from "react";
import { FILMS, type Film } from "../data/content";
import { MAIN_COMMERCIAL_VIDEO, SECTION } from "../config/site";
import { cn } from "../lib/utils";
import AlantoLogo from "./AlantoLogo";
import GeoCover from "./ui/GeoCover";
import { Play } from "./ui/Icons";
import MediaSlot from "./ui/MediaSlot";
import Modal from "./ui/Modal";
import Reveal from "./ui/Reveal";
import { Section, SectionHeader } from "./ui/Section";
import VideoEmbed from "./ui/VideoEmbed";

const FEATURED: Film = {
  title: "Alanto: Digital Twin Infrastructure",
  featured: true,
  src: MAIN_COMMERCIAL_VIDEO,
};

function Thumb({ film, seed, onPlay }: { film: Film; seed: number; onPlay: (f: Film) => void }) {
  const playable = !!film.src;
  return (
    <Reveal
      delay={(seed % 3) * 0.08}
      className={cn("h-full", film.featured && "md:col-span-2 md:row-span-2", seed >= 5 && "md:col-span-2")}
    >
      <button
        disabled={!playable}
        onClick={() => onPlay(film)}
        aria-label={playable ? `Play ${film.title}` : `${film.title} (coming soon)`}
        className={cn(
          "group relative block h-full w-full overflow-hidden border border-line bg-r1 text-left transition-colors duration-500",
          playable ? "cursor-pointer hover:border-ice/40" : "cursor-default"
        )}
      >
        <div className={cn("relative w-full", film.featured ? "aspect-video md:h-full md:min-h-[360px]" : "aspect-video")}>
          <div className="absolute inset-0">
            <MediaSlot
              src={film.thumb}
              alt={film.title}
              label=""
              variant="video"
              compact
              fallback={<GeoCover seed={seed + 2} />}
              className="h-full w-full border-0"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/90 via-base/20 to-base/40" />

          {/* top row */}
          <div className="absolute inset-x-4 top-4 flex items-start justify-between">
            <span className="label-xs text-fg/80">{String(seed + 1).padStart(2, "0")}</span>
            {film.featured ? (
              <span className="border border-ice/40 bg-ice/10 px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ice">FEATURED</span>
            ) : (
              <span className="border border-line-strong bg-base/60 px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.2em] text-fg/80 backdrop-blur">COMING SOON</span>
            )}
          </div>

          {/* play */}
          <div className="absolute inset-0 grid place-items-center">
            <span
              className={cn(
                "grid place-items-center rounded-full border transition-all duration-500",
                film.featured ? "h-20 w-20" : "h-12 w-12",
                playable ? "border-fg/60 bg-base/50 text-fg group-hover:scale-110 group-hover:border-ice group-hover:text-ice" : "border-line-strong text-dim"
              )}
            >
              <Play size={film.featured ? 20 : 13} />
            </span>
          </div>

          {/* bottom */}
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
            <div className="min-w-0">
              {film.featured && <AlantoLogo variant="symbol" height={14} className="mb-3 opacity-80" />}
              <div className={cn("font-display font-semibold uppercase leading-[1.05] tracking-[-0.01em]", film.featured ? "text-[clamp(1.25rem,2.2vw,1.9rem)]" : "text-[15px]")}>
                {film.title}
              </div>
            </div>
            <span className="label-xs shrink-0 text-dim">{film.featured ? "OVERVIEW" : "FILM"}</span>
          </div>
        </div>
      </button>
    </Reveal>
  );
}

export default function FilmLibrary() {
  const [playing, setPlaying] = useState<Film | null>(null);
  const all = [FEATURED, ...FILMS];

  return (
    <Section id={SECTION.films} tone="raised">
      <div className="shell">
        <SectionHeader
          index="14"
          eyebrow="FILM LIBRARY"
          title="ALANTO FILMS"
          sub="A growing library of short films on Digital Twin infrastructure and the Authority Gap."
        />
        <div className="grid gap-4 md:grid-cols-4 md:gap-5">
          {all.map((f, i) => (
            <Thumb key={f.title} film={f} seed={i} onPlay={setPlaying} />
          ))}
        </div>

        <Modal open={!!playing} onClose={() => setPlaying(null)} title={playing?.title ?? ""} eyebrow="ALANTO FILMS" size="xl">
          {playing?.src && (
            <div className="relative aspect-video w-full bg-black">
              <VideoEmbed src={playing.src} title={playing.title} />
            </div>
          )}
        </Modal>
      </div>
    </Section>
  );
}

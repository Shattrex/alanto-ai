import { ImageHanger, VideoShowcase } from "../components/MediaHangers";
import { goTo } from "../nav";

export default function DemoPage({
  ready,
  onGenerate,
}: {
  ready: boolean;
  onGenerate: () => void;
}) {
  if (!ready) return <LockedState onGenerate={onGenerate} />;

  return (
    <div>
      <section className="px-5 pb-6 pt-28 sm:px-8 sm:pt-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-ember-500">
            Image posts · swipe the hanger
          </p>
          <h2 className="head head-glow mt-3 text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.06]">
            Three premium posts. His positioning. Not clipart.
          </h2>
        </div>
        <div className="mt-10">
          <ImageHanger />
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-ember-500">
            Alter ego video · press play
          </p>
          <h2 className="head head-glow mt-3 text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.06]">
            His face. His voice. Zero camera time.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-ink-400">
            The office-authority avatar, shot vertical for feeds. The conversational avatar lands
            next in the build.
          </p>
        </div>
        <div className="mt-10">
          <VideoShowcase />
        </div>
      </section>

      <section className="px-5 pb-20 text-center sm:px-8">
        <button
          type="button"
          onClick={() => goTo("usecase")}
          className="inline-flex items-center gap-2 rounded-xl border border-ink-700/15 bg-white px-7 py-3.5 text-sm font-semibold text-ink-900 shadow-card transition hover:border-ember-400/50"
        >
          See what this does to his market
          <span aria-hidden>→</span>
        </button>
      </section>
    </div>
  );
}

function LockedState({ onGenerate }: { onGenerate: () => void }) {
  return (
    <section className="flex min-h-[80vh] items-center px-5 pt-28 sm:px-8">
      <div className="mx-auto max-w-xl rounded-[28px] border border-ink-700/10 bg-white px-6 py-14 text-center shadow-card sm:px-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cream-200 text-ember-500">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden>
            <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
            <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
          </svg>
        </span>
        <h2 className="head head-glow mt-5 text-[clamp(1.8rem,4.4vw,2.6rem)] leading-[1.08]">
          The alter ego isn’t generated yet
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-[15px] text-ink-400">
          Run the build once and this page fills with Richard’s posts and video.
        </p>
        <button
          type="button"
          onClick={onGenerate}
          className="mt-7 inline-flex items-center gap-2.5 rounded-xl bg-ember-400 px-8 py-4 text-[15px] font-semibold text-white shadow-ember transition hover:bg-ember-500"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z" />
          </svg>
          Generate Alter EGO
        </button>
      </div>
    </section>
  );
}

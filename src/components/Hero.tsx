import { useEffect, useState } from "react";
import { PORTRAITS, RICHARD_BIO } from "../content";
import Typewriter from "./Typewriter";

const TYPING_START_MS = 1450;

export default function Hero({
  typedDone,
  onTypedDone,
  onGenerate,
}: {
  typedDone: boolean;
  onTypedDone: () => void;
  onGenerate: () => void;
}) {
  const [startTyping, setStartTyping] = useState(typedDone);

  useEffect(() => {
    if (typedDone) return;
    const id = window.setTimeout(() => setStartTyping(true), TYPING_START_MS);
    return () => window.clearTimeout(id);
  }, [typedDone]);

  return (
    <section id="about" className="relative overflow-hidden px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-ink-700/[0.06] blur-2xl" />
      <div className="pointer-events-none absolute -right-16 -top-10 h-80 w-80 rounded-full bg-ink-700/[0.05] blur-2xl" />

      <div className="relative mx-auto max-w-5xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-ember-500">
          Client dashboard · live alter ego
        </p>
        <h1 className="head head-shadow mt-4 text-center text-[clamp(2.75rem,8vw,5.25rem)] leading-[1.02]">
          Richard Morgin
        </h1>
        <p className="mt-3 text-center text-[12px] font-semibold uppercase tracking-[0.28em] text-ink-400">
          Franchise Consultant &amp; Transition Mentor
        </p>
        <p className="mt-1 text-center font-script text-4xl text-ink-700">
          The right guidance changes everything
        </p>

        <div
          className="frame-pop mt-11 rounded-[30px] border border-ink-700/12 bg-white p-3 shadow-card sm:p-4"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-center justify-between px-2.5 pb-3 pt-1.5">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.26em] text-ember-500">
              Source identity · 2 reference styles
            </p>
            <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-ink-400">
              <span className="h-1.5 w-1.5 rounded-full bg-ember-400" />
              Captured
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {PORTRAITS.map((p, i) => (
              <figure
                key={p.src}
                className="frame-pop overflow-hidden rounded-[22px] border border-ink-700/10 bg-cream-200 shadow-sm"
                style={{ animationDelay: `${0.38 + i * 0.22}s` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={p.src}
                    alt={p.label}
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/95 via-ink-900/55 to-transparent p-5 pt-20">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-200">
                      {p.label}
                    </p>
                    <p className="mt-1 text-sm text-white/90">{p.caption}</p>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div
          className="reveal relative mt-9 rounded-[24px] border border-ink-700/10 bg-white/70 p-6 shadow-card backdrop-blur-sm sm:p-9"
          style={{ animationDelay: "1.05s" }}
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-ember-500">
            System brief · {typedDone ? "complete" : startTyping ? "writing" : "reading identity"}
          </p>
          <Typewriter
            text={RICHARD_BIO}
            instant={typedDone}
            start={startTyping}
            onDone={onTypedDone}
          />
        </div>

        <div id="demo" className="relative mt-10 flex min-h-[88px] items-center justify-center">
          {typedDone && (
            <div className="reveal">
              <button
                type="button"
                onClick={onGenerate}
                className="float-y inline-flex items-center gap-2.5 rounded-xl bg-ember-400 px-8 py-4 text-[15px] font-semibold text-white shadow-ember transition-colors hover:bg-ember-500"
              >
                <Bolt />
                Generate Alter EGO
              </button>
            </div>
          )}
        </div>
      </div>

      <aside className="absolute bottom-8 right-5 hidden max-w-[240px] rounded-xl border border-ember-400/40 bg-cream-50/90 px-4 py-3 text-left shadow-card sm:block">
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-ink-900">Warning</p>
        <p className="mt-0.5 text-xs text-ink-500">May cause unfair competitive advantage.</p>
      </aside>
    </section>
  );
}

function Bolt() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z" />
    </svg>
  );
}

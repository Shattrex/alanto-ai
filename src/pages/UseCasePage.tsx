import { useState } from "react";
import { USE_CASE_LINES } from "../content";
import NYCMap from "../components/NYCMap";
import { goTo } from "../nav";

const afterFromUrl = new URLSearchParams(window.location.search).get("after") === "1";

export default function UseCasePage() {
  const [after, setAfter] = useState(afterFromUrl);

  return (
    <section id="usecase" className="px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-ember-500">
          Use case · one day in New York
        </p>
        <h2 className="head head-glow mt-3 text-center text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.06]">
          How one Alter Ego attracts sellers — and closes more deals
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-ink-400">
          Without the Alter Ego, Richard stands in the market while potential sellers orbit past him.
          After it goes live, they move toward him — because he is already in the conversation.
        </p>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setAfter(true)}
            disabled={after}
            className={`rounded-xl px-7 py-3.5 text-sm font-semibold shadow-ember transition ${
              after
                ? "bg-ink-900 text-white"
                : "bg-ember-400 text-white hover:bg-ember-500 active:scale-[0.98]"
            }`}
          >
            {after ? "Alter Ego is live" : "After Alter EGO"}
          </button>
        </div>

        <div className="mt-8">
          <NYCMap after={after} />
        </div>

        <ol className="mt-12 space-y-4">
          {USE_CASE_LINES.map((line, i) => (
            <li
              key={line}
              className="reveal-x flex gap-4 rounded-2xl border border-ink-700/10 bg-white px-5 py-4 shadow-sm"
              style={{ animationDelay: `${0.1 + i * 0.09}s` }}
            >
              <span className="font-display text-2xl text-ember-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="pt-1 text-[15px] leading-relaxed text-ink-700">{line}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => goTo("start")}
            className="inline-flex items-center gap-2 rounded-xl border border-ink-700/15 bg-white px-7 py-3.5 text-sm font-semibold text-ink-900 shadow-card transition hover:border-ember-400/50"
          >
            See the offer
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

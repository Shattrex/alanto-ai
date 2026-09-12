import { BOOKING_URL } from "../content";
import Offer from "../components/Offer";

export default function StartPage() {
  return (
    <div>
      <Offer />

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-ember-400/30 bg-cream-50 px-6 py-12 text-center shadow-card sm:px-12">
          <h2 className="head head-glow text-[clamp(1.9rem,4.6vw,3rem)] leading-[1.05]">
            Ready to put Richard everywhere at once?
          </h2>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2.5 rounded-xl bg-ember-400 px-9 py-4 text-[15px] font-semibold text-white shadow-ember transition hover:bg-ember-500"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z" />
            </svg>
            Claim this Alter Ego now
          </a>
          <p className="mt-3 text-xs text-ink-400">30-minute call · no cameras, no scripts</p>
        </div>
      </section>
    </div>
  );
}

import { BOOKING_URL, OFFER_INCLUDES } from "../content";

export default function Offer() {
  return (
    <section id="offer" className="px-5 pb-20 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-ember-500">
          The install
        </p>
        <h2 className="head head-glow mt-3 text-center text-[clamp(2.2rem,5.2vw,3.6rem)] leading-[1.05]">
          One Alter Ego. Six months. A market that comes to you.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-ink-400">
          We don’t sell posts. We install a second version of you that attracts sellers while you run the business.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-ink-700/10 bg-white p-7 shadow-card sm:p-10">
            <div className="grid grid-cols-2 gap-4">
              <Price label="Upfront" value="$2,500" hint="To install the system" delay={0.05} />
              <Price label="Monthly" value="$1,200" hint="To run and compound it" delay={0.15} />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <Price
                label="Contract"
                value="6 months"
                hint="Partnership, not a one-off"
                delay={0.25}
              />
              <Price
                label="Proof"
                value="1 deal closed"
                hint="The benchmark inside the term"
                delay={0.35}
              />
            </div>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-ember-400 py-4 text-[15px] font-semibold text-white shadow-ember transition hover:bg-ember-500"
            >
              <Bolt />
              Claim this Alter Ego now
            </a>
            <p className="mt-3 text-center text-xs text-ink-400">
              Books a 30-minute call · We don’t compete — we obsolete.
            </p>
          </div>

          <div className="rounded-[28px] border border-ink-700/10 bg-cream-50 p-7 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ember-500">
              Everything included
            </p>
            <ul className="mt-5 space-y-4">
              {OFFER_INCLUDES.map((item) => (
                <li key={item.title}>
                  <p className="text-sm font-semibold text-ink-900">{item.title}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-ink-400">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Price({
  label,
  value,
  hint,
  delay = 0,
}: {
  label: string;
  value: string;
  hint: string;
  delay?: number;
}) {
  return (
    <div
      className="reveal rounded-2xl border border-ink-700/10 bg-cream-100 px-4 py-5"
      style={{ animationDelay: `${delay}s` }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-400">{label}</p>
      <p className="mt-1 font-display text-3xl text-ink-900 sm:text-4xl">{value}</p>
      <p className="mt-1 text-xs text-ink-400">{hint}</p>
    </div>
  );
}

function Bolt() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z" />
    </svg>
  );
}

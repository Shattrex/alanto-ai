import { CAL_URL } from "../config/site";
import Modal from "./ui/Modal";

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Shown while CAL_URL is not configured. */
export default function BookingModal({ open, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="PRIVATE DEMO" eyebrow="ALANTO / BOOKING" size="lg">
      <div className="grid md:grid-cols-[1fr_1.1fr]">
        <div className="border-b border-line p-6 md:border-b-0 md:border-r md:p-8">
          <div className="label mb-5 flex items-center gap-2 text-ice/80">
            <span className="dot-live h-1.5 w-1.5 rounded-full bg-ice" />
            30 MIN · PRIVATE
          </div>
          <p className="font-display text-2xl font-semibold uppercase leading-[1.05] tracking-[-0.02em] md:text-3xl">
            30-minute Alanto deployment consultation.
          </p>
          <p className="mt-5 text-[14px] leading-relaxed text-mute">
            A focused conversation about your market, your expertise and what a Digital Twin
            deployment would look like for you.
          </p>
          <ul className="mt-6 space-y-2.5 text-[13px] text-mute">
            {["Authority Gap review", "Digital Twin walkthrough", "Scope and qualification"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-px w-5 bg-line-strong" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Calendar slot */}
        <div className="relative p-6 md:p-8">
          <div className="label-xs mb-4 flex items-center justify-between">
            <span>SELECT A TIME</span>
            <span className="text-dim">CAL.COM</span>
          </div>
          <div className="grid grid-cols-7 gap-1.5 opacity-50" aria-hidden>
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square border ${
                  [9, 10, 16, 17, 23, 24].includes(i)
                    ? "border-ice/30 bg-ice/[0.05]"
                    : "border-line"
                }`}
              />
            ))}
          </div>
          <div className="relative mt-5 border border-dashed border-line-strong px-4 py-5 text-center">
            <div className="label text-fg">CALENDAR CONNECTION COMING HERE.</div>
            {import.meta.env.DEV && (
              <div className="label-xs mt-2 normal-case tracking-normal text-dim">
                Dev note: set CAL_URL in src/config/site.ts (currently "{CAL_URL}").
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

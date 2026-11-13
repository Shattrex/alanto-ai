import { HERO_NODES } from "../data/authority";
import SignalNetwork from "./ui/SignalNetwork";

/** Cinematic hero stage: Digital Twin at the centre, authority surfaces around it. */
export default function HeroAuthorityNetwork() {
  return (
    <div className="relative">
      {/* top label row */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-1 md:px-2">
        <div>
          <div className="label-xs text-fg">AUTHORITY ENGINE</div>
          <div className="label-xs mt-1.5 flex items-center gap-2 text-ice">
            <span className="dot-live h-1.5 w-1.5 rounded-full bg-ice" />
            ACTIVE
          </div>
        </div>
        <div className="hidden text-right sm:block">
          <div className="label-xs">SYSTEM STATUS</div>
          <div className="label-xs mt-1.5 text-fg/80">ALL SURFACES CONNECTED</div>
        </div>
      </div>

      <div className="pt-16 md:pt-4">
        <SignalNetwork nodes={HERO_NODES} />
      </div>
    </div>
  );
}

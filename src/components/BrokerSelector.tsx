import type { ExampleProfile } from "../data/profiles";
import { cn } from "../lib/utils";
import { useAssetExists } from "../hooks/useAssetExists";

function Avatar({ profile }: { profile: ExampleProfile }) {
  const state = useAssetExists(profile.media.profile);
  return (
    <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden border border-line-strong bg-r3">
      {state === "yes" ? (
        <img src={profile.media.profile} alt="" className="h-full w-full object-cover" />
      ) : (
        <span className="font-display text-[13px] font-semibold tracking-wide text-fg/80">{profile.initials}</span>
      )}
    </span>
  );
}

interface Props {
  profiles: ExampleProfile[];
  selectedId: string;
  onSelect: (id: string) => void;
  disabled?: boolean;
}

/** Lab sidebar (desktop) / horizontal scroller (mobile) to pick an example profile. */
export default function BrokerSelector({ profiles, selectedId, onSelect, disabled }: Props) {
  return (
    <div>
      <div className="label-xs mb-3 hidden lg:block">EXAMPLE PROFILES</div>
      <div
        role="tablist"
        aria-label="Example profiles"
        className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {profiles.map((p) => {
          const active = p.id === selectedId;
          return (
            <button
              key={p.id}
              role="tab"
              aria-selected={active}
              disabled={disabled && !active}
              onClick={() => onSelect(p.id)}
              className={cn(
                "group relative flex min-w-[230px] snap-start items-center gap-3.5 border p-3 text-left transition-all duration-300 lg:min-w-0",
                active ? "border-ice/40 bg-ice/[0.05]" : "border-line bg-r1 hover:border-line-strong",
                disabled && !active && "opacity-40"
              )}
            >
              {active && <span className="absolute inset-y-0 left-0 w-px bg-ice shadow-[0_0_10px_rgba(185,217,255,0.8)]" />}
              <Avatar profile={p} />
              <span className="min-w-0">
                <span className="block font-display text-[14px] font-semibold uppercase tracking-[0.06em]">{p.name}</span>
                <span className="mt-0.5 block truncate text-[12px] text-mute">{p.role}</span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="label-xs mt-4 hidden normal-case leading-relaxed tracking-[0.03em] text-dim lg:block">
        Example profiles. Finished photos, video and content are supplied separately.
      </p>
    </div>
  );
}

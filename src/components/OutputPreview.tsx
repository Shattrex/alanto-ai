import type { OutputAsset } from "../data/outputs";
import GeoCover from "./ui/GeoCover";
import DemoBadge from "./ui/DemoBadge";
import MediaSlot from "./ui/MediaSlot";
import { Check } from "./ui/Icons";

const Body = ({ lines }: { lines: string[] }) => (
  <div className="space-y-4 text-[15px] leading-relaxed text-fg/85">
    {lines.map((l, i) => (
      <p key={i}>{l}</p>
    ))}
  </div>
);

const Bullets = ({ items }: { items?: string[] }) =>
  items && items.length > 0 ? (
    <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-3 text-[13.5px] text-mute">
          <Check size={12} className="mt-1 shrink-0 text-ice" />
          {b}
        </li>
      ))}
    </ul>
  ) : null;

/** Polished preview body for each generated asset type (all example content). */
export default function OutputPreview({ asset }: { asset: OutputAsset }) {
  return (
    <div className="p-5 md:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <DemoBadge>EXAMPLE CONTENT</DemoBadge>
        <span className="label-xs">{asset.meta}</span>
      </div>

      {(asset.type === "video" || asset.type === "youtube") && (
        <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
          <MediaSlot
            alt={asset.title}
            label={asset.type === "youtube" ? "YOUTUBE ANSWER" : "DIGITAL TWIN MEDIA"}
            sublabel="VIDEO SLOT"
            status="EXAMPLE"
            variant="video"
            className="aspect-video w-full"
          />
          <div>
            <h4 className="mb-4 font-display text-xl font-semibold leading-tight tracking-[-0.01em]">{asset.title}</h4>
            <Body lines={asset.body} />
            <Bullets items={asset.bullets} />
          </div>
        </div>
      )}

      {asset.type === "article" && (
        <article className="mx-auto max-w-2xl">
          <div className="relative mb-6 aspect-[16/7] overflow-hidden border border-line">
            <GeoCover seed={0} />
          </div>
          <div className="label-xs mb-3 text-ice/80">ARTICLE</div>
          <h4 className="mb-5 font-display text-2xl font-semibold leading-tight tracking-[-0.015em] md:text-3xl">{asset.title}</h4>
          <Body lines={asset.body} />
        </article>
      )}

      {asset.type === "linkedin" && (
        <div className="mx-auto max-w-xl border border-line bg-base p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-r3 font-display text-[13px] font-semibold">EP</span>
            <div>
              <div className="text-[14px] font-semibold">Example Professional</div>
              <div className="text-[12px] text-mute">Business Broker · Example profile</div>
            </div>
          </div>
          <div className="space-y-3 text-[14.5px] leading-relaxed text-fg/90">
            {asset.body.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
          <div className="mt-5 flex gap-6 border-t border-line pt-4">
            {["Like", "Comment", "Repost", "Send"].map((a) => (
              <span key={a} className="label-xs">{a}</span>
            ))}
          </div>
        </div>
      )}

      {asset.type === "faq" && (
        <div className="mx-auto max-w-2xl divide-y divide-line border border-line">
          {asset.body.map((l, i) => {
            const isQ = l.startsWith("Q:");
            return (
              <div key={i} className={isQ ? "bg-r2 px-5 py-4" : "px-5 py-4"}>
                <span className={`label-xs mr-3 ${isQ ? "text-ice" : "text-dim"}`}>{isQ ? "Q" : "A"}</span>
                <span className={isQ ? "font-medium text-fg" : "text-[14.5px] leading-relaxed text-fg/80"}>{l.slice(3)}</span>
              </div>
            );
          })}
        </div>
      )}

      {asset.type === "website" && (
        <div className="overflow-hidden border border-line-strong bg-base">
          <div className="flex items-center gap-3 border-b border-line bg-r1 px-4 py-2.5">
            <span className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-2 w-2 rounded-full bg-white/15" />
              ))}
            </span>
            <span className="flex-1 truncate border border-line bg-base px-3 py-1 font-mono text-[11px] text-mute">
              yourname.com/resources/preparing-to-sell
            </span>
          </div>
          <div className="grid gap-8 p-6 md:grid-cols-[1fr_220px] md:p-9">
            <div>
              <div className="label-xs mb-3 text-ice/80">RESOURCE</div>
              <h4 className="mb-5 font-display text-2xl font-semibold leading-tight tracking-[-0.015em] md:text-3xl">{asset.title}</h4>
              <Body lines={asset.body} />
            </div>
            <aside className="border-t border-line pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <div className="label-xs mb-3">ON THIS PAGE</div>
              <ul className="space-y-2.5 text-[13px] text-mute">
                {(asset.bullets ?? []).map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="h-px w-3 bg-line-strong" />
                    {b}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      )}

      <p className="label-xs mt-8 normal-case leading-relaxed tracking-[0.03em] text-dim">
        Example content shown for demonstration. It does not represent a real client result.
      </p>
    </div>
  );
}

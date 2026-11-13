import { useState } from "react";
import { cn } from "../../lib/utils";

const isFile = (src: string) => /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(src);

/**
 * Source-agnostic player. Pass any of:
 *  - Google Drive /preview, YouTube / Vimeo embed URL, Bunny / Cloudflare Stream iframe URL
 *  - a direct .mp4 / .webm file (local /public, Vercel Blob, CDN)
 * Fills its (16:9) parent.
 */
export default function VideoEmbed({
  src,
  title,
  poster,
  className,
}: {
  src: string;
  title: string;
  poster?: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("absolute inset-0 bg-black", className)}>
      {/* Branded loading state behind the player */}
      <div className="absolute inset-0 grid place-items-center bg-gradient-to-b from-r3 to-base">
        <div className="grid-bg-sm absolute inset-0 opacity-70" />
        <div className="relative flex flex-col items-center gap-3">
          <span className="label flex items-center gap-2 text-fg/80">
            <span className="dot-live h-1.5 w-1.5 rounded-full bg-ice" />
            LOADING PRESENTATION
          </span>
          <span className="relative block h-px w-40 overflow-hidden bg-line-strong">
            <span className="scan-bar absolute inset-y-0 left-0 block w-1/4 bg-ice" />
          </span>
        </div>
      </div>

      {isFile(src) ? (
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-contain"
          onLoadedData={() => setLoaded(true)}
        />
      ) : (
        <>
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          referrerPolicy="no-referrer"
          className={cn(
            "absolute inset-0 h-full w-full border-0 transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setLoaded(true)}
        />
        {/* Keeps viewers inside the Alanto frame: blocks Drive's "open in new window" corner */}
        {src.includes("drive.google.com") && (
          <div className="absolute right-0 top-0 z-10 h-14 w-16" aria-hidden />
        )}
        </>
      )}
    </div>
  );
}

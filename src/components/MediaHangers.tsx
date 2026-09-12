import { useState } from "react";
import { ALTER_VIDEOS, IMAGE_POSTS } from "../content";
import Hanger from "./Hanger";

export function ImageHanger() {
  return (
    <Hanger
      height="h-[470px] sm:h-[500px]"
      items={IMAGE_POSTS.map((p, i) => ({
        key: p.src,
        render: () => (
          <article className="overflow-hidden rounded-[22px] border border-ink-700/10 bg-white shadow-card">
            <img src={p.src} alt={p.title} className="aspect-square w-full object-cover" />
            <div className="px-5 py-4">
              <p className="text-[13px] font-extrabold text-ember-400">AI Post #{i + 1}</p>
              <h3 className="mt-1 text-[15px] font-semibold leading-snug text-ink-900">{p.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-400">{p.sub}</p>
            </div>
          </article>
        ),
      }))}
    />
  );
}

export function VideoShowcase() {
  const video = ALTER_VIDEOS[0];
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mx-auto w-[min(88vw,340px)]">
      <article className="frame-pop overflow-hidden rounded-[26px] border border-ink-700/12 bg-white p-2.5 shadow-card">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[20px] bg-ink-900">
          {!playing ? (
            <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0">
              <img src={video.poster} alt="" className="h-full w-full object-cover object-top" />
              <span className="absolute inset-0 bg-ink-900/35" />
              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ember-400 text-white shadow-ember transition group-hover:scale-105">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          ) : video.file ? (
            <video
              src={video.file}
              poster={video.poster}
              controls
              autoPlay
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full bg-ink-900 object-contain"
            />
          ) : (
            <iframe
              title={video.title}
              src={`https://drive.google.com/file/d/${video.driveId}/preview`}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          )}
        </div>
        <div className="px-3.5 pb-2 pt-3.5">
          <p className="text-[13px] font-extrabold text-ember-400">{video.title}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-400">{video.sub}</p>
        </div>
      </article>
    </div>
  );
}

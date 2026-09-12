import { useCallback, useRef, useState, type PointerEvent, type ReactNode } from "react";

type Item = { key: string; render: (active: boolean) => ReactNode };

export default function Hanger({
  items,
  height = "h-[460px] sm:h-[500px]",
  cardWidth = "w-[min(82vw,360px)]",
  spread = 58,
}: {
  items: Item[];
  height?: string;
  cardWidth?: string;
  spread?: number;
}) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const drag = useRef({ x: 0, down: false });

  const go = useCallback((dir: number) => setActive((a) => (a + dir + n) % n), [n]);

  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("iframe, button, a")) return;
    drag.current = { x: e.clientX, down: true };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.down) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 72) {
      go(dx < 0 ? 1 : -1);
      drag.current.x = e.clientX;
    }
  };
  const onPointerUp = () => {
    drag.current.down = false;
  };

  return (
    <div className="select-none">
      <div
        className={`hanger-stage relative mx-auto max-w-5xl cursor-grab touch-pan-y active:cursor-grabbing ${height}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {items.map((item, i) => {
          const o = offsetOf(i);
          const abs = Math.abs(o);
          const isActive = o === 0;
          return (
            <div
              key={item.key}
              className={`hanger-card absolute left-1/2 top-0 transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${cardWidth}`}
              style={{
                // -50% keeps the card centered on the stage; the rest fans the hanger out.
                transform: `translateX(calc(-50% + ${o * spread}%)) rotateY(${o * -38}deg) translateZ(${abs ? -140 : 40}px) scale(${isActive ? 1 : 0.82})`,
                opacity: abs > 1 ? 0 : isActive ? 1 : 0.48,
                zIndex: 20 - abs,
                filter: isActive ? "none" : "brightness(0.72)",
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              {item.render(isActive)}
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-center gap-3">
        <NavBtn dir="prev" onClick={() => go(-1)} />
        <div className="flex gap-1.5">
          {items.map((item, i) => (
            <button
              key={item.key}
              type="button"
              aria-label={`Show ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-ember-400" : "w-1.5 bg-ink-700/20"
              }`}
            />
          ))}
        </div>
        <NavBtn dir="next" onClick={() => go(1)} />
      </div>
    </div>
  );
}

function NavBtn({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-700/15 bg-white text-ink-700 shadow-sm transition hover:border-ember-400/50 hover:text-ember-500"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {dir === "prev" ? <path d="M15 18 9 12l6-6" /> : <path d="m9 18 6-6-6-6" />}
      </svg>
    </button>
  );
}

import { useEffect, useRef, useState } from "react";

const TICK_MS = 14;
const CHARS_PER_TICK = 3;

export default function Typewriter({
  text,
  instant = false,
  start = true,
  onDone,
}: {
  text: string;
  instant?: boolean;
  start?: boolean;
  onDone?: () => void;
}) {
  const [out, setOut] = useState(instant ? text : "");
  const [done, setDone] = useState(instant);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (instant) {
      setOut(text);
      setDone(true);
      return;
    }
    if (!start) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += CHARS_PER_TICK;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
        onDoneRef.current?.();
      }
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [text, instant, start]);

  return (
    <p className="min-h-[1.75em] text-[15px] leading-[1.75] text-ink-500 sm:text-base sm:leading-[1.8]">
      {out}
      {!done && <span className="caret" aria-hidden />}
    </p>
  );
}

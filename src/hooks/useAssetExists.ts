import { useEffect, useState } from "react";

export type AssetState = "checking" | "yes" | "no";

const cache = new Map<string, Promise<boolean>>();

/**
 * Checks whether a static file really exists. Dev servers and SPA hosts answer
 * missing files with index.html (HTTP 200), so we also reject text/* responses.
 */
function probe(src: string): Promise<boolean> {
  let p = cache.get(src);
  if (!p) {
    p = fetch(src, { method: "HEAD" })
      .then((r) => r.ok && !(r.headers.get("content-type") ?? "").startsWith("text/"))
      .catch(() => false);
    cache.set(src, p);
  }
  return p;
}

export function useAssetExists(src?: string): AssetState {
  const [state, setState] = useState<AssetState>(src ? "checking" : "no");

  useEffect(() => {
    if (!src) {
      setState("no");
      return;
    }
    let alive = true;
    setState("checking");
    probe(src).then((ok) => alive && setState(ok ? "yes" : "no"));
    return () => {
      alive = false;
    };
  }, [src]);

  return state;
}

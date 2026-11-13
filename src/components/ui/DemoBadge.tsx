import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

/** Honesty label: marks anything that is sample / illustrative / simulated. */
export default function DemoBadge({
  children = "DEMO DATA",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 border border-ice/25 bg-ice/[0.05] px-2 py-[3px] font-mono text-[9.5px] uppercase tracking-[0.2em] text-ice/90",
        className
      )}
    >
      <span className="h-1 w-1 rounded-full bg-ice" />
      {children}
    </span>
  );
}

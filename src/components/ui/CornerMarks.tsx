import { cn } from "../../lib/utils";

/** Thin technical corner markers for product-UI frames. */
export default function CornerMarks({
  size = 10,
  inset = -1,
  className,
}: {
  size?: number;
  inset?: number;
  className?: string;
}) {
  const s = { width: size, height: size };
  const common = "pointer-events-none absolute border-fg/50";
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      <span className={cn(common, "border-l border-t")} style={{ ...s, left: inset, top: inset }} />
      <span className={cn(common, "border-r border-t")} style={{ ...s, right: inset, top: inset }} />
      <span className={cn(common, "border-b border-l")} style={{ ...s, left: inset, bottom: inset }} />
      <span className={cn(common, "border-b border-r")} style={{ ...s, right: inset, bottom: inset }} />
    </div>
  );
}

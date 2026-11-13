import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import Reveal from "./Reveal";

interface SectionProps {
  id?: string;
  tone?: "base" | "raised";
  className?: string;
  children: ReactNode;
}

export function Section({ id, tone = "base", className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-x-clip py-16 md:py-24",
        tone === "raised" && "border-y border-line bg-r1/60",
        className
      )}
    >
      {children}
    </section>
  );
}

interface HeaderProps {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ index, eyebrow, title, sub, align = "left", className }: HeaderProps) {
  const center = align === "center";
  return (
    <Reveal className={cn("mb-10 md:mb-12", center && "text-center", className)}>
      <div className={cn("label mb-6 flex items-center gap-4", center && "justify-center")}>
        {index && (
          <>
            <span className="text-ice">{index}</span>
            <span className="h-px w-10 bg-line-strong" />
          </>
        )}
        <span>{eyebrow}</span>
      </div>
      <h2
        className={cn(
          "display text-[clamp(1.9rem,4.2vw,3.5rem)] text-balance",
          center && "mx-auto max-w-5xl"
        )}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[17px] leading-relaxed text-mute md:text-[19px]",
            center && "mx-auto"
          )}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}

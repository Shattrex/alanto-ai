import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
}

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[11px] tracking-[0.16em]",
  md: "h-11 px-6 text-[12px] tracking-[0.16em]",
  lg: "h-[52px] px-7 text-[12px] tracking-[0.18em]",
};

const variants: Record<Variant, string> = {
  primary: "bg-fg text-base hover:bg-white hover:shadow-glow-sm",
  secondary:
    "border border-line-strong text-fg hover:border-ice/60 hover:bg-white/[0.03]",
  ghost: "text-mute hover:text-fg",
};

export default function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={cn(
        "group inline-flex select-none items-center justify-center gap-3 whitespace-nowrap rounded-[2px] font-sans font-medium uppercase transition-all duration-300 disabled:pointer-events-none disabled:opacity-40",
        sizes[size],
        variants[variant],
        className
      )}
      {...rest}
    >
      {children}
      {arrow && (
        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </button>
  );
}

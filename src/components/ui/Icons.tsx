interface IconProps {
  className?: string;
  size?: number;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "square" as const,
});

export const ArrowRight = ({ className, size = 14 }: IconProps) => (
  <svg {...base(size)} className={className} aria-hidden>
    <path d="M2 8h11M9 4l4 4-4 4" />
  </svg>
);

export const ArrowUpRight = ({ className, size = 14 }: IconProps) => (
  <svg {...base(size)} className={className} aria-hidden>
    <path d="M4 12L12 4M5 4h7v7" />
  </svg>
);

export const Check = ({ className, size = 14 }: IconProps) => (
  <svg {...base(size)} className={className} aria-hidden>
    <path d="M3 8.5l3.2 3L13 4.5" />
  </svg>
);

export const Plus = ({ className, size = 14 }: IconProps) => (
  <svg {...base(size)} className={className} aria-hidden>
    <path d="M8 2v12M2 8h12" />
  </svg>
);

export const Close = ({ className, size = 14 }: IconProps) => (
  <svg {...base(size)} className={className} aria-hidden>
    <path d="M3 3l10 10M13 3L3 13" />
  </svg>
);

export const Play = ({ className, size = 14 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
    <path d="M4.5 2.8v10.4L13 8z" />
  </svg>
);

export const Dash = ({ className, size = 14 }: IconProps) => (
  <svg {...base(size)} className={className} aria-hidden>
    <path d="M3 8h10" />
  </svg>
);

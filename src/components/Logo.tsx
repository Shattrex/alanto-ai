export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${className}`} aria-label="Alanto AI">
      <img src="/alanto-mark.png" alt="" className="h-8 w-auto shrink-0" />
      <span className="text-[19px] font-bold tracking-tight text-ink-900">Alanto AI</span>
    </a>
  );
}

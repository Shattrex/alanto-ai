import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CTA, NAV_LINKS, SECTION } from "../config/site";
import { cn, scrollToId } from "../lib/utils";
import AlantoLogo from "./AlantoLogo";
import BookButton from "./ui/BookButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.isIntersecting
            ? setActive(e.target.id)
            : setActive((a) => (a === e.target.id ? "" : a))
        ),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // let the overlay unlock scrolling first
    setTimeout(() => scrollToId(id), 30);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-all duration-500",
          scrolled || open
            ? "border-b border-line bg-base/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="shell flex h-14 items-center justify-between gap-6">
          <button onClick={() => go(SECTION.top)} aria-label="ALANTO — back to top" className="shrink-0">
            <AlantoLogo variant="horizontal" height={20} />
          </button>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={cn(
                  "relative py-1 font-sans text-[12.5px] tracking-[0.02em] transition-colors",
                  active === l.id ? "text-fg" : "text-mute hover:text-fg"
                )}
              >
                {l.label}
                {active === l.id && (
                  <motion.span layoutId="nav-active" className="absolute -bottom-[3px] left-0 right-0 h-px bg-ice" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <BookButton size="sm" className="hidden sm:inline-flex" />
            <button
              className="grid h-9 w-9 place-items-center border border-line lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className="relative block h-3 w-4">
                <span className={cn("absolute left-0 h-px w-4 bg-fg transition-all", open ? "top-1.5 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 top-1.5 h-px w-4 bg-fg transition-opacity", open && "opacity-0")} />
                <span className={cn("absolute left-0 h-px w-4 bg-fg transition-all", open ? "top-1.5 -rotate-45" : "top-3")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] bg-base/95 pt-14 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="grid-bg-sm pointer-events-none absolute inset-0 opacity-60" />
            <nav className="shell relative flex h-full flex-col justify-between pb-10 pt-8" aria-label="Mobile">
              <ul>
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="border-b border-line"
                  >
                    <button
                      onClick={() => go(l.id)}
                      className="flex w-full items-baseline justify-between py-5 text-left font-display text-3xl font-semibold uppercase tracking-[-0.02em]"
                    >
                      {l.label}
                      <span className="label-xs">0{i + 1}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
              <BookButton label={CTA.bookDemo} size="lg" className="w-full" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

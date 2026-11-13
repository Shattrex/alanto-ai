import { motion } from "framer-motion";
import { CTA, SECTION } from "../config/site";
import { EASE, scrollToId } from "../lib/utils";
import BookButton from "./ui/BookButton";
import Button from "./ui/Button";

const LINES = ["YOUR EXPERTISE", "SHOULDN'T DISAPPEAR", "WHEN YOU LEAVE THE ROOM."];

export default function Hero() {
  return (
    <section id={SECTION.top} className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
      <div className="grid-bg mask-radial pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[70%] w-[90%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_0%,rgba(185,217,255,0.10),transparent_65%)]" />

      <div className="shell relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mx-auto inline-flex items-center gap-3 border border-line bg-r1/70 px-4 py-2"
        >
          <span className="dot-live h-1.5 w-1.5 rounded-full bg-ice shadow-glow-sm" />
          <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg/90">
            For established business brokers
          </span>
        </motion.div>

        <h1 className="display mx-auto mt-8 text-[clamp(2.1rem,5.6vw,4.9rem)]">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className={`block text-balance ${i === 2 ? "text-silver" : ""}`}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.14, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mx-auto mt-8 max-w-2xl text-[18px] leading-relaxed text-mute md:text-[20px]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
        >
          Alanto turns your years of experience into videos, articles and answers that sellers find
          online, so they already trust you before the first phone call.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: EASE }}
        >
          <Button variant="secondary" size="lg" arrow onClick={() => scrollToId(SECTION.product)}>
            {CTA.watch}
          </Button>
          <BookButton size="lg" />
        </motion.div>
      </div>
    </section>
  );
}

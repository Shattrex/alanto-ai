import { motion } from "framer-motion";
import { BRAND } from "../config/brand";
import { SECTION } from "../config/site";
import { EASE, scrollToId } from "../lib/utils";
import AlantoLogo from "./AlantoLogo";
import BookButton from "./ui/BookButton";
import Button from "./ui/Button";

/** Cinematic close. */
export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <div className="grid-bg mask-radial pointer-events-none absolute inset-0 opacity-80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(185,217,255,0.14),transparent_65%)]" />
      {/* beam */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-ice/20 to-transparent" />

      <div className="shell relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="display text-[clamp(2.2rem,7.4vw,6.8rem)]"
        >
          YOU ALREADY BUILT
          <br />
          THE EXPERTISE.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
          className="display text-silver-h mt-4 text-[clamp(2.2rem,7.4vw,6.8rem)]"
        >
          MAKE THE MARKET SEE IT.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
          className="mt-12 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        >
          <BookButton size="lg" />
          <Button variant="secondary" size="lg" arrow onClick={() => scrollToId(SECTION.product)}>
            WATCH THE VIDEO
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.8 }}
          className="mt-16 flex flex-col items-center gap-5 md:mt-20"
        >
          <AlantoLogo variant="white" height={44} />
          <span className="label tracking-[0.34em] text-mute">{BRAND.descriptor}</span>
        </motion.div>
      </div>
    </section>
  );
}

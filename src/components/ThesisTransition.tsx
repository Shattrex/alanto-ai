import { useRef } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

/** Dramatic typographic pause between the commercial and the Authority Gap. */
export default function ThesisTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const aOpacity = useTransform(p, [0.04, 0.16, 0.42, 0.58], [0, 1, 1, 0.14]);
  const aY = useTransform(p, [0.04, 0.2], [34, 0]);
  const aBlur = useTransform(p, [0.04, 0.16], [10, 0]);
  const aFilter = useMotionTemplate`blur(${aBlur}px)`;

  const bOpacity = useTransform(p, [0.5, 0.7], [0, 1]);
  const bY = useTransform(p, [0.5, 0.74], [48, 0]);
  const bBlur = useTransform(p, [0.5, 0.7], [14, 0]);
  const bFilter = useMotionTemplate`blur(${bBlur}px)`;
  const bShine = useTransform(p, [0.55, 0.95], ["100%", "0%"]);

  const lineScale = useTransform(p, [0, 0.5], [0, 1]);
  const labelB = useTransform(p, [0.62, 0.78], [0, 1]);

  return (
    <div ref={ref} className="relative h-[250svh]" aria-label="The Digital Twin is not the product. What it builds around you is.">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="grid-bg mask-radial pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(185,217,255,0.07),transparent_60%)]" />

        {/* growing spine */}
        <motion.div
          style={{ scaleY: lineScale }}
          className="pointer-events-none absolute left-1/2 top-0 h-[16svh] w-px origin-top bg-gradient-to-b from-transparent to-line-strong"
        />

        <div className="shell relative text-center">
          <motion.div style={{ opacity: aOpacity, y: aY, filter: aFilter }}>
            <div className="label mb-6 text-ice/80">THE MECHANISM</div>
            <p className="display text-[clamp(2rem,7vw,6.5rem)]">
              THE DIGITAL TWIN
              <br />
              IS NOT THE PRODUCT.
            </p>
          </motion.div>

          <motion.div style={{ opacity: bOpacity, y: bY, filter: bFilter }} className="mt-10 md:mt-14">
            <motion.p
              className="display bg-gradient-to-r from-white via-ice to-white bg-[length:220%_100%] bg-clip-text text-[clamp(2rem,7vw,6.5rem)] text-transparent"
              style={{ backgroundPositionX: bShine }}
            >
              WHAT IT BUILDS
              <br />
              AROUND YOU IS.
            </motion.p>
            <motion.div style={{ opacity: labelB }} className="label mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-line-strong" />
              DIGITAL AUTHORITY INFRASTRUCTURE
              <span className="h-px w-8 bg-line-strong" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

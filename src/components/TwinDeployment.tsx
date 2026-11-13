import { motion } from "framer-motion";
import { DEPLOY_STEPS, IDENTITY_FIELDS, TWIN_SYSTEMS } from "../data/authority";
import type { ExampleProfile } from "../data/profiles";
import { EASE, cn } from "../lib/utils";
import Button from "./ui/Button";
import { Check } from "./ui/Icons";
import MediaSlot from "./ui/MediaSlot";

export type TwinPhase = "input" | "deploying" | "ready";

/* ------------------------------ Status column ------------------------------ */
export function TwinStatusPanel({ phase, step }: { phase: TwinPhase; step: number }) {
  return (
    <div>
      <div className="label-xs mb-3 flex items-center justify-between">
        <span>SYSTEM STATUS</span>
        <span className={cn(phase === "ready" ? "text-ice" : "text-dim")}>
          {phase === "ready" ? "NOMINAL" : phase === "deploying" ? "DEPLOYING" : "STANDBY"}
        </span>
      </div>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
        {TWIN_SYSTEMS.map((s) => {
          const ready = phase === "ready" || (phase === "deploying" && step > s.to);
          const processing = phase === "deploying" && step >= s.from && step <= s.to;
          return (
            <li
              key={s.key}
              className={cn(
                "border p-3.5 transition-colors duration-500",
                ready ? "border-ice/30 bg-ice/[0.04]" : "border-line bg-r1",
                s.key === "AUTHORITY ENGINE" && "col-span-2 sm:col-span-1"
              )}
            >
              <div className="label-xs text-fg/80">{s.key}</div>
              <div
                className={cn(
                  "mt-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]",
                  ready ? "text-ice" : processing ? "text-fg" : "text-dim"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    ready ? "bg-ice shadow-[0_0_8px_rgba(185,217,255,0.9)]" : processing ? "dot-live bg-fg" : "bg-dim/60"
                  )}
                />
                {ready ? s.done : processing ? "PROCESSING" : "STANDBY"}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------ Center stage ------------------------------ */
interface Props {
  profile: ExampleProfile;
  phase: TwinPhase;
  step: number;
  onDeploy: () => void;
  onReset: () => void;
}

export default function TwinDeployment({ profile, phase, step, onDeploy, onReset }: Props) {
  if (phase === "input") return <IdentityInput profile={profile} onDeploy={onDeploy} />;
  if (phase === "deploying") return <Sequence step={step} />;
  return <Ready profile={profile} onReset={onReset} />;
}

function IdentityInput({ profile, onDeploy }: { profile: ExampleProfile; onDeploy: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="label-xs mb-2 text-ice/80">STEP 01</div>
          <h4 className="font-display text-2xl font-semibold uppercase tracking-[-0.01em] md:text-[28px]">IDENTITY INPUT</h4>
        </div>
        <div className="hidden text-right sm:block">
          <div className="font-display text-[15px] font-semibold uppercase tracking-[0.06em]">{profile.name}</div>
          <div className="label-xs mt-1">{profile.role}</div>
        </div>
      </div>

      <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
        {IDENTITY_FIELDS.map((f, i) => (
          <motion.div
            key={f.key + profile.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="bg-r1 p-4 md:p-5"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="label-xs">{f.label}</span>
              <span className="label-xs text-dim">0{i + 1}</span>
            </div>
            <div className="text-[14px] leading-snug text-fg/90">{profile.identity[f.key]}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="label-xs normal-case tracking-[0.03em] text-dim">
          Example inputs for demonstration. Real intake captures this directly from the professional.
        </p>
        <Button size="lg" arrow onClick={onDeploy} className="shrink-0">
          DEPLOY DIGITAL TWIN
        </Button>
      </div>
    </motion.div>
  );
}

function Sequence({ step }: { step: number }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
      <div className="label-xs mb-2 flex items-center gap-2 text-ice">
        <span className="dot-live h-1.5 w-1.5 rounded-full bg-ice" />
        STEP 02 · DEPLOYMENT IN PROGRESS
      </div>
      <h4 className="mb-8 font-display text-2xl font-semibold uppercase tracking-[-0.01em] md:text-[28px]">
        {DEPLOY_STEPS[step]}
      </h4>

      <ol className="space-y-0 border border-line">
        {DEPLOY_STEPS.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li
              key={s}
              className={cn(
                "relative flex items-center gap-4 border-b border-line px-4 py-3.5 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors last:border-b-0 md:px-5",
                active ? "bg-white/[0.03] text-fg" : done ? "text-mute" : "text-dim"
              )}
            >
              <span className={cn("grid h-5 w-5 shrink-0 place-items-center border", done ? "border-ice/60 text-ice" : active ? "border-fg/60" : "border-line")}>
                {done ? <Check size={11} /> : active ? <span className="dot-live h-1.5 w-1.5 rounded-full bg-fg" /> : <span className="text-[9px]">{i + 1}</span>}
              </span>
              {s}
              {active && (
                <span className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
                  <span className="scan-bar block h-px w-1/3 bg-ice" />
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-6 h-px w-full bg-line-strong">
        <motion.div
          className="h-px bg-ice shadow-[0_0_10px_rgba(185,217,255,0.8)]"
          animate={{ width: `${((step + 1) / DEPLOY_STEPS.length) * 100}%` }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

function Ready({ profile, onReset }: { profile: ExampleProfile; onReset: () => void }) {
  const assets: { src?: string; label: string; sub: string }[] = [
    ...profile.media.content.map((src, i) => ({ src, label: "CONTENT ASSET", sub: `ASSET 0${i + 1}` })),
    ...(profile.media.articleCover ? [{ src: profile.media.articleCover, label: "ARTICLE COVER", sub: "COVER SLOT" }] : []),
  ];

  return (
    <motion.div initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="label-xs mb-2 flex items-center gap-2 text-ice">
            <span className="h-1.5 w-1.5 rounded-full bg-ice shadow-[0_0_8px_rgba(185,217,255,0.9)]" />
            STEP 03 · COMPLETE
          </div>
          <h4 className="font-display text-2xl font-semibold uppercase tracking-[-0.01em] md:text-[28px]">DIGITAL TWIN READY</h4>
        </div>
        <button onClick={onReset} className="label-xs border border-line px-3 py-2 transition-colors hover:border-line-strong hover:text-fg">
          RESET
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-[200px_1fr]">
        <div className="relative">
          <MediaSlot
            src={profile.media.profile}
            alt={profile.name}
            label="DIGITAL TWIN MEDIA"
            sublabel="PROFILE"
            status="PREVIEW"
            variant="portrait"
            className="mx-auto aspect-[4/5] w-full max-w-[220px] md:max-w-none"
          />
          <div className="mt-3 text-center md:text-left">
            <div className="font-display text-lg font-semibold uppercase tracking-[0.04em]">{profile.name}</div>
            <div className="text-[13px] text-mute">{profile.role}</div>
          </div>
        </div>

        <div className="min-w-0 space-y-4">
          <MediaSlot
            src={profile.media.twinVideo}
            kind="video"
            alt={`${profile.name} Digital Twin video`}
            label="DIGITAL TWIN MEDIA"
            sublabel="VIDEO SLOT"
            status="COMING SOON"
            variant="video"
            className="aspect-video w-full"
          />
          {assets.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {assets.map((a) => (
                <MediaSlot key={a.src} src={a.src} alt={a.label} label={a.label} sublabel={a.sub} status="SOON" variant="asset" compact className="aspect-[4/3]" />
              ))}
            </div>
          )}
          <div className="border border-line">
            <div className="label-xs border-b border-line px-4 py-2.5">MAPPED QUESTIONS · KNOWLEDGE PROFILE</div>
            <ul>
              {profile.questions.map((q) => (
                <li key={q} className="flex items-start gap-3 border-b border-line px-4 py-3 text-[13px] text-fg/85 last:border-b-0">
                  <Check size={12} className="mt-1 shrink-0 text-ice" />
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

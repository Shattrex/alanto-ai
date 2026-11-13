import { useEffect, useState } from "react";
import { DEPLOY_STEPS } from "../data/authority";
import { PROFILES } from "../data/profiles";
import { SECTION } from "../config/site";
import BrokerSelector from "./BrokerSelector";
import TwinDeployment, { TwinStatusPanel, type TwinPhase } from "./TwinDeployment";
import AlantoLogo from "./AlantoLogo";
import DemoBadge from "./ui/DemoBadge";
import Reveal from "./ui/Reveal";
import { Section, SectionHeader } from "./ui/Section";

const STEP_MS = 1150;

/** SaaS-style product interface: select a profile, deploy a Digital Twin. */
export default function DigitalTwinLab() {
  const [selectedId, setSelectedId] = useState(PROFILES[0].id);
  const [phase, setPhase] = useState<TwinPhase>("input");
  const [step, setStep] = useState(0);
  const profile = PROFILES.find((p) => p.id === selectedId) ?? PROFILES[0];

  useEffect(() => {
    if (phase !== "deploying") return;
    const t = setTimeout(() => {
      if (step >= DEPLOY_STEPS.length - 1) setPhase("ready");
      else setStep((s) => s + 1);
    }, STEP_MS);
    return () => clearTimeout(t);
  }, [phase, step]);

  const select = (id: string) => {
    setSelectedId(id);
    setPhase("input");
    setStep(0);
  };
  const deploy = () => {
    setStep(0);
    setPhase("deploying");
  };
  const reset = () => {
    setPhase("input");
    setStep(0);
  };

  return (
    <Section id={SECTION.digitalTwin} tone="raised">
      <div className="shell">
        <SectionHeader
          index="04"
          eyebrow="INTERACTIVE PRODUCT DEMO"
          title="DIGITAL TWIN LAB"
          sub={
            <>
              One professional.
              <br />
              One intelligence layer.
              <br />
              An expanding digital footprint.
            </>
          }
        />

        <Reveal y={36}>
          <div className="relative border border-line-strong bg-base shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
            <div className="absolute inset-x-0 top-0 h-px hair-top" />

            {/* app bar */}
            <div className="flex h-12 items-center justify-between border-b border-line px-4 md:px-5">
              <div className="flex items-center gap-3">
                <AlantoLogo variant="symbol" height={16} />
                <span className="h-3 w-px bg-line-strong" />
                <span className="label-xs text-fg">ALANTO / TWIN LAB</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="label-xs hidden sm:inline">WORKSPACE · EXAMPLE PROFILES</span>
                <DemoBadge>SIMULATION</DemoBadge>
              </div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[250px_minmax(0,1fr)_230px]">
              <aside className="border-b border-line p-5 lg:border-b-0 lg:border-r">
                <BrokerSelector
                  profiles={PROFILES}
                  selectedId={selectedId}
                  onSelect={select}
                  disabled={phase === "deploying"}
                />
              </aside>

              <div className="relative min-h-[520px] p-5 md:p-8">
                <div className="grid-bg-sm pointer-events-none absolute inset-0 opacity-40" />
                <div className="relative">
                  <div key={`${profile.id}-${phase}`}>
                    <TwinDeployment profile={profile} phase={phase} step={step} onDeploy={deploy} onReset={reset} />
                  </div>
                </div>
              </div>

              <aside className="border-t border-line p-5 lg:border-l lg:border-t-0">
                <TwinStatusPanel phase={phase} step={step} />
                <div className="label-xs mt-5 hidden normal-case leading-relaxed tracking-[0.03em] text-dim lg:block">
                  {profile.deploymentLabel}
                </div>
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

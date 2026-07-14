import { HeartPulse, Shield, Siren, TentTree, UserRoundCheck } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

const safetyItems = [
  { label: "Trained trip leaders", icon: UserRoundCheck },
  { label: "Certified guides", icon: Shield },
  { label: "First aid support", icon: HeartPulse },
  { label: "Emergency protocols", icon: Siren },
  { label: "Safe accommodations", icon: TentTree },
] as const;

export function SafetySection() {
  return (
    <AnimatedSection className="section-spacing bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="Safety & Trust"
          title="Adventure backed by visible safety signals."
          description="A clear trust layer with minimal text and strong contrast, designed to remove hesitation before the enquiry action."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {safetyItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-amber-200">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-base font-medium text-white">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

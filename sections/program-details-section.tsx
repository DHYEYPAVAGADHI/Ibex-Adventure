import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { programDetails } from "@/lib/static-data";

export function ProgramDetailsSection() {
  return (
    <AnimatedSection className="section-spacing">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Program Details"
          title="Quick logistics for fast decision-making."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {programDetails.map((detail) => (
            <div
              key={detail.label}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">{detail.label}</p>
              <p className="mt-4 text-xl font-semibold text-white">{detail.value}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

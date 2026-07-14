import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { studentGains } from "@/lib/static-data";

export function StudentGainsSection() {
  return (
    <AnimatedSection className="section-spacing">
      <div className="container-shell">
        <SectionHeading
          eyebrow="What Students Gain"
          title="Minimal value messaging, clear outcome-led trust."
          description="A compact benefit layer that reinforces the educational and personal value behind every journey."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {studentGains.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-300/15 text-amber-200">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

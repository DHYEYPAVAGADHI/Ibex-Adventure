import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

export function AboutSection() {
  return (
    <AnimatedSection id="about" className="section-spacing">
      <div className="container-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <SectionHeading
          eyebrow="About Ibex"
          title="Adventure that teaches, challenges, and transforms."
          description="At IBEX ADVENTURE, we design immersive outdoor programs that go beyond recreation. We integrate adventure with education, enabling students to connect classroom knowledge with real-world experiences."
        />
        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300/75">Why it matters</p>
            <p className="mt-5 text-lg leading-8 text-white/80">
              Every itinerary is built to balance inspiration, safety, and experiential learning so
              students leave with more than memories.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Inspire", "Explore", "Enquire"].map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-medium text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

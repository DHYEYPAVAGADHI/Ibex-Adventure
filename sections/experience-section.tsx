import Image from "next/image";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { featureExperience } from "@/lib/static-data";

export function ExperienceSection() {
  return (
    <AnimatedSection className="section-spacing">
      <div className="container-shell">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04]">
          <div className="relative min-h-[22rem]">
            <Image
              src={typeof featureExperience.heroImage === 'string' && featureExperience.heroImage.trim() !== "" ? featureExperience.heroImage : "/placeholder.svg"}
              alt={featureExperience.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/55 to-transparent" />
            <div className="relative z-10 flex min-h-[22rem] items-end p-6 sm:p-8 lg:p-12">
              <SectionHeading
                eyebrow={featureExperience.eyebrow}
                title={featureExperience.title}
                description={featureExperience.description}
              />
            </div>
          </div>

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-6 md:col-span-3">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300/80">Overview</p>
                <p className="mt-4 text-lg leading-8 text-white/80">{featureExperience.overview}</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-6 md:col-span-2">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300/80">Activities</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {featureExperience.activities.map((activity) => (
                    <span
                      key={activity}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300/80">Best time</p>
                <p className="mt-4 text-base leading-7 text-white/80">{featureExperience.bestTime}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {featureExperience.gallery.map((image, index) => (
                <div
                  key={image}
                  className={`relative overflow-hidden rounded-[1.5rem] border border-white/10 ${
                    index === 0 ? "col-span-2 h-52" : "h-40"
                  }`}
                >
                  <Image
                    src={typeof image === 'string' && image.trim() !== "" ? image : "/placeholder.svg"}
                    alt="Ibex Adventure gallery"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

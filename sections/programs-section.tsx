"use client";

import Image from "next/image";
import { useContact } from "@/components/providers/contact-provider";
import { buildTelLink } from "@/lib/contact";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { AnimatedSection, slideUpVariant } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { buildProgramInquiry } from "@/lib/contact";

export function ProgramsSection() {
  const { phone, whatsapp, email } = useContact();
  const router = useRouter();
  const [tours, setTours] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/tours?featured=true')
      .then(res => res.json())
      .then(data => setTours(data))
      .catch(console.error);
  }, []);

  return (
    <>
      <AnimatedSection id="programs" className="section-spacing bg-slate-950">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Our Experiences"
            title="Transformative Programs"
            description="Explore our meticulously crafted programs. Each journey is designed to challenge, inspire, and deeply connect you with nature."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {tours.map((tour) => {
              const href = `/programs/${tour.categorySlug}/${tour.slug}`;
              let images = [];
              try {
                if (tour.images) images = JSON.parse(tour.images);
                else if (tour.gallery) images = JSON.parse(tour.gallery);
              } catch (e) {}
              const displayImage = images.length > 0 ? images[0] : (tour.banner || tour.thumbnail || "/placeholder.svg");

              return (
                <motion.article
                  variants={slideUpVariant}
                  key={tour.id}
                  className="group cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/50 transition-all duration-[800ms] hover:-translate-y-2 hover:border-white/30 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-amber-900/20"
                  onClick={() => router.push(href)}
                >
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={typeof displayImage === 'string' && displayImage.trim() !== "" ? displayImage : "/placeholder.svg"}
                      alt={tour.title}
                    fill
                    className="object-cover object-center transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.08]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#08132B]/40 transition-colors duration-[800ms] ease-out group-hover:bg-[#08132B]/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08132B]/90 via-[#08132B]/40 to-transparent opacity-90" />
                  
                  {/* Title overlays image now to mimic Incredible India */}
                  <div className="absolute inset-x-0 bottom-0 p-6 transform transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] translate-y-0 group-hover:-translate-y-1">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#FFD700] drop-shadow-md">
                      {tour.category || "Tour"}
                    </p>
                    <h3 className="font-serif text-3xl font-medium tracking-wide text-white drop-shadow-lg">
                      {tour.title}
                    </h3>
                    {/* Gold accent line appears on hover */}
                    <div className="h-0.5 w-0 bg-[#FFD700] transition-all duration-[800ms] ease-out group-hover:w-12 mt-3 shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
                  </div>
                </div>
                
                <div className="space-y-5 p-6 pt-5">
                  <p className="text-sm leading-relaxed text-white/70 line-clamp-3">
                    {tour.overview || tour.description}
                  </p>
                  <div className="flex gap-4 pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(href);
                      }}
                      className="flex-1 rounded-full border border-white/30 px-4 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                    >
                      View Details
                    </button>
                    <a
                      href={buildProgramInquiry(phone, tour.title)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 inline-flex items-center justify-center rounded-xl border-none bg-[#FFD700] px-4 py-3 text-sm font-bold tracking-wide text-slate-950 transition-all duration-300 hover:scale-105 hover:bg-[#FF8C00] hover:shadow-xl hover:shadow-[#FF8C00]/30"
                    >
                      Enquire
                    </a>
                  </div>
                </div>
              </motion.article>
            )})}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}

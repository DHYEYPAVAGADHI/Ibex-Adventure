"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { AnimatedSection, slideUpVariant } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

interface Destination {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string | null;
  heroImage?: string | null;
  state?: string | null;
  displayOrder: number;
}

function DestinationSkeleton() {
  return (
    <div className="rounded-[1.5rem] overflow-hidden bg-slate-800/50 animate-pulse" style={{ height: "22rem" }} />
  );
}

export function DestinationsSection() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/destinations")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setDestinations(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <AnimatedSection id="destinations" className="section-spacing bg-slate-900">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Discover India"
          title="Breathtaking Destinations"
          description="Explore our curated selection of pristine landscapes and culturally rich terrains designed for the discerning traveler."
        />

        <div className="mt-16 grid auto-rows-[22rem] gap-6 md:grid-cols-2 xl:grid-cols-3">
          {loading ? (
            <>
              <DestinationSkeleton />
              <DestinationSkeleton />
              <DestinationSkeleton />
              <DestinationSkeleton />
            </>
          ) : destinations.length === 0 ? (
            <div className="md:col-span-2 xl:col-span-3 flex flex-col items-center justify-center py-16 text-white/40">
              <p className="text-lg font-light">No destinations yet.</p>
              <p className="text-sm mt-1">Add them from the admin panel.</p>
            </div>
          ) : (
            destinations.map((destination, index) => (
              <motion.div
                variants={slideUpVariant}
                key={destination.id}
                className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 ${
                  index === 0 ? "md:col-span-2 md:row-span-2 xl:col-span-2" : ""
                }`}
              >
                <Link
                  href={`/destinations/${destination.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={`Explore ${destination.title}`}
                />
                {destination.heroImage ? (
                  <Image
                    src={typeof destination.heroImage === 'string' && destination.heroImage.trim() !== "" ? destination.heroImage : "/placeholder.svg"}
                    alt={destination.title}
                    fill
                    className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.12]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800" />
                )}
                {/* Overlay that darkens slightly on hover for text readability */}
                <div className="absolute inset-0 bg-slate-950/0 transition-colors duration-500 ease-out group-hover:bg-slate-950/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-80" />

                <div className="absolute inset-x-0 bottom-0 p-8 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] translate-y-6 group-hover:translate-y-0">
                  {destination.state && (
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-300/70 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                      {destination.state}
                    </p>
                  )}
                  <h3 className="font-serif text-3xl font-medium tracking-wide text-white drop-shadow-md">
                    {destination.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100">
                    {destination.shortDescription || `Explore the wonders of ${destination.title}`}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-amber-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                    Explore →
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}

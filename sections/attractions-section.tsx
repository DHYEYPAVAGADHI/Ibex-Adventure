"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";

interface AttractionItem {
  id: string;
  slug: string;
  title: string;
  heroImage?: string | null;
  state?: string | null;
  category: string;
  displayOrder: number;
}

export function AttractionsSection() {
  const [attractions, setAttractions] = useState<AttractionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/attractions")
      .then((r) => r.json())
      .then((data: AttractionItem[]) => {
        if (Array.isArray(data)) {
          const seen = new Set<string>();
          const unique = data
            .filter((a) => { if (seen.has(a.id)) return false; seen.add(a.id); return true; })
            .sort((a, b) => a.displayOrder - b.displayOrder);
          setAttractions(unique);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && attractions.length === 0) return null;

  return (
    <section
      id="attractions"
      className="section-spacing"
      style={{ backgroundColor: "#F4EFE3" }}
    >
      <div className="container-shell">
        {/* Header */}
        <div className="mb-16 grid md:grid-cols-[1fr_auto] md:items-end gap-8">
          <div>
            <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#172C21]">
              Attractions
            </p>
            <h2 className="font-serif text-5xl leading-[1.08] tracking-tight text-[#1C1C18] sm:text-6xl md:text-7xl">
              Places That
              <br />
              <em>Inspire.</em>
            </h2>
          </div>
          {!loading && attractions.length > 0 && (
            <div className="flex items-center gap-3 md:pb-2">
              <span className="font-serif text-4xl text-[#172C21]">{attractions.length}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#424844]">
                Attractions
              </span>
            </div>
          )}
        </div>

        <div className="h-px bg-[#C2C8C2] mb-16" />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse bg-[#E5E9E5]"
                style={{ height: "320px", borderRadius: "2px", animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        ) : (
          /* Editorial grid — 4 across on desktop */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {attractions.slice(0, 8).map((attraction, index) => (
              <Link
                key={attraction.id}
                href={`/attractions/${attraction.slug}`}
                className="group relative block overflow-hidden"
                style={{
                  height: index % 3 === 0 ? "380px" : "300px",
                  borderRadius: "2px",
                }}
                aria-label={`Explore ${attraction.title}`}
              >
                {/* Image */}
                {attraction.heroImage && attraction.heroImage.trim() ? (
                  <Image
                    src={attraction.heroImage}
                    alt={attraction.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#2D4236]" />
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#172C21]/80 via-[#172C21]/10 to-transparent" />

                {/* Number */}
                <p className="absolute top-4 left-4 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/40">
                  {String(index + 1).padStart(2, "0")}
                </p>

                {/* Region badge on hover */}
                {(attraction.state || attraction.category) && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full border border-white/25 bg-black/40 px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                    <MapPin className="h-2.5 w-2.5 text-[#D4AF37]" />
                    <span className="text-[0.55rem] font-semibold uppercase tracking-wider text-[#D4AF37]">
                      {attraction.state || attraction.category}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-xl font-normal text-white leading-tight md:text-2xl">
                    {attraction.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                      Explore
                    </span>
                    <ArrowRight className="h-3 w-3 text-[#D4AF37]" />
                  </div>
                  <div className="mt-3 h-px w-0 bg-[#D4AF37] group-hover:w-8 transition-all duration-500" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

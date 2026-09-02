"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Star, Clock, Mountain } from "lucide-react";
import { SafeImage } from "@/components/safe-image";

interface Destination {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string | null;
  heroImage?: string | null;
  state?: string | null;
  country?: string | null;
  displayOrder: number;
  rating?: number;
  duration?: string | null;
  difficulty?: string | null;
  featured?: boolean;
}

function DestinationSkeleton({ tall }: { tall?: boolean }) {
  return (
    <div
      className="animate-pulse bg-[var(--color-border-light)]"
      style={{ height: tall ? "480px" : "220px", borderRadius: "8px" }}
    />
  );
}

export function DestinationsSection() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/destinations?featured=true")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setDestinations(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="destinations" className="section-spacing bg-[var(--color-ivory-dark)]">
      <div className="container-shell">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-green)]">
              Destinations
            </p>
            <h2 className="font-serif text-4xl leading-tight text-[var(--color-text)] md:text-5xl lg:text-6xl">
              Destinations Worth
              <br />
              <span className="text-[var(--color-forest)]">Discovering.</span>
            </h2>
          </div>
          <p className="max-w-md text-base font-light leading-relaxed text-[var(--color-text-muted)] md:pb-2">
            From the High Himalayas to India&apos;s ancient heritage sites — every landscape 
            holds a story worth telling.
          </p>
        </div>

        {/* Editorial masonry grid */}
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DestinationSkeleton tall />
            <div className="grid gap-4 content-start">
              <DestinationSkeleton />
              <DestinationSkeleton />
            </div>
            <DestinationSkeleton tall />
          </div>
        ) : destinations.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl text-[var(--color-text-muted)]">No destinations published yet.</p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]/60">Add them from the admin panel.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* First destination spans full height, 2-row */}
            {destinations[0] && (
              <Link
                href={`/destinations/${destinations[0].slug}`}
                className="group relative block overflow-hidden rounded-xl md:row-span-2 shadow-sm border border-[var(--color-border-light)]"
                style={{ minHeight: "480px" }}
                aria-label={`Explore ${destinations[0].title}`}
              >
                <SafeImage
                  src={destinations[0].heroImage || ""}
                  alt={destinations[0].title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)]/90 via-[var(--color-forest)]/20 to-transparent" />
                <DestinationCardContent destination={destinations[0]} large />
              </Link>
            )}

            {/* Remaining destinations in pairs */}
            {destinations.slice(1, 7).map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="group relative block overflow-hidden rounded-xl shadow-sm border border-[var(--color-border-light)]"
                style={{ height: "clamp(240px, 25vw, 320px)" }}
                aria-label={`Explore ${dest.title}`}
              >
                <SafeImage
                  src={dest.heroImage || ""}
                  alt={dest.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)]/90 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <DestinationCardContent destination={dest} />
              </Link>
            ))}
          </div>
        )}

        {/* View all link */}
        {destinations.length > 0 && (
          <div className="mt-12 text-center md:text-left">
            <Link
              href="/#destinations"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-2.5 text-sm font-semibold text-[var(--color-text-muted)] transition-all hover:bg-[var(--color-forest)] hover:text-white"
            >
              Explore All Destinations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function DestinationCardContent({
  destination,
  large,
}: {
  destination: Destination;
  large?: boolean;
}) {
  return (
    <div className={`absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500`}>
      <div className="flex flex-wrap items-center gap-3 mb-3">
        {(destination.state || destination.country) && (
          <div className="flex items-center gap-1.5 rounded-full bg-black/20 backdrop-blur-md px-2.5 py-1">
            <MapPin className="h-3 w-3 text-[var(--color-accent-green)]" />
            <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-white">
              {destination.state || destination.country}
            </span>
          </div>
        )}
        {destination.rating ? (
          <div className="flex items-center gap-1 rounded-full bg-black/20 backdrop-blur-md px-2.5 py-1">
            <Star className="h-3 w-3 text-[#FED65B] fill-[#FED65B]" />
            <span className="text-[0.6rem] font-semibold text-white">
              {destination.rating}
            </span>
          </div>
        ) : null}
      </div>

      <h3 className={`font-serif font-medium text-white leading-tight ${large ? "text-3xl md:text-4xl mb-4" : "text-2xl mb-2"}`}>
        {destination.title}
      </h3>

      <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
        {destination.duration && (
          <div className="flex items-center gap-1.5 text-xs text-white/80">
            <Clock className="h-3.5 w-3.5 opacity-70" /> {destination.duration}
          </div>
        )}
        {destination.difficulty && (
          <div className="flex items-center gap-1.5 text-xs text-white/80">
            <Mountain className="h-3.5 w-3.5 opacity-70" /> {destination.difficulty}
          </div>
        )}
      </div>

      {destination.shortDescription && large && (
        <p className="mt-3 text-sm text-white/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
          {destination.shortDescription}
        </p>
      )}

      <div className="mt-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-green)]">
          Explore Destination
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-[var(--color-accent-green)]" />
      </div>
    </div>
  );
}

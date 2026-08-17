"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";

interface Destination {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string | null;
  heroImage?: string | null;
  state?: string | null;
  displayOrder: number;
}

function DestinationSkeleton({ tall }: { tall?: boolean }) {
  return (
    <div
      className="animate-pulse bg-[#E5E9E5]"
      style={{ height: tall ? "480px" : "220px", borderRadius: "2px" }}
    />
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
    <section
      id="destinations"
      className="section-spacing"
      style={{ backgroundColor: "#FCF9F2" }}
    >
      <div className="container-shell">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#172C21]">
              Destinations
            </p>
            <h2 className="font-serif text-5xl leading-[1.08] tracking-tight text-[#1C1C18] sm:text-6xl md:text-7xl">
              India,
              <br />
              <em>Explored.</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm font-light leading-7 text-[#424844] md:text-base md:pb-2">
            From the High Himalayas to India&apos;s ancient heritage sites — every landscape 
            holds a story worth telling.
          </p>
        </div>

        <div className="h-px bg-[#C2C8C2] mb-16" />

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
            <p className="font-serif text-2xl text-[#424844]">No destinations published yet.</p>
            <p className="mt-2 text-sm text-[#424844]/60">Add them from the admin panel.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Editorial: first destination spans full height, 2-row */}
            {destinations[0] && (
              <Link
                href={`/destinations/${destinations[0].slug}`}
                className="group relative block overflow-hidden md:row-span-2"
                style={{ minHeight: "480px", borderRadius: "2px" }}
                aria-label={`Explore ${destinations[0].title}`}
              >
                {destinations[0].heroImage ? (
                  <Image
                    src={destinations[0].heroImage}
                    alt={destinations[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#2D4236]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#172C21]/75 via-[#172C21]/10 to-transparent" />
                <DestinationCardContent destination={destinations[0]} large />
              </Link>
            )}

            {/* Remaining destinations in pairs */}
            {destinations.slice(1, 7).map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="group relative block overflow-hidden"
                style={{ height: "clamp(200px, 22vw, 280px)", borderRadius: "2px" }}
                aria-label={`Explore ${dest.title}`}
              >
                {dest.heroImage ? (
                  <Image
                    src={dest.heroImage}
                    alt={dest.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#2D4236]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#172C21]/70 via-transparent to-transparent" />
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
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#172C21] underline underline-offset-4 hover:text-[#2D4236] transition-colors"
            >
              Explore all destinations <ArrowRight className="h-3.5 w-3.5" />
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
    <div
      className={`absolute inset-x-0 bottom-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ${
        large ? "p-8" : "p-6"
      }`}
    >
      {destination.state && (
        <div className="mb-2 flex items-center gap-1.5">
          <MapPin className="h-3 w-3 text-[#D4AF37]" />
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            {destination.state}
          </span>
        </div>
      )}
      <h3
        className={`font-serif font-normal text-white ${
          large ? "text-3xl md:text-4xl" : "text-2xl"
        }`}
      >
        {destination.title}
      </h3>
      {destination.shortDescription && (
        <p className="mt-2 text-sm text-white/75 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {destination.shortDescription}
        </p>
      )}
      <div className="mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
          Explore
        </span>
        <ArrowRight className="h-3 w-3 text-[#D4AF37]" />
      </div>
    </div>
  );
}

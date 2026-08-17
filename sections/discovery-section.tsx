import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowRight } from "lucide-react";

export async function DiscoverySection() {
  const categories = await prisma.adventureCategory.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  if (categories.length === 0) return null;

  return (
    <section className="section-spacing" style={{ backgroundColor: "#FCF9F2" }}>
      <div className="container-shell">
        {/* Editorial header */}
        <div className="grid gap-8 mb-16 md:grid-cols-2 md:items-end">
          <div>
            <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#172C21]">
              Discover Ibex
            </p>
            <h2
              className="font-serif text-5xl leading-[1.08] tracking-tight text-[#1C1C18] sm:text-6xl md:text-7xl"
            >
              Beyond the
              <br />
              <em>Ordinary.</em>
            </h2>
          </div>
          <div className="md:pb-2">
            <p className="text-base font-light leading-7 text-[#424844] max-w-sm md:text-lg">
              Explore landscapes, experiences, and journeys designed around genuine discovery — 
              from the Himalayas to the Indian Ocean.
            </p>
            <Link
              href="/#programs"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#172C21] underline underline-offset-4 hover:text-[#2D4236] transition-colors"
            >
              View all programs <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Editorial horizontal rule */}
        <div className="h-px bg-[#C2C8C2] mb-16" />

        {/* Category editorial grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((category, index) => (
            <Link
              key={category.id}
              href={`/programs/${category.slug}`}
              className="group block relative overflow-hidden"
              style={{ borderRadius: "4px" }}
            >
              {/* Number */}
              <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#172C21]/50">
                {String(index + 1).padStart(2, "0")}
              </p>

              {/* Image */}
              <div className="relative mb-4 overflow-hidden" style={{ height: "260px", borderRadius: "2px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    category.image && category.image.trim()
                      ? category.image
                      : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={category.imageAlt || category.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle forest overlay */}
                <div className="absolute inset-0 bg-[#172C21]/10 group-hover:bg-[#172C21]/0 transition-colors duration-500" />
              </div>

              {/* Title row */}
              <div className="flex items-end justify-between gap-4">
                <h3 className="font-serif text-2xl font-medium text-[#1C1C18] leading-tight group-hover:text-[#172C21] transition-colors">
                  {category.title}
                </h3>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-[#172C21] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
              {/* Description */}
              <p className="mt-2 text-sm font-light leading-6 text-[#424844] line-clamp-2">
                {category.description}
              </p>

              {/* Gold underline on hover */}
              <div className="mt-4 h-px w-0 bg-[#D4AF37] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Compass } from "lucide-react";
import { SafeImage } from "@/components/safe-image";

export async function DiscoverySection() {
  const categories = await prisma.adventureCategory.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  if (categories.length === 0) return null;

  return (
    <section id="experiences" className="section-spacing bg-white">
      <div className="container-shell">
        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl leading-tight text-[var(--color-text)] md:text-5xl lg:text-6xl">
              Explore India
              <br />
              <span className="text-[var(--color-forest)]">Your Way.</span>
            </h2>
          </div>
          <div>
            <p className="text-base font-light leading-relaxed text-[var(--color-text-muted)] max-w-sm mb-6">
              Discover wildlife, heritage, nature, and adventure, curated into journeys that stay with you forever.
            </p>
            <Link
              href="/#programs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-forest-mid)] transition-colors hover:text-[var(--color-accent-green)] group"
            >
              Explore All Experiences 
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          {categories.slice(0, 5).map((category, index) => {
            // Asymmetric layout logic for 5 items
            let spanClasses = "md:col-span-4 h-[400px]"; // default
            if (index === 0) spanClasses = "md:col-span-8 md:row-span-2 h-[400px] md:h-[824px]"; // Large first item
            else if (index === 1) spanClasses = "md:col-span-4 h-[400px]";
            else if (index === 2) spanClasses = "md:col-span-4 h-[400px]";
            else if (index === 3) spanClasses = "md:col-span-6 h-[400px]";
            else if (index === 4) spanClasses = "md:col-span-6 h-[400px]";

            return (
              <Link
                key={category.id}
                href={`/journeys/${category.slug}`}
                className={`group block relative overflow-hidden rounded-xl bg-[var(--color-ivory)] ${spanClasses}`}
              >
                {/* Image */}
                <SafeImage
                  src={category.image}
                  alt={category.imageAlt || category.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest)]/90 via-[var(--color-forest)]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="mb-4 inline-flex items-center justify-center rounded-full bg-[var(--color-accent-green)] p-2.5 text-white shadow-lg">
                      <Compass className="h-5 w-5" />
                    </div>
                    
                    <h3 className="mb-2 font-serif text-3xl text-white">
                      {category.title}
                    </h3>
                    
                    <p className="mb-6 text-sm font-light leading-relaxed text-white/80 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-[var(--color-accent-green)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      Discover {category.title}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

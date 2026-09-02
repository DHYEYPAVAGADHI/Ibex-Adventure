import Link from "next/link";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import { SafeImage } from "@/components/safe-image";
import { prisma } from "@/lib/prisma";

const FALLBACK_IMG = "/placeholder.svg";

function firstImage(pkg: { thumbnail: string | null; images: string | null; gallery: string | null }) {
  if (pkg.thumbnail) return pkg.thumbnail;
  for (const raw of [pkg.gallery, pkg.images]) {
    if (!raw) continue;
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr[0]) return arr[0] as string;
    } catch {
      /* ignore */
    }
  }
  return FALLBACK_IMG;
}

export async function ProgramsSection() {
  const featured = await prisma.package.findMany({
    where: { isFeatured: true, publishStatus: "Published" },
    orderBy: { displayOrder: "asc" },
    take: 6,
  });

  const journeys = featured.length
    ? featured
    : await prisma.package.findMany({
        where: { publishStatus: "Published" },
        orderBy: { displayOrder: "asc" },
        take: 6,
      });

  return (
    <section id="journeys" className="section-spacing bg-[var(--color-forest-band)] text-white">
      <div className="container-wide">
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-white/10 pb-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--color-lime)]">
              Your next journey is waiting.
            </p>
            <h2 className="display-hed text-3xl text-white md:text-4xl">Explore Featured Journeys</h2>
          </div>
          <Link
            href="/journeys"
            className="inline-flex items-center gap-2 self-start rounded border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10"
          >
            View All Journeys
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 hide-scrollbar md:mx-0 md:grid md:grid-cols-3 md:px-0 lg:grid-cols-6 md:gap-5">
          {journeys.map((j) => (
            <Link
              key={j.id}
              href={`/journeys/${j.categorySlug}/${j.slug}`}
              className="group relative flex aspect-[3/4] min-w-[240px] snap-center flex-col overflow-hidden rounded-xl border border-white/10 bg-gray-900 shadow-lg transition-shadow hover:shadow-2xl md:min-w-0"
            >
              <SafeImage
                src={firstImage(j)}
                alt={j.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 60vw, 16vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="display-hed text-lg text-white">{j.title}</h3>
                {j.duration && (
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
                    {j.duration}
                  </p>
                )}
                {j.tags && (
                  <p className="mt-1 line-clamp-1 text-[10px] font-medium text-white/60">
                    {(() => {
                      try {
                        const t = JSON.parse(j.tags) as string[];
                        return Array.isArray(t) ? t.slice(0, 3).join(" · ") : j.tags;
                      } catch {
                        return j.tags;
                      }
                    })()}
                  </p>
                )}
                <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3">
                  <p className="text-xs font-medium text-white">
                    {j.price ? (
                      <>
                        <span className="mr-1 text-[10px] text-white/60">From</span>₹{j.price}
                      </>
                    ) : (
                      <span className="text-[10px] uppercase tracking-widest text-white/60">Enquire</span>
                    )}
                  </p>
                  <ArrowRightCircle className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

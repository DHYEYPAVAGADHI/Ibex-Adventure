import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { prisma } from "@/lib/prisma";
import { ArrowRight, ChevronRight, Clock, MapPin, BarChart3 } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = await prisma.activity.findUnique({
    where: { slug: category },
  });
  if (!categoryData) return { title: "Not Found" };
  return {
    title: `${categoryData.title} | Ibex Adventure`,
    description:
      categoryData.description?.substring(0, 160) ||
      "Explore with Ibex Adventure.",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const categoryData = await prisma.activity.findUnique({
    where: { slug: category },
  });

  if (!categoryData) notFound();

  const packages = await prisma.package.findMany({
    where: { categorySlug: category, status: "active" },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FCF9F2" }}>
      <Navbar />

      {/* ── Editorial Category Hero ── */}
      <section
        className="relative flex items-end overflow-hidden pt-28"
        style={{
          minHeight: "55vh",
          background: `linear-gradient(160deg, #172C21 0%, #2D4236 100%)`,
        }}
      >
        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)," +
              "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)",
          }}
        />

        <div className="container-shell relative z-10 pb-16">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs" aria-label="Breadcrumb">
            <Link href="/" className="text-white/45 hover:text-white/70 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-white/25" />
            <Link href="/#programs" className="text-white/45 hover:text-white/70 transition-colors">
              Programs
            </Link>
            <ChevronRight className="h-3 w-3 text-white/25" />
            <span className="text-[#D4AF37]">{categoryData.title}</span>
          </nav>

          {/* Eyebrow */}
          <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
            Adventure Program
          </p>

          {/* Title */}
          <h1 className="font-serif text-6xl font-normal leading-tight text-white md:text-7xl lg:text-8xl">
            {categoryData.title}
          </h1>

          {categoryData.description && (
            <p className="mt-6 max-w-xl text-base font-light leading-7 text-white/65">
              {categoryData.description}
            </p>
          )}

          {/* Package count */}
          {packages.length > 0 && (
            <p className="mt-8 text-sm font-semibold text-white/40">
              {packages.length} {packages.length === 1 ? "Program" : "Programs"} available
            </p>
          )}
        </div>

        {/* Gold bottom rule */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/30 to-[#D4AF37]/0" />
      </section>

      {/* ── Packages ── */}
      <section className="section-spacing">
        <div className="container-shell">
          {packages.length > 0 ? (
            <>
              <div className="mb-12">
                <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#172C21]">
                  Available Journeys
                </p>
                <h2 className="font-serif text-4xl text-[#1C1C18] sm:text-5xl">
                  Choose your expedition.
                </h2>
              </div>

              <div className="h-px bg-[#C2C8C2] mb-12" />

              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {packages.map((place) => {
                  let images: string[] = [];
                  try {
                    if (place.images) images = JSON.parse(place.images);
                    else if (place.gallery) images = JSON.parse(place.gallery);
                  } catch {}
                  const displayImage =
                    images.length > 0
                      ? images[0]
                      : place.banner ||
                        place.thumbnail ||
                        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80";

                  return (
                    <Link
                      key={place.slug}
                      href={`/programs/${categoryData.slug}/${place.slug}`}
                      className="group block overflow-hidden border border-[#C2C8C2] hover:border-[#172C21] transition-colors duration-300"
                      style={{ borderRadius: "2px" }}
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden" style={{ height: "260px" }}>
                        <Image
                          src={
                            typeof displayImage === "string" && displayImage.trim()
                              ? displayImage
                              : "/placeholder.svg"
                          }
                          alt={place.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />

                        {/* Difficulty badge */}
                        {place.difficulty && (
                          <span
                            className={`absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm border ${
                              place.difficulty.toLowerCase() === "easy"
                                ? "bg-emerald-500/20 text-emerald-100 border-emerald-500/30"
                                : place.difficulty.toLowerCase() === "moderate"
                                ? "bg-amber-500/20 text-amber-100 border-amber-500/30"
                                : "bg-red-500/20 text-red-100 border-red-500/30"
                            }`}
                          >
                            {place.difficulty}
                          </span>
                        )}
                      </div>

                      {/* Card body */}
                      <div className="p-6" style={{ backgroundColor: "#FCF9F2" }}>
                        {/* Meta */}
                        <div className="mb-3 flex flex-wrap gap-3">
                          {place.location && (
                            <span className="flex items-center gap-1 text-xs text-[#424844]/60">
                              <MapPin className="h-3 w-3 text-[#172C21]" />
                              {place.location}
                            </span>
                          )}
                          {place.duration && (
                            <span className="flex items-center gap-1 text-xs text-[#424844]/60">
                              <Clock className="h-3 w-3 text-[#172C21]" />
                              {place.duration}
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-2xl text-[#1C1C18] leading-tight group-hover:text-[#172C21] transition-colors">
                          {place.title}
                        </h3>

                        <p className="mt-3 text-sm font-light leading-6 text-[#424844] line-clamp-2">
                          {place.overview || place.description}
                        </p>

                        <div className="mt-5 flex items-center gap-1.5 text-[#172C21]">
                          <span className="text-xs font-semibold uppercase tracking-wider">
                            Explore Program
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                        </div>
                        <div className="mt-3 h-px w-0 bg-[#D4AF37] group-hover:w-12 transition-all duration-500" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="py-24 text-center border border-[#C2C8C2]">
              <p className="font-serif text-3xl text-[#1C1C18]">
                No programs published yet.
              </p>
              <p className="mt-3 text-sm font-light text-[#424844]/60">
                Check back soon — we&apos;re adding new expeditions.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

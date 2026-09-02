import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock, MapPin, BarChart3 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { SafeImage } from "@/components/safe-image";
import { prisma } from "@/lib/prisma";

export const revalidate = 300;

async function resolveCategory(slug: string) {
  const s = slug.toLowerCase();
  const [activity, adv] = await Promise.all([
    prisma.activity.findUnique({ where: { slug: s } }),
    prisma.adventureCategory.findUnique({ where: { slug: s } }),
  ]);
  const title = activity?.title || adv?.title;
  const description = activity?.description || adv?.description || null;
  const image = activity?.image || adv?.image || null;
  if (title) return { title, description, image };

  // Fall back to any package that uses this categorySlug.
  const pkg = await prisma.package.findFirst({ where: { categorySlug: s } });
  if (pkg) {
    return {
      title: pkg.category || slug.replace(/-/g, " "),
      description: null,
      image: pkg.thumbnail,
    };
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = await resolveCategory(category);
  if (!data) return { title: "Not Found" };
  return {
    title: data.title,
    description: data.description?.slice(0, 160) || `${data.title} journeys with Ibex Adventure.`,
  };
}

function firstImage(p: { thumbnail: string | null; images: string | null; gallery: string | null }) {
  if (p.thumbnail) return p.thumbnail;
  for (const raw of [p.gallery, p.images]) {
    if (!raw) continue;
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr[0]) return arr[0] as string;
    } catch {
      /* ignore */
    }
  }
  return "/placeholder.svg";
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = await resolveCategory(category);
  if (!data) notFound();

  const packages = await prisma.package.findMany({
    where: { categorySlug: category.toLowerCase(), publishStatus: "Published" },
    orderBy: { displayOrder: "asc" },
  });

  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-ivory)]">
        <PageHeader
          eyebrow="Journeys"
          title={data.title}
          lede={data.description || undefined}
          image={data.image || packages[0]?.thumbnail || undefined}
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Journeys", href: "/journeys" },
            { label: data.title },
          ]}
        />

        <section className="container-wide py-16 md:py-24">
          {packages.length > 0 ? (
            <>
              <div className="mb-10 flex items-end justify-between gap-4 border-b border-[var(--color-hair)] pb-5">
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-moss)]">
                    Available journeys
                  </p>
                  <h2 className="display-hed text-3xl text-[var(--color-ink)] md:text-4xl">
                    {packages.length} {packages.length === 1 ? "journey" : "journeys"} to choose from
                  </h2>
                </div>
                <Link
                  href="/journeys"
                  className="hidden shrink-0 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-moss)] hover:text-[var(--color-moss-dark)] sm:block"
                >
                  All journeys
                </Link>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {packages.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/journeys/${p.categorySlug}/${p.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-hair)] bg-white transition-shadow hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-sand)]">
                      <SafeImage
                        src={firstImage(p)}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                      {p.difficulty && (
                        <span className="absolute left-4 top-4 rounded bg-[var(--color-forest-band)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                          {p.difficulty}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
                        {p.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-[var(--color-moss)]" />
                            {p.location}
                          </span>
                        )}
                        {p.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-[var(--color-moss)]" />
                            {p.duration}
                          </span>
                        )}
                      </div>
                      <h3 className="display-hed text-xl text-[var(--color-ink)] group-hover:text-[var(--color-forest)]">
                        {p.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                        {(p.overview || p.description || "").replace(/<[^>]+>/g, "")}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-5">
                        <span className="text-sm font-bold text-[var(--color-ink)]">
                          {p.price ? (
                            <>
                              <span className="text-[10px] font-medium uppercase tracking-widest text-[var(--color-ink-muted)]">
                                From{" "}
                              </span>
                              ₹{p.price}
                            </>
                          ) : (
                            <span className="text-[11px] uppercase tracking-widest text-[var(--color-ink-muted)]">
                              Enquire for price
                            </span>
                          )}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-moss)]">
                          View journey
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-[var(--color-hair)] py-24 text-center">
              <BarChart3 className="mx-auto h-8 w-8 text-[var(--color-ink-muted)]" />
              <p className="display-hed mt-4 text-2xl text-[var(--color-ink)]">
                No journeys here yet
              </p>
              <Link
                href="/journeys"
                className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-moss)]"
              >
                Browse all journeys
              </Link>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { SafeImage } from "@/components/safe-image";
import type { AdventureCategory, Attraction, Package } from "@prisma/client";

function firstImage(p: Pick<Package, "thumbnail" | "images" | "gallery">) {
  if (p.thumbnail) return p.thumbnail;
  for (const raw of [p.gallery, p.images]) {
    if (!raw) continue;
    try {
      const a = JSON.parse(raw);
      if (Array.isArray(a) && a[0]) return a[0] as string;
    } catch {
      /* ignore */
    }
  }
  return "/placeholder.svg";
}

export function ExperienceCategoryView({
  category,
  attractions,
  journeys,
}: {
  category: AdventureCategory;
  attractions: Attraction[];
  journeys: Package[];
}) {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-ivory)]">
        <PageHeader
          eyebrow="Experiences"
          title={category.title}
          lede={category.description}
          image={category.image || undefined}
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Experiences", href: "/experiences" },
            { label: category.title },
          ]}
        />

        <section className="container-wide py-16 md:py-24">
          {attractions.length > 0 && (
            <>
              <h2 className="display-hed mb-8 text-2xl text-[var(--color-ink)] md:text-3xl">
                Places to experience it
              </h2>
              <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {attractions.map((a) => (
                  <Link
                    key={a.id}
                    href={`/experiences/${a.slug}`}
                    className="group overflow-hidden rounded-2xl border border-[var(--color-hair)] bg-white transition-shadow hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] bg-[var(--color-sand)]">
                      <SafeImage
                        src={a.heroImage || "/placeholder.svg"}
                        alt={a.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="display-hed text-lg text-[var(--color-ink)]">{a.title}</h3>
                      {a.location && (
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                          {a.location}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          <h2 className="display-hed mb-8 text-2xl text-[var(--color-ink)] md:text-3xl">
            {journeys.length > 0 ? "Journeys built around this" : "Explore our journeys"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(journeys.length > 0 ? journeys : []).map((j) => (
              <Link
                key={j.id}
                href={`/journeys/${j.categorySlug}/${j.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-hair)] bg-white transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] bg-[var(--color-sand)]">
                  <SafeImage
                    src={firstImage(j)}
                    alt={j.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="display-hed text-lg text-[var(--color-ink)]">{j.title}</h3>
                  <div className="mt-auto flex items-center justify-between pt-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                    <span>{j.duration}</span>
                    <span className="flex items-center gap-1 text-[var(--color-moss)]">
                      View <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            {journeys.length === 0 && (
              <Link
                href="/journeys"
                className="flex items-center justify-center rounded-2xl border border-dashed border-[var(--color-hair)] p-10 text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-moss)]"
              >
                Browse all journeys <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            )}
          </div>

          <div className="mt-16 rounded-2xl bg-[var(--color-forest-band)] p-10 text-center text-white">
            <h3 className="display-hed text-2xl md:text-3xl">Want this as a custom trip?</h3>
            <p className="mt-3 text-white/70">Tell us your dates and group and we&rsquo;ll design it.</p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center rounded bg-[var(--color-moss)] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[var(--color-moss-dark)]"
            >
              Plan Your Journey
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

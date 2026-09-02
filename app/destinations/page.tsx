import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Star, Clock, MapPin } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { SafeImage } from "@/components/safe-image";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore the destinations at the heart of Ibex Adventure journeys — Ladakh, Spiti, Rishikesh, Rajasthan, Kutch, Kerala and more.",
};

export const revalidate = 300;

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { displayOrder: "asc" }],
  });

  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-ivory)]">
        <PageHeader
          eyebrow="Where we travel"
          title="Destinations"
          lede="Each destination is a place we return to again and again — where we know the people, the roads and the stories worth telling."
          image={destinations[0]?.heroImage || undefined}
          crumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
        />

        <section className="container-wide py-16 md:py-24">
          {destinations.length === 0 ? (
            <p className="text-center text-[var(--color-ink-muted)]">
              Destinations are being added. Please check back soon.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((d) => (
                <Link
                  key={d.id}
                  href={`/destinations/${d.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-hair)] bg-white transition-shadow hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-sand)]">
                    <SafeImage
                      src={d.heroImage || "/placeholder.svg"}
                      alt={d.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    {d.state && (
                      <span className="absolute left-4 top-4 rounded bg-[var(--color-forest-band)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                        {d.state}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="display-hed text-2xl text-[var(--color-ink)]">{d.title}</h2>
                    {d.subtitle && (
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-moss)]">
                        {d.subtitle}
                      </p>
                    )}
                    {d.shortDescription && (
                      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                        {d.shortDescription}
                      </p>
                    )}
                    <div className="mt-auto flex items-center gap-4 pt-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                      {d.rating > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-[var(--color-gold-star)] text-[var(--color-gold-star)]" />
                          {d.rating.toFixed(1)}
                        </span>
                      )}
                      {d.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {d.duration}
                        </span>
                      )}
                      <ArrowUpRight className="ml-auto h-5 w-5 text-[var(--color-moss)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

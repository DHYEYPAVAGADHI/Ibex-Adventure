import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { SafeImage } from "@/components/safe-image";
import { DynamicIcon } from "@/components/dynamic-icon";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Ten ways to experience India with Ibex Adventure — walk the Himalayas, eat like a local, meet the makers, enter the wild and more.",
};

export const revalidate = 300;

const ACCENTS = [
  "bg-[var(--color-moss)]",
  "bg-[#C77D3C]",
  "bg-[#B8543A]",
  "bg-[#7C5B9B]",
  "bg-[#3D7DA6]",
  "bg-[#4C7A3F]",
  "bg-[#A8483E]",
  "bg-[#8C5AA6]",
  "bg-[#C24C7E]",
  "bg-[#5C6B6E]",
];

export default async function ExperiencesPage() {
  const [categories, handpicked] = await Promise.all([
    prisma.adventureCategory.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    }),
    prisma.attraction.findMany({
      where: { published: true, featured: true },
      orderBy: { displayOrder: "asc" },
      take: 8,
    }),
  ]);

  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-ivory)]">
        <PageHeader
          eyebrow="Experiences"
          title="Experience India differently."
          lede="We believe the best way to understand a place is to live it. These are the ten ways we help you do that — each with its own set of places and journeys."
          image="https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=2000&q=80"
          crumbs={[{ label: "Home", href: "/" }, { label: "Experiences" }]}
        />

        {/* Category grid */}
        <section className="container-wide py-16 md:py-24">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-moss)]">
            How many will you experience?
          </p>
          <h2 className="display-hed mb-10 text-3xl text-[var(--color-ink)] md:text-4xl">
            Ten ways to experience India
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/experiences/${cat.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-hair)] bg-white transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-[16/9] bg-[var(--color-sand)]">
                  <SafeImage
                    src={cat.image || "/placeholder.svg"}
                    alt={cat.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    className={`absolute -bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white text-white shadow-md ${ACCENTS[i % ACCENTS.length]}`}
                  >
                    <DynamicIcon icon={cat.icon} className="h-4 w-4" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-6 pb-6 pt-8">
                  <h3 className="display-hed text-lg text-[var(--color-ink)] group-hover:text-[var(--color-forest)]">
                    {cat.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                    {cat.description}
                  </p>
                  <span className="mt-auto flex items-center gap-1 pt-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-moss)]">
                    Explore <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Experience → Learn → Reflect */}
        <section className="border-y border-[var(--color-hair)] bg-white py-16">
          <div className="container-shell max-w-4xl text-center">
            <h2 className="display-hed mb-8 text-2xl text-[var(--color-ink)]">
              Every experience is a lesson
            </h2>
            <div className="flex flex-col items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.14em] md:flex-row md:gap-6">
              {["Experience", "Learn", "Reflect"].map((s, i) => (
                <span key={s} className="flex items-center gap-3 md:gap-6">
                  <span className="rounded-xl border-2 border-[var(--color-moss)] bg-[var(--color-sand)] px-7 py-3.5 text-[var(--color-moss)]">
                    {s}
                  </span>
                  {i < 2 && <ArrowRight className="h-5 w-5 rotate-90 text-[var(--color-ink-muted)] md:rotate-0" />}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Handpicked */}
        {handpicked.length > 0 && (
          <section className="container-wide py-16 md:py-24">
            <h2 className="display-hed mb-10 text-3xl text-[var(--color-ink)] md:text-4xl">
              Handpicked experiences
            </h2>
            <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 hide-scrollbar md:mx-0 md:grid md:grid-cols-4 md:px-0">
              {handpicked.map((exp) => (
                <Link
                  key={exp.id}
                  href={`/experiences/${exp.slug}`}
                  className="group relative flex aspect-[4/5] min-w-[240px] snap-center flex-col overflow-hidden rounded-xl bg-[var(--color-forest)] md:min-w-0"
                >
                  <SafeImage
                    src={exp.heroImage || "/placeholder.svg"}
                    alt={exp.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="display-hed text-lg text-white">{exp.title}</h3>
                    <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white/80">
                      {exp.state || "India"}
                      <ArrowUpRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-[var(--color-forest-band)] py-16 text-center text-white md:py-24">
          <div className="container-shell max-w-2xl">
            <p className="font-serif text-2xl italic text-[var(--color-lime)]">
              You don&rsquo;t just visit India — you experience it.
            </p>
            <h2 className="display-hed mt-4 text-3xl md:text-4xl">Build your own experience</h2>
            <p className="mt-4 text-white/70">
              Tell us what you love and our team designs a journey around it.
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-flex items-center gap-2 rounded bg-[var(--color-moss)] px-9 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--color-moss-dark)]"
            >
              Start designing <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

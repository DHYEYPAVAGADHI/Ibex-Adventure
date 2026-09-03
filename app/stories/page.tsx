import type { Metadata } from "next";
import Link from "next/link";
import { Quote } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { SafeImage } from "@/components/safe-image";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Real learnings, real impact — stories, photos and voices from travellers, students and teams who have journeyed with Ibex Adventure.",
};

export const revalidate = 300;

const VOICES = [
  {
    quote:
      "This wasn't just a college trip. It was an experience that changed the way I see the world — I learned more in seven days than in a semester.",
    name: "Riya Sharma",
    role: "Student, Delhi",
  },
  {
    quote:
      "IBEX makes learning outside the classroom genuinely meaningful for our students. The reflection sessions are what set them apart.",
    name: "Prof. Neeraj S.",
    role: "Faculty Coordinator",
  },
  {
    quote:
      "Well planned, safe and absolutely unforgettable. From rafting to the quiet evenings, every moment had a lesson in it.",
    name: "Amit & Friends",
    role: "Travellers, Ahmedabad",
  },
  {
    quote:
      "Our team came back more connected and more motivated. The shared challenge did more for us than any workshop could.",
    name: "HR Team",
    role: "Technology Company",
  },
  {
    quote:
      "Interacting with villagers in Kutch taught me empathy and respect in a way no book ever could.",
    name: "Kush Patel",
    role: "Student, Vadodara",
  },
  {
    quote:
      "The Himalayan trek pushed me beyond my limits and showed me what I'm actually capable of.",
    name: "Rohan Verma",
    role: "Student, Pune",
  },
];

export default async function StoriesPage() {
  const memories = await prisma.memory.findMany({
    where: { visibility: "Published" },
    orderBy: { displayOrder: "asc" },
    take: 12,
  });

  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-ivory)]">
        <PageHeader
          eyebrow="Student & traveller voices"
          title="Real Learnings. Real Impact."
          lede="The best measure of a journey is what people carry home from it. Here is some of what they have told us."
          image={memories[0]?.url || undefined}
          crumbs={[{ label: "Home", href: "/" }, { label: "Stories" }]}
        />

        {/* Voices */}
        <section className="container-wide py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {VOICES.map((v) => (
              <figure
                key={v.name}
                className="flex flex-col rounded-2xl border border-[var(--color-hair)] bg-white p-8"
              >
                <Quote className="h-7 w-7 text-[var(--color-lime)]" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                  {v.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-[var(--color-hair)] pt-4">
                  <p className="text-sm font-bold text-[var(--color-ink)]">{v.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">
                    {v.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Gallery */}
        {memories.length > 0 && (
          <section className="bg-[var(--color-sand)] py-16 md:py-24">
            <div className="container-wide">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-moss)]">
                From the road
              </p>
              <h2 className="display-hed mb-10 text-3xl text-[var(--color-ink)] md:text-4xl">
                Moments, not postcards
              </h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {memories.map((m) => (
                  <figure
                    key={m.id}
                    className="group relative aspect-square overflow-hidden rounded-xl bg-[var(--color-forest)]"
                  >
                    <SafeImage
                      src={m.url}
                      alt={m.caption || "Ibex Adventure memory"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    {m.caption && (
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                        {m.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-[var(--color-forest-band)] py-16 text-center md:py-20">
          <div className="container-shell max-w-2xl">
            <h2 className="display-hed text-3xl text-white md:text-4xl">Your story starts with a journey.</h2>
            <p className="mt-4 text-white/70">Tell us what you're looking for and we'll design it around you.</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded bg-[var(--color-moss)] px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--color-moss-dark)]"
            >
              Plan Your Journey
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

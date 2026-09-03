import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/safe-image";
import { DynamicIcon } from "@/components/dynamic-icon";
import { prisma } from "@/lib/prisma";

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

export async function AttractionsSection() {
  const cards = await prisma.homepageAdventureCard.findMany({
    where: { status: "Published" },
    orderBy: { displayOrder: "asc" },
    take: 10,
  });

  if (cards.length === 0) return null;

  return (
    <section id="experiences" className="section-spacing bg-white">
      <div className="container-wide">
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-[var(--color-hair)] pb-6 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
              India has 1.4 billion stories.
            </p>
            <h2 className="display-hed text-3xl text-[var(--color-ink)] md:text-4xl">
              How many will you experience?
            </h2>
          </div>
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 self-start rounded border border-[var(--color-hair)] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-sand)]"
          >
            Explore All Experiences
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {cards.map((card, i) => (
            <Link
              key={card.id}
              href={card.buttonLink || "/experiences"}
              className="group flex flex-col overflow-hidden rounded-lg border border-[var(--color-hair)] bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full bg-[var(--color-sand)]">
                <SafeImage
                  src={card.coverImage || "/placeholder.svg"}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 20vw"
                  unoptimized
                />
                <div
                  className={`absolute -bottom-5 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white shadow-md transition-transform group-hover:-translate-y-1 ${
                    ACCENTS[i % ACCENTS.length]
                  }`}
                >
                  <DynamicIcon icon={card.icon} className="h-4 w-4" />
                </div>
              </div>
              <div className="flex flex-grow flex-col px-5 pb-4 pt-8">
                <h3 className="text-xs font-bold uppercase leading-tight tracking-wide text-[var(--color-ink)]">
                  {card.title}
                </h3>
                {card.subtitle && (
                  <p className="mt-1 text-xs text-[var(--color-ink-muted)]">{card.subtitle}</p>
                )}
                <div className="mt-auto flex items-center gap-1.5 pt-4 text-[0.65rem] font-medium uppercase tracking-[0.1em] text-[var(--color-ink-muted)]">
                  <span>Experience</span>
                  <ArrowRight className="h-2.5 w-2.5" />
                  <span>Learn</span>
                  <ArrowRight className="h-2.5 w-2.5" />
                  <span>Reflect</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

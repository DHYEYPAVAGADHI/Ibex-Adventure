import { SafeImage } from "@/components/safe-image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";
import { DynamicIcon } from "@/components/dynamic-icon";

export async function DiscoverySection() {
  const categories = await prisma.adventureCategory.findMany({
    orderBy: { displayOrder: "asc" },
  });

  if (categories.length === 0) {
    return null;
  }

  return (
    <AnimatedSection className="section-spacing">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Discover by Interest"
          title="Start with the kind of adventure that inspires you."
          description="An image-led category system designed to mirror exploration-first tourism platforms while keeping the path to enquiry simple."
        />

        <div className="mt-12 grid gap-5 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
          {categories.map((category) => {
            return (
              <Link
                key={category.id}
                href={`/programs/${category.slug}`}
                className="group relative min-h-[25rem] overflow-hidden rounded-[2rem] border border-white/10 block"
              >
                <SafeImage
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent transition duration-300 group-hover:from-slate-950/95" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
                    <DynamicIcon icon={category.icon || "Compass"} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-white">{category.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/75 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

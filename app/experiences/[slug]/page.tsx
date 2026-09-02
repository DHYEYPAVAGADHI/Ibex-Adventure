import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AttractionDetailClient } from "./attraction-detail-client";
import { ExperienceCategoryView } from "./category-view";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const attraction = await prisma.attraction.findUnique({ where: { slug } });

  if (!attraction) {
    const cat = await prisma.adventureCategory.findUnique({ where: { slug } });
    if (cat) return { title: cat.title, description: cat.description };
    return { title: "Not Found" };
  }

  const title = attraction.seoTitle || attraction.title;
  const description =
    attraction.seoDescription ||
    attraction.description?.slice(0, 160) ||
    `Explore ${attraction.title} with Ibex Adventure. Discover ${attraction.category.toLowerCase()} attractions in ${attraction.state || "India"}.`;

  return {
    title,
    description,
    keywords: attraction.seoKeywords || undefined,
    openGraph: {
      title,
      description,
      url: `https://ibexadventure.in/attractions/${slug}`,
      images: attraction.heroImage ? [{ url: attraction.heroImage, alt: attraction.title }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: attraction.heroImage ? [attraction.heroImage] : [],
    },
    alternates: {
      canonical: `https://ibexadventure.in/attractions/${slug}`,
    },
  };
}

export default async function AttractionPage({ params }: Props) {
  const { slug } = await params;

  const attraction = await prisma.attraction.findUnique({ where: { slug } });

  if (!attraction || !attraction.published) {
    // Not an attraction — maybe it's an experience category (e.g. /experiences/eat-like-a-local).
    const category = await prisma.adventureCategory.findUnique({ where: { slug } });
    if (category && category.isActive) {
      // Journeys that relate to this theme (hand-mapped keyword, matched on tags/title/overview).
      const KEYWORDS: Record<string, string[]> = {
        "walk-the-himalayas": ["Trek", "Himalaya", "Pass", "Mountain", "Ladakh", "Spiti"],
        "eat-like-a-local": ["Food", "Kerala", "culinary", "cuisine"],
        "meet-the-makers": ["Craft", "Kutch", "artisan", "weav"],
        "live-rural-india": ["rural", "village", "homestay", "Spiti", "Kutch"],
        "follow-the-rivers": ["River", "raft", "Rishikesh", "Ganga", "backwater", "Kerala"],
        "enter-the-wild": ["Wild", "safari", "forest", "Wildlife"],
        "living-history": ["Heritage", "Rajasthan", "fort", "history"],
        "indias-spirituality": ["Spiritual", "monaster", "Rishikesh", "Ladakh"],
        "learn-an-indian-art": ["Craft", "Culture", "Rajasthan", "Kerala"],
        "indias-stories": ["Culture", "Rajasthan", "community", "people"],
      };
      const kws = KEYWORDS[slug] ?? [];
      const [attractions, journeys] = await Promise.all([
        prisma.attraction.findMany({
          where: { published: true, category: slug },
          orderBy: { displayOrder: "asc" },
        }),
        prisma.package.findMany({
          where: {
            publishStatus: "Published",
            ...(kws.length
              ? {
                  OR: kws.flatMap((k) => [
                    { tags: { contains: k, mode: "insensitive" as const } },
                    { title: { contains: k, mode: "insensitive" as const } },
                    { overview: { contains: k, mode: "insensitive" as const } },
                  ]),
                }
              : {}),
          },
          take: 4,
          orderBy: { isFeatured: "desc" },
        }),
      ]);
      return (
        <ExperienceCategoryView
          category={category}
          attractions={attractions}
          journeys={journeys}
        />
      );
    }
    notFound();
  }

  // JSON-LD Structured Data
  const faqs = (() => {
    try {
      return JSON.parse(attraction.faqs) as { question: string; answer: string }[];
    } catch {
      return [];
    }
  })();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristAttraction",
        name: attraction.title,
        description: attraction.description || "",
        image: attraction.heroImage || "",
        url: `https://ibexadventure.in/attractions/${slug}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: attraction.location || "",
          addressRegion: attraction.state || "",
          addressCountry: "IN",
        },
        touristType: attraction.category,
      },
      ...(faqs.length > 0
        ? [{
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AttractionDetailClient attraction={attraction} />
    </>
  );
}

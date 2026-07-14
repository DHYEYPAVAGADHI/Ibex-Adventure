import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AttractionDetailClient } from "./attraction-detail-client";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const attraction = await prisma.attraction.findUnique({ where: { slug } });

  if (!attraction) {
    return { title: "Attraction Not Found" };
  }

  const title = attraction.seoTitle || `${attraction.title} | Ibex Adventure`;
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

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DestinationDetailClient } from "./destination-detail-client";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = await prisma.destination.findUnique({ where: { slug } });

  if (!destination) {
    return { title: "Destination Not Found" };
  }

  const title = destination.seoTitle || `${destination.title} | Ibex Adventure`;
  const description =
    destination.seoDescription ||
    destination.shortDescription ||
    `Explore ${destination.title} with Ibex Adventure. Premium travel experiences in ${destination.state || destination.country}.`;

  return {
    title,
    description,
    keywords: destination.seoKeywords || undefined,
    openGraph: {
      title,
      description,
      url: `https://ibexadventure.in/destinations/${slug}`,
      images: destination.heroImage ? [{ url: destination.heroImage, alt: destination.title }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: destination.heroImage ? [destination.heroImage] : [],
    },
    alternates: {
      canonical: `https://ibexadventure.in/destinations/${slug}`,
    },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;

  const destination = await prisma.destination.findUnique({ where: { slug } });

  if (!destination || !destination.published) {
    notFound();
  }

  // Fetch related packages: filter by title or location containing the destination name
  let relatedPackages: {
    id: string;
    slug: string;
    title: string;
    thumbnail: string | null;
    duration: string | null;
    difficulty: string | null;
    price: string | null;
    images: string;
  }[] = [];

  try {
    relatedPackages = await prisma.package.findMany({
      where: {
        status: "active",
        OR: [
          { title: { contains: destination.title } },
          { location: { contains: destination.title } },
          { location: { contains: destination.state || "__none__" } },
          { description: { contains: destination.title } },
        ],
      },
      select: {
        id: true,
        slug: true,
        title: true,
        thumbnail: true,
        duration: true,
        difficulty: true,
        price: true,
        images: true,
      },
      take: 6,
    });
  } catch {
    relatedPackages = [];
  }

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: destination.title,
    description: destination.shortDescription || destination.fullDescription || "",
    image: destination.heroImage || "",
    url: `https://ibexadventure.in/destinations/${slug}`,
    address: {
      "@type": "PostalAddress",
      addressRegion: destination.state || "",
      addressCountry: destination.country,
    },
    ...(destination.latitude && destination.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: destination.latitude,
            longitude: destination.longitude,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DestinationDetailClient
        destination={destination}
        relatedPackages={relatedPackages}
      />
    </>
  );
}

import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://ibexadventure.in";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/our-story`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/documented-treks`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/intrek-club`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/summer-camps`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/special-treks`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/upcoming-treks`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/unexplored-india`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/insoul`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  // Dynamic attraction pages
  let attractionPages: MetadataRoute.Sitemap = [];
  try {
    const attractions = await prisma.attraction.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    attractionPages = attractions.map((a) => ({
      url: `${BASE_URL}/attractions/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));
  } catch {}

  // Dynamic destination pages
  let destinationPages: MetadataRoute.Sitemap = [];
  try {
    const destinations = await prisma.destination.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    destinationPages = destinations.map((d) => ({
      url: `${BASE_URL}/destinations/${d.slug}`,
      lastModified: d.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));
  } catch {}

  // Dynamic tour/package pages
  let tourPages: MetadataRoute.Sitemap = [];
  try {
    const tours = await prisma.package.findMany({
      where: { publishStatus: "Published" },
      select: { slug: true, categorySlug: true, updatedAt: true },
    });
    tourPages = tours.map((t) => ({
      url: `${BASE_URL}/programs/${t.categorySlug}/${t.slug}`,
      lastModified: t.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));
  } catch {}

  return [...staticPages, ...attractionPages, ...destinationPages, ...tourPages];
}

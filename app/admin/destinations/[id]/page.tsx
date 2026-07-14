import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DestinationForm } from "@/components/admin/destination-form";

export const dynamic = "force-dynamic";

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const destination = await prisma.destination.findUnique({ where: { id } });
  if (!destination) notFound();

  // Parse JSON fields for the form
  function safeArr(v: string) {
    try { return JSON.parse(v); } catch { return []; }
  }
  function safeObj(v: string | null, fallback: Record<string, string>) {
    if (!v) return fallback;
    try { return JSON.parse(v); } catch { return fallback; }
  }

  const initialData = {
    id: destination.id,
    slug: destination.slug,
    title: destination.title,
    subtitle: destination.subtitle || "",
    shortDescription: destination.shortDescription || "",
    fullDescription: destination.fullDescription || "",
    heroImage: destination.heroImage || "",
    heroVideo: destination.heroVideo || "",
    gallery: safeArr(destination.gallery),
    state: destination.state || "",
    country: destination.country,
    latitude: destination.latitude || "",
    longitude: destination.longitude || "",
    googleMap: destination.googleMap || "",
    rating: String(destination.rating),
    reviewCount: String(destination.reviewCount),
    duration: destination.duration || "",
    difficulty: destination.difficulty || "moderate",
    altitude: destination.altitude || "",
    bestSeason: destination.bestSeason || "",
    weather: destination.weather || "",
    temperature: destination.temperature || "",
    thingsToDo: safeArr(destination.thingsToDo),
    highlights: safeArr(destination.highlights),
    faq: safeArr(destination.faq),
    travelTips: safeArr(destination.travelTips),
    howToReach: safeObj(destination.howToReach, { flight: "", train: "", bus: "", car: "" }),
    seoTitle: destination.seoTitle || "",
    seoDescription: destination.seoDescription || "",
    seoKeywords: destination.seoKeywords || "",
    featured: destination.featured,
    published: destination.published,
    displayOrder: String(destination.displayOrder),
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <DestinationForm initialData={initialData} isEdit />
    </div>
  );
}

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AttractionForm } from "@/components/admin/attraction-form";

export const dynamic = "force-dynamic";

export default async function EditAttractionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const attraction = await prisma.attraction.findUnique({ where: { id } });
  if (!attraction) notFound();

  function safeArr(v: string) {
    try { return JSON.parse(v); } catch { return []; }
  }

  const initialData = {
    id: attraction.id,
    slug: attraction.slug,
    title: attraction.title,
    category: attraction.category,
    heroImage: attraction.heroImage || "",
    gallery: safeArr(attraction.gallery),
    description: attraction.description || "",
    history: attraction.history || "",
    activities: safeArr(attraction.activities),
    location: attraction.location || "",
    state: attraction.state || "",
    bestTime: attraction.bestTime || "",
    entryFee: attraction.entryFee || "",
    timings: attraction.timings || "",
    travelTips: safeArr(attraction.travelTips),
    nearbyHotels: safeArr(attraction.nearbyHotels),
    restaurants: safeArr(attraction.restaurants),
    faqs: safeArr(attraction.faqs),
    featured: attraction.featured,
    published: attraction.published,
    displayOrder: String(attraction.displayOrder),
    seoTitle: attraction.seoTitle || "",
    seoDescription: attraction.seoDescription || "",
    seoKeywords: attraction.seoKeywords || "",
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <AttractionForm initialData={initialData} isEdit />
    </div>
  );
}

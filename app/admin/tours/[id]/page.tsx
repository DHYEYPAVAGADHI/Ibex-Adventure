"use client";

import { TourForm, TourFormData } from "@/components/admin/tour-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { use } from "react";

export default function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [submitting, setSubmitting] = useState(false);
  const [initialData, setInitialData] = useState<Partial<TourFormData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTour() {
      try {
        const res = await fetch(`/api/admin/tours/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        
        let parsedGallery = [];
        let parsedHighlights = [];
        let parsedImages = [];
        let parsedIncluded = [];
        let parsedExcluded = [];
        let parsedItinerary = [];
        let parsedFaqs = [];
        
        try { parsedGallery = JSON.parse(data.gallery || "[]"); } catch (e) {}
        try { parsedHighlights = JSON.parse(data.highlights || "[]"); } catch (e) {}
        try { parsedImages = JSON.parse(data.images || "[]"); } catch (e) {}
        try { parsedIncluded = JSON.parse(data.inclusions || "[]"); } catch (e) {}
        try { parsedExcluded = JSON.parse(data.exclusions || "[]"); } catch (e) {}
        try { parsedItinerary = JSON.parse(data.itinerary || "[]"); } catch (e) {}
        try { parsedFaqs = JSON.parse(data.faqs || "[]"); } catch (e) {}
        
        setInitialData({
          title: data.title || "",
          slug: data.slug || "",
          category: data.category || "Adventure",
          activity: data.activities || "",
          destination: data.location || "",
          overview: data.overview || "",
          description: data.description || "",
          image: data.banner || parsedImages[0] || "",
          thumbnail: data.thumbnail || "",
          difficulty: data.difficulty as any,
          duration: data.duration || "",
          location: data.location || "",
          season: data.season || "",
          status: data.status as any,
          isFeatured: data.isFeatured || false,
          displayOrder: data.displayOrder || 0,
          basePrice: Number(data.price || 0),
          salePrice: Number(data.discount || 0),
          ageGroupMin: data.ageGroupMin ?? 12,
          ageGroupMax: data.ageGroupMax ?? null,
          maxGroupSize: data.maxGroupSize ?? 20,
          highlights: parsedHighlights,
          gallery: parsedGallery,
          included: parsedIncluded,
          excluded: parsedExcluded,
          itinerary: parsedItinerary,
          faqs: parsedFaqs,
          seoTitle: data.seoTitle || "",
          seoDescription: data.seoDescription || "",
          seoKeywords: data.seoKeywords || "",
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchTour();
  }, [id]);

  const handleSubmit = async (data: TourFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/tours/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update tour");
      }

      router.push("/admin/tours");
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-admin-heading">Loading tour...</div>;
  }

  if (!initialData) {
    return <div className="p-8 text-admin-heading">Tour not found</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Tour</h1>
        <p className="text-slate-500 mt-2">Update the details for this expedition.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <TourForm
          initial={initialData}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}

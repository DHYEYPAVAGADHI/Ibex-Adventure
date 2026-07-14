"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImageUploader } from "@/components/admin/image-uploader";
import { PrimaryButton } from "@/components/primary-button";
import { Save, AlertCircle, Plus, Trash2 } from "lucide-react";
import { HeroSection } from "@prisma/client";

interface HeroFormProps {
  initialData?: HeroSection | null;
}

export function HeroForm({ initialData }: HeroFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parsedImages = initialData?.backgroundImages
    ? JSON.parse(initialData.backgroundImages)
    : [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
      ];

  const [form, setForm] = useState({
    headline: initialData?.headline || "Incredible Adventures",
    subtitle: initialData?.subtitle || "INSPIRED OUTDOOR JOURNEYS",
    description: initialData?.description || "Discover the world's most breathtaking landscapes and immerse yourself in unforgettable experiences with Ibex Adventure.",
    buttonText: initialData?.buttonText || "Explore Programs",
    buttonLink: initialData?.buttonLink || "#programs",
    backgroundImages: parsedImages as string[],
  });

  const handleAddImage = () => {
    setForm(prev => ({ ...prev, backgroundImages: [...prev.backgroundImages, ""] }));
  };

  const handleUpdateImage = (index: number, url: string) => {
    const newImages = [...form.backgroundImages];
    newImages[index] = url;
    setForm(prev => ({ ...prev, backgroundImages: newImages }));
  };

  const handleRemoveImage = (index: number) => {
    const newImages = form.backgroundImages.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, backgroundImages: newImages }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    // Filter out empty images
    const validImages = form.backgroundImages.filter(img => img.trim() !== "");
    if (validImages.length === 0) {
      setError("At least one background image is required.");
      setIsSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          backgroundImages: validImages
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save hero section");
      }

      router.refresh();
      alert("Hero section updated successfully.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-admin-heading">Hero Section</h1>
          <p className="text-sm text-admin-muted">Manage the homepage main banner</p>
        </div>
        <PrimaryButton type="submit" disabled={isSaving} className="gap-2">
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </PrimaryButton>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 flex gap-3 text-red-400">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr,400px] gap-8">
        <div className="space-y-8">
          <div className="rounded-2xl border border-admin-section-border bg-slate-950 p-6 space-y-6 shadow-xl">
            <h2 className="text-lg font-medium text-admin-heading border-b border-admin-section-border pb-4">Hero Content</h2>
            
            <div className="grid gap-6">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Headline</span>
                <input
                  type="text"
                  required
                  value={form.headline}
                  onChange={(e) => setForm(prev => ({ ...prev, headline: e.target.value }))}
                  className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500 text-2xl font-semibold"
                  placeholder="Incredible Adventures"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Eyebrow Subtitle (Optional)</span>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500 uppercase tracking-widest text-sm"
                  placeholder="INSPIRED OUTDOOR JOURNEYS"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Description (Optional)</span>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full resize-none rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500"
                  placeholder="Discover the world's most breathtaking landscapes..."
                />
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-admin-section-border bg-slate-950 p-6 space-y-6 shadow-xl">
            <h2 className="text-lg font-medium text-admin-heading border-b border-admin-section-border pb-4">Call to Action (Button)</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Button Text</span>
                <input
                  type="text"
                  value={form.buttonText}
                  onChange={(e) => setForm(prev => ({ ...prev, buttonText: e.target.value }))}
                  className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500"
                  placeholder="Explore Programs"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Button Link</span>
                <input
                  type="text"
                  value={form.buttonLink}
                  onChange={(e) => setForm(prev => ({ ...prev, buttonLink: e.target.value }))}
                  className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500"
                  placeholder="#programs"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Sidebar: Background Images */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-admin-section-border bg-slate-950 p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-admin-section-border pb-4 mb-6">
              <h2 className="text-lg font-medium text-admin-heading">Background Images</h2>
              <button
                type="button"
                onClick={handleAddImage}
                className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2 py-1 text-xs font-medium text-admin-heading hover:bg-white/20 transition-colors"
              >
                <Plus className="h-3 w-3" /> Add Image
              </button>
            </div>
            
            <div className="space-y-8">
              {form.backgroundImages.map((img, index) => (
                <div key={index} className="space-y-3 relative group">
                  <div className="flex justify-between items-center text-xs text-admin-muted mb-1">
                    <span>Slide {index + 1}</span>
                    {form.backgroundImages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-admin-section-border bg-slate-900 flex items-center justify-center">
                    {img ? (
                      <Image
                        src={typeof img === 'string' && img.trim() !== "" ? img : "/placeholder.svg"}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="400px"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-6 text-admin-muted">
                        <AlertCircle className="h-8 w-8 mb-2 opacity-50" />
                        <span className="text-xs">No Image</span>
                      </div>
                    )}
                  </div>

                  <ImageUploader
                    value={img}
                    onChange={(url) => handleUpdateImage(index, url)}
                    label=""
                  />
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-white/5 p-4 mt-8">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-admin-muted mb-3">Guidelines</h4>
              <div className="space-y-2 text-sm text-admin-muted">
                <div className="flex justify-between">
                  <span>Recommended</span>
                  <span className="text-admin-heading">1920 × 1080 px</span>
                </div>
                <div className="flex justify-between">
                  <span>Formats</span>
                  <span className="text-admin-heading">WEBP, JPG</span>
                </div>
                <p className="text-xs mt-3 leading-relaxed">
                  Images will crossfade automatically every 8 seconds. Minimum 1 image required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

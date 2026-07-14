"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImageUploader } from "@/components/admin/image-uploader";
import { PrimaryButton } from "@/components/primary-button";
import { ChevronLeft, Save, AlertCircle } from "lucide-react";
import Link from "next/link";
import { HomepageAdventureCard } from "@prisma/client";

interface CardFormProps {
  initialData?: HomepageAdventureCard;
}

export function CardForm({ initialData }: CardFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    description: initialData?.description || "",
    coverImage: initialData?.coverImage || "",
    iconType: initialData?.iconType || "lucide",
    icon: initialData?.icon || "Mountain",
    buttonText: initialData?.buttonText || "Explore",
    buttonLink: initialData?.buttonLink || "/",
    status: initialData?.status || "Published",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const url = initialData 
        ? `/api/admin/homepage-cards/${initialData.id}`
        : "/api/admin/homepage-cards";
      
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save card");
      }

      router.push("/admin/homepage-cards");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveImage = () => {
    setForm(prev => ({ ...prev, coverImage: "" }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/homepage-cards"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-admin-muted hover:bg-white/10 hover:text-admin-heading transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-admin-heading">
              {initialData ? "Edit Card" : "New Card"}
            </h1>
            <p className="text-sm text-admin-muted">Manage homepage adventure card details</p>
          </div>
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
            <h2 className="text-lg font-medium text-admin-heading border-b border-admin-section-border pb-4">Card Details</h2>
            
            <div className="grid gap-6">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Title</span>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500"
                  placeholder="e.g. Trekking"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Subtitle (Optional)</span>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500"
                  placeholder="e.g. High Altitude"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Description</span>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full resize-none rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500"
                  placeholder="Conquer the world's most spectacular mountain trails."
                />
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-admin-section-border bg-slate-950 p-6 space-y-6 shadow-xl">
            <h2 className="text-lg font-medium text-admin-heading border-b border-admin-section-border pb-4">Actions & Display</h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Button Text</span>
                <input
                  type="text"
                  required
                  value={form.buttonText}
                  onChange={(e) => setForm(prev => ({ ...prev, buttonText: e.target.value }))}
                  className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500"
                  placeholder="Explore"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Button Link</span>
                <input
                  type="text"
                  required
                  value={form.buttonLink}
                  onChange={(e) => setForm(prev => ({ ...prev, buttonLink: e.target.value }))}
                  className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500"
                  placeholder="/programs/trekking"
                />
              </label>
              
              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Icon Name</span>
                <input
                  type="text"
                  required
                  value={form.icon}
                  onChange={(e) => setForm(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500"
                  placeholder="Mountain"
                />
                <span className="text-xs text-admin-muted">Lucide icon name (e.g., Mountain, Tent, Camera)</span>
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Status</span>
                <select
                  value={form.status}
                  onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500 appearance-none"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Archived">Archived</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Sidebar: Image Upload */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-admin-section-border bg-slate-950 p-6 shadow-xl sticky top-24">
            <h2 className="text-lg font-medium text-admin-heading border-b border-admin-section-border pb-4 mb-6">Cover Image</h2>
            
            <div className="space-y-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-admin-section-border bg-slate-900 flex items-center justify-center">
                {form.coverImage ? (
                  <Image
                    src={typeof form.coverImage === 'string' && form.coverImage.trim() !== "" ? form.coverImage : "/placeholder.svg"}
                    alt="Cover Preview"
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6 text-admin-muted">
                    <AlertCircle className="h-10 w-10 mb-3 opacity-50 text-amber-500" />
                    <span className="text-sm font-medium text-admin-muted">⚠ No Image Uploaded</span>
                    <span className="text-xs mt-1">Frontend will use fallback</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ImageUploader
                  value={form.coverImage}
                  onChange={(url) => setForm(prev => ({ ...prev, coverImage: url }))}
                  label=""
                />
              </div>

              <div className="rounded-xl bg-white/5 p-4 mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-admin-muted mb-3">Guidelines</h4>
                <div className="space-y-2 text-sm text-admin-muted">
                  <div className="flex justify-between">
                    <span>Recommended</span>
                    <span className="text-admin-heading">1600 × 2000 px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Formats</span>
                    <span className="text-admin-heading">PNG, JPG, WEBP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

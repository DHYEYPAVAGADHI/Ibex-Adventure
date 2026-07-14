"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "@/components/admin/image-uploader";
import { AdventureCategoryPreview } from "./adventure-category-preview";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const PRESET_ICONS = [
  "Mountain", "Tent", "Camera", "Castle", "Trees", "Map", "Compass", "MapPin", "Navigation", "Binoculars", "Sunrise", "Sunset", "Snowflake", "Flame", "Footprints", "Backpack", "Palmtree"
];

interface CategoryData {
  id?: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: string;
  isActive: boolean;
  isFeatured: boolean;
  linkType: string;
  activitySlug: string | null;
  customUrl: string | null;
}

interface FormProps {
  initialData?: CategoryData | null;
}

export function AdventureCategoryForm({ initialData }: FormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState<CategoryData>(initialData || {
    title: "",
    slug: "",
    description: "",
    image: "",
    imageAlt: "",
    icon: "Mountain",
    isActive: true,
    isFeatured: false,
    linkType: "internal",
    activitySlug: "",
    customUrl: "",
  });

  const [iconMode, setIconMode] = useState<"preset" | "custom">(
    formData.icon?.startsWith("http") || formData.icon?.startsWith("/") ? "custom" : "preset"
  );

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug === generateSlug(prev.title) || !prev.slug ? generateSlug(title) : prev.slug,
      imageAlt: prev.imageAlt === prev.title || !prev.imageAlt ? title : prev.imageAlt,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const isEdit = !!formData.id;
      const url = isEdit ? `/api/admin/categories/${formData.id}` : "/api/admin/categories";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save category");

      router.push("/admin/categories");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-4">
              <Link href="/admin/categories" className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h2 className="text-xl font-bold text-slate-800">
                {initialData ? "Edit Category" : "Create Category"}
              </h2>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-amber-400 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {loading ? "Saving..." : "Save Category"}
            </button>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Category Title <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  placeholder="e.g. Trekking"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">URL Slug <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  placeholder="e.g. trekking"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Short Description <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                placeholder="e.g. Discover the most breathtaking trails."
              />
            </div>

            {/* Cover Image */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
              <h3 className="mb-4 text-sm font-bold text-slate-800">Cover Image</h3>
              <div className="bg-slate-950 p-4 rounded-xl mb-4">
                <ImageUploader 
                  value={formData.image} 
                  onChange={(url) => setFormData({ ...formData, image: url })} 
                  label="Category Cover (Recommended size: 800x1000)"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Image Alt Text <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  value={formData.imageAlt}
                  onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Icon */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-800">Category Icon</h3>
                <div className="flex rounded-lg bg-slate-200 p-1">
                  <button
                    type="button"
                    onClick={() => setIconMode("preset")}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition ${iconMode === "preset" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    Lucide Icon
                  </button>
                  <button
                    type="button"
                    onClick={() => setIconMode("custom")}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition ${iconMode === "custom" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    Custom SVG
                  </button>
                </div>
              </div>

              {iconMode === "preset" ? (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Select Icon</label>
                  <select
                    value={PRESET_ICONS.includes(formData.icon) ? formData.icon : "Mountain"}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  >
                    {PRESET_ICONS.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="bg-slate-950 p-4 rounded-xl">
                  <ImageUploader 
                    value={formData.icon.startsWith("http") || formData.icon.startsWith("/") ? formData.icon : ""} 
                    onChange={(url) => setFormData({ ...formData, icon: url })} 
                    label="Upload SVG Icon"
                  />
                </div>
              )}
            </div>

            {/* Destination Link */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
              <h3 className="mb-4 text-sm font-bold text-slate-800">Destination Link</h3>
              
              <div className="mb-4 flex gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input 
                    type="radio" 
                    name="linkType" 
                    checked={formData.linkType === "internal"} 
                    onChange={() => setFormData({ ...formData, linkType: "internal" })} 
                    className="text-amber-500 focus:ring-amber-500"
                  />
                  Internal Activity
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input 
                    type="radio" 
                    name="linkType" 
                    checked={formData.linkType === "custom"} 
                    onChange={() => setFormData({ ...formData, linkType: "custom" })} 
                    className="text-amber-500 focus:ring-amber-500"
                  />
                  Custom URL
                </label>
              </div>

              {formData.linkType === "internal" ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Activity Slug</label>
                  <input
                    type="text"
                    value={formData.activitySlug || ""}
                    onChange={(e) => setFormData({ ...formData, activitySlug: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    placeholder="e.g. trekking"
                  />
                  <p className="text-xs text-slate-500">Links to /programs/[slug]</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Custom URL</label>
                  <input
                    type="url"
                    value={formData.customUrl || ""}
                    onChange={(e) => setFormData({ ...formData, customUrl: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    placeholder="https://..."
                  />
                </div>
              )}
            </div>

            {/* Status & Featured */}
            <div className="grid gap-6 md:grid-cols-2">
              <label className="flex items-center justify-between rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                <div>
                  <div className="font-bold text-slate-800">Active Status</div>
                  <div className="text-xs text-slate-500">Show on website</div>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 checked:border-amber-500 checked:right-0 transition-all duration-300" style={{ right: formData.isActive ? '0' : '1.5rem', borderColor: formData.isActive ? '#f59e0b' : '#cbd5e1', backgroundColor: formData.isActive ? '#f59e0b' : 'white' }} />
                  <label className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${formData.isActive ? 'bg-amber-200' : 'bg-slate-200'}`}></label>
                </div>
              </label>

              <label className="flex items-center justify-between rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                <div>
                  <div className="font-bold text-slate-800">Featured</div>
                  <div className="text-xs text-slate-500">Highlight category</div>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 checked:border-amber-500 checked:right-0 transition-all duration-300" style={{ right: formData.isFeatured ? '0' : '1.5rem', borderColor: formData.isFeatured ? '#f59e0b' : '#cbd5e1', backgroundColor: formData.isFeatured ? '#f59e0b' : 'white' }} />
                  <label className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${formData.isFeatured ? 'bg-amber-200' : 'bg-slate-200'}`}></label>
                </div>
              </label>
            </div>
            
          </div>
        </form>
      </div>

      <div className="lg:sticky lg:top-8">
        <AdventureCategoryPreview 
          title={formData.title}
          description={formData.description}
          image={formData.image}
          icon={formData.icon}
        />
      </div>
    </div>
  );
}

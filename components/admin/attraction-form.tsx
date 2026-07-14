"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Loader2 } from "lucide-react";
import { ImageUploader } from "@/components/admin/image-uploader";

export interface AttractionFormData {
  slug: string;
  title: string;
  category: string;
  heroImage: string;
  gallery: string[];
  description: string;
  history: string;
  activities: string[];
  location: string;
  state: string;
  bestTime: string;
  entryFee: string;
  timings: string;
  travelTips: string[];
  nearbyHotels: { name: string; distance: string; priceRange: string }[];
  restaurants: { name: string; cuisine: string; distance: string }[];
  faqs: { question: string; answer: string }[];
  featured: boolean;
  published: boolean;
  displayOrder: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

interface Props {
  initialData?: Partial<AttractionFormData> & { id?: string };
  isEdit?: boolean;
}

const inputCls = "w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-amber-500/50 focus:outline-none transition-colors";
const textareaCls = `${inputCls} resize-none`;
const labelCls = "block mb-1.5 text-sm font-medium text-admin-label";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-full">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400/70 pt-4 pb-1 border-b border-admin-section-border">
        {children}
      </h3>
    </div>
  );
}

const CATEGORIES = ["Natural", "Historical", "Cultural", "Adventure", "Religious", "Wildlife", "Beach", "Mountain"];

export function AttractionForm({ initialData, isEdit }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function toArr<T>(v: unknown, fallback: T[]): T[] {
    if (Array.isArray(v)) return v as T[];
    if (typeof v === "string") {
      try { return JSON.parse(v) as T[]; } catch { return fallback; }
    }
    return fallback;
  }

  const [form, setForm] = useState<AttractionFormData>({
    slug: initialData?.slug ?? "",
    title: initialData?.title ?? "",
    category: initialData?.category ?? "Natural",
    heroImage: initialData?.heroImage ?? "",
    gallery: toArr(initialData?.gallery, []),
    description: initialData?.description ?? "",
    history: initialData?.history ?? "",
    activities: toArr<string>(initialData?.activities, []),
    location: initialData?.location ?? "",
    state: initialData?.state ?? "",
    bestTime: initialData?.bestTime ?? "",
    entryFee: initialData?.entryFee ?? "",
    timings: initialData?.timings ?? "",
    travelTips: toArr<string>(initialData?.travelTips, []),
    nearbyHotels: toArr(initialData?.nearbyHotels, []),
    restaurants: toArr(initialData?.restaurants, []),
    faqs: toArr(initialData?.faqs, []),
    featured: initialData?.featured ?? false,
    published: initialData?.published ?? true,
    displayOrder: String(initialData?.displayOrder ?? "0"),
    seoTitle: initialData?.seoTitle ?? "",
    seoDescription: initialData?.seoDescription ?? "",
    seoKeywords: initialData?.seoKeywords ?? "",
  });

  function set<K extends keyof AttractionFormData>(key: K, val: AttractionFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = isEdit
        ? `/api/admin/attractions/${initialData?.id}`
        : "/api/admin/attractions";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      router.push("/admin/attractions");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  const addGalleryImage = (url: string) => {
    if (url && !form.gallery.includes(url)) set("gallery", [...form.gallery, url]);
  };
  const removeGalleryImage = (i: number) => set("gallery", form.gallery.filter((_, idx) => idx !== i));

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-admin-heading">{isEdit ? "Edit Attraction" : "New Attraction"}</h1>
          <p className="text-sm text-admin-muted mt-1">All content is CMS-driven.</p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()} className="px-4 py-2 rounded-xl text-sm text-admin-muted border border-admin-section-border hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 text-slate-900 font-semibold text-sm hover:bg-amber-400 disabled:opacity-50 transition-colors">
            {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : (isEdit ? "Update" : "Create")}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionTitle>Basic Information</SectionTitle>

        <Field label="Title *">
          <input
            type="text"
            value={form.title}
            onChange={(e) => { set("title", e.target.value); if (!isEdit) set("slug", autoSlug(e.target.value)); }}
            className={inputCls}
            placeholder="e.g. Spiti Valley"
            required
          />
        </Field>

        <Field label="Slug *">
          <input type="text" value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inputCls} placeholder="e.g. spiti-valley" required />
        </Field>

        <Field label="Category">
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>
            {CATEGORIES.map((c) => <option key={c} value={c} className="bg-slate-800">{c}</option>)}
          </select>
        </Field>

        <Field label="Display Order">
          <input type="number" value={form.displayOrder} onChange={(e) => set("displayOrder", e.target.value)} className={inputCls} min={0} />
        </Field>

        <Field label="Location">
          <input type="text" value={form.location} onChange={(e) => set("location", e.target.value)} className={inputCls} placeholder="e.g. Lahaul & Spiti, HP" />
        </Field>

        <Field label="State">
          <input type="text" value={form.state} onChange={(e) => set("state", e.target.value)} className={inputCls} placeholder="e.g. Himachal Pradesh" />
        </Field>

        <div className="col-span-full flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="h-4 w-4 rounded accent-amber-500" />
            <span className="text-sm text-admin-label">Published</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} className="h-4 w-4 rounded accent-amber-500" />
            <span className="text-sm text-admin-label">Featured</span>
          </label>
        </div>

        <div className="col-span-full">
          <Field label="Description">
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} className={textareaCls} rows={5} placeholder="Main description (use double line breaks for paragraphs)" />
          </Field>
        </div>

        <div className="col-span-full">
          <Field label="History & Background">
            <textarea value={form.history} onChange={(e) => set("history", e.target.value)} className={textareaCls} rows={4} placeholder="Historical or cultural context" />
          </Field>
        </div>

        <SectionTitle>Hero & Gallery</SectionTitle>
        <div className="col-span-full">
          <ImageUploader label="Hero Image" value={form.heroImage} onChange={(url) => set("heroImage", url)} />
        </div>
        <div className="col-span-full space-y-3">
          <p className={labelCls}>Gallery Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {form.gallery.map((img, i) => (
              <div key={i} className="relative group rounded-xl overflow-hidden border border-admin-section-border" style={{ height: 100 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={typeof img === 'string' && img.trim() !== "" ? img : "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeGalleryImage(i)} className="absolute top-1 right-1 bg-black/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="h-3.5 w-3.5 text-admin-heading" />
                </button>
              </div>
            ))}
          </div>
          <ImageUploader label="Add Gallery Image" value="" onChange={addGalleryImage} />
        </div>

        <SectionTitle>Visitor Information</SectionTitle>
        <Field label="Best Time to Visit">
          <input type="text" value={form.bestTime} onChange={(e) => set("bestTime", e.target.value)} className={inputCls} placeholder="e.g. October – March" />
        </Field>
        <Field label="Entry Fee">
          <input type="text" value={form.entryFee} onChange={(e) => set("entryFee", e.target.value)} className={inputCls} placeholder="e.g. ₹50 per person / Free" />
        </Field>
        <div className="col-span-full">
          <Field label="Timings">
            <input type="text" value={form.timings} onChange={(e) => set("timings", e.target.value)} className={inputCls} placeholder="e.g. 6:00 AM – 8:00 PM (closed Mondays)" />
          </Field>
        </div>

        <SectionTitle>Activities</SectionTitle>
        <div className="col-span-full space-y-2">
          {form.activities.map((act, i) => (
            <div key={i} className="flex gap-2">
              <input type="text" value={act} onChange={(e) => {
                const arr = [...form.activities]; arr[i] = e.target.value; set("activities", arr);
              }} className={inputCls} placeholder="Activity name" />
              <button type="button" onClick={() => set("activities", form.activities.filter((_, j) => j !== i))} className="flex h-10 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors flex-shrink-0">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => set("activities", [...form.activities, ""])} className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors">
            <Plus className="h-4 w-4" /> Add Activity
          </button>
        </div>

        <SectionTitle>Travel Tips</SectionTitle>
        <div className="col-span-full space-y-2">
          {form.travelTips.map((tip, i) => (
            <div key={i} className="flex gap-2">
              <input type="text" value={tip} onChange={(e) => {
                const arr = [...form.travelTips]; arr[i] = e.target.value; set("travelTips", arr);
              }} className={inputCls} placeholder="Travel tip" />
              <button type="button" onClick={() => set("travelTips", form.travelTips.filter((_, j) => j !== i))} className="flex h-10 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors flex-shrink-0">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => set("travelTips", [...form.travelTips, ""])} className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors">
            <Plus className="h-4 w-4" /> Add Tip
          </button>
        </div>

        <SectionTitle>Nearby Hotels</SectionTitle>
        <div className="col-span-full space-y-3">
          {form.nearbyHotels.map((h, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_36px] gap-2">
              <input type="text" value={h.name} onChange={(e) => {
                const arr = [...form.nearbyHotels]; arr[i] = { ...arr[i], name: e.target.value }; set("nearbyHotels", arr);
              }} className={inputCls} placeholder="Hotel name" />
              <input type="text" value={h.distance} onChange={(e) => {
                const arr = [...form.nearbyHotels]; arr[i] = { ...arr[i], distance: e.target.value }; set("nearbyHotels", arr);
              }} className={inputCls} placeholder="Distance (e.g. 2 km)" />
              <input type="text" value={h.priceRange} onChange={(e) => {
                const arr = [...form.nearbyHotels]; arr[i] = { ...arr[i], priceRange: e.target.value }; set("nearbyHotels", arr);
              }} className={inputCls} placeholder="Price range" />
              <button type="button" onClick={() => set("nearbyHotels", form.nearbyHotels.filter((_, j) => j !== i))} className="flex h-10 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => set("nearbyHotels", [...form.nearbyHotels, { name: "", distance: "", priceRange: "" }])} className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors">
            <Plus className="h-4 w-4" /> Add Hotel
          </button>
        </div>

        <SectionTitle>Restaurants</SectionTitle>
        <div className="col-span-full space-y-3">
          {form.restaurants.map((r, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_36px] gap-2">
              <input type="text" value={r.name} onChange={(e) => {
                const arr = [...form.restaurants]; arr[i] = { ...arr[i], name: e.target.value }; set("restaurants", arr);
              }} className={inputCls} placeholder="Restaurant name" />
              <input type="text" value={r.cuisine} onChange={(e) => {
                const arr = [...form.restaurants]; arr[i] = { ...arr[i], cuisine: e.target.value }; set("restaurants", arr);
              }} className={inputCls} placeholder="Cuisine type" />
              <input type="text" value={r.distance} onChange={(e) => {
                const arr = [...form.restaurants]; arr[i] = { ...arr[i], distance: e.target.value }; set("restaurants", arr);
              }} className={inputCls} placeholder="Distance" />
              <button type="button" onClick={() => set("restaurants", form.restaurants.filter((_, j) => j !== i))} className="flex h-10 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => set("restaurants", [...form.restaurants, { name: "", cuisine: "", distance: "" }])} className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors">
            <Plus className="h-4 w-4" /> Add Restaurant
          </button>
        </div>

        <SectionTitle>FAQs</SectionTitle>
        <div className="col-span-full space-y-3">
          {form.faqs.map((item, i) => (
            <div key={i} className="rounded-xl border border-admin-section-border bg-slate-900/40 p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium text-admin-muted uppercase tracking-wider">FAQ {i + 1}</p>
                <button type="button" onClick={() => set("faqs", form.faqs.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-300">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <input type="text" value={item.question} onChange={(e) => {
                const arr = [...form.faqs]; arr[i] = { ...arr[i], question: e.target.value }; set("faqs", arr);
              }} className={inputCls} placeholder="Question" />
              <textarea value={item.answer} onChange={(e) => {
                const arr = [...form.faqs]; arr[i] = { ...arr[i], answer: e.target.value }; set("faqs", arr);
              }} className={textareaCls} rows={2} placeholder="Answer" />
            </div>
          ))}
          <button type="button" onClick={() => set("faqs", [...form.faqs, { question: "", answer: "" }])} className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors">
            <Plus className="h-4 w-4" /> Add FAQ
          </button>
        </div>

        <SectionTitle>SEO</SectionTitle>
        <div className="col-span-full">
          <Field label="SEO Title">
            <input type="text" value={form.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} className={inputCls} placeholder={`${form.title || "Attraction"} | Ibex Adventure`} />
          </Field>
        </div>
        <div className="col-span-full">
          <Field label="SEO Description">
            <textarea value={form.seoDescription} onChange={(e) => set("seoDescription", e.target.value)} className={textareaCls} rows={2} placeholder="150-160 character meta description" />
          </Field>
        </div>
        <div className="col-span-full">
          <Field label="SEO Keywords">
            <input type="text" value={form.seoKeywords} onChange={(e) => set("seoKeywords", e.target.value)} className={inputCls} placeholder="keyword1, keyword2, keyword3" />
          </Field>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-admin-section-border">
        <button type="button" onClick={() => router.back()} className="px-4 py-2 rounded-xl text-sm text-admin-muted border border-admin-section-border hover:bg-white/5 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2 rounded-xl bg-amber-500 text-slate-900 font-semibold text-sm hover:bg-amber-400 disabled:opacity-50 transition-colors">
          {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : (isEdit ? "Update Attraction" : "Create Attraction")}
        </button>
      </div>
    </form>
  );
}

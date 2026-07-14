"use client";

import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { ImageUploader } from "@/components/admin/image-uploader";

export interface TourFormData {
  title: string;
  slug: string;
  category: string;
  activity: string;
  destination: string;
  overview: string;
  description: string;
  image: string; // Hero Image
  thumbnail: string;
  difficulty: string;
  duration: string; // Changed from number to string for "5 Days / 4 Nights"
  ageGroupMin: number;
  ageGroupMax: number | null;
  maxGroupSize: number;
  basePrice: number;
  salePrice: number;
  location: string;
  season: string;
  status: "active" | "draft" | "archived";
  isFeatured: boolean;
  displayOrder: number;
  highlights: string[];
  gallery: string[];
  included: string[];
  excluded: string[];
  itinerary: { day: string; title: string; description: string; meals: string; stay: string }[];
  faqs: { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

interface TourFormProps {
  initial?: Partial<TourFormData>;
  onSubmit: (data: TourFormData) => Promise<void>;
  submitting: boolean;
  submitLabel: string;
}

// Dynamically fetched inside component

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-admin-label">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-amber-500/50 focus:outline-none transition-colors";
const selectCls = `${inputCls} appearance-none cursor-pointer`;
const textareaCls = "w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-amber-500/50 focus:outline-none transition-colors resize-none";

export function TourForm({ initial = {}, onSubmit, submitting, submitLabel }: TourFormProps) {
  const [form, setForm] = useState<TourFormData>({
    title: initial.title ?? "",
    slug: initial.slug ?? "",
    category: initial.category ?? "Adventure",
    activity: initial.activity ?? "",
    destination: initial.destination ?? "",
    overview: initial.overview ?? "",
    description: initial.description ?? "",
    image: initial.image ?? "",
    thumbnail: initial.thumbnail ?? "",
    difficulty: initial.difficulty ?? "moderate",
    duration: initial.duration ?? "",
    ageGroupMin: initial.ageGroupMin ?? 12,
    ageGroupMax: initial.ageGroupMax ?? null,
    maxGroupSize: initial.maxGroupSize ?? 20,
    basePrice: initial.basePrice ?? 0,
    salePrice: initial.salePrice ?? 0,
    location: initial.location ?? "",
    season: initial.season ?? "Year-round",
    status: initial.status ?? "draft",
    isFeatured: initial.isFeatured ?? false,
    displayOrder: initial.displayOrder ?? 0,
    highlights: initial.highlights ?? [],
    gallery: initial.gallery ?? [],
    included: initial.included ?? [],
    excluded: initial.excluded ?? [],
    itinerary: initial.itinerary ?? [],
    faqs: initial.faqs ?? [],
    seoTitle: initial.seoTitle ?? "",
    seoDescription: initial.seoDescription ?? "",
    seoKeywords: initial.seoKeywords ?? "",
  });

  const [highlightInput, setHighlightInput] = useState("");
  const [includedInput, setIncludedInput] = useState("");
  const [excludedInput, setExcludedInput] = useState("");
  const [galleryUrlInput, setGalleryUrlInput] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<{title: string, slug: string}[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data.map((c: any) => ({ title: c.title, slug: c.slug })));
        }
      })
      .catch(console.error);
  }, []);

  function set<K extends keyof TourFormData>(key: K, value: TourFormData[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }

  function addArrayItem(field: "highlights" | "included" | "excluded", input: string, setInput: (v: string) => void) {
    const v = input.trim();
    if (v && !form[field].includes(v)) {
      set(field, [...form[field], v]);
      setInput("");
    }
  }

  function removeArrayItem(field: "highlights" | "included" | "excluded", i: number) {
    set(field, form[field].filter((_, idx) => idx !== i));
  }

  function addGalleryUrl() {
    const u = galleryUrlInput.trim();
    if (u && !form.gallery.includes(u)) {
      set("gallery", [...form.gallery, u]);
      setGalleryUrlInput("");
    }
  }

  function addItinerary() {
    set("itinerary", [...form.itinerary, { day: `Day ${form.itinerary.length + 1}`, title: "", description: "", meals: "", stay: "" }]);
  }

  function updateItinerary(i: number, key: string, value: string) {
    const newItin = [...form.itinerary];
    newItin[i] = { ...newItin[i], [key]: value };
    set("itinerary", newItin);
  }

  function removeItinerary(i: number) {
    set("itinerary", form.itinerary.filter((_, idx) => idx !== i));
  }

  function addFaq() {
    set("faqs", [...form.faqs, { question: "", answer: "" }]);
  }

  function updateFaq(i: number, key: string, value: string) {
    const newFaqs = [...form.faqs];
    newFaqs[i] = { ...newFaqs[i], [key]: value };
    set("faqs", newFaqs);
  }

  function removeFaq(i: number) {
    set("faqs", form.faqs.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.title.trim()) { setError("Tour name is required."); return; }
    if (!form.slug.trim()) { setError("Slug is required."); return; }
    try {
      await onSubmit(form);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
      )}

      {/* Basic Info */}
      <section className="rounded-2xl border border-admin-section-border bg-admin-section-bg shadow-sm p-6 space-y-5">
        <h2 className="text-base font-semibold text-admin-heading">Basic Information</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Tour Name *">
            <input type="text" required value={form.title} placeholder="e.g. Manali Summit Trek"
              onChange={e => { set("title", e.target.value); if (!initial.slug) set("slug", autoSlug(e.target.value)); }}
              className={inputCls} />
          </Field>
          <Field label="URL Slug *">
            <input type="text" required value={form.slug} placeholder="manali-summit-trek"
              onChange={e => set("slug", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Category">
            <select value={form.category} onChange={e => set("category", e.target.value)} className={selectCls}>
              {categories.map(c => <option key={c.slug} value={c.title}>{c.title}</option>)}
            </select>
          </Field>
          <Field label="Activity">
            <input type="text" value={form.activity} placeholder="e.g. Trekking, Safari"
              onChange={e => set("activity", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Destination">
            <input type="text" value={form.destination} placeholder="e.g. Manali, Spiti"
              onChange={e => set("destination", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Publish Status">
            <select value={form.status} onChange={e => set("status", e.target.value as any)} className={selectCls}>
              <option value="draft">Draft</option>
              <option value="active">Active (Published)</option>
              <option value="archived">Archived</option>
            </select>
          </Field>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isFeatured} onChange={e => set("isFeatured", e.target.checked)} className="w-4 h-4 rounded border-white/10 bg-slate-800 text-amber-500 focus:ring-amber-500/50" />
            <span className="text-sm font-medium text-admin-label">Featured Tour</span>
          </label>
          <Field label="Display Order">
            <input type="number" value={form.displayOrder} onChange={e => set("displayOrder", Number(e.target.value))} className={inputCls} />
          </Field>
        </div>
        <Field label="Short Description (Overview)">
          <textarea rows={2} value={form.overview} placeholder="Brief summary for cards..."
            onChange={e => set("overview", e.target.value)} className={textareaCls} />
        </Field>
        <Field label="Detailed Description">
          <textarea rows={5} value={form.description} placeholder="Full description of this tour..."
            onChange={e => set("description", e.target.value)} className={textareaCls} />
        </Field>
      </section>

      {/* Media */}
      <section className="rounded-2xl border border-admin-section-border bg-admin-section-bg shadow-sm p-6 space-y-5">
        <h2 className="text-base font-semibold text-admin-heading">Media</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <ImageUploader label="Hero Image (Banner)" value={form.image} onChange={url => set("image", url)} />
          <ImageUploader label="Thumbnail Image (Cards)" value={form.thumbnail} onChange={url => set("thumbnail", url)} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-admin-label">Gallery Images</label>
          <div className="flex gap-2">
            <input type="url" value={galleryUrlInput} onChange={e => setGalleryUrlInput(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className={`${inputCls} flex-1`} />
            <button type="button" onClick={addGalleryUrl}
              className="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-admin-heading hover:bg-white/15 transition-colors flex-shrink-0">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {form.gallery.length > 0 && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {form.gallery.map((url, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2">
                  <span className="flex-1 truncate text-xs text-admin-muted">{url}</span>
                  <button type="button" onClick={() => set("gallery", form.gallery.filter((_, idx) => idx !== i))}
                    className="text-admin-muted hover:text-red-400 transition-colors">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Logistics & Pricing */}
      <section className="rounded-2xl border border-admin-section-border bg-admin-section-bg shadow-sm p-6 space-y-5">
        <h2 className="text-base font-semibold text-admin-heading">Logistics & Pricing</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Location">
            <input type="text" value={form.location} placeholder="e.g. Manali, Himachal Pradesh"
              onChange={e => set("location", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Season">
            <input type="text" value={form.season} placeholder="e.g. May - October"
              onChange={e => set("season", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Duration">
            <input type="text" value={form.duration} placeholder="e.g. 5 Days / 4 Nights"
              onChange={e => set("duration", e.target.value)} className={inputCls} />
          </Field>
          <Field label="Difficulty">
            <select value={form.difficulty} onChange={e => set("difficulty", e.target.value as any)} className={selectCls}>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="challenging">Challenging</option>
              <option value="expert">Expert</option>
            </select>
          </Field>
          <Field label="Base Price (₹)">
            <input type="number" min={0} value={form.basePrice}
              onChange={e => set("basePrice", Number(e.target.value))} className={inputCls} />
          </Field>
          <Field label="Sale Price (₹) (Optional)">
            <input type="number" min={0} value={form.salePrice}
              onChange={e => set("salePrice", Number(e.target.value))} className={inputCls} />
          </Field>
          <Field label="Min Age">
            <input type="number" min={0} value={form.ageGroupMin}
              onChange={e => set("ageGroupMin", Number(e.target.value))} className={inputCls} />
          </Field>
          <Field label="Max Age (leave 0 for no limit)">
            <input type="number" min={0} value={form.ageGroupMax ?? 0}
              onChange={e => set("ageGroupMax", Number(e.target.value) || null)} className={inputCls} />
          </Field>
          <Field label="Max Group Size">
            <input type="number" min={1} value={form.maxGroupSize}
              onChange={e => set("maxGroupSize", Number(e.target.value))} className={inputCls} />
          </Field>
        </div>
      </section>

      {/* Lists: Highlights, Included, Excluded */}
      <section className="rounded-2xl border border-admin-section-border bg-admin-section-bg shadow-sm p-6 space-y-5">
        <h2 className="text-base font-semibold text-admin-heading">Tour Features</h2>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Highlights */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-admin-label">Highlights</label>
            <div className="flex gap-2 mb-3">
              <input type="text" value={highlightInput} onChange={e => setHighlightInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addArrayItem("highlights", highlightInput, setHighlightInput); } }}
                className={`${inputCls} flex-1`} placeholder="Add highlight..." />
              <button type="button" onClick={() => addArrayItem("highlights", highlightInput, setHighlightInput)} className="rounded-xl bg-white/10 px-3 hover:bg-white/15">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <ul className="space-y-2">
              {form.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2">
                  <span className="flex-1 text-xs text-white/80">{h}</span>
                  <button type="button" onClick={() => removeArrayItem("highlights", i)} className="text-admin-muted hover:text-red-400"><X className="h-3 w-3" /></button>
                </li>
              ))}
            </ul>
          </div>

          {/* Included */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-admin-label">What&apos;s Included</label>
            <div className="flex gap-2 mb-3">
              <input type="text" value={includedInput} onChange={e => setIncludedInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addArrayItem("included", includedInput, setIncludedInput); } }}
                className={`${inputCls} flex-1`} placeholder="Meals, Guide..." />
              <button type="button" onClick={() => addArrayItem("included", includedInput, setIncludedInput)} className="rounded-xl bg-white/10 px-3 hover:bg-white/15">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <ul className="space-y-2">
              {form.included.map((h, i) => (
                <li key={i} className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2">
                  <span className="flex-1 text-xs text-white/80">{h}</span>
                  <button type="button" onClick={() => removeArrayItem("included", i)} className="text-admin-muted hover:text-red-400"><X className="h-3 w-3" /></button>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-admin-label">What&apos;s Excluded</label>
            <div className="flex gap-2 mb-3">
              <input type="text" value={excludedInput} onChange={e => setExcludedInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addArrayItem("excluded", excludedInput, setExcludedInput); } }}
                className={`${inputCls} flex-1`} placeholder="Flights, Insurance..." />
              <button type="button" onClick={() => addArrayItem("excluded", excludedInput, setExcludedInput)} className="rounded-xl bg-white/10 px-3 hover:bg-white/15">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <ul className="space-y-2">
              {form.excluded.map((h, i) => (
                <li key={i} className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2">
                  <span className="flex-1 text-xs text-white/80">{h}</span>
                  <button type="button" onClick={() => removeArrayItem("excluded", i)} className="text-admin-muted hover:text-red-400"><X className="h-3 w-3" /></button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="rounded-2xl border border-admin-section-border bg-admin-section-bg shadow-sm p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-admin-heading">Itinerary</h2>
          <button type="button" onClick={addItinerary} className="text-sm font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add Day
          </button>
        </div>
        {form.itinerary.map((itin, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/10 bg-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-admin-heading">Day {i + 1}</h3>
              <button type="button" onClick={() => removeItinerary(i)} className="text-red-400 hover:text-red-300 text-sm">Remove</button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Day Label">
                <input type="text" value={itin.day} onChange={e => updateItinerary(i, "day", e.target.value)} className={inputCls} placeholder="e.g. Day 1" />
              </Field>
              <Field label="Title">
                <input type="text" value={itin.title} onChange={e => updateItinerary(i, "title", e.target.value)} className={inputCls} placeholder="Arrival in Manali" />
              </Field>
            </div>
            <Field label="Description">
              <textarea rows={2} value={itin.description} onChange={e => updateItinerary(i, "description", e.target.value)} className={textareaCls} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Meals">
                <input type="text" value={itin.meals} onChange={e => updateItinerary(i, "meals", e.target.value)} className={inputCls} placeholder="Breakfast, Dinner" />
              </Field>
              <Field label="Stay">
                <input type="text" value={itin.stay} onChange={e => updateItinerary(i, "stay", e.target.value)} className={inputCls} placeholder="Hotel / Campsite" />
              </Field>
            </div>
          </div>
        ))}
        {form.itinerary.length === 0 && <p className="text-sm text-admin-muted">No itinerary added yet.</p>}
      </section>

      {/* FAQs */}
      <section className="rounded-2xl border border-admin-section-border bg-admin-section-bg shadow-sm p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-admin-heading">FAQs</h2>
          <button type="button" onClick={addFaq} className="text-sm font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add FAQ
          </button>
        </div>
        {form.faqs.map((faq, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/10 bg-slate-800 space-y-4 relative">
            <button type="button" onClick={() => removeFaq(i)} className="absolute top-4 right-4 text-red-400 hover:text-red-300">
              <X className="w-4 h-4" />
            </button>
            <Field label="Question">
              <input type="text" value={faq.question} onChange={e => updateFaq(i, "question", e.target.value)} className={inputCls} />
            </Field>
            <Field label="Answer">
              <textarea rows={2} value={faq.answer} onChange={e => updateFaq(i, "answer", e.target.value)} className={textareaCls} />
            </Field>
          </div>
        ))}
        {form.faqs.length === 0 && <p className="text-sm text-admin-muted">No FAQs added yet.</p>}
      </section>

      {/* SEO */}
      <section className="rounded-2xl border border-admin-section-border bg-admin-section-bg shadow-sm p-6 space-y-5">
        <h2 className="text-base font-semibold text-admin-heading">SEO Settings</h2>
        <Field label="SEO Title">
          <input type="text" value={form.seoTitle} onChange={e => set("seoTitle", e.target.value)} className={inputCls} placeholder="Optional custom title for search engines" />
        </Field>
        <Field label="SEO Description">
          <textarea rows={2} value={form.seoDescription} onChange={e => set("seoDescription", e.target.value)} className={textareaCls} placeholder="Optional meta description" />
        </Field>
        <Field label="SEO Keywords">
          <input type="text" value={form.seoKeywords} onChange={e => set("seoKeywords", e.target.value)} className={inputCls} placeholder="trekking, manali, adventure (comma separated)" />
        </Field>
      </section>

      {/* Submit */}
      <div className="flex justify-end gap-3 sticky bottom-8 p-4 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-admin-section-border shadow-2xl">
        <button type="button" onClick={() => history.back()}
          className="rounded-xl border border-white/15 px-6 py-2.5 text-sm font-medium text-admin-label hover:border-white/30 hover:text-admin-heading transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={submitting}
          className="rounded-xl bg-amber-500 px-8 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_0_20px_rgba(245,158,11,0.3)]">
          {submitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

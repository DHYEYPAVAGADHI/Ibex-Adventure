"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Loader2 } from "lucide-react";
import { ImageUploader } from "@/components/admin/image-uploader";

export interface DestinationFormData {
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  heroVideo: string;
  gallery: string[];
  state: string;
  country: string;
  latitude: string;
  longitude: string;
  googleMap: string;
  rating: string;
  reviewCount: string;
  duration: string;
  difficulty: string;
  altitude: string;
  bestSeason: string;
  weather: string;
  temperature: string;
  thingsToDo: { title: string; description: string; icon: string }[];
  highlights: string[];
  faq: { question: string; answer: string }[];
  travelTips: string[];
  howToReach: { flight: string; train: string; bus: string; car: string };
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  featured: boolean;
  published: boolean;
  displayOrder: string;
}

interface Props {
  initialData?: Partial<DestinationFormData> & { id?: string };
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

const DIFFICULTIES = ["easy", "moderate", "challenging", "expert"];

export function DestinationForm({ initialData, isEdit }: Props) {
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

  function toObj<T>(v: unknown, fallback: T): T {
    if (v && typeof v === "object" && !Array.isArray(v)) return v as T;
    if (typeof v === "string") {
      try { return JSON.parse(v) as T; } catch { return fallback; }
    }
    return fallback;
  }

  const emptyHowToReach = { flight: "", train: "", bus: "", car: "" };
  const [form, setForm] = useState<DestinationFormData>({
    slug: initialData?.slug ?? "",
    title: initialData?.title ?? "",
    subtitle: initialData?.subtitle ?? "",
    shortDescription: initialData?.shortDescription ?? "",
    fullDescription: initialData?.fullDescription ?? "",
    heroImage: initialData?.heroImage ?? "",
    heroVideo: initialData?.heroVideo ?? "",
    gallery: toArr(initialData?.gallery, []),
    state: initialData?.state ?? "",
    country: initialData?.country ?? "India",
    latitude: initialData?.latitude ?? "",
    longitude: initialData?.longitude ?? "",
    googleMap: initialData?.googleMap ?? "",
    rating: String(initialData?.rating ?? "0"),
    reviewCount: String(initialData?.reviewCount ?? "0"),
    duration: initialData?.duration ?? "",
    difficulty: initialData?.difficulty ?? "moderate",
    altitude: initialData?.altitude ?? "",
    bestSeason: initialData?.bestSeason ?? "",
    weather: initialData?.weather ?? "",
    temperature: initialData?.temperature ?? "",
    thingsToDo: toArr(initialData?.thingsToDo, []),
    highlights: toArr<string>(initialData?.highlights, []),
    faq: toArr(initialData?.faq, []),
    travelTips: toArr<string>(initialData?.travelTips, []),
    howToReach: toObj(initialData?.howToReach, emptyHowToReach),
    seoTitle: initialData?.seoTitle ?? "",
    seoDescription: initialData?.seoDescription ?? "",
    seoKeywords: initialData?.seoKeywords ?? "",
    featured: initialData?.featured ?? false,
    published: initialData?.published ?? true,
    displayOrder: String(initialData?.displayOrder ?? "0"),
  });

  function set<K extends keyof DestinationFormData>(key: K, val: DestinationFormData[K]) {
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
        ? `/api/admin/destinations/${initialData?.id}`
        : "/api/admin/destinations";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      router.push("/admin/destinations");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  /* Gallery helpers */
  const addGalleryImage = (url: string) => {
    if (url && !form.gallery.includes(url)) set("gallery", [...form.gallery, url]);
  };
  const removeGalleryImage = (i: number) => set("gallery", form.gallery.filter((_, idx) => idx !== i));

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-admin-heading">{isEdit ? "Edit Destination" : "New Destination"}</h1>
          <p className="text-sm text-admin-muted mt-1">All content is CMS-driven. No code changes needed.</p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()} className="px-4 py-2 rounded-xl text-sm text-admin-muted border border-admin-section-border hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 text-slate-900 font-semibold text-sm hover:bg-amber-400 disabled:opacity-50 transition-colors"
          >
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
            onChange={(e) => {
              set("title", e.target.value);
              if (!isEdit) set("slug", autoSlug(e.target.value));
            }}
            className={inputCls}
            placeholder="e.g. Spiti Valley"
            required
          />
        </Field>

        <Field label="Slug *">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            className={inputCls}
            placeholder="e.g. spiti-valley"
            required
          />
        </Field>

        <Field label="Subtitle">
          <input type="text" value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} className={inputCls} placeholder="Tagline" />
        </Field>

        <Field label="State">
          <input type="text" value={form.state} onChange={(e) => set("state", e.target.value)} className={inputCls} placeholder="e.g. Himachal Pradesh" />
        </Field>

        <Field label="Country">
          <input type="text" value={form.country} onChange={(e) => set("country", e.target.value)} className={inputCls} />
        </Field>

        <Field label="Display Order">
          <input type="number" value={form.displayOrder} onChange={(e) => set("displayOrder", e.target.value)} className={inputCls} min={0} />
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
          <Field label="Short Description">
            <textarea value={form.shortDescription} onChange={(e) => set("shortDescription", e.target.value)} className={textareaCls} rows={2} placeholder="One-line teaser shown on cards" />
          </Field>
        </div>

        <div className="col-span-full">
          <Field label="Full Description">
            <textarea value={form.fullDescription} onChange={(e) => set("fullDescription", e.target.value)} className={textareaCls} rows={6} placeholder="Rich description (use double line breaks for paragraphs)" />
          </Field>
        </div>

        <SectionTitle>Hero & Gallery</SectionTitle>
        <div className="col-span-full">
          <ImageUploader label="Hero Image" value={form.heroImage} onChange={(url) => set("heroImage", url)} />
        </div>
        <div className="col-span-full">
          <Field label="Hero Video URL (optional)">
            <input type="url" value={form.heroVideo} onChange={(e) => set("heroVideo", e.target.value)} className={inputCls} placeholder="https://..." />
          </Field>
        </div>
        <div className="col-span-full space-y-3">
          <p className={labelCls}>Gallery Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {form.gallery.map((img, i) => (
              <div key={i} className="relative group rounded-xl overflow-hidden border border-admin-section-border" style={{ height: 100 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={typeof img === 'string' && img.trim() !== "" ? img : "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(i)}
                  className="absolute top-1 right-1 bg-black/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3.5 w-3.5 text-admin-heading" />
                </button>
              </div>
            ))}
          </div>
          <ImageUploader label="Add Gallery Image" value="" onChange={addGalleryImage} />
        </div>

        <SectionTitle>Quick Facts</SectionTitle>

        <Field label="Duration">
          <input type="text" value={form.duration} onChange={(e) => set("duration", e.target.value)} className={inputCls} placeholder="e.g. 5 Days / 4 Nights" />
        </Field>
        <Field label="Difficulty">
          <select value={form.difficulty} onChange={(e) => set("difficulty", e.target.value)} className={inputCls}>
            {DIFFICULTIES.map((d) => <option key={d} value={d} className="bg-slate-800 capitalize">{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
          </select>
        </Field>
        <Field label="Altitude">
          <input type="text" value={form.altitude} onChange={(e) => set("altitude", e.target.value)} className={inputCls} placeholder="e.g. 3,800m" />
        </Field>
        <Field label="Best Season">
          <input type="text" value={form.bestSeason} onChange={(e) => set("bestSeason", e.target.value)} className={inputCls} placeholder="e.g. October – March" />
        </Field>
        <Field label="Weather">
          <input type="text" value={form.weather} onChange={(e) => set("weather", e.target.value)} className={inputCls} placeholder="e.g. Cold, dry winters" />
        </Field>
        <Field label="Temperature">
          <input type="text" value={form.temperature} onChange={(e) => set("temperature", e.target.value)} className={inputCls} placeholder="e.g. -10°C to 25°C" />
        </Field>
        <Field label="Rating (0–5)">
          <input type="number" min={0} max={5} step={0.1} value={form.rating} onChange={(e) => set("rating", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Review Count">
          <input type="number" min={0} value={form.reviewCount} onChange={(e) => set("reviewCount", e.target.value)} className={inputCls} />
        </Field>

        <SectionTitle>Map & Location</SectionTitle>
        <Field label="Latitude">
          <input type="text" value={form.latitude} onChange={(e) => set("latitude", e.target.value)} className={inputCls} placeholder="32.2432" />
        </Field>
        <Field label="Longitude">
          <input type="text" value={form.longitude} onChange={(e) => set("longitude", e.target.value)} className={inputCls} placeholder="77.1892" />
        </Field>
        <div className="col-span-full">
          <Field label="Google Maps Embed URL">
            <input type="url" value={form.googleMap} onChange={(e) => set("googleMap", e.target.value)} className={inputCls} placeholder="https://www.google.com/maps/embed?pb=..." />
          </Field>
        </div>

        <SectionTitle>Things To Do</SectionTitle>
        <div className="col-span-full space-y-3">
          {form.thingsToDo.map((item, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_60px_36px] gap-2 items-start">
              <input type="text" value={item.title} onChange={(e) => {
                const arr = [...form.thingsToDo]; arr[i] = { ...arr[i], title: e.target.value }; set("thingsToDo", arr);
              }} className={inputCls} placeholder="Activity name" />
              <input type="text" value={item.description} onChange={(e) => {
                const arr = [...form.thingsToDo]; arr[i] = { ...arr[i], description: e.target.value }; set("thingsToDo", arr);
              }} className={inputCls} placeholder="Short description" />
              <input type="text" value={item.icon} onChange={(e) => {
                const arr = [...form.thingsToDo]; arr[i] = { ...arr[i], icon: e.target.value }; set("thingsToDo", arr);
              }} className={inputCls} placeholder="🏔️" />
              <button type="button" onClick={() => set("thingsToDo", form.thingsToDo.filter((_, j) => j !== i))} className="flex h-10 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => set("thingsToDo", [...form.thingsToDo, { title: "", description: "", icon: "" }])}
            className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors">
            <Plus className="h-4 w-4" /> Add Activity
          </button>
        </div>

        <SectionTitle>Highlights</SectionTitle>
        <div className="col-span-full space-y-2">
          {form.highlights.map((h, i) => (
            <div key={i} className="flex gap-2">
              <input type="text" value={h} onChange={(e) => {
                const arr = [...form.highlights]; arr[i] = e.target.value; set("highlights", arr);
              }} className={inputCls} placeholder="Highlight point" />
              <button type="button" onClick={() => set("highlights", form.highlights.filter((_, j) => j !== i))} className="flex h-10 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors flex-shrink-0">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => set("highlights", [...form.highlights, ""])} className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors">
            <Plus className="h-4 w-4" /> Add Highlight
          </button>
        </div>

        <SectionTitle>How To Reach</SectionTitle>
        {(["flight", "train", "bus", "car"] as const).map((mode) => (
          <div key={mode} className="col-span-full">
            <Field label={`By ${mode.charAt(0).toUpperCase() + mode.slice(1)}`}>
              <textarea
                value={form.howToReach[mode]}
                onChange={(e) => set("howToReach", { ...form.howToReach, [mode]: e.target.value })}
                className={textareaCls}
                rows={2}
                placeholder={`How to reach by ${mode}...`}
              />
            </Field>
          </div>
        ))}

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

        <SectionTitle>FAQs</SectionTitle>
        <div className="col-span-full space-y-3">
          {form.faq.map((item, i) => (
            <div key={i} className="rounded-xl border border-admin-section-border bg-slate-900/40 p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-medium text-admin-muted uppercase tracking-wider">FAQ {i + 1}</p>
                <button type="button" onClick={() => set("faq", form.faq.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-300">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <input type="text" value={item.question} onChange={(e) => {
                const arr = [...form.faq]; arr[i] = { ...arr[i], question: e.target.value }; set("faq", arr);
              }} className={inputCls} placeholder="Question" />
              <textarea value={item.answer} onChange={(e) => {
                const arr = [...form.faq]; arr[i] = { ...arr[i], answer: e.target.value }; set("faq", arr);
              }} className={textareaCls} rows={2} placeholder="Answer" />
            </div>
          ))}
          <button type="button" onClick={() => set("faq", [...form.faq, { question: "", answer: "" }])} className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors">
            <Plus className="h-4 w-4" /> Add FAQ
          </button>
        </div>

        <SectionTitle>SEO</SectionTitle>
        <div className="col-span-full">
          <Field label="SEO Title">
            <input type="text" value={form.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} className={inputCls} placeholder={`${form.title || "Destination"} | Ibex Adventure`} />
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
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-amber-500 text-slate-900 font-semibold text-sm hover:bg-amber-400 disabled:opacity-50 transition-colors"
        >
          {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : (isEdit ? "Update Destination" : "Create Destination")}
        </button>
      </div>
    </form>
  );
}

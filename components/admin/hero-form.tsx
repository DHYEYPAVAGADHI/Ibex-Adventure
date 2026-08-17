"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImageUploader } from "@/components/admin/image-uploader";
import { PrimaryButton } from "@/components/primary-button";
import { Save, AlertCircle, Plus, Trash2, Type, RefreshCw } from "lucide-react";
import { HeroSection } from "@prisma/client";

interface HeroFormProps {
  initialData?: (HeroSection & { headlinePrefix?: string | null; scrollWords?: string | null }) | null;
}

const DEFAULT_SCROLL_WORDS = ["Adventures", "Journeys", "Experiences", "Expeditions", "Treks"];

export function HeroForm({ initialData }: HeroFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parsedImages = initialData?.backgroundImages
    ? JSON.parse(initialData.backgroundImages)
    : ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"];

  let parsedScrollWords = DEFAULT_SCROLL_WORDS;
  try {
    if (initialData?.scrollWords) {
      parsedScrollWords = JSON.parse(initialData.scrollWords);
    }
  } catch {}

  const [form, setForm] = useState({
    headline: initialData?.headline || "Incredible Adventures",
    headlinePrefix: (initialData as any)?.headlinePrefix || "Incredible",
    scrollWords: parsedScrollWords as string[],
    subtitle: initialData?.subtitle || "INSPIRED OUTDOOR JOURNEYS",
    description:
      initialData?.description ||
      "Discover the world's most breathtaking landscapes and immerse yourself in unforgettable experiences with Ibex Adventure.",
    buttonText: initialData?.buttonText || "Explore Programs",
    buttonLink: initialData?.buttonLink || "#programs",
    backgroundImages: parsedImages as string[],
  });

  const [newWord, setNewWord] = useState("");
  const [animIndex, setAnimIndex] = useState(0);

  // Preview the animated words
  const previewWord = form.scrollWords[animIndex] ?? form.scrollWords[0] ?? "Adventures";

  const handleAddImage = () =>
    setForm((prev) => ({ ...prev, backgroundImages: [...prev.backgroundImages, ""] }));

  const handleUpdateImage = (index: number, url: string) => {
    const imgs = [...form.backgroundImages];
    imgs[index] = url;
    setForm((prev) => ({ ...prev, backgroundImages: imgs }));
  };

  const handleRemoveImage = (index: number) =>
    setForm((prev) => ({
      ...prev,
      backgroundImages: prev.backgroundImages.filter((_, i) => i !== index),
    }));

  const addScrollWord = () => {
    const word = newWord.trim();
    if (!word) return;
    setForm((prev) => ({ ...prev, scrollWords: [...prev.scrollWords, word] }));
    setNewWord("");
  };

  const removeScrollWord = (index: number) =>
    setForm((prev) => ({
      ...prev,
      scrollWords: prev.scrollWords.filter((_, i) => i !== index),
    }));

  const updateScrollWord = (index: number, value: string) =>
    setForm((prev) => {
      const words = [...prev.scrollWords];
      words[index] = value;
      return { ...prev, scrollWords: words };
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const validImages = form.backgroundImages.filter((img) => img.trim() !== "");
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
          backgroundImages: validImages,
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
          {/* Hero Content */}
          <div className="rounded-2xl border border-admin-section-border bg-slate-950 p-6 space-y-6 shadow-xl">
            <h2 className="text-lg font-medium text-admin-heading border-b border-admin-section-border pb-4">
              Hero Content
            </h2>
            <div className="grid gap-6">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Full Headline (fallback if no animation)</span>
                <input
                  type="text"
                  required
                  value={form.headline}
                  onChange={(e) => setForm((prev) => ({ ...prev, headline: e.target.value }))}
                  className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500 text-2xl font-semibold"
                  placeholder="Incredible Adventures"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Eyebrow Subtitle (Optional)</span>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm((prev) => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500 uppercase tracking-widest text-sm"
                  placeholder="INSPIRED OUTDOOR JOURNEYS"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Description (Optional)</span>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full resize-none rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500"
                  placeholder="Discover the world's most breathtaking landscapes..."
                />
              </label>
            </div>
          </div>

          {/* Animated Scrolling Words */}
          <div className="rounded-2xl border border-amber-500/20 bg-slate-950 p-6 space-y-6 shadow-xl">
            <div className="flex items-center gap-2 border-b border-admin-section-border pb-4">
              <Type className="h-5 w-5 text-amber-400" />
              <h2 className="text-lg font-medium text-admin-heading">Animated Scrolling Words</h2>
            </div>

            {/* Live preview */}
            <div className="rounded-xl bg-slate-900 border border-white/10 px-6 py-5 text-center">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Live Preview</p>
              <p className="text-3xl font-bold text-white leading-tight">
                {form.headlinePrefix}{" "}
                <span className="text-amber-400">{previewWord}</span>
              </p>
              <button
                type="button"
                onClick={() => setAnimIndex((prev) => (prev + 1) % (form.scrollWords.length || 1))}
                className="mt-3 flex items-center gap-1.5 mx-auto text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                <RefreshCw className="h-3 w-3" /> Next word
              </button>
            </div>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-white/80">Static Prefix (the word that stays)</span>
              <input
                type="text"
                value={form.headlinePrefix}
                onChange={(e) => setForm((prev) => ({ ...prev, headlinePrefix: e.target.value }))}
                className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500"
                placeholder="Incredible"
              />
              <p className="text-xs text-white/30">This word is fixed. Only the word after it animates.</p>
            </label>

            {/* Word list */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-white/80 block">Scrolling Words (in order)</span>
              {form.scrollWords.map((word, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={word}
                    onChange={(e) => updateScrollWord(i, e.target.value)}
                    className="flex-1 rounded-xl border border-admin-section-border bg-slate-900 px-4 py-2.5 text-admin-heading outline-none transition focus:border-amber-500 text-sm"
                    placeholder={`Word ${i + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeScrollWord(i)}
                    className="rounded-xl border border-red-500/20 bg-red-500/10 p-2.5 text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {/* Add new word */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addScrollWord(); } }}
                  placeholder="Type a new word and press Enter or Add..."
                  className="flex-1 rounded-xl border border-dashed border-white/20 bg-slate-900/60 px-4 py-2.5 text-admin-heading outline-none transition focus:border-amber-500/60 text-sm placeholder-white/30"
                />
                <button
                  type="button"
                  onClick={addScrollWord}
                  disabled={!newWord.trim()}
                  className="flex items-center gap-1.5 rounded-xl bg-amber-500/20 px-4 py-2.5 text-sm font-medium text-amber-400 hover:bg-amber-500/30 transition-colors disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" /> Add
                </button>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="rounded-2xl border border-admin-section-border bg-slate-950 p-6 space-y-6 shadow-xl">
            <h2 className="text-lg font-medium text-admin-heading border-b border-admin-section-border pb-4">
              Call to Action (Button)
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Button Text</span>
                <input
                  type="text"
                  value={form.buttonText}
                  onChange={(e) => setForm((prev) => ({ ...prev, buttonText: e.target.value }))}
                  className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500"
                  placeholder="Explore Programs"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-white/80">Button Link</span>
                <input
                  type="text"
                  value={form.buttonLink}
                  onChange={(e) => setForm((prev) => ({ ...prev, buttonLink: e.target.value }))}
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
                        src={typeof img === "string" && img.trim() !== "" ? img : "/placeholder.svg"}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="400px"
                        unoptimized
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
                  <span className="text-admin-heading">WEBP, JPG, PNG</span>
                </div>
                <p className="text-xs mt-3 leading-relaxed">
                  Images crossfade automatically every 8 seconds. Minimum 1 image required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

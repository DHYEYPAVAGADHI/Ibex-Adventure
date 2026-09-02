"use client";

import { useState, useCallback, useRef } from "react";
import { useContact } from "@/components/providers/contact-provider";
import { buildTelLink } from "@/lib/contact";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, MapPin, Clock, Mountain, Sun, Thermometer, Calendar,
  Star, ChevronDown, ChevronUp, Phone, MessageCircle, BookOpen,
  Share2, Heart, Plane, Train, Bus, Car, ArrowRight, Check, X,
  Camera, Map, Info, ChevronRight
} from "lucide-react";
import { Navbar } from "@/components/navbar";

/* ─── Types ─────────────────────────────────────── */
interface DestinationRecord {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  shortDescription?: string | null;
  fullDescription?: string | null;
  heroImage?: string | null;
  heroVideo?: string | null;
  gallery: string;
  state?: string | null;
  country: string;
  latitude?: string | null;
  longitude?: string | null;
  googleMap?: string | null;
  rating: number;
  reviewCount: number;
  duration?: string | null;
  difficulty?: string | null;
  altitude?: string | null;
  bestSeason?: string | null;
  weather?: string | null;
  temperature?: string | null;
  thingsToDo: string;
  highlights: string;
  faq: string;
  howToReach?: string | null;
  travelTips: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

interface RelatedPackage {
  id: string;
  slug: string;
  title: string;
  thumbnail?: string | null;
  duration?: string | null;
  difficulty?: string | null;
  price?: string | null;
  images: string;
}

interface Props {
  destination: DestinationRecord;
  relatedPackages: RelatedPackage[];
}

/* ─── Helpers ──────────────────────────────────── */
function parseJSON<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const difficultyMap: Record<string, { label: string; color: string }> = {
  easy: { label: "Easy", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  moderate: { label: "Moderate", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  challenging: { label: "Challenging", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  expert: { label: "Expert", color: "bg-red-500/20 text-red-300 border-red-500/30" },
};

/* ─── Sub-components ─────────────────────────────── */
function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07 }}
      className="border border-[var(--color-hair)] overflow-hidden" style={{ borderRadius: "2px" }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#F4EFE3] transition-colors"
      >
        <span className="font-medium text-[#1C1C18] text-sm leading-relaxed">{q}</span>
        {open ? <ChevronUp className="h-5 w-5 text-[var(--color-forest-band)] flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-[#424844]/40 flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-[#424844] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function GalleryImage({ src, alt, onClick, i }: { src: string; alt: string; onClick: () => void; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl cursor-pointer group"
      style={{ height: i === 0 ? "380px" : "180px" }}
    >
      <Image
        src={typeof src === 'string' && src.trim() !== "" ? src : "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 33vw"
        unoptimized
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
        <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────── */
export function DestinationDetailClient({ destination, relatedPackages }: Props) {
  const { phone, whatsapp, email } = useContact();
  const [wishlist, setWishlist] = useState(false);
  const [reachTab, setReachTab] = useState<"flight" | "train" | "bus" | "car">("flight");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const gallery = parseJSON<string[]>(destination.gallery, []);
  const thingsToDo = parseJSON<{ title: string; description: string; icon?: string }[]>(destination.thingsToDo, []);
  const highlights = parseJSON<string[]>(destination.highlights, []);
  const faqs = parseJSON<{ question: string; answer: string }[]>(destination.faq, []);
  const travelTips = parseJSON<string[]>(destination.travelTips, []);
  const howToReach = parseJSON<{ flight?: string; train?: string; bus?: string; car?: string }>(
    destination.howToReach || "{}", {}
  );

  const diff = destination.difficulty ? difficultyMap[destination.difficulty.toLowerCase()] : null;
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const waMessage = encodeURIComponent(`Hello Ibex Adventure,\n\nI am interested in visiting ${destination.title}.\n\nPlease share trip packages, itinerary, and pricing details.\n\nThank you.`);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      await navigator.share({ title: destination.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  }, [destination.title]);

  /* ── Hero images (primary + gallery) */
  const allImages = [destination.heroImage, ...gallery].filter(Boolean) as string[];

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FCF9F2" }}>
      <Navbar />

      {/* ── SECTION 1: HERO ──────────────────────────────── */}
      <section ref={heroRef} className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
        {destination.heroImage ? (
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <Image
              src={typeof destination.heroImage === 'string' && destination.heroImage.trim() !== "" ? destination.heroImage : "/placeholder.svg"}
              alt={destination.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
        )}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest-band)]/80 via-[var(--color-forest-band)]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-forest-band)]/55 to-transparent" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col justify-end px-6 pb-24 lg:px-16"
        >
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-white/50 hover:text-white transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/#destinations" className="text-white/50 hover:text-white transition-colors">Destinations</Link>
            <span className="text-white/30">/</span>
            <span className="text-[#D4AF37]">{destination.title}</span>
          </nav>

          <div className="max-w-4xl">
            {destination.state && (
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#D4AF37]" />
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                  {destination.state}, {destination.country}
                </span>
              </div>
            )}
            <h1 className="font-serif text-5xl font-bold tracking-tight text-white drop-shadow-xl md:text-6xl lg:text-8xl">
              {destination.title}
            </h1>
            {destination.subtitle && (
              <p className="mt-4 text-xl text-white/75 font-light italic max-w-2xl">{destination.subtitle}</p>
            )}

            {/* Quick pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              {diff && (
                <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-md ${diff.color}`}>
                  <Mountain className="h-4 w-4" /> {diff.label}
                </span>
              )}
              {destination.duration && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
                  <Clock className="h-4 w-4 text-amber-400" /> {destination.duration}
                </span>
              )}
              {destination.bestSeason && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
                  <Calendar className="h-4 w-4 text-amber-400" /> {destination.bestSeason}
                </span>
              )}
              {destination.rating > 0 && (
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium backdrop-blur-md text-amber-300">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {destination.rating.toFixed(1)} ({destination.reviewCount} reviews)
                </span>
              )}
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-8 py-3.5 font-semibold text-[var(--color-forest-band)] transition-all hover:bg-[var(--color-gold-star)] hover:scale-105 shadow-lg shadow-[#D4AF37]/20"
              >
                <BookOpen className="h-5 w-5" /> Book Now
              </a>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 font-semibold text-white transition-all hover:bg-white/20 backdrop-blur-md"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp
              </a>
              <div className="flex gap-2">
                <button
                  onClick={handleShare}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70 transition-all hover:bg-white/20 hover:text-white backdrop-blur-md"
                  title="Share"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setWishlist(!wishlist)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all backdrop-blur-md ${wishlist ? "border-red-400/50 bg-red-400/20 text-red-400" : "border-white/20 bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                    }`}
                  title="Add to Wishlist"
                >
                  <Heart className={`h-5 w-5 ${wishlist ? "fill-red-400" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 2: QUICK FACTS ─────────────────────── */}
      {(destination.state || destination.altitude || destination.temperature || destination.weather || destination.duration || destination.bestSeason) && (
        <section className="relative z-10 -mt-16 px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-6xl rounded-none border border-[var(--color-hair)] bg-[#FCF9F2] p-8"
          >
            <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-forest-band)]/50">Quick Facts</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {destination.state && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[#424844]/50 text-xs uppercase tracking-wider">
                    <MapPin className="h-3.5 w-3.5" /> State
                  </div>
                  <p className="font-semibold text-[#1C1C18] text-sm">{destination.state}</p>
                </div>
              )}
              {destination.country && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[#424844]/50 text-xs uppercase tracking-wider">
                    <Map className="h-3.5 w-3.5" /> Country
                  </div>
                  <p className="font-semibold text-[#1C1C18] text-sm">{destination.country}</p>
                </div>
              )}
              {destination.bestSeason && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[#424844]/50 text-xs uppercase tracking-wider">
                    <Sun className="h-3.5 w-3.5" /> Best Season
                  </div>
                  <p className="font-semibold text-[#1C1C18] text-sm">{destination.bestSeason}</p>
                </div>
              )}
              {destination.duration && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[#424844]/50 text-xs uppercase tracking-wider">
                    <Clock className="h-3.5 w-3.5" /> Duration
                  </div>
                  <p className="font-semibold text-[#1C1C18] text-sm">{destination.duration}</p>
                </div>
              )}
              {destination.altitude && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[#424844]/50 text-xs uppercase tracking-wider">
                    <Mountain className="h-3.5 w-3.5" /> Altitude
                  </div>
                  <p className="font-semibold text-[#1C1C18] text-sm">{destination.altitude}</p>
                </div>
              )}
              {destination.temperature && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-[#424844]/50 text-xs uppercase tracking-wider">
                    <Thermometer className="h-3.5 w-3.5" /> Temp
                  </div>
                  <p className="font-semibold text-[#1C1C18] text-sm">{destination.temperature}</p>
                </div>
              )}
            </div>
          </motion.div>
        </section>
      )}

      {/* ── SECTION 3: ABOUT ──────────────────────────── */}
      {(destination.shortDescription || destination.fullDescription) && (
        <section className="section-spacing px-6 lg:px-16" style={{ backgroundColor: "#FCF9F2" }}>
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-12 lg:grid-cols-[1fr_400px] items-start"
            >
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-forest-band)]">About</p>
                <h2 className="mb-6 font-serif text-4xl font-bold text-[#1C1C18] md:text-5xl">{destination.title}</h2>
                {destination.shortDescription && (
                  <p className="mb-6 text-lg text-[#424844] leading-relaxed font-light border-l-2 border-[#D4AF37]/60 pl-6 italic">
                    {destination.shortDescription}
                  </p>
                )}
                {destination.fullDescription && (
                  <div className="prose prose-lg max-w-none text-[#424844]/80 leading-relaxed">
                    {destination.fullDescription.split("\n\n").map((para, i) => (
                      <p key={i} className="mb-4">{para}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Side info card */}
              <div className="border border-[var(--color-hair)] p-6 space-y-4" style={{ borderRadius: "2px" }}>
                {destination.weather && (
                  <div className="flex items-start gap-3">
                    <Sun className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[#424844]/50 uppercase tracking-wider mb-1">Weather</p>
                      <p className="text-sm text-[#1C1C18]">{destination.weather}</p>
                    </div>
                  </div>
                )}
                {destination.altitude && (
                  <div className="flex items-start gap-3">
                    <Mountain className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[#424844]/50 uppercase tracking-wider mb-1">Altitude</p>
                      <p className="text-sm text-[#1C1C18]">{destination.altitude}</p>
                    </div>
                  </div>
                )}
                {destination.difficulty && (
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[#424844]/50 uppercase tracking-wider mb-1">Difficulty</p>
                      <p className="text-sm text-[#1C1C18] capitalize">{destination.difficulty}</p>
                    </div>
                  </div>
                )}
                <div className="pt-4 border-t border-[var(--color-hair)]">
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-forest-band)] py-3 font-semibold text-white text-sm transition-all hover:bg-[#2D4236]"
                  >
                    Enquire Now <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── SECTION 4: GALLERY ────────────────────────── */}
      {gallery.length > 0 && (
        <section className="section-spacing px-6 lg:px-16" style={{ backgroundColor: "#F4EFE3" }}>
          <div className="mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-forest-band)]">Gallery</p>
              <h2 className="font-serif text-4xl font-bold text-[#1C1C18]">Visual Journey</h2>
            </motion.div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.slice(0, 9).map((img, i) => (
                <GalleryImage key={i} src={img} alt={`${destination.title} ${i + 1}`} onClick={() => setLightboxIdx(i)} i={i} />
              ))}
            </div>
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxIdx !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                onClick={() => setLightboxIdx(null)}
              >
                <button
                  className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
                  onClick={() => setLightboxIdx(null)}
                >
                  <X className="h-6 w-6" />
                </button>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
                  onClick={(e) => { e.stopPropagation(); setLightboxIdx(Math.max(0, lightboxIdx - 1)); }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <motion.div
                  key={lightboxIdx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative max-h-[85vh] max-w-5xl w-full h-[60vw] min-h-[300px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={typeof gallery[lightboxIdx] === 'string' && gallery[lightboxIdx].trim() !== "" ? gallery[lightboxIdx] : "/placeholder.svg"}
                    alt={`${destination.title} ${lightboxIdx + 1}`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </motion.div>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
                  onClick={(e) => { e.stopPropagation(); setLightboxIdx(Math.min(gallery.length - 1, lightboxIdx + 1)); }}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <p className="absolute bottom-4 text-white/50 text-sm">{lightboxIdx + 1} / {gallery.length}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* ── SECTION 5: THINGS TO DO ───────────────────── */}
      {thingsToDo.length > 0 && (
        <section className="section-spacing px-6 lg:px-16" style={{ backgroundColor: "#FCF9F2" }}>
          <div className="mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-forest-band)]">Activities</p>
              <h2 className="font-serif text-4xl font-bold text-[#1C1C18]">Things To Do</h2>
            </motion.div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {thingsToDo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group border border-[var(--color-hair)] p-6 hover:border-[var(--color-forest-band)] transition-all duration-300" style={{ borderRadius: "2px" }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-forest-band)]/8 text-[var(--color-forest-band)] text-2xl group-hover:bg-[var(--color-forest-band)] group-hover:text-white transition-colors">
                    {item.icon || "✦"}
                  </div>
                  <h3 className="mb-2 font-semibold text-[#1C1C18] group-hover:text-[var(--color-forest-band)] transition-colors">{item.title}</h3>
                  {item.description && <p className="text-sm text-[#424844]/70 leading-relaxed">{item.description}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 6: HIGHLIGHTS ─────────────────────── */}
      {highlights.length > 0 && (
        <section className="section-spacing px-6 lg:px-16" style={{ backgroundColor: "#F4EFE3" }}>
          <div className="mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-forest-band)]">Why Go</p>
              <h2 className="font-serif text-4xl font-bold text-[#1C1C18]">Highlights</h2>
            </motion.div>
            <div className="space-y-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-4 border-l-2 border-[#D4AF37]/40 pl-4 py-2 hover:border-[#D4AF37] transition-colors"
                >
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-forest-band)]/10 text-[var(--color-forest-band)] mt-0.5">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-[#424844] leading-relaxed">{h}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 7: MAP ────────────────────────────── */}
      {destination.googleMap && (
        <section className="section-spacing px-6 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-forest-band)]">Location</p>
              <h2 className="font-serif text-4xl font-bold text-[#1C1C18]">Find Us on Map</h2>
            </motion.div>
            <div className="overflow-hidden border border-[var(--color-hair)]" style={{ height: 420 }}>
              <iframe
                src={destination.googleMap}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${destination.title}`}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 8: TRAVEL INFORMATION ──────────────── */}
      {(howToReach.flight || howToReach.train || howToReach.bus || howToReach.car || travelTips.length > 0) && (
        <section className="section-spacing px-6 lg:px-16" style={{ backgroundColor: "#FCF9F2" }}>
          <div className="mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-forest-band)]">Getting There</p>
              <h2 className="font-serif text-4xl font-bold text-[#1C1C18]">Travel Information</h2>
            </motion.div>

            {(howToReach.flight || howToReach.train || howToReach.bus || howToReach.car) && (
              <div className="mb-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { key: "flight" as const, icon: Plane, label: "By Flight" },
                    { key: "train" as const, icon: Train, label: "By Train" },
                    { key: "bus" as const, icon: Bus, label: "By Bus" },
                    { key: "car" as const, icon: Car, label: "By Car" },
                  ].filter(t => howToReach[t.key]).map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setReachTab(tab.key)}
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${reachTab === tab.key
                          ? "bg-[var(--color-forest-band)] text-white border border-[var(--color-forest-band)]"
                          : "text-[#424844] border border-[var(--color-hair)] hover:text-[var(--color-forest-band)] hover:border-[var(--color-forest-band)]"
                        }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={reachTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="border border-[var(--color-hair)] p-6 text-[#424844] leading-relaxed" style={{ borderRadius: "2px" }}
                  >
                    {howToReach[reachTab] || "Information not available."}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {travelTips.length > 0 && (
              <div>
                <h3 className="mb-5 text-lg font-semibold text-[#1C1C18]">Travel Tips</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {travelTips.map((tip, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3 border border-[var(--color-hair)] px-4 py-3" style={{ borderRadius: "2px" }}
                    >
                      <span className="text-amber-400 text-lg flex-shrink-0 mt-0.5">💡</span>
                      <p className="text-sm text-[#424844] leading-relaxed">{tip}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── SECTION 9: RELATED PACKAGES ──────────────── */}
      {relatedPackages.length > 0 && (
        <section className="section-spacing px-6 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-forest-band)]">Book a Trip</p>
              <h2 className="font-serif text-4xl font-bold text-[#1C1C18]">Related Packages</h2>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPackages.map((pkg, i) => {
                const pkgImages = parseJSON<string[]>(pkg.images, []);
                const thumbSrc = pkg.thumbnail || pkgImages[0] || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80";
                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group overflow-hidden border border-[var(--color-hair)] hover:border-[var(--color-forest-band)] transition-all duration-300" style={{ borderRadius: "2px" }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={typeof thumbSrc === 'string' && thumbSrc.trim() !== "" ? thumbSrc : "/placeholder.svg"}
                        alt={pkg.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized
                      />
                      {pkg.difficulty && (
                        <span className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm capitalize">
                          {pkg.difficulty}
                        </span>
                      )}
                    </div>
                    <div className="p-5" style={{ backgroundColor: "#FCF9F2" }}>
                      <h3 className="font-semibold text-[#1C1C18] group-hover:text-[var(--color-forest-band)] transition-colors mb-1">{pkg.title}</h3>
                      {pkg.duration && <p className="text-sm text-[#424844]/60 mb-4"><Clock className="inline h-3 w-3 mr-1" />{pkg.duration}</p>}
                      <Link
                        href={`/journeys/adventure/${pkg.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        View Details <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 10: FAQs ──────────────────────────── */}
      {faqs.length > 0 && (
        <section className="section-spacing px-6 lg:px-16" style={{ backgroundColor: "#F4EFE3" }}>
          <div className="mx-auto max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-forest-band)]">Questions</p>
              <h2 className="font-serif text-4xl font-bold text-[#1C1C18]">Frequently Asked</h2>
            </motion.div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.question} a={faq.answer} i={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── STICKY CTA ─────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-hair)] bg-[#FCF9F2]/95 backdrop-blur-xl px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="font-semibold text-[#1C1C18]">{destination.title}</p>
            {destination.bestSeason && (
              <p className="text-xs text-[#424844]/60"><Calendar className="inline h-3 w-3 mr-1" />Best Time: {destination.bestSeason}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-3 ml-auto">
            <a
              href={buildTelLink(phone)}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-hair)] bg-transparent px-4 py-2.5 text-sm font-medium text-[#1C1C18] hover:bg-[#F4EFE3] transition-all"
            >
              <Phone className="h-4 w-4" /> Call
            </a>
            <a
              href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-hair)] bg-transparent px-4 py-2.5 text-sm font-medium text-[var(--color-forest-band)] hover:bg-[#F4EFE3] transition-all"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-forest-band)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2D4236] transition-all shadow-lg shadow-[var(--color-forest-band)]/20"
            >
              <BookOpen className="h-4 w-4" /> Book Now
            </a>
          </div>
        </div>
      </div>

      {/* Bottom padding to account for sticky CTA */}
      <div className="h-24" />
    </main>
  );
}



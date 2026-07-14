"use client";

import { useState, useCallback, useRef } from "react";
import { useContact } from "@/components/providers/contact-provider";
import { buildTelLink } from "@/lib/contact";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  MapPin, Clock, Calendar, ChevronDown, ChevronUp, Phone,
  MessageCircle, BookOpen, Share2, Heart, ArrowRight, Check, X,
  Camera, Ticket, Timer, Star, Info, ChevronLeft, ChevronRight
} from "lucide-react";
import { Navbar } from "@/components/navbar";

/* ─── Types ─────────────────────────────────────── */
interface AttractionRecord {
  id: string;
  slug: string;
  title: string;
  category: string;
  heroImage?: string | null;
  gallery: string;
  description?: string | null;
  history?: string | null;
  activities: string;
  location?: string | null;
  state?: string | null;
  bestTime?: string | null;
  entryFee?: string | null;
  timings?: string | null;
  travelTips: string;
  nearbyHotels: string;
  restaurants: string;
  faqs: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

interface Props {
  attraction: AttractionRecord;
}

/* ─── Helpers ──────────────────────────────────── */
function parseJSON<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

/* ─── Sub-components ─────────────────────────────── */
function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07 }}
      className="border border-white/10 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-medium text-white text-sm leading-relaxed">{q}</span>
        {open ? <ChevronUp className="h-5 w-5 text-amber-400 flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-white/40 flex-shrink-0" />}
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
            <p className="px-6 pb-5 text-sm text-white/65 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────── */
export function AttractionDetailClient({ attraction }: Props) {
  const { phone, whatsapp, email } = useContact();
  const [wishlist, setWishlist] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const gallery = parseJSON<string[]>(attraction.gallery, []);
  const activities = parseJSON<string[]>(attraction.activities, []);
  const faqs = parseJSON<{ question: string; answer: string }[]>(attraction.faqs, []);
  const travelTips = parseJSON<string[]>(attraction.travelTips, []);
  const nearbyHotels = parseJSON<{ name: string; distance?: string; priceRange?: string }[]>(attraction.nearbyHotels, []);
  const restaurants = parseJSON<{ name: string; cuisine?: string; distance?: string }[]>(attraction.restaurants, []);

  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const waMessage = encodeURIComponent(
    `Hello Ibex Adventure,\n\nI am interested in visiting ${attraction.title}.\n\nPlease share tour packages, pricing, and travel information.\n\nThank you.`
  );

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      await navigator.share({ title: attraction.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  }, [attraction.title]);

  const categoryColors: Record<string, string> = {
    Natural: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    Historical: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    Cultural: "text-purple-400 border-purple-400/30 bg-purple-400/10",
    Adventure: "text-orange-400 border-orange-400/30 bg-orange-400/10",
    Religious: "text-sky-400 border-sky-400/30 bg-sky-400/10",
    Wildlife: "text-green-400 border-green-400/30 bg-green-400/10",
  };
  const catColor = categoryColors[attraction.category] || "text-amber-400 border-amber-400/30 bg-amber-400/10";

  return (
    <main className="min-h-screen bg-[#08132B] text-white selection:bg-amber-500/30">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
        {attraction.heroImage ? (
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <Image
              src={typeof attraction.heroImage === 'string' && attraction.heroImage.trim() !== "" ? attraction.heroImage : "/placeholder.svg"}
              alt={attraction.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08132B] via-[#08132B]/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08132B]/60 to-transparent" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col justify-end px-6 pb-24 lg:px-16"
        >
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-white/50 hover:text-white transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/#attractions" className="text-white/50 hover:text-white transition-colors">Attractions</Link>
            <span className="text-white/30">/</span>
            <span className="text-amber-400">{attraction.title}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur-md ${catColor}`}>
                {attraction.category}
              </span>
              {attraction.state && (
                <div className="flex items-center gap-1.5 text-white/60 text-sm">
                  <MapPin className="h-4 w-4 text-amber-400" />
                  {attraction.location || attraction.state}
                </div>
              )}
            </div>

            <h1 className="font-serif text-5xl font-bold tracking-tight text-white drop-shadow-xl md:text-6xl lg:text-8xl">
              {attraction.title}
            </h1>

            {/* Quick info pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              {attraction.bestTime && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
                  <Calendar className="h-4 w-4 text-amber-400" /> {attraction.bestTime}
                </span>
              )}
              {attraction.timings && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
                  <Timer className="h-4 w-4 text-amber-400" /> {attraction.timings}
                </span>
              )}
              {attraction.entryFee && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
                  <Ticket className="h-4 w-4 text-amber-400" /> {attraction.entryFee}
                </span>
              )}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 font-semibold text-slate-900 transition-all hover:bg-amber-400 hover:scale-105 shadow-lg shadow-amber-500/20"
              >
                <BookOpen className="h-5 w-5" /> Plan a Visit
              </a>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-green-500/50 bg-green-500/10 px-8 py-3.5 font-semibold text-green-400 transition-all hover:bg-green-500/20 backdrop-blur-md"
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
                  className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all backdrop-blur-md ${
                    wishlist ? "border-red-400/50 bg-red-400/20 text-red-400" : "border-white/20 bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                  }`}
                  title="Save"
                >
                  <Heart className={`h-5 w-5 ${wishlist ? "fill-red-400" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── QUICK INFO CARD ────────────────────────────── */}
      {(attraction.entryFee || attraction.timings || attraction.bestTime || attraction.location) && (
        <section className="relative z-10 -mt-16 px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-8"
          >
            <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-amber-400/70">Visitor Info</h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {attraction.location && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-wider">
                    <MapPin className="h-3.5 w-3.5" /> Location
                  </div>
                  <p className="font-semibold text-white text-sm">{attraction.location}</p>
                </div>
              )}
              {attraction.bestTime && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-wider">
                    <Calendar className="h-3.5 w-3.5" /> Best Time
                  </div>
                  <p className="font-semibold text-white text-sm">{attraction.bestTime}</p>
                </div>
              )}
              {attraction.timings && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-wider">
                    <Clock className="h-3.5 w-3.5" /> Timings
                  </div>
                  <p className="font-semibold text-white text-sm">{attraction.timings}</p>
                </div>
              )}
              {attraction.entryFee && (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-wider">
                    <Ticket className="h-3.5 w-3.5" /> Entry Fee
                  </div>
                  <p className="font-semibold text-white text-sm">{attraction.entryFee}</p>
                </div>
              )}
            </div>
          </motion.div>
        </section>
      )}

      {/* ── ABOUT ─────────────────────────────────────── */}
      {attraction.description && (
        <section className="section-spacing px-6 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-12 lg:grid-cols-[1fr_360px] items-start"
            >
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-amber-400">About</p>
                <h2 className="mb-6 font-serif text-4xl font-bold text-white md:text-5xl">{attraction.title}</h2>
                <div className="text-white/65 leading-relaxed space-y-4">
                  {attraction.description.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {attraction.history && (
                  <div className="mt-8">
                    <h3 className="mb-4 text-lg font-semibold text-white flex items-center gap-2">
                      <Info className="h-5 w-5 text-amber-400" /> History & Background
                    </h3>
                    <div className="text-white/60 leading-relaxed space-y-4 border-l-2 border-amber-500/30 pl-6">
                      {attraction.history.split("\n\n").map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Side card */}
              <div className="rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-sm p-6 space-y-5">
                {activities.length > 0 && (
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Activities</p>
                    <div className="flex flex-wrap gap-2">
                      {activities.map((act, i) => (
                        <span key={i} className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs text-amber-300">
                          <Check className="h-3 w-3" /> {act}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="border-t border-white/10 pt-4">
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 font-semibold text-slate-900 text-sm transition-all hover:bg-amber-400"
                  >
                    Plan Visit <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── GALLERY ───────────────────────────────────── */}
      {gallery.length > 0 && (
        <section className="section-spacing px-6 lg:px-16 bg-slate-950/50">
          <div className="mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-400">Gallery</p>
              <h2 className="font-serif text-4xl font-bold text-white">Visual Journey</h2>
            </motion.div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.slice(0, 9).map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setLightboxIdx(i)}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group"
                  style={{ height: i === 0 ? "380px" : "180px" }}
                >
                  <Image
                    src={typeof img === 'string' && img.trim() !== "" ? img : "/placeholder.svg"}
                    alt={`${attraction.title} ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
                  </div>
                </motion.div>
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
                    alt={`${attraction.title} ${lightboxIdx + 1}`}
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

      {/* ── ACTIVITIES ────────────────────────────────── */}
      {activities.length > 0 && (
        <section className="section-spacing px-6 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-400">Experiences</p>
              <h2 className="font-serif text-4xl font-bold text-white">Activities</h2>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {activities.map((act, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/40 px-4 py-3 hover:border-amber-500/30 transition-colors"
                >
                  <span className="text-amber-400">✦</span>
                  <span className="text-sm text-white/80 font-medium">{act}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TRAVEL TIPS ───────────────────────────────── */}
      {travelTips.length > 0 && (
        <section className="section-spacing px-6 lg:px-16 bg-slate-950/50">
          <div className="mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-400">Useful Tips</p>
              <h2 className="font-serif text-4xl font-bold text-white">Travel Tips</h2>
            </motion.div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {travelTips.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 rounded-xl border border-white/8 bg-slate-900/30 px-4 py-4"
                >
                  <span className="text-amber-400 text-lg flex-shrink-0 mt-0.5">💡</span>
                  <p className="text-sm text-white/70 leading-relaxed">{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEARBY HOTELS ─────────────────────────────── */}
      {nearbyHotels.length > 0 && (
        <section className="section-spacing px-6 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-400">Stay</p>
              <h2 className="font-serif text-4xl font-bold text-white">Nearby Hotels</h2>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {nearbyHotels.map((hotel, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 hover:border-amber-500/20 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-amber-400 fill-amber-400 flex-shrink-0" />
                    <h3 className="font-semibold text-white text-sm">{hotel.name}</h3>
                  </div>
                  {hotel.distance && <p className="text-xs text-white/40 mb-1"><MapPin className="inline h-3 w-3 mr-1" />{hotel.distance}</p>}
                  {hotel.priceRange && <p className="text-xs text-amber-300/70">{hotel.priceRange}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RESTAURANTS ───────────────────────────────── */}
      {restaurants.length > 0 && (
        <section className="section-spacing px-6 lg:px-16 bg-slate-950/50">
          <div className="mx-auto max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-400">Dining</p>
              <h2 className="font-serif text-4xl font-bold text-white">Where to Eat</h2>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {restaurants.map((rest, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 hover:border-amber-500/20 transition-colors"
                >
                  <h3 className="font-semibold text-white text-sm mb-1">{rest.name}</h3>
                  {rest.cuisine && <p className="text-xs text-amber-300/70 mb-1">{rest.cuisine}</p>}
                  {rest.distance && <p className="text-xs text-white/40"><MapPin className="inline h-3 w-3 mr-1" />{rest.distance}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQs ──────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="section-spacing px-6 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-amber-400">Questions</p>
              <h2 className="font-serif text-4xl font-bold text-white">Frequently Asked</h2>
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
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-slate-950/95 backdrop-blur-xl px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="font-semibold text-white">{attraction.title}</p>
            {attraction.location && (
              <p className="text-xs text-white/50"><MapPin className="inline h-3 w-3 mr-1" />{attraction.location}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-3 ml-auto">
            <a
              href={buildTelLink(phone)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-all"
            >
              <Phone className="h-4 w-4" /> Call
            </a>
            <a
              href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-2.5 text-sm font-medium text-green-400 hover:bg-green-500/20 transition-all"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={`https://wa.me/${whatsapp.replace(/[^\d]/g, '')}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
            >
              <BookOpen className="h-4 w-4" /> Plan Visit
            </a>
          </div>
        </div>
      </div>

      <div className="h-24" />
    </main>
  );
}



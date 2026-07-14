"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";

import { AnimatedSection } from "@/components/animated-section";
import { SectionHeading } from "@/components/section-heading";

interface AttractionItem {
  id: string;
  slug: string;
  title: string;
  heroImage?: string | null;
  state?: string | null;
  category: string;
  displayOrder: number;
}

/* ─────────────────────────────────────────────
   3-D Tilt Card (fully clickable, all animations preserved)
───────────────────────────────────────────── */
function AttractionCard({
  id,
  slug,
  title,
  image,
  region,
  index,
}: {
  id: string;
  slug: string;
  title: string;
  image: string;
  region: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  /* Mouse-tracking for 3-D tilt */
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 28 });
  const springY = useSpring(y, { stiffness: 200, damping: 28 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(relX);
      y.set(relY);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setHovered(false);
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
      id={`attraction-card-${id}`}
      className="group relative flex-none cursor-pointer select-none"
      style={{
        width: "clamp(240px, 26vw, 340px)",
        height: "clamp(320px, 35vw, 440px)",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Clickable overlay spanning entire card */}
      <Link
        href={`/attractions/${slug}`}
        className="absolute inset-0 z-20"
        aria-label={`Explore ${title}`}
      />

      {/* 3-D Tilt wrapper */}
      <motion.div
        className="relative w-full h-full rounded-[22px] overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── Image ── */}
        <Image
          src={typeof image === 'string' && image.trim() !== "" ? image : "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.1]"
          sizes="(max-width: 768px) 75vw, 26vw"
          unoptimized
        />

        {/* ── Bottom scrim gradient ── */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent
                      transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* ── Shimmer highlight on hover ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* ── Region badge ── */}
        <div
          className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5
                      rounded-full border border-white/20 backdrop-blur-md bg-black/30
                      opacity-0 translate-y-[-6px] group-hover:opacity-100 group-hover:translate-y-0
                      transition-all duration-400 ease-out"
        >
          <MapPin className="w-3 h-3 text-amber-300 flex-shrink-0" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-200/90">
            {region}
          </span>
        </div>

        {/* ── Destination name ── */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          {/* Eyebrow */}
          <p
            className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-300/70
                       opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0
                       transition-all duration-400 delay-[0.04s]"
          >
            Attraction
          </p>

          {/* Title with mild parallax */}
          <motion.h3
            className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-white drop-shadow-lg
                       leading-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out"
          >
            {title}
          </motion.h3>

          {/* Thin amber underline that grows on hover */}
          <div
            className="mt-3 h-px bg-gradient-to-r from-amber-300/80 to-transparent
                       scale-x-0 origin-left group-hover:scale-x-100
                       transition-transform duration-500 ease-out"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Infinite Marquee Row
───────────────────────────────────────────── */
function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: (AttractionItem & { region: string })[];
  duration: number;
  reverse?: boolean;
}) {
  /* Triple-duplicate for seamless wrap */
  const tripled = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Left / right edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 sm:w-32 z-10
                      bg-gradient-to-r from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 sm:w-32 z-10
                      bg-gradient-to-l from-slate-950 to-transparent" />

      {/* Marquee track — pauses on hover of ANY child */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marquee-ltr {
            from { transform: translateX(0); }
            to   { transform: translateX(-33.3333%); }
          }
          @keyframes marquee-rtl {
            from { transform: translateX(-33.3333%); }
            to   { transform: translateX(0); }
          }
          .marquee-track-ltr {
            animation: marquee-ltr ${duration}s linear infinite;
          }
          .marquee-track-rtl {
            animation: marquee-rtl ${duration}s linear infinite;
          }
          .marquee-track-ltr:hover,
          .marquee-track-rtl:hover {
            animation-play-state: paused;
          }
        `,
      }} />

      <div
        className={`flex gap-5 py-3 w-max ${
          reverse ? "marquee-track-rtl" : "marquee-track-ltr"
        }`}
      >
        {tripled.map((attraction, idx) => (
          <AttractionCard
            key={`${attraction.id}-row-${idx}`}
            id={`${attraction.id}-${idx}`}
            slug={attraction.slug}
            title={attraction.title}
            image={attraction.heroImage || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"}
            region={attraction.region || attraction.state || attraction.category}
            index={idx % items.length}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section — main export
───────────────────────────────────────────── */
export function AttractionsSection() {
  const [attractions, setAttractions] = useState<(AttractionItem & { region: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/attractions")
      .then((r) => r.json())
      .then((data: AttractionItem[]) => {
        if (Array.isArray(data)) {
          setAttractions(
            data.map((a) => ({ ...a, region: a.state || a.category || "India" }))
          );
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const row1 = attractions.slice(0, Math.ceil(attractions.length / 2));
  const row2 = attractions.slice(Math.ceil(attractions.length / 2));

  return (
    <AnimatedSection
      id="attractions"
      className="relative section-spacing bg-slate-950 overflow-hidden"
    >
      {/* ── Ambient glow blobs ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px]
                   rounded-full bg-amber-600/6 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/3 h-[400px] w-[400px]
                   rounded-full bg-sky-700/5 blur-[100px]"
      />

      {/* ── Subtle grid texture ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)," +
            "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
        }}
      />

      {/* ── Heading ── */}
      <div className="relative z-10 container-shell mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Explore"
            title="ATTRACTIONS"
            description="Discover awe-inspiring landscapes and unforgettable experiences waiting across India's most breathtaking destinations."
          />

          {/* Decorative counter pill */}
          {!loading && attractions.length > 0 && (
            <motion.div
              className="flex-shrink-0 self-start md:self-auto"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                              border border-white/10 bg-white/4 backdrop-blur-sm">
                <span className="text-2xl font-serif font-bold text-amber-300">
                  {attractions.length}+
                </span>
                <span className="text-xs uppercase tracking-widest text-white/50 font-medium">
                  Attractions
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      {loading ? (
        <div className="relative z-10 flex flex-col gap-5">
          <div className="h-[clamp(320px,35vw,440px)] animate-pulse bg-slate-800/40 rounded-2xl mx-6" />
          <div className="h-[clamp(320px,35vw,440px)] animate-pulse bg-slate-800/30 rounded-2xl mx-6" />
        </div>
      ) : attractions.length === 0 ? (
        <div className="relative z-10 flex flex-col items-center justify-center py-20 text-white/40">
          <p className="text-lg font-light">No attractions yet.</p>
          <p className="text-sm mt-1">Add them from the admin panel.</p>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col gap-5">
          {/* Row 1 — scrolls left */}
          {row1.length > 0 && <MarqueeRow items={row1} duration={42} />}

          {/* Row 2 — scrolls right (reverse) */}
          {row2.length > 0 && <MarqueeRow items={row2} duration={52} reverse />}
        </div>
      )}

      {/* ── Bottom copy-line ── */}
      {!loading && attractions.length > 0 && (
        <motion.p
          className="relative z-10 mt-10 text-center text-xs uppercase tracking-[0.3em] text-white/25 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Hover to pause · Click to explore · Ibex Adventure
        </motion.p>
      )}
    </AnimatedSection>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { globalEasing } from "@/components/animated-section";

export interface HeroSectionClientProps {
  variant: "home" | "category";
  headline?: string;
  headlinePrefix?: string;
  scrollWords?: string[];
  subtitle?: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  images: string[];
}

/* ──────────────────────────────────────────
   Animated word flip — cinematic editorial
────────────────────────────────────────── */
function AnimatedWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <span className="relative block h-[1.15em] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="absolute left-0 top-0 text-[#D4AF37]"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ──────────────────────────────────────────
   Split headline helper
────────────────────────────────────────── */
function splitHeadline(
  headline: string,
  prefix?: string,
  scrollWords?: string[]
): { prefix: string; words: string[] } {
  if (prefix && scrollWords && scrollWords.length > 0) {
    return { prefix, words: scrollWords };
  }
  const parts = (headline || "Adventure Awaits").trim().split(/\s+/);
  if (parts.length >= 2) {
    const lastWord = parts[parts.length - 1];
    const prefixPart = parts.slice(0, -1).join(" ");
    const words =
      scrollWords && scrollWords.length > 0
        ? scrollWords
        : [lastWord, "Journeys", "Experiences", "Expeditions", "Treks", "Escapes"];
    return { prefix: prefixPart, words };
  }
  return {
    prefix: headline || "Incredible",
    words: scrollWords && scrollWords.length > 0 ? scrollWords : ["Adventures", "Journeys", "Experiences"],
  };
}

/* ──────────────────────────────────────────
   Main hero client component
────────────────────────────────────────── */
export function HeroSectionClient({
  variant,
  headline,
  headlinePrefix,
  scrollWords,
  subtitle,
  description,
  buttonText,
  buttonLink,
  images,
}: HeroSectionClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [images.length]);

  const { prefix, words } =
    variant === "home"
      ? splitHeadline(headline || "Incredible Adventures", headlinePrefix, scrollWords)
      : { prefix: headline || "", words: [] };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#172C21]"
    >
      {/* Background slideshow with subtle Ken Burns */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.8, ease: "easeInOut" },
              scale: { duration: 9, ease: "linear" },
            }}
          >
            <Image
              src={
                typeof images[currentIndex] === "string" && images[currentIndex].trim()
                  ? images[currentIndex]
                  : "/placeholder.svg"
              }
              alt="Ibex Adventure — India's premium expedition company"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
              unoptimized
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic overlays — lighter than before, preserves photography */}
        <div className="absolute inset-0 bg-[#172C21]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#172C21]/80 via-[#172C21]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#172C21]/55 to-transparent" />
      </motion.div>

      {/* Hero content */}
      <motion.div
        className="relative z-10 flex min-h-screen flex-col items-start justify-center px-5 pb-32 pt-28 md:px-16 lg:px-24"
        style={{ y: textY, opacity: overlayOpacity }}
      >
        <div className="max-w-3xl">
          {/* Eyebrow */}
          {subtitle && variant === "home" && (
            <motion.p
              className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: globalEasing, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}

          {variant === "category" ? (
            /* Category hero — large script title */
            <>
              {subtitle && (
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  {subtitle}
                </p>
              )}
              <h1 className="font-serif text-6xl font-normal leading-tight text-white drop-shadow-2xl md:text-8xl lg:text-9xl capitalize">
                {headline}
              </h1>
            </>
          ) : (
            /* Home hero — animated headline */
            <>
              <motion.h1
                className="mb-6 flex flex-col font-serif font-normal leading-[1.05] text-white drop-shadow-lg overflow-visible"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: globalEasing, delay: 0.2 }}
              >
                {/* Static prefix */}
                <span className="text-[clamp(2.5rem,7vw,5rem)]">{prefix}</span>
                {/* Animated word */}
                <span className="text-[clamp(2.5rem,7vw,5rem)]">
                  <AnimatedWord words={words} />
                </span>
              </motion.h1>

              {description && (
                <motion.p
                  className="mb-10 max-w-xl text-base text-white/85 leading-relaxed font-light md:text-lg"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: globalEasing, delay: 0.45 }}
                >
                  {description}
                </motion.p>
              )}

              {/* CTA buttons */}
              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: globalEasing, delay: 0.65 }}
              >
                <Link
                  href={buttonLink}
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold text-[#172C21] transition-all hover:bg-[#FED65B] hover:shadow-xl hover:shadow-[#D4AF37]/30"
                >
                  {buttonText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/75 underline underline-offset-4 transition-colors hover:text-white"
                >
                  Our Story
                </a>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>

      {/* Slide indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-20 left-5 z-20 flex gap-2 md:left-16">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-[2px] transition-all duration-500 ease-out ${
                idx === currentIndex ? "w-10 bg-[#D4AF37]" : "w-5 bg-white/35 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator */}
      {variant === "home" && (
        <motion.div
          className="absolute bottom-8 right-5 z-20 flex flex-col items-center gap-2 md:right-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50 [writing-mode:vertical-rl]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-white/40" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

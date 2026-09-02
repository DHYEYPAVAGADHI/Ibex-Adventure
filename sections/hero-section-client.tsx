"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronRight, Play } from "lucide-react";
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

export function HeroSectionClient({
  variant,
  headline,
  subtitle,
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

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[100vh] overflow-hidden bg-[#111]"
    >
      {/* Background slideshow */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
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
              alt="Ibex Adventure"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
              unoptimized
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays matching the screenshot's darker cinematic tone */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
      </motion.div>

      {/* Hero content */}
      <motion.div
        className="relative z-10 flex min-h-screen flex-col items-start justify-center px-6 md:px-16 lg:px-24 pt-32 pb-20"
        style={{ y: textY, opacity: overlayOpacity }}
      >
        <div className="max-w-[800px] w-full">
          {variant === "category" ? (
            /* Category hero */
            <>
              {subtitle && (
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#86A857]">
                  {subtitle}
                </p>
              )}
              <h1 className="font-sans text-5xl font-black leading-tight text-white md:text-7xl lg:text-8xl uppercase tracking-tight">
                {headline}
              </h1>
            </>
          ) : (
            /* Home hero EXACT MATCH */
            <>
              <motion.h1
                className="mb-8 flex flex-col font-sans font-black leading-[1.05] text-white uppercase tracking-tighter drop-shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: globalEasing }}
              >
                <span className="text-[clamp(3rem,8vw,6.5rem)]">INDIA IS NOT</span>
                <span className="text-[clamp(3rem,8vw,6.5rem)]">A DESTINATION.</span>
                <span className="text-[clamp(3rem,8vw,6.5rem)] text-[#86A857] italic font-serif -mt-2">
                  IT'S AN EXPERIENCE.
                </span>
              </motion.h1>

              <motion.div
                className="mb-8 text-white/90 text-lg md:text-xl font-medium leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: globalEasing, delay: 0.2 }}
              >
                Travel beyond sightseeing.<br />
                Experience places. Meet people.<br />
                Discover stories. Learn from the journey.
              </motion.div>

              <motion.p
                className="mb-12 text-[#86A857] text-lg md:text-xl font-bold tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: globalEasing, delay: 0.3 }}
              >
                Travel. Experience. Learn.
              </motion.p>

              {/* Buttons row */}
              <motion.div
                className="flex flex-wrap items-center justify-between w-full gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: globalEasing, delay: 0.4 }}
              >
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/journeys"
                    className="inline-flex items-center gap-2 rounded bg-[#5D7C3F] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[#4A6432]"
                  >
                    EXPLORE JOURNEYS
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded border border-white/50 bg-black/20 backdrop-blur-sm px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10"
                  >
                    PLAN YOUR JOURNEY
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Watch Our Story */}
                <button className="group flex items-center gap-4 hover:opacity-80 transition-opacity">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg shadow-white/20">
                    <Play className="h-5 w-5 ml-1 text-black" fill="currentColor" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold tracking-wider text-white uppercase">WATCH OUR STORY</p>
                    <p className="text-xs text-white/60">#ExperienceIBEX</p>
                  </div>
                </button>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}

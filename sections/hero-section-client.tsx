"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
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

const FALLBACK = "/placeholder.svg";

export function HeroSectionClient({ variant, headline, subtitle, images }: HeroSectionClientProps) {
  const pool = (images || []).filter((s) => typeof s === "string" && s.trim());
  const slides = pool.length ? pool : [FALLBACK];
  const [i, setI] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--color-forest-deep)]">
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <Image
              src={slides[i]}
              alt=""
              fill
              priority={i === 0}
              className="object-cover object-center"
              sizes="100vw"
              unoptimized
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 pt-28 pb-20 md:px-16 lg:px-24">
        <div className="w-full max-w-[820px]">
          {variant === "category" ? (
            <>
              {subtitle && (
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-lime)]">
                  {subtitle}
                </p>
              )}
              <h1 className="display-hed text-[clamp(2.75rem,8vw,6.5rem)] text-white drop-shadow-lg">
                {headline}
              </h1>
            </>
          ) : (
            <>
              <motion.h1
                className="display-hed mb-7 flex flex-col text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: globalEasing }}
              >
                <span className="text-[clamp(2.75rem,7.5vw,6rem)]">India is not</span>
                <span className="text-[clamp(2.75rem,7.5vw,6rem)]">a destination.</span>
                <span className="text-[clamp(2.75rem,7.5vw,6rem)] text-[var(--color-lime)]">
                  It&rsquo;s an experience.
                </span>
              </motion.h1>

              <motion.p
                className="mb-7 max-w-2xl text-lg font-medium leading-relaxed text-white/90 md:text-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: globalEasing, delay: 0.15 }}
              >
                Travel beyond sightseeing. Experience places. Meet people. Discover stories. Learn from
                the journey.
              </motion.p>

              <motion.p
                className="mb-11 text-lg font-bold tracking-wide text-[var(--color-lime)] md:text-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: globalEasing, delay: 0.25 }}
              >
                Travel. Experience. Learn.
              </motion.p>

              <motion.div
                className="flex w-full flex-wrap items-center justify-between gap-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: globalEasing, delay: 0.35 }}
              >
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/journeys"
                    className="inline-flex items-center gap-2 rounded bg-[var(--color-moss)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[var(--color-moss-dark)]"
                  >
                    Explore Journeys <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded border border-white/50 bg-black/20 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                  >
                    Plan Your Journey <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <a
                  href="/#stories"
                  className="group flex items-center gap-4 transition-opacity hover:opacity-80"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
                    <Play className="ml-1 h-5 w-5 text-black" fill="currentColor" />
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-bold uppercase tracking-wider text-white">
                      Watch Our Story
                    </span>
                    <span className="block text-xs text-white/60">#ExperienceIBEX</span>
                  </span>
                </a>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

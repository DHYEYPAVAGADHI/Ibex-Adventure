"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { globalEasing } from "@/components/animated-section";
import { HeroActivityNavigation } from "@/components/hero-activity-navigation";
import { PrimaryButton } from "@/components/primary-button";



export interface HeroSectionClientProps {
  variant: "home" | "category";
  headline?: string;
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
  description,
  buttonText,
  buttonLink,
  images,
}: HeroSectionClientProps) {
  const displayImages = images;
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [displayImages.length]);

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen overflow-hidden bg-slate-950">
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.15 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 10, ease: "linear" },
            }}
          >
            <Image
              src={typeof displayImages[currentIndex] === 'string' && displayImages[currentIndex].trim() !== "" ? displayImages[currentIndex] : "/placeholder.svg"}
              alt="Ibex Adventure Landscape"
              fill
              priority
              className="object-cover origin-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-slate-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="container-shell relative z-10 flex min-h-screen items-center pb-32 pt-32 lg:pt-40">
        <div className={`grid w-full gap-12 lg:items-center ${variant === "category" ? "lg:grid-cols-1 justify-items-center text-center" : "lg:grid-cols-1"}`}>
          <motion.div
            className={variant === "category" ? "max-w-4xl" : "max-w-2xl"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: globalEasing, delay: 0.2 }}
            style={{ y: textY }}
          >
            {variant === "category" ? (
              <>
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.4em] text-amber-400/90 drop-shadow-md">
                  {subtitle}
                </p>
                <h1 className="font-script text-7xl md:text-9xl lg:text-[10rem] font-normal leading-tight text-white drop-shadow-2xl capitalize">
                  {headline}
                </h1>
              </>
            ) : (
              <>
                {subtitle && (
                  <p className="mb-4 text-sm font-medium uppercase tracking-[0.4em] text-amber-400/90 drop-shadow-md">
                    {subtitle}
                  </p>
                )}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-xl mb-6">
                  {headline}
                </h1>
                {description && (
                  <p className="text-lg md:text-xl text-white/90 drop-shadow mb-8 max-w-xl leading-relaxed">
                    {description}
                  </p>
                )}
                <PrimaryButton
                  href={buttonLink}
                  className="px-8 py-4 text-base"
                >
                  {buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </PrimaryButton>
              </>
            )}
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 md:bottom-28 left-0 right-0 z-20 flex justify-center gap-3">
        {displayImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 transition-all duration-500 ease-out ${
              idx === currentIndex ? "w-12 bg-amber-400" : "w-6 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      
      {variant === "home" && <HeroActivityNavigation />}
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight, Calendar, GraduationCap, Briefcase, Users, Pencil } from "lucide-react";
import { SafeImage } from "@/components/safe-image";

const CTA_OPTIONS = [
  {
    icon: <Calendar className="h-5 w-5 text-[#222]" />,
    title: "JOIN AN\nUPCOMING TRIP",
    link: "/journeys",
  },
  {
    icon: <GraduationCap className="h-5 w-5 text-[#222]" />,
    title: "PLAN A\nCOLLEGE TRIP",
    link: "/for-colleges",
  },
  {
    icon: <Briefcase className="h-5 w-5 text-[#222]" />,
    title: "PLAN A\nCORPORATE TRIP",
    link: "/for-corporates",
  },
  {
    icon: <Users className="h-5 w-5 text-[#222]" />,
    title: "PLAN A FAMILY /\nGROUP TRIP",
    link: "/contact",
  },
  {
    icon: <Pencil className="h-5 w-5 text-[#222]" />,
    title: "CREATE A\nCUSTOM JOURNEY",
    link: "/contact",
  }
];

export function CtaSection() {
  return (
    <section className="relative section-spacing overflow-hidden min-h-[500px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
          alt="Mountains"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container-shell max-w-[1400px] mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-end">
          
          {/* Left Side: Text and Buttons */}
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[var(--color-lime)]">
              READY TO EXPERIENCE
            </p>
            <h2 className="font-sans text-4xl font-black uppercase tracking-tight text-white md:text-5xl lg:text-6xl mb-6">
              INDIA DIFFERENTLY?
            </h2>
            <p className="text-white/90 text-sm md:text-base font-medium mb-8 max-w-md">
              Tell us what you're looking for.<br/>
              We'll design the perfect journey for you.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded bg-[var(--color-moss)] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-moss-dark)]"
              >
                PLAN YOUR JOURNEY
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded border border-white/40 bg-white/10 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                WHATSAPP IBEX
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right Side: 5 Horizontal Icons */}
          <div className="bg-white/95 backdrop-blur-md rounded-lg p-2 shadow-2xl flex flex-wrap lg:flex-nowrap justify-between gap-1">
            {CTA_OPTIONS.map((option, i) => (
              <Link
                key={i}
                href={option.link}
                className="group flex-1 min-w-[120px] flex flex-col items-center justify-center text-center p-4 hover:bg-black/5 rounded transition-colors"
              >
                <div className="mb-3">
                  {option.icon}
                </div>
                <h4 className="text-[9px] font-bold uppercase tracking-widest text-[#222] whitespace-pre-line leading-relaxed group-hover:text-[var(--color-moss)] transition-colors">
                  {option.title}
                </h4>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

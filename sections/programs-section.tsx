"use client";

import Link from "next/link";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import { SafeImage } from "@/components/safe-image";

const FEATURED_JOURNEYS = [
  {
    id: "1", title: "LADAKH", duration: "7N / 8D",
    tags: "⛰ Adventure • Culture", price: "₹18,999",
    image: "https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "2", title: "SPITI VALLEY", duration: "6N / 7D",
    tags: "Remote • Culture • Nature", price: "₹16,999",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "3", title: "RISHIKESH", duration: "3N / 4D",
    tags: "Adventure • Spirituality", price: "₹8,999",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "4", title: "RAJASTHAN", duration: "5N / 6D",
    tags: "Heritage • Culture • Desert", price: "₹14,999",
    image: "https://images.unsplash.com/photo-1600100397608-f010f443b0d2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "5", title: "KUTCH", duration: "4N / 5D",
    tags: "Craft • Culture • Community", price: "₹12,999",
    image: "https://images.unsplash.com/photo-1542640244-7e672d6cb466?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "6", title: "KERALA", duration: "6N / 7D",
    tags: "Nature • Food • Wellness", price: "₹12,999",
    image: "https://images.unsplash.com/photo-1518182170546-076616fdfaaf?auto=format&fit=crop&w=600&q=80"
  }
];

export function ProgramsSection() {
  return (
    <section id="journeys" className="section-spacing bg-[#172C21] text-white">
      <div className="container-shell max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-widest text-[#86A857]">
              YOUR NEXT JOURNEY IS WAITING.
            </p>
            <h2 className="font-sans text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
              EXPLORE FEATURED JOURNEYS
            </h2>
          </div>
          <Link
            href="/journeys"
            className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10"
          >
            VIEW ALL JOURNEYS
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 6-column Grid (or horizontal scroll on mobile) */}
        <div className="flex overflow-x-auto pb-8 -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 snap-x snap-mandatory hide-scrollbar">
          {FEATURED_JOURNEYS.map((journey) => (
            <Link
              key={journey.id}
              href={`/journeys/${journey.title.toLowerCase().replace(" ", "-")}`}
              className="group relative flex flex-col min-w-[260px] md:min-w-0 aspect-[3/4] rounded-xl overflow-hidden snap-center bg-gray-900 border border-white/10 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <SafeImage
                src={journey.image}
                alt={journey.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 20vw"
                unoptimized
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-sans text-lg font-black tracking-wide text-white uppercase mb-1">
                  {journey.title}
                </h3>
                
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#ddd] mb-1">
                  {journey.duration}
                </p>
                <p className="text-[10px] font-medium text-[#aaa] mb-4">
                  {journey.tags}
                </p>
                
                <div className="flex items-center justify-between border-t border-white/20 pt-3">
                  <p className="text-xs font-medium text-white">
                    <span className="text-[#aaa] text-[10px] mr-1">From:</span>
                    {journey.price}
                  </p>
                  <ArrowRightCircle className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Mountain, Utensils, Users, Building, Waves, Trees, Map, Heart, BookOpen, Music } from "lucide-react";
import { SafeImage } from "@/components/safe-image";

interface AttractionItem {
  id: string;
  slug: string;
  title: string;
  heroImage?: string | null;
  state?: string | null;
  category: string;
  displayOrder: number;
}

const STATIC_EXPERIENCES = [
  {
    id: "1", title: "WALK THE HIMALAYAS", subtitle: "Discover resilience",
    icon: <Mountain className="w-5 h-5 text-white" />,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80",
    color: "bg-[#5D7C3F]"
  },
  {
    id: "2", title: "EAT LIKE A LOCAL", subtitle: "Discover culture",
    icon: <Utensils className="w-5 h-5 text-white" />,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400&q=80",
    color: "bg-[#E67E22]"
  },
  {
    id: "3", title: "MEET THE MAKERS", subtitle: "Discover livelihoods",
    icon: <Users className="w-5 h-5 text-white" />,
    image: "https://images.unsplash.com/photo-1542640244-7e672d6cb466?auto=format&fit=crop&w=400&q=80",
    color: "bg-[#D35400]"
  },
  {
    id: "4", title: "LIVE RURAL INDIA", subtitle: "Discover community",
    icon: <Building className="w-5 h-5 text-white" />,
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=400&q=80",
    color: "bg-[#8E44AD]"
  },
  {
    id: "5", title: "FOLLOW THE RIVERS", subtitle: "Discover civilisation",
    icon: <Waves className="w-5 h-5 text-white" />,
    image: "https://images.unsplash.com/photo-1518182170546-076616fdfaaf?auto=format&fit=crop&w=400&q=80",
    color: "bg-[#2980B9]"
  },
  {
    id: "6", title: "ENTER THE WILD", subtitle: "Discover biodiversity",
    icon: <Trees className="w-5 h-5 text-white" />,
    image: "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=400&q=80",
    color: "bg-[#F1C40F]"
  },
  {
    id: "7", title: "WALK THROUGH LIVING HISTORY", subtitle: "Discover the past",
    icon: <Map className="w-5 h-5 text-white" />,
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80",
    color: "bg-[#C0392B]"
  },
  {
    id: "8", title: "UNDERSTAND INDIA'S SPIRITUALITY", subtitle: "Discover belief & tradition",
    icon: <Heart className="w-5 h-5 text-white" />,
    image: "https://images.unsplash.com/photo-1600100397608-f010f443b0d2?auto=format&fit=crop&w=400&q=80",
    color: "bg-[#9B59B6]"
  },
  {
    id: "9", title: "LEARN AN INDIAN ART", subtitle: "Discover creativity",
    icon: <BookOpen className="w-5 h-5 text-white" />,
    image: "https://images.unsplash.com/photo-1512413913812-7067087652df?auto=format&fit=crop&w=400&q=80",
    color: "bg-[#E84393]"
  },
  {
    id: "10", title: "LISTEN TO INDIA'S STORIES", subtitle: "Discover people",
    icon: <Music className="w-5 h-5 text-white" />,
    image: "https://images.unsplash.com/photo-1596422846543-74c6e94fbd81?auto=format&fit=crop&w=400&q=80",
    color: "bg-[#7F8C8D]"
  }
];

export function AttractionsSection() {
  return (
    <section id="experiences" className="section-spacing bg-white">
      <div className="container-shell max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#ddd] pb-6">
          <div>
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-widest text-[#555]">
              INDIA HAS 1.4 BILLION STORIES.
            </p>
            <h2 className="font-sans text-3xl font-black uppercase tracking-tight text-[#222] md:text-4xl">
              HOW MANY WILL YOU EXPERIENCE?
            </h2>
          </div>
          <Link
            href="/experiences"
            className="inline-flex items-center gap-2 rounded border border-[#ddd] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#222] transition-all hover:bg-gray-50"
          >
            EXPLORE ALL EXPERIENCES
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 5-column Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {STATIC_EXPERIENCES.map((exp) => (
            <Link
              key={exp.id}
              href={`/experiences/${exp.id}`}
              className="group flex flex-col rounded-lg border border-[#eee] bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Top Image Box */}
              <div className="relative aspect-[4/3] w-full bg-gray-100">
                <SafeImage
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 20vw"
                  unoptimized
                />
                
                {/* Overlapping Icon */}
                <div className={`absolute -bottom-5 left-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-md ${exp.color} z-10 transition-transform group-hover:-translate-y-1`}>
                  {exp.icon}
                </div>
              </div>

              {/* Bottom Content Box */}
              <div className="flex flex-col flex-grow px-5 pt-8 pb-4">
                <h3 className="font-sans text-xs font-bold uppercase tracking-wide text-[#222] leading-tight">
                  {exp.title}
                </h3>
                <p className="mt-1 text-xs text-[#666]">
                  {exp.subtitle}
                </p>
                
                <div className="mt-auto pt-4 flex items-center gap-1.5 text-[0.65rem] font-medium text-[#888] uppercase tracking-wider">
                  <span className="text-[#444]">Experience</span>
                  <span className="text-[10px]">➔</span>
                  <span className="text-[#444]">Learn</span>
                  <span className="text-[10px]">➔</span>
                  <span className="text-[#444]">Reflect</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

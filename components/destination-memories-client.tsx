"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type Memory = {
  id: string;
  image: string;
  caption: string;
  category: string;
  destination: string;
  displayOrder: number;
  active: boolean;
};

export type MemoryStats = {
  travelers: string;
  expeditions: string;
  destinations: string;
  satisfaction: string;
};

export function DestinationMemoriesClient({
  memories,
  stats,
}: {
  memories: Memory[];
  stats: MemoryStats;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (memories.length === 0) return null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? memories.length - 1 : lightboxIndex - 1);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === memories.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <section className="py-24 bg-[#08132B] relative border-t border-white/5">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="container-shell relative z-10">
        {/* Header & Trust Section */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            Memories With Ibex Adventure
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto mb-6 rounded-full" />
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-light mb-12">
            Explore real moments captured during our adventures, treks, wildlife safaris, heritage explorations, and nature experiences.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#FFD700] mb-2">{stats.travelers}</p>
              <p className="text-sm text-white/60 uppercase tracking-widest">Happy Travelers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#FFD700] mb-2">{stats.expeditions}</p>
              <p className="text-sm text-white/60 uppercase tracking-widest">Expeditions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#FFD700] mb-2">{stats.destinations}</p>
              <p className="text-sm text-white/60 uppercase tracking-widest">Destinations</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[#FFD700] mb-2">{stats.satisfaction}</p>
              <p className="text-sm text-white/60 uppercase tracking-widest">Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6">
          {memories.map((memory, idx) => (
            <div
              key={memory.id}
              onClick={() => openLightbox(idx)}
              className="relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group shadow-lg border border-white/10"
            >
              {/* Using standard img for masonry to let heights adjust naturally based on intrinsic aspect ratio */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={typeof memory.image === 'string' && memory.image.trim() !== "" ? memory.image : "/placeholder.svg"}
                alt={memory.caption}
                loading="lazy"
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08132B]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-6 w-full translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white font-medium leading-tight drop-shadow-md">
                  {memory.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-screen Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={typeof memories[lightboxIndex].image === 'string' && memories[lightboxIndex].image.trim() !== "" ? memories[lightboxIndex].image : "/placeholder.svg"}
              alt={memories[lightboxIndex].caption}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
            <p className="text-white/90 text-lg mt-6 font-medium text-center max-w-2xl">
              {memories[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

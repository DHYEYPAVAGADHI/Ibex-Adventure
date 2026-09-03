"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { SafeImage } from "@/components/safe-image";

const TESTIMONIALS = [
  {
    quote: "This wasn't just a college trip. It was an experience that changed the way I see the world.",
    author: "Riya Sharma",
    role: "Student, Delhi",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "IBEX makes learning outside the classroom truly meaningful for our students.",
    author: "Prof. Neeraj S.",
    role: "Faculty Coordinator",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Well planned, safe and absolutely unforgettable. We can't wait for our next journey!",
    author: "Amit & Friends",
    role: "Travellers",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Our team came back more connected and motivated. Great experience!",
    author: "HR Team",
    role: "Tech Company",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
  }
];

export function TestimonialsSection() {
  return (
    <section id="stories" className="section-spacing bg-[var(--color-sand)]">
      <div className="container-shell max-w-[1400px] mx-auto">
        <div className="mb-12">
          <h2 className="font-sans text-3xl font-black uppercase tracking-tight text-[var(--color-ink)] md:text-4xl">
            STORIES FROM THE ROAD.
          </h2>
          <p className="mt-1 text-sm font-bold text-[var(--color-ink-muted)]">
            Real people. Real experiences.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          
          {/* Left: 2x2 Grid of Testimonials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TESTIMONIALS.map((item, i) => (
              <div key={i} className="flex flex-col justify-between rounded bg-white p-6 shadow-sm border border-[var(--color-hair)]">
                <div>
                  <Quote className="h-6 w-6 text-[var(--color-lime)] mb-4" fill="currentColor" />
                  <p className="text-[13px] font-medium leading-relaxed text-[var(--color-ink)] mb-6">
                    {item.quote}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-[var(--color-hair)]">
                    <SafeImage
                      src={item.image}
                      alt={item.author}
                      width={40}
                      height={40}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-ink)]">{item.author}</p>
                    <p className="text-[10px] text-[var(--color-ink-muted)]">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Image Collage & Button */}
          <div className="relative h-full min-h-[400px]">
            {/* The collage consists of 4 images overlapping */}
            <div className="absolute top-0 right-10 w-[45%] aspect-[4/3] rounded overflow-hidden shadow-lg border-4 border-white z-10">
               <SafeImage src="https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?auto=format&fit=crop&w=600&q=80" alt="Collage 1" fill className="object-cover" />
            </div>
            <div className="absolute top-1/4 left-0 w-[50%] aspect-[4/3] rounded overflow-hidden shadow-lg border-4 border-white z-20">
               <SafeImage src="https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=600&q=80" alt="Collage 2" fill className="object-cover" />
            </div>
            <div className="absolute bottom-10 right-0 w-[55%] aspect-video rounded overflow-hidden shadow-lg border-4 border-white z-30">
               <SafeImage src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80" alt="Collage 3" fill className="object-cover" />
            </div>
            
            {/* CTA Button placed relative to the collage */}
            <div className="absolute -bottom-4 right-10 z-40">
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 rounded bg-[var(--color-lime)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xl transition-all hover:bg-[#729345]"
              >
                READ MORE STORIES
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

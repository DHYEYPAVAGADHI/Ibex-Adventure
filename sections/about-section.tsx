import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="section-spacing bg-[#F9F9F9]">
      <div className="container-shell max-w-7xl mx-auto">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          
          {/* Left: Image Collage */}
          <div className="relative w-full aspect-[4/3] max-w-3xl">
            {/* The collage consists of 3 images side by side or slightly overlapping */}
            <div className="absolute inset-0 grid grid-cols-[2fr_1fr_1fr] gap-2 md:gap-4 overflow-hidden rounded-xl">
              <div className="relative h-full w-full">
                <Image src="https://images.unsplash.com/photo-1542640244-7e672d6cb466?auto=format&fit=crop&w=800&q=80" alt="Travel group" fill className="object-cover" />
              </div>
              <div className="relative h-full w-full">
                <Image src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80" alt="Locals" fill className="object-cover" />
              </div>
              <div className="relative h-full w-full">
                <Image src="https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80" alt="Local people" fill className="object-cover" />
              </div>
            </div>

            {/* Overlapping Badges */}
            <div className="absolute -bottom-6 left-8 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 bg-white px-5 py-3 rounded shadow-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 border border-red-200">
                  <X className="h-4 w-4 text-red-600" strokeWidth={3} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#222]">SEE A PLACE</span>
              </div>
              <div className="flex items-center gap-3 bg-white px-5 py-3 rounded shadow-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 border border-green-200">
                  <Check className="h-4 w-4 text-[#5D7C3F]" strokeWidth={3} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#222]">LIVE THE EXPERIENCE</span>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="flex flex-col pt-8 lg:pt-0">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#5D7C3F]">
              MORE THAN A TRIP.
            </p>
            <h2 className="mb-6 font-sans text-4xl font-black uppercase leading-[1.1] text-[#222] md:text-5xl lg:text-6xl tracking-tight">
              A JOURNEY THAT
              <br />
              STAYS WITH YOU.
            </h2>
            <div className="flex flex-col gap-6 text-[15px] leading-relaxed text-[#444]">
              <p className="font-semibold">
                A trip ends when you return home.<br/>
                An experience stays with you.
              </p>
              <p>
                At IBEX Adventure, we create journeys that combine adventure, culture, nature, people and experiential learning.<br/>
                We don't simply take you somewhere.
              </p>
              <p className="font-serif text-2xl italic text-[#5D7C3F]">
                We help you experience it.
              </p>
            </div>
            <div className="pt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#222] transition-colors hover:text-[#5D7C3F] group"
              >
                Explore Our Story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

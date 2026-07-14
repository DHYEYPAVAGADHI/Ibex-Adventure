import { Navbar } from "@/components/navbar";
import { CtaSection } from "@/sections/cta-section";
import { ContactSection } from "@/sections/contact-section";
import Image from "next/image";
import { Mountain, Compass } from "lucide-react";

export default function OurStoryPage() {
  return (
    <main>
      <Navbar />
      
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-24">
        <Image
          src="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=2000&q=80"
          alt="Our Story"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="container-shell relative z-10 text-center">
          <h1 className="font-serif text-5xl font-normal leading-[1.1] tracking-wide text-white md:text-7xl">
            Our Story
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg font-light text-white/80">
            From a small group of passionate trekkers to a community of thousands.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-slate-950 relative">
         <div className="container-shell max-w-4xl space-y-20">
            
            <div className="flex flex-col md:flex-row gap-12 items-center">
               <div className="w-full md:w-1/2">
                  <div className="mb-6 text-amber-400">
                    <Mountain className="w-12 h-12 stroke-[1.5]" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">The Beginning</h2>
                  <p className="text-lg text-white/70 leading-relaxed">
                    Founded in 2010, our journey began with a simple belief: the mountains have the power to transform lives. What started as weekend hikes turned into a lifelong commitment to exploring the unexplored.
                  </p>
               </div>
               <div className="w-full md:w-1/2 relative h-80 rounded-2xl overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1522346513757-54c552451fdc?auto=format&fit=crop&w=800&q=80" alt="Beginning" fill className="object-cover" />
               </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
               <div className="w-full md:w-1/2">
                  <div className="mb-6 text-amber-400">
                    <Compass className="w-12 h-12 stroke-[1.5]" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
                  <p className="text-lg text-white/70 leading-relaxed">
                    We envision a world where everyone has access to safe, sustainable, and life-changing outdoor experiences. We are dedicated to promoting eco-tourism and preserving the pristine nature of the trails.
                  </p>
               </div>
               <div className="w-full md:w-1/2 relative h-80 rounded-2xl overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80" alt="Vision" fill className="object-cover" />
               </div>
            </div>

         </div>
      </section>

      <CtaSection />
      <ContactSection />
    </main>
  );
}

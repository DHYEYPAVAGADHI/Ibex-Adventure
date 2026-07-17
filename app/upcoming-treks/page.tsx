import { Navbar } from "@/components/navbar";
import { CtaSection } from "@/sections/cta-section";
import { ContactSection } from "@/sections/contact-section";
import Image from "next/image";
import { getTours } from "@/lib/data-store";
type Tour = any;

export const dynamic = "force-dynamic";

export default async function UpcomingTreksPage() {
  const allTours = await getTours();
  const treks = allTours.filter((t: any) => t.category === "upcoming-treks" && t.status === "active");

  return (
    <main>
      <Navbar />
      
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-24">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
          alt="Upcoming Treks"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="container-shell relative z-10 text-center">
          <h1 className="font-serif text-5xl font-normal leading-[1.1] tracking-wide text-white md:text-7xl">
            Upcoming Treks
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg font-light text-white/80">
            Join our expert-led expeditions across the most beautiful trails.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-slate-950 relative">
         <div className="container-shell">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {treks.map((trek: any, i: number) => (
                 <div key={i} className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-amber-500/50">
                    <div className="relative h-64 overflow-hidden">
                      <Image src={trek.image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"} alt={trek.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{trek.title}</h3>
                      <p className="text-white/60 mb-4">{trek.duration} Days • {trek.location}</p>
                      <a href={`/programs/tour/${trek.slug}`} className="text-amber-400 font-medium hover:text-amber-300">View Details →</a>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <CtaSection />
      <ContactSection />
    </main>
  );
}

import { Navbar } from "@/components/navbar";
import { CtaSection } from "@/sections/cta-section";
import { ContactSection } from "@/sections/contact-section";
import Image from "next/image";
import { getTours } from "@/lib/data-store";
type Tour = any;

export const dynamic = "force-dynamic";

export default async function UnexploredIndiaPage() {
  const allTours = await getTours();
  const places = allTours.filter((t) => t.category === "unexplored-india" && t.status === "active");

  return (
    <main>
      <Navbar />
      
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-24">
        <Image
          src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2000&q=80"
          alt="Unexplored India"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="container-shell relative z-10 text-center">
          <h1 className="font-serif text-5xl font-normal leading-[1.1] tracking-wide text-white md:text-7xl">
            Unexplored India
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg font-light text-white/80">
            Discover offbeat paths, hidden valleys, and secret trails.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-slate-950 relative">
         <div className="container-shell">
            <div className="space-y-12">
               {places.map((place, i) => (
                 <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                    <div className="w-full md:w-1/2 relative h-80 rounded-3xl overflow-hidden">
                      <Image src={place.image || "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80"} alt={place.title} fill className="object-cover" />
                    </div>
                    <div className="w-full md:w-1/2 p-4 md:p-8">
                      <h3 className="text-3xl font-bold text-white mb-4">{place.title}</h3>
                      <p className="text-lg text-white/70 mb-8">{place.description}</p>
                      <a href={`/programs/tour/${place.slug}`} className="inline-block bg-amber-500 text-slate-950 px-6 py-3 rounded-full font-medium hover:bg-amber-400 transition-colors">View Itinerary</a>
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

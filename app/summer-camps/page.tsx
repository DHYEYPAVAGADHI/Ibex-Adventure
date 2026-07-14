import { Navbar } from "@/components/navbar";
import { CtaSection } from "@/sections/cta-section";
import { ContactSection } from "@/sections/contact-section";
import Image from "next/image";
import { getTours } from "@/lib/data-store";
type Tour = any;

export const dynamic = "force-dynamic";

export default async function SummerCampsPage() {
  const allTours = await getTours();
  const camps = allTours.filter((t) => t.category === "summer-camps" && t.status === "active");

  return (
    <main>
      <Navbar />
      
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-24">
        <Image
          src="https://images.unsplash.com/photo-1533580556157-19eb7db6b78e?auto=format&fit=crop&w=2000&q=80"
          alt="Summer Camps"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="container-shell relative z-10 text-center">
          <h1 className="font-serif text-5xl font-normal leading-[1.1] tracking-wide text-white md:text-7xl">
            Summer Camps
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg font-light text-white/80">
            Empowering youth through outdoor education and leadership building.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-slate-950 relative">
         <div className="container-shell">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {camps.map((camp, i) => (
                 <div key={i} className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-amber-500/50">
                    <div className="relative h-64 overflow-hidden">
                      <Image src={camp.image || "https://images.unsplash.com/photo-1533580556157-19eb7db6b78e?auto=format&fit=crop&w=800&q=80"} alt={camp.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{camp.title}</h3>
                      <p className="text-white/60 mb-4">
                  {camp.ageGroupMin || 10}-{camp.ageGroupMax || 18} Yrs • {camp.location || 'India'} • {camp.duration || 5} Days
                </p>      <a href={`/programs/tour/${camp.slug}`} className="text-amber-400 font-medium hover:text-amber-300">Enquire Now →</a>
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

import { Navbar } from "@/components/navbar";
import { CtaSection } from "@/sections/cta-section";
import { ContactSection } from "@/sections/contact-section";
import Image from "next/image";
import { Heart, Target, Users } from "lucide-react";

export default function IntrekClubPage() {
  return (
    <main>
      <Navbar />
      
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-24">
        <Image
          src="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=2000&q=80"
          alt="InTrek Club"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="container-shell relative z-10 text-center">
          <h1 className="font-serif text-5xl font-normal leading-[1.1] tracking-wide text-white md:text-7xl">
            InTrek Club
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg font-light text-white/80">
            Join an exclusive community of passionate trekkers.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-slate-950 relative">
         <div className="container-shell max-w-4xl text-center">
             <div className="earthy-panel rounded-3xl p-12 border border-white/10 shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-white">Membership Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                   <div className="bg-white/5 p-6 rounded-2xl flex flex-col items-center">
                     <div className="mb-4 text-amber-400">
                       <Heart className="w-10 h-10 stroke-[1.5]" />
                     </div>
                     <h3 className="font-semibold text-white">Passionate Community</h3>
                   </div>
                   <div className="bg-white/5 p-6 rounded-2xl flex flex-col items-center">
                     <div className="mb-4 text-amber-400">
                       <Target className="w-10 h-10 stroke-[1.5]" />
                     </div>
                     <h3 className="font-semibold text-white">Exclusive Expeditions</h3>
                   </div>
                   <div className="bg-white/5 p-6 rounded-2xl flex flex-col items-center">
                     <div className="mb-4 text-amber-400">
                       <Users className="w-10 h-10 stroke-[1.5]" />
                     </div>
                     <h3 className="font-semibold text-white">Local Meetups</h3>
                   </div>
                </div>
                <button className="px-10 py-4 bg-amber-500 text-slate-950 text-lg font-bold rounded-full hover:bg-amber-400 transition-all hover:scale-105">
                  Become a Member Today
                </button>
             </div>
         </div>
      </section>

      <CtaSection />
      <ContactSection />
    </main>
  );
}

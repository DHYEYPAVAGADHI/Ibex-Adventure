import { Navbar } from "@/components/navbar";
import { CtaSection } from "@/sections/cta-section";
import { ContactSection } from "@/sections/contact-section";
import Image from "next/image";
import { BookOpen, GraduationCap, Briefcase } from "lucide-react";
import { getTours } from "@/lib/data-store";
type Tour = any;

export const dynamic = "force-dynamic";

export default async function InsoulPage() {
  const allTours = await getTours();
  const tours = allTours.filter((t: any) => t.category === "insoul" && t.status === "active");

  const fallbackPrograms = [
    { title: "For Schools", desc: "Curriculum-integrated learning.", icon: BookOpen },
    { title: "For Colleges", desc: "Adventure to challenge students.", icon: GraduationCap },
    { title: "For Corporates", desc: "High-impact team building.", icon: Briefcase },
  ];

  return (
    <main>
      <Navbar />
      
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-24">
        <Image
          src="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=2000&q=80"
          alt="InSOUL"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="container-shell relative z-10 text-center">
          <h1 className="font-serif text-5xl font-normal leading-[1.1] tracking-wide text-white md:text-7xl">
            InSOUL
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg font-light text-white/80">
            Transformative outdoor education programs blending nature and experiential learning.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-slate-950 relative">
         <div className="container-shell">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {tours.length > 0 ? tours.map((prog: any, i: number) => (
                 <div key={i} className="p-8 text-center rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-colors">
                    <div className="mb-6 flex justify-center text-amber-400">
                      {prog.image ? <Image src={typeof prog.image === 'string' && prog.image.trim() !== "" ? prog.image : "/placeholder.svg"} width={64} height={64} alt="icon" className="rounded-full" /> : <BookOpen className="w-16 h-16 stroke-[1.5]" />}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{prog.title}</h3>
                    <p className="text-white/70 mb-8">{prog.description}</p>
                    <a href={`/programs/tour/${prog.slug}`} className="inline-block text-amber-400 font-medium hover:text-amber-300 border border-amber-400/30 px-6 py-2 rounded-full w-full">Learn More</a>
                 </div>
               )) : fallbackPrograms.map((prog: any, i: number) => (
                 <div key={i} className="p-8 text-center rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-colors">
                    <div className="mb-6 flex justify-center text-amber-400">
                      <prog.icon className="w-16 h-16 stroke-[1.5]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{prog.title}</h3>
                    <p className="text-white/70 mb-8">{prog.desc}</p>
                    <button className="text-amber-400 font-medium hover:text-amber-300 border border-amber-400/30 px-6 py-2 rounded-full w-full">Learn More</button>
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

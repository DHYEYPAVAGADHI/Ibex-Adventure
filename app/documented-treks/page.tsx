import { Navbar } from "@/components/navbar";
import { CtaSection } from "@/sections/cta-section";
import { ContactSection } from "@/sections/contact-section";
import Image from "next/image";
import { FileText, Download } from "lucide-react";

export default function DocumentedTreksPage() {
  const docs = [
    { title: "Kashmir Great Lakes Route Map", type: "PDF", size: "2.4 MB" },
    { title: "Winter Trekking Gear Checklist", type: "PDF", size: "1.1 MB" },
    { title: "High Altitude Sickness Protocol", type: "PDF", size: "3.5 MB" },
    { title: "Sandakphu Detailed Itinerary", type: "PDF", size: "1.8 MB" },
  ];

  return (
    <main>
      <Navbar />
      
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-24">
        <Image
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=80"
          alt="Documented Treks"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="container-shell relative z-10 text-center">
          <h1 className="font-serif text-5xl font-normal leading-[1.1] tracking-wide text-white md:text-7xl">
            Documented Treks
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg font-light text-white/80">
            Download comprehensive guides and checklists for your next adventure.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-slate-950 relative">
         <div className="container-shell max-w-4xl">
            <div className="space-y-4">
               {docs.map((doc, i) => (
                 <div key={i} className="group flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-amber-400 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="text-amber-400">
                        <FileText className="w-8 h-8 stroke-[1.5]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{doc.title}</h3>
                        <p className="text-sm text-white/50">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-white/50 group-hover:text-amber-400 transition-colors">
                      <span className="font-medium text-sm">Download</span>
                      <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                    </button>
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

import { Navbar } from "@/components/navbar";
import { CtaSection } from "@/sections/cta-section";
import { ContactSection } from "@/sections/contact-section";
import Image from "next/image";
import { readData } from "@/lib/data-store";
type Highlight = any;

export const dynamic = "force-dynamic";

export default function LatestArticlesPage() {
  const allHighlights = readData<Highlight[]>("highlights.json");
  const articles = allHighlights.filter((h: any) => h.active);

  return (
    <main>
      <Navbar />
      
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-24">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
          alt="Latest Articles"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="container-shell relative z-10 text-center">
          <h1 className="font-serif text-5xl font-normal leading-[1.1] tracking-wide text-white md:text-7xl">
            Latest Articles
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg font-light text-white/80">
            Insights, guides, and stories from the trails.
          </p>
        </div>
      </section>

      <section className="section-spacing bg-slate-950 relative">
         <div className="container-shell">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {articles.map((article: any, i: number) => (
                 <div key={i} className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <Image src={article.thumbnail || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-4 left-4 bg-slate-950/90 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {article.category}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-sm text-white/50 mb-3">{new Date(article.createdAt).toLocaleDateString()}</p>
                      <h3 className="text-xl font-bold text-white mb-4 flex-1 group-hover:text-amber-400 transition-colors">{article.title}</h3>
                      <button className="text-amber-400 font-semibold self-start hover:underline">Read Article →</button>
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

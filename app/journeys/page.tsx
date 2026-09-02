import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { prisma } from "@/lib/prisma";

export default async function JourneysPage() {
  // Fetch real journeys from DB
  const journeys = await prisma.package.findMany({
    where: { publishStatus: 'Published' },
    orderBy: { displayOrder: 'asc' }
  });

  return (
    <>
      <Navbar />
      <main className="bg-[#f9f9f9] min-h-screen">
        
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center overflow-hidden pt-20">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
            alt="Mountains"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="relative z-10 px-6 max-w-4xl pt-10">
            <h1 className="font-sans text-5xl font-black uppercase text-white md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-4">
              CURATED <span className="text-[#86A857]">JOURNEYS.</span>
            </h1>
          </div>
        </section>

        {/* Filters Bar */}
        <div className="bg-white border-b border-[#eee] sticky top-[72px] z-30 shadow-sm">
          <div className="container-shell max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 py-4 px-6 md:px-0">
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              {['DESTINATION', 'EXPERIENCE', 'DURATION', 'MONTH'].map((filter, i) => (
                <button key={i} className="flex-1 md:flex-none flex items-center justify-between gap-2 px-4 py-3 bg-[#f4f4f4] hover:bg-[#eee] rounded border border-[#ddd] text-xs font-bold uppercase tracking-widest text-[#222] transition-colors">
                  {filter}
                  <ChevronDown className="w-4 h-4 text-[#888]" />
                </button>
              ))}
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#666] w-full md:w-auto text-right">
              SHOWING {journeys.length} JOURNEYS
            </div>
          </div>
        </div>

        {/* Grid */}
        <section className="py-16 px-6 md:px-0">
          <div className="container-shell max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {journeys.map((journey) => (
                <Link
                  key={journey.id}
                  href={`/journeys/${journey.categorySlug}/${journey.slug}`}
                  className="group flex flex-col bg-white border border-[#eee] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image 
                      src={journey.thumbnail || "https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?auto=format&fit=crop&w=800&q=80"} 
                      alt={journey.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-[#172C21] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded shadow">
                        {journey.category || "ADVENTURE"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-sans text-2xl font-black uppercase text-[#222] mb-4">
                      {journey.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-widest text-[#888] mb-6">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5D7C3F]" />
                        {journey.duration || "7N / 8D"}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E67E22]" />
                        {journey.difficulty || "MODERATE"}
                      </span>
                    </div>

                    <div className="mt-auto pt-6 border-t border-[#eee] flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#aaa]">FROM</span>
                        <span className="text-lg font-black text-[#222]">
                          {journey.price ? `₹${journey.price}` : "₹65,000"}
                        </span>
                      </div>
                      <ArrowRightCircle className="h-8 w-8 text-[#5D7C3F] transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Load More */}
            <div className="mt-16 flex justify-center">
              <button className="px-8 py-4 border-2 border-[#172C21] text-[#172C21] rounded text-xs font-bold uppercase tracking-widest hover:bg-[#172C21] hover:text-white transition-colors">
                LOAD MORE JOURNEYS
              </button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

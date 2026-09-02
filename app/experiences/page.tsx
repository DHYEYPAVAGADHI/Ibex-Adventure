import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mountain, Leaf, Landmark, Music, Utensils, Users, Heart, Camera, Home, ArrowRightCircle } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { prisma } from "@/lib/prisma";

const CATEGORIES = [
  { name: "ADVENTURE", icon: <Mountain className="w-8 h-8 text-[var(--color-moss)]" />, color: "border-[var(--color-moss)]" },
  { name: "NATURE", icon: <Leaf className="w-8 h-8 text-[var(--color-lime)]" />, color: "border-[var(--color-lime)]" },
  { name: "HERITAGE", icon: <Landmark className="w-8 h-8 text-[#8E44AD]" />, color: "border-[#8E44AD]" },
  { name: "CULTURE", icon: <Music className="w-8 h-8 text-[#E67E22]" />, color: "border-[#E67E22]" },
  { name: "FOOD", icon: <Utensils className="w-8 h-8 text-[#D35400]" />, color: "border-[#D35400]" },
  { name: "PEOPLE", icon: <Users className="w-8 h-8 text-[#2980B9]" />, color: "border-[#2980B9]" },
  { name: "WELLNESS", icon: <Heart className="w-8 h-8 text-[#E84393]" />, color: "border-[#E84393]" },
  { name: "PHOTOGRAPHY", icon: <Camera className="w-8 h-8 text-[#7F8C8D]" />, color: "border-[#7F8C8D]" },
  { name: "RURAL", icon: <Home className="w-8 h-8 text-[#C0392B]" />, color: "border-[#C0392B]" }
];

export default async function ExperiencesPage() {
  // Fetch real experiences from DB
  const experiences = await prisma.attraction.findMany({
    take: 6,
    orderBy: { displayOrder: 'asc' }
  });

  return (
    <>
      <Navbar />
      <main className="bg-[#f9f9f9] pt-20">
        
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=2000&q=80"
            alt="Rafting Experience"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="relative z-10 px-6 max-w-4xl pt-20">
            <h1 className="font-sans text-5xl font-black uppercase text-white md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-4">
              EXPERIENCE INDIA <span className="text-[var(--color-lime)]">DIFFERENTLY.</span>
            </h1>
          </div>

          {/* Badges Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-md border-t border-white/20">
            <div className="container-shell max-w-7xl mx-auto py-4 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#ddd] divide-x divide-white/20">
              <span className="pl-6 md:pl-12 first:pl-0 first:border-none">AUTHENTIC</span>
              <span className="pl-6 md:pl-12">LEARN</span>
              <span className="pl-6 md:pl-12">SAFE & RESPONSIBLE</span>
              <span className="pl-6 md:pl-12">MEANINGFUL</span>
              <span className="pl-6 md:pl-12">SUSTAINABLE</span>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="section-spacing text-center">
          <div className="container-shell max-w-6xl mx-auto">
            <h2 className="font-sans text-3xl font-black uppercase tracking-tight text-[#222] mb-12">
              HOW WILL YOU EXPERIENCE INDIA?
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {CATEGORIES.map((cat, i) => (
                <div key={i} className={`bg-white p-8 rounded-2xl shadow-sm border-b-4 ${cat.color} flex flex-col items-center gap-4 hover:-translate-y-1 transition-transform cursor-pointer`}>
                  <div className="w-16 h-16 rounded-full bg-[#f4f4f4] flex items-center justify-center">
                    {cat.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#222]">
                    {cat.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Flowchart */}
        <section className="py-20 bg-white border-y border-[#eee]">
          <div className="container-shell max-w-5xl mx-auto text-center">
            <h2 className="font-sans text-2xl font-black uppercase tracking-tight text-[#222] mb-10">
              EVERY EXPERIENCE IS A LESSON.
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm font-bold uppercase tracking-widest">
              <div className="bg-[#f9f9f9] border-2 border-[var(--color-moss)] text-[var(--color-moss)] px-8 py-4 rounded-xl shadow-sm">
                EXPERIENCE
              </div>
              <ArrowRight className="text-[#888] h-6 w-6 rotate-90 md:rotate-0" />
              <div className="bg-[#f9f9f9] border-2 border-[#E67E22] text-[#E67E22] px-8 py-4 rounded-xl shadow-sm">
                LEARN
              </div>
              <ArrowRight className="text-[#888] h-6 w-6 rotate-90 md:rotate-0" />
              <div className="bg-[#f9f9f9] border-2 border-[#2980B9] text-[#2980B9] px-8 py-4 rounded-xl shadow-sm">
                REFLECT
              </div>
            </div>
          </div>
        </section>

        {/* Popular Experiences Carousel/Grid */}
        <section className="section-spacing">
          <div className="container-shell max-w-[1400px] mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#ddd] pb-6">
              <div>
                <h2 className="font-sans text-3xl font-black uppercase tracking-tight text-[#222] md:text-4xl">
                  HANDPICKED EXPERIENCES
                </h2>
              </div>
            </div>
            
            <div className="flex overflow-x-auto pb-8 -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-4 gap-4 md:gap-5 snap-x snap-mandatory hide-scrollbar">
              {experiences.map((exp) => (
                <Link
                  key={exp.id}
                  href={`/experiences/${exp.slug}`}
                  className="group relative flex flex-col min-w-[260px] md:min-w-0 aspect-[4/5] rounded-xl overflow-hidden snap-center bg-gray-100 shadow-md"
                >
                  <Image src={exp.heroImage || "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80"} alt={exp.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="font-sans text-xl font-black tracking-wide text-white uppercase mb-4 leading-tight">
                      {exp.title}
                    </h3>
                    <div className="flex items-center justify-between border-t border-white/20 pt-4">
                      <span className="text-xs font-bold text-[#ddd] uppercase tracking-widest">{exp.state || "INDIA"}</span>
                      <ArrowRightCircle className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Customizer CTA */}
        <section className="bg-[var(--color-forest-band)] py-24 text-center text-white">
          <div className="container-shell max-w-4xl mx-auto">
            <p className="font-serif text-3xl italic text-[var(--color-lime)] mb-8">
              "You don't just visit India..."
            </p>
            <h2 className="font-sans text-4xl font-black uppercase tracking-tight md:text-5xl mb-16">
              BUILD YOUR OWN EXPERIENCE.
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-black/20 p-8 rounded-xl border border-white/10">
                <div className="w-12 h-12 rounded-full bg-[var(--color-moss)] flex items-center justify-center font-bold text-lg mb-6 mx-auto">1</div>
                <h4 className="font-bold uppercase tracking-widest text-sm mb-4">TELL US YOUR INTERESTS</h4>
                <p className="text-xs text-white/60">Share what you love - wildlife, food, heritage, or adventure.</p>
              </div>
              <div className="bg-black/20 p-8 rounded-xl border border-white/10">
                <div className="w-12 h-12 rounded-full bg-[var(--color-moss)] flex items-center justify-center font-bold text-lg mb-6 mx-auto">2</div>
                <h4 className="font-bold uppercase tracking-widest text-sm mb-4">WE BUILD AN ITINERARY</h4>
                <p className="text-xs text-white/60">Our local experts craft a personalized journey just for you.</p>
              </div>
              <div className="bg-black/20 p-8 rounded-xl border border-white/10">
                <div className="w-12 h-12 rounded-full bg-[var(--color-moss)] flex items-center justify-center font-bold text-lg mb-6 mx-auto">3</div>
                <h4 className="font-bold uppercase tracking-widest text-sm mb-4">YOU LIVE THE EXPERIENCE</h4>
                <p className="text-xs text-white/60">Arrive in India and immerse yourself in an unforgettable journey.</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded bg-[var(--color-moss)] px-10 py-5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-moss-dark)] shadow-xl"
            >
              START DESIGNING
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}

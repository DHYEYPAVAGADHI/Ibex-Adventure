import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowRightCircle, Shield, Phone, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { SafeImage } from "@/components/safe-image";
import { prisma } from "@/lib/prisma";

export const revalidate = 300;

const CATEGORIES = [
  { title: "Educational Trips", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80" },
  { title: "Adventure Journeys", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80" },
  { title: "Service & Community", image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=600&q=80" },
  { title: "Leadership Retreats", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80" },
];

export default async function ForCollegesPage() {
  const POPULAR_JOURNEYS = (
    await prisma.package.findMany({
      where: { isFeatured: true, publishStatus: "Published" },
      orderBy: { displayOrder: "asc" },
      take: 5,
    })
  ).map((j) => ({
    title: j.title,
    href: `/journeys/${j.categorySlug}/${j.slug}`,
    duration: j.duration || "",
    price: j.price ? `₹${j.price}` : "",
    image: j.thumbnail || "/placeholder.svg",
  }));

  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-ivory)]">

        {/* Hero */}
        <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=2000&q=80"
            alt="College group"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 px-6 max-w-4xl">
            <h1 className="font-sans text-5xl font-black uppercase text-white md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-8">
              YOUR STUDENTS DESERVE <span className="text-[var(--color-lime)]">MORE THAN A TOUR.</span>
            </h1>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded bg-[var(--color-moss)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-moss-dark)]"
            >
              PLAN A COLLEGE EXPEDITION
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Stats Bar */}
        <div className="bg-[var(--color-forest-band)] text-white py-6">
          <div className="container-shell max-w-7xl mx-auto flex flex-wrap justify-between items-center text-center gap-6">
            <div className="flex-1 min-w-[150px]">
              <p className="font-sans text-3xl font-black">100+</p>
              <p className="text-xs uppercase tracking-widest text-[var(--color-lime)] mt-1 font-bold">COLLEGES</p>
            </div>
            <div className="flex-1 min-w-[150px]">
              <p className="font-sans text-3xl font-black">500+</p>
              <p className="text-xs uppercase tracking-widest text-[var(--color-lime)] mt-1 font-bold">JOURNEYS</p>
            </div>
            <div className="flex-1 min-w-[150px]">
              <p className="font-sans text-3xl font-black">15+</p>
              <p className="text-xs uppercase tracking-widest text-[var(--color-lime)] mt-1 font-bold">YEARS EXPERIENCE</p>
            </div>
            <div className="flex-1 min-w-[150px]">
              <p className="font-sans text-3xl font-black">ZERO</p>
              <p className="text-xs uppercase tracking-widest text-[var(--color-lime)] mt-1 font-bold">ACCIDENTS</p>
            </div>
          </div>
        </div>

        {/* Flowchart Section */}
        <section className="section-spacing text-center">
          <div className="container-shell max-w-5xl mx-auto">
            <h2 className="font-sans text-3xl font-black uppercase tracking-tight text-[#222] mb-12">
              NOT JUST A TRIP. <span className="text-[var(--color-lime)]">A TRANSFORMATIVE EXPERIENCE.</span>
            </h2>
            
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-[#eee]">
              {/* Top Row: The standard trip */}
              <div className="flex items-center justify-center gap-4 mb-8 text-red-500 font-bold uppercase tracking-widest text-sm">
                <span className="bg-red-50 px-4 py-2 rounded">VISIT</span>
                <span>→</span>
                <span className="bg-red-50 px-4 py-2 rounded">PHOTOGRAPH</span>
                <span>→</span>
                <span className="bg-red-50 px-4 py-2 rounded">RETURN</span>
              </div>
              <div className="h-px w-32 bg-gray-300 mx-auto mb-8 relative">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-bold text-gray-400 uppercase">VS</span>
              </div>
              {/* Bottom Row: The Ibex way */}
              <div className="flex items-center justify-center gap-4 text-[var(--color-moss)] font-bold uppercase tracking-widest text-sm flex-wrap">
                <span className="bg-green-50 px-4 py-2 rounded border border-green-100">PREPARE</span>
                <span>→</span>
                <span className="bg-green-50 px-4 py-2 rounded border border-green-100">EXPERIENCE</span>
                <span>→</span>
                <span className="bg-green-50 px-4 py-2 rounded border border-green-100">CHALLENGE</span>
                <span>→</span>
                <span className="bg-green-50 px-4 py-2 rounded border border-green-100">REFLECT</span>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="pb-24">
          <div className="container-shell max-w-7xl mx-auto grid lg:grid-cols-[1fr_300px] gap-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {CATEGORIES.map((cat, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden group">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-sans text-xl font-black uppercase tracking-widest">{cat.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-[var(--color-forest-band)] p-10 rounded-xl text-white flex flex-col justify-center">
              <h3 className="font-sans text-3xl font-black uppercase tracking-tight mb-6">
                YOU DEFINE THE OBJECTIVE.
                <br />
                <span className="text-[var(--color-lime)]">WE BUILD THE EXPERIENCE.</span>
              </h3>
              <p className="text-sm text-white/80 leading-relaxed font-medium">
                Whether your focus is leadership development, cultural immersion, biological field study, or community service, our team will custom-design an itinerary that meets your academic and developmental goals perfectly.
              </p>
            </div>
          </div>
        </section>

        {/* How Ibex Works Timeline */}
        <section className="section-spacing bg-white border-y border-[#eee]">
          <div className="container-shell max-w-7xl mx-auto text-center">
            <h2 className="font-sans text-2xl font-black uppercase tracking-tight text-[#222] mb-16">
              HOW IBEX WORKS
            </h2>
            <div className="flex flex-wrap justify-between relative">
              <div className="hidden md:block absolute top-6 left-12 right-12 h-1 bg-[#eee] z-0" />
              {['CONSULTATION', 'DESIGN', 'RISK ASSESSMENT', 'PRE-DEPARTURE', 'THE JOURNEY', 'POST-TRIP'].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center bg-white px-2">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-forest-band)] text-white flex items-center justify-center font-bold text-lg mb-4">{i + 1}</div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#222] w-24 text-center">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Comes First */}
        <section className="section-spacing">
          <div className="container-shell max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-sans text-4xl font-black uppercase tracking-tight text-[#222] mb-10">
                SAFETY COMES FIRST.
              </h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#f4f4f4] flex items-center justify-center text-[var(--color-moss)]"><Shield /></div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">WFR CERTIFIED LEADERS</h4>
                    <p className="text-sm text-[#666]">All our lead instructors hold active Wilderness First Responder certifications.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#f4f4f4] flex items-center justify-center text-[var(--color-moss)]"><Phone /></div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">24/7 COMMS</h4>
                    <p className="text-sm text-[#666]">We carry satellite phones and VHF radios in regions without cellular networks.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#f4f4f4] flex items-center justify-center text-[var(--color-moss)]"><ShieldCheck /></div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">STRICT PROTOCOLS</h4>
                    <p className="text-sm text-[#666]">Comprehensive risk management documents tailored for every single route.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80" alt="Rafting" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* Popular Journeys */}
        <section className="section-spacing bg-[var(--color-forest-band)] text-white">
          <div className="container-shell max-w-[1400px] mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <h2 className="font-sans text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                  POPULAR <span className="text-[var(--color-lime)]">JOURNEYS</span>
                </h2>
              </div>
            </div>
            <div className="flex overflow-x-auto pb-8 -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-5 gap-4 md:gap-5 snap-x snap-mandatory hide-scrollbar">
              {POPULAR_JOURNEYS.map((journey, i) => (
                <Link
                  key={i}
                  href={journey.href}
                  className="group relative flex flex-col min-w-[260px] md:min-w-0 aspect-[3/4] rounded-xl overflow-hidden snap-center bg-gray-900 border border-white/10 shadow-lg"
                >
                  <SafeImage src={journey.image} alt={journey.title} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-sans text-lg font-black tracking-wide text-white uppercase mb-1">{journey.title}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#ddd] mb-4">{journey.duration}</p>
                    <div className="flex items-center justify-between border-t border-white/20 pt-3">
                      <p className="text-xs font-medium text-white"><span className="text-[#aaa] text-[10px] mr-1">From:</span>{journey.price}</p>
                      <ArrowRightCircle className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Life Lessons & Educator Reviews */}
        <section className="section-spacing bg-white">
          <div className="container-shell max-w-7xl mx-auto text-center">
            <h2 className="font-sans text-2xl font-black uppercase tracking-tight text-[#222] mb-12">
              LIFE LESSONS OUTSIDE THE CLASSROOM
            </h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-20">
              {['CONFIDENCE', 'LEADERSHIP', 'RESILIENCE', 'EMPATHY', 'TEAMWORK'].map((lesson, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#f9f9f9] border border-[#eee] flex items-center justify-center text-[var(--color-moss)] font-serif text-2xl font-bold italic">
                    {lesson[0]}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#222]">{lesson}</span>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-4 gap-6 text-left">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[#f9f9f9] p-6 rounded-xl border border-[#eee]">
                  <div className="flex text-[var(--color-gold-star)] mb-4">{"★★★★★"}</div>
                  <p className="text-sm font-medium text-[#444] mb-6 italic">
                    "The Ibex team was incredibly professional. They handled 40 students with ease and delivered an experience that students are still talking about."
                  </p>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#222]">- Educator, Delhi</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

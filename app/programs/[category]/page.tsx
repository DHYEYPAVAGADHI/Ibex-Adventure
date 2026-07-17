import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { AnimatedSection } from "@/components/animated-section";
import { HeroSection } from "@/sections/hero-section";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryData = await prisma.activity.findUnique({
    where: { slug: category }
  });

  if (!categoryData) {
    return { title: "Not Found" };
  }

  return {
    title: `${categoryData.title} | Ibex Adventure`,
    description: categoryData.description?.substring(0, 160) || "Explore with Ibex Adventure.",
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  const categoryData = await prisma.activity.findUnique({
    where: { slug: category }
  });

  if (!categoryData) {
    notFound();
  }

  const packages = await prisma.package.findMany({
    where: { 
      categorySlug: category,
      status: "active"
    },
    orderBy: { displayOrder: "asc" }
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-amber-500/30">
      <Navbar />

      {/* Hero Section */}
      <HeroSection 
        variant="category" 
        title={categoryData.title} 
        subtitle="Experience"
        images={packages.map((p: any) => {
          if (p.images) {
            try {
              const parsed = JSON.parse(p.images);
              if (parsed.length > 0) return parsed[0];
            } catch (e) {}
          }
          return p.banner || p.thumbnail || null;
        }).filter(Boolean) as string[]} 
      />

      {/* Places Listing Section */}
      <AnimatedSection className="container-shell py-16 lg:py-24">
        <div className="mb-12">
          <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
            Available Destinations
          </h2>
          <p className="mt-4 text-white/60">
            {categoryData.description || "Select a destination to explore detailed itineraries and booking information."}
          </p>
        </div>

        {packages && packages.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((place: any) => {
              let images = [];
              try {
                if (place.images) images = JSON.parse(place.images);
                else if (place.gallery) images = JSON.parse(place.gallery);
              } catch (e) {}
              const displayImage = images.length > 0 ? images[0] : (place.banner || place.thumbnail || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80");
              return (
              <Link 
                key={place.slug} 
                href={`/programs/${categoryData.slug}/${place.slug}`}
                className="group cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/50 transition-all duration-[800ms] hover:-translate-y-2 hover:border-white/30 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-amber-900/20 block"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={typeof displayImage === 'string' && displayImage.trim() !== "" ? displayImage : "/placeholder.svg"}
                    alt={place.title}
                    fill
                    className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.12]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-slate-950/0 transition-colors duration-500 ease-out group-hover:bg-slate-950/60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90" />
                  
                  {/* Difficulty Badge */}
                  {place.difficulty && (
                    <div className="absolute right-5 top-5 z-10">
                      <span className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider backdrop-blur-md ${
                        place.difficulty.toLowerCase() === 'easy' ? 'bg-emerald-500/30 text-emerald-100 border border-emerald-500/30' :
                        place.difficulty.toLowerCase() === 'moderate' ? 'bg-amber-500/30 text-amber-100 border border-amber-500/30' :
                        place.difficulty.toLowerCase() === 'challenging' ? 'bg-orange-500/30 text-orange-100 border border-orange-500/30' :
                        'bg-red-500/30 text-red-100 border border-red-500/30'
                      }`}>
                        {place.difficulty}
                      </span>
                    </div>
                  )}
                  
                  <div className="absolute inset-x-0 bottom-0 p-6 transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] translate-y-6 group-hover:translate-y-0">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-300 drop-shadow-md">
                      {place.duration ? `${place.duration} • ` : ''}{place.location}
                    </p>
                    <h3 className="font-serif text-3xl font-medium tracking-wide text-white drop-shadow-lg">
                      {place.title}
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-5 p-6 pt-5">
                  <p className="text-sm leading-relaxed text-white/70 line-clamp-3">
                    {place.overview || place.description}
                  </p>
                  <div className="flex gap-4 pt-2">
                    <span className="flex-1 inline-flex items-center justify-center rounded-full border border-white/30 px-4 py-3 text-sm font-medium tracking-wide text-white transition-all duration-300 group-hover:border-white group-hover:bg-white/10">
                      Explore Place
                    </span>
                  </div>
                </div>
              </Link>
            )})}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
            <h3 className="font-serif text-2xl text-white">No destination data available.</h3>
          </div>
        )}
      </AnimatedSection>
    </main>
  );
}

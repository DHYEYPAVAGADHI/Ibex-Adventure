import { notFound } from "next/navigation";
import Image from "next/image";
import { Mountain, Clock, MapPin, BarChart3, Sun } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { WhatsappButton } from "@/components/whatsapp-button";
import { getContactInfo } from "@/lib/data/contact";
import { buildProgramInquiry, buildTelLink } from "@/lib/contact";
import { prisma } from "@/lib/prisma";

import { DestinationMemories } from "@/components/destination-memories";

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  
  const pkg = await prisma.package.findUnique({
    where: { slug }
  });

  if (!pkg || pkg.categorySlug !== category.toLowerCase()) return { title: "Not Found" };
  return {
    title: `${pkg.title} | Ibex Adventure`,
    description: (pkg.overview || pkg.description)?.substring(0, 160) || "Explore with Ibex Adventure.",
  };
}

export default async function PackagePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { phone } = await getContactInfo();
  const { category, slug } = await params;
  
  const pkg = await prisma.package.findUnique({
    where: { slug }
  });

  if (pkg && pkg.categorySlug !== category.toLowerCase()) {
    notFound();
  }

  if (!pkg) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif mb-4">No destination data available.</h1>
          <p className="text-white/60">We could not load the details for this destination.</p>
        </div>
      </main>
    );
  }

  // Safely parse JSON string fields from Prisma
  const safeParse = (data: any, fallback: any = []) => {
    if (!data) return fallback;
    if (typeof data !== 'string') return data;
    try {
      return JSON.parse(data);
    } catch (e) {
      return fallback;
    }
  };

  const highlights = safeParse(pkg.highlights);
  const itinerary = safeParse(pkg.itinerary);
  const inclusions = safeParse(pkg.inclusions);
  const exclusions = safeParse(pkg.exclusions);
  const faqs = safeParse(pkg.faqs);
  
  let images = [];
  const parsedGallery = safeParse(pkg.gallery);
  const parsedImages = safeParse(pkg.images);

  if (Array.isArray(parsedGallery) && parsedGallery.length > 0) images = parsedGallery;
  else if (pkg.banner) images = [pkg.banner];
  else if (pkg.thumbnail) images = [pkg.thumbnail];
  else if (Array.isArray(parsedImages) && parsedImages.length > 0) images = parsedImages;

  const heroImage = images.length > 0 ? images[0] : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80";
  // Normalise overview vs description fields from tours.json vs fallback
  const overviewText = pkg.overview || pkg.description;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex flex-col items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src={typeof heroImage === 'string' && heroImage.trim() !== "" ? heroImage : "/placeholder.svg"}
            alt={pkg.title}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold mb-4 capitalize">
            {pkg.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">{pkg.title}</h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base text-white/90">
            {pkg.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>{pkg.location}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trek Information Bar */}
      <section className="border-y border-white/10 bg-slate-900/50 sticky top-16 z-30 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4 md:gap-8">
            {pkg.duration && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400"><Clock className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Duration</p>
                  <p className="font-medium text-white">{pkg.duration}</p>
                </div>
              </div>
            )}
            {pkg.difficulty && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400"><BarChart3 className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Difficulty</p>
                  <p className="font-medium text-white capitalize">{pkg.difficulty}</p>
                </div>
              </div>
            )}
            {pkg.altitude && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400"><Mountain className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Altitude</p>
                  <p className="font-medium text-white">{pkg.altitude}</p>
                </div>
              </div>
            )}
            {pkg.season && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400"><Sun className="w-5 h-5" /></div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider">Best Season</p>
                  <p className="font-medium text-white">{pkg.season}</p>
                </div>
              </div>
            )}
            <div className="ml-auto">
              <WhatsappButton
                href={buildProgramInquiry(phone, pkg.title, `Hello Ibex Adventure,\n\nI am interested in ${pkg.title}.\n\nPlease share complete details.`)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all"
              >
                Enquire Now
              </WhatsappButton>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2 space-y-16">
            {/* Overview */}
            {overviewText && (
              <section>
                <SectionHeading title="Overview" />
                <div className="prose prose-invert prose-amber max-w-none text-white/80 leading-relaxed mt-6 whitespace-pre-wrap">
                  {overviewText}
                </div>
              </section>
            )}

            {/* Description */}
            {pkg.description && (
              <section>
                <SectionHeading title="About the Journey" />
                <div className="prose prose-invert prose-amber max-w-none text-white/80 leading-relaxed mt-6 whitespace-pre-wrap">
                  {pkg.description}
                </div>
              </section>
            )}

            {/* Highlights */}
            {highlights && highlights.length > 0 && (
              <section>
                <SectionHeading title="Highlights" />
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {highlights.map((highlight: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-xl border border-white/5">
                      <div className="mt-1 w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                      <span className="text-white/80">{highlight.trim().replace(/^[•\-\*]\s*/, '')}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Itinerary */}
            {itinerary && itinerary.length > 0 && (
              <section>
                <SectionHeading title="Itinerary" />
                <div className="space-y-6 mt-6">
                  {itinerary.map((day: any, idx: number) => {
                    let title = `Day ${idx + 1}`;
                    let content = "";
                    let meals = "";
                    let stay = "";
                    
                    if (typeof day === "string") {
                      const match = day.match(/^(Day\s*\d+)[\s:-]*(.*)/i);
                      title = match ? match[1] : `Day ${idx + 1}`;
                      content = match ? match[2] : day;
                    } else if (typeof day === "object" && day !== null) {
                      title = day.day ? `${day.day}${day.title ? ` - ${day.title}` : ""}` : (day.title || `Day ${idx + 1}`);
                      content = day.description || "";
                      meals = day.meals || "";
                      stay = day.stay || "";
                    }

                    return (
                      <div key={idx} className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
                        <div className="bg-slate-800/50 px-6 py-4 border-b border-white/5">
                          <h3 className="font-bold text-amber-400">{title}</h3>
                        </div>
                        <div className="px-6 py-4 text-white/80 whitespace-pre-wrap leading-relaxed">
                          {content}
                          {(meals || stay) && (
                            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-4 text-sm text-white/60">
                              {meals && <div><strong>Meals:</strong> {meals}</div>}
                              {stay && <div><strong>Stay:</strong> {stay}</div>}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Included & Excluded */}
            {((pkg.inclusions && pkg.inclusions !== "[]") || (pkg.exclusions && pkg.exclusions !== "[]")) && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pkg.inclusions && pkg.inclusions !== "[]" && (
                  <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                    <h3 className="font-serif text-xl font-medium text-white mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">✓</span>
                      What&apos;s Included
                    </h3>
                    <ul className="space-y-3">
                      {inclusions.map((item: string, idx: number) => (
                        <li key={idx} className="text-white/70 text-sm flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {pkg.exclusions && pkg.exclusions !== "[]" && (
                  <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                    <h3 className="font-serif text-xl font-medium text-white mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-sm">×</span>
                      What&apos;s Excluded
                    </h3>
                    <ul className="space-y-3">
                      {exclusions.map((item: string, idx: number) => (
                        <li key={idx} className="text-white/70 text-sm flex items-start gap-2">
                          <span className="text-red-400 mt-0.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* FAQs */}
            {pkg.faqs && pkg.faqs !== "[]" && (
              <section>
                <SectionHeading title="Frequently Asked Questions" />
                <div className="space-y-4 mt-6">
                  {faqs.map((faq: any, idx: number) => (
                    <details key={idx} className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden group">
                      <summary className="px-6 py-4 font-bold text-white cursor-pointer select-none outline-none group-open:text-amber-400 group-open:bg-slate-800/50 transition-colors">
                        {faq.question}
                      </summary>
                      <div className="px-6 py-4 text-white/70 whitespace-pre-wrap leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Additional Notes */}
            {pkg.additionalNotes && (
              <section>
                <SectionHeading title="Important Information" />
                <div className="bg-amber-900/10 border border-amber-500/20 rounded-xl p-6 mt-6">
                  <div className="prose prose-invert max-w-none text-white/80 whitespace-pre-wrap">
                    {pkg.additionalNotes}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-40 bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4">Ready for the adventure?</h3>
              <p className="text-white/60 mb-6 text-sm">Contact our travel experts to get a detailed quote and customize your trip.</p>
              <WhatsappButton
                href={buildProgramInquiry(phone, pkg.title, `Hello Ibex Adventure,\n\nI am interested in ${pkg.title}.\n\nPlease share complete details.`)}
                className="w-full justify-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20"
              >
                Book This Package
              </WhatsappButton>
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-sm text-white/50">Need Help?</p>
                <a href={buildTelLink(phone)} className="text-amber-400 font-medium hover:underline mt-1 block">
                  Call Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DestinationMemories destination={pkg.slug} category={pkg.categorySlug} />
    </main>
  );
}

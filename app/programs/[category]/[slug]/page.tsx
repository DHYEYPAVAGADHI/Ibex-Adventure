import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Mountain,
  Clock,
  MapPin,
  BarChart3,
  Sun,
  ChevronRight,
  Check,
  X,
} from "lucide-react";
import { WhatsappButton } from "@/components/whatsapp-button";
import { getContactInfo } from "@/lib/data/contact";
import { buildProgramInquiry, buildTelLink } from "@/lib/contact";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const pkg = await prisma.package.findUnique({ where: { slug } });
  if (!pkg || pkg.categorySlug !== category.toLowerCase())
    return { title: "Not Found" };
  return {
    title: `${pkg.title} | Ibex Adventure`,
    description:
      (pkg.overview || pkg.description)?.substring(0, 160) ||
      "Explore with Ibex Adventure.",
  };
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { phone } = await getContactInfo();
  const { category, slug } = await params;

  const pkg = await prisma.package.findUnique({ where: { slug } });

  if (pkg && pkg.categorySlug !== category.toLowerCase()) notFound();
  if (!pkg) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FCF9F2" }}>
        <div className="text-center">
          <h1 className="font-serif text-3xl text-[#1C1C18] mb-4">
            Program not found.
          </h1>
          <Link href="/#programs" className="text-sm font-semibold text-[#172C21] underline underline-offset-4">
            Browse all programs
          </Link>
        </div>
      </main>
    );
  }

  const safeParse = (data: unknown, fallback: unknown = []) => {
    if (!data) return fallback;
    if (typeof data !== "string") return data;
    try { return JSON.parse(data); } catch { return fallback; }
  };

  const highlights = safeParse(pkg.highlights) as string[];
  const itinerary = safeParse(pkg.itinerary) as unknown[];
  const inclusions = safeParse(pkg.inclusions) as string[];
  const exclusions = safeParse(pkg.exclusions) as string[];
  const faqs = safeParse(pkg.faqs) as { question: string; answer: string }[];

  let images: string[] = [];
  const parsedGallery = safeParse(pkg.gallery) as string[];
  const parsedImages = safeParse(pkg.images) as string[];
  if (Array.isArray(parsedGallery) && parsedGallery.length > 0) images = parsedGallery;
  else if (pkg.banner) images = [pkg.banner];
  else if (pkg.thumbnail) images = [pkg.thumbnail];
  else if (Array.isArray(parsedImages) && parsedImages.length > 0) images = parsedImages;

  const heroImage =
    images.length > 0
      ? images[0]
      : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80";

  const overviewText = pkg.overview || pkg.description;
  const enquireHref = buildProgramInquiry(
    phone,
    pkg.title,
    `Hello Ibex Adventure,\n\nI am interested in ${pkg.title}.\n\nPlease share complete details.`
  );

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FCF9F2" }}>
      <Navbar />

      {/* ── Cinematic Hero ── */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src={typeof heroImage === "string" && heroImage.trim() ? heroImage : "/placeholder.svg"}
          alt={pkg.title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#172C21]/85 via-[#172C21]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#172C21]/60 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-16 md:px-16">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-xs" aria-label="Breadcrumb">
            <Link href="/" className="text-white/45 hover:text-white/70 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-white/25" />
            <Link
              href={`/programs/${category}`}
              className="text-white/45 hover:text-white/70 transition-colors capitalize"
            >
              {category}
            </Link>
            <ChevronRight className="h-3 w-3 text-white/25" />
            <span className="text-[#D4AF37] line-clamp-1">{pkg.title}</span>
          </nav>

          {/* Category eyebrow */}
          <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#D4AF37] capitalize">
            {pkg.category}
          </p>

          <h1 className="font-serif text-4xl font-normal text-white md:text-6xl lg:text-7xl">
            {pkg.title}
          </h1>

          {/* Quick pills */}
          <div className="mt-5 flex flex-wrap gap-3">
            {pkg.location && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                <MapPin className="h-3 w-3 text-[#D4AF37]" />
                {pkg.location}
              </span>
            )}
            {pkg.duration && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                <Clock className="h-3 w-3 text-[#D4AF37]" />
                {pkg.duration}
              </span>
            )}
            {pkg.difficulty && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm capitalize">
                <BarChart3 className="h-3 w-3 text-[#D4AF37]" />
                {pkg.difficulty}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Sticky info bar ── */}
      <div
        className="sticky top-0 z-30 border-b"
        style={{
          backgroundColor: "#FCF9F2",
          borderColor: "#C2C8C2",
        }}
      >
        <div className="container-shell flex flex-wrap items-center justify-between gap-4 py-3">
          <div className="flex flex-wrap gap-5">
            {pkg.duration && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-[#172C21]" />
                <span className="text-[#424844]">{pkg.duration}</span>
              </div>
            )}
            {pkg.altitude && (
              <div className="flex items-center gap-2 text-sm">
                <Mountain className="h-4 w-4 text-[#172C21]" />
                <span className="text-[#424844]">{pkg.altitude}</span>
              </div>
            )}
            {pkg.season && (
              <div className="flex items-center gap-2 text-sm">
                <Sun className="h-4 w-4 text-[#172C21]" />
                <span className="text-[#424844]">{pkg.season}</span>
              </div>
            )}
          </div>
          <a
            href={enquireHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#172C21] px-6 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#2D4236]"
          >
            Enquire Now
          </a>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container-shell py-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_380px]">
          {/* Left — main editorial content */}
          <div className="space-y-16">
            {/* Overview */}
            {overviewText && (
              <section>
                <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#172C21]">
                  Overview
                </p>
                <div className="h-px bg-[#C2C8C2] mb-8" />
                <div className="font-light leading-8 text-[#424844] whitespace-pre-wrap text-base">
                  {overviewText}
                </div>
              </section>
            )}

            {/* Highlights */}
            {highlights.length > 0 && (
              <section>
                <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#172C21]">
                  Highlights
                </p>
                <div className="h-px bg-[#C2C8C2] mb-8" />
                <ul className="grid gap-3 sm:grid-cols-2">
                  {highlights.map((highlight: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 border-l-2 border-[#D4AF37]/40 pl-4 py-1"
                    >
                      <span className="text-sm font-light text-[#424844] leading-6">
                        {highlight.trim().replace(/^[•\-\*]\s*/, "")}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Itinerary */}
            {itinerary.length > 0 && (
              <section>
                <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#172C21]">
                  Itinerary
                </p>
                <div className="h-px bg-[#C2C8C2] mb-8" />
                <div className="relative space-y-0">
                  {/* Vertical timeline line */}
                  <div
                    className="absolute left-3.5 top-0 bottom-0 w-px"
                    style={{ backgroundColor: "#C2C8C2" }}
                  />
                  {itinerary.map((day: unknown, idx: number) => {
                    let title = `Day ${idx + 1}`;
                    let content = "";
                    let meals = "";
                    let stay = "";

                    if (typeof day === "string") {
                      const match = day.match(/^(Day\s*\d+)[\s:-]*(.*)/i);
                      title = match ? match[1] : `Day ${idx + 1}`;
                      content = match ? match[2] : day;
                    } else if (day && typeof day === "object" && day !== null) {
                      const d = day as Record<string, string>;
                      title = d.day
                        ? `${d.day}${d.title ? ` — ${d.title}` : ""}`
                        : d.title || `Day ${idx + 1}`;
                      content = d.description || "";
                      meals = d.meals || "";
                      stay = d.stay || "";
                    }

                    return (
                      <div key={idx} className="relative pl-10 pb-8">
                        {/* Gold dot */}
                        <div
                          className="absolute left-0 top-1.5 h-7 w-7 rounded-full border-2 flex items-center justify-center text-[0.55rem] font-bold"
                          style={{
                            borderColor: "#D4AF37",
                            backgroundColor: "#FCF9F2",
                            color: "#172C21",
                          }}
                        >
                          {idx + 1}
                        </div>

                        <h3 className="font-semibold text-[#172C21] text-sm uppercase tracking-wide mb-2">
                          {title}
                        </h3>
                        <p className="text-sm font-light leading-7 text-[#424844] whitespace-pre-wrap">
                          {content}
                        </p>
                        {(meals || stay) && (
                          <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#424844]/60">
                            {meals && (
                              <span>
                                <strong className="text-[#172C21]">Meals:</strong> {meals}
                              </span>
                            )}
                            {stay && (
                              <span>
                                <strong className="text-[#172C21]">Stay:</strong> {stay}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Inclusions & Exclusions */}
            {(inclusions.length > 0 || exclusions.length > 0) && (
              <section>
                <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#172C21]">
                  What&apos;s Included
                </p>
                <div className="h-px bg-[#C2C8C2] mb-8" />
                <div className="grid gap-8 md:grid-cols-2">
                  {inclusions.length > 0 && (
                    <div>
                      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#172C21]">
                        <Check className="h-4 w-4 text-emerald-600" />
                        Included
                      </h3>
                      <ul className="space-y-2">
                        {inclusions.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm font-light text-[#424844]">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {exclusions.length > 0 && (
                    <div>
                      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#172C21]">
                        <X className="h-4 w-4 text-red-500" />
                        Not Included
                      </h3>
                      <ul className="space-y-2">
                        {exclusions.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-sm font-light text-[#424844]">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* FAQs */}
            {faqs.length > 0 && (
              <section>
                <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#172C21]">
                  FAQs
                </p>
                <div className="h-px bg-[#C2C8C2] mb-8" />
                <div className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group border border-[#C2C8C2] overflow-hidden"
                      style={{ borderRadius: "2px" }}
                    >
                      <summary className="flex cursor-pointer select-none items-center justify-between px-6 py-4 text-sm font-medium text-[#1C1C18] hover:bg-[#F4EFE3] transition-colors list-none">
                        {faq.question}
                        <span className="ml-4 text-[#172C21] group-open:hidden">+</span>
                        <span className="ml-4 text-[#172C21] hidden group-open:block">−</span>
                      </summary>
                      <div className="border-t border-[#C2C8C2] px-6 py-4 text-sm font-light leading-7 text-[#424844]">
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
                <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#172C21]">
                  Important Information
                </p>
                <div className="h-px bg-[#C2C8C2] mb-8" />
                <div
                  className="border-l-4 border-[#D4AF37] pl-6 py-2 text-sm font-light leading-7 text-[#424844] whitespace-pre-wrap"
                >
                  {pkg.additionalNotes}
                </div>
              </section>
            )}
          </div>

          {/* Right — sticky sidebar */}
          <div>
            <div
              className="sticky top-20 border border-[#C2C8C2] p-6"
              style={{ borderRadius: "2px" }}
            >
              <h3 className="font-serif text-2xl text-[#1C1C18] mb-2">
                Ready to explore?
              </h3>
              <p className="text-sm font-light text-[#424844]/70 mb-6">
                Contact our team for a detailed quote and personalised itinerary.
              </p>

              <a
                href={enquireHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center rounded-full bg-[#172C21] px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-[#2D4236] hover:shadow-lg"
              >
                Book via WhatsApp
              </a>

              <div className="mt-4 border-t border-[#C2C8C2] pt-4 text-center">
                <a
                  href={buildTelLink(phone)}
                  className="text-sm font-medium text-[#172C21] hover:underline"
                >
                  Or call us directly →
                </a>
              </div>

              {/* Quick facts */}
              {(pkg.duration || pkg.difficulty || pkg.altitude || pkg.season) && (
                <div className="mt-6 border-t border-[#C2C8C2] pt-6 space-y-3">
                  {pkg.duration && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#424844]/60">Duration</span>
                      <span className="font-medium text-[#1C1C18]">{pkg.duration}</span>
                    </div>
                  )}
                  {pkg.difficulty && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#424844]/60">Difficulty</span>
                      <span className="font-medium text-[#1C1C18] capitalize">{pkg.difficulty}</span>
                    </div>
                  )}
                  {pkg.altitude && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#424844]/60">Altitude</span>
                      <span className="font-medium text-[#1C1C18]">{pkg.altitude}</span>
                    </div>
                  )}
                  {pkg.season && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#424844]/60">Best Season</span>
                      <span className="font-medium text-[#1C1C18]">{pkg.season}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

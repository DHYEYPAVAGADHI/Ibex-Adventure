import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Mountain,
  Clock,
  MapPin,
  Users,
  Calendar,
  Check,
  X,
  Star,
  Heart,
  Info,
  Play,
  ArrowRight,
  Map,
  Tent,
  Coffee,
  Waves,
  FileText,
  MessageSquare,
  HelpCircle,
  Image as ImageIcon,
  Plane,
  Car,
  Landmark,
  Shield,
  Phone,
  Mail,
  Headset
} from "lucide-react";
import { getContactInfo } from "@/lib/data/contact";
import { buildProgramInquiry, buildTelLink } from "@/lib/contact";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await prisma.package.findUnique({ where: { slug } });
  if (!pkg) return { title: "Not Found" };
  return {
    title: pkg.title,
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
  const { phone, email } = await getContactInfo();
  const { category, slug } = await params;

  const pkg = await prisma.package.findUnique({ where: { slug } });

  if (!pkg) notFound();

  // Canonicalise the URL: /journeys/<anything>/<slug> -> /journeys/<real category>/<slug>
  if (pkg.categorySlug && category.toLowerCase() !== pkg.categorySlug.toLowerCase()) {
    redirect(`/journeys/${pkg.categorySlug}/${slug}`);
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
      : "https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?auto=format&fit=crop&w=1920&q=80";

  const enquireHref = buildProgramInquiry(
    phone,
    pkg.title,
    `Hello Ibex Adventure,\n\nI am interested in ${pkg.title}.\n\nPlease share complete details.`
  );

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ── Cinematic Hero ── */}
      <section className="relative h-[75vh] min-h-[600px] flex flex-col justify-end">
        <div className="absolute inset-0 z-0">
          <Image
            src={typeof heroImage === "string" && heroImage.trim() ? heroImage : "/placeholder.svg"}
            alt={pkg.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 container-shell max-w-[1400px] mx-auto w-full px-6 lg:px-8 pb-12">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-end">
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs font-medium text-white/70 mb-6">
                <Link href="/" className="hover:text-white">Home</Link>
                <span>›</span>
                <Link href="/journeys" className="hover:text-white">Journeys</Link>
                <span>›</span>
                <span className="text-white">{pkg.title}</span>
              </div>

              <h1 className="font-sans text-6xl md:text-8xl lg:text-[110px] font-black uppercase tracking-tight text-white leading-[0.85] mb-4 drop-shadow-xl">
                {pkg.title}
              </h1>
              
              <h2 className="font-sans text-xl md:text-2xl font-bold uppercase text-white tracking-wide mb-6">{pkg.shortDescription || "EXPERIENCE THE LAND BEYOND THE ROAD."}</h2>
              
              <p className="text-white/90 text-sm md:text-base font-semibold leading-relaxed max-w-xl mb-4 whitespace-pre-line">{pkg.overview || "High passes. Ancient monasteries. Stark beauty.\nWarm people. Raw adventures."}</p>
              
              <p className="font-serif text-xl italic text-[var(--color-lime)] mb-12">
                A journey that stays with you forever.
              </p>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-8 md:gap-12">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-white" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white uppercase leading-tight">{pkg.duration || "7N / 8D"}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Duration</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-white" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white uppercase leading-tight">{pkg.location || "Leh"}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Starting Point</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mountain className="w-6 h-6 text-white" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white uppercase leading-tight">{pkg.difficulty || "High"}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Adventure Level</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-white" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white uppercase leading-tight">{pkg.ageGroupMin ? `${pkg.ageGroupMin}+` : "18+"}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Age Group</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-white" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white uppercase leading-tight">{pkg.season || "May - Sep"}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Best Time</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty div for layout spacing because the pricing card will overlap here */}
            <div className="hidden lg:block h-32"></div>
          </div>
        </div>
      </section>

      {/* ── Sticky Nav & Pricing Container ── */}
      <div className="relative">
        <div className="sticky top-0 z-40 bg-white border-b border-[var(--color-hair)] shadow-sm">
          <div className="container-shell max-w-[1400px] mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_380px] gap-8">
              {/* Nav */}
              <nav className="flex overflow-x-auto hide-scrollbar py-2">
                {[
                  { name: 'Overview', icon: <FileText className="w-4 h-4" /> },
                  { name: 'Itinerary', icon: <Calendar className="w-4 h-4" /> },
                  { name: 'Inclusions', icon: <Check className="w-4 h-4 text-[var(--color-moss)]" /> },
                  { name: 'Exclusions', icon: <X className="w-4 h-4 text-red-500" /> },
                  { name: 'Gallery', icon: <ImageIcon className="w-4 h-4" /> },
                  { name: 'Reviews', icon: <MessageSquare className="w-4 h-4" /> },
                  { name: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> }
                ].map((item, i) => (
                  <a
                    key={i}
                    href={`#${item.name.toLowerCase()}`}
                    className={`flex items-center gap-2 flex-shrink-0 px-6 py-4 text-[11px] font-bold uppercase tracking-widest border-b-2 transition-colors ${i === 0 ? 'border-[var(--color-moss)] text-[var(--color-moss)]' : 'border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'}`}
                  >
                    {item.icon}
                    {item.name}
                  </a>
                ))}
              </nav>

              {/* Pricing Card Desktop (Sticky overlap) */}
              <div className="hidden lg:block relative z-50">
                <div className="absolute top-[-240px] left-0 w-full bg-white rounded-xl shadow-[0_15px_50px_-12px_rgba(0,0,0,0.25)] border border-[var(--color-hair)] p-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-ink-muted)]">From</span>
                  <div className="flex items-end gap-2 mb-1">
                    <h3 className="font-sans text-4xl font-black text-[var(--color-ink)] tracking-tight">
                      {pkg.price ? `₹${pkg.price}` : "₹18,999"}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-[var(--color-ink-muted)] mb-4 block">per person</span>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-[var(--color-gold-star)]">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current text-gray-300" />
                    </div>
                    <span className="text-sm font-bold text-[var(--color-ink)]">4.8</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-ink-muted)]">(245 Reviews)</span>
                  </div>
                  
                  <div className="space-y-3">
                    <a
                      href={enquireHref}
                      className="w-full flex items-center justify-center rounded bg-[var(--color-moss-dark)] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#3A4F27]"
                    >
                      ENQUIRE NOW
                    </a>
                    <a
                      href={buildTelLink(phone)}
                      className="w-full flex items-center justify-center rounded border border-[var(--color-hair)] px-6 py-4 text-xs font-bold uppercase tracking-widest text-[var(--color-ink)] transition-all hover:bg-gray-50"
                    >
                      WHATSAPP US
                    </a>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[var(--color-hair)] flex justify-center">
                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">
                      <Heart className="w-4 h-4" /> SAVE THIS JOURNEY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container-shell max-w-[1400px] mx-auto py-16 px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          
          {/* Left Column (Content) */}
          <div className="space-y-24">
            
            {/* Overview */}
            <section id="overview" className="scroll-mt-32">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-muted)] mb-3">OVERVIEW</h4>
              <div className="grid md:grid-cols-[1fr_320px] gap-12">
                <div>
                  <h2 className="font-sans text-3xl font-black text-[var(--color-ink)] mb-6">{pkg.shortDescription || "Ladakh is not a place, it's an emotion."}</h2>
                  <div className="text-[15px] font-medium leading-relaxed text-[var(--color-ink-muted)] space-y-4 mb-8">
                    {pkg.description ? (
                      <div dangerouslySetInnerHTML={{ __html: pkg.description }} />
                    ) : (
                      <>
                        <p>
                          From the thrill of riding through the world's highest motorable passes to the
                          serenity of ancient monasteries, from starry nights in camps to heartfelt
                          conversations with locals - Ladakh changes you.
                        </p>
                        <p>
                          This is more than a trip. It's an experience.
                        </p>
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(safeParse(pkg.tags, ['Adventure', 'Culture', 'Mountains', 'Monasteries', 'Local Life']) as string[]).map((tag) => (
                      <span key={tag} className="px-4 py-2 rounded-full border border-[var(--color-hair)] text-[11px] font-bold uppercase tracking-widest text-[var(--color-ink-muted)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-muted)] mb-6">JOURNEY HIGHLIGHTS</h4>
                  <ul className="space-y-6">
                    {(highlights.length > 0 ? highlights : [
                      "Ride through Khardung La - one of the world's highest motorable passes.",
                      "Visit breathtaking lakes - Pangong Tso, Tso Moriri & more.",
                      "Explore ancient monasteries and learn Buddhist culture.",
                      "Experience local life, food and warm hospitality.",
                      "Camp under a sky full of stars.",
                      "Build resilience, leadership and lifelong memories."
                    ]).map((item: any, i: number) => {
                      const text = typeof item === 'string' ? item : item.text;
                      return (
                        <li key={i} className="flex gap-4">
                          <div className="shrink-0 mt-0.5"><Check className="w-5 h-5 text-[var(--color-lime)]" /></div>
                          <span className="text-[13px] font-semibold text-[var(--color-ink)] leading-snug">{text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </section>

            {/* Itinerary */}
            <section id="itinerary" className="scroll-mt-32">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-muted)] mb-8">ITINERARY</h4>
              
              <div className="w-full overflow-x-auto hide-scrollbar pb-6">
                <div className="flex min-w-max relative pt-6">
                  {/* Connecting Line */}
                  <div className="absolute top-11 left-0 right-0 h-px bg-[#ddd] z-0" />
                  
                  {(itinerary.length > 0 ? itinerary : [
                    { day: "1", title: "Arrival in Leh", bullets: ["Arrive in Leh", "Acclimatization", "Leh local market", "Overnight in Leh"] },
                    { day: "2", title: "Leh Sightseeing", bullets: ["Thiksey Monastery", "Shey Palace", "Shanti Stupa", "Overnight in Leh"] },
                    { day: "3", title: "Leh to Nubra Valley", bullets: ["Khardung La Pass", "Diskit Monastery", "Hunder Sand Dunes", "Overnight in Nubra"] },
                    { day: "4", title: "Nubra to Pangong", bullets: ["Agham - Shyok route", "Pangong Tso Lake", "Sunset by the lake", "Overnight in Camps"] },
                    { day: "5", title: "Pangong to Tso Moriri", bullets: ["Chang La Pass", "Tso Moriri Lake", "Scenic drives", "Overnight in Camps"] },
                    { day: "6", title: "Tso Moriri to Leh", bullets: ["Scenic route via Mahe", "Explore enroute", "Overnight in Leh"] },
                    { day: "7", title: "Leh - Local Experience", bullets: ["Village visit", "Local interactions", "Learning & sharing", "Overnight in Leh"] },
                    { day: "8", title: "Departure", bullets: ["Check-out", "Drop at airport", "Journey back with memories"] }
                  ]).map((node: any, i: number) => (
                    <div key={i} className="flex flex-col items-center w-[160px] relative z-10 px-2">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-[var(--color-moss)] flex items-center justify-center mb-4">
                        <MapPin className="w-4 h-4 text-[var(--color-moss)]" />
                      </div>
                      <div className="text-center mb-4">
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-muted)] mb-1">DAY {node.day}</span>
                        <span className="block text-xs font-bold text-[var(--color-ink)] leading-tight px-2">{node.title}</span>
                      </div>
                      <ul className="text-[11px] text-[var(--color-ink-muted)] font-medium leading-relaxed text-center space-y-1">
                        {(node.bullets || []).map((b: string, idx: number) => <li key={idx}>• {b}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button className="inline-flex items-center gap-2 rounded border border-[var(--color-hair)] bg-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink)] transition-colors hover:bg-gray-50">
                  DETAILED DAY WISE ITINERARY
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </section>

            {/* Trip Specs (Inclusions, Exclusions, Info, Video) */}
            <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Inclusions */}
              <div id="inclusions" className="bg-[var(--color-sand)] p-6 rounded-xl scroll-mt-32">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink)] mb-6">INCLUSIONS</h4>
                <ul className="space-y-3">
                  {(inclusions.length > 0 ? inclusions : [
                    "Accommodation (Hotel/Camps)",
                    "All meals (Veg + Egg)",
                    "Transportation (Leh to Leh)",
                    "Inner line permits",
                    "Sightseeing & entry fees",
                    "Experienced trip leader",
                    "Basic first aid",
                    "IBEX trip Tshirt & cap"
                  ]).map((item: any, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] font-semibold text-[var(--color-ink-muted)]">
                      <Check className="h-3.5 w-3.5 text-[var(--color-moss)] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div id="exclusions" className="bg-[#FFF5F2] p-6 rounded-xl scroll-mt-32">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink)] mb-6">EXCLUSIONS</h4>
                <ul className="space-y-3">
                  {(exclusions.length > 0 ? exclusions : [
                    "Travel to Leh & return",
                    "Lunch on Day 1",
                    "Personal expenses",
                    "Any adventure activities",
                    "Anything not mentioned in inclusions"
                  ]).map((item: any, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-[11px] font-semibold text-[var(--color-ink-muted)]">
                      <X className="h-3.5 w-3.5 text-[#D35400] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trip Info */}
              <div className="bg-white border border-[var(--color-hair)] p-6 rounded-xl">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink)] mb-6">TRIP INFORMATION</h4>
                <div className="space-y-4">
                  {[
                    { label: "Start Point", val: pkg.meetingPoint || pkg.location || "Leh" },
                    { label: "End Point", val: pkg.location || "Leh" },
                    { label: "Trip Type", val: "Group Journey" },
                    { label: "Group Size", val: pkg.maxGroupSize ? `Upto ${pkg.maxGroupSize} People` : "15 - 30 People" },
                    { label: "Age Group", val: pkg.ageGroupMin ? `${pkg.ageGroupMin}+ Years` : "18+" },
                    { label: "Difficulty Level", val: pkg.difficulty || "High" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center pb-2 border-b border-[var(--color-hair)] last:border-0 last:pb-0">
                      <span className="text-[11px] text-[var(--color-ink-muted)] font-medium">{item.label}</span>
                      <span className="text-[11px] text-[var(--color-ink)] font-bold">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video */}
              <div className="relative rounded-xl overflow-hidden group">
                <Image src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80" alt="Video cover" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3">
                    <Play className="w-5 h-5 text-black ml-1" fill="currentColor" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">WATCH TRIP VIDEO</span>
                </div>
              </div>

            </section>

            {/* Gallery */}
            <section id="gallery" className="scroll-mt-32">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-muted)] mb-6">GLIMPSES FROM LADAKH</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(images.length > 0 ? images.slice(0,4) : [1, 2, 3, 4].map(i => `https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?auto=format&fit=crop&w=400&q=80&sig=${i}`)).map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
                    <Image src={img} alt="Gallery" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <button className="inline-flex items-center gap-2 rounded border border-[var(--color-hair)] bg-white px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-[var(--color-ink)] transition-colors hover:bg-gray-50">
                  VIEW FULL GALLERY
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </section>

            {/* Safety */}
            <section className="bg-[#f4f7f4] rounded-2xl p-10 border border-[#e8efe8] flex flex-col md:flex-row gap-10 items-center justify-between">
              <div className="max-w-xl">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-muted)] mb-4">SAFETY & RESPONSIBLE TRAVEL</h4>
                <p className="text-[14px] font-semibold text-[var(--color-ink)] mb-8 leading-relaxed">
                  Your safety is our top priority. We follow strict safety standards, work with verified partners and promote responsible travel.
                </p>
                <div className="flex flex-wrap gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="w-6 h-6 text-[var(--color-moss)]" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-ink)] text-center">Trained<br/>Leaders</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Check className="w-6 h-6 text-[var(--color-moss)]" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-ink)] text-center">Verified<br/>Vendors</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <MapPin className="w-6 h-6 text-[var(--color-moss)]" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-ink)] text-center">Medical<br/>Preparedness</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Heart className="w-6 h-6 text-[var(--color-moss)]" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--color-ink)] text-center">Sustainable<br/>Travel</span>
                  </div>
                </div>
              </div>
              <div>
                <button className="inline-flex items-center gap-2 rounded border border-[var(--color-hair)] bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink)] transition-colors hover:bg-gray-50 whitespace-nowrap shadow-sm">
                  OUR SAFETY STANDARDS
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </section>

            {/* Reviews */}
            <section id="reviews" className="scroll-mt-32">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink-muted)] mb-6">WHAT TRAVELLERS SAY</h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { q: "Ladakh with IBEX was the experience of a lifetime. Everything was so well planned and executed.", name: "Rohit Sharma", loc: "Ahmedabad" },
                  { q: "From the landscapes to the people, everything was magical. Loved the team and the vibes!", name: "Khushi Patel", loc: "Vadodara" },
                  { q: "IBEX doesn't just take you places, they make you experience them.", name: "Niraj Shah", loc: "Surat" },
                  { q: "The best trip I've ever been on. Met amazing people and learned so much.", name: "Aditi Mehta", loc: "Mumbai" },
                ].map((item, i) => (
                  <div key={i} className="border border-[var(--color-hair)] rounded-xl p-6 bg-white shadow-sm flex flex-col justify-between">
                    <p className="text-[12px] font-medium text-[var(--color-ink)] mb-6 leading-relaxed">
                      "{item.q}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative">
                         <Image src={`https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80&sig=${i}`} alt="User" fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-ink)]">{item.name}</p>
                        <p className="text-[9px] text-[var(--color-ink-muted)]">{item.loc}</p>
                      </div>
                      <div className="ml-auto flex text-[var(--color-gold-star)]">
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <button className="inline-flex items-center gap-2 rounded border border-[var(--color-hair)] bg-white px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-[var(--color-ink)] transition-colors hover:bg-gray-50">
                  READ MORE REVIEWS
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </section>

          </div>
          
          {/* Right Column Spacer for mobile (Desktop uses absolute position for the pricing card) */}
          <div className="lg:hidden">
            {/* Mobile pricing card duplicate or just let them scroll down to CTA */}
          </div>
        </div>
      </div>

      {/* ── Final CTA ── */}
      <section className="relative h-[300px] flex items-center">
        <Image src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80" alt="Mountains" fill className="object-cover object-bottom" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container-shell max-w-[1400px] mx-auto px-6 lg:px-8">
          <p className="font-serif text-xl italic text-[#fff] mb-2">The mountains are calling.</p>
          <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-8">ARE YOU READY?</h2>
          <div className="flex gap-4">
            <a href={enquireHref} className="rounded bg-[var(--color-moss)] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-moss-dark)]">
              PLAN YOUR JOURNEY
              <ArrowRight className="inline ml-2 h-4 w-4" />
            </a>
            <a href={buildTelLink(phone)} className="rounded border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/20">
              <Phone className="inline mr-2 h-4 w-4" />
              WHATSAPP US
            </a>
          </div>
        </div>
      </section>

      {/* ── Mini Footer Bar ── */}
      <div className="bg-[#0f1712] py-4 text-white">
        <div className="container-shell max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-8 md:gap-16 items-center text-xs justify-center md:justify-start">
            <div className="flex items-center gap-3">
              <Headset className="w-5 h-5 text-[var(--color-lime)]" />
              <div>
                <p className="font-bold text-white/60">Need Help?</p>
                <p className="font-bold text-white">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[var(--color-lime)]" />
              <div>
                <p className="font-bold text-white/60">Talk to an Expert</p>
                <p className="font-bold text-white">Mon - Sat | 10 AM - 7 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[var(--color-lime)]" />
              <div>
                <p className="font-bold text-white/60">WhatsApp Us</p>
                <p className="font-bold text-white">Quick Response</p>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <Mail className="w-5 h-5 text-[var(--color-lime)]" />
              <div>
                <p className="font-bold text-white/60">Email Us</p>
                <p className="font-bold text-white">info@ibexadventure.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowRightCircle,
  Users,
  Compass,
  Target,
  HeartHandshake,
  ShieldCheck,
  Mountain,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { SafeImage } from "@/components/safe-image";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "For Corporates",
  description:
    "Team offsites, leadership journeys and incentive travel designed by Ibex Adventure — shared challenge that translates back to work.",
};

export const revalidate = 300;

const OUTCOMES = [
  { icon: Users, title: "Teams that trust", body: "Shared challenge in the outdoors builds the kind of trust a workshop can't." },
  { icon: Compass, title: "Leaders under pressure", body: "Real decisions, real consequences — a safe place to practise judgement." },
  { icon: Target, title: "Clarity & focus", body: "Distance from the desk resets perspective and priorities for the quarter ahead." },
  { icon: HeartHandshake, title: "Retention & culture", body: "People remember the trip long after the perk. It signals how you value them." },
];

const FORMATS = [
  { title: "Leadership Journeys", body: "3–5 day high-country treks for senior teams, with facilitated reflection each evening.", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80" },
  { title: "Team Offsites", body: "Camp-based programs blending adventure activities, problem-solving and downtime.", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80" },
  { title: "Incentive Travel", body: "Reward trips your top performers actually talk about — Ladakh, Spiti, Kerala.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80" },
  { title: "Founder & Cohort Retreats", body: "Small-group journeys for accelerators, boards and peer groups.", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80" },
];

export default async function ForCorporatesPage() {
  const journeys = await prisma.package.findMany({
    where: { isFeatured: true, publishStatus: "Published" },
    orderBy: { displayOrder: "asc" },
    take: 5,
  });

  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-ivory)]">
        <PageHeader
          eyebrow="For Corporates"
          title="Send them somewhere that changes how they work."
          lede="Offsites, leadership journeys and incentive travel across India — designed around your objective, run to serious safety standards."
          image="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2000&q=80"
          crumbs={[{ label: "Home", href: "/" }, { label: "For Corporates" }]}
        />

        {/* Stats */}
        <div className="bg-[var(--color-forest-band)] py-8 text-white">
          <div className="container-wide grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              ["120+", "Companies"],
              ["6,000+", "Participants"],
              ["4.9/5", "Avg. rating"],
              ["Zero", "Reportable incidents"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="display-hed text-3xl">{n}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-lime)]">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <section className="container-wide py-16 md:py-24">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-moss)]">
            Why it works
          </p>
          <h2 className="display-hed max-w-3xl text-3xl text-[var(--color-ink)] md:text-4xl">
            The offsite ends. What it builds doesn&rsquo;t.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((o) => (
              <div key={o.title} className="rounded-2xl border border-[var(--color-hair)] bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-moss)]">
                  <o.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-[var(--color-ink)]">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)]">{o.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Formats */}
        <section className="bg-[var(--color-sand)] py-16 md:py-24">
          <div className="container-wide">
            <h2 className="display-hed mb-10 text-3xl text-[var(--color-ink)] md:text-4xl">Formats we run</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {FORMATS.map((f) => (
                <div key={f.title} className="group relative overflow-hidden rounded-2xl">
                  <div className="relative aspect-[16/10]">
                    <SafeImage
                      src={f.image}
                      alt={f.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="display-hed text-xl">{f.title}</h3>
                    <p className="mt-1.5 max-w-md text-sm text-white/80">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="container-wide py-16 md:py-24">
          <h2 className="display-hed mb-12 text-center text-2xl text-[var(--color-ink)]">How we build it</h2>
          <div className="relative flex flex-wrap justify-between gap-y-8">
            <div className="absolute left-6 right-6 top-6 z-0 hidden h-px bg-[var(--color-hair)] md:block" />
            {["Discovery call", "Objective & design", "Risk assessment", "Pre-trip briefing", "The journey", "Debrief & report"].map(
              (step, i) => (
                <div key={step} className="relative z-10 flex flex-1 basis-1/2 flex-col items-center bg-[var(--color-ivory)] px-2 md:basis-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-forest-band)] text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <span className="mt-3 w-24 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-ink)]">
                    {step}
                  </span>
                </div>
              )
            )}
          </div>
        </section>

        {/* Safety */}
        <section className="bg-[var(--color-forest-band)] py-16 text-white md:py-24">
          <div className="container-wide grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-lime)]">
                Non-negotiable
              </p>
              <h2 className="display-hed text-3xl md:text-4xl">Safety your legal team will sign off on</h2>
              <ul className="mt-8 space-y-5">
                {[
                  ["WFR-certified leaders", "Lead instructors hold current Wilderness First Responder certification."],
                  ["Route-specific risk plans", "A written risk assessment and evacuation plan for every itinerary."],
                  ["Redundant communications", "Satellite phones and VHF radios in every no-network region."],
                ].map(([t, b]) => (
                  <li key={t} className="flex gap-4">
                    <ShieldCheck className="mt-0.5 h-6 w-6 flex-shrink-0 text-[var(--color-lime)]" />
                    <div>
                      <p className="font-bold uppercase tracking-[0.1em] text-sm">{t}</p>
                      <p className="mt-1 text-sm text-white/70">{b}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <SafeImage
                src="https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=900&q=80"
                alt="Team on the river"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </section>

        {/* Journeys */}
        {journeys.length > 0 && (
          <section className="container-wide py-16 md:py-24">
            <div className="mb-8 flex items-end justify-between gap-4 border-b border-[var(--color-hair)] pb-5">
              <h2 className="display-hed text-2xl text-[var(--color-ink)] md:text-3xl">
                Popular for teams
              </h2>
              <Link
                href="/journeys"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-moss)] hover:text-[var(--color-moss-dark)]"
              >
                All journeys <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 hide-scrollbar md:mx-0 md:grid md:grid-cols-5 md:px-0">
              {journeys.map((j) => (
                <Link
                  key={j.id}
                  href={`/journeys/${j.categorySlug}/${j.slug}`}
                  className="group relative flex aspect-[3/4] min-w-[220px] snap-center flex-col overflow-hidden rounded-xl bg-[var(--color-forest)] md:min-w-0"
                >
                  <SafeImage
                    src={j.thumbnail || "/placeholder.svg"}
                    alt={j.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h3 className="display-hed text-lg">{j.title}</h3>
                    <div className="mt-2 flex items-center justify-between border-t border-white/20 pt-2 text-xs">
                      <span>{j.duration}</span>
                      <ArrowRightCircle className="h-5 w-5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-[var(--color-sand)] py-16 md:py-20">
          <div className="container-shell max-w-2xl text-center">
            <Mountain className="mx-auto h-8 w-8 text-[var(--color-moss)]" />
            <h2 className="display-hed mt-4 text-3xl text-[var(--color-ink)] md:text-4xl">
              Tell us the objective. We&rsquo;ll build the journey.
            </h2>
            <p className="mt-4 text-[var(--color-ink-muted)]">
              Share your team size, dates and what you want them to come back with.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded bg-[var(--color-moss)] px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--color-moss-dark)]"
            >
              Plan a Corporate Journey <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

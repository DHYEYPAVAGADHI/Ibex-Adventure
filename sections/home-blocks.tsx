import Link from "next/link";
import {
  ArrowRight,
  Compass,
  BookOpen,
  Heart,
  Leaf,
  GraduationCap,
  ShieldCheck,
  Users,
  Briefcase,
  Target,
} from "lucide-react";
import { SafeImage } from "@/components/safe-image";

const LEARN_IMG =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80";
const COLLEGE_IMG =
  "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=1400&q=80";
const CORP_IMG =
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=80";

/* ── Experiential Learning ────────────────────────────────────────────────── */
export function LearningSection() {
  const steps = [
    { icon: Compass, t: "Experience", d: "Live it — hands-on, in the field, out of your comfort zone." },
    { icon: BookOpen, t: "Learn", d: "Understand it — context, people, ecology and history." },
    { icon: Heart, t: "Reflect", d: "Make it yours — guided debriefs turn moments into lessons." },
    { icon: Leaf, t: "Grow", d: "Carry it forward — skills and perspective that stay with you." },
  ];
  return (
    <section id="learning" className="section-spacing bg-white">
      <div className="container-wide grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <SafeImage src={LEARN_IMG} alt="Students learning in the mountains" fill unoptimized className="object-cover" />
        </div>
        <div>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-moss)]">
            Experiential Learning
          </p>
          <h2 className="display-hed text-[clamp(2rem,3.5vw,3.25rem)] text-[var(--color-ink)]">
            The world is our classroom.
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
            Every Ibex journey is built around a simple loop. It&rsquo;s what turns a trip into
            something you use for years.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {steps.map((s) => (
              <div key={s.t} className="flex gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-sand)] text-[var(--color-moss)]">
                  <s.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[var(--color-ink)]">{s.t}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-ink-muted)]">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/experiential-learning"
            className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-moss)] hover:text-[var(--color-moss-dark)]"
          >
            How our learning journeys work <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── For Colleges ─────────────────────────────────────────────────────────── */
export function CollegesSection() {
  return (
    <section id="colleges" className="section-spacing bg-[var(--color-sand)]">
      <div className="container-wide grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-moss)]">
            For Colleges
          </p>
          <h2 className="display-hed text-[clamp(2rem,3.5vw,3.25rem)] text-[var(--color-ink)]">
            Your students deserve more than a tour.
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
            Custom-designed educational expeditions with defined learning outcomes, faculty support and
            a written risk plan for every route.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { Icon: GraduationCap, label: "Learning outcomes mapped to your curriculum" },
              { Icon: ShieldCheck, label: "WFR-certified leaders, route-specific safety" },
              { Icon: Users, label: "Faculty support & pre-departure briefings" },
              { Icon: Target, label: "Certificates and a post-trip report" },
            ].map(({ Icon, label }) => (
              <li key={label} className="flex items-start gap-2.5 text-[13px] text-[var(--color-ink-muted)]">
                <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-moss)]" />
                {label}
              </li>
            ))}
          </ul>
          <Link
            href="/for-colleges"
            className="mt-8 inline-flex items-center gap-2 rounded bg-[var(--color-moss)] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-[var(--color-moss-dark)]"
          >
            Design a College Expedition <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <SafeImage src={COLLEGE_IMG} alt="College group on an expedition" fill unoptimized className="object-cover" />
        </div>
      </div>
    </section>
  );
}

/* ── For Corporates ───────────────────────────────────────────────────────── */
export function CorporatesSection() {
  return (
    <section id="corporates" className="section-spacing bg-white">
      <div className="container-wide grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <SafeImage src={CORP_IMG} alt="Team on a leadership journey" fill unoptimized className="object-cover" />
        </div>
        <div>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-moss)]">
            For Corporates
          </p>
          <h2 className="display-hed text-[clamp(2rem,3.5vw,3.25rem)] text-[var(--color-ink)]">
            Send them somewhere that changes how they work.
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
            Offsites, leadership journeys and incentive travel across India — designed around your
            objective, run to serious safety standards.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {[
              { Icon: Briefcase, label: "Team offsites" },
              { Icon: Compass, label: "Leadership journeys" },
              { Icon: Heart, label: "Incentive travel" },
            ].map(({ Icon, label }) => (
              <span key={label} className="flex items-center gap-2 text-[13px] font-semibold text-[var(--color-ink)]">
                <Icon className="h-4 w-4 text-[var(--color-moss)]" />
                {label}
              </span>
            ))}
          </div>
          <Link
            href="/for-corporates"
            className="mt-8 inline-flex items-center gap-2 rounded bg-[var(--color-moss)] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-[var(--color-moss-dark)]"
          >
            Plan a Corporate Journey <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

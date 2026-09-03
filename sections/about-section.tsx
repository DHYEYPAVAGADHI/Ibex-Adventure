import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { SafeImage } from "@/components/safe-image";

const IMG_A =
  "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=900&q=80";
const IMG_B =
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80";

export function AboutSection() {
  return (
    <section id="about" className="section-spacing bg-[var(--color-sand)]">
      <div className="container-wide">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          {/* Split image */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-2xl md:gap-3">
              <div className="relative aspect-[3/4]">
                <SafeImage src={IMG_A} alt="Travellers arriving in a village" fill unoptimized className="object-cover" />
              </div>
              <div className="relative aspect-[3/4]">
                <SafeImage src={IMG_B} alt="Sharing a meal with a local family" fill unoptimized className="object-cover" />
              </div>
            </div>
            <div className="absolute -bottom-5 left-4 flex flex-col gap-3 sm:flex-row">
              <span className="flex items-center gap-2.5 rounded bg-white px-4 py-2.5 shadow-lg">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-red-200 bg-red-100">
                  <X className="h-3.5 w-3.5 text-red-600" strokeWidth={3} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-ink)]">
                  See a place
                </span>
              </span>
              <span className="flex items-center gap-2.5 rounded bg-white px-4 py-2.5 shadow-lg">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-green-200 bg-green-100">
                  <Check className="h-3.5 w-3.5 text-[var(--color-moss)]" strokeWidth={3} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-ink)]">
                  Live the experience
                </span>
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col pt-10 lg:pt-0">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-moss)]">
              More than a trip.
            </p>
            <h2 className="display-hed text-[clamp(2.25rem,4vw,3.75rem)] text-[var(--color-ink)]">
              A journey that
              <br />
              stays with you.
            </h2>
            <div className="mt-6 flex flex-col gap-5 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
              <p className="font-semibold text-[var(--color-ink)]">
                A trip ends when you return home. An experience stays with you.
              </p>
              <p>
                At Ibex Adventure we create journeys that combine adventure, culture, nature, people
                and experiential learning. We don&rsquo;t simply take you somewhere.
              </p>
              <p className="font-serif text-2xl italic text-[var(--color-moss)]">
                We help you experience it.
              </p>
            </div>
            <Link
              href="/our-story"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-moss)]"
            >
              Explore Our Story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

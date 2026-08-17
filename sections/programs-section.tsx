"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useContact } from "@/components/providers/contact-provider";
import { buildProgramInquiry } from "@/lib/contact";

interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: string;
  displayOrder: number;
}

export function ProgramsSection() {
  const { phone } = useContact();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories?featured=true")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(console.error);
  }, []);

  if (categories.length === 0) return null;

  /* Editorial layout:
     - First category spans full width as a hero card
     - Remaining are in a 2/3-col grid
  */
  const [featured, ...rest] = categories;

  return (
    <section
      id="programs"
      className="section-spacing"
      style={{ backgroundColor: "#F4EFE3" }}
    >
      <div className="container-shell">
        {/* Section header */}
        <div className="mb-16 grid md:grid-cols-[1fr_auto] md:items-end gap-8">
          <div>
            <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#172C21]">
              Transformative Programs
            </p>
            <h2 className="font-serif text-5xl leading-[1.08] tracking-tight text-[#1C1C18] sm:text-6xl md:text-[4.5rem]">
              Adventure by
              <br />
              <em>Design.</em>
            </h2>
          </div>
          <p className="max-w-xs text-sm font-light leading-7 text-[#424844] md:text-base">
            Each journey is meticulously designed to challenge, inspire, and deeply 
            connect you with India&apos;s most extraordinary landscapes.
          </p>
        </div>

        <div className="h-px bg-[#C2C8C2] mb-16" />

        {/* Featured large card */}
        {featured && (
          <div
            className="group relative mb-6 cursor-pointer overflow-hidden"
            style={{ height: "clamp(320px, 45vw, 520px)", borderRadius: "2px" }}
            onClick={() => router.push(`/programs/${featured.slug}`)}
          >
            <Image
              src={
                featured.image && featured.image.trim()
                  ? featured.image
                  : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80"
              }
              alt={featured.imageAlt || featured.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 1280px"
              priority
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#172C21]/80 via-[#172C21]/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#172C21]/50 to-transparent" />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                Featured Program
              </p>
              <h3 className="mb-4 font-serif text-4xl font-normal text-white md:text-5xl lg:text-6xl">
                {featured.title}
              </h3>
              <p className="mb-6 max-w-lg text-sm font-light text-white/80 leading-6 line-clamp-2">
                {featured.description}
              </p>
              <div className="flex gap-4">
                <Link
                  href={`/programs/${featured.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#172C21] transition-all hover:bg-[#FED65B]"
                >
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href={buildProgramInquiry(phone, featured.title)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  Enquire
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Rest — editorial grid */}
        {rest.length > 0 && (
          <div className={`grid gap-6 ${rest.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : rest.length === 2 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
            {rest.map((category) => {
              const href = `/programs/${category.slug}`;
              return (
                <Link
                  key={category.id}
                  href={href}
                  className="group relative block overflow-hidden"
                  style={{ height: "clamp(260px, 30vw, 360px)", borderRadius: "2px" }}
                >
                  <Image
                    src={
                      category.image && category.image.trim()
                        ? category.image
                        : "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={category.imageAlt || category.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172C21]/75 via-[#172C21]/10 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                    <h3 className="font-serif text-2xl font-normal text-white md:text-3xl">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/70 line-clamp-2 leading-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      {category.description}
                    </p>
                    {/* Gold underline */}
                    <div className="mt-4 h-px w-0 bg-[#D4AF37] group-hover:w-10 transition-all duration-500" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* All programs CTA */}
        <div className="mt-12 text-center md:text-left">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#172C21] underline underline-offset-4 hover:text-[#2D4236] transition-colors"
          >
            View all programs <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

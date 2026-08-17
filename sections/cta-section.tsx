"use client";

import { useContact } from "@/components/providers/contact-provider";
import { buildGeneralInquiry } from "@/lib/contact";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  const { phone } = useContact();

  return (
    <section
      className="py-24 md:py-32"
      style={{ backgroundColor: "#172C21" }}
    >
      <div className="container-shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
          {/* Left — editorial statement */}
          <div>
            <p className="mb-6 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
              Start the Journey
            </p>
            <h2 className="font-serif text-5xl font-normal leading-[1.1] text-white sm:text-6xl lg:text-7xl">
              Let&apos;s plan your
              <br />
              <em className="text-[#D4AF37]">next adventure.</em>
            </h2>
            <p className="mt-6 max-w-md text-base font-light leading-7 text-white/65">
              Share your interests and we&apos;ll craft a journey that challenges, inspires, and transforms.
            </p>
          </div>

          {/* Right — CTA */}
          <div className="flex flex-col gap-4">
            <a
              href={buildGeneralInquiry(phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-semibold text-[#172C21] transition-all hover:bg-[#FED65B] hover:shadow-xl hover:shadow-[#D4AF37]/30"
            >
              Enquire on WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-xs text-white/40 text-center">
              We respond within 2 hours
            </p>
          </div>
        </div>

        {/* Bottom editorial rule */}
        <div className="mt-16 h-px bg-white/10" />
      </div>
    </section>
  );
}

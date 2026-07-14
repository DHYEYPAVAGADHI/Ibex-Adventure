"use client";

import { AnimatedSection } from "@/components/animated-section";
import { useContact } from "@/components/providers/contact-provider";
import { buildTelLink } from "@/lib/contact";
import { WhatsappButton } from "@/components/whatsapp-button";
import { buildGeneralInquiry } from "@/lib/contact";

export function CtaSection() {
  const { phone, whatsapp, email } = useContact();
  return (
    <AnimatedSection className="section-spacing">
      <div className="container-shell">
        <div className="rounded-[2rem] border border-amber-300/20 bg-[linear-gradient(135deg,rgba(251,191,36,0.18),rgba(15,23,42,0.96))] px-6 py-12 sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/80">
              Start the Journey
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Plan Your Adventure With Us
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
              Keep the final action simple: one clear prompt, one strong button, one direct path to WhatsApp.
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <WhatsappButton href={buildGeneralInquiry(phone)} className="px-7 py-3.5">
              Enquire Now
            </WhatsappButton>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

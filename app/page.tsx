import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/sections/hero-section";
import { AboutSection } from "@/sections/about-section";
import { AttractionsSection } from "@/sections/attractions-section";
import { ProgramsSection } from "@/sections/programs-section";
import { LearningSection, CollegesSection, CorporatesSection } from "@/sections/home-blocks";
import { SafetySection } from "@/sections/safety-section";
import { TestimonialsSection } from "@/sections/testimonials-section";
import { CtaSection } from "@/sections/cta-section";
import { ContactSection } from "@/sections/contact-section";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["TourOperator", "LocalBusiness"],
  "@id": "https://ibexadventure.in/#organization",
  name: "Ibex Adventure",
  url: "https://ibexadventure.in",
  description:
    "Ibex Adventure runs premium experiential journeys, treks and student immersion programs across India's most breathtaking destinations.",
  email: "info@ibexadventure.com",
  address: { "@type": "PostalAddress", addressCountry: "IN", addressRegion: "Gujarat" },
  sameAs: [
    "https://www.instagram.com/ibexadventure",
    "https://www.facebook.com/ibexadventure",
    "https://www.youtube.com/@ibexadventure",
  ],
  areaServed: { "@type": "Country", name: "India" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://ibexadventure.in/#website",
  url: "https://ibexadventure.in",
  name: "Ibex Adventure",
  description: "Experiential travel across India — Travel. Experience. Learn.",
  publisher: { "@id": "https://ibexadventure.in/#organization" },
  inLanguage: "en-IN",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <AttractionsSection />
        <ProgramsSection />
        <LearningSection />
        <CollegesSection />
        <CorporatesSection />
        <SafetySection />
        <TestimonialsSection />
        <CtaSection />
        <ContactSection />
      </main>
    </>
  );
}

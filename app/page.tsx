import { Navbar } from "@/components/navbar";
import { AboutSection } from "@/sections/about-section";
import { ContactSection } from "@/sections/contact-section";
import { CtaSection } from "@/sections/cta-section";
import { DiscoverySection } from "@/sections/discovery-section";
import { AttractionsSection } from "@/sections/attractions-section";
import { DestinationsSection } from "@/sections/destinations-section";
import { HeroSection } from "@/sections/hero-section";
import { ProgramDetailsSection } from "@/sections/program-details-section";
import { ProgramsSection } from "@/sections/programs-section";
import { SafetySection } from "@/sections/safety-section";
import { StudentGainsSection } from "@/sections/student-gains-section";
import { TestimonialsSection } from "@/sections/testimonials-section";

// JSON-LD Structured Data for Google Rich Results
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["TourOperator", "LocalBusiness"],
  "@id": "https://ibexadventure.in/#organization",
  name: "Ibex Adventure",
  url: "https://ibexadventure.in",
  logo: "https://ibexadventure.in/logo.png",
  image: "https://ibexadventure.in/og-image.jpg",
  description:
    "Ibex Adventure offers premium trekking expeditions, adventure tours, student immersion programs and outdoor journeys across India's most breathtaking destinations.",
  telephone: "+91-XXXXXXXXXX",
  email: "contact@ibexadventure.in",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
    addressRegion: "India",
  },
  sameAs: [
    "https://www.instagram.com/ibexadventure",
    "https://www.facebook.com/ibexadventure",
    "https://www.youtube.com/@ibexadventure",
  ],
  priceRange: "₹₹–₹₹₹",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  knowsAbout: [
    "Himalayan Trekking",
    "Adventure Tourism",
    "Student Adventure Programs",
    "Outdoor Expeditions",
    "Mountain Adventures",
    "Wildlife Tours India",
  ],
  areaServed: {
    "@type": "Country",
    name: "India",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://ibexadventure.in/#website",
  url: "https://ibexadventure.in",
  name: "Ibex Adventure",
  description: "Best Adventure Tours & Trekking in India",
  publisher: { "@id": "https://ibexadventure.in/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://ibexadventure.in/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-IN",
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <main>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <AttractionsSection />
        <ProgramsSection />
        <SafetySection />
        <TestimonialsSection />
        <CtaSection />
      </main>
    </>
  );
}

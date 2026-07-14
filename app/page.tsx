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
export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <DiscoverySection />
      <DestinationsSection />
      <AttractionsSection />
      <AboutSection />
      <ProgramsSection />
      <StudentGainsSection />
      <TestimonialsSection />
      <SafetySection />
      <ProgramDetailsSection />
      <CtaSection />
      <ContactSection />
    </main>
  );
}

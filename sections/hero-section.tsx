import { prisma } from "@/lib/prisma";
import { HeroSectionClient } from "./hero-section-client";

const DEFAULT_HERO_IMAGES = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80",
];

interface HeroSectionProps {
  variant?: "home" | "category";
  title?: string;
  subtitle?: string;
  images?: string[];
}

export async function HeroSection({
  variant = "home",
  title,
  subtitle,
  images,
}: HeroSectionProps) {
  const heroData = await prisma.heroSection.findFirst();

  let parsedImages = images || DEFAULT_HERO_IMAGES;
  if (!images && heroData?.backgroundImages) {
    try {
      parsedImages = JSON.parse(heroData.backgroundImages);
      if (!Array.isArray(parsedImages) || parsedImages.length === 0) {
        parsedImages = DEFAULT_HERO_IMAGES;
      }
    } catch {
      // fallback
    }
  }

  const finalHeadline = variant === "category" ? (title || "Ibex Adventure") : (heroData?.headline || "Incredible Adventures");
  const finalSubtitle = variant === "category" ? subtitle : (heroData?.subtitle || "INSPIRED OUTDOOR JOURNEYS");
  const finalDescription = heroData?.description || "Discover the world's most breathtaking landscapes and immerse yourself in unforgettable experiences with Ibex Adventure.";
  const finalButtonText = heroData?.buttonText || "Explore Programs";
  const finalButtonLink = heroData?.buttonLink || "#programs";

  return (
    <HeroSectionClient 
      variant={variant} 
      headline={finalHeadline} 
      subtitle={finalSubtitle} 
      description={finalDescription} 
      buttonText={finalButtonText} 
      buttonLink={finalButtonLink} 
      images={parsedImages} 
    />
  );
}

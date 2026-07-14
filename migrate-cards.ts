import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const discoveryCategories = [
  {
    title: "Trekking",
    subtitle: "Ridge walks, summit trails, and endurance journeys.",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80",
    icon: "Mountain",
    link: "/programs/trekking"
  },
  {
    title: "Camping",
    subtitle: "Open skies, forest camps, and nights around the fire.",
    image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1200&q=80",
    icon: "Flame",
    link: "/programs/camping"
  },
  {
    title: "Heritage",
    subtitle: "Culture-led travel through architecture and local stories.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    icon: "Compass",
    link: "/programs/heritage"
  },
  {
    title: "Wildlife",
    subtitle: "Nature encounters that deepen ecological awareness.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    icon: "PawPrint",
    link: "/programs/wildlife"
  }
];

async function main() {
  for (let i = 0; i < discoveryCategories.length; i++) {
    const cat = discoveryCategories[i];
    await prisma.homepageAdventureCard.create({
      data: {
        title: cat.title,
        subtitle: cat.subtitle,
        description: cat.subtitle,
        coverImage: cat.image,
        iconType: "lucide",
        icon: cat.icon,
        buttonText: "Explore",
        buttonLink: cat.link,
        displayOrder: i,
        status: "Published",
        isFeatured: true
      }
    });
  }
}

main().finally(() => prisma.$disconnect());

import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function migrate() {
  console.log("Starting Migration...");

  try {
    // 1. Migrate Categories -> AdventureCategory
    const categoriesPath = path.join(process.cwd(), "lib", "data", "categories.json");
    if (fs.existsSync(categoriesPath)) {
      const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf-8"));
      console.log(`Migrating ${categories.length} Categories...`);
      for (let i = 0; i < categories.length; i++) {
        const cat = categories[i];
        await prisma.adventureCategory.upsert({
          where: { slug: cat.id },
          update: {
            title: cat.label,
            description: cat.description || "",
            image: cat.bannerImage || "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=1200&q=80",
            icon: "Mountain",
            displayOrder: i,
          },
          create: {
            title: cat.label,
            slug: cat.id,
            description: cat.description || "",
            image: cat.bannerImage || "https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=1200&q=80",
            icon: "Mountain",
            imageAlt: cat.label,
            displayOrder: i,
          }
        });
      }
    }

    // 2. Migrate Tours -> Package
    const toursPath = path.join(process.cwd(), "lib", "data", "tours.json");
    if (fs.existsSync(toursPath)) {
      const tours = JSON.parse(fs.readFileSync(toursPath, "utf-8"));
      console.log(`Migrating ${tours.length} Tours...`);
      for (let i = 0; i < tours.length; i++) {
        const tour = tours[i];
        await prisma.package.upsert({
          where: { slug: tour.slug },
          update: {
            title: tour.title,
            category: tour.category || "Adventure",
            categorySlug: slugify(tour.category || "Adventure"),
            overview: tour.description || "",
            description: tour.description || "",
            thumbnail: tour.image,
            banner: tour.image,
            images: JSON.stringify(tour.gallery || []),
            gallery: JSON.stringify(tour.gallery || []),
            duration: tour.duration ? `${tour.duration} Days` : null,
            difficulty: tour.difficulty || "Moderate",
            location: tour.location || "",
            price: tour.priceRange?.min?.toString() || "Contact Us",
            isFeatured: tour.featured || false,
            publishStatus: "Published",
            displayOrder: i
          },
          create: {
            title: tour.title,
            slug: tour.slug,
            category: tour.category || "Adventure",
            categorySlug: slugify(tour.category || "Adventure"),
            overview: tour.description || "",
            description: tour.description || "",
            highlights: JSON.stringify(tour.highlights || []),
            itinerary: JSON.stringify(tour.itinerary || []),
            thumbnail: tour.image,
            banner: tour.image,
            images: JSON.stringify(tour.gallery || []),
            gallery: JSON.stringify(tour.gallery || []),
            duration: tour.duration ? `${tour.duration} Days` : null,
            difficulty: tour.difficulty || "Moderate",
            location: tour.location || "",
            price: tour.priceRange?.min?.toString() || "Contact Us",
            isFeatured: tour.featured || false,
            publishStatus: "Published",
            displayOrder: i
          }
        });
      }
    }

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration Failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();

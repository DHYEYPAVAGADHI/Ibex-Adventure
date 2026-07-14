const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testUpdate() {
  const tour = await prisma.package.findFirst();
  console.log("Found tour:", tour.id);

  const data = {
    title: tour.title + " (Edited)",
    slug: tour.slug,
    category: tour.category,
    categorySlug: tour.categorySlug,
    activity: tour.activities,
    location: tour.location,
    overview: tour.overview,
    description: tour.description,
    image: tour.banner,
    thumbnail: tour.thumbnail,
    difficulty: tour.difficulty,
    duration: tour.duration,
    season: tour.season,
    status: tour.status,
    isFeatured: tour.isFeatured,
    displayOrder: tour.displayOrder,
    basePrice: "1000",
    salePrice: "900",
    highlights: [],
    gallery: [],
    included: [],
    excluded: [],
    itinerary: [],
    faqs: [],
    seoTitle: tour.seoTitle,
    seoDescription: tour.seoDescription,
    seoKeywords: tour.seoKeywords,
  };

  try {
    const updatedTour = await prisma.package.update({
      where: { id: tour.id },
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        categorySlug: data.category ? data.category.toLowerCase().replace(/\s+/g, "-") : undefined,
        activities: data.activity,
        location: data.location || data.destination,
        overview: data.overview,
        description: data.description,
        banner: data.image,
        thumbnail: data.thumbnail,
        difficulty: data.difficulty,
        duration: data.duration,
        season: data.season,
        status: data.status,
        isFeatured: data.isFeatured,
        displayOrder: data.displayOrder,
        price: data.basePrice?.toString(),
        discount: data.salePrice?.toString(),
        highlights: JSON.stringify(data.highlights || []),
        gallery: JSON.stringify(data.gallery || []),
        images: JSON.stringify(data.image ? [data.image] : []),
        inclusions: JSON.stringify(data.included || []),
        exclusions: JSON.stringify(data.excluded || []),
        itinerary: JSON.stringify(data.itinerary || []),
        faqs: JSON.stringify(data.faqs || []),
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        seoKeywords: data.seoKeywords,
      },
    });
    console.log("Success! Tour title is now:", updatedTour.title);
  } catch (err) {
    console.error("FAILED:");
    console.error(err.message);
  }
}

testUpdate().catch(console.error).finally(() => prisma.$disconnect());

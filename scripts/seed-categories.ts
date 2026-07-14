import { prisma } from '../lib/prisma';

const MASTER_CATEGORIES = [
  {
    title: 'Wildlife',
    slug: 'wildlife',
    description: 'Explore the natural habitats of majestic creatures. Embark on safaris and witness untamed beauty.',
    image: '/images/categories/wildlife.jpg',
    imageAlt: 'Wildlife Safari',
    icon: 'Trees',
    displayOrder: 1,
  },
  {
    title: 'Adventure',
    slug: 'adventure',
    description: 'Push your limits with thrilling experiences, from high-altitude climbs to adrenaline-pumping expeditions.',
    image: '/images/categories/adventure.jpg',
    imageAlt: 'High altitude adventure',
    icon: 'Mountain',
    displayOrder: 2,
  },
  {
    title: 'Nature',
    slug: 'nature',
    description: 'Immerse yourself in tranquil landscapes, lush forests, and serene environments away from the city.',
    image: '/images/categories/nature.jpg',
    imageAlt: 'Serene nature landscapes',
    icon: 'Leaf',
    displayOrder: 3,
  },
  {
    title: 'Heritage',
    slug: 'heritage',
    description: 'Discover the rich history and cultural legacy of ancient temples, forts, and historic landmarks.',
    image: '/images/categories/heritage.jpg',
    imageAlt: 'Historic heritage sites',
    icon: 'Landmark',
    displayOrder: 4,
  },
  {
    title: 'Trekking Program',
    slug: 'trekking-programs',
    description: 'Step-by-step guided treks across the most breathtaking mountain ranges and scenic trails.',
    image: '/images/categories/trekking.jpg',
    imageAlt: 'Guided trekking programs',
    icon: 'MapPin',
    displayOrder: 5,
  }
];

async function main() {
  console.log('Starting seed process...');
  
  // Set all existing to inactive first
  await prisma.adventureCategory.updateMany({
    data: { isActive: false }
  });

  for (const cat of MASTER_CATEGORIES) {
    const existing = await prisma.adventureCategory.findUnique({
      where: { slug: cat.slug }
    });

    if (existing) {
      // Update to active
      await prisma.adventureCategory.update({
        where: { slug: cat.slug },
        data: { isActive: true, displayOrder: cat.displayOrder }
      });
      console.log(`Activated existing category: ${cat.title}`);
    } else {
      // Create new
      await prisma.adventureCategory.create({
        data: {
          ...cat,
          isActive: true
        }
      });
      console.log(`Created new category: ${cat.title}`);
    }
  }

  console.log('Seed process complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

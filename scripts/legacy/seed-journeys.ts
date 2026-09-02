import "dotenv/config";
import { prisma } from './lib/prisma';

async function main() {
  const journeys = [
    {
      title: "Spiti Valley Expedition",
      slug: "spiti-valley-expedition",
      category: "Expeditions",
      categorySlug: "expeditions",
      overview: "High altitude desert. Ancient monasteries. Rugged terrain.\nExperience the middle land in its rawest form.",
      description: "<p>Spiti Valley is a cold desert mountain valley located high in the Himalayas in the north-eastern part of the northern Indian state of Himachal Pradesh. The name 'Spiti' means 'The Middle Land', i.e. the land between Tibet and India.</p><p>This journey takes you through some of the most treacherous roads, highest villages, and oldest monasteries in the world.</p>",
      shortDescription: "EXPLORE THE MIDDLE LAND",
      highlights: JSON.stringify([
        { icon: "Mountain", text: "Drive through the treacherous Hindustan-Tibet Highway" },
        { icon: "Landmark", text: "Visit Key Monastery & ancient Tabo Monastery" },
        { icon: "Map", text: "Send a postcard from Hikkim, world's highest post office" },
        { icon: "Tent", text: "Camp at the stunning crescent-shaped Chandratal Lake" },
        { icon: "Users", text: "Experience Spitian culture & homestays" }
      ]),
      itinerary: JSON.stringify([
        { day: "1", title: "Shimla to Narkanda", bullets: ["Arrive in Shimla", "Drive through pine forests", "Overnight in Narkanda"] },
        { day: "2", title: "Narkanda to Chitkul", bullets: ["Drive along Sutlej river", "Enter Sangla Valley", "Visit Chitkul (Last village)", "Overnight stay"] },
        { day: "3", title: "Chitkul to Kalpa", bullets: ["Morning in Chitkul", "Drive to Kalpa", "Sunset views of Kinner Kailash"] },
        { day: "4", title: "Kalpa to Kaza", bullets: ["Enter Spiti Valley", "Nako Lake visit", "Gue Mummy", "Overnight in Kaza"] },
        { day: "5", title: "Spiti Sightseeing", bullets: ["Key Monastery", "Kibber Village", "Chicham Bridge"] },
        { day: "6", title: "Highest Villages", bullets: ["Hikkim (Post Office)", "Komic (Highest village)", "Langza (Fossils)"] },
        { day: "7", title: "Kaza to Chandratal", bullets: ["Cross Kunzum Pass", "Hike to Chandratal Lake", "Camping under stars"] },
        { day: "8", title: "Chandratal to Manali", bullets: ["Drive via Rohtang or Atal Tunnel", "Arrival in Manali", "Trip ends"] }
      ]),
      inclusions: JSON.stringify([
        "Accommodation in comfortable stays/camps",
        "Breakfast & Dinner",
        "Private transportation (SUV/Tempo)",
        "Experienced local driver & guide",
        "All permits and entry fees",
        "Oxygen cylinder & medical kit"
      ]),
      exclusions: JSON.stringify([
        "Travel to Shimla / from Manali",
        "Lunches & personal snacks",
        "Any adventure activity fees",
        "Personal expenses"
      ]),
      tags: JSON.stringify(["Roadtrip", "Himalayas", "Culture", "High Altitude"]),
      duration: "7N / 8D",
      difficulty: "Moderate",
      ageGroupMin: 15,
      season: "Jun - Oct",
      location: "Shimla",
      meetingPoint: "Shimla",
      maxGroupSize: 12,
      price: "24,500",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1626714485860-264024227c44?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1596766432470-388cd281481b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1614532655848-1250267035ce?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1589417032733-14979313dbde?auto=format&fit=crop&w=800&q=80"
      ]),
      publishStatus: "Published"
    },
    {
      title: "Kashmir Great Lakes",
      slug: "kashmir-great-lakes",
      category: "Treks",
      categorySlug: "treks",
      overview: "Seven alpine lakes. Lush meadows. Snow-capped peaks.\nA trek through paradise on earth.",
      description: "<p>The Kashmir Great Lakes Trek is arguably the most beautiful trek in India. It takes you through an array of stunning alpine lakes, endless meadows, and towering mountain passes.</p><p>Every day presents a new lake, each more beautiful than the last, making it a photographer's absolute dream.</p>",
      shortDescription: "THE MOST BEAUTIFUL TREK IN INDIA",
      highlights: JSON.stringify([
        { icon: "Waves", text: "Witness 7 breathtaking alpine lakes" },
        { icon: "Mountain", text: "Cross 3 high altitude mountain passes" },
        { icon: "Tent", text: "Camp in the stunning meadows of Kashmir" },
        { icon: "Map", text: "Experience the unique beauty of Gadsar & Satsar" },
      ]),
      itinerary: JSON.stringify([
        { day: "1", title: "Arrival in Sonamarg", bullets: ["Arrive in Srinagar", "Drive to Sonamarg base camp", "Briefing"] },
        { day: "2", title: "Sonamarg to Nichnai", bullets: ["Trek starts", "Walk through maple trees", "Camp at Nichnai"] },
        { day: "3", title: "Nichnai to Vishansar", bullets: ["Cross Nichnai Pass", "Descend to Vishansar Lake", "Camp by the lake"] },
        { day: "4", title: "Vishansar to Gadsar", bullets: ["Cross Gadsar Pass (highest point)", "See Krishansar & Gadsar lakes", "Camp at Gadsar"] },
        { day: "5", title: "Gadsar to Satsar", bullets: ["Walk through meadows", "Visit the 7 small lakes of Satsar", "Camp"] },
        { day: "6", title: "Satsar to Gangabal", bullets: ["Cross Zaj Pass", "Views of Mount Harmukh", "Camp at Twin Lakes"] },
        { day: "7", title: "Gangabal to Naranag", bullets: ["Descend through pine forests", "Arrive in Naranag", "Drive to Srinagar"] }
      ]),
      inclusions: JSON.stringify([
        "Dome tents & sleeping bags",
        "All nutritious veg meals on trek",
        "Experienced Trek Leader & local guides",
        "Mules for carrying central equipment",
        "Forest permits",
        "First aid & oxygen cylinder"
      ]),
      exclusions: JSON.stringify([
        "Offloading of personal backpack",
        "Travel to Srinagar",
        "Any stay in Srinagar",
        "Personal trekking gear"
      ]),
      tags: JSON.stringify(["Trekking", "Lakes", "Meadows", "Kashmir"]),
      duration: "6N / 7D",
      difficulty: "Moderate-Difficult",
      ageGroupMin: 12,
      season: "Jul - Sep",
      location: "Srinagar",
      meetingPoint: "Srinagar",
      maxGroupSize: 15,
      price: "16,800",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1570805128076-2e80ebbece3e?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1629854497352-78d122396fae?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590518933390-e51c890196ec?auto=format&fit=crop&w=800&q=80"
      ]),
      publishStatus: "Published"
    },
    {
      title: "Meghalaya Backpacking",
      slug: "meghalaya-backpacking",
      category: "Backpacking",
      categorySlug: "backpacking",
      overview: "Living root bridges. Crystal clear rivers. Mystical caves.\nExplore the abode of clouds.",
      description: "<p>Meghalaya, the 'Abode of Clouds', offers some of the most unique landscapes in the world. From the magical living root bridges crafted by the Khasi people to the crystal clear waters of the Umngot river in Dawki.</p><p>This journey takes you deep into the heart of Northeast India's most stunning state.</p>",
      shortDescription: "INTO THE ABODE OF CLOUDS",
      highlights: JSON.stringify([
        { icon: "Tree", text: "Trek to the Double Decker Living Root Bridge" },
        { icon: "Waves", text: "Boat ride on the crystal clear waters of Dawki" },
        { icon: "Mountain", text: "Explore the mystical caves of Mawsmai" },
        { icon: "Map", text: "Visit Mawlynnong, Asia's cleanest village" },
      ]),
      itinerary: JSON.stringify([
        { day: "1", title: "Arrival in Guwahati", bullets: ["Arrive in Guwahati", "Drive to Shillong", "Umiam Lake view"] },
        { day: "2", title: "Shillong to Cherrapunji", bullets: ["Visit Elephant Falls", "Drive to Cherrapunji", "Wei Sawdong waterfall"] },
        { day: "3", title: "Nongriat Trek", bullets: ["Trek to Double Decker Bridge", "Swim in natural pools", "Stay in Nongriat homestay"] },
        { day: "4", title: "Nongriat to Dawki", bullets: ["Trek back up", "Drive to Dawki", "Boating on Umngot River"] },
        { day: "5", title: "Dawki to Mawlynnong", bullets: ["Visit Bangladesh border", "Explore Mawlynnong village", "Drive back to Shillong"] },
        { day: "6", title: "Departure", bullets: ["Local market shopping", "Drive to Guwahati airport", "Trip ends"] }
      ]),
      inclusions: JSON.stringify([
        "Cozy homestays & comfortable hotels",
        "Breakfast & Dinner",
        "Private transportation",
        "Knowledgeable local guide",
        "Entry fees to all mentioned places"
      ]),
      exclusions: JSON.stringify([
        "Flights/Trains to Guwahati",
        "Lunches",
        "Boating charges at Dawki",
        "Personal expenses"
      ]),
      tags: JSON.stringify(["Northeast", "Culture", "Nature", "Backpacking"]),
      duration: "5N / 6D",
      difficulty: "Easy-Moderate",
      ageGroupMin: 10,
      season: "Sep - May",
      location: "Guwahati",
      meetingPoint: "Guwahati",
      maxGroupSize: 10,
      price: "19,500",
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1549479328-765cc4e3f360?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1614531341773-3bff8b7cb3fc?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1627914436573-04dc32b7bbd3?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1589136777351-fdc9c9cb15f9?auto=format&fit=crop&w=800&q=80"
      ]),
      publishStatus: "Published"
    }
  ];

  for (const pkg of journeys) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
    console.log(`Upserted package: ${pkg.title}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

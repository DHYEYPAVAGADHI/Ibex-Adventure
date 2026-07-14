import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || "file:./dev.db" });
const prisma = new PrismaClient({ adapter });


async function main() {
  console.log("🌱 Seeding database...");

  // ─── ATTRACTIONS ──────────────────────────────────────────────────────────
  const attractionsData = [
    {
      slug: "spiti-valley",
      title: "Spiti Valley",
      category: "Adventure",
      state: "Himachal Pradesh",
      location: "Lahaul & Spiti, Himachal Pradesh",
      heroImage: "https://images.unsplash.com/photo-1616480838189-d9d15c71d600?auto=format&fit=crop&w=1200&q=80",
      description: "Spiti Valley is a cold desert mountain valley in the Himalayas, offering dramatic landscapes, ancient monasteries, and an unparalleled off-the-beaten-path experience.",
      activities: JSON.stringify(["Motorcycle Expedition", "Trekking", "Monastery Visits", "Photography", "Stargazing", "Mountain Biking"]),
      bestTime: "June – September",
      displayOrder: 1,
    },
    {
      slug: "rann-of-kutch",
      title: "Rann of Kutch",
      category: "Natural",
      state: "Gujarat",
      location: "Kutch, Gujarat",
      heroImage: "https://images.unsplash.com/photo-1584732200355-486ad5f4b1b2?auto=format&fit=crop&w=1200&q=80",
      description: "The Rann of Kutch is one of the largest salt marshes in the world, offering a surreal white expanse under starlit skies during the annual Rann Utsav festival.",
      activities: JSON.stringify(["Wildlife Safari", "Photography", "Cultural Tour", "Desert Walk", "Star Gazing"]),
      bestTime: "November – February",
      displayOrder: 2,
    },
    {
      slug: "manali-hills",
      title: "Manali Hills",
      category: "Adventure",
      state: "Himachal Pradesh",
      location: "Manali, Himachal Pradesh",
      heroImage: "https://images.unsplash.com/photo-1623492701902-47dc207df5ea?auto=format&fit=crop&w=1200&q=80",
      description: "Surrounded by snow-capped peaks and lush valleys, Manali Hills is the ultimate destination for adventure enthusiasts and nature lovers alike.",
      activities: JSON.stringify(["Trekking", "Paragliding", "River Rafting", "Skiing", "Camping", "Mountain Biking"]),
      bestTime: "October – June",
      displayOrder: 3,
    },
    {
      slug: "jaisalmer-desert",
      title: "Jaisalmer Desert",
      category: "Historical",
      state: "Rajasthan",
      location: "Jaisalmer, Rajasthan",
      heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
      description: "The Golden City of Rajasthan, Jaisalmer stands atop a yellow sandstone hill amidst the Thar Desert, offering a mesmerizing blend of history and culture.",
      activities: JSON.stringify(["Camel Safari", "Fort Visit", "Sand Dune Camping", "Cultural Show", "Jeep Safari"]),
      bestTime: "October – March",
      displayOrder: 4,
    },
    {
      slug: "udaipur-lakes",
      title: "Udaipur Lakes",
      category: "Cultural",
      state: "Rajasthan",
      location: "Udaipur, Rajasthan",
      heroImage: "https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=1200&q=80",
      description: "The City of Lakes, Udaipur is renowned for its historic palaces, romantic lakes, and vibrant culture, making it one of India's most beloved destinations.",
      activities: JSON.stringify(["Boat Ride", "Palace Tour", "Heritage Walk", "Sunset Point", "Cultural Show"]),
      bestTime: "September – March",
      displayOrder: 5,
    },
    {
      slug: "coorg-coffee-trails",
      title: "Coorg Coffee Trails",
      category: "Natural",
      state: "Karnataka",
      location: "Kodagu, Karnataka",
      heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      description: "Known as the Scotland of India, Coorg is a scenic hill station adorned with coffee and tea plantations, misty mountains, and cascading waterfalls.",
      activities: JSON.stringify(["Coffee Plantation Tour", "Trekking", "River Rafting", "Wildlife Safari", "Waterfall Visit"]),
      bestTime: "October – May",
      displayOrder: 6,
    },
    {
      slug: "meghalaya-living-roots",
      title: "Meghalaya Living Roots",
      category: "Natural",
      state: "Meghalaya",
      location: "East Khasi Hills, Meghalaya",
      heroImage: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&w=1200&q=80",
      description: "Meghalaya, the abode of clouds, is home to the world-famous living root bridges, the wettest place on earth, and some of the most pristine caves and waterfalls.",
      activities: JSON.stringify(["Root Bridge Trek", "Cave Exploration", "Waterfall Visit", "Photography", "Village Walk"]),
      bestTime: "October – April",
      displayOrder: 7,
    },
    {
      slug: "andaman-islands",
      title: "Andaman Islands",
      category: "Beach",
      state: "Andaman & Nicobar Islands",
      location: "Port Blair, Andaman & Nicobar",
      heroImage: "https://images.unsplash.com/photo-1547060022-5e20fe52f87b?auto=format&fit=crop&w=1200&q=80",
      description: "A tropical paradise in the Bay of Bengal, the Andaman Islands offer pristine beaches, crystal-clear waters, and some of the best scuba diving in the world.",
      activities: JSON.stringify(["Scuba Diving", "Snorkeling", "Sea Walking", "Island Hopping", "Beach Camping", "Kayaking"]),
      bestTime: "October – May",
      displayOrder: 8,
    },
    {
      slug: "rishikesh-yoga-adventure",
      title: "Rishikesh Yoga & Adventure",
      category: "Adventure",
      state: "Uttarakhand",
      location: "Rishikesh, Uttarakhand",
      heroImage: "https://images.unsplash.com/photo-1591017403286-fd8493524e1e?auto=format&fit=crop&w=1200&q=80",
      description: "The Yoga Capital of the World, Rishikesh sits on the banks of the sacred Ganges and is the ultimate destination for both spiritual seekers and adventure lovers.",
      activities: JSON.stringify(["River Rafting", "Bungee Jumping", "Yoga & Meditation", "Camping", "Cliff Jumping", "Rock Climbing"]),
      bestTime: "September – June",
      displayOrder: 9,
    },
    {
      slug: "kedarnath-spiritual",
      title: "Kedarnath Shrine",
      category: "Religious",
      state: "Uttarakhand",
      location: "Rudraprayag, Uttarakhand",
      heroImage: "https://images.unsplash.com/photo-1626714485856-11bf249b6b75?auto=format&fit=crop&w=1200&q=80",
      description: "One of the 12 Jyotirlingas and part of the Char Dham yatra, Kedarnath sits at 3,553 meters and is surrounded by majestic Himalayan peaks.",
      activities: JSON.stringify(["Pilgrimage Trek", "Helicopter Ride", "Photography", "Camping", "Meditation"]),
      bestTime: "May – June, September – October",
      entryFee: "Free (Temple darshan)",
      timings: "4:00 AM – 9:00 PM (May – Nov)",
      displayOrder: 10,
    },
    {
      slug: "darjeeling-tea-gardens",
      title: "Darjeeling Tea Gardens",
      category: "Cultural",
      state: "West Bengal",
      location: "Darjeeling, West Bengal",
      heroImage: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80",
      description: "The Queen of the Hills, Darjeeling offers breathtaking views of Kanchenjunga, world-famous tea gardens, and a charming colonial heritage.",
      activities: JSON.stringify(["Tea Garden Tour", "Toy Train Ride", "Tiger Hill Sunrise", "Monastery Visit", "Trekking"]),
      bestTime: "March – May, September – November",
      displayOrder: 11,
    },
    {
      slug: "kerala-backwaters",
      title: "Kerala Backwaters",
      category: "Natural",
      state: "Kerala",
      location: "Alleppey, Kerala",
      heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
      description: "God's Own Country, Kerala's backwaters are a network of interconnected lakes, canals, and rivers running parallel to the Arabian Sea coast.",
      activities: JSON.stringify(["Houseboat Cruise", "Kayaking", "Village Walk", "Cooking Class", "Ayurvedic Spa"]),
      bestTime: "September – March",
      displayOrder: 12,
    },
    {
      slug: "arunachal-tawang",
      title: "Tawang Monastery",
      category: "Cultural",
      state: "Arunachal Pradesh",
      location: "Tawang, Arunachal Pradesh",
      heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      description: "Home to Asia's largest monastery, Tawang is a breathtaking destination surrounded by snow-clad mountains, pristine lakes, and vibrant Tibetan Buddhist culture.",
      activities: JSON.stringify(["Monastery Visit", "Trekking", "Photography", "Lake Visit", "Cultural Immersion"]),
      bestTime: "March – October",
      entryFee: "₹50 per person",
      displayOrder: 13,
    },
  ];

  for (const attraction of attractionsData) {
    await prisma.attraction.upsert({
      where: { slug: attraction.slug },
      update: attraction,
      create: attraction,
    });
    console.log(`  ✓ Attraction: ${attraction.title}`);
  }

  // ─── DESTINATIONS ─────────────────────────────────────────────────────────
  const destinationsData = [
    {
      slug: "himalayan-trails",
      title: "Himalayan Trails",
      subtitle: "High-Altitude Routes for the Bold",
      shortDescription: "High-altitude routes designed for challenge, scenery, and transformation.",
      fullDescription: "The Himalayas represent the ultimate frontier for adventure travelers. Our Himalayan Trails program takes you through breathtaking passes, ancient monasteries, and remote villages that few outsiders ever see.\n\nFrom the lush valleys of Manali to the stark beauty of Spiti, each trail offers a unique perspective on mountain life and culture. These are not just treks — they are journeys of self-discovery.",
      heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      state: "Himachal Pradesh",
      country: "India",
      difficulty: "challenging",
      bestSeason: "June – September",
      altitude: "3,000m – 5,500m",
      highlights: JSON.stringify([
        "Trek through pristine Himalayan landscapes",
        "Visit ancient Buddhist monasteries",
        "Experience high-altitude camping",
        "Witness stunning sunrise over snow peaks",
        "Interact with remote mountain communities",
      ]),
      thingsToDo: JSON.stringify([
        { title: "Mountain Trekking", description: "Multi-day treks through spectacular mountain terrain", icon: "🏔️" },
        { title: "Monastery Visits", description: "Explore centuries-old Buddhist monasteries", icon: "🕌" },
        { title: "Camping", description: "Sleep under a canopy of stars at high altitude", icon: "⛺" },
        { title: "Photography", description: "Capture dramatic Himalayan landscapes", icon: "📷" },
      ]),
      faq: JSON.stringify([
        { question: "What fitness level is required?", answer: "Good physical fitness is required. Prior trekking experience is recommended for higher altitude routes." },
        { question: "What is the best time to visit?", answer: "June to September offers the best weather. Some high passes may be closed in winter." },
        { question: "Is accommodation available along the routes?", answer: "Yes, a mix of guesthouses, camps, and homestays are available depending on the route." },
      ]),
      travelTips: JSON.stringify([
        "Acclimatize properly before ascending to higher altitudes",
        "Carry warm layers even in summer — temperatures drop sharply at night",
        "Stay hydrated — drink at least 3-4 liters of water daily at altitude",
        "Obtain Inner Line Permits before visiting restricted border areas",
      ]),
      displayOrder: 1,
      published: true,
    },
    {
      slug: "forest-retreat-camps",
      title: "Forest Retreat Camps",
      subtitle: "Immersive Camps in Nature's Lap",
      shortDescription: "Immersive camp settings built around bonding, reflection, and adventure.",
      fullDescription: "Escape the urban rush and reconnect with nature at our Forest Retreat Camps. Nestled within dense forests, beside rivers, and in rolling valleys, these camps are designed for those seeking a deeper connection with the natural world.\n\nOur camps offer structured programs combining outdoor activities, team building, and mindfulness sessions — perfect for schools, corporate groups, and families.",
      heroImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
      state: "Uttarakhand",
      country: "India",
      difficulty: "easy",
      bestSeason: "March – June, September – November",
      highlights: JSON.stringify([
        "Bonfire nights and storytelling sessions",
        "Team building activities in nature",
        "Bird watching and nature trails",
        "Outdoor cooking and survival skills",
        "Mindfulness and meditation in nature",
      ]),
      thingsToDo: JSON.stringify([
        { title: "Nature Walks", description: "Guided walks through pristine forest trails", icon: "🌿" },
        { title: "Bird Watching", description: "Spot rare Himalayan bird species", icon: "🦅" },
        { title: "Team Activities", description: "Rope courses and group challenges", icon: "🏅" },
        { title: "Campfire", description: "Evening bonfire with music and stories", icon: "🔥" },
      ]),
      faq: JSON.stringify([
        { question: "Are camps suitable for children?", answer: "Yes, we have age-appropriate programs for children from 10 years upward." },
        { question: "What is included in the camp package?", answer: "Accommodation, meals, all activity equipment, and professional guides are included." },
      ]),
      travelTips: JSON.stringify([
        "Pack light but carry insect repellent and sunscreen",
        "Wear sturdy closed-toe shoes for forest trails",
        "Respect wildlife — do not disturb or feed animals",
      ]),
      displayOrder: 2,
      published: true,
    },
    {
      slug: "riverside-basecamps",
      title: "Riverside Basecamps",
      subtitle: "Where Adventure Meets the River",
      shortDescription: "Scenic outdoor spaces for team activities, rest, and exploration.",
      fullDescription: "Our Riverside Basecamps are set along the banks of India's most scenic rivers, from the glacial-fed streams of Uttarakhand to the meandering rivers of the Western Ghats.\n\nThese camps serve as the perfect base for water-based adventures, team retreats, and educational programs. The gentle sound of flowing water, combined with the thrill of outdoor activities, creates an unforgettable experience.",
      heroImage: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
      state: "Uttarakhand",
      country: "India",
      difficulty: "moderate",
      bestSeason: "September – June",
      highlights: JSON.stringify([
        "River rafting through exciting rapids",
        "Kayaking on scenic stretches",
        "Riverside camping under stars",
        "Fishing and nature observation",
        "Water confidence and swimming programs",
      ]),
      thingsToDo: JSON.stringify([
        { title: "River Rafting", description: "White water rafting suitable for all skill levels", icon: "🚣" },
        { title: "Kayaking", description: "Guided kayaking sessions on calm and fast water", icon: "🏄" },
        { title: "Fishing", description: "Traditional fishing in pristine river stretches", icon: "🎣" },
        { title: "Riverside Camping", description: "Sleep to the sound of flowing water", icon: "⛺" },
      ]),
      faq: JSON.stringify([
        { question: "Is river rafting safe for beginners?", answer: "Yes, we offer Grade I-III rapids for beginners with professional guides and safety equipment." },
        { question: "What should I wear for water activities?", answer: "Quick-dry clothing, water shoes, and swimwear. All safety equipment is provided." },
      ]),
      travelTips: JSON.stringify([
        "Do not enter the water without a certified guide",
        "Keep valuables secured in waterproof bags",
        "Stay hydrated — water activities are deceptively tiring",
      ]),
      displayOrder: 3,
      published: true,
    },
    {
      slug: "heritage-valley-circuits",
      title: "Heritage Valley Circuits",
      subtitle: "Where Culture, Place & Experience Converge",
      shortDescription: "Routes where culture, place, and experience come together.",
      fullDescription: "India's valleys hold centuries of history, culture, and living traditions. Our Heritage Valley Circuits take you through ancient trade routes, royal circuits, and cultural corridors that reveal the deep story of this land.\n\nFrom the forts of Rajasthan to the temples of Tamil Nadu, each circuit is designed to immerse you in local culture, cuisine, and craft — creating memories that last a lifetime.",
      heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
      state: "Rajasthan",
      country: "India",
      difficulty: "easy",
      bestSeason: "October – March",
      highlights: JSON.stringify([
        "Guided tours of UNESCO World Heritage sites",
        "Interactions with local artisans and craftspeople",
        "Traditional folk music and dance performances",
        "Local cuisine workshops",
        "Overnight stays in heritage havelis",
      ]),
      thingsToDo: JSON.stringify([
        { title: "Fort & Palace Visits", description: "Explore magnificent Rajput and Mughal architecture", icon: "🏰" },
        { title: "Craft Workshops", description: "Learn traditional textile, pottery, and jewelry making", icon: "🎨" },
        { title: "Cuisine Trails", description: "Taste authentic local recipes with home cooks", icon: "🍛" },
        { title: "Cultural Shows", description: "Evening folk dance and puppet show performances", icon: "🎭" },
      ]),
      faq: JSON.stringify([
        { question: "Are these suitable for senior travelers?", answer: "Yes, Heritage Valley Circuits are designed to be accessible. We can customize itineraries for comfort." },
        { question: "Is the food vegetarian-friendly?", answer: "Absolutely. Rajasthan has a rich vegetarian food culture, and we can accommodate all dietary preferences." },
      ]),
      travelTips: JSON.stringify([
        "Dress modestly when visiting temples and religious sites",
        "Bargain respectfully at local markets — it is part of the culture",
        "Learn a few phrases in Hindi or the local language",
        "Carry cash — many rural artisans do not accept cards",
      ]),
      displayOrder: 4,
      published: true,
    },
  ];

  for (const destination of destinationsData) {
    await prisma.destination.upsert({
      where: { slug: destination.slug },
      update: destination,
      create: destination,
    });
    console.log(`  ✓ Destination: ${destination.title}`);
  }

  console.log("\n✅ Seeding complete!");
  console.log(`   ${attractionsData.length} attractions seeded`);
  console.log(`   ${destinationsData.length} destinations seeded`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });

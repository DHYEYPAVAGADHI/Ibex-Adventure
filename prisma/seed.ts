import "dotenv/config";
import { prisma } from "../lib/prisma";

/* -------------------------------------------------------------------------- */
/*  Curated placeholder imagery (Unsplash). Swap via the admin CMS anytime.   */
/* -------------------------------------------------------------------------- */
const IMG = {
  ladakh: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80",
  ladakh2: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
  spiti: "/uploads/Uncategorized/Spiti_Tour_Image-397bef2654218591.webp",
  spiti2: "/uploads/Uncategorized/Spiti_Tour_Image-b1fe4bb284106a7b.webp",
  rishikesh: "https://images.unsplash.com/photo-1591017403286-fd8493524e1e?auto=format&fit=crop&w=1920&q=80",
  rajasthan: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1920&q=80",
  kutch: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1920&q=80",
  kerala: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1920&q=80",
  manali: "/uploads/Uncategorized/manali0003-224d901ef448ddc4.webp",
  kasol: "/uploads/Uncategorized/Manikaran_near_kasol-86a06182d3f80de5.webp",
  mountains: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
  meadow: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80",
  forest: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80",
  lake: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80",
  camp: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1920&q=80",
  village: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1600&q=80",
  food: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1600&q=80",
  craft: "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=1600&q=80",
  wildlife: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1600&q=80",
  taj: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80",
  rafting: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1600&q=80",
  student: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
};

const S = (v: unknown) => JSON.stringify(v);

/* -------------------------------------------------------------------------- */
/*  Experience categories (drives /experiences grid + nav)                    */
/* -------------------------------------------------------------------------- */
const EXPERIENCE_CATEGORIES = [
  ["Adventure", "adventure", "Trek, raft, climb, camp and challenge your limits.", "Mountain", IMG.mountains],
  ["Nature & Wildlife", "wildlife", "Explore national parks, wildlife and rich biodiversity.", "PawPrint", IMG.wildlife],
  ["Heritage & History", "heritage", "Walk through centuries of history and timeless architecture.", "Landmark", IMG.taj],
  ["Art & Culture", "culture", "Immerse in art, music, dance and cultural traditions.", "Music", IMG.craft],
  ["Food & Local Life", "food", "Eat like a local and discover the stories behind the food.", "Utensils", IMG.food],
  ["Wellness", "wellness", "Rejuvenate your mind, body and soul in serene places.", "Heart", IMG.lake],
  ["Rural Experiences", "rural", "Live in villages and experience the simplicity of rural India.", "Home", IMG.village],
  ["Community Experiences", "community", "Engage, interact and create impactful connections.", "Users", IMG.student],
  ["Photography", "photography", "Capture landscapes, people and moments that inspire.", "Camera", IMG.meadow],
  ["Sustainability", "sustainability", "Travel responsibly and support people and the planet.", "Leaf", IMG.forest],
] as const;

/* -------------------------------------------------------------------------- */
/*  Journey categories → Activity rows so /journeys/[category] resolves       */
/* -------------------------------------------------------------------------- */
const JOURNEY_CATEGORIES = [
  ["Experiential Journeys", "experiential", "Immersive journeys that blend adventure, culture and learning.", IMG.ladakh],
  ["Treks", "treks", "Classic Himalayan treks across meadows, passes and alpine lakes.", IMG.meadow],
  ["Expeditions", "expeditions", "High-altitude, long-format expeditions for seasoned trekkers.", IMG.mountains],
  ["Backpacking", "backpacking", "Slow, flexible trips through India's most unexplored corners.", IMG.forest],
  ["Adventure", "adventure", "Rafting, biking and multi-activity adventure holidays.", IMG.rafting],
  ["Heritage", "heritage", "Journeys built around forts, palaces and living history.", IMG.rajasthan],
  ["Culture", "culture", "Craft, cuisine and community at the centre of the trip.", IMG.kutch],
  ["Trekking", "trekking", "Guided treks for first-timers and families.", IMG.manali],
] as const;

/* -------------------------------------------------------------------------- */
/*  Six flagship experiential journeys (featured on the homepage)             */
/* -------------------------------------------------------------------------- */
const HERO_JOURNEYS = [
  {
    title: "Ladakh",
    slug: "ladakh",
    category: "Experiential Journeys",
    categorySlug: "experiential",
    shortDescription: "EXPERIENCE THE LAND BEYOND THE ROAD.",
    overview:
      "High passes. Ancient monasteries. Stark beauty.\nWarm people. Raw adventures.\nA journey that stays with you forever.",
    description:
      "<p>From the thrill of riding through the world's highest motorable passes to the serenity of ancient monasteries, from starry nights in camps to heartfelt conversations with locals — Ladakh changes you.</p><p>This is more than a trip. It's an experience.</p>",
    duration: "7N / 8D",
    difficulty: "High",
    price: "18,999",
    ageGroupMin: 18,
    maxGroupSize: 30,
    season: "May - Sep",
    location: "Leh",
    meetingPoint: "Leh",
    tags: S(["Adventure", "Culture", "Mountains", "Monasteries", "Local Life"]),
    highlights: S([
      { icon: "Mountain", text: "Ride through Khardung La — one of the world's highest motorable passes." },
      { icon: "Waves", text: "Visit breathtaking lakes — Pangong Tso, Tso Moriri & more." },
      { icon: "Landmark", text: "Explore ancient monasteries and learn Buddhist culture." },
      { icon: "Users", text: "Experience local life, food and warm hospitality." },
      { icon: "Tent", text: "Camp under a sky full of stars." },
      { icon: "Heart", text: "Build resilience, leadership and lifelong memories." },
    ]),
    itinerary: S([
      { day: "1", title: "Arrival in Leh", bullets: ["Arrive in Leh", "Acclimatization", "Leh local market", "Overnight in Leh"] },
      { day: "2", title: "Leh Sightseeing", bullets: ["Thiksey Monastery", "Shey Palace", "Shanti Stupa", "Overnight in Leh"] },
      { day: "3", title: "Leh to Nubra Valley", bullets: ["Khardung La Pass", "Diskit Monastery", "Hunder Sand Dunes", "Overnight in Nubra"] },
      { day: "4", title: "Nubra to Pangong", bullets: ["Agham – Shyok route", "Pangong Tso Lake", "Sunset by the lake", "Overnight in Camps"] },
      { day: "5", title: "Pangong to Tso Moriri", bullets: ["Chang La Pass", "Tso Moriri Lake", "Scenic drives", "Overnight in Camps"] },
      { day: "6", title: "Tso Moriri to Leh", bullets: ["Scenic route via Mahe", "Explore enroute", "Overnight in Leh"] },
      { day: "7", title: "Leh – Local Experience", bullets: ["Village visit", "Local interactions", "Learning & sharing", "Overnight in Leh"] },
      { day: "8", title: "Departure", bullets: ["Check-out", "Drop at airport", "Journey back with memories"] },
    ]),
    inclusions: S([
      "Accommodation (Hotel/Camps)", "All meals (Veg + Egg)", "Transportation (Leh to Leh)",
      "Inner line permits", "Sightseeing & entry fees", "Experienced trip leader",
      "Basic first aid", "IBEX trip T-shirt & cap",
    ]),
    exclusions: S([
      "Travel to Leh & return", "Lunch on Day 1", "Personal expenses",
      "Any adventure activities", "Anything not mentioned in inclusions",
    ]),
    faqs: S([
      { question: "How fit do I need to be?", answer: "Moderate fitness is enough. The journey is at altitude, so we build in acclimatization days." },
      { question: "Is it safe for solo travellers?", answer: "Yes. Our groups are led by trained trip leaders and we follow strict safety protocols." },
    ]),
    images: S([IMG.ladakh, IMG.ladakh2, IMG.mountains, IMG.lake]),
    thumbnail: IMG.ladakh,
  },
  {
    title: "Spiti Valley",
    slug: "spiti-valley",
    category: "Experiential Journeys",
    categorySlug: "experiential",
    shortDescription: "THE MIDDLE LAND.",
    overview: "Remote villages. Ancient monasteries. A cold desert at 12,000 ft.\nSpiti teaches you how little you really need.",
    description: "<p>Spiti is a raw, high-altitude cold desert where life is deliberate and community is everything. Homestays, monasteries and resourcefulness are the heart of this journey.</p>",
    duration: "6N / 7D",
    difficulty: "Moderate",
    price: "16,999",
    ageGroupMin: 14,
    maxGroupSize: 20,
    season: "Jun - Sep",
    location: "Shimla",
    meetingPoint: "Shimla",
    tags: S(["Remote", "Culture", "Nature", "Sustainability"]),
    highlights: S([
      { icon: "Landmark", text: "Visit Key, Dhankar and Tabo monasteries." },
      { icon: "Home", text: "Stay with local families in Spitian homestays." },
      { icon: "Mountain", text: "Cross high passes and stand in a true cold desert." },
      { icon: "Leaf", text: "Learn how Spiti lives sustainably at altitude." },
    ]),
    itinerary: S([
      { day: "1", title: "Shimla to Sangla", bullets: ["Drive along the Sutlej", "Overnight in Sangla"] },
      { day: "2", title: "Sangla to Kalpa", bullets: ["Chitkul – last village", "Kinnaur Kailash views"] },
      { day: "3", title: "Kalpa to Tabo", bullets: ["Enter Spiti", "Tabo Monastery", "Homestay"] },
      { day: "4", title: "Tabo to Kaza", bullets: ["Dhankar Monastery & lake", "Pin Valley"] },
      { day: "5", title: "Around Kaza", bullets: ["Key Monastery", "Kibber & Langza", "Fossil village"] },
      { day: "6", title: "Kaza to Chandratal", bullets: ["Kunzum Pass", "Camp near the moon lake"] },
      { day: "7", title: "Chandratal to Manali", bullets: ["Cross Rohtang", "Trip ends"] },
    ]),
    inclusions: S(["Accommodation & homestays", "All meals", "Transport (Shimla to Manali)", "Permits", "Trip leader"]),
    exclusions: S(["Travel to Shimla", "Personal expenses", "Monastery donations"]),
    faqs: S([{ question: "Is there mobile network?", answer: "Only BSNL works in most of Spiti. Treat it as a digital detox." }]),
    images: S([IMG.spiti, IMG.spiti2, IMG.mountains]),
    thumbnail: IMG.spiti,
  },
  {
    title: "Rishikesh",
    slug: "rishikesh",
    category: "Experiential Journeys",
    categorySlug: "experiential",
    shortDescription: "THE RIVER TEACHES.",
    overview: "White water. Yoga at dawn. The Ganga at Triveni Ghat.\nAdventure and stillness in the same day.",
    description: "<p>Rishikesh pairs adrenaline with reflection — rafting the Ganga in the morning, learning breathwork and river ecology by evening.</p>",
    duration: "3N / 4D",
    difficulty: "Easy",
    price: "8,999",
    ageGroupMin: 12,
    maxGroupSize: 24,
    season: "Sep - Jun",
    location: "Rishikesh",
    meetingPoint: "Rishikesh",
    tags: S(["Adventure", "Spirituality", "River Ecology", "Mindfulness"]),
    highlights: S([
      { icon: "Waves", text: "Raft 16 km of Grade II–III rapids on the Ganga." },
      { icon: "Heart", text: "Morning yoga and guided breathwork sessions." },
      { icon: "Users", text: "Attend the Ganga Aarti at Parmarth Niketan." },
      { icon: "Leaf", text: "River-ecology walk and a clean-up with locals." },
    ]),
    itinerary: S([
      { day: "1", title: "Arrival & orientation", bullets: ["Check in to riverside camp", "Evening Aarti"] },
      { day: "2", title: "Rafting day", bullets: ["Safety briefing", "16 km rafting", "Cliff jump"] },
      { day: "3", title: "Yoga & reflection", bullets: ["Sunrise yoga", "Waterfall hike", "River-ecology session"] },
      { day: "4", title: "Departure", bullets: ["Group debrief", "Trip ends"] },
    ]),
    inclusions: S(["Riverside camp stay", "All meals", "Rafting & equipment", "Yoga sessions", "Trip leader"]),
    exclusions: S(["Travel to Rishikesh", "Personal expenses"]),
    faqs: S([{ question: "Do I need to know swimming?", answer: "No. Life jackets and trained guides make rafting safe for non-swimmers." }]),
    images: S([IMG.rishikesh, IMG.rafting, IMG.forest]),
    thumbnail: IMG.rishikesh,
  },
  {
    title: "Rajasthan",
    slug: "rajasthan",
    category: "Experiential Journeys",
    categorySlug: "experiential",
    shortDescription: "LIVING HISTORY.",
    overview: "Forts that never fell. Blue cities. Desert nights.\nRajasthan is history you can walk through.",
    description: "<p>Beyond the palaces, this journey gets into the craft, cuisine and desert communities that keep Rajasthan's culture alive.</p>",
    duration: "5N / 6D",
    difficulty: "Easy",
    price: "14,999",
    ageGroupMin: 10,
    maxGroupSize: 24,
    season: "Oct - Mar",
    location: "Jaipur",
    meetingPoint: "Jaipur",
    tags: S(["Heritage", "Culture", "Desert", "History"]),
    highlights: S([
      { icon: "Landmark", text: "Amber Fort, Mehrangarh and the step-wells of Bundi." },
      { icon: "Home", text: "Blue-city walk and a Jodhpur home-cooked meal." },
      { icon: "Tent", text: "Camp under the stars in the Thar near Jaisalmer." },
      { icon: "Music", text: "Manganiyar folk-music evening in the dunes." },
    ]),
    itinerary: S([
      { day: "1", title: "Jaipur", bullets: ["Amber Fort", "Old city bazaar walk"] },
      { day: "2", title: "Jaipur to Jodhpur", bullets: ["Drive via Ajmer", "Evening at the clock tower"] },
      { day: "3", title: "Jodhpur", bullets: ["Mehrangarh Fort", "Blue-city walk", "Home meal"] },
      { day: "4", title: "Jodhpur to Jaisalmer", bullets: ["Drive to the golden city", "Patwon ki Haveli"] },
      { day: "5", title: "Thar Desert", bullets: ["Camel ride", "Desert camp", "Folk music"] },
      { day: "6", title: "Departure", bullets: ["Jaisalmer Fort", "Trip ends"] },
    ]),
    inclusions: S(["Heritage hotels & desert camp", "Breakfast & dinner", "Transport", "Guided walks", "Trip leader"]),
    exclusions: S(["Travel to Jaipur", "Lunches", "Monument cameras"]),
    faqs: S([{ question: "Best time to go?", answer: "October to March. Summers in Rajasthan are extreme." }]),
    images: S([IMG.rajasthan, IMG.craft, IMG.village]),
    thumbnail: IMG.rajasthan,
  },
  {
    title: "Kutch",
    slug: "kutch",
    category: "Experiential Journeys",
    categorySlug: "experiential",
    shortDescription: "CRAFT, LAND & COMMUNITY.",
    overview: "A white desert that glows at full moon. Nine crafts in one district.\nKutch is a masterclass in making things by hand.",
    description: "<p>Live and learn with artisan families across Kutch — block printing, bandhani, weaving, leather and lacquer — and camp on the White Rann.</p>",
    duration: "4N / 5D",
    difficulty: "Easy",
    price: "12,999",
    ageGroupMin: 12,
    maxGroupSize: 20,
    season: "Nov - Feb",
    location: "Bhuj",
    meetingPoint: "Bhuj",
    tags: S(["Craft", "Culture", "Community", "Design Thinking"]),
    highlights: S([
      { icon: "Home", text: "Stay in artisan villages — Nirona, Ajrakhpur, Bhujodi." },
      { icon: "Users", text: "Hands-on workshops with master craftspeople." },
      { icon: "Tent", text: "Full-moon night on the White Rann." },
      { icon: "Leaf", text: "Understand craft as livelihood and design thinking." },
    ]),
    itinerary: S([
      { day: "1", title: "Arrive Bhuj", bullets: ["Bhuj heritage walk", "Aina Mahal"] },
      { day: "2", title: "Craft villages", bullets: ["Copper bells at Nirona", "Rogan art", "Bhujodi weaving"] },
      { day: "3", title: "Ajrakh & bandhani", bullets: ["Block-printing workshop", "Tie-dye with an artisan family"] },
      { day: "4", title: "White Rann", bullets: ["Kalo Dungar viewpoint", "Sunset & full moon on the Rann"] },
      { day: "5", title: "Departure", bullets: ["Reflection circle", "Trip ends"] },
    ]),
    inclusions: S(["Homestays & tents", "All meals", "Transport", "Workshop materials", "Trip leader"]),
    exclusions: S(["Travel to Bhuj", "Craft purchases", "Rann permit (~₹100)"]),
    faqs: S([{ question: "Do we actually make things?", answer: "Yes — every workshop is hands-on and you take your work home." }]),
    images: S([IMG.kutch, IMG.craft, IMG.village]),
    thumbnail: IMG.kutch,
  },
  {
    title: "Kerala",
    slug: "kerala",
    category: "Experiential Journeys",
    categorySlug: "experiential",
    shortDescription: "SLOW DOWN. GO GREEN.",
    overview: "Backwaters. Spice hills. Fishing villages.\nKerala is the art of living gently.",
    description: "<p>From Fort Kochi's history to a night on a houseboat and a day in a Munnar tea estate, this journey is about food, wellness and slow travel.</p>",
    duration: "6N / 7D",
    difficulty: "Easy",
    price: "12,999",
    ageGroupMin: 8,
    maxGroupSize: 20,
    season: "Sep - Mar",
    location: "Kochi",
    meetingPoint: "Kochi",
    tags: S(["Nature", "Food", "Wellness", "Backwaters"]),
    highlights: S([
      { icon: "Home", text: "Fort Kochi heritage walk and a Kerala cooking class." },
      { icon: "Waves", text: "Overnight houseboat through the Alleppey backwaters." },
      { icon: "Leaf", text: "Tea-estate walk and a spice-garden visit in Munnar." },
      { icon: "Heart", text: "Introductory Ayurveda and yoga session." },
    ]),
    itinerary: S([
      { day: "1", title: "Kochi", bullets: ["Fort Kochi walk", "Chinese fishing nets", "Kathakali show"] },
      { day: "2", title: "Kochi to Munnar", bullets: ["Drive into the hills", "Waterfalls enroute"] },
      { day: "3", title: "Munnar", bullets: ["Tea estate & museum", "Spice garden", "Eravikulam park"] },
      { day: "4", title: "Munnar to Alleppey", bullets: ["Board the houseboat", "Backwater sunset"] },
      { day: "5", title: "Backwaters", bullets: ["Village canoe ride", "Toddy-tapping demo"] },
      { day: "6", title: "Ayurveda day", bullets: ["Morning yoga", "Consultation & massage"] },
      { day: "7", title: "Departure", bullets: ["Drive to Kochi", "Trip ends"] },
    ]),
    inclusions: S(["Homestay, houseboat & resort", "All meals", "Transport", "Cooking class", "Trip leader"]),
    exclusions: S(["Flights to Kochi", "Ayurveda treatments beyond one session"]),
    faqs: S([{ question: "Is it good for families?", answer: "Yes — it's our most family-friendly journey, suitable from age 8." }]),
    images: S([IMG.kerala, IMG.forest, IMG.lake]),
    thumbnail: IMG.kerala,
  },
];

/* -------------------------------------------------------------------------- */
/*  "India has 1.4 billion stories" homepage grid                             */
/* -------------------------------------------------------------------------- */
const HOMEPAGE_CARDS = [
  ["Walk the Himalayas", "Discover resilience", "Mountain", "/journeys/treks", IMG.mountains],
  ["Eat Like a Local", "Discover culture", "Utensils", "/experiences/food", IMG.food],
  ["Meet the Makers", "Discover livelihoods", "Hammer", "/journeys/culture/kutch", IMG.craft],
  ["Live Rural India", "Discover community", "Home", "/experiences/rural", IMG.village],
  ["Follow the Rivers", "Discover civilisation", "Waves", "/journeys/experiential/rishikesh", IMG.rafting],
  ["Enter the Wild", "Discover biodiversity", "PawPrint", "/experiences/wildlife", IMG.wildlife],
  ["Walk Through Living History", "Discover the past", "Landmark", "/journeys/experiential/rajasthan", IMG.rajasthan],
  ["Understand India's Spirituality", "Discover belief & tradition", "Sparkles", "/journeys/experiential/rishikesh", IMG.forest],
  ["Learn an Indian Art", "Discover creativity", "Palette", "/experiences/culture", IMG.craft],
  ["Listen to India's Stories", "Discover people", "MessageCircle", "/stories", IMG.student],
];

/* -------------------------------------------------------------------------- */
/*  Destinations                                                              */
/* -------------------------------------------------------------------------- */
const DESTINATIONS = [
  {
    slug: "ladakh", title: "Ladakh", subtitle: "The Land Beyond the Road", state: "Ladakh",
    shortDescription: "High passes, ancient monasteries and lakes that change colour with the light.",
    heroImage: IMG.ladakh, gallery: S([IMG.ladakh, IMG.ladakh2, IMG.mountains, IMG.lake]),
    rating: 4.8, reviewCount: 245, duration: "7–9 days", bestSeason: "May – September", difficulty: "Moderate",
    highlights: S(["Khardung La", "Pangong Tso", "Nubra Valley", "Thiksey Monastery", "Hunder dunes"]),
    thingsToDo: S([
      { title: "Monastery circuit", description: "Thiksey, Hemis and Diskit at dawn.", icon: "Landmark" },
      { title: "Pangong overnight", description: "Camp beside the lake and wake to the colour shift.", icon: "Tent" },
      { title: "Local homestay", description: "Share a kitchen and a story in a Ladakhi village.", icon: "Home" },
    ]),
    howToReach: S({ flight: "Daily flights to Leh (KBU) from Delhi.", train: "Nearest railhead is Tawi (Jammu), 700 km.", bus: "HRTC buses from Manali & Srinagar (Jun–Sep).", car: "2-day drive from Manali or Srinagar." }),
    travelTips: S(["Keep the first 2 days light for acclimatization.", "Carry cash — ATMs are unreliable beyond Leh.", "Permits are needed for Nubra, Pangong and Tso Moriri."]),
    nearbyPlaces: S([{ name: "Nubra Valley", distance: "120 km", slug: "" }, { name: "Pangong Tso", distance: "160 km", slug: "" }]),
    faq: S([{ question: "How many days do I need?", answer: "Seven is comfortable; nine lets you add Tso Moriri." }]),
    includedPackages: S(["ladakh"]),
    published: true, featured: true, displayOrder: 1,
  },
  {
    slug: "spiti", title: "Spiti Valley", subtitle: "The Middle Land", state: "Himachal Pradesh",
    shortDescription: "A cold desert of whitewashed monasteries, fossil villages and impossible roads.",
    heroImage: IMG.spiti, gallery: S([IMG.spiti, IMG.spiti2, IMG.mountains]),
    rating: 4.9, reviewCount: 188, duration: "6–8 days", bestSeason: "June – September", difficulty: "Moderate",
    highlights: S(["Key Monastery", "Chandratal", "Pin Valley", "Langza fossils", "Kunzum Pass"]),
    thingsToDo: S([
      { title: "Homestay nights", description: "Stay with families in Demul, Komic or Langza.", icon: "Home" },
      { title: "Chandratal camp", description: "Sleep beside the crescent-shaped moon lake.", icon: "Tent" },
    ]),
    howToReach: S({ flight: "Bhuntar (Kullu) is the nearest airport.", train: "Joginder Nagar / Shimla railheads.", bus: "HRTC buses from Shimla & Manali to Kaza.", car: "Shimla–Kaza (2 days) or Manali–Kaza (1 long day)." }),
    travelTips: S(["Only BSNL has network past Tabo.", "Carry layers — nights drop below freezing even in summer.", "Fuel up at Kaza; it's the only reliable pump."]),
    nearbyPlaces: S([{ name: "Kinnaur", distance: "150 km", slug: "" }]),
    faq: S([{ question: "Shimla or Manali side?", answer: "Enter from Shimla for gradual acclimatization, exit via Manali." }]),
    includedPackages: S(["spiti-valley"]),
    published: true, featured: true, displayOrder: 2,
  },
  {
    slug: "rishikesh", title: "Rishikesh", subtitle: "Where the Ganga Leaves the Mountains", state: "Uttarakhand",
    shortDescription: "White-water rafting, riverside yoga and the evening Aarti at Triveni Ghat.",
    heroImage: IMG.rishikesh, gallery: S([IMG.rishikesh, IMG.rafting, IMG.forest]),
    rating: 4.7, reviewCount: 312, duration: "2–4 days", bestSeason: "September – June", difficulty: "Easy",
    highlights: S(["Ganga rafting", "Beatles Ashram", "Neer waterfall", "Ganga Aarti", "Laxman Jhula"]),
    thingsToDo: S([
      { title: "Rafting", description: "Brahmapuri to Rishikesh, 16 km of Grade II–III.", icon: "Waves" },
      { title: "Yoga & breathwork", description: "Sunrise sessions on the sand.", icon: "Heart" },
    ]),
    howToReach: S({ flight: "Dehradun (DED) is 35 min away.", train: "Rishikesh & Haridwar stations.", bus: "Frequent buses from Delhi ISBT (6 hrs).", car: "240 km from Delhi via NH334." }),
    travelTips: S(["Rafting stops during the monsoon (Jul–Aug).", "The old town is alcohol- and meat-free.", "Cross the Ram Jhula early to beat the crowds."]),
    nearbyPlaces: S([{ name: "Haridwar", distance: "25 km", slug: "" }]),
    faq: S([{ question: "Minimum age for rafting?", answer: "14 years for the full stretch; shorter runs from 8." }]),
    includedPackages: S(["rishikesh"]),
    published: true, featured: true, displayOrder: 3,
  },
  {
    slug: "rajasthan", title: "Rajasthan", subtitle: "Living History", state: "Rajasthan",
    shortDescription: "Forts, blue cities and desert nights across the land of kings.",
    heroImage: IMG.rajasthan, gallery: S([IMG.rajasthan, IMG.craft, IMG.village]),
    rating: 4.8, reviewCount: 401, duration: "5–8 days", bestSeason: "October – March", difficulty: "Easy",
    highlights: S(["Amber Fort", "Mehrangarh", "Thar Desert", "Bundi step-wells", "Jaisalmer"]),
    thingsToDo: S([
      { title: "Fort walks", description: "Amber, Mehrangarh and Kumbhalgarh with a historian.", icon: "Landmark" },
      { title: "Desert camp", description: "Camel ride and folk music near Jaisalmer.", icon: "Tent" },
    ]),
    howToReach: S({ flight: "Jaipur, Jodhpur and Udaipur airports.", train: "Excellent rail links incl. overnight trains.", bus: "RSRTC & private Volvo between all cities.", car: "Golden-triangle roads are good; hire a driver." }),
    travelTips: S(["Summers (Apr–Jun) are brutal — go Oct–Mar.", "Book desert camps in advance for full-moon dates.", "Carry a scarf for dust and sun."]),
    nearbyPlaces: S([{ name: "Agra", distance: "240 km", slug: "" }]),
    faq: S([{ question: "Which cities matter most?", answer: "Jaipur, Jodhpur and Jaisalmer for a first trip." }]),
    includedPackages: S(["rajasthan"]),
    published: true, featured: false, displayOrder: 4,
  },
  {
    slug: "kutch", title: "Kutch", subtitle: "The White Desert", state: "Gujarat",
    shortDescription: "Nine living crafts and a salt desert that glows under a full moon.",
    heroImage: IMG.kutch, gallery: S([IMG.kutch, IMG.craft, IMG.village]),
    rating: 4.7, reviewCount: 143, duration: "3–5 days", bestSeason: "November – February", difficulty: "Easy",
    highlights: S(["White Rann", "Bhujodi weaving", "Rogan art, Nirona", "Kalo Dungar", "Ajrakh printing"]),
    thingsToDo: S([
      { title: "Craft workshops", description: "Block-print, weave or make a copper bell by hand.", icon: "Hammer" },
      { title: "Rann sunset", description: "Walk out onto the salt flats as the moon rises.", icon: "Sparkles" },
    ]),
    howToReach: S({ flight: "Bhuj (BHJ) from Mumbai.", train: "Bhuj station from Ahmedabad & Mumbai.", bus: "GSRTC & private buses from Ahmedabad (7 hrs).", car: "400 km from Ahmedabad." }),
    travelTips: S(["Visit around a full moon for the Rann.", "The Rann Utsav (Nov–Feb) has tent city & events.", "Carry a Rann permit (~₹100)."]),
    nearbyPlaces: S([{ name: "Ahmedabad", distance: "330 km", slug: "" }]),
    faq: S([{ question: "Is the desert white all year?", answer: "No — it floods in the monsoon and dries white by November." }]),
    includedPackages: S(["kutch"]),
    published: true, featured: false, displayOrder: 5,
  },
  {
    slug: "kerala", title: "Kerala", subtitle: "God's Own Country", state: "Kerala",
    shortDescription: "Backwaters, tea hills and a coastline built around fish and spice.",
    heroImage: IMG.kerala, gallery: S([IMG.kerala, IMG.forest, IMG.lake]),
    rating: 4.8, reviewCount: 276, duration: "5–8 days", bestSeason: "September – March", difficulty: "Easy",
    highlights: S(["Alleppey backwaters", "Munnar tea", "Fort Kochi", "Periyar", "Varkala cliffs"]),
    thingsToDo: S([
      { title: "Houseboat night", description: "Drift through the Alleppey backwaters.", icon: "Waves" },
      { title: "Cooking class", description: "Learn a Kerala fish curry from a home cook.", icon: "Utensils" },
    ]),
    howToReach: S({ flight: "Kochi, Trivandrum and Kozhikode airports.", train: "Coastal line links every town.", bus: "KSRTC across the state.", car: "Roads are good; distances feel long due to traffic." }),
    travelTips: S(["Backwaters are best Sep–Mar; monsoon is lush but wet.", "Book houseboats for a weekday to avoid crowds.", "Carry mosquito repellent for the hills."]),
    nearbyPlaces: S([{ name: "Kanyakumari", distance: "90 km", slug: "" }]),
    faq: S([{ question: "One base or move around?", answer: "Move: Kochi → Munnar → Alleppey covers the range in 6 days." }]),
    includedPackages: S(["kerala"]),
    published: true, featured: false, displayOrder: 6,
  },
];

/* -------------------------------------------------------------------------- */
/*  Attractions / experiences detail                                          */
/* -------------------------------------------------------------------------- */
const ATTRACTIONS = [
  {
    slug: "taj-mahal", title: "Taj Mahal", category: "Heritage",
    description: "The white-marble mausoleum on the Yamuna — a Mughal love letter and a UNESCO World Heritage Site.",
    history: "Commissioned by Shah Jahan in 1631 for Mumtaz Mahal; completed in 1653 by around 20,000 artisans.",
    heroImage: IMG.taj, gallery: S([IMG.taj]),
    activities: S(["Sunrise photography", "Marble-inlay workshop in Agra", "Mehtab Bagh sunset view"]),
    location: "Agra", state: "Uttar Pradesh", bestTime: "October – March, at sunrise",
    entryFee: "₹1,100 (foreign) / ₹50 (Indian) + ₹200 main mausoleum", timings: "Sunrise to sunset, closed Fridays",
    travelTips: S(["Enter from the East Gate to skip queues.", "Fridays are closed for prayers.", "No tripods or large bags."]),
    packages: S(["rajasthan"]),
    faqs: S([{ question: "How long to spend?", answer: "2–3 hours including security and the gardens." }]),
    published: true, featured: true, displayOrder: 1,
  },
  {
    slug: "jim-corbett", title: "Jim Corbett National Park", category: "Wildlife",
    description: "India's oldest national park and the birthplace of Project Tiger, in the Himalayan foothills.",
    history: "Established in 1936 as Hailey National Park; renamed in 1956 after the hunter-turned-conservationist Jim Corbett.",
    heroImage: "/images/wildlife/jim-corbett.png", gallery: S(["/images/wildlife/jim-corbett.png", IMG.wildlife]),
    activities: S(["Dhikala zone jeep safari", "Canter safari", "Birdwatching on the Ramganga", "Corbett museum, Kaladhungi"]),
    location: "Ramnagar", state: "Uttarakhand", bestTime: "November – June (Dhikala mid-Nov to mid-Jun)",
    entryFee: "Safari ₹4,500–6,000 per jeep (zone dependent)", timings: "Morning & afternoon safari slots",
    travelTips: S(["Book Dhikala zone 45 days ahead.", "Carry ID — it's checked at the gate.", "Wear muted colours on safari."]),
    packages: S([]),
    faqs: S([{ question: "Best zone for tigers?", answer: "Dhikala and Bijrani have the highest sighting rates." }]),
    published: true, featured: true, displayOrder: 2,
  },
  {
    slug: "ganga-aarti-rishikesh", title: "Ganga Aarti, Rishikesh", category: "Spiritual",
    description: "The nightly fire ceremony on the ghats at Parmarth Niketan and Triveni Ghat.",
    history: "A Vedic ritual of light offered to the river; Rishikesh's version is led by ashram students each evening.",
    heroImage: IMG.forest, gallery: S([IMG.forest, IMG.rishikesh]),
    activities: S(["Attend the evening Aarti", "Sunrise yoga on the sand", "Beatles Ashram street art"]),
    location: "Rishikesh", state: "Uttarakhand", bestTime: "Year-round, arrive 45 min early",
    entryFee: "Free", timings: "Around sunset (≈18:00 summer, ≈17:30 winter)",
    travelTips: S(["Sit on the Parmarth Niketan steps for the best view.", "Remove shoes before the ghat.", "Photography is fine but be respectful."]),
    packages: S(["rishikesh"]),
    faqs: S([{ question: "Which ghat is better?", answer: "Parmarth Niketan is more organised; Triveni Ghat is more local." }]),
    published: true, featured: false, displayOrder: 3,
  },
  {
    slug: "rann-of-kutch", title: "Rann of Kutch", category: "Natural",
    description: "A seasonal salt marsh the size of a small country that dries into a blinding white plain each winter.",
    history: "Once a shallow arm of the Arabian Sea; the 1819 earthquake raised the 'Allah Bund' and cut it off.",
    heroImage: IMG.kutch, gallery: S([IMG.kutch, IMG.village]),
    activities: S(["Full-moon walk on the salt flats", "Kalo Dungar viewpoint", "Rann Utsav tent city (Nov–Feb)"]),
    location: "Dhordo", state: "Gujarat", bestTime: "November – February, near a full moon",
    entryFee: "Rann permit ≈ ₹100 per person", timings: "Best at sunset and moonrise",
    travelTips: S(["Base yourself in Bhuj or the Rann Utsav tent city.", "Nights are cold — carry a jacket.", "The permit checkpost closes by 22:00."]),
    packages: S(["kutch"]),
    faqs: S([{ question: "Can you drive onto the salt?", answer: "Only to the marked viewing area; the rest is protected." }]),
    published: true, featured: false, displayOrder: 4,
  },
  {
    slug: "key-monastery", title: "Key Monastery", category: "Heritage",
    description: "Spiti's largest gompa, stacked like a fort on a hill above the Spiti River at 4,166 m.",
    history: "Founded in the 11th century; rebuilt many times after Mongol raids, fires and earthquakes.",
    heroImage: IMG.spiti2, gallery: S([IMG.spiti2, IMG.spiti, IMG.mountains]),
    activities: S(["Morning prayers with the monks", "Stay overnight in the guest rooms", "Photograph it from the Kaza road"]),
    location: "Kaza", state: "Himachal Pradesh", bestTime: "June – September",
    entryFee: "Donation-based", timings: "06:00 – 18:00",
    travelTips: S(["Attend the 07:00 prayer if you stay over.", "It's a 12 km detour from Kaza.", "Altitude is real here — go slow."]),
    packages: S(["spiti-valley"]),
    faqs: S([{ question: "Can tourists stay?", answer: "Yes, simple rooms with meals for a donation." }]),
    published: true, featured: false, displayOrder: 5,
  },
  {
    slug: "munnar-tea-estates", title: "Munnar Tea Estates", category: "Natural",
    description: "Rolling green tea gardens at 1,600 m in the Western Ghats, planted by the British from the 1880s.",
    history: "The Kannan Devan Hills were leased in 1877; Tata Tea and KDHP still run the estates today.",
    heroImage: IMG.kerala, gallery: S([IMG.kerala, IMG.forest]),
    activities: S(["Tea Museum & tasting", "Kolukkumalai sunrise (highest estate)", "Eravikulam NP for the Nilgiri tahr"]),
    location: "Munnar", state: "Kerala", bestTime: "September – March",
    entryFee: "Tea Museum ₹20; Eravikulam ₹125", timings: "Museum 09:00 – 16:00, closed Mondays",
    travelTips: S(["Neelakurinji blooms once every 12 years (next ~2030).", "Mornings are clearest before the mist.", "Book Eravikulam tickets online."]),
    packages: S(["kerala"]),
    faqs: S([{ question: "How far from Kochi?", answer: "About 4 hours by road, climbing through spice country." }]),
    published: true, featured: false, displayOrder: 6,
  },
];

/* -------------------------------------------------------------------------- */
/*  Memories / stories gallery                                                */
/* -------------------------------------------------------------------------- */
const MEMORIES = [
  [IMG.ladakh, "Sunrise over Pangong, Ladakh"],
  [IMG.spiti, "Homestay morning in Langza, Spiti"],
  [IMG.rafting, "Grade III on the Ganga, Rishikesh"],
  [IMG.craft, "Block printing with an artisan in Ajrakhpur"],
  [IMG.rajasthan, "Blue city rooftops, Jodhpur"],
  [IMG.kerala, "Backwater canoe, Alleppey"],
  [IMG.camp, "Camp under the stars, Chandratal"],
  [IMG.village, "Village school visit, Kumaon"],
];

async function upsertMany<T>(
  label: string,
  rows: readonly T[],
  fn: (row: T) => Promise<unknown>
) {
  for (const row of rows) {
    await fn(row);
  }
  console.log(`  ✓ ${label} (${rows.length})`);
}

async function main() {
  console.log("Seeding Ibex Adventure…");

  /* Website settings + contact + hero (singletons) */
  const existingSettings = await prisma.websiteSetting.findFirst();
  await prisma.websiteSetting.upsert({
    where: { id: existingSettings?.id ?? "seed-settings" },
    update: {},
    create: {
      id: "seed-settings",
      websiteName: "Ibex Adventure",
      footerText:
        "We create immersive journeys that inspire individuals and groups through adventure, culture, people, nature and experiential learning.",
      copyrightText: "© " + new Date().getFullYear() + " Ibex Adventure. All rights reserved.",
      socialLinks: S({
        instagram: "https://www.instagram.com/ibexadventure",
        facebook: "https://www.facebook.com/ibexadventure",
        youtube: "https://www.youtube.com/@ibexadventure",
        linkedin: "https://www.linkedin.com/company/ibexadventure",
      }),
      globalSeoTitle: "Ibex Adventure | Experiential Travel Across India",
      globalSeoDesc:
        "Premium experiential journeys, treks and student programs across India. Travel. Experience. Learn.",
    },
  });
  console.log("  ✓ WebsiteSetting");

  const existingContact = await prisma.contactInformation.findFirst();
  await prisma.contactInformation.upsert({
    where: { id: existingContact?.id ?? "seed-contact" },
    update: {},
    create: {
      id: "seed-contact",
      address: "Corporate House, Ambli – Bopal Road, Ahmedabad, Gujarat 380058, India",
      phone: "+91 98765 43210",
      whatsapp: "+91 98765 43210",
      email: "info@ibexadventure.com",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ahmedabad+Gujarat",
      socialLinks: S({
        instagram: "https://www.instagram.com/ibexadventure",
        facebook: "https://www.facebook.com/ibexadventure",
        youtube: "https://www.youtube.com/@ibexadventure",
        linkedin: "https://www.linkedin.com/company/ibexadventure",
      }),
      businessHours: S([
        { day: "Monday – Saturday", hours: "10:00 AM – 7:00 PM" },
        { day: "Sunday", hours: "Closed" },
      ]),
      emergencyContact: "+91 98765 43211",
    },
  });
  console.log("  ✓ ContactInformation");

  const existingHero = await prisma.heroSection.findFirst();
  await prisma.heroSection.upsert({
    where: { id: existingHero?.id ?? "seed-hero" },
    update: {},
    create: {
      id: "seed-hero",
      variant: "home",
      backgroundImages: S([IMG.mountains, IMG.ladakh, IMG.meadow]),
      headline: "India is not a destination. It's an experience.",
      headlinePrefix: "India is not a destination.",
      scrollWords: S(["Experience.", "Journeys.", "Stories.", "Learning."]),
      subtitle: "TRAVEL. EXPERIENCE. LEARN.",
      description:
        "Travel beyond sightseeing. Experience places. Meet people. Discover stories. Learn from the journey.",
      buttonText: "Explore Journeys",
      buttonLink: "/journeys",
    },
  });
  console.log("  ✓ HeroSection");

  /* Journey categories → Activity + AdventureCategory */
  await upsertMany("Activity (journey categories)", [...JOURNEY_CATEGORIES], async ([title, slug, description, image]) => {
    await prisma.activity.upsert({
      where: { slug },
      update: { title, description, image },
      create: { title, slug, description, image, isActive: true, displayOrder: 0 },
    });
  });

  await upsertMany("AdventureCategory (experience categories)", [...EXPERIENCE_CATEGORIES], async ([title, slug, description, icon, image], ) => {
    await prisma.adventureCategory.upsert({
      where: { slug },
      update: { title, description, icon, image, imageAlt: title, isActive: true },
      create: {
        title, slug, description, icon, image, imageAlt: title,
        displayOrder: EXPERIENCE_CATEGORIES.findIndex((c) => c[1] === slug),
        isActive: true, isFeatured: true,
      },
    });
  });

  /* Flagship journeys */
  await upsertMany("Package (flagship journeys)", HERO_JOURNEYS, async (j) => {
    const { title } = j;
    await prisma.package.upsert({
      where: { slug: j.slug },
      update: { ...j, isFeatured: true, publishStatus: "Published", status: "active" },
      create: {
        ...j,
        isFeatured: true,
        publishStatus: "Published",
        status: "active",
        displayOrder: HERO_JOURNEYS.findIndex((h) => h.slug === j.slug) + 1,
        gallery: j.images,
        seoTitle: `${title} Journey | Ibex Adventure`,
        seoDescription: (j.overview || "").replace(/\n/g, " ").slice(0, 155),
      },
    });
  });

  /* Homepage cards */
  await prisma.homepageAdventureCard.deleteMany({ where: { id: { startsWith: "seed-card-" } } });
  await upsertMany("HomepageAdventureCard", HOMEPAGE_CARDS.map((c, i) => ({ c, i })) as { c: (typeof HOMEPAGE_CARDS)[number]; i: number }[], async ({ c, i }) => {
    const [title, subtitle, icon, buttonLink, coverImage] = c;
    await prisma.homepageAdventureCard.create({
      data: {
        id: `seed-card-${i + 1}`,
        title, subtitle, description: subtitle, icon, iconType: "lucide",
        coverImage, buttonText: "Explore", buttonLink,
        displayOrder: i + 1, status: "Published",
      },
    });
  });

  /* Destinations + Attractions */
  await upsertMany("Destination", DESTINATIONS, async (d) => {
    await prisma.destination.upsert({ where: { slug: d.slug }, update: d, create: d });
  });
  await upsertMany("Attraction", ATTRACTIONS, async (a) => {
    await prisma.attraction.upsert({ where: { slug: a.slug }, update: a, create: a });
  });

  /* Memories */
  await prisma.memory.deleteMany({ where: { id: { startsWith: "seed-mem-" } } });
  await upsertMany("Memory", MEMORIES.map((m, i) => ({ m, i })) as { m: (typeof MEMORIES)[number]; i: number }[], async ({ m, i }) => {
    await prisma.memory.create({
      data: {
        id: `seed-mem-${i + 1}`,
        url: m[0],
        caption: m[1],
        displayOrder: i + 1,
        visibility: "Published",
        categories: S(["Journeys"]),
      },
    });
  });

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

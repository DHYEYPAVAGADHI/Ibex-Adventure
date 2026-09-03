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
// The ten homepage "How many will you experience?" cards — each is a real
// category page at /experiences/<slug> with its own set of places below.
const EXPERIENCE_CATEGORIES = [
  ["Walk the Himalayas", "walk-the-himalayas", "Discover resilience. High passes, alpine meadows and the quiet of the world's youngest mountains.", "Mountain", IMG.mountains],
  ["Eat Like a Local", "eat-like-a-local", "Discover culture. Home kitchens, street corners and thali traditions across India's regions.", "Utensils", IMG.food],
  ["Meet the Makers", "meet-the-makers", "Discover livelihoods. Weavers, potters, block-printers and bell-makers, hands-on in their workshops.", "Hammer", IMG.craft],
  ["Live Rural India", "live-rural-india", "Discover community. Homestays and farm days in villages where life moves at its own pace.", "Home", IMG.village],
  ["Follow the Rivers", "follow-the-rivers", "Discover civilisation. The Ganga, the Zanskar and the backwaters — India's stories are written on water.", "Waves", IMG.rafting],
  ["Enter the Wild", "enter-the-wild", "Discover biodiversity. Tigers, one-horned rhinos, elephants and the forests that hold them.", "PawPrint", IMG.wildlife],
  ["Walk Through Living History", "living-history", "Discover the past. Forts that never fell, stepwells, and cities layered a thousand years deep.", "Landmark", IMG.taj],
  ["Understand India's Spirituality", "indias-spirituality", "Discover belief & tradition. Aartis, monasteries, dargahs and the everyday sacred.", "Sparkles", IMG.forest],
  ["Learn an Indian Art", "learn-an-indian-art", "Discover creativity. Sit with a master of miniature painting, Kathak, madhubani or the sitar.", "Palette", IMG.craft],
  ["Listen to India's Stories", "indias-stories", "Discover people. Oral epics, puppet theatre and the storytellers who keep them alive.", "MessageCircle", IMG.student],
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
  ["Walk the Himalayas", "Discover resilience", "Mountain", "/experiences/walk-the-himalayas", IMG.mountains],
  ["Eat Like a Local", "Discover culture", "Utensils", "/experiences/eat-like-a-local", IMG.food],
  ["Meet the Makers", "Discover livelihoods", "Hammer", "/experiences/meet-the-makers", IMG.craft],
  ["Live Rural India", "Discover community", "Home", "/experiences/live-rural-india", IMG.village],
  ["Follow the Rivers", "Discover civilisation", "Waves", "/experiences/follow-the-rivers", IMG.rafting],
  ["Enter the Wild", "Discover biodiversity", "PawPrint", "/experiences/enter-the-wild", IMG.wildlife],
  ["Walk Through Living History", "Discover the past", "Landmark", "/experiences/living-history", IMG.rajasthan],
  ["Understand India's Spirituality", "Discover belief & tradition", "Sparkles", "/experiences/indias-spirituality", IMG.forest],
  ["Learn an Indian Art", "Discover creativity", "Palette", "/experiences/learn-an-indian-art", IMG.craft],
  ["Listen to India's Stories", "Discover people", "MessageCircle", "/experiences/indias-stories", IMG.student],
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
const U2 = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

type ARaw = {
  cat: string;
  slug: string;
  title: string;
  location: string;
  state: string;
  desc: string;
  img: string;
  history?: string;
  activities: string[];
  bestTime: string;
  entryFee?: string;
  timings?: string;
  tips: string[];
  packages?: string[];
  faqs?: { question: string; answer: string }[];
};

const ATTRACTION_DATA: ARaw[] = [
  /* ── Walk the Himalayas ─────────────────────────────────────────────── */
  { cat: "walk-the-himalayas", slug: "hampta-pass-crossover", title: "Hampta Pass Crossover", location: "Manali", state: "Himachal Pradesh",
    desc: "A four-day walk that starts in the green Kullu Valley and drops you into the moonscape of Lahaul on the far side of a 14,000 ft pass.",
    img: U2("1483921020237-2ff51e8e4b22"), activities: ["Cross the pass at 14,100 ft", "Camp at Balu ka Ghera & Shea Goru", "Side trip to Chandratal Lake", "Wildflower meadows in Jul–Aug"],
    bestTime: "June – September", entryFee: "Forest fee ≈ ₹200", tips: ["Two dry pairs of socks minimum.", "The river crossing on day 3 is cold and early.", "Acclimatise a night in Manali first."], packages: ["hampta-pass-trek"] },
  { cat: "walk-the-himalayas", slug: "triund-ridge-walk", title: "Triund Ridge Walk", location: "McLeod Ganj", state: "Himachal Pradesh",
    desc: "A short, steep climb to a grassy ridge with the whole Dhauladhar range filling the sky — doable as a day hike or an overnight.",
    img: U2("1454496522488-7a8e488e8606"), activities: ["9 km round trip from Dharamkot", "Sunset over the Kangra Valley", "Overnight in a tent or the forest hut", "Continue to Snowline Café / Laka Glacier"],
    bestTime: "March – June, September – November", entryFee: "Free", tips: ["Carry water — the last shop is at Magic View Café.", "Nights are cold year-round on the ridge.", "Start by 8 am in summer for shade."] },
  { cat: "walk-the-himalayas", slug: "chopta-chandrashila", title: "Chopta & Chandrashila Summit", location: "Chopta", state: "Uttarakhand",
    desc: "A meadow hamlet often called 'mini Switzerland', and a dawn climb to Tungnath — the highest Shiva temple in the world — and the Chandrashila peak above it.",
    img: U2("1470071459604-3b5ec3a7fe05"), activities: ["Pre-dawn climb to Chandrashila (4,000 m)", "Tungnath, highest of the Panch Kedar", "Deoria Tal lake reflection walk", "Rhododendron forest in April"],
    bestTime: "March – June, September – November", entryFee: "Free", tips: ["Leave camp by 4 am for the summit sunrise.", "The temple closes in winter; the trail stays open with snow.", "Chopta has only basic dhaba stays."] },
  { cat: "walk-the-himalayas", slug: "kheerganga-hot-springs", title: "Kheerganga Hot Springs", location: "Parvati Valley", state: "Himachal Pradesh",
    desc: "A half-day forest climb along the Parvati river to a natural hot spring at 3,000 m, with a temple pool and wide valley views.",
    img: U2("1441974231531-c6227db76b6e"), activities: ["12 km round-trip hike from Barshaini", "Soak in the sulphur hot spring", "Waterfalls and pine forest en route", "Camp or stay in a stone guesthouse"],
    bestTime: "April – November", entryFee: "Free", tips: ["Start from Barshaini, not Kalga, for the gentler trail.", "Carry a torch — the descent takes longer than you think.", "Respect the separate men's and women's bathing times."] },

  /* ── Eat Like a Local ───────────────────────────────────────────────── */
  { cat: "eat-like-a-local", slug: "old-delhi-food-walk", title: "Old Delhi Food Walk", location: "Chandni Chowk, Delhi", state: "Delhi",
    desc: "A three-hour graze through the lanes of Shahjahanabad — parathe wali gali, century-old jalebi, kachoris and the kebabs of Matia Mahal.",
    img: U2("1585937421612-70a008356fbe"), activities: ["Paranthe Wali Gali breakfast", "Old Famous Jalebi Wala", "Karim's & Matia Mahal kebabs", "Spice market at Khari Baoli"],
    bestTime: "October – March, mornings or evenings", entryFee: "Walk from ₹1,500 pp incl. tastings", timings: "Shops open ~9 am; kebab lane best after sunset", tips: ["Come hungry and pace yourself across 6–8 stops.", "Carry cash in small notes.", "Fridays are busy near Jama Masjid."] },
  { cat: "eat-like-a-local", slug: "amritsar-langar-and-kulcha", title: "Amritsar Langar & Kulcha", location: "Amritsar", state: "Punjab",
    desc: "Roll chapatis in the world's largest free kitchen at the Golden Temple, then eat amritsari kulcha and lassi where locals do.",
    img: U2("1516026672322-bc52d61a55d5"), activities: ["Volunteer (seva) in the Golden Temple langar", "Amritsari kulcha at Kulcha Land", "Kesar da Dhaba for dal", "Jallianwala Bagh next door"],
    bestTime: "October – March", entryFee: "Free (langar & temple)", timings: "Langar runs 24 hours", tips: ["Cover your head; scarves are provided at the entrance.", "Seva slots are informal — just join a station.", "Early morning is calmest for the temple."] },
  { cat: "eat-like-a-local", slug: "mumbai-street-food-crawl", title: "Mumbai Street-Food Crawl", location: "Mumbai", state: "Maharashtra",
    desc: "Vada pav at a station stall, bhel on Chowpatty, and a bun-maska with chai in a fading Irani café — the city eaten standing up.",
    img: U2("1585937421612-70a008356fbe"), activities: ["Vada pav & misal pav", "Bhelpuri on Girgaon Chowpatty", "Irani café bun-maska & chai", "Mohammed Ali Road in Ramzan"],
    bestTime: "November – February; evenings", entryFee: "Guided crawl from ₹1,800 pp", timings: "Beach stalls best 5–9 pm", tips: ["Pick busy stalls with high turnover.", "Ask for less spice if you're unsure.", "Local trains between stops are part of the fun off-peak."] },
  { cat: "eat-like-a-local", slug: "kerala-sadya-cooking-class", title: "Kerala Sadya Cooking Class", location: "Fort Kochi", state: "Kerala",
    desc: "Cook a full vegetarian feast — avial, thoran, sambar, olan and payasam — with a home cook, then eat it off a banana leaf.",
    img: U2("1602216056096-3b40cc0c9944"), activities: ["Market visit for coconut & curry leaves", "Grinding a fresh masala", "Plating a banana-leaf sadya", "Payasam and filter coffee to finish"],
    bestTime: "September – March", entryFee: "Class from ₹2,000 pp", timings: "Half-day, morning or afternoon", tips: ["Come on an empty stomach.", "Vegan and Jain versions are easy to arrange.", "You'll leave with the recipe card."], packages: ["kerala"] },

  /* ── Meet the Makers ────────────────────────────────────────────────── */
  { cat: "meet-the-makers", slug: "nirona-copper-bells", title: "Nirona Copper Bells", location: "Nirona, Kutch", state: "Gujarat",
    desc: "The Luhar family has tuned copper-coated iron bells by ear for seven generations. Spend a morning at the forge and take home one you helped shape.",
    img: U2("1528323273322-d81458248d40"), activities: ["Watch a bell hand-forged and tuned", "Try the coating and firing yourself", "Rogan art demo next door", "Lacquer-turning in the same village"],
    bestTime: "November – February", entryFee: "Workshop ≈ ₹500 pp", timings: "9 am – 5 pm", tips: ["Nirona is 40 km from Bhuj — pair it with Ajrakhpur.", "Bells are graded by pitch, not size.", "Cash only in the village."], packages: ["kutch"] },
  { cat: "meet-the-makers", slug: "bhujodi-handloom-weaving", title: "Bhujodi Handloom Weaving", location: "Bhujodi, Kutch", state: "Gujarat",
    desc: "A weavers' village where Vankar families work pit looms in their courtyards. Sit at a loom, throw a few shuttles, and understand why a shawl takes days.",
    img: U2("1524492412937-b28074a5d7da"), activities: ["Try weaving on a pit loom", "Natural-dye demonstration", "Vankar Vishram Valji's studio & museum", "Bhirandiyara for mawa on the way"],
    bestTime: "November – February", entryFee: "Studio visit free; workshop ≈ ₹800", timings: "10 am – 6 pm", tips: ["Ask before photographing inside homes.", "Buy directly from the weaver, not the highway shops.", "The Kala Raksha museum is nearby."], packages: ["kutch"] },
  { cat: "meet-the-makers", slug: "blue-pottery-jaipur", title: "Blue Pottery Studio, Jaipur", location: "Jaipur", state: "Rajasthan",
    desc: "A Persian craft that reached Jaipur via Kashmir and Delhi, made with no clay at all — quartz, glass and borax. Throw, paint and glaze your own tile.",
    img: U2("1528323273322-d81458248d40"), activities: ["Shape a piece from the quartz dough", "Paint the cobalt-blue motifs", "Tour a working kiln", "Kripal Kumbh legacy studio"],
    bestTime: "October – March", entryFee: "Workshop from ₹1,200 pp", timings: "Half-day sessions", tips: ["Pieces are fired later and shipped — allow 2 weeks.", "Combine with a walk through the pink-city bazaars.", "The blue comes from cobalt; the green from copper."], packages: ["rajasthan"] },
  { cat: "meet-the-makers", slug: "channapatna-lacquer-toys", title: "Channapatna Lacquer Toys", location: "Channapatna", state: "Karnataka",
    desc: "The 'toy town' between Bengaluru and Mysuru, where ivory-wood is turned on a lathe and coloured with food-safe lac. A GI craft kept alive by co-operatives.",
    img: U2("1528323273322-d81458248d40"), activities: ["Turn a spinning top on a hand lathe", "Watch lac colour applied by friction", "Visit the Maya Organic / Bharat Ratna workshops", "Toy market on the highway"],
    bestTime: "Year-round", entryFee: "Workshop ≈ ₹600 pp", timings: "9:30 am – 5 pm", tips: ["Ask for the natural-dye pieces.", "It's an easy day trip from Bengaluru (60 km).", "Great for gifts for kids — non-toxic by design."] },

  /* ── Live Rural India ───────────────────────────────────────────────── */
  { cat: "live-rural-india", slug: "spiti-homestay-network", title: "Spiti Homestay Network", location: "Demul & Komic, Spiti", state: "Himachal Pradesh",
    desc: "A rotation-based homestay system in villages above 4,000 m that spreads income evenly and lets you live a Spitian day — yak, barley, butter tea and all.",
    img: U2("1595815771614-ade9d652a65d"), activities: ["Help with the morning farm chores", "Yak ride between Demul and Lhalung", "Fossil hunting near Langza", "Komic — one of the world's highest villages"],
    bestTime: "June – September", entryFee: "Homestay ≈ ₹1,200 pp incl. meals", timings: "—", tips: ["Only BSNL has signal; treat it as a detox.", "Carry cash; there are no ATMs past Kaza.", "Nights drop below freezing even in summer."], packages: ["spiti-valley"] },
  { cat: "live-rural-india", slug: "hodka-bhungas", title: "Hodka Bhunga Village", location: "Hodka, Kutch", state: "Gujarat",
    desc: "A community-run resort of mud-and-mirror bhungas on the edge of the Banni grasslands, staffed and owned by the village.",
    img: U2("1516026672322-bc52d61a55d5"), activities: ["Stay in a hand-painted bhunga", "Meghwal and Mutwa embroidery demos", "Sunset at the White Rann (25 km)", "Folk music around the fire"],
    bestTime: "November – February", entryFee: "Stay from ₹3,000 per bhunga", timings: "—", tips: ["Book ahead in the Rann Utsav season.", "The grasslands are good for birding at dawn.", "Profits go back into village schools and water."], packages: ["kutch"] },
  { cat: "live-rural-india", slug: "mawlynnong-cleanest-village", title: "Mawlynnong", location: "Mawlynnong", state: "Meghalaya",
    desc: "Asia's 'cleanest village' — a Khasi community that runs its own tourism, composts everything, and grows living-root bridges from rubber-fig roots.",
    img: U2("1614531341773-3bff8b7cb3fc"), activities: ["Walk to the single-decker living-root bridge", "Climb the bamboo Sky View tower", "Balancing Rock", "Homestay with a Khasi family"],
    bestTime: "October – April", entryFee: "Village entry ≈ ₹50", timings: "—", tips: ["It's 90 km from Shillong on a winding road.", "The double-decker bridge is at Nongriat, a separate trek.", "Carry your waste out — the village will notice."] },
  { cat: "live-rural-india", slug: "kumbalangi-model-village", title: "Kumbalangi Model Village", location: "Kumbalangi, Kochi", state: "Kerala",
    desc: "India's first eco-tourism village — a backwater island of coir-makers, clam-collectors and Chinese fishing nets, 20 minutes from Fort Kochi.",
    img: U2("1602216056096-3b40cc0c9944"), activities: ["Operate a Chinese fishing net", "Coir-spinning and toddy-tapping", "Crab farm and clam-picking", "Canoe through the mangroves"],
    bestTime: "September – March", entryFee: "Experiences ≈ ₹400 each", timings: "Day visits", tips: ["Go by ferry for the scenic approach.", "Lunch is a village home's fish curry.", "Sunset over the nets is the shot."], packages: ["kerala"] },

  /* ── Follow the Rivers ──────────────────────────────────────────────── */
  { cat: "follow-the-rivers", slug: "ganga-rafting-rishikesh", title: "Ganga Rafting, Rishikesh", location: "Rishikesh", state: "Uttarakhand",
    desc: "The classic 16 km run from Brahmapuri to Rishikesh — Grade II–III rapids with names like Roller Coaster and Golf Course, plus a cliff jump.",
    img: U2("1530866495561-507c9faab2ed"), activities: ["16 km rafting with a cliff jump", "Body-surfing a calm stretch", "Kayak clinic for beginners", "Riverside camp on the sand"],
    bestTime: "September – June (closed in the monsoon)", entryFee: "From ₹600 pp for the 16 km stretch", timings: "Slots from ~9 am", tips: ["Non-swimmers are fine — life jackets and guides.", "Wear quick-dry clothes and secure your glasses.", "The 26 km run from Marine Drive is for stronger groups."], packages: ["rishikesh"] },
  { cat: "follow-the-rivers", slug: "zanskar-chadar-walk", title: "The Chadar — Frozen Zanskar", location: "Zanskar, Ladakh", state: "Ladakh",
    desc: "For a few weeks in deep winter the Zanskar river freezes into a walkable sheet of ice through a gorge — the only route the Zanskaris had for centuries.",
    img: U2("1519681393784-d120267933ba"), activities: ["Walk the ice between vertical cliffs", "Camp in riverside caves", "The frozen Nerak waterfall", "Meet Zanskari families en route"],
    bestTime: "Mid-January – mid-February", entryFee: "Permits & ALTOA fees apply", timings: "Multi-day expedition", tips: ["Temperatures hit −25 °C; this needs real preparation.", "Mandatory acclimatisation and medical check in Leh.", "Ice conditions change daily — the guide decides the route."], packages: ["chadar-trek"] },
  { cat: "follow-the-rivers", slug: "alleppey-backwater-houseboat", title: "Alleppey Backwater Houseboat", location: "Alappuzha", state: "Kerala",
    desc: "A night on a converted rice barge (kettuvallam), drifting past paddy fields below sea level, toddy shops and villages that face the water.",
    img: U2("1602216056096-3b40cc0c9944"), activities: ["Overnight on a kettuvallam", "Village canoe ride into the narrow canals", "Karumadi and Kuttanad paddy country", "Sunset with fresh karimeen fry"],
    bestTime: "September – March", entryFee: "Houseboats from ₹8,000 per night", timings: "Board ~12 pm, disembark ~9 am", tips: ["A weekday booking dodges the boat traffic.", "Ask for a boat that actually moves, not a moored one.", "Smaller boats reach the prettier back-canals."], packages: ["kerala"] },
  { cat: "follow-the-rivers", slug: "majuli-brahmaputra-island", title: "Majuli — Brahmaputra River Island", location: "Majuli", state: "Assam",
    desc: "One of the world's largest river islands and the heart of Assam's neo-Vaishnavite culture, with monastic satras that teach mask-making and dance.",
    img: U2("1614531341773-3bff8b7cb3fc"), activities: ["Ferry across the Brahmaputra from Nimati Ghat", "Samaguri Satra mask-making", "Mishing tribal stilt-house stay", "Sunrise birding on the sandbars"],
    bestTime: "November – March", entryFee: "Ferry ≈ ₹15; satra donations", timings: "Ferries run morning & afternoon only", tips: ["The island shrinks every year to erosion — go soon.", "Cycle or scooter to get between satras.", "Raas Leela in November is the big festival."] },

  /* ── Enter the Wild ─────────────────────────────────────────────────── */
  { cat: "enter-the-wild", slug: "ranthambhore-tiger-safari", title: "Ranthambhore Tiger Safari", location: "Sawai Madhopur", state: "Rajasthan",
    desc: "Tigers among the ruins of a 10th-century fort and its lakes — one of the best places in India to actually see one in daylight.",
    img: U2("1549366021-9f761d450615"), activities: ["Morning & afternoon jeep/canter safari", "Zones 1–5 around the lakes", "Ranthambhore Fort walk", "Village Walk with a local naturalist"],
    bestTime: "October – June (April–June for sightings)", entryFee: "Jeep safari from ₹1,800 pp", timings: "Two fixed slots, dawn and mid-afternoon", tips: ["Book safaris 90 days out — permits sell fast.", "Zones 1–5 are the core; 6–10 are quieter.", "Carry a zoom lens and neutral clothes."], packages: ["rajasthan"] },
  { cat: "enter-the-wild", slug: "kaziranga-rhino-safari", title: "Kaziranga Rhino Safari", location: "Kaziranga", state: "Assam",
    desc: "Two-thirds of the world's one-horned rhinos live in this floodplain of the Brahmaputra, alongside wild buffalo, elephants and a dense tiger population.",
    img: U2("1549366021-9f761d450615"), activities: ["Elephant-back safari at dawn (Central range)", "Jeep safari in Western & Eastern ranges", "Birding at the Eastern range beels", "Tea-estate stay on the park edge"],
    bestTime: "November – April (park closed in the monsoon)", entryFee: "Jeep ≈ ₹2,300; elephant ≈ ₹1,500 pp", timings: "Morning & afternoon slots", tips: ["The Central (Kohora) range has the highest rhino density.", "Fly to Jorhat, 1.5 hrs away.", "Layers — dawn is cold on the grassland."] },
  { cat: "enter-the-wild", slug: "sundarbans-mangrove-boat", title: "Sundarbans Mangrove Boat Safari", location: "Sundarbans", state: "West Bengal",
    desc: "The largest mangrove forest on earth and the only one with tigers that swim. You explore it slowly, by boat, through a maze of tidal channels.",
    img: U2("1441974231531-c6227db76b6e"), activities: ["Slow boat through the tidal creeks", "Sajnekhali and Sudhanyakhali watchtowers", "Village folk-theatre on Bonbibi", "Sunrise from the boat deck"],
    bestTime: "November – February", entryFee: "Permit + boat ≈ ₹1,500 pp/day", timings: "Overnight boat or lodge trips", tips: ["Tiger sightings are rare — come for the ecosystem.", "Irrawaddy dolphins in the wider channels.", "Carry binoculars; distances on the water are large."] },
  { cat: "enter-the-wild", slug: "periyar-bamboo-rafting", title: "Periyar Bamboo Rafting", location: "Thekkady", state: "Kerala",
    desc: "A quiet day rafting and trekking inside the Periyar Tiger Reserve with former poachers turned guides — the reserve's model conservation programme.",
    img: U2("1602216056096-3b40cc0c9944"), activities: ["Bamboo raft on Periyar Lake", "Guided forest trek with ex-poacher guides", "Elephant and gaur herds at the shore", "Border Hiking and Jungle Patrol options"],
    bestTime: "September – March", entryFee: "Bamboo rafting ≈ ₹2,000 pp", timings: "Full-day, starts ~8 am", tips: ["Book the eco-tourism programmes, not the boat-jetty crowd.", "Leeches after rain — carry socks and salt.", "Groups are capped small; reserve ahead."], packages: ["kerala"] },

  /* ── Walk Through Living History ────────────────────────────────────── */
  { cat: "living-history", slug: "taj-mahal", title: "Taj Mahal", location: "Agra", state: "Uttar Pradesh",
    desc: "The white-marble mausoleum on the Yamuna — a Mughal love letter and a UNESCO World Heritage Site that still stops people mid-sentence.",
    history: "Commissioned by Shah Jahan in 1631 for Mumtaz Mahal; completed around 1653 by some 20,000 artisans and a thousand elephants.",
    img: U2("1564507592333-c60657eea523"), activities: ["Sunrise entry from the East Gate", "Marble-inlay (pietra dura) workshop in Agra", "Mehtab Bagh sunset view across the river", "Agra Fort, where Shah Jahan was imprisoned"],
    bestTime: "October – March, at sunrise", entryFee: "₹50 (Indian) / ₹1,100 (foreign) + ₹200 mausoleum", timings: "Sunrise to sunset, closed Fridays", tips: ["East Gate has the shortest queues at opening.", "Only phones and small cameras inside the mausoleum.", "Allow 2–3 hours including security."], packages: ["rajasthan", "taj-mahal"] },
  { cat: "living-history", slug: "mehrangarh-fort", title: "Mehrangarh Fort", location: "Jodhpur", state: "Rajasthan",
    desc: "A fort that grows straight out of a 120 m cliff over the blue city — and one of the best-run museum forts in India.",
    history: "Founded by Rao Jodha in 1459 when he moved the Marwar capital; expanded over five centuries by successive Rathore rulers.",
    img: U2("1477587458883-47145ed94245"), activities: ["Audio-guided museum tour", "Zip-line over the fort walls", "Blue-city walk below the ramparts", "Chokelao Bagh stepped garden"],
    bestTime: "October – March", entryFee: "≈ ₹100 (Indian) / ₹600 (foreign)", timings: "9 am – 5 pm", tips: ["The audio guide is genuinely good — take it.", "Go early; the courtyards get hot by noon.", "RIFF music festival is around Sharad Purnima (Oct)."], packages: ["rajasthan"] },
  { cat: "living-history", slug: "hampi-ruins", title: "Hampi", location: "Hampi", state: "Karnataka",
    desc: "The boulder-strewn capital of the Vijayanagara empire — temples, a stone chariot, elephant stables and a river you cross by coracle.",
    history: "Capital of the Vijayanagara empire from 1336; one of the richest cities in the world before it was sacked in 1565 and abandoned.",
    img: U2("1477587458883-47145ed94245"), activities: ["Virupaksha Temple & the Hampi Bazaar", "Vittala Temple stone chariot and musical pillars", "Sunrise from Matanga Hill", "Coracle ride across the Tungabhadra"],
    bestTime: "October – February", entryFee: "Combined ticket ≈ ₹40 (Indian) / ₹600 (foreign)", timings: "6 am – 6 pm", tips: ["Rent a cycle or scooter — the site is spread over 25 km².", "The Hippie Island side has the sunset spots.", "Two full days does it justice."] },
  { cat: "living-history", slug: "rani-ki-vav-stepwell", title: "Rani ki Vav Stepwell", location: "Patan", state: "Gujarat",
    desc: "An 11th-century stepwell built as an inverted temple, seven storeys down, with over 500 principal sculptures. On the ₹100 note for a reason.",
    history: "Commissioned around 1063 by Queen Udayamati in memory of King Bhima I; silted over by the Saraswati river and only fully excavated in the 1980s.",
    img: U2("1524492412937-b28074a5d7da"), activities: ["Descend the seven sculpted levels", "Spot the Dashavatara panels", "Sahastralinga Talav water tank nearby", "Patan patola double-ikat weaving in town"],
    bestTime: "November – February", entryFee: "≈ ₹40 (Indian) / ₹600 (foreign)", timings: "8 am – 6 pm", tips: ["Morning light reaches deepest into the well.", "Combine with the Modhera Sun Temple, 30 km away.", "Patan is 2 hours from Ahmedabad."] },

  /* ── Understand India's Spirituality ───────────────────────────────── */
  { cat: "indias-spirituality", slug: "ganga-aarti-varanasi", title: "Ganga Aarti, Varanasi", location: "Varanasi", state: "Uttar Pradesh",
    desc: "The nightly fire ceremony at Dashashwamedh Ghat, best watched from a boat as the whole riverfront of the world's oldest living city lights up.",
    history: "Varanasi (Kashi) has been a pilgrimage centre for at least 3,000 years; the organised evening aarti in its current form dates to the 1990s.",
    img: U2("1591017403286-fd8493524e1e"), activities: ["Evening aarti from a rowboat", "Sunrise boat past the bathing ghats", "Walk the galis to the Kashi Vishwanath corridor", "Sarnath, where the Buddha first taught (10 km)"],
    bestTime: "October – March", entryFee: "Free; shared boat ≈ ₹150 pp", timings: "Aarti ~6:45 pm (earlier in winter)", tips: ["Reach the ghat or boat 45 minutes early.", "Manikarnika is a cremation ghat — no photos.", "A local guide makes the old-city lanes navigable."] },
  { cat: "indias-spirituality", slug: "golden-temple-amritsar", title: "Golden Temple", location: "Amritsar", state: "Punjab",
    desc: "Harmandir Sahib — a gold-leafed shrine on a lake, open on all four sides, where 100,000 people are fed free every day and anyone can help.",
    history: "The pool was completed in 1577 by Guru Ram Das; the central shrine by Guru Arjan in 1604, who installed the first copy of the Guru Granth Sahib.",
    img: U2("1516026672322-bc52d61a55d5"), activities: ["Pre-dawn Palki Sahib ceremony", "Seva (volunteering) in the langar or dish hall", "Walk the parikrama around the sarovar", "Partition Museum, 10 minutes away"],
    bestTime: "October – March", entryFee: "Free", timings: "Open 24 hours; quietest 4–6 am", tips: ["Heads must be covered; scarves at the entrance.", "Leave shoes at the free counter and wash your feet.", "The night is the most peaceful time to visit."] },
  { cat: "indias-spirituality", slug: "hemis-monastery", title: "Hemis Monastery", location: "Hemis, Ladakh", state: "Ladakh",
    desc: "The largest and wealthiest gompa in Ladakh, hidden in a gorge, famous for its two-day masked Cham dance festival in early summer.",
    history: "Re-established in 1672 under King Sengge Namgyal; the Hemis festival honours Guru Padmasambhava and runs on the 10th day of the Tibetan lunar month.",
    img: U2("1544735716-392fe2489ffa"), activities: ["Cham masked dances (Hemis Tsechu, Jun–Jul)", "The monastery museum's thangkas", "Short hike to Gotsang hermitage", "Combine with Thiksey and Shey on the same road"],
    bestTime: "June – September (festival in Jun/Jul)", entryFee: "≈ ₹100", timings: "8 am – 6 pm", tips: ["Festival dates shift each year with the lunar calendar.", "Arrive early on festival days for a courtyard spot.", "It's 45 km south of Leh."] },
  { cat: "indias-spirituality", slug: "bodh-gaya-mahabodhi", title: "Mahabodhi Temple, Bodh Gaya", location: "Bodh Gaya", state: "Bihar",
    desc: "The place where the Buddha attained enlightenment, marked by a descendant of the original Bodhi tree and monasteries built by every Buddhist nation.",
    history: "The current temple dates largely to the 5th–6th century Gupta period, on a site marked by Emperor Ashoka around 250 BCE. A UNESCO World Heritage Site.",
    img: U2("1441974231531-c6227db76b6e"), activities: ["Meditate under the Bodhi tree", "Walk the ring of national monasteries", "80 ft Great Buddha Statue", "Dungeshwari caves, where the Buddha fasted"],
    bestTime: "October – March", entryFee: "Free; camera ≈ ₹100", timings: "5 am – 9 pm", tips: ["Winter mornings are misty and cold — carry a shawl.", "The Dalai Lama often teaches here in December–January.", "Gaya is the nearest railhead and airport."] },

  /* ── Learn an Indian Art ───────────────────────────────────────────── */
  { cat: "learn-an-indian-art", slug: "miniature-painting-udaipur", title: "Mewar Miniature Painting", location: "Udaipur", state: "Rajasthan",
    desc: "Sit with a family that has painted in the Mewar style for generations, grind your own colours from stone and gold, and complete a small painting on hand-made paper.",
    img: U2("1528323273322-d81458248d40"), activities: ["Make squirrel-hair brushes and mineral paint", "Learn the 'wasli' paper and burnishing", "Paint a small elephant or peacock", "Studio visits around Lake Pichola"],
    bestTime: "October – March", entryFee: "Half-day class from ₹1,500 pp", timings: "Morning or afternoon", tips: ["No experience needed — beginners finish a piece.", "The fine detail is done with a one- or two-hair brush.", "Pair it with a City Palace visit."], packages: ["rajasthan"] },
  { cat: "learn-an-indian-art", slug: "kathakali-behind-the-scenes", title: "Kathakali — Behind the Makeup", location: "Fort Kochi", state: "Kerala",
    desc: "Arrive early to watch performers spend two hours applying rice-paste and pigment, learn the eye and hand vocabulary, then see the story performed.",
    img: U2("1602216056096-3b40cc0c9944"), activities: ["Watch the chutti makeup being built up", "Learn the nine navarasa expressions", "Try a few mudras (hand gestures)", "Full evening performance with percussion"],
    bestTime: "September – March", entryFee: "Show + demo ≈ ₹500 pp", timings: "Makeup from ~5 pm, show ~6:30 pm", tips: ["Kerala Kathakali Centre and See India Foundation both run daily shows.", "Sit close for the eye work.", "The green face is a hero; red is a villain."], packages: ["kerala"] },
  { cat: "learn-an-indian-art", slug: "madhubani-painting-bihar", title: "Madhubani (Mithila) Painting", location: "Madhubani", state: "Bihar",
    desc: "A folk tradition painted by women on the walls of Mithila for weddings and festivals, now on paper. Learn the line-work and natural colours from a village artist.",
    img: U2("1528323273322-d81458248d40"), activities: ["Learn the kachni (line) and bharni (fill) styles", "Make colour from turmeric, soot and flowers", "Paint a fish or a wedding kohbar motif", "Visit painted homes in Jitwarpur / Ranti"],
    bestTime: "October – March", entryFee: "Workshop from ₹1,000 pp", timings: "Half or full day", tips: ["The double line filled with hatching is the signature.", "Buy directly from the artists' co-operatives.", "Darbhanga is the nearest airport."] },
  { cat: "learn-an-indian-art", slug: "hindustani-music-varanasi", title: "Sitar & Tabla in Varanasi", location: "Varanasi", state: "Uttar Pradesh",
    desc: "The Benares gharana city. Take an introductory lesson from a teaching family, understand raga and taal, and end with a small private recital by the river.",
    img: U2("1591017403286-fd8493524e1e"), activities: ["First lesson on sitar or tabla", "Learn to count a teentaal cycle", "Attend a rooftop mehfil", "Instrument-making workshop visit"],
    bestTime: "October – March", entryFee: "Single lesson from ₹800 pp", timings: "By appointment", tips: ["No musical background needed for a taster.", "Ask about the Dhrupad Mela in February–March.", "The ITC Sangeet Research Academy has archives worth seeing."] },

  /* ── Listen to India's Stories ─────────────────────────────────────── */
  { cat: "indias-stories", slug: "dastangoi-delhi", title: "Dastangoi — Urdu Epic Storytelling", location: "Delhi", state: "Delhi",
    desc: "A 13th-century oral form — two narrators in white, no props, telling the vast Dastan-e-Amir Hamza. Nearly lost, revived in Delhi since 2005.",
    img: U2("1522202176988-66273c2fd55f"), activities: ["Attend a live dastangoi baithak", "Q&A with the dastango on the form", "A short try at narrating a tilism (enchantment)", "Old Delhi walk to the poets' haunts"],
    bestTime: "October – March (performance season)", entryFee: "Tickets ≈ ₹300–500", timings: "Evening baithaks", tips: ["Some understanding of Hindi/Urdu helps but isn't essential.", "Venues: India Habitat Centre, Alliance Française, private havelis.", "Follow Dastangoi Collective for dates."] },
  { cat: "indias-stories", slug: "kaavad-storytelling-rajasthan", title: "Kaavad Portable-Shrine Storytelling", location: "Bassi", state: "Rajasthan",
    desc: "The kaavad is a red wooden box that folds open into panel after painted panel; the kaavadiya bhat opens each door and sings the family and epic stories inside.",
    img: U2("1477587458883-47145ed94245"), activities: ["A full kaavad recitation", "Meet the Suthar makers who build the boxes", "Paint a small panel yourself", "Bassi wood-craft workshops"],
    bestTime: "October – March", entryFee: "Session ≈ ₹800 pp", timings: "By arrangement", tips: ["Bassi is 25 km from Chittorgarh.", "The storyteller and the box-maker are different castes — you can meet both.", "Ask for the Ramayana kaavad; it's the most elaborate."] },
  { cat: "indias-stories", slug: "tholu-bommalata-shadow-puppets", title: "Tholu Bommalata Shadow Puppets", location: "Nimmalakunta", state: "Andhra Pradesh",
    desc: "Translucent goat-hide puppets up to 1.8 m tall, coloured and perforated, throwing coloured shadows on a lamplit screen as the Ramayana is sung all night.",
    img: U2("1528323273322-d81458248d40"), activities: ["Evening shadow-puppet performance", "Watch a puppet cut and dyed from hide", "Try manipulating a puppet behind the screen", "The Dharmavaram silk-weaving town nearby"],
    bestTime: "November – February", entryFee: "Performance ≈ ₹500 pp", timings: "After dark", tips: ["Nimmalakunta is the surviving puppeteer village, near Anantapur.", "The families now also make lampshades to stay afloat — buy one.", "Performances are traditionally all night; ask for a short set."] },
  { cat: "indias-stories", slug: "patua-scroll-singers-bengal", title: "Patua Scroll Singers", location: "Naya, Pingla", state: "West Bengal",
    desc: "In one village, families paint long vertical scrolls (patachitra) and then sing them — each frame a verse — on subjects from myth to the news.",
    img: U2("1524492412937-b28074a5d7da"), activities: ["A patua unrolls and sings a scroll", "Watch a scroll painted with natural colour", "The annual POT Maya festival (November)", "Paint on a terracotta pot or a sari border"],
    bestTime: "October – March (festival in November)", entryFee: "Song + scroll demo ≈ ₹400 pp", timings: "Daytime visits", tips: ["Naya is 2.5 hours from Kolkata via Pingla.", "The whole village paints — walk in and knock.", "Buy a scroll straight from the singer."] },
];

const ATTRACTIONS = ATTRACTION_DATA.map((a, i) => ({
  slug: a.slug,
  title: a.title,
  category: a.cat,
  description: a.desc,
  history: a.history || "",
  heroImage: a.img,
  gallery: S([a.img, IMG.mountains, IMG.village]),
  activities: S(a.activities),
  location: a.location,
  state: a.state,
  bestTime: a.bestTime,
  entryFee: a.entryFee || "Varies — enquire",
  timings: a.timings || "",
  travelTips: S(a.tips),
  nearbyHotels: S([]),
  restaurants: S([]),
  packages: S(a.packages || []),
  faqs: S(a.faqs || []),
  seoTitle: `${a.title} | Ibex Adventure`,
  seoDescription: a.desc.slice(0, 155),
  published: true,
  featured: i % 10 < 3,
  displayOrder: i + 1,
}));

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

  await prisma.adventureCategory.deleteMany({
    where: { slug: { notIn: EXPERIENCE_CATEGORIES.map((c) => c[1]) } },
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

  /* Flagship journeys — only these six are featured on the homepage */
  await prisma.package.updateMany({
    where: { slug: { notIn: HERO_JOURNEYS.map((j) => j.slug) } },
    data: { isFeatured: false },
  });
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

  /* Destinations + Attractions (drop rows no longer in the seed) */
  await upsertMany("Destination", DESTINATIONS, async (d) => {
    await prisma.destination.upsert({ where: { slug: d.slug }, update: d, create: d });
  });
  await prisma.attraction.deleteMany({
    where: { slug: { notIn: ATTRACTIONS.map((a) => a.slug) } },
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

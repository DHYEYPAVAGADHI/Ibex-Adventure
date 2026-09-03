/**
 * One-off: give the three stub packages real content + assign working
 * thumbnails/galleries to every trek that is missing one.
 * Run: node scripts/fix-packages.mjs
 */
import fs from "fs";

process.env.DATABASE_URL = fs
  .readFileSync(new URL("../.env", import.meta.url), "utf8")
  .match(/DATABASE_URL="([^"]+)"/)[1];

const { PrismaClient } = await import("@prisma/client");
const { Pool } = await import("pg");
const { PrismaPg } = await import("@prisma/adapter-pg");
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 1 });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const U = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const S = JSON.stringify;

const MOUNTAIN = [
  "1464822759023-fed622ff2c3b", "1454496522488-7a8e488e8606", "1470071459604-3b5ec3a7fe05",
  "1544735716-392fe2489ffa", "1483921020237-2ff51e8e4b22", "1472099645785-5658abf4ff4e",
  "1522163182402-834f871fd851", "1519681393784-d120267933ba", "1469474968028-56623f02e42e",
  "1426604966848-d7adac402bff", "1501785888041-af3ef285b470", "1544644181-1484b3fdfc62",
  "1571536802807-30451e3955d8", "1613977257363-707ba9348227",
];

const STUBS = {
  manali: {
    title: "Manali Adventure Week",
    category: "Adventure",
    categorySlug: "adventure",
    shortDescription: "THE HIMALAYAN ADVENTURE HUB.",
    overview:
      "Paragliding over Solang. Rafting the Beas. Trekking to a shepherd's meadow.\nManali packs a week of mountain adventure into one valley.",
    description:
      "<p>Manali is the easiest place in India to string together a week of real mountain adventure — rafting, paragliding, a short trek and a high-pass drive — with hot showers and good food every night.</p>",
    duration: "5N / 6D",
    difficulty: "Easy-Moderate",
    price: "13,500",
    ageGroupMin: 12,
    maxGroupSize: 16,
    season: "Mar - Jun, Sep - Nov",
    location: "Manali",
    meetingPoint: "Manali",
    tags: S(["Adventure", "Rafting", "Paragliding", "Himachal"]),
    highlights: S([
      { icon: "Waves", text: "Raft 14 km of Grade II–III rapids on the Beas." },
      { icon: "Mountain", text: "Tandem paragliding flight over the Solang Valley." },
      { icon: "Tent", text: "Overnight trek to the Lamadugh meadow." },
      { icon: "Map", text: "Drive over the Atal Tunnel into the Lahaul Valley." },
    ]),
    itinerary: S([
      { day: "1", title: "Arrive Manali", bullets: ["Check in to Old Manali", "Hadimba Temple", "Mall Road evening"] },
      { day: "2", title: "Rafting & Solang", bullets: ["Beas river rafting", "Solang Valley activities", "Zip-line & ATV"] },
      { day: "3", title: "Paragliding day", bullets: ["Tandem flight from Gulaba/Marhi", "Vashisht hot springs"] },
      { day: "4", title: "Lamadugh trek", bullets: ["Trek through cedar forest", "Camp at the meadow", "Sunset over Deo Tibba"] },
      { day: "5", title: "Atal Tunnel & Sissu", bullets: ["Cross into Lahaul", "Sissu waterfall & lake", "Return to Manali"] },
      { day: "6", title: "Departure", bullets: ["Cafe breakfast in Old Manali", "Trip ends"] },
    ]),
    inclusions: S(["Accommodation (3N Manali + 1N camp)", "Breakfast & dinner", "All listed activities & gear", "Transport within Manali", "Trip leader"]),
    exclusions: S(["Travel to Manali", "Lunches", "Personal expenses", "Any activity not listed"]),
    faqs: S([{ question: "Is paragliding safe for beginners?", answer: "Yes — all flights are tandem with a certified pilot and full safety gear." }]),
    thumbnail: "/uploads/Uncategorized/manali0003-224d901ef448ddc4.webp",
    images: S([
      "/uploads/Uncategorized/manali0003-224d901ef448ddc4.webp",
      "/uploads/Uncategorized/manali0003-2b478efa545f5660.webp",
      "/uploads/Uncategorized/Manikaran_near_kasol-86a06182d3f80de5.webp",
      U("1530866495561-507c9faab2ed"),
    ]),
  },
  leh: {
    title: "Leh Ladakh Road Trip",
    category: "Adventure",
    categorySlug: "adventure",
    shortDescription: "THE CLASSIC HIMALAYAN ROAD TRIP.",
    overview:
      "Nine days on the highest roads in the world.\nMonasteries, lakes and passes above 5,000 m — by shared SUV or motorbike.",
    description:
      "<p>The self-drive / ride version of a Ladakh trip: Leh acclimatization, Nubra, Pangong and Tso Moriri, driving the passes yourself with a lead vehicle and mechanic in support.</p>",
    duration: "8N / 9D",
    difficulty: "Moderate",
    price: "22,999",
    ageGroupMin: 18,
    maxGroupSize: 12,
    season: "Jun - Sep",
    location: "Leh",
    meetingPoint: "Leh",
    tags: S(["Road Trip", "Motorbike", "Mountains", "Ladakh"]),
    highlights: S([
      { icon: "Map", text: "Ride Khardung La, Chang La and Tanglang La." },
      { icon: "Waves", text: "Camp beside Pangong Tso and Tso Moriri." },
      { icon: "Landmark", text: "Thiksey, Diskit and Hemis monasteries." },
      { icon: "Users", text: "Backup vehicle, mechanic and oxygen throughout." },
    ]),
    itinerary: S([
      { day: "1", title: "Arrive Leh", bullets: ["Rest & acclimatize", "Bike/vehicle allocation"] },
      { day: "2", title: "Leh acclimatization ride", bullets: ["Sangam & Magnetic Hill", "Gurudwara Pathar Sahib", "Shanti Stupa"] },
      { day: "3", title: "Leh to Nubra", bullets: ["Khardung La", "Diskit Monastery", "Hunder dunes"] },
      { day: "4", title: "Nubra to Pangong", bullets: ["Shyok river route", "Camp at Pangong"] },
      { day: "5", title: "Pangong to Hanle", bullets: ["Loma checkpost", "Hanle observatory village"] },
      { day: "6", title: "Hanle to Tso Moriri", bullets: ["Off-road plateau drive", "Korzok village"] },
      { day: "7", title: "Tso Moriri to Leh", bullets: ["Tanglang La", "Return to Leh"] },
      { day: "8", title: "Buffer / Leh", bullets: ["Weather buffer day", "Leh market & cafes"] },
      { day: "9", title: "Departure", bullets: ["Fly out of Leh"] },
    ]),
    inclusions: S(["Hotels in Leh + camps", "All meals", "Motorbike/SUV, fuel & permits", "Backup vehicle & mechanic", "Trip leader"]),
    exclusions: S(["Flights to Leh", "Bike damage/security deposit", "Personal riding gear"]),
    faqs: S([{ question: "Do I need a big-bike licence?", answer: "A valid two-wheeler licence and prior mountain-riding experience are required for the ride option." }]),
    thumbnail: U("1544735716-392fe2489ffa"),
    images: S([U("1544735716-392fe2489ffa"), U("1626621341517-bbf3d9990a23"), U("1506905925346-21bda4d32df4"), U("1533105079780-92b9be482077")]),
  },
  "taj-mahal": {
    title: "Golden Triangle Heritage Trail",
    category: "Heritage",
    categorySlug: "heritage",
    shortDescription: "DELHI. AGRA. JAIPUR.",
    overview:
      "The Taj at sunrise. Amber Fort by jeep. Old Delhi by rickshaw.\nIndia's most famous circuit, done with a historian.",
    description:
      "<p>The Golden Triangle everyone means when they say 'India for the first time' — but slowed down, with a historian, street food walks and time to actually sit inside the monuments.</p>",
    duration: "5N / 6D",
    difficulty: "Easy",
    price: "15,999",
    ageGroupMin: 8,
    maxGroupSize: 18,
    season: "Oct - Mar",
    location: "New Delhi",
    meetingPoint: "New Delhi",
    tags: S(["Heritage", "History", "Culture", "First Trip"]),
    highlights: S([
      { icon: "Landmark", text: "Taj Mahal at sunrise from the East Gate." },
      { icon: "Map", text: "Old Delhi food & spice-market walk." },
      { icon: "Users", text: "Amber Fort and a Jaipur block-printing workshop." },
      { icon: "Heart", text: "Mehtab Bagh sunset view of the Taj." },
    ]),
    itinerary: S([
      { day: "1", title: "Delhi", bullets: ["Humayun's Tomb", "Qutub Minar", "Old Delhi rickshaw & street food"] },
      { day: "2", title: "Delhi to Agra", bullets: ["Drive via Yamuna Expressway", "Agra Fort", "Mehtab Bagh sunset"] },
      { day: "3", title: "Agra", bullets: ["Taj Mahal at sunrise", "Marble-inlay workshop", "Drive to Jaipur via Fatehpur Sikri"] },
      { day: "4", title: "Jaipur", bullets: ["Amber Fort", "City Palace & Jantar Mantar", "Bazaar walk"] },
      { day: "5", title: "Jaipur", bullets: ["Block-printing workshop", "Nahargarh sunset", "Farewell dinner"] },
      { day: "6", title: "Departure", bullets: ["Transfer to Jaipur airport / Delhi", "Trip ends"] },
    ]),
    inclusions: S(["4-star hotels", "Breakfast daily + 2 dinners", "AC transport", "Historian-guided tours", "Monument entries"]),
    exclusions: S(["Flights", "Lunches", "Camera fees at monuments"]),
    faqs: S([{ question: "Is the Taj closed any day?", answer: "Yes, every Friday. Our itinerary is built around that." }]),
    thumbnail: U("1564507592333-c60657eea523"),
    images: S([U("1564507592333-c60657eea523"), U("1477587458883-47145ed94245"), U("1524492412937-b28074a5d7da")]),
  },
};

let n = 0;
for (const [slug, data] of Object.entries(STUBS)) {
  const existing = await prisma.package.findUnique({ where: { slug } });
  if (!existing) {
    console.log(`skip ${slug} (not found)`);
    continue;
  }
  await prisma.package.update({
    where: { slug },
    data: {
      ...data,
      gallery: data.images,
      publishStatus: "Published",
      status: "active",
      seoTitle: `${data.title} | Ibex Adventure`,
      seoDescription: data.overview.replace(/\n/g, " ").slice(0, 155),
    },
  });
  console.log(`fixed ${slug} -> ${data.title} (₹${data.price})`);
  n++;
}

// Assign working imagery to any package still missing a thumbnail.
const broken = await prisma.package.findMany({
  where: { OR: [{ thumbnail: null }, { thumbnail: "" }] },
});
for (let i = 0; i < broken.length; i++) {
  const p = broken[i];
  const a = U(MOUNTAIN[i % MOUNTAIN.length]);
  const b = U(MOUNTAIN[(i + 5) % MOUNTAIN.length]);
  await prisma.package.update({
    where: { id: p.id },
    data: { thumbnail: a, images: S([a, b]), gallery: S([a, b]) },
  });
  console.log(`imaged ${p.slug}`);
  n++;
}

console.log(`\n${n} updates.`);
await pool.end();

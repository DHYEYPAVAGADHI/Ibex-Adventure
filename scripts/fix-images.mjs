/**
 * Walk every Package / Destination / Attraction / Memory / HeroSection /
 * AdventureCategory / HomepageAdventureCard image field, HEAD-check each URL,
 * and replace any that 404 with a working themed image.
 * Run: node scripts/fix-images.mjs
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

const U = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const POOL = [
  "1464822759023-fed622ff2c3b", "1454496522488-7a8e488e8606", "1470071459604-3b5ec3a7fe05",
  "1544735716-392fe2489ffa", "1483921020237-2ff51e8e4b22", "1472099645785-5658abf4ff4e",
  "1522163182402-834f871fd851", "1519681393784-d120267933ba", "1469474968028-56623f02e42e",
  "1426604966848-d7adac402bff", "1501785888041-af3ef285b470", "1544644181-1484b3fdfc62",
  "1571536802807-30451e3955d8", "1613977257363-707ba9348227", "1506905925346-21bda4d32df4",
  "1441974231531-c6227db76b6e", "1504280390367-361c6d9f38f4", "1530866495561-507c9faab2ed",
  "1477587458883-47145ed94245", "1564507592333-c60657eea523", "1528323273322-d81458248d40",
  "1585937421612-70a008356fbe", "1549366021-9f761d450615", "1516026672322-bc52d61a55d5",
  "1602216056096-3b40cc0c9944", "1591017403286-fd8493524e1e",
];

const cache = new Map();
async function ok(url) {
  if (!url || typeof url !== "string") return false;
  if (url.startsWith("/")) return fs.existsSync(new URL(`../public${url}`, import.meta.url));
  if (cache.has(url)) return cache.get(url);
  try {
    const res = await fetch(url, { method: "HEAD" });
    const good = res.ok;
    cache.set(url, good);
    return good;
  } catch {
    cache.set(url, false);
    return false;
  }
}

let counter = 0;
const pick = () => U(POOL[counter++ % POOL.length]);

async function fixString(url) {
  return (await ok(url)) ? url : pick();
}
async function fixJsonArray(raw) {
  let arr;
  try {
    arr = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!Array.isArray(arr)) return null;
  let changed = false;
  const out = [];
  for (const item of arr) {
    if (typeof item === "string" && (item.startsWith("http") || item.startsWith("/"))) {
      if (await ok(item)) out.push(item);
      else {
        out.push(pick());
        changed = true;
      }
    } else {
      out.push(item);
    }
  }
  return changed ? JSON.stringify(out) : null;
}

async function run() {
  // Packages
  for (const p of await prisma.package.findMany()) {
    const data = {};
    for (const f of ["thumbnail", "banner"]) {
      if (p[f]) {
        const v = await fixString(p[f]);
        if (v !== p[f]) data[f] = v;
      }
    }
    for (const f of ["images", "gallery"]) {
      if (p[f]) {
        const v = await fixJsonArray(p[f]);
        if (v) data[f] = v;
      }
    }
    if (!p.thumbnail) data.thumbnail = pick();
    if (Object.keys(data).length) {
      await prisma.package.update({ where: { id: p.id }, data });
      console.log("package", p.slug, Object.keys(data).join(","));
    }
  }

  // Destinations
  for (const d of await prisma.destination.findMany()) {
    const data = {};
    if (d.heroImage) {
      const v = await fixString(d.heroImage);
      if (v !== d.heroImage) data.heroImage = v;
    }
    const g = await fixJsonArray(d.gallery);
    if (g) data.gallery = g;
    if (Object.keys(data).length) {
      await prisma.destination.update({ where: { id: d.id }, data });
      console.log("destination", d.slug);
    }
  }

  // Attractions
  for (const a of await prisma.attraction.findMany()) {
    const data = {};
    if (a.heroImage) {
      const v = await fixString(a.heroImage);
      if (v !== a.heroImage) data.heroImage = v;
    }
    const g = await fixJsonArray(a.gallery);
    if (g) data.gallery = g;
    if (Object.keys(data).length) {
      await prisma.attraction.update({ where: { id: a.id }, data });
      console.log("attraction", a.slug);
    }
  }

  // Memories
  for (const m of await prisma.memory.findMany()) {
    if (m.url && !(await ok(m.url))) {
      await prisma.memory.update({ where: { id: m.id }, data: { url: pick() } });
      console.log("memory", m.id);
    }
  }

  // Categories
  for (const c of await prisma.adventureCategory.findMany()) {
    if (c.image && !(await ok(c.image))) {
      await prisma.adventureCategory.update({ where: { id: c.id }, data: { image: pick() } });
      console.log("category", c.slug);
    }
  }

  // Hero
  for (const h of await prisma.heroSection.findMany()) {
    const v = await fixJsonArray(h.backgroundImages);
    if (v) {
      await prisma.heroSection.update({ where: { id: h.id }, data: { backgroundImages: v } });
      console.log("hero", h.id);
    }
  }

  console.log("\nDone.");
}

await run();
await pool.end();

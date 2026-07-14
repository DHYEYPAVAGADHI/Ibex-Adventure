import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "lib", "data");

export function readData<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  if (!existsSync(filePath)) {
    throw new Error(`Data file not found: ${filename}`);
  }
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function writeData<T>(filename: string, data: T): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  const filePath = path.join(DATA_DIR, filename);
  writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

import { prisma } from "@/lib/prisma";

export async function getTours() {
  const packages = await prisma.package.findMany({
    where: { status: "active" },
  });
  
  return packages.map(pkg => {
    let images = [];
    try { images = JSON.parse(pkg.images || "[]"); } catch (e) {}
    let gallery = [];
    try { gallery = JSON.parse(pkg.gallery || "[]"); } catch (e) {}
    let highlights = [];
    try { highlights = JSON.parse(pkg.highlights || "[]"); } catch (e) {}

    return {
      ...pkg,
      image: images[0] || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      gallery,
      highlights,
    };
  });
}


"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { Memory, MemoryStats } from "@/components/destination-memories-client";

// --- MEMORY STATS ACTIONS ---

export async function getMemoryStats(): Promise<MemoryStats> {
  try {
    const statRecord = await prisma.contentVersion.findFirst({
      where: { modelName: "MemoryStats" },
      orderBy: { createdAt: "desc" }
    });
    if (statRecord) {
      return JSON.parse(statRecord.data);
    }
  } catch (e) {
    console.error(e);
  }
  return {
    travelers: "5000+",
    expeditions: "150+",
    destinations: "50+",
    satisfaction: "98%"
  };
}

export async function saveMemoryStats(data: MemoryStats) {
  await prisma.contentVersion.create({
    data: {
      modelName: "MemoryStats",
      recordId: "global",
      data: JSON.stringify(data),
    }
  });
  revalidatePath("/", "layout");
  return true;
}

// --- MEMORIES ACTIONS ---

export async function getMemories(): Promise<Memory[]> {
  try {
    const records = await prisma.memory.findMany({
      orderBy: { displayOrder: "asc" }
    });
    return records.map(r => ({
      id: r.id,
      image: r.url,
      caption: r.caption || "",
      category: r.categories || "adventure",
      destination: r.tags || "manali", // mapped to tags
      displayOrder: r.displayOrder,
      active: r.visibility === "Published",
    }));
  } catch {
    return [];
  }
}

export async function saveMemory(data: Partial<Memory> & { id?: string }) {
  if (data.id && data.id !== "new") {
    await prisma.memory.update({
      where: { id: data.id },
      data: {
        url: data.image,
        caption: data.caption,
        categories: data.category,
        tags: data.destination,
        displayOrder: data.displayOrder,
        visibility: data.active === false ? "Hidden" : "Published",
      }
    });
  } else {
    const count = await prisma.memory.count();
    await prisma.memory.create({
      data: {
        url: data.image || "",
        caption: data.caption || "",
        categories: data.category || "adventure",
        tags: data.destination || "manali",
        displayOrder: data.displayOrder ?? count,
        visibility: data.active === false ? "Hidden" : "Published",
      }
    });
  }

  revalidatePath("/", "layout");
  return true;
}

export async function deleteMemory(id: string) {
  await prisma.memory.delete({ where: { id } });
  revalidatePath("/", "layout");
  return true;
}

export async function reorderMemories(orderedIds: string[]) {
  // Simple ordered loop
  for (let i = 0; i < orderedIds.length; i++) {
    await prisma.memory.update({
      where: { id: orderedIds[i] },
      data: { displayOrder: i }
    });
  }
  revalidatePath("/", "layout");
  return true;
}

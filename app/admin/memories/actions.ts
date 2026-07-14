"use server";

import { readData, writeData, generateId } from "@/lib/data-store";
import { revalidatePath } from "next/cache";
import type { Memory, MemoryStats } from "@/components/destination-memories-client";

const MEMORIES_FILE = "memories.json";
const STATS_FILE = "memory-stats.json";

// --- MEMORY STATS ACTIONS ---

export async function getMemoryStats(): Promise<MemoryStats> {
  try {
    return readData<MemoryStats>(STATS_FILE);
  } catch {
    return {
      travelers: "5000+",
      expeditions: "150+",
      destinations: "50+",
      satisfaction: "98%"
    };
  }
}

export async function saveMemoryStats(data: MemoryStats) {
  writeData(STATS_FILE, data);
  revalidatePath("/", "layout");
  return true;
}

// --- MEMORIES ACTIONS ---

export async function getMemories(): Promise<Memory[]> {
  try {
    return readData<Memory[]>(MEMORIES_FILE);
  } catch {
    return [];
  }
}

export async function saveMemory(data: Partial<Memory> & { id?: string }) {
  const memories = await getMemories();

  if (data.id) {
    const idx = memories.findIndex((m) => m.id === data.id);
    if (idx !== -1) {
      memories[idx] = { ...memories[idx], ...data } as Memory;
    }
  } else {
    memories.push({
      id: generateId(),
      image: data.image || "",
      caption: data.caption || "",
      category: data.category || "adventure",
      destination: data.destination || "manali",
      displayOrder: memories.length,
      active: data.active ?? true,
    });
  }

  writeData(MEMORIES_FILE, memories);
  revalidatePath("/", "layout");
  return true;
}

export async function deleteMemory(id: string) {
  let memories = await getMemories();
  memories = memories.filter((m) => m.id !== id);
  writeData(MEMORIES_FILE, memories);
  revalidatePath("/", "layout");
  return true;
}

export async function reorderMemories(orderedIds: string[]) {
  const memories = await getMemories();
  orderedIds.forEach((id, idx) => {
    const memory = memories.find((m) => m.id === id);
    if (memory) {
      memory.displayOrder = idx;
    }
  });
  memories.sort((a, b) => a.displayOrder - b.displayOrder);
  writeData(MEMORIES_FILE, memories);
  revalidatePath("/", "layout");
  return true;
}

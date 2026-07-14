import { readData } from "@/lib/data-store";
import { DestinationMemoriesClient, type Memory, type MemoryStats } from "./destination-memories-client";

export async function DestinationMemories({ destination, category }: { destination: string, category?: string }) {
  let memories: Memory[] = [];
  let stats: MemoryStats = {
    travelers: "5000+",
    expeditions: "150+",
    destinations: "50+",
    satisfaction: "98%"
  };

  try {
    const allMoments = readData<Memory[]>("memories.json");
    memories = allMoments
      .filter((m) => m.active && m.destination.toLowerCase() === destination.toLowerCase())
      .sort((a, b) => a.displayOrder - b.displayOrder);
  } catch (err) {
    console.error("Error loading memories:", err);
  }

  try {
    stats = readData<MemoryStats>("memory-stats.json");
  } catch (err) {
    console.error("Error loading memory stats:", err);
  }

  if (memories.length === 0) {
    return null;
  }

  return <DestinationMemoriesClient memories={memories} stats={stats} />;
}

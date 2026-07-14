import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.adventureCategory.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });
    return Response.json(categories, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

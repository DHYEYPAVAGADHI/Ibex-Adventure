import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured") === "true";

    const whereClause: any = { isActive: true };
    if (featured) {
      whereClause.isFeatured = true;
    }

    const categories = await prisma.activity.findMany({
      where: whereClause,
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

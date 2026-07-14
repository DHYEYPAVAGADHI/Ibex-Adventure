import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const q = searchParams.get("q")?.toLowerCase();
    const featured = searchParams.get("featured");

    let whereClause: any = { status: "active" };

    if (category) {
      whereClause.category = category;
    }
    
    if (featured === "true") {
      whereClause.isFeatured = true;
    }

    if (q) {
      whereClause.OR = [
        { title: { contains: q } },
        { location: { contains: q } },
        { overview: { contains: q } },
        { category: { contains: q } }
      ];
    }

    const tours = await prisma.package.findMany({
      where: whereClause,
      orderBy: { displayOrder: "asc" },
    });

    return Response.json(tours, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Error fetching tours:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

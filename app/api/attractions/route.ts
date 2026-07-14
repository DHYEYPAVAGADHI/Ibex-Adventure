import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  try {
    const { searchParams } = new URL(_req.url);
    const featured = searchParams.get("featured");

    const where: Record<string, unknown> = { published: true };
    if (featured === "true") where.featured = true;

    const attractions = await prisma.attraction.findMany({
      where,
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(attractions);
  } catch (error) {
    console.error("Failed to fetch attractions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");

    const where: Record<string, unknown> = { published: true };
    if (featured === "true") where.featured = true;

    const destinations = await prisma.destination.findMany({
      where,
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(destinations);
  } catch (error) {
    console.error("Failed to fetch destinations:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

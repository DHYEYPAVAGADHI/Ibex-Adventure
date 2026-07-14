import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const attraction = await prisma.attraction.findUnique({
      where: { slug },
    });

    if (!attraction) {
      return NextResponse.json({ error: "Attraction not found" }, { status: 404 });
    }

    return NextResponse.json(attraction);
  } catch (error) {
    console.error("Failed to fetch attraction:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

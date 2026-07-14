import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const destination = await prisma.destination.findUnique({
      where: { slug },
    });

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    return NextResponse.json(destination);
  } catch (error) {
    console.error("Failed to fetch destination:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

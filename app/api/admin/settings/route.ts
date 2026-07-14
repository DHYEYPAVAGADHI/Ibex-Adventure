import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const settings = await prisma.websiteSetting.findFirst();
    return NextResponse.json(settings || {});
  } catch (error) {
    console.error("Error fetching website settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = req.cookies.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    // Sanitize empty strings to null for logo
    if (data.logoUrl === "") data.logoUrl = null;

    let settings = await prisma.websiteSetting.findFirst();

    if (settings) {
      settings = await prisma.websiteSetting.update({
        where: { id: settings.id },
        data: {
          logoUrl: data.logoUrl !== undefined ? data.logoUrl : settings.logoUrl,
        },
      });
    } else {
      settings = await prisma.websiteSetting.create({
        data: {
          logoUrl: data.logoUrl || null,
        },
      });
    }

    revalidatePath("/", "layout");
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

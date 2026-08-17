import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const hero = await prisma.heroSection.findFirst();
    return NextResponse.json(hero || {});
  } catch (error) {
    console.error("Error fetching hero section:", error);
    return NextResponse.json({ error: "Failed to fetch hero section" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = req.cookies.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    if (!data.headline || !data.backgroundImages) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Ensure backgroundImages is a valid stringified JSON array
    let backgroundImages = data.backgroundImages;
    if (Array.isArray(backgroundImages)) {
      backgroundImages = JSON.stringify(backgroundImages);
    }

    // Handle scrollWords — store as JSON string
    let scrollWords: string | null = null;
    if (Array.isArray(data.scrollWords) && data.scrollWords.length > 0) {
      scrollWords = JSON.stringify(data.scrollWords.filter((w: string) => w.trim() !== ""));
    }

    const payload = {
      headline: data.headline,
      headlinePrefix: data.headlinePrefix?.trim() || null,
      scrollWords,
      subtitle: data.subtitle || null,
      description: data.description || null,
      backgroundImages,
      buttonText: data.buttonText || null,
      buttonLink: data.buttonLink || null,
    };

    let hero = await prisma.heroSection.findFirst();

    if (hero) {
      hero = await prisma.heroSection.update({ where: { id: hero.id }, data: payload });
    } else {
      hero = await prisma.heroSection.create({ data: payload });
    }

    revalidatePath("/", "layout");
    return NextResponse.json(hero);
  } catch (error) {
    console.error("Error updating hero section:", error);
    return NextResponse.json({ error: "Failed to update hero section" }, { status: 500 });
  }
}

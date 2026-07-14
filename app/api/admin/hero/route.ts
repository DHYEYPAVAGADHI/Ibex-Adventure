import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const hero = await prisma.heroSection.findFirst();
    revalidatePath('/', 'layout');
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
    
    // Sanitize empty strings to null for image fields
    ['image', 'heroImage', 'cardImage', 'banner', 'thumbnail', 'coverImage', 'icon'].forEach(key => {
      if (data[key] === "") data[key] = null;
    });

    if (!data.headline || !data.backgroundImages) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Ensure backgroundImages is a valid stringified JSON array if passed
    let backgroundImages = data.backgroundImages;
    if (Array.isArray(backgroundImages)) {
      backgroundImages = JSON.stringify(backgroundImages);
    }

    let hero = await prisma.heroSection.findFirst();

    if (hero) {
      hero = await prisma.heroSection.update({
        where: { id: hero.id },
        data: {
          headline: data.headline,
          subtitle: data.subtitle || null,
          description: data.description || null,
          backgroundImages: backgroundImages,
          buttonText: data.buttonText || null,
          buttonLink: data.buttonLink || null,
        },
      });
    } else {
      hero = await prisma.heroSection.create({
        data: {
          headline: data.headline,
          subtitle: data.subtitle || null,
          description: data.description || null,
          backgroundImages: backgroundImages,
          buttonText: data.buttonText || null,
          buttonLink: data.buttonLink || null,
        },
      });
    }

    revalidatePath("/", "layout");
    revalidatePath('/', 'layout');
    return NextResponse.json(hero);
  } catch (error) {
    console.error("Error updating hero section:", error);
    return NextResponse.json({ error: "Failed to update hero section" }, { status: 500 });
  }
}

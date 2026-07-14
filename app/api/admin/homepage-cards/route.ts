import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { validateImageUrl } from "@/lib/image-validator";

export async function GET(req: NextRequest) {
  try {
    const cards = await prisma.homepageAdventureCard.findMany({
      orderBy: { displayOrder: "asc" },
    });
    revalidatePath('/', 'layout');
    return NextResponse.json(cards);
  } catch (error) {
    console.error("Error fetching homepage cards:", error);
    return NextResponse.json({ error: "Failed to fetch homepage cards" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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

    if (!data.title || !data.description || !data.coverImage || !data.buttonText || !data.buttonLink) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.info(`[SAVE_START] Validating coverImage: ${data.coverImage}`);
    const validation = await validateImageUrl(data.coverImage);
    if (!validation.isValid) {
      console.warn(`[VALIDATION_FAILED] Rejected save for ${data.title}: ${validation.error}`);
      return NextResponse.json({ error: `Invalid image URL: ${validation.error}` }, { status: 400 });
    }

    let displayOrder = data.displayOrder;
    if (typeof displayOrder !== "number") {
      const lastCard = await prisma.homepageAdventureCard.findFirst({
        orderBy: { displayOrder: "desc" },
      });
      displayOrder = lastCard ? lastCard.displayOrder + 1 : 1;
    }

    const card = await prisma.homepageAdventureCard.create({
      data: {
        title: data.title,
        subtitle: data.subtitle || null,
        description: data.description,
        coverImage: data.coverImage,
        iconType: data.iconType || "lucide",
        icon: data.icon || "Mountain",
        buttonText: data.buttonText,
        buttonLink: data.buttonLink,
        displayOrder,
        status: data.status || "Published",
      },
    });

    revalidatePath("/", "layout");
    console.info(`[DATABASE_SAVE] Card created successfully: ${card.id}`);
    revalidatePath('/', 'layout');
    return NextResponse.json(card, { status: 201 });
  } catch (error) {
    console.error("[SAVE_ERROR] Error creating card:", error);
    return NextResponse.json({ error: "Failed to create card" }, { status: 500 });
  }
}

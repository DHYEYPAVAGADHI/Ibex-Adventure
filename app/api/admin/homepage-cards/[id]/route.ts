import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { validateImageUrl } from "@/lib/image-validator";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const card = await prisma.homepageAdventureCard.findUnique({
      where: { id },
    });

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    revalidatePath('/', 'layout');
    return NextResponse.json(card);
  } catch (error) {
    console.error("Error fetching card:", error);
    return NextResponse.json({ error: "Failed to fetch card" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = req.cookies.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await req.json();
    
    // Sanitize empty strings to null for image fields
    ['image', 'heroImage', 'cardImage', 'banner', 'thumbnail', 'coverImage', 'icon'].forEach(key => {
      if (data[key] === "") data[key] = null;
    });

    if (!data.title || !data.description || !data.coverImage || !data.buttonText || !data.buttonLink) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.info(`[SAVE_START] Validating coverImage update for ${id}: ${data.coverImage}`);
    const validation = await validateImageUrl(data.coverImage);
    if (!validation.isValid) {
      console.warn(`[VALIDATION_FAILED] Rejected update for ${data.title}: ${validation.error}`);
      return NextResponse.json({ error: `Invalid image URL: ${validation.error}` }, { status: 400 });
    }

    const card = await prisma.homepageAdventureCard.update({
      where: { id },
      data: {
        title: data.title,
        subtitle: data.subtitle || null,
        description: data.description,
        coverImage: data.coverImage,
        iconType: data.iconType || "lucide",
        icon: data.icon || "Mountain",
        buttonText: data.buttonText,
        buttonLink: data.buttonLink,
        status: data.status || "Published",
      },
    });

    revalidatePath("/", "layout");
    console.info(`[DATABASE_SAVE] Card updated successfully: ${card.id}`);
    revalidatePath('/', 'layout');
    return NextResponse.json(card);
  } catch (error) {
    console.error("[SAVE_ERROR] Error updating card:", error);
    return NextResponse.json({ error: "Failed to update card" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = req.cookies.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.homepageAdventureCard.delete({
      where: { id },
    });

    revalidatePath("/", "layout");
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting card:", error);
    return NextResponse.json({ error: "Failed to delete card" }, { status: 500 });
  }
}

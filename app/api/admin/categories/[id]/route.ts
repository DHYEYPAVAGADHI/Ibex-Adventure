import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const category = await prisma.adventureCategory.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    revalidatePath('/', 'layout');
    revalidatePath('/programs');
    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // Check if slug exists for another category
    if (data.slug) {
      const existing = await prisma.adventureCategory.findUnique({
        where: { slug: data.slug },
      });

      if (existing && existing.id !== id) {
        return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
      }
    }

    const category = await prisma.adventureCategory.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        image: data.image,
        imageAlt: data.imageAlt,
        icon: data.icon,
        displayOrder: data.displayOrder,
        isFeatured: data.isFeatured,
        isActive: data.isActive,
        linkType: data.linkType,
        activitySlug: data.activitySlug,
        customUrl: data.customUrl,
      },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/programs');
    if (data.slug) {
      revalidatePath(`/programs/${data.slug}`);
    }
    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = req.cookies.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.adventureCategory.delete({
      where: { id },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/programs');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}

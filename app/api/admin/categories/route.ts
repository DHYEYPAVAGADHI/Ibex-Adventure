import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.activity.findMany({
      orderBy: { displayOrder: "asc" },
    });
    revalidatePath('/', 'layout');
    revalidatePath('/programs');
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
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

    // Basic validation
    if (!data.title || !data.slug || !data.description || !data.image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if slug exists
    const existing = await prisma.activity.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    // Determine next display order if not provided
    let displayOrder = data.displayOrder;
    if (typeof displayOrder !== "number") {
      const lastCategory = await prisma.activity.findFirst({
        orderBy: { displayOrder: "desc" },
      });
      displayOrder = lastCategory ? lastCategory.displayOrder + 1 : 0;
    }

    const category = await prisma.activity.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        image: data.image,
        imageAlt: data.imageAlt || data.title,
        icon: data.icon || "Mountain",
        displayOrder,
        isFeatured: data.isFeatured ?? false,
        isActive: data.isActive ?? true,
        linkType: data.linkType || "internal",
        activitySlug: data.activitySlug || null,
        customUrl: data.customUrl || null,
      },
    });

    revalidatePath('/', 'layout');
    revalidatePath('/programs');
    if (data.slug) {
      revalidatePath(`/programs/${data.slug}`);
    }
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}

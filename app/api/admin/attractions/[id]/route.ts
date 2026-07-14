import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

function isAdmin(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  return session?.value === "authenticated";
}

function safeJSON(val: unknown, fallback = "[]") {
  if (!val) return fallback;
  if (typeof val === "string") return val;
  return JSON.stringify(val);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const attraction = await prisma.attraction.findUnique({ where: { id } });
    if (!attraction) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    revalidatePath('/', 'layout');
    return NextResponse.json(attraction);
  } catch (error) {
    console.error("Error fetching attraction:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const data = await req.json();
    
    // Sanitize empty strings to null for image fields
    ['image', 'heroImage', 'cardImage', 'banner', 'thumbnail', 'coverImage', 'icon'].forEach(key => {
      if (data[key] === "") data[key] = null;
    });

    if (!data.title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!data.slug?.trim()) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const existing = await prisma.attraction.findFirst({
      where: { slug: data.slug, NOT: { id } },
    });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const attraction = await prisma.attraction.update({
      where: { id },
      data: {
        slug: data.slug,
        title: data.title,
        category: data.category || "Natural",
        heroImage: data.heroImage || null,
        gallery: safeJSON(data.gallery),
        description: data.description || null,
        history: data.history || null,
        activities: safeJSON(data.activities),
        location: data.location || null,
        state: data.state || null,
        bestTime: data.bestTime || null,
        entryFee: data.entryFee || null,
        timings: data.timings || null,
        travelTips: safeJSON(data.travelTips),
        nearbyHotels: safeJSON(data.nearbyHotels),
        restaurants: safeJSON(data.restaurants),
        packages: safeJSON(data.packages),
        faqs: safeJSON(data.faqs),
        featured: !!data.featured,
        published: data.published !== false,
        displayOrder: data.displayOrder ? parseInt(data.displayOrder) : 0,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        seoKeywords: data.seoKeywords || null,
      },
    });

    revalidatePath("/", "layout");
    revalidatePath("/attractions", "layout");
    revalidatePath(`/attractions/${data.slug}`, "page");
    revalidatePath('/', 'layout');
    return NextResponse.json(attraction);
  } catch (error: unknown) {
    console.error("Error updating attraction:", error);
    const msg = error instanceof Error ? error.message : "Failed to update attraction";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    await prisma.attraction.delete({ where: { id } });
    revalidatePath("/", "layout");
    revalidatePath("/attractions", "layout");
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting attraction:", error);
    return NextResponse.json({ error: "Failed to delete attraction" }, { status: 500 });
  }
}

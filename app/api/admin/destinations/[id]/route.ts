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
    const destination = await prisma.destination.findUnique({ where: { id } });
    if (!destination) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    revalidatePath('/', 'layout');
    return NextResponse.json(destination);
  } catch (error) {
    console.error("Error fetching destination:", error);
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

    // Check for duplicate slug (excluding self)
    const existing = await prisma.destination.findFirst({
      where: { slug: data.slug, NOT: { id } },
    });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const destination = await prisma.destination.update({
      where: { id },
      data: {
        slug: data.slug,
        title: data.title,
        subtitle: data.subtitle || null,
        shortDescription: data.shortDescription || null,
        fullDescription: data.fullDescription || null,
        heroImage: data.heroImage || null,
        heroVideo: data.heroVideo || null,
        gallery: safeJSON(data.gallery),
        state: data.state || null,
        country: data.country || "India",
        latitude: data.latitude || null,
        longitude: data.longitude || null,
        googleMap: data.googleMap || null,
        rating: data.rating ? parseFloat(data.rating) : 0,
        reviewCount: data.reviewCount ? parseInt(data.reviewCount) : 0,
        duration: data.duration || null,
        difficulty: data.difficulty || null,
        altitude: data.altitude || null,
        bestSeason: data.bestSeason || null,
        weather: data.weather || null,
        temperature: data.temperature || null,
        thingsToDo: safeJSON(data.thingsToDo),
        highlights: safeJSON(data.highlights),
        includedPackages: safeJSON(data.includedPackages),
        nearbyPlaces: safeJSON(data.nearbyPlaces),
        faq: safeJSON(data.faq),
        howToReach: data.howToReach ? safeJSON(data.howToReach) : null,
        travelTips: safeJSON(data.travelTips),
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        seoKeywords: data.seoKeywords || null,
        featured: !!data.featured,
        published: data.published !== false,
        displayOrder: data.displayOrder ? parseInt(data.displayOrder) : 0,
      },
    });

    revalidatePath("/", "layout");
    revalidatePath("/destinations", "layout");
    revalidatePath(`/destinations/${data.slug}`, "page");
    revalidatePath('/', 'layout');
    return NextResponse.json(destination);
  } catch (error: unknown) {
    console.error("Error updating destination:", error);
    const msg = error instanceof Error ? error.message : "Failed to update destination";
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
    await prisma.destination.delete({ where: { id } });
    revalidatePath("/", "layout");
    revalidatePath("/destinations", "layout");
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting destination:", error);
    return NextResponse.json({ error: "Failed to delete destination" }, { status: 500 });
  }
}

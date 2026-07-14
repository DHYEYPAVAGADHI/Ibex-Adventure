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

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
    revalidatePath('/', 'layout');
    return NextResponse.json(destinations);
  } catch (error) {
    console.error("Failed to fetch destinations:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const data = await req.json();

    // Sanitize empty strings to null for image fields
    ['image', 'heroImage', 'cardImage', 'banner', 'thumbnail', 'coverImage', 'icon'].forEach(key => {
      if (data[key] === "") data[key] = null;
    });

    // Validate required fields
    if (!data.title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!data.slug?.trim()) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // Check for duplicate slug
    const existing = await prisma.destination.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const destination = await prisma.destination.create({
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
    revalidatePath('/', 'layout');
    return NextResponse.json(destination, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating destination:", error);
    const msg = error instanceof Error ? error.message : "Failed to create destination";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

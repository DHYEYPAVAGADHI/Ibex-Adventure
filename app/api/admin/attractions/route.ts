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
    const attractions = await prisma.attraction.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
    revalidatePath('/', 'layout');
    return NextResponse.json(attractions);
  } catch (error) {
    console.error("Failed to fetch attractions:", error);
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

    if (!data.title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!data.slug?.trim()) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const existing = await prisma.attraction.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }

    const attraction = await prisma.attraction.create({
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
    revalidatePath('/', 'layout');
    return NextResponse.json(attraction, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating attraction:", error);
    const msg = error instanceof Error ? error.message : "Failed to create attraction";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

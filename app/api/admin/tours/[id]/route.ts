import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const tour = await prisma.package.findUnique({
      where: { id },
    });
    if (!tour) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidatePath('/', 'layout');
    return NextResponse.json(tour);
  } catch (error) {
    console.error("Error fetching tour:", error);
    return NextResponse.json({ error: "Failed to fetch tour" }, { status: 500 });
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

    let finalCategorySlug = "adventure";
    let finalActivityId: string | undefined = undefined;
    if (data.category) {
      const cat = await prisma.activity.findFirst({
        where: { title: data.category }
      });
      if (cat) {
        finalCategorySlug = cat.slug;
        finalActivityId = cat.id;
      } else {
        finalCategorySlug = data.category.toLowerCase().replace(/\s+/g, "-");
      }
    }

    if (data.slug) {
      const existing = await prisma.package.findUnique({ where: { slug: data.slug } });
      if (existing && existing.id !== id) {
        return NextResponse.json({ error: "A tour with this slug already exists." }, { status: 400 });
      }
    }

    const tour = await prisma.package.update({
      where: { id },
      data: {
        title: data.title || "Untitled",
        slug: data.slug || "",
        category: data.category || "Adventure",
        categorySlug: finalCategorySlug,
        activityId: finalActivityId,
        activities: data.activity,
        location: data.location || data.destination,
        overview: data.overview || "",
        description: data.description || "",
        banner: data.image,
        thumbnail: data.thumbnail,
        difficulty: data.difficulty,
        duration: data.duration,
        ageGroupMin: typeof data.ageGroupMin === 'number' ? data.ageGroupMin : null,
        ageGroupMax: typeof data.ageGroupMax === 'number' ? data.ageGroupMax : null,
        maxGroupSize: typeof data.maxGroupSize === 'number' ? data.maxGroupSize : null,
        season: data.season,
        status: data.status,
        isFeatured: data.isFeatured,
        displayOrder: data.displayOrder,
        price: data.basePrice?.toString(),
        discount: data.salePrice?.toString(),
        highlights: JSON.stringify(data.highlights || []),
        gallery: JSON.stringify(data.gallery || []),
        images: JSON.stringify(data.image ? [data.image] : []),
        inclusions: JSON.stringify(data.included || []),
        exclusions: JSON.stringify(data.excluded || []),
        itinerary: JSON.stringify(data.itinerary || []),
        faqs: JSON.stringify(data.faqs || []),
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        seoKeywords: data.seoKeywords,
      },
    });

    revalidatePath("/", "layout");
    return NextResponse.json(tour);
  } catch (error: any) {
    console.error("Error updating tour:", error);
    return NextResponse.json({ error: error.message || "Failed to update tour" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = req.cookies.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.package.delete({
      where: { id },
    });

    revalidatePath("/", "layout");
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tour:", error);
    return NextResponse.json({ error: "Failed to delete tour" }, { status: 500 });
  }
}

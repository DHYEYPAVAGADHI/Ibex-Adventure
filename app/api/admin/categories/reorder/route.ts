import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

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
    
    if (!Array.isArray(data.items)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // items should be an array of { id, displayOrder }
    // Update all in a transaction
    await prisma.$transaction(
      data.items.map((item: { id: string; displayOrder: number }) =>
        prisma.adventureCategory.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        })
      )
    );

    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering categories:", error);
    return NextResponse.json({ error: "Failed to reorder categories" }, { status: 500 });
  }
}

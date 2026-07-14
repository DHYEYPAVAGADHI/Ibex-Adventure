import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const session = req.cookies.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items } = await req.json();

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    // Execute all updates in a transaction
    await prisma.$transaction(
      items.map((item: { id: string; displayOrder: number }) =>
        prisma.homepageAdventureCard.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        })
      )
    );

    revalidatePath("/", "layout");
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering homepage cards:", error);
    return NextResponse.json({ error: "Failed to reorder homepage cards" }, { status: 500 });
  }
}

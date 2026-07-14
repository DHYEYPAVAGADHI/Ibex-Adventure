import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const contactInfo = await prisma.contactInformation.findFirst();
    revalidatePath('/', 'layout');
    return NextResponse.json(contactInfo || {});
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return NextResponse.json({ error: "Failed to fetch contact info" }, { status: 500 });
  }
}

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

    if (!data.address || !data.phone || !data.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let contactInfo = await prisma.contactInformation.findFirst();

    if (contactInfo) {
      contactInfo = await prisma.contactInformation.update({
        where: { id: contactInfo.id },
        data: {
          address: data.address,
          phone: data.phone,
          whatsapp: data.whatsapp || null,
          email: data.email,
          googleMapsUrl: data.googleMapsUrl || null,
          socialLinks: data.socialLinks || null,
          businessHours: data.businessHours || null,
        },
      });
    } else {
      contactInfo = await prisma.contactInformation.create({
        data: {
          address: data.address,
          phone: data.phone,
          whatsapp: data.whatsapp || null,
          email: data.email,
          googleMapsUrl: data.googleMapsUrl || null,
          socialLinks: data.socialLinks || null,
          businessHours: data.businessHours || null,
        },
      });
    }

    revalidatePath("/", "layout");
    revalidatePath('/', 'layout');
    return NextResponse.json(contactInfo);
  } catch (error) {
    console.error("Error updating contact info:", error);
    return NextResponse.json({ error: "Failed to update contact info" }, { status: 500 });
  }
}

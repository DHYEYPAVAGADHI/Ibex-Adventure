import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "Uncategorized";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Use our storage abstraction
    const result = await storage.uploadFile(file, folder);

    // Save to database
    const mediaAsset = await prisma.mediaAsset.create({
      data: {
        fileName: result.fileName,
        url: result.url,
        fileType: result.fileType,
        width: result.width,
        height: result.height,
        sizeBytes: result.sizeBytes,
        folder: folder,
        source: "local",
      },
    });

    return NextResponse.json({ success: true, asset: mediaAsset });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    // Verify session
    const session = req.cookies.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.warn(`[UPLOAD_FAILED] No file provided in payload`);
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.info(`[UPLOAD_START] Received file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);

    // Check size limit (50MB) manually in case standard Next.js body limits are bypassed
    if (file.size > 50 * 1024 * 1024) {
      console.warn(`[UPLOAD_FAILED] File exceeds 50MB limit: ${file.size} bytes`);
      return NextResponse.json({ error: "File exceeds 50MB limit" }, { status: 413 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `upload-${uniqueSuffix}.webp`; // Always convert to WebP

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
      console.info(`[UPLOAD_INIT] Created uploads directory: ${uploadsDir}`);
    }

    const filepath = path.join(uploadsDir, filename);

    // Optimize image using sharp
    console.info(`[UPLOAD_OPTIMIZE] Compressing and converting to WebP...`);
    const optimizedBuffer = await sharp(buffer)
      .resize({ width: 2000, withoutEnlargement: true }) // Max width 2000px
      .webp({ quality: 85 })
      .toBuffer();

    await writeFile(filepath, optimizedBuffer);
    console.info(`[UPLOAD_SUCCESS] Saved optimized image to: ${filepath}`);

    const fileUrl = `/uploads/${filename}`;

    revalidatePath('/', 'layout');
    return NextResponse.json({ url: fileUrl }, { status: 201 });
  } catch (error: any) {
    console.error("[UPLOAD_ERROR] Failed to process upload:", error.message);
    return NextResponse.json({ error: "Failed to upload and optimize file" }, { status: 500 });
  }
}

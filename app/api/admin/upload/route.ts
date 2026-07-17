import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

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
    const filename = `admin-upload-${uniqueSuffix}.webp`; // Always convert to WebP

    // Optimize image using sharp
    console.info(`[UPLOAD_OPTIMIZE] Compressing and converting to WebP...`);
    const optimizedBuffer = await sharp(buffer)
      .resize({ width: 2000, withoutEnlargement: true }) // Max width 2000px
      .webp({ quality: 85 })
      .toBuffer();

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(filename, optimizedBuffer, {
        contentType: 'image/webp',
        upsert: true,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error(`Failed to upload to Supabase: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(filename);

    console.info(`[UPLOAD_SUCCESS] Saved optimized image to: ${publicUrl}`);

    revalidatePath('/', 'layout');
    return NextResponse.json({ url: publicUrl }, { status: 201 });
  } catch (error: any) {
    console.error("[UPLOAD_ERROR] Failed to process upload:", error.message);
    return NextResponse.json({ error: "Failed to upload and optimize file" }, { status: 500 });
  }
}

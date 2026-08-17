import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;
export const dynamic = "force-dynamic";

// Helper to check if we can write to local filesystem
async function tryLocalUpload(buffer: Buffer, filename: string): Promise<string | null> {
  try {
    // Dynamic imports to avoid issues on edge/serverless
    const fs = await import("fs/promises");
    const path = await import("path");
    const { existsSync } = await import("fs");

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadsDir)) {
      await fs.mkdir(uploadsDir, { recursive: true });
    }
    const filePath = path.join(uploadsDir, filename);
    await fs.writeFile(filePath, buffer);
    return `/uploads/${filename}`;
  } catch {
    return null;
  }
}

// Helper to try Supabase upload
async function trySupabaseUpload(buffer: Buffer, filename: string, mimeType: string): Promise<string | null> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    if (!supabaseUrl || supabaseUrl.includes("placeholder") || supabaseUrl === "") {
      return null;
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.storage.from("uploads").upload(filename, buffer, {
      contentType: mimeType,
      upsert: true,
    });

    if (error) {
      console.error("[UPLOAD] Supabase error:", error.message);
      return null;
    }

    const { data } = supabase.storage.from("uploads").getPublicUrl(filename);
    return data.publicUrl;
  } catch (e) {
    console.error("[UPLOAD] Supabase exception:", e);
    return null;
  }
}

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
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 10MB limit for base64 safety
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large. Maximum size is 10MB." }, { status: 413 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/jpeg";
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `upload-${uniqueSuffix}.${ext}`;

    console.info(`[UPLOAD] Processing: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);

    // Strategy 1: Try Supabase (cloud storage - best for Vercel)
    const supabaseUrl = await trySupabaseUpload(buffer, filename, mimeType);
    if (supabaseUrl) {
      console.info("[UPLOAD] ✅ Supabase storage success");
      return NextResponse.json({ url: supabaseUrl }, { status: 201 });
    }

    // Strategy 2: Try local filesystem (works on VPS/self-hosted)
    const localUrl = await tryLocalUpload(buffer, filename);
    if (localUrl) {
      console.info("[UPLOAD] ✅ Local filesystem success");
      return NextResponse.json({ url: localUrl }, { status: 201 });
    }

    // Strategy 3: Base64 data URI (works EVERYWHERE - no external deps)
    // This is the nuclear option that ALWAYS works
    const base64 = buffer.toString("base64");
    const dataUri = `data:${mimeType};base64,${base64}`;
    console.info("[UPLOAD] ✅ Base64 data URI fallback success");
    return NextResponse.json({ url: dataUri }, { status: 201 });

  } catch (error: any) {
    console.error("[UPLOAD] Fatal error:", error?.message || error);
    return NextResponse.json({ error: `Upload failed: ${error?.message || "Unknown error"}` }, { status: 500 });
  }
}

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { existsSync, statSync } from "fs";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

export async function GET(req: NextRequest) {
  try {
    // Ensure directory exists
    if (!existsSync(UPLOADS_DIR)) {
      await fs.mkdir(UPLOADS_DIR, { recursive: true });
      revalidatePath('/', 'layout');
    return NextResponse.json({ files: [] });
    }

    // Recursively read files
    const files: {
      url: string;
      fileName: string;
      sizeBytes: number;
      fileType: string;
    }[] = [];

    async function readDir(dir: string, baseUrl: string) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          await readDir(path.join(dir, entry.name), `${baseUrl}/${entry.name}`);
        } else if (entry.isFile()) {
          const filePath = path.join(dir, entry.name);
          const stats = statSync(filePath);
          const ext = path.extname(entry.name).toLowerCase();
          const imageExts = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".avif"];
          if (imageExts.includes(ext)) {
            files.push({
              url: `${baseUrl}/${entry.name}`,
              fileName: entry.name,
              sizeBytes: stats.size,
              fileType: `image/${ext.slice(1) === "jpg" ? "jpeg" : ext.slice(1)}`,
            });
          }
        }
      }
    }

    await readDir(UPLOADS_DIR, "/uploads");

    // Sort newest first by filename (Date.now() prefix)
    files.sort((a, b) => b.fileName.localeCompare(a.fileName));

    revalidatePath('/', 'layout');
    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error listing media files:", error);
    return NextResponse.json({ error: "Failed to list media files" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = req.cookies.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { url } = await req.json();
    if (!url || !url.startsWith("/uploads/")) {
      return NextResponse.json({ error: "Invalid file URL" }, { status: 400 });
    }

    const relativePath = url.replace("/uploads/", "");
    const fullPath = path.join(UPLOADS_DIR, relativePath);

    // Safety: ensure we stay within the uploads directory
    const resolved = path.resolve(fullPath);
    const uploadsResolved = path.resolve(UPLOADS_DIR);
    if (!resolved.startsWith(uploadsResolved)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 403 });
    }

    if (existsSync(fullPath)) {
      await fs.unlink(fullPath);
    }

    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting media file:", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}

import { StorageProvider, UploadResult } from "./index";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";

export class LocalStorageProvider implements StorageProvider {
  private readonly uploadDir = path.join(process.cwd(), "public", "uploads");

  constructor() {
    // Ensure upload directory exists
    fs.mkdir(this.uploadDir, { recursive: true }).catch(console.error);
  }

  async uploadFile(file: File, folder: string = "uncategorized"): Promise<UploadResult> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const hash = crypto.randomBytes(8).toString("hex");
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const ext = path.extname(originalName).toLowerCase();
    const nameWithoutExt = path.basename(originalName, ext);
    
    // Always use .webp for images if possible to optimize
    let fileName = `${nameWithoutExt}-${hash}${ext}`;
    let finalBuffer = buffer;
    let width = undefined;
    let height = undefined;
    let fileType = file.type;

    const isImage = file.type.startsWith("image/");
    const isSvg = file.type === "image/svg+xml";

    if (isImage && !isSvg) {
      try {
        const image = sharp(buffer);
        const metadata = await image.metadata();
        width = metadata.width;
        height = metadata.height;
        
        // Convert to webp
        finalBuffer = await image.webp({ quality: 80 }).toBuffer();
        fileName = `${nameWithoutExt}-${hash}.webp`;
        fileType = "image/webp";
      } catch (e) {
        console.error("Error optimizing image with sharp:", e);
        // fallback to original buffer if sharp fails
      }
    }

    // Create folder structure if needed
    const folderPath = path.join(this.uploadDir, folder);
    await fs.mkdir(folderPath, { recursive: true });

    const filePath = path.join(folderPath, fileName);
    await fs.writeFile(filePath, finalBuffer);

    // URL to access the file publicly
    const url = `/uploads/${folder}/${fileName}`;

    return {
      url,
      fileName,
      fileType,
      sizeBytes: finalBuffer.length,
      width,
      height,
    };
  }

  async deleteFile(url: string): Promise<boolean> {
    try {
      // URL is like /uploads/folder/filename.ext
      if (!url.startsWith("/uploads/")) {
        return false;
      }

      const relativePath = url.replace("/uploads/", "");
      const fullPath = path.join(this.uploadDir, relativePath);
      
      await fs.unlink(fullPath);
      return true;
    } catch (e) {
      console.error("Error deleting file:", e);
      return false;
    }
  }
}

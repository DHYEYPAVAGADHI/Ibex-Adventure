import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

export const storage = {
  async uploadFile(file: File, folder: string = "Uncategorized") {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    const extension = file.name.split('.').pop() || 'png';
    const filename = `${uniqueSuffix}.${extension}`;

    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Ignore if directory exists
    }

    const path = join(uploadDir, filename);
    await writeFile(path, buffer);

    // Return the public URL and metadata
    return {
      fileName: file.name,
      url: `/uploads/${filename}`,
      fileType: file.type,
      width: null, // Basic version doesn't read image dimensions
      height: null,
      sizeBytes: buffer.length,
    };
  }
};

import { NextRequest, NextResponse } from "next/server";

/**
 * Google Drive Folder Image Fetcher
 * Works with publicly shared Google Drive folders — no API key required.
 * 
 * Extracts file IDs from the folder HTML and returns direct image URLs.
 */

function extractFolderId(input: string): string | null {
  // Handle various Google Drive folder URL formats
  const patterns = [
    /drive\.google\.com\/drive\/folders\/([a-zA-Z0-9_-]+)/,
    /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
    /^([a-zA-Z0-9_-]{20,})\/?$/, // Raw folder ID
  ];
  for (const p of patterns) {
    const m = input.trim().match(p);
    if (m) return m[1];
  }
  return null;
}

async function fetchFolderImages(folderId: string): Promise<string[]> {
  // Fetch the public folder page
  const res = await fetch(`https://drive.google.com/drive/folders/${folderId}`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Cache-Control": "no-cache",
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Google Drive returned status ${res.status}. Make sure the folder is publicly shared.`);
  }

  const html = await res.text();

  // Google Drive embeds file data as JSON inside the page
  // Pattern: file IDs are 28–44 char alphanumeric strings next to mime types
  const fileIds = new Set<string>();

  // Method 1: Extract from JSON data blobs embedded in the page
  // Matches patterns like "1abc...xyz","filename.jpg","image/jpeg"
  const jsonPattern = /"([a-zA-Z0-9_-]{28,44})","[^"]*","image\//g;
  let match;
  while ((match = jsonPattern.exec(html)) !== null) {
    fileIds.add(match[1]);
  }

  // Method 2: Extract from data-id attributes in HTML
  const dataIdPattern = /data-id="([a-zA-Z0-9_-]{28,44})"/g;
  while ((match = dataIdPattern.exec(html)) !== null) {
    fileIds.add(match[1]);
  }

  // Method 3: Extract from thumbnail URLs that contain file IDs
  const thumbPattern = /\/thumbnail\?id=([a-zA-Z0-9_-]{28,44})/g;
  while ((match = thumbPattern.exec(html)) !== null) {
    fileIds.add(match[1]);
  }

  // Method 4: Extract from uc?id= patterns
  const ucPattern = /uc\?.*?id=([a-zA-Z0-9_-]{28,44})/g;
  while ((match = ucPattern.exec(html)) !== null) {
    fileIds.add(match[1]);
  }

  if (fileIds.size === 0) {
    throw new Error(
      "No images found in this folder. Make sure: (1) The folder is set to 'Anyone with the link can view', and (2) The folder actually contains images."
    );
  }

  // Return direct view URLs for each image
  return Array.from(fileIds).map(
    (id) => `https://drive.google.com/uc?export=view&id=${id}`
  );
}

export async function POST(req: NextRequest) {
  try {
    const session = req.cookies.get("admin_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    const folderId = extractFolderId(url);
    if (!folderId) {
      return NextResponse.json(
        {
          error:
            "Invalid Google Drive folder link. Please share a folder link like: https://drive.google.com/drive/folders/ABC123",
        },
        { status: 400 }
      );
    }

    const images = await fetchFolderImages(folderId);

    return NextResponse.json({ images, count: images.length });
  } catch (error: any) {
    console.error("[GDRIVE] Error:", error?.message);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch images from Google Drive" },
      { status: 500 }
    );
  }
}

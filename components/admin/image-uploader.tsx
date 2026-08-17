"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, X, Link as LinkIcon, CheckCircle, Loader2, FolderOpen, Plus, AlertTriangle } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  /** Called for each image when multiple are imported (e.g. Google Drive folder) */
  onMultiple?: (urls: string[]) => void;
  label?: string;
  maxSizeMB?: number;
  /** If true, show a note that multiple images will be added */
  supportsMultiple?: boolean;
}

type Mode = "upload" | "url" | "gdrive";

export function ImageUploader({
  value,
  onChange,
  onMultiple,
  label = "Image",
  maxSizeMB = 10,
  supportsMultiple = false,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [gdriveInput, setGdriveInput] = useState("");
  const [mode, setMode] = useState<Mode>("upload");
  const [dragOver, setDragOver] = useState(false);
  const [gdriveImages, setGdriveImages] = useState<string[]>([]);
  const [fetchingDrive, setFetchingDrive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    setError("");
    setProgress("");
  }, []);

  const handleFile = useCallback(
    async (file: File) => {
      reset();

      if (!file.type.startsWith("image/")) {
        setError("Please select an image file (JPG, PNG, WEBP, etc.)");
        return;
      }

      const maxBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxBytes) {
        setError(`Image is too large. Maximum size is ${maxSizeMB}MB.`);
        return;
      }

      setUploading(true);
      setProgress("Uploading...");

      try {
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || `Server error (${res.status})`);

        const url = data.url || (data.asset && data.asset.url) || "";
        if (!url) throw new Error("No URL returned from upload");

        setProgress("✓ Uploaded");
        onChange(url);
        setTimeout(() => setProgress(""), 2000);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Upload failed");
        setProgress("");
      } finally {
        setUploading(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [onChange, maxSizeMB, reset]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  function applyUrl() {
    const raw = urlInput.trim();
    if (!raw) return;

    let finalUrl = raw;
    const gDriveMatch = raw.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (gDriveMatch?.[1]) {
      finalUrl = `https://drive.google.com/uc?export=view&id=${gDriveMatch[1]}`;
    }

    onChange(finalUrl);
    setUrlInput("");
    setError("");
  }

  async function fetchGoogleDriveFolder() {
    const url = gdriveInput.trim();
    if (!url) return;

    setFetchingDrive(true);
    setError("");
    setGdriveImages([]);

    try {
      const res = await fetch("/api/admin/gdrive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch folder");

      const images: string[] = data.images || [];
      if (images.length === 0) throw new Error("No images found in this folder.");

      setGdriveImages(images);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to fetch Google Drive folder");
    } finally {
      setFetchingDrive(false);
    }
  }

  function applyGDriveImage(img: string) {
    onChange(img);
  }

  function applyAllGDriveImages() {
    if (gdriveImages.length === 0) return;
    // Use the first image for the primary field
    onChange(gdriveImages[0]);
    // Pass the rest via onMultiple callback
    if (onMultiple && gdriveImages.length > 1) {
      onMultiple(gdriveImages);
    }
  }

  const isDataUri = value?.startsWith("data:");

  return (
    <div className="space-y-3">
      {label && <label className="block text-sm font-medium text-admin-label">{label}</label>}

      {/* Mode tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-slate-900/60 border border-white/5 w-fit text-xs">
        {(["upload", "url", "gdrive"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setMode(m); setError(""); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              mode === m
                ? "bg-amber-500/20 text-amber-400 shadow-sm"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {m === "upload" && <Upload className="h-3 w-3" />}
            {m === "url" && <LinkIcon className="h-3 w-3" />}
            {m === "gdrive" && <FolderOpen className="h-3 w-3" />}
            {m === "upload" ? "Upload File" : m === "url" ? "Use URL" : "Google Drive"}
          </button>
        ))}
      </div>

      {/* Upload File */}
      {mode === "upload" && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => !uploading && inputRef.current?.click()}
          className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-all duration-200 ${
            dragOver
              ? "border-amber-500/60 bg-amber-500/5 scale-[1.01]"
              : uploading
              ? "border-amber-500/30 bg-slate-900/30 cursor-wait"
              : "border-white/15 bg-admin-section-bg hover:border-amber-500/40 hover:bg-slate-900"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/avif"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 text-amber-400 animate-spin" />
              <p className="text-sm font-medium text-amber-400">{progress}</p>
            </div>
          ) : progress.startsWith("✓") ? (
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-400" />
              <p className="text-sm font-medium text-green-400">{progress}</p>
            </div>
          ) : (
            <>
              <Upload className={`mb-3 h-8 w-8 transition-colors ${dragOver ? "text-amber-400" : "text-white/30"}`} />
              <p className="text-sm font-medium text-white/60">
                {dragOver ? "Drop to upload" : "Drop image here or click to browse"}
              </p>
              <p className="mt-1 text-xs text-white/30">JPG, PNG, WEBP, GIF · Max {maxSizeMB}MB</p>
            </>
          )}
        </div>
      )}

      {/* Use URL */}
      {mode === "url" && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg or Google Drive file link"
            className="flex-1 rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-white/25 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyUrl(); } }}
          />
          <button
            type="button"
            onClick={applyUrl}
            disabled={!urlInput.trim()}
            className="rounded-xl bg-amber-500/20 px-4 py-2.5 text-sm font-medium text-amber-400 hover:bg-amber-500/30 transition-colors disabled:opacity-40"
          >
            Apply
          </button>
        </div>
      )}

      {/* Google Drive Folder */}
      {mode === "gdrive" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 space-y-3">
            <p className="text-xs text-white/50 leading-relaxed">
              Paste a <span className="text-amber-400 font-medium">publicly shared</span> Google Drive folder link.
              All images in the folder will be imported automatically.
            </p>
            <div className="flex gap-2">
              <input
                type="url"
                value={gdriveInput}
                onChange={(e) => setGdriveInput(e.target.value)}
                placeholder="https://drive.google.com/drive/folders/ABC123..."
                className="flex-1 rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-white/25 focus:border-amber-500/50 focus:outline-none"
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); fetchGoogleDriveFolder(); } }}
              />
              <button
                type="button"
                onClick={fetchGoogleDriveFolder}
                disabled={fetchingDrive || !gdriveInput.trim()}
                className="flex items-center gap-2 rounded-xl bg-amber-500/20 px-4 py-2.5 text-sm font-medium text-amber-400 hover:bg-amber-500/30 transition-colors disabled:opacity-40"
              >
                {fetchingDrive ? <Loader2 className="h-4 w-4 animate-spin" /> : <FolderOpen className="h-4 w-4" />}
                {fetchingDrive ? "Loading..." : "Fetch"}
              </button>
            </div>
            <p className="text-[11px] text-white/30">
              ⓘ Folder must be set to "Anyone with the link can view" in Google Drive sharing settings.
            </p>
          </div>

          {/* Image grid from Drive */}
          {gdriveImages.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white/70">
                  Found <span className="text-amber-400 font-bold">{gdriveImages.length}</span> image{gdriveImages.length !== 1 ? "s" : ""}
                </p>
                {(onMultiple || gdriveImages.length >= 1) && (
                  <button
                    type="button"
                    onClick={applyAllGDriveImages}
                    className="flex items-center gap-1.5 rounded-lg bg-green-500/15 border border-green-500/25 px-3 py-1.5 text-xs font-medium text-green-400 hover:bg-green-500/25 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    {supportsMultiple ? "Add All Images" : "Use First Image"}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto rounded-xl border border-white/10 p-2">
                {gdriveImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => applyGDriveImage(img)}
                    className="relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-amber-500/60 transition-all group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`Drive image ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-amber-500/20 transition-colors flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-white/30 text-center">Click any image to select it</p>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5">
          <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
          <span className="text-red-400 text-xs font-medium">{error}</span>
        </div>
      )}

      {/* Preview of current value */}
      {value && (
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-900">
          <div className="relative h-44">
            {isDataUri ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <Image
                src={value.trim() || "/placeholder.svg"}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            )}
          </div>
          <button
            type="button"
            onClick={() => { onChange(""); setError(""); }}
            className="absolute right-2 top-2 rounded-full bg-slate-950/80 p-1.5 text-white/60 hover:text-white transition-colors"
            title="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
          {isDataUri && (
            <div className="absolute bottom-2 left-2 rounded-md bg-amber-500/20 border border-amber-500/30 px-2 py-1">
              <span className="text-[10px] text-amber-400 font-medium">Embedded image</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

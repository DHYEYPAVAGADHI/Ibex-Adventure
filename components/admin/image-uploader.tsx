"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Link as LinkIcon } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({ value, onChange, label = "Image" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      onChange(data.url || (data.asset && data.asset.url) || "");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function applyUrl() {
    if (urlInput.trim()) {
      let finalUrl = urlInput.trim();
      
      // Automatically convert Google Drive view links to direct image links
      const gDriveRegex = /drive\.google\.com\/file\/d\/([^\/]+)/;
      const match = finalUrl.match(gDriveRegex);
      if (match && match[1]) {
        finalUrl = `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
      
      onChange(finalUrl);
      setUrlInput("");
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-admin-label">{label}</label>

      <div className="flex gap-2 mb-3">
        <button type="button" onClick={() => setMode("upload")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${mode === "upload" ? "bg-amber-500/20 text-amber-400" : "text-admin-muted hover:text-admin-heading"}`}>
          <Upload className="inline h-3 w-3 mr-1" />Upload File
        </button>
        <button type="button" onClick={() => setMode("url")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${mode === "url" ? "bg-amber-500/20 text-amber-400" : "text-admin-muted hover:text-admin-heading"}`}>
          <LinkIcon className="inline h-3 w-3 mr-1" />Use URL
        </button>
      </div>

      {mode === "url" ? (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            placeholder="https://images.unsplash.com/... or Google Drive link"
            className="flex-1 rounded-xl border border-white/10 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-amber-500/50 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applyUrl();
              }
            }}
          />
          <button type="button" onClick={applyUrl}
            className="rounded-xl bg-amber-500/20 px-4 py-2.5 text-sm font-medium text-amber-400 hover:bg-amber-500/30 transition-colors">
            Apply
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/15 bg-admin-section-bg shadow-sm px-6 py-8 text-center transition-colors hover:border-amber-500/40 hover:bg-slate-900"
        >
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          {uploading ? (
            <p className="text-sm text-admin-muted">Uploading...</p>
          ) : (
            <>
              <Upload className="mb-2 h-8 w-8 text-admin-muted" />
              <p className="text-sm text-admin-muted">Drop image here or click to browse</p>
              <p className="mt-1 text-xs text-admin-muted">JPG, PNG, WEBP up to 5MB</p>
            </>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}

      {value && (
        <div className="relative mt-2 overflow-hidden rounded-xl border border-admin-section-border">
          <div className="relative h-40">
            <Image src={typeof value === 'string' && value.trim() !== "" ? value : "/placeholder.svg"} alt="Preview" fill className="object-cover" unoptimized />
          </div>
          <button type="button" onClick={() => onChange("")}
            className="absolute right-2 top-2 rounded-full bg-slate-950/80 p-1.5 text-admin-label hover:text-admin-heading transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

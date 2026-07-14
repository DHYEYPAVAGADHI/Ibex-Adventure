"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Upload, Trash2, Copy, Search, FolderOpen, ImageIcon,
  CheckCircle2, X, Loader2, RefreshCw, FileImage
} from "lucide-react";

interface MediaFile {
  url: string;
  fileName: string;
  sizeBytes: number;
  fileType: string;
  uploadedAt?: string;
}

export default function MediaLibraryAdmin() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setFiles(data.files || []);
      }
    } catch (e) {
      console.error("Failed to fetch media files:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => fetchFiles(), 0);
  }, [fetchFiles]);

  const handleUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      setUploadProgress(`Uploading ${file.name} (${i + 1}/${fileList.length})...`);
      const formData = new FormData();
      formData.append("file", file);
      try {
        await fetch("/api/admin/upload", { method: "POST", body: formData });
      } catch (e) {
        console.error("Upload failed:", e);
      }
    }

    setUploadProgress(null);
    setUploading(false);
    await fetchFiles();
  };

  const handleDelete = async (url: string) => {
    if (!confirm("Delete this image permanently?")) return;
    try {
      await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      setFiles((prev) => prev.filter((f) => f.url !== url));
      setSelectedFiles((prev) => {
        const next = new Set(prev);
        next.delete(url);
        return next;
      });
    } catch (e) {
      console.error("Delete failed:", e);
    }
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Delete ${selectedFiles.size} selected images?`)) return;
    for (const url of selectedFiles) {
      await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
    }
    setFiles((prev) => prev.filter((f) => !selectedFiles.has(f.url)));
    setSelectedFiles(new Set());
  };

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch {
      // fallback
    }
  };

  const toggleSelect = (url: string) => {
    setSelectedFiles((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
  };

  const filteredFiles = files.filter((f) =>
    f.fileName.toLowerCase().includes(search.toLowerCase())
  );

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="p-8 min-h-screen bg-slate-50">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Media Library</h1>
          <p className="text-slate-500 mt-1">
            {files.length} file{files.length !== 1 ? "s" : ""} uploaded
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedFiles.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg font-medium text-sm hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete {selectedFiles.size} selected
            </button>
          )}
          <button
            onClick={fetchFiles}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-medium text-sm hover:bg-slate-50 transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-admin-heading rounded-lg font-medium text-sm transition-colors disabled:opacity-60 shadow-sm"
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {uploading ? "Uploading..." : "Upload Images"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />
        </div>
      </div>

      {/* Upload progress */}
      {uploadProgress && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-sm font-medium">
          <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
          {uploadProgress}
        </div>
      )}

      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleUpload(e.dataTransfer.files);
        }}
        className={`mb-6 border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer
          ${dragOver
            ? "border-blue-500 bg-blue-50"
            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
          }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <FileImage className={`w-10 h-10 mx-auto mb-3 ${dragOver ? "text-blue-500" : "text-slate-300"}`} />
        <p className="font-semibold text-slate-600">
          {dragOver ? "Drop images here" : "Drag & drop images or click to upload"}
        </p>
        <p className="text-sm text-slate-400 mt-1">JPEG, PNG, WEBP, SVG — Max 50MB each. Auto-optimized to WebP.</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by filename..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredFiles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
          <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-lg font-semibold text-slate-700">
            {search ? "No matching images found" : "Media library is empty"}
          </p>
          <p className="text-sm text-slate-400 mt-2">
            {search ? "Try a different search term." : "Upload images using the button above."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredFiles.map((file) => {
            const isSelected = selectedFiles.has(file.url);
            const isCopied = copiedUrl === file.url;
            return (
              <div
                key={file.url}
                className={`group relative rounded-2xl overflow-hidden bg-slate-100 border-2 transition-all cursor-pointer
                  ${isSelected ? "border-blue-500 shadow-md shadow-blue-200" : "border-transparent hover:border-slate-200"}`}
              >
                {/* Image */}
                <div className="aspect-square relative" onClick={() => toggleSelect(file.url)}>
                  <Image
                    src={typeof file.url === 'string' && file.url.trim() !== "" ? file.url : "/placeholder.svg"}
                    alt={file.fileName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                  />
                  {/* Overlay on hover */}
                  <div className={`absolute inset-0 transition-opacity flex items-center justify-center gap-1
                    ${isSelected ? "bg-blue-900/30" : "bg-black/0 group-hover:bg-black/40"}`}>
                    {isSelected && (
                      <CheckCircle2 className="w-8 h-8 text-admin-heading drop-shadow" />
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleCopy(file.url); }}
                    className="p-1.5 bg-white/90 hover:bg-white rounded-lg shadow text-slate-600 hover:text-blue-600 transition-colors"
                    title="Copy URL"
                  >
                    {isCopied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(file.url); }}
                    className="p-1.5 bg-white/90 hover:bg-red-50 rounded-lg shadow text-slate-600 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* File info */}
                <div className="p-2 bg-white border-t border-slate-100">
                  <p className="text-[11px] text-slate-500 truncate" title={file.fileName}>
                    {file.fileName}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {formatSize(file.sizeBytes)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

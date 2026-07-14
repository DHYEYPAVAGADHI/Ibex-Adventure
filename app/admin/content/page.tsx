"use client";

import { FileText } from "lucide-react";

export default function ContentAdmin() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-slate-500 mt-2">Manage articles, about page, and other static content.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
        <div className="mx-auto w-16 h-16 bg-amber-50 text-amber-600 flex items-center justify-center rounded-2xl mb-4">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Content Editor Offline</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Content is currently being managed statically through the codebase files for improved performance and SEO.
        </p>
      </div>
    </div>
  );
}

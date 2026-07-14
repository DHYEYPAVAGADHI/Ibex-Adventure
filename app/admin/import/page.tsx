"use client";

import { Database } from "lucide-react";

export default function ImportAdmin() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Import Data</h1>
        <p className="text-slate-500 mt-2">Import bulk tours or content from CSV/JSON.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
        <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-2xl mb-4">
          <Database className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Bulk Import Disabled</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Bulk import is temporarily disabled. Please use the individual creation forms or update the local JSON stores directly.
        </p>
      </div>
    </div>
  );
}

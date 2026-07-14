"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export function DestinationDeleteButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setDeleting(true);
    try {
      await fetch(`/api/admin/destinations/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-admin-muted">Delete?</span>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-xs text-red-400 hover:text-red-300 font-medium disabled:opacity-50"
        >
          {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Yes"}
        </button>
        <button onClick={() => setConfirming(false)} className="text-xs text-admin-muted hover:text-admin-heading">
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-50/10 rounded-lg transition-colors"
      title="Delete destination"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

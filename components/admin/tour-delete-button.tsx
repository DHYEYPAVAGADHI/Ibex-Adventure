"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function TourDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this tour?")) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/tours/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete tour");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete tour");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-block disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

"use client";

import { TourForm } from "@/components/admin/tour-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewTourPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create tour");
      }

      router.push("/admin/tours");
    } catch (error: any) {
      console.error(error);
      alert(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Tour</h1>
        <p className="text-slate-500 mt-2">Fill out the details below to add a new expedition to your catalog.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <TourForm
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Create Tour"
        />
      </div>
    </div>
  );
}

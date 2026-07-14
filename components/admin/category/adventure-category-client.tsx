"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Loader2 } from "lucide-react";
import { AdventureCategoryTable } from "@/components/admin/category/adventure-category-table";
import { useRouter } from "next/navigation";

export function AdventureCategoryClient() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => fetchCategories(), 0);
  }, []);

  const handleReorder = async (reorderedItems: any[]) => {
    // Optimistic update
    setCategories(reorderedItems);
    
    try {
      await fetch("/api/admin/categories/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: reorderedItems.map(item => ({ id: item.id, displayOrder: item.displayOrder })),
        }),
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to save order:", error);
      fetchCategories(); // Revert on failure
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id));
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleDuplicate = async (category: any) => {
    try {
      const { id, createdAt, updatedAt, ...rest } = category;
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...rest,
          title: `${rest.title} (Copy)`,
          slug: `${rest.slug}-copy-${Math.floor(Math.random() * 1000)}`,
        }),
      });
      if (res.ok) {
        fetchCategories();
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to duplicate category:", error);
    }
  };

  const filteredCategories = categories.filter((c) => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <Link
          href="/admin/categories/new"
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-admin-heading transition hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" /> Add Category
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
        </div>
      ) : (
        <AdventureCategoryTable 
          categories={filteredCategories} 
          onReorder={handleReorder}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
        />
      )}
    </div>
  );
}

import { AdventureCategoryClient } from "@/components/admin/category/adventure-category-client";

export default function CategoriesAdminPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Adventure Categories</h1>
        <p className="mt-2 text-slate-500">Manage homepage category cards, icons, and display order.</p>
      </div>
      <AdventureCategoryClient />
    </div>
  );
}

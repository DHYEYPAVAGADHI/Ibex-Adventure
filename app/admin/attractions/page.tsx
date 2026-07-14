import { Plus, Edit2, Eye } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AttractionDeleteButton } from "@/components/admin/attraction-delete-button";

export const dynamic = "force-dynamic";

export default async function AttractionsAdmin() {
  const attractions = await prisma.attraction.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      state: true,
      featured: true,
      published: true,
      displayOrder: true,
    },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-heading">Attractions</h1>
          <p className="text-slate-500 mt-2">Manage attraction pages. They appear in the marquee section on the homepage.</p>
        </div>
        <Link
          href="/admin/attractions/new"
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Attraction
        </Link>
      </div>

      <div className="bg-slate-900 rounded-xl shadow-sm border border-admin-section-border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 border-b border-admin-section-border text-sm font-medium text-admin-muted">
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">State</th>
              <th className="p-4">Order</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attractions.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">
                  No attractions yet.{" "}
                  <Link href="/admin/attractions/new" className="text-amber-400 hover:underline">
                    Create your first attraction
                  </Link>
                </td>
              </tr>
            )}
            {attractions.map((attr) => (
              <tr key={attr.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-white">{attr.title}</td>
                <td className="p-4">
                  <span className="inline-flex px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs font-semibold">{attr.category}</span>
                </td>
                <td className="p-4 text-admin-muted text-sm">{attr.state || "—"}</td>
                <td className="p-4 text-admin-muted text-sm">{attr.displayOrder}</td>
                <td className="p-4">
                  {attr.featured ? (
                    <span className="inline-flex px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">Featured</span>
                  ) : <span className="text-white/20 text-xs">—</span>}
                </td>
                <td className="p-4">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                    attr.published ? "bg-green-500/10 text-green-400" : "bg-slate-500/10 text-slate-400"
                  }`}>
                    {attr.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/attractions/${attr.slug}`}
                      target="_blank"
                      className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/admin/attractions/${attr.id}`}
                      className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <AttractionDeleteButton id={attr.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

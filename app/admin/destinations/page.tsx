import { Plus, Edit2, Eye } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DestinationDeleteButton } from "@/components/admin/destination-delete-button";

export const dynamic = "force-dynamic";

export default async function DestinationsAdmin() {
  const destinations = await prisma.destination.findMany({
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      state: true,
      country: true,
      featured: true,
      published: true,
      displayOrder: true,
      createdAt: true,
    },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-heading">Destinations</h1>
          <p className="text-slate-500 mt-2">Manage all destination pages. Changes appear on the homepage and detail pages instantly.</p>
        </div>
        <Link
          href="/admin/destinations/new"
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" /> Add Destination
        </Link>
      </div>

      <div className="bg-slate-900 rounded-xl shadow-sm border border-admin-section-border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 border-b border-admin-section-border text-sm font-medium text-admin-muted">
              <th className="p-4">Title</th>
              <th className="p-4">Location</th>
              <th className="p-4">Order</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">
                  No destinations yet.{" "}
                  <Link href="/admin/destinations/new" className="text-amber-400 hover:underline">
                    Create your first destination
                  </Link>
                </td>
              </tr>
            )}
            {destinations.map((dest: any) => (
              <tr key={dest.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-admin-heading">{dest.title}</td>
                <td className="p-4 text-admin-muted text-sm">
                  {[dest.state, dest.country].filter(Boolean).join(", ") || "—"}
                </td>
                <td className="p-4 text-admin-muted text-sm">{dest.displayOrder}</td>
                <td className="p-4">
                  {dest.featured ? (
                    <span className="inline-flex px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">Featured</span>
                  ) : (
                    <span className="text-white/20 text-xs">—</span>
                  )}
                </td>
                <td className="p-4">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                    dest.published ? "bg-green-500/10 text-green-400" : "bg-slate-500/10 text-slate-400"
                  }`}>
                    {dest.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/destinations/${dest.slug}`}
                      target="_blank"
                      className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/admin/destinations/${dest.id}`}
                      className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <DestinationDeleteButton id={dest.id} />
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

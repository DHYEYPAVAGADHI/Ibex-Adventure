import { Plus, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { TourDeleteButton } from "@/components/admin/tour-delete-button";

export const dynamic = "force-dynamic";

export default async function ToursAdmin() {
  const tours = await prisma.package.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tour Management</h1>
          <p className="text-slate-500 mt-2">Manage all your expedition packages.</p>
        </div>
        <Link 
          href="/admin/tours/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-admin-heading px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" /> Add New Tour
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-600">
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-slate-500">
                  No tours found. Create one to get started.
                </td>
              </tr>
            )}
            {tours.map((tour) => (
              <tr key={tour.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-medium text-slate-800">{tour.title}</td>
                <td className="p-4">
                  <span className="inline-flex px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-semibold">
                    {tour.category}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                    tour.status === "active" || tour.status === "Active" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                  }`}>
                    {tour.status === "active" ? "Active" : "Draft"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link 
                      href={`/admin/tours/${tour.id}`}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-block"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <TourDeleteButton id={tour.id} />
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

import { Mountain, ImageIcon, LayoutDashboard, Settings } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [totalTours, totalCategories, totalMemories] = await Promise.all([
    prisma.package.count(),
    prisma.adventureCategory.count(),
    prisma.memory.count(),
  ]);

  const publishedTours = await prisma.package.count({ where: { status: "active" } });

  const stats = [
    {
      label: "Total Tours",
      value: totalTours,
      sub: `${publishedTours} published`,
      icon: Mountain,
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-200",
    },
    {
      label: "Activities",
      value: totalCategories,
      sub: "Adventure categories",
      icon: LayoutDashboard,
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    {
      label: "Memories",
      value: totalMemories,
      sub: "Gallery photos",
      icon: ImageIcon,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-200",
    },
    {
      label: "Site Status",
      value: "Live",
      sub: "Production ready",
      icon: Settings,
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2">Welcome back to the Ibex Adventure admin panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(({ label, value, sub, icon: Icon, bg, text, border }) => (
          <div
            key={label}
            className={`bg-white rounded-2xl p-6 border ${border} shadow-sm flex items-start gap-4`}
          >
            <div className={`p-3 ${bg} ${text} rounded-xl flex-shrink-0`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
              <p className="text-xs text-slate-400 mt-1">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Quick Actions</h2>
        <p className="text-slate-500 mb-6 text-sm">Manage your core content from here.</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/tours/new"
            className="px-5 py-2.5 bg-slate-900 text-admin-heading rounded-xl font-medium hover:bg-black transition-colors text-sm"
          >
            + Create New Tour
          </Link>
          <Link
            href="/admin/media"
            className="px-5 py-2.5 bg-blue-50 text-blue-700 rounded-xl font-medium hover:bg-blue-100 transition-colors text-sm"
          >
            Media Library
          </Link>
          <Link
            href="/admin/memories"
            className="px-5 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl font-medium hover:bg-emerald-100 transition-colors text-sm"
          >
            Gallery Memories
          </Link>
          <Link
            href="/admin/hero"
            className="px-5 py-2.5 bg-amber-50 text-amber-700 rounded-xl font-medium hover:bg-amber-100 transition-colors text-sm"
          >
            Edit Hero Section
          </Link>
        </div>
      </div>

      {/* Module Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Website Modules</h3>
          <div className="space-y-3">
            {[
              { name: "Hero Section", href: "/admin/hero", status: "Live" },
              { name: "Homepage Cards", href: "/admin/homepage-cards", status: "Live" },
              { name: "Contact Info", href: "/admin/contact-info", status: "Live" },
            ].map(({ name, href, status }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <span className="font-medium text-slate-700 group-hover:text-slate-900 text-sm">{name}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 font-semibold">{status}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Business Modules</h3>
          <div className="space-y-3">
            {[
              { name: "Tours Management", href: "/admin/tours", count: `${totalTours} tours` },
              { name: "Activities", href: "/admin/categories", count: `${totalCategories} categories` },
              { name: "Memories Gallery", href: "/admin/memories", count: `${totalMemories} photos` },
            ].map(({ name, href, count }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <span className="font-medium text-slate-700 group-hover:text-slate-900 text-sm">{name}</span>
                <span className="text-xs text-slate-400">{count}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

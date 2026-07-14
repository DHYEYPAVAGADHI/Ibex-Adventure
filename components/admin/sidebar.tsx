"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mountain,
  FolderOpen,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  Image as ImageIcon,
  MapPin,
  Compass,
} from "lucide-react";
import { useSettings } from "@/components/providers/settings-provider";

const navGroups = [
  {
    title: "WEBSITE CONTENT",
    items: [
      { label: "Hero Section", href: "/admin/hero", icon: Mountain },
      { label: "Homepage Cards", href: "/admin/homepage-cards", icon: LayoutDashboard },
      { label: "Contact Info", href: "/admin/contact-info", icon: FileText },
    ],
  },
  {
    title: "BUSINESS MANAGEMENT",
    items: [
      { label: "Activities", href: "/admin/categories", icon: FolderOpen },
      { label: "Tours", href: "/admin/tours", icon: Mountain },
      { label: "Destinations", href: "/admin/destinations", icon: MapPin },
      { label: "Attractions", href: "/admin/attractions", icon: Compass },
      { label: "Enquiries", href: "/admin/enquiries", icon: FileText },
      { label: "Memories", href: "/admin/memories", icon: ImageIcon },
    ],
  },
  {
    title: "MEDIA",
    items: [
      { label: "Media Library", href: "/admin/media", icon: ImageIcon },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logoUrl } = useSettings();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/10 bg-slate-950">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        {logoUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={logoUrl} alt="Ibex Adventure" className="h-8 w-auto object-contain" />
        ) : (
          <>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <Mountain className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Ibex Adventure</p>
              <p className="text-xs text-white/40">Admin Panel</p>
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
        {/* Dashboard (Top level) */}
        <Link
          href="/admin/dashboard"
          className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
            pathname === "/admin/dashboard" || pathname.startsWith("/admin/dashboard/")
              ? "bg-amber-500/15 text-amber-400"
              : "text-white/60 hover:bg-white/5 hover:text-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </div>
          {(pathname === "/admin/dashboard" || pathname.startsWith("/admin/dashboard/")) && <ChevronRight className="h-3 w-3" />}
        </Link>

        {navGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            <h3 className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-amber-500/15 text-amber-400"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </div>
                    {isActive && <ChevronRight className="h-3 w-3" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 transition-all hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

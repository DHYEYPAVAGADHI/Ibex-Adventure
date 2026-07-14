import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="w-64 flex-shrink-0">
        <AdminSidebar />
      </div>
      <main className="flex-1 overflow-auto bg-slate-50 text-slate-900">
        {children}
      </main>
    </div>
  );
}

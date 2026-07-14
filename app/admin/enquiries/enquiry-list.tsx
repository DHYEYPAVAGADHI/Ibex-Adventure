"use client";

import { useState } from "react";
import { Enquiry } from "@prisma/client";

export function EnquiryList({ initialEnquiries }: { initialEnquiries: Enquiry[] }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [updating, setUpdating] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((eq) => (eq.id === id ? { ...eq, status } : eq))
        );
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "In Progress": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Closed": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-4">
      {enquiries.length === 0 ? (
        <div className="rounded-xl border border-white/5 bg-white/5 p-12 text-center text-admin-muted">
          No enquiries found.
        </div>
      ) : (
        enquiries.map((enquiry) => (
          <div key={enquiry.id} className="rounded-xl border border-white/5 bg-white/5 p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="font-medium text-admin-heading text-lg">{enquiry.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(enquiry.status)}`}>
                  {enquiry.status}
                </span>
                <span className="text-xs text-admin-muted ml-auto">
                  {new Date(enquiry.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="flex gap-4 text-sm text-admin-muted flex-wrap">
                <a href={`mailto:${enquiry.email}`} className="hover:text-amber-400">{enquiry.email}</a>
                <span>•</span>
                <a href={`tel:${enquiry.phone.replace(/[^\d+]/g, '')}`} className="hover:text-amber-400">{enquiry.phone}</a>
                {enquiry.subject && (
                  <>
                    <span>•</span>
                    <span className="font-medium text-admin-label">{enquiry.subject}</span>
                  </>
                )}
              </div>
              <div className="bg-slate-950/50 rounded-lg p-4 text-sm text-admin-muted whitespace-pre-wrap mt-2">
                {enquiry.message}
              </div>
            </div>
            
            <div className="flex flex-col gap-2 shrink-0 border-l border-white/5 pl-6">
              <span className="text-xs text-admin-muted mb-1 font-medium uppercase tracking-wider">Update Status</span>
              <select
                disabled={updating === enquiry.id}
                value={enquiry.status}
                onChange={(e) => updateStatus(enquiry.id, e.target.value)}
                className="bg-slate-950 border border-white/10 rounded-md px-3 py-2 text-sm text-admin-heading outline-none focus:border-amber-500 transition-colors"
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

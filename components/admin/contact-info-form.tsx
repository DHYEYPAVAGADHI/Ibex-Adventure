"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/primary-button";
import { Save, AlertCircle } from "lucide-react";

interface ContactInfoFormProps {
  initialData?: {
    address?: string;
    phone?: string;
    email?: string;
    googleMapsUrl?: string;
    whatsapp?: string;
    socialLinks?: string;
    businessHours?: string;
  };
}

export function ContactInfoForm({ initialData }: ContactInfoFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    address: initialData?.address || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    googleMapsUrl: initialData?.googleMapsUrl || "",
    whatsapp: initialData?.whatsapp || "",
    socialLinks: initialData?.socialLinks || "{}",
    businessHours: initialData?.businessHours || "{}",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/contact-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save contact info");
      }

      router.refresh();
      alert("Contact information updated successfully.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 flex gap-3 text-red-400">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="rounded-2xl border border-admin-section-border bg-slate-950 p-6 space-y-6 shadow-xl">
        <h2 className="text-lg font-medium text-admin-heading border-b border-admin-section-border pb-4">General Contact Details</h2>
        
        <div className="grid gap-6">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-white/80">Physical Address</span>
            <textarea
              required
              rows={4}
              value={form.address}
              onChange={(e) => setForm(prev => ({ ...prev, address: e.target.value }))}
              className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500 resize-none"
              placeholder="e.g. Corporate House, Infront of Geneva Liberal School..."
            />
          </label>

          <div className="grid sm:grid-cols-2 gap-6">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-white/80">Phone Number</span>
              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500"
                placeholder="+91 76008 80908"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-white/80">Email Address</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500"
                placeholder="contact@ibexadventure.in"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-white/80">WhatsApp Number</span>
              <input
                type="text"
                value={form.whatsapp}
                onChange={(e) => setForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500"
                placeholder="+91 76008 80908"
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-white/80">Business Hours (JSON)</span>
            <textarea
              rows={3}
              value={form.businessHours}
              onChange={(e) => setForm(prev => ({ ...prev, businessHours: e.target.value }))}
              className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500 resize-none font-mono text-sm"
              placeholder='{"Mon-Fri": "9 AM - 6 PM", "Sat": "10 AM - 4 PM"}'
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-white/80">Social Links (JSON)</span>
            <textarea
              rows={3}
              value={form.socialLinks}
              onChange={(e) => setForm(prev => ({ ...prev, socialLinks: e.target.value }))}
              className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500 resize-none font-mono text-sm"
              placeholder='{"instagram": "url", "facebook": "url"}'
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-white/80">Google Maps URL (Optional)</span>
            <input
              type="url"
              value={form.googleMapsUrl}
              onChange={(e) => setForm(prev => ({ ...prev, googleMapsUrl: e.target.value }))}
              className="w-full rounded-xl border border-admin-section-border bg-slate-900 px-4 py-3 text-admin-heading outline-none transition focus:border-amber-500"
              placeholder="https://maps.google.com/..."
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <PrimaryButton type="submit" disabled={isSaving} className="gap-2">
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </PrimaryButton>
      </div>
    </form>
  );
}

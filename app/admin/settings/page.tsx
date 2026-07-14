"use client";

import { useState, useEffect } from "react";
import { Settings, Save, Loader2, Image as ImageIcon } from "lucide-react";
import { ImageUploader } from "@/components/admin/image-uploader";
import { useRouter } from "next/navigation";

export default function SettingsAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string>("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.logoUrl) setLogoUrl(data.logoUrl);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logoUrl }),
      });

      if (!res.ok) throw new Error("Failed to save settings");

      alert("Settings saved successfully!");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-heading">Platform Settings</h1>
          <p className="text-slate-500 mt-2">Configure global preferences and branding.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Save Changes
        </button>
      </div>

      <div className="grid gap-8">
        {/* Branding Section */}
        <div className="bg-slate-900 rounded-xl shadow-sm border border-admin-section-border overflow-hidden">
          <div className="p-6 border-b border-admin-section-border flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <ImageIcon className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-admin-heading">Website Branding</h2>
              <p className="text-slate-400 text-sm mt-1">Manage your website logo and visual identity.</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="max-w-xl">
              <ImageUploader
                label="Website Logo (Navbar & Footer)"
                value={logoUrl}
                onChange={(url) => setLogoUrl(url)}
              />
              <p className="text-sm text-slate-500 mt-4">
                Recommended size: 200x60px. Supports PNG, JPG, SVG, and WEBP. Leave empty to use the default text-based logo.
              </p>
            </div>
          </div>
        </div>

        {/* Other settings lock message */}
        <div className="bg-slate-900 rounded-xl shadow-sm border border-admin-section-border p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-slate-800 text-slate-400 flex items-center justify-center rounded-2xl mb-4 border border-white/5">
            <Settings className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-admin-heading mb-2">Other Settings Locked</h2>
          <p className="text-slate-500 max-w-md mx-auto">
            System settings like database URLs and secrets are locked to environment variables (.env.local) for security purposes.
          </p>
        </div>
      </div>
    </div>
  );
}

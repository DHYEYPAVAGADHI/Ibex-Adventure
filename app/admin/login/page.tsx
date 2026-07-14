"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // Successful login, force a hard reload to ensure middleware and cookies sync perfectly
        window.location.href = "/admin/dashboard";
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08132B] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-[#08132B] to-[#08132B] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md p-8 md:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-white font-bold tracking-tight mb-2">Ibex Admin</h1>
          <p className="text-white/60 font-light">Enter your credentials to access the dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 pl-1">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/20 border border-white/10 text-white placeholder-white/30 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                placeholder="admin@ibexadventure.in"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 pl-1">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/20 border border-white/10 text-white placeholder-white/30 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#FFD700] hover:bg-[#FF8C00] text-[#08132B] font-bold py-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-8 shadow-[0_0_20px_rgba(255,215,0,0.2)]"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Secure Login</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

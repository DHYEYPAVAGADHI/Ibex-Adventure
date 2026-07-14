import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: "amber" | "emerald" | "blue" | "rose";
  description?: string;
}

const colorMap = {
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", ring: "ring-amber-500/20" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", ring: "ring-emerald-500/20" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", ring: "ring-blue-500/20" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-400", ring: "ring-rose-500/20" },
};

export function StatCard({ label, value, icon: Icon, color, description }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/8 bg-slate-900/60 p-6 backdrop-blur">
      <div className={`rounded-xl p-3 ring-1 ${c.bg} ${c.ring}`}>
        <Icon className={`h-5 w-5 ${c.text}`} />
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm font-medium text-white/60">{label}</p>
        {description && <p className="mt-1 text-xs text-white/40">{description}</p>}
      </div>
    </div>
  );
}

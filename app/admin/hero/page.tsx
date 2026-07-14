import { prisma } from "@/lib/prisma";
import { HeroForm } from "@/components/admin/hero-form";
import { HeroSection } from "@/sections/hero-section";

export const dynamic = "force-dynamic";

export default async function HeroPage() {
  const hero = await prisma.heroSection.findFirst();

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-12">
      <HeroForm initialData={hero} />

      <div className="mt-16 pt-12 border-t border-admin-section-border">
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-admin-heading">Live Hero Preview</h2>
          <p className="text-sm text-admin-muted">This is exactly how the hero banner looks on the live website.</p>
        </div>
        
        {/* We use a container that limits the height for preview purposes, or just show it full size but scaled down */}
        <div className="rounded-3xl border border-admin-section-border bg-slate-950 overflow-hidden shadow-2xl shadow-black/50 h-[800px] relative">
          <div className="absolute inset-0 overflow-y-auto overflow-x-hidden origin-top scale-100">
            <HeroSection />
          </div>
        </div>
      </div>
    </div>
  );
}

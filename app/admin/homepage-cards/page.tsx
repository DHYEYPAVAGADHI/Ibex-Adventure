import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CardList } from "@/components/admin/homepage-cards/card-list";
import { DiscoverySection } from "@/sections/discovery-section";

export const dynamic = "force-dynamic";

export default async function HomepageCardsPage() {
  const cards = await prisma.homepageAdventureCard.findMany({
    orderBy: { displayOrder: "asc" },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-admin-heading tracking-tight">Homepage Adventure Cards</h1>
          <p className="mt-2 text-admin-muted max-w-xl">
            Manage the homepage adventure cards displayed in the &quot;Start with the kind of adventure that inspires you&quot; section.
          </p>
        </div>
        <Link
          href="/admin/homepage-cards/new"
          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:bg-amber-400 hover:scale-105 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Add New Card
        </Link>
      </div>

      <div className="rounded-2xl border border-admin-section-border bg-white/5 p-6 backdrop-blur-sm">
        <CardList initialCards={cards} />
      </div>

      <div className="mt-16 pt-8 border-t border-admin-section-border">
        <div className="mb-8">
          <h2 className="text-xl font-medium text-admin-heading">Homepage Preview</h2>
          <p className="text-sm text-admin-muted">This is exactly how the section will look on the live website.</p>
        </div>
        <div className="rounded-3xl border border-admin-section-border bg-slate-950 overflow-hidden shadow-2xl shadow-black/50">
          <DiscoverySection />
        </div>
      </div>
    </div>
  );
}

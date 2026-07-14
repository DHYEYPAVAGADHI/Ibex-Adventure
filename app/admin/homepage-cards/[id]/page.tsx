import { CardForm } from "@/components/admin/homepage-cards/card-form";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function EditCardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const card = await prisma.homepageAdventureCard.findUnique({
    where: { id },
  });

  if (!card) {
    notFound();
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <CardForm initialData={card} />
    </div>
  );
}

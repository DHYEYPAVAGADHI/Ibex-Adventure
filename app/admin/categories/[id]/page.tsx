import { AdventureCategoryForm } from "@/components/admin/category/adventure-category-form";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const category = await prisma.activity.findUnique({
    where: { id },
  });

  if (!category) {
    notFound();
  }

  const formattedCategory = {
    ...category,
    description: category.description || "",
    image: category.image || "",
    imageAlt: category.imageAlt || "",
    icon: category.icon || "",
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <AdventureCategoryForm initialData={formattedCategory} />
    </div>
  );
}

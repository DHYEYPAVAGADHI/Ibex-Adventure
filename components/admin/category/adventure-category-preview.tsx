import Image from "next/image";
import { DynamicIcon } from "@/components/dynamic-icon";

interface CategoryPreviewProps {
  title: string;
  description: string;
  image: string;
  icon: string;
}

export function AdventureCategoryPreview({ title, description, image, icon }: CategoryPreviewProps) {
  // Use a fallback for the image if it's empty so it doesn't crash Next Image
  const displayImage = image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-bold text-slate-800">Live Preview</h3>
      
      {/* We put the card in a dark background container to mimic the homepage */}
      <div className="flex justify-center rounded-xl bg-slate-950 p-8">
        <div className="w-full max-w-[340px]">
          <article className="group relative min-h-[25rem] w-full overflow-hidden rounded-[2rem] border border-admin-section-border">
            <Image
              src={typeof displayImage === 'string' && displayImage.trim() !== "" ? displayImage : "/placeholder.svg"}
              alt={title || "Preview"}
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
              sizes="340px"
              unoptimized={displayImage.startsWith("data:") || displayImage.startsWith("blob:")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent transition duration-300 group-hover:from-slate-950/95" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-admin-heading backdrop-blur-sm">
                <DynamicIcon icon={icon || "Mountain"} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-admin-heading">
                {title || "Category Title"}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/75">
                {description || "A short description of this adventure category will appear here."}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

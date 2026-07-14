import Image from "next/image";
import { Star } from "lucide-react";

export interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
  image: string;
  stars: number;
}

export function TestimonialCard({ name, role, text, image, stars }: TestimonialCardProps) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10 hover:border-white/20">
      {/* Star Rating */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < stars ? "fill-amber-300 text-amber-300" : "text-white/20"}`}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="mt-4 text-sm leading-relaxed text-white/80 italic">&quot;{text}&quot;</p>

      {/* Author Info */}
      <div className="mt-6 flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/20">
          <Image
            src={typeof image === 'string' && image.trim() !== "" ? image : "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{name}</p>
          <p className="text-xs text-white/60">{role}</p>
        </div>
      </div>
    </div>
  );
}

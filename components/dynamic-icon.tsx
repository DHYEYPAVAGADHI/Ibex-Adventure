import * as LucideIcons from "lucide-react";
import Image from "next/image";

interface DynamicIconProps {
  icon: string;
  className?: string;
}

export function DynamicIcon({ icon, className = "" }: DynamicIconProps) {
  if (!icon) return null;

  // Handle uploaded SVG or image URLs
  if (icon.startsWith("http") || icon.startsWith("/")) {
    // If it's a relative or absolute URL, render as an image.
    // For SVG icons, we can just use a regular img tag for simpler styling or next/image.
    return (
      <div className={`relative ${className}`}>
        <Image src={typeof icon === 'string' && icon.trim() !== "" ? icon : "/placeholder.svg"} alt="Category Icon" fill className="object-contain" unoptimized />
      </div>
    );
  }

  // Handle Lucide Icons
  const IconComponent = (LucideIcons as any)[icon];
  
  if (IconComponent) {
    return <IconComponent className={className} />;
  }

  return null;
}

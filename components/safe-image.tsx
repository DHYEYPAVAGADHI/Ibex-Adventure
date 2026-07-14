"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Mountain } from "lucide-react";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackIcon?: React.ReactNode;
}

export function SafeImage({ src, alt, className, fallbackIcon, ...props }: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-slate-900 text-white/20 ${className}`}>
        {fallbackIcon || <Mountain className="h-12 w-12 opacity-30" />}
        <span className="text-xs mt-2 uppercase tracking-widest opacity-50">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={typeof src === 'string' && src.trim() !== "" ? src : "/placeholder.svg"}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}

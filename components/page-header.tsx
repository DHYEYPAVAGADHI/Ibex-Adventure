import Link from "next/link";
import { SafeImage } from "@/components/safe-image";

type Crumb = { label: string; href?: string };

export function PageHeader({
  eyebrow,
  title,
  lede,
  image,
  crumbs,
  align = "left",
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  image?: string;
  crumbs?: Crumb[];
  align?: "left" | "center";
  compact?: boolean;
}) {
  return (
    <section
      className={`relative flex items-end overflow-hidden bg-[var(--color-forest)] ${
        compact ? "min-h-[42vh] pt-28" : "min-h-[58vh] pt-32"
      }`}
    >
      {image && (
        <div className="absolute inset-0">
          <SafeImage src={image} alt="" fill className="object-cover" unoptimized priority />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        </div>
      )}
      <div
        className={`container-wide relative z-10 pb-12 ${
          align === "center" ? "text-center" : ""
        }`}
      >
        {crumbs && (
          <nav
            className={`mb-5 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-lime)] ${
              align === "center" ? "justify-center" : ""
            }`}
          >
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span className="text-white/40">/</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-lime)]">
            {eyebrow}
          </p>
        )}
        <h1 className="display-hed text-[clamp(2.5rem,6vw,5rem)] text-white">{title}</h1>
        {lede && (
          <p
            className={`mt-5 text-base font-medium leading-relaxed text-white/85 md:text-lg ${
              align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
            }`}
          >
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}

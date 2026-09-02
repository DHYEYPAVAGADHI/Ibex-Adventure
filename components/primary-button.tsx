import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

// Primary button: Forest green background, white text
export const primaryButtonClasses =
  "inline-flex items-center justify-center gap-2 rounded-full border-none bg-[var(--color-forest-mid)] px-7 py-3.5 text-sm font-semibold text-white shadow-none transition-all duration-300 hover:bg-[var(--color-forest)] hover:shadow-lg hover:shadow-[var(--color-forest-mid)]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest-mid)] disabled:opacity-50 disabled:cursor-not-allowed group";

// Secondary button: Transparent background, forest green border
export const secondaryButtonClasses =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-forest-mid)] bg-transparent px-7 py-3.5 text-sm font-semibold text-[var(--color-forest-mid)] transition-all duration-300 hover:bg-[var(--color-forest-mid)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest-mid)] disabled:opacity-50 disabled:cursor-not-allowed group";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

type PrimaryButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  variant?: "primary" | "secondary" | "gold";
} & ButtonProps &
  AnchorProps;

export function PrimaryButton({
  children,
  className = "",
  href,
  variant = "primary",
  ...props
}: PrimaryButtonProps) {
  const base =
    variant === "secondary"
      ? secondaryButtonClasses
      : variant === "gold"
      ? "inline-flex items-center justify-center gap-2 rounded-full border-none bg-[#D4AF37] px-7 py-3.5 text-sm font-semibold text-[#172C21] transition-all duration-300 hover:bg-[#FED65B] hover:shadow-lg hover:shadow-[#D4AF37]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#172C21] disabled:opacity-50 disabled:cursor-not-allowed"
      : primaryButtonClasses;

  const combined = `${base} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combined} {...(props as AnchorProps)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combined} {...(props as ButtonProps)}>
      {children}
    </button>
  );
}

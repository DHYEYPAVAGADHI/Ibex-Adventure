import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

// Gold button on forest green background — the editorial primary action
export const primaryButtonClasses =
  "inline-flex items-center justify-center gap-2 rounded-full border-none bg-[#172C21] px-7 py-3.5 text-sm font-semibold text-white shadow-none transition-all duration-300 hover:bg-[#2D4236] hover:shadow-lg hover:shadow-[#172C21]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed";

// Gold outlined variant for use on forest-green backgrounds
export const secondaryButtonClasses =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[#D4AF37] bg-transparent px-7 py-3.5 text-sm font-semibold text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed";

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

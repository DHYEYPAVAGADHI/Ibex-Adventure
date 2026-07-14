import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

export const primaryButtonClasses = "inline-flex items-center justify-center rounded-xl border-none bg-[#FFD700] px-6 py-3 text-sm font-bold text-slate-950 shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#FF8C00] hover:shadow-xl hover:shadow-[#FF8C00]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD700]";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

type PrimaryButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
} & ButtonProps & AnchorProps;

export function PrimaryButton({
  children,
  className = "",
  href,
  ...props
}: PrimaryButtonProps) {
  // We use simple concatenation. Users of this component should avoid passing classes that directly conflict with primaryButtonClasses unless they know what they are doing.
  const combinedClasses = `${primaryButtonClasses} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...(props as AnchorProps)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...(props as ButtonProps)}>
      {children}
    </button>
  );
}

import { PrimaryButton } from "./primary-button";
import type { ReactNode } from "react";

type WhatsappButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function WhatsappButton({
  href,
  children,
  className = "",
}: WhatsappButtonProps) {
  return (
    <PrimaryButton href={href} className={className} target="_blank" rel="noreferrer">
      {children}
    </PrimaryButton>
  );
}

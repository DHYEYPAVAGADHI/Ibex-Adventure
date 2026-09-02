import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEGAL_DOCS } from "@/lib/legal";
import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Ibex Adventure collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  const doc = LEGAL_DOCS.privacy;
  if (!doc) notFound();
  return <LegalDocument doc={doc} />;
}

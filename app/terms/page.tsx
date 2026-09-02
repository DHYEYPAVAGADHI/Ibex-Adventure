import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/legal-document";
import { LEGAL_DOCS } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Booking terms and conditions for Ibex Adventure journeys and programs.",
};

export default function TermsPage() {
  const doc = LEGAL_DOCS.terms;
  if (!doc) notFound();
  return <LegalDocument doc={doc} />;
}

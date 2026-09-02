import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEGAL_DOCS } from "@/lib/legal";
import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy",
  description: "Cancellation charges and refund process for Ibex Adventure bookings.",
};

export default function CancellationPage() {
  const doc = LEGAL_DOCS.cancellation;
  if (!doc) notFound();
  return <LegalDocument doc={doc} />;
}

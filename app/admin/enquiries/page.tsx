import { prisma } from "@/lib/prisma";
import { EnquiryList } from "./enquiry-list";

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-admin-heading">Enquiries</h1>
        <p className="text-admin-muted mt-2">
          View and manage website contact forms and enquiries.
        </p>
      </div>
      <EnquiryList initialEnquiries={enquiries} />
    </div>
  );
}

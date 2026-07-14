import { prisma } from "@/lib/prisma";
import { ContactInfoForm } from "@/components/admin/contact-info-form";

export const dynamic = "force-dynamic";

export default async function ContactInfoPage() {
  const contactInfo = await prisma.contactInformation.findFirst();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-admin-heading tracking-tight">Contact Information</h1>
        <p className="mt-2 text-admin-muted max-w-xl">
          Manage the official contact details displayed in the footer, contact page, and SEO schema.
        </p>
      </div>

      <ContactInfoForm 
        initialData={contactInfo ? {
          ...contactInfo,
          googleMapsUrl: contactInfo.googleMapsUrl || undefined,
          whatsapp: contactInfo.whatsapp || undefined,
          socialLinks: contactInfo.socialLinks || undefined,
          businessHours: contactInfo.businessHours || undefined,
        } : undefined} 
      />
    </div>
  );
}

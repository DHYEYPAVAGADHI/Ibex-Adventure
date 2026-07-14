import { prisma } from "@/lib/prisma";

export async function getContactInfo() {
  const contactInfo = await prisma.contactInformation.findFirst();
  return {
    phone: contactInfo?.phone || "+91 76008 80908",
    whatsapp: contactInfo?.whatsapp || contactInfo?.phone || "+91 76008 80908",
    email: contactInfo?.email || "contact@ibexadventure.in",
    address: contactInfo?.address || "",
    googleMapsUrl: contactInfo?.googleMapsUrl || "",
    socialLinks: contactInfo?.socialLinks || "[]",
    businessHours: contactInfo?.businessHours || "[]",
  };
}

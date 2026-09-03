import { prisma } from "@/lib/prisma";

const FALLBACK = {
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  email: "info@ibexadventure.com",
  address: "",
  googleMapsUrl: "",
  socialLinks: "[]",
  businessHours: "[]",
};

export async function getContactInfo() {
  let contactInfo: Awaited<ReturnType<typeof prisma.contactInformation.findFirst>> = null;
  try {
    contactInfo = await prisma.contactInformation.findFirst();
  } catch (err) {
    // DB unreachable (e.g. during build) — fall back to defaults so pages still render.
    console.warn("[getContactInfo] DB unavailable, using defaults:", (err as Error).message);
    return FALLBACK;
  }
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

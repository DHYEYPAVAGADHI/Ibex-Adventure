import { prisma } from "@/lib/prisma";
import { ContactClient } from "./contact-client";
import Script from "next/script";

export default async function ContactPage() {
  const contactInfo = await prisma.contactInformation.findFirst();

  const address = contactInfo?.address || "Corporate House, Infront of Geneva Liberal School, Near Cliantha Research, Opp. Applewood Township, Sarkhej–Okaf, Ahmedabad, Gujarat – 382210";
  const phone = contactInfo?.phone || "+91 76008 80908";
  const email = contactInfo?.email || "contact@ibexadventure.in";

  const addressQuery = contactInfo?.googleMapsUrl || 
    `https://maps.google.com/?q=${encodeURIComponent(address)}`;

  return (
    <>
      <Script id="contact-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Ibex Adventure",
            "description": "Get in touch with Ibex Adventure for immersive outdoor programs, trekking expeditions, and customized travel packages.",
            "url": "https://ibexadventure.in/contact",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "${phone}",
              "contactType": "customer service",
              "email": "${email}"
            }
          }
        `}
      </Script>
      <ContactClient 
        addressQuery={addressQuery}
      />
    </>
  );
}

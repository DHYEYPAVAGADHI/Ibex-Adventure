"use client";

import { createContext, useContext } from "react";

interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  socialLinks: string;
  businessHours: string;
}

const ContactContext = createContext<ContactInfo>({
  phone: "+91 76008 80908",
  whatsapp: "+91 76008 80908",
  email: "contact@ibexadventure.in",
  address: "",
  googleMapsUrl: "",
  socialLinks: "[]",
  businessHours: "[]",
});

export function ContactProvider({
  children,
  initialContactInfo,
}: {
  children: React.ReactNode;
  initialContactInfo: ContactInfo;
}) {
  return (
    <ContactContext.Provider value={initialContactInfo}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  return context;
}

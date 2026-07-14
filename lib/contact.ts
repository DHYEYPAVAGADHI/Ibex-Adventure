export function buildWhatsappLink(phone: string, message: string = "Hello Ibex Adventure, I would like to know more about your tours.") {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function buildTelLink(phone: string) {
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  return `tel:${cleanPhone}`;
}

export function buildGeneralInquiry(phone: string) {
  return buildWhatsappLink(phone, "Hello Ibex Adventure, I have a general inquiry.");
}

export function buildProgramInquiry(phone: string, programName: string, customMessage?: string) {
  if (customMessage) {
    return buildWhatsappLink(phone, customMessage);
  }
  return buildWhatsappLink(
    phone,
    `Hi! 🏔️ I'm interested in the ${programName}. Could you please share more details about pricing, dates, and the booking process? Thanks!`,
  );
}

export function buildContactInquiry(phone: string, {
  name,
  userPhone,
  message,
}: {
  name: string;
  userPhone: string;
  message: string;
}) {
  return buildWhatsappLink(
    phone,
    `Hi! 👋\n\nName: ${name || "Visitor"}\nPhone: ${userPhone || "Not shared"}\n\nMessage: ${message || "I'd like to know more about your adventure programs."
    }\n\nLooking forward to hearing from you!`,
  );
}

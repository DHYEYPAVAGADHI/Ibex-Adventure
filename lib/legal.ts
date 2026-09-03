/**
 * Placeholder legal copy — replace with content reviewed by the operator's
 * legal advisor before going live. Each entry renders as an editorial page
 * at /terms, /privacy and /cancellation.
 */
export type LegalDoc = {
  slug: "terms" | "privacy" | "cancellation";
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

export const LEGAL_DOCS: Record<LegalDoc["slug"], LegalDoc> = {
  terms: {
    slug: "terms",
    title: "Terms & Conditions",
    updated: "Last updated: January 2026",
    intro:
      "These terms govern your booking and participation in any journey, experience or program operated by Ibex Adventure. By making an enquiry or booking you accept them.",
    sections: [
      {
        heading: "Bookings & payment",
        body: [
          "A booking is confirmed only on receipt of the advance payment stated in your journey confirmation.",
          "The balance is due 21 days before departure unless stated otherwise. Bookings made within 21 days require full payment.",
          "Prices are per person on a twin-sharing basis and are quoted in Indian Rupees.",
        ],
      },
      {
        heading: "Your responsibilities",
        body: [
          "You must carry valid identity documents and any permits we advise, and disclose medical conditions that may affect your participation.",
          "Our trip leaders may ask a participant to leave a journey if their conduct or health endangers the group; no refund is due in that case.",
        ],
      },
      {
        heading: "Changes by Ibex Adventure",
        body: [
          "Itineraries are a guide. Weather, road conditions, permits and safety may require changes on the ground, decided by the trip leader.",
          "If we cancel a journey for reasons within our control, you may transfer to another departure or receive a full refund of amounts paid to us.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "Adventure travel carries inherent risk. We operate to defined safety standards but do not accept liability for loss, injury or delay caused by events beyond our reasonable control.",
          "We strongly recommend comprehensive travel and medical insurance for every participant.",
        ],
      },
    ],
  },
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "Last updated: January 2026",
    intro:
      "This policy explains what personal information Ibex Adventure collects when you enquire or book, and how we use and protect it.",
    sections: [
      {
        heading: "What we collect",
        body: [
          "Contact details you provide through our enquiry forms, WhatsApp or email — name, phone number, email address and your travel preferences.",
          "Booking information needed to operate your journey, including age, emergency contact and relevant medical information.",
          "Basic analytics about how our website is used, which do not identify you personally.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "To respond to your enquiry, prepare a quote and operate your journey.",
          "To send you trip information and, only if you opt in, occasional updates about new journeys.",
          "We do not sell your data. We share it only with the on-ground partners required to deliver your journey.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "You can ask us to access, correct or delete your personal data by emailing the address on our Contact page.",
          "You can unsubscribe from any marketing message at any time.",
        ],
      },
    ],
  },
  cancellation: {
    slug: "cancellation",
    title: "Cancellation & Refund Policy",
    updated: "Last updated: January 2026",
    intro:
      "If you need to cancel a confirmed booking, the following charges apply based on how many days before departure we receive your written cancellation.",
    sections: [
      {
        heading: "Cancellation charges",
        body: [
          "More than 30 days before departure: booking advance is retained; the balance is refunded.",
          "30 – 15 days before departure: 50% of the total journey cost is retained.",
          "14 – 8 days before departure: 75% of the total journey cost is retained.",
          "7 days or fewer, or no-show: no refund.",
        ],
      },
      {
        heading: "Refund process",
        body: [
          "Approved refunds are processed to the original payment method within 10 working days.",
          "Third-party costs already committed on your behalf (flights, permits, special stays) are non-refundable and deducted from any refund.",
        ],
      },
      {
        heading: "Force majeure",
        body: [
          "If a journey cannot run due to natural disaster, government restriction or similar events, we will offer a credit valid for 12 months or a refund less non-recoverable costs.",
        ],
      },
    ],
  },
};

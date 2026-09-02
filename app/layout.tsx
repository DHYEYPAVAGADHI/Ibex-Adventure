import type { Metadata } from "next";
import { EB_Garamond, Hanken_Grotesk } from "next/font/google";

import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-garamond",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ibexadventure.in"),
  title: {
    default: "Ibex Adventure | Best Adventure Tours & Trekking in India",
    template: "%s | Ibex Adventure",
  },
  description:
    "Ibex Adventure offers premium trekking expeditions, adventure tours, student immersion programs & outdoor journeys across India's most breathtaking destinations. Book your adventure today!",
  keywords: [
    "adventure tours India",
    "trekking in India",
    "Himalayan trekking",
    "adventure travel India",
    "student adventure programs",
    "outdoor expeditions India",
    "best trekking company India",
    "Manali trekking",
    "Spiti Valley tour",
    "adventure tourism",
    "adventure programs for students",
    "ibex adventure",
    "outdoor journey India",
    "Leh Ladakh trek",
    "mountain expeditions India",
  ],
  authors: [{ name: "Ibex Adventure", url: "https://ibexadventure.in" }],
  creator: "Ibex Adventure",
  publisher: "Ibex Adventure",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ibexadventure.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ibexadventure.in",
    siteName: "Ibex Adventure",
    title: "Ibex Adventure | Best Adventure Tours & Trekking in India",
    description:
      "Premium adventure programs, trekking expeditions, student immersion tours and outdoor journeys across India's most breathtaking destinations.",
    images: [
      {
        url: "https://ibexadventure.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ibex Adventure — Beyond Adventure. Towards Transformation.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibex Adventure | Best Adventure Tours & Trekking in India",
    description:
      "Premium trekking expeditions, adventure tours & student programs across India.",
    images: ["https://ibexadventure.in/og-image.jpg"],
    creator: "@ibexadventure",
    site: "@ibexadventure",
  },
  verification: {
    google: "ibex-adventure-google-verification",
  },
  category: "Travel & Adventure",
};

import { Footer } from "@/components/footer";
import { getContactInfo } from "@/lib/data/contact";
import { prisma } from "@/lib/prisma";

import { ContactProvider } from "@/components/providers/contact-provider";
import { SettingsProvider } from "@/components/providers/settings-provider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contactInfo = await getContactInfo();
  const settings = await prisma.websiteSetting.findFirst();

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${garamond.variable} ${hanken.variable} font-sans antialiased`}
      >
        <SettingsProvider initialSettings={{ logoUrl: settings?.logoUrl || null }}>
          <ContactProvider initialContactInfo={contactInfo}>
            {children}
            <Footer />
          </ContactProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}

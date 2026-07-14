import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const scriptFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-script",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ibexadventure.in"),
  title: "Ibex Adventure | Beyond Adventure. Towards Transformation.",
  description:
    "Premium adventure programs, trekking expeditions, student immersion tours, and WhatsApp-led enquiries by Ibex Adventure.",
  openGraph: {
    title: "Ibex Adventure",
    description:
      "Immersive outdoor programs that blend adventure, education, and transformation.",
    url: "https://ibexadventure.in",
    siteName: "Ibex Adventure",
    type: "website",
  },
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
      <body className={`${inter.variable} ${playfair.variable} ${scriptFont.variable} font-sans bg-slate-950 text-white antialiased`}>
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

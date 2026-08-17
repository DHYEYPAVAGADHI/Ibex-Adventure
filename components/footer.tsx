import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { buildTelLink } from "@/lib/contact";
import { prisma } from "@/lib/prisma";

const exploreLinks = [
  { label: "Discover", href: "/#programs" },
  { label: "Programs", href: "/#programs" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Attractions", href: "/#attractions" },
  { label: "About", href: "/#about" },
];

const infoLinks = [
  { label: "Our Story", href: "/our-story" },
  { label: "Contact Us", href: "/contact" },
  { label: "Enquire", href: "/contact" },
];

export async function Footer() {
  const contactInfo = await prisma.contactInformation.findFirst();
  const settings = await prisma.websiteSetting.findFirst();

  const address =
    contactInfo?.address ||
    "Corporate House, Ahmedabad, Gujarat – 382210";
  const phone = contactInfo?.phone || "+91 76008 80908";
  const email = contactInfo?.email || "contact@ibexadventure.in";
  const logoUrl = settings?.logoUrl || null;

  const addressQuery = contactInfo?.googleMapsUrl
    ? contactInfo.googleMapsUrl
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <footer style={{ backgroundColor: "#172C21" }}>
      {/* Main footer content */}
      <div className="container-shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-block mb-6" aria-label="Ibex Adventure — Home">
              {logoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={logoUrl}
                  alt="Ibex Adventure"
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <div className="text-white">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/40 mb-0.5">
                    Adventure Tourism
                  </p>
                  <p className="font-serif text-3xl font-normal text-white">
                    Ibex Adventure
                  </p>
                </div>
              )}
            </Link>

            <p className="text-sm font-light leading-7 text-white/55 max-w-xs">
              Premium adventure programs, trekking expeditions, and student immersion 
              tours designed for endurance, discovery, and transformation.
            </p>

            {/* Gold rule */}
            <div className="mt-8 h-px w-16 bg-[#D4AF37]/40" />
          </div>

          {/* Explore column */}
          <div>
            <h4 className="mb-6 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/40">
              Explore
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information column */}
          <div>
            <h4 className="mb-6 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/40">
              Information
            </h4>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="mb-6 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/40">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={addressQuery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-white/65 hover:text-white transition-colors"
                  aria-label="View office location"
                >
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#D4AF37]" />
                  <span className="text-sm font-light leading-6 max-w-[200px]">{address}</span>
                </a>
              </li>
              <li>
                <a
                  href={buildTelLink(phone)}
                  className="flex items-center gap-3 text-sm font-light text-white/65 hover:text-white transition-colors"
                  aria-label="Call Ibex Adventure"
                >
                  <Phone className="h-4 w-4 flex-shrink-0 text-[#D4AF37]" />
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-sm font-light text-white/65 hover:text-white transition-colors"
                  aria-label="Email Ibex Adventure"
                >
                  <Mail className="h-4 w-4 flex-shrink-0 text-[#D4AF37]" />
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-shell py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Ibex Adventure. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Beyond Adventure. Towards Transformation.
          </p>
        </div>
      </div>
    </footer>
  );
}

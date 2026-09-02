import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { buildTelLink } from "@/lib/contact";
import { prisma } from "@/lib/prisma";

function SocialGlyph({ name }: { name: string }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;
  switch (name) {
    case "instagram":
      return (
        <svg {...common}>
          <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.86.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5.01-4.75.07-.9.04-1.38.19-1.7.32-.43.16-.73.36-1.05.68-.32.32-.52.62-.68 1.05-.13.32-.28.8-.32 1.7C3.44 8.5 3.43 8.85 3.43 12s.01 3.5.07 4.75c.04.9.19 1.38.32 1.7.16.43.36.73.68 1.05.32.32.62.52 1.05.68.32.13.8.28 1.7.32 1.25.06 1.6.07 4.75.07s3.5-.01 4.75-.07c.9-.04 1.38-.19 1.7-.32.43-.16.73-.36 1.05-.68.32-.32.52-.62.68-1.05.13-.32.28-.8.32-1.7.06-1.25.07-1.6.07-4.75s-.01-3.5-.07-4.75c-.04-.9-.19-1.38-.32-1.7a2.9 2.9 0 0 0-.68-1.05 2.9 2.9 0 0 0-1.05-.68c-.32-.13-.8-.28-1.7-.32C15.5 4.01 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.15-2.9a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <path d="M23.5 6.5a3 3 0 0 0-2.12-2.12C19.5 3.87 12 3.87 12 3.87s-7.5 0-9.38.51A3 3 0 0 0 .5 6.5C0 8.38 0 12 0 12s0 3.62.5 5.5a3 3 0 0 0 2.12 2.12c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3 3 0 0 0 2.12-2.12C24 15.62 24 12 24 12s0-3.62-.5-5.5ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
        </svg>
      );
    default:
      return null;
  }
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Experiences", href: "/experiences" },
  { label: "Journeys", href: "/journeys" },
  { label: "Experiential Learning", href: "/experiential-learning" },
  { label: "For Colleges", href: "/for-colleges" },
  { label: "For Corporates", href: "/for-corporates" },
  { label: "About IBEX", href: "/our-story" },
  { label: "Stories", href: "/stories" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cancellation & Refund", href: "/cancellation" },
];

function parseJSON<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function Footer() {
  const [contactInfo, settings, destinations] = await Promise.all([
    prisma.contactInformation.findFirst(),
    prisma.websiteSetting.findFirst(),
    prisma.destination.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
      take: 8,
      select: { title: true, slug: true },
    }),
  ]);

  const address = contactInfo?.address || "Ahmedabad, Gujarat, India";
  const phone = contactInfo?.phone || "+91 98765 43210";
  const email = contactInfo?.email || "info@ibexadventure.com";
  const logoUrl = settings?.logoUrl || null;
  const footerText =
    settings?.footerText ||
    "We create immersive journeys that inspire individuals and groups through adventure, culture, people, nature and experiential learning.";
  const social = parseJSON<Record<string, string>>(
    contactInfo?.socialLinks || settings?.socialLinks,
    {}
  );

  const addressQuery =
    contactInfo?.googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const socialKeys = ["instagram", "facebook", "youtube", "linkedin"].filter(
    (k) => social[k]
  );

  return (
    <footer className="bg-[var(--color-forest)] text-white">
      <div className="container-wide py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-5 inline-block" aria-label="Ibex Adventure — Home">
              {logoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={logoUrl} alt="Ibex Adventure" className="h-12 w-auto object-contain" />
              ) : (
                <span className="flex flex-col leading-none">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/40">
                    Adventure Tourism
                  </span>
                  <span className="mt-1.5 text-2xl font-extrabold uppercase tracking-[0.14em]">
                    Ibex Adventure
                  </span>
                </span>
              )}
            </Link>
            <p className="max-w-sm text-sm font-light leading-relaxed text-white/60">{footerText}</p>
            {socialKeys.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socialKeys.map((key) => (
                  <a
                    key={key}
                    href={social[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[var(--color-lime)] hover:text-[var(--color-lime)]"
                  >
                    <SocialGlyph name={key} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-light text-white/65 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular destinations */}
          <div>
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Popular Destinations
            </h4>
            <ul className="space-y-3">
              {(destinations.length
                ? destinations
                : [{ title: "Ladakh", slug: "ladakh" }, { title: "Spiti Valley", slug: "spiti" }]
              ).map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/destinations/${d.slug}`}
                    className="text-sm font-light text-white/65 transition-colors hover:text-white"
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div>
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={addressQuery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/65 transition-colors hover:text-white"
                >
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-lime)]" />
                  <span className="max-w-[220px] text-sm font-light leading-6">{address}</span>
                </a>
              </li>
              <li>
                <a
                  href={buildTelLink(phone)}
                  className="flex items-center gap-3 text-sm font-light text-white/65 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 flex-shrink-0 text-[var(--color-lime)]" />
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-sm font-light text-white/65 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 flex-shrink-0 text-[var(--color-lime)]" />
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 text-center font-serif text-lg italic text-[var(--color-lime)]">
          Let&rsquo;s explore. Learn. Grow. Together.
        </p>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-center justify-between gap-3 py-6 md:flex-row">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Ibex Adventure. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-xs text-white/35 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

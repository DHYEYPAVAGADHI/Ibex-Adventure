import Link from "next/link";
import { buildTelLink } from "@/lib/contact";
import { Mountain, MapPin, Phone, Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";

export async function Footer() {
  const contactInfo = await prisma.contactInformation.findFirst();
  const settings = await prisma.websiteSetting.findFirst();

  const address = contactInfo?.address || "Corporate House, Infront of Geneva Liberal School, Near Cliantha Research, Opp. Applewood Township, Sarkhej–Okaf, Ahmedabad, Gujarat – 382210";
  const phone = contactInfo?.phone || "+91 76008 80908";
  const email = contactInfo?.email || "contact@ibexadventure.in";
  const logoUrl = settings?.logoUrl || null;
  
  const addressQuery = contactInfo?.googleMapsUrl 
    ? contactInfo.googleMapsUrl 
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <footer className="border-t border-white/10 bg-slate-950 py-12 md:py-16">
      <div className="container-shell">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 text-white mb-6">
              {logoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={logoUrl} alt="Ibex Adventure" className="h-10 w-auto object-contain" />
              ) : (
                <>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10">
                    <Mountain className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[0.65rem] uppercase tracking-[0.35em] text-white/55">
                      Adventure Tourism
                    </span>
                    <span className="text-base font-semibold tracking-[0.2em]">IBEX ADVENTURE</span>
                  </span>
                </>
              )}
            </Link>
            <p className="text-sm text-white/60 leading-relaxed font-light">
              Premium adventure programs, trekking expeditions, and student immersion tours designed for endurance, discovery, and transformation.
            </p>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-2 lg:ml-auto">
            <h4 className="font-serif text-lg text-white mb-6">Contact Us</h4>
            <div className="space-y-4">
              <a 
                href={addressQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 text-white/70 hover:text-white transition-colors"
                aria-label="View office location on Google Maps"
              >
                <div className="mt-1 flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-white/5 border border-white/10 group-hover:border-amber-300/30 group-hover:bg-amber-300/10 transition-colors">
                  <MapPin className="h-4 w-4 text-amber-400" />
                </div>
                <div className="text-sm font-light leading-relaxed max-w-sm">
                  <strong className="block font-medium text-white/90 mb-1">Head Office</strong>
                  {address}
                </div>
              </a>

              <a 
                href={buildTelLink(phone)}
                className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors"
                aria-label="Call Ibex Adventure"
              >
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-white/5 border border-white/10 group-hover:border-amber-300/30 group-hover:bg-amber-300/10 transition-colors">
                  <Phone className="h-4 w-4 text-amber-400" />
                </div>
                <span className="text-sm font-medium tracking-wide">{phone}</span>
              </a>

              <a 
                href={`mailto:${email}`}
                className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors"
                aria-label="Email Ibex Adventure"
              >
                <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-white/5 border border-white/10 group-hover:border-amber-300/30 group-hover:bg-amber-300/10 transition-colors">
                  <Mail className="h-4 w-4 text-amber-400" />
                </div>
                <span className="text-sm font-light">{email}</span>
              </a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Ibex Adventure. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

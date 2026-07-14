"use client";

import Link from "next/link";
import { useContact } from "@/components/providers/contact-provider";
import { buildTelLink } from "@/lib/contact";
import { Menu, Mountain, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { navItems } from "@/lib/static-data";
import { buildGeneralInquiry } from "@/lib/contact";

import { WhatsappButton } from "./whatsapp-button";

import { useSettings } from "@/components/providers/settings-provider";

// Dynamically fetched inside component

export function Navbar() {
  const { phone, whatsapp, email } = useContact();
  const { logoUrl } = useSettings();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<{label: string, href: string}[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data.map(c => ({
            label: c.title,
            href: `/programs/${c.slug}`
          })));
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar at top
      if (currentScrollY < 50) {
        setIsScrolled(false);
        setIsHidden(false);
      } else {
        setIsScrolled(true);
        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY + 10) {
          setIsHidden(true);
        } else if (currentScrollY < lastScrollY - 10) {
          setIsHidden(false);
        }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navClasses = isScrolled
    ? "border-white/10 bg-slate-950/90 shadow-2xl shadow-black/20 backdrop-blur-xl"
    : "border-transparent bg-transparent";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-10 transition-transform duration-300 ${
      isHidden ? "-translate-y-full" : "translate-y-0"
    }`}>
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition duration-300 sm:px-6 ${navClasses}`}
      >
        <Link href="/" className="flex items-center gap-3 text-white">
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

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-[1px] w-full origin-bottom-right scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:origin-bottom-left group-hover:scale-x-100" />
            </Link>
          ))}

          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-white/80 transition-colors group-hover:text-white">
              Activities
              <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="w-56 rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-black/50 p-2">
                {categories.map((cat) => {
                  const isActive = pathname === cat.href;
                  return (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                        isActive
                          ? "bg-amber-500/20 text-amber-400"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {cat.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {navItems.slice(3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-[1px] w-full origin-bottom-right scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:origin-bottom-left group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsappButton href={buildGeneralInquiry(phone)} className="px-4 py-2.5 text-xs">
            Enquire Now
          </WhatsappButton>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="mt-3 rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-5">
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-white/80"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                className="flex items-center justify-between text-base font-medium text-white/80"
              >
                Activities
                <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isMobileDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isMobileDropdownOpen && (
                <div className="flex flex-col gap-4 pl-4 border-l border-white/10 mt-1 pb-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className={`text-sm font-medium ${pathname === cat.href ? "text-white" : "text-white/60 hover:text-white"}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.slice(3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-medium text-white/80"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <WhatsappButton href={buildGeneralInquiry(phone)} className="mt-2 w-full">
              Enquire Now
            </WhatsappButton>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

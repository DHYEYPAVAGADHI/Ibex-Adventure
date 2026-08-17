"use client";

import Link from "next/link";
import { useContact } from "@/components/providers/contact-provider";
import { buildGeneralInquiry } from "@/lib/contact";
import { Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSettings } from "@/components/providers/settings-provider";

interface NavCategory {
  label: string;
  href: string;
}

const mainNavLinks = [
  { label: "Discover", href: "/#programs" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Activities", href: null, hasDropdown: true },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const { phone } = useContact();
  const { logoUrl } = useSettings();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<NavCategory[]>([]);

  // Fetch categories for Programs dropdown
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(
            data.map((c) => ({ label: c.title, href: `/programs/${c.slug}` }))
          );
        }
      })
      .catch(console.error);
  }, []);

  // Hide/show nav on scroll
  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 60) {
        setIsScrolled(false);
        setIsHidden(false);
      } else {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY + 10) {
          setIsHidden(true);
        } else if (currentScrollY < lastScrollY - 10) {
          setIsHidden(false);
        }
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const enquireHref = buildGeneralInquiry(phone);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Main bar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "border-b border-[#C2C8C2] bg-[#FCF9F2]/95 shadow-sm backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 md:px-8 lg:px-16">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-3 flex-shrink-0"
            aria-label="Ibex Adventure — Home"
          >
            {logoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={logoUrl}
                alt="Ibex Adventure"
                className="h-10 w-auto object-contain"
              />
            ) : (
              <div className={`flex flex-col leading-none ${isScrolled ? "text-[#172C21]" : "text-white"}`}>
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] opacity-60">
                  Adventure Tourism
                </span>
                <span className="text-base font-bold tracking-[0.18em] uppercase">
                  Ibex Adventure
                </span>
              </div>
            )}
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {mainNavLinks.map((item) =>
              item.hasDropdown ? (
                /* Activities Dropdown */
                <div key="activities" className="relative group">
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                      isScrolled
                        ? "text-[#424844] hover:text-[#172C21]"
                        : "text-white/85 hover:text-white"
                    }`}
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Activities
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="w-52 rounded-2xl border border-[#C2C8C2] bg-[#FCF9F2] shadow-xl shadow-[#172C21]/10 overflow-hidden">
                      <div className="p-1.5">
                        {categories.length === 0 ? (
                          <p className="px-4 py-3 text-sm text-[#424844]/60">Loading…</p>
                        ) : (
                          categories.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                                pathname === cat.href
                                  ? "bg-[#172C21] text-white"
                                  : "text-[#424844] hover:bg-[#172C21]/8 hover:text-[#172C21]"
                              }`}
                            >
                              {cat.label}
                            </Link>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`group relative text-sm font-medium transition-colors ${
                    isScrolled
                      ? "text-[#424844] hover:text-[#172C21]"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-[#D4AF37] transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                </Link>
              )
            )}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:block">
            <a
              href={enquireHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#172C21] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#2D4236] hover:shadow-lg hover:shadow-[#172C21]/20"
            >
              Enquire Now
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
              isScrolled
                ? "border-[#C2C8C2] text-[#172C21] hover:bg-[#172C21]/5"
                : "border-white/30 text-white hover:bg-white/10"
            }`}
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isOpen && (
        <div className="fixed inset-0 top-[69px] z-40 bg-[#FCF9F2] lg:hidden overflow-y-auto">
          <nav className="flex flex-col px-6 pt-8 pb-16 gap-1" aria-label="Mobile navigation">
            {/* Main links */}
            {mainNavLinks.map((item) =>
              item.hasDropdown ? (
                <div key="activities-mobile">
                  <button
                    type="button"
                    onClick={() => setIsMobileDropdownOpen((v) => !v)}
                    className="flex w-full items-center justify-between py-4 text-lg font-medium text-[#1C1C18] border-b border-[#E5E9E5]"
                  >
                    Activities
                    <ChevronDown
                      className={`h-5 w-5 text-[#172C21] transition-transform duration-200 ${
                        isMobileDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isMobileDropdownOpen && (
                    <div className="py-2 pl-4 border-b border-[#E5E9E5]">
                      {categories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className={`block py-3 text-base transition-colors ${
                            pathname === cat.href
                              ? "text-[#172C21] font-semibold"
                              : "text-[#424844] hover:text-[#172C21]"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="block py-4 text-lg font-medium text-[#1C1C18] border-b border-[#E5E9E5] hover:text-[#172C21] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* Mobile CTA */}
            <div className="mt-8">
              <a
                href={enquireHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-full bg-[#172C21] px-8 py-4 text-base font-semibold text-white"
                onClick={() => setIsOpen(false)}
              >
                Enquire Now
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

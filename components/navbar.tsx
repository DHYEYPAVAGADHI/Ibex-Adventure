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

const mainNavLinks: (NavCategory & { hasDropdown?: boolean })[] = [
  { label: "Home", href: "/" },
  { label: "Experiences", href: "/experiences" },
  { label: "Journeys", href: "/journeys" },
  { label: "Experiential Learning", href: "/experiential-learning" },
  { label: "For Colleges", href: "/for-colleges" },
  { label: "For Corporates", href: "/#for-corporates" },
  { label: "About IBEX", href: "/#about" },
  { label: "Stories", href: "/#stories" },
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
            ? "border-b border-[var(--color-border)] bg-[var(--color-ivory)]/95 shadow-sm backdrop-blur-xl"
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
              <div className={`flex flex-col leading-none ${isScrolled ? "text-[var(--color-forest)]" : "text-white"}`}>
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
                        ? "text-[var(--color-text-muted)] hover:text-[var(--color-forest)]"
                        : "text-white/85 hover:text-white"
                    }`}
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Activities
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="w-52 rounded-2xl border border-[var(--color-border)] bg-[var(--color-ivory)] shadow-xl shadow-[var(--color-forest)]/10 overflow-hidden">
                      <div className="p-1.5">
                        {categories.length === 0 ? (
                          <p className="px-4 py-3 text-sm text-[var(--color-text-muted)]/60">Loading…</p>
                        ) : (
                          categories.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                                pathname === cat.href
                                  ? "bg-[var(--color-forest-mid)] text-white"
                                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-forest-mid)]/8 hover:text-[var(--color-forest)]"
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
                      ? "text-[var(--color-text-muted)] hover:text-[var(--color-forest)]"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-[var(--color-accent-green)] transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                </Link>
              )
            )}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={enquireHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-[#5D7C3F] px-6 py-2.5 text-[0.8rem] font-bold uppercase tracking-wider text-white transition-all hover:bg-[#4A6432]"
            >
              Plan Your Journey
            </a>
            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5D7C3F] text-white transition-all hover:bg-[#4A6432]"
              aria-label="WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
              isScrolled
                ? "border-[var(--color-border)] text-[var(--color-forest)] hover:bg-[var(--color-forest-mid)]/5"
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
        <div className="fixed inset-0 top-[69px] z-40 bg-[var(--color-ivory)] lg:hidden overflow-y-auto">
          <nav className="flex flex-col px-6 pt-8 pb-16 gap-1" aria-label="Mobile navigation">
            {/* Main links */}
            {mainNavLinks.map((item) =>
              item.hasDropdown ? (
                <div key="activities-mobile">
                  <button
                    type="button"
                    onClick={() => setIsMobileDropdownOpen((v) => !v)}
                    className="flex w-full items-center justify-between py-4 text-lg font-medium text-[var(--color-text)] border-b border-[var(--color-border-light)]"
                  >
                    Activities
                    <ChevronDown
                      className={`h-5 w-5 text-[var(--color-forest)] transition-transform duration-200 ${
                        isMobileDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isMobileDropdownOpen && (
                    <div className="py-2 pl-4 border-b border-[var(--color-border-light)]">
                      {categories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className={`block py-3 text-base transition-colors ${
                            pathname === cat.href
                              ? "text-[var(--color-forest)] font-semibold"
                              : "text-[var(--color-text-muted)] hover:text-[var(--color-forest)]"
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
                  className="block py-4 text-lg font-medium text-[var(--color-text)] border-b border-[var(--color-border-light)] hover:text-[var(--color-forest)] transition-colors"
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
                className="flex w-full items-center justify-center rounded-full bg-[var(--color-forest-mid)] px-8 py-4 text-base font-semibold text-white"
                onClick={() => setIsOpen(false)}
              >
                Plan Your Journey
              </a>
              <a
                href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-full border border-[var(--color-forest-mid)] bg-transparent px-8 py-4 text-base font-semibold text-[var(--color-forest-mid)] mt-4"
                onClick={() => setIsOpen(false)}
              >
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

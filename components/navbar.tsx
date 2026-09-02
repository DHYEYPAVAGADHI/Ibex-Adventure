"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { useContact } from "@/components/providers/contact-provider";
import { useSettings } from "@/components/providers/settings-provider";
import { buildWhatsappLink } from "@/lib/contact";

/** Section anchors that live on the one-page home route. */
const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Experiences", id: "experiences" },
  { label: "Journeys", id: "journeys" },
  { label: "Experiential Learning", id: "learning" },
  { label: "For Colleges", id: "colleges" },
  { label: "For Corporates", id: "corporates" },
  { label: "About IBEX", id: "about" },
  { label: "Stories", id: "stories" },
  { label: "Contact", id: "contact" },
];

function LogoMark({ dark }: { dark: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="flex-shrink-0">
        <path d="M3 33 14.5 11l6.5 11 4-6.5L37 33H3Z" fill={dark ? "#152A1E" : "#F7F6F1"} />
        <path d="M14.5 11 21 22l3-4.7L18 6l-3.5 5Z" fill="#86A857" />
      </svg>
      <span className={`flex flex-col leading-none ${dark ? "text-[var(--color-forest)]" : "text-white"}`}>
        <span className="text-[14px] font-extrabold uppercase tracking-[0.15em]">Ibex Adventure</span>
        <span className="mt-1 text-[8.5px] font-semibold uppercase tracking-[0.3em] opacity-55">
          Travel. Experience. Learn.
        </span>
      </span>
    </span>
  );
}

export function Navbar() {
  const { whatsapp, phone } = useContact();
  const { logoUrl } = useSettings();
  const pathname = usePathname();
  const onHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 160 && y > lastY + 8) setHidden(true);
      else if (y < lastY - 8) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy on the home page.
  useEffect(() => {
    if (!onHome) return;
    const ids = NAV_LINKS.map((l) => l.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const go = useCallback(
    (id: string) => () => {
      setOpen(false);
      if (onHome) setActive(id);
    },
    [onHome]
  );

  // href: on the home route use a bare hash so the browser scrolls natively
  // (respecting scroll-margin-top + smooth behavior); elsewhere navigate home.
  const hrefFor = (id: string) =>
    id === "home" ? (onHome ? "#home" : "/") : onHome ? `#${id}` : `/#${id}`;

  const dark = scrolled || open || !onHome;
  const waHref = buildWhatsappLink(whatsapp || phone, "Hello Ibex Adventure, I'd like to plan a journey.");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className={`transition-colors duration-300 ${
          dark
            ? "border-b border-[var(--color-hair)] bg-[var(--color-ivory)]/95 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-black/40 to-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1520px] items-center gap-4 px-5 py-3 md:px-8 lg:px-10">
          <a href={hrefFor("home")} aria-label="Ibex Adventure — Home" onClick={go("home")} className="flex-shrink-0">
            {logoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={logoUrl} alt="Ibex Adventure" className="h-9 w-auto object-contain" />
            ) : (
              <LogoMark dark={dark} />
            )}
          </a>

          <nav className="ml-auto hidden items-center gap-x-4 lg:flex xl:gap-x-6" aria-label="Primary">
            {NAV_LINKS.map((item) => {
              const isActive = onHome && active === item.id;
              return (
                <a
                  key={item.id}
                  href={hrefFor(item.id)}
                  onClick={go(item.id)}
                  className={`group relative whitespace-nowrap text-[12px] font-semibold transition-colors xl:text-[13px] ${
                    dark
                      ? isActive
                        ? "text-[var(--color-forest)]"
                        : "text-[var(--color-ink-muted)] hover:text-[var(--color-forest)]"
                      : isActive
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[var(--color-lime)] transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="ml-auto hidden flex-shrink-0 items-center gap-2.5 lg:ml-4 lg:flex">
            <a
              href={hrefFor("contact")}
              onClick={go("contact")}
              className="inline-flex items-center rounded bg-[var(--color-moss)] px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[var(--color-moss-dark)] xl:px-5 xl:text-[11px]"
            >
              Plan Your Journey
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-moss)] text-white transition-colors hover:bg-[var(--color-moss-dark)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
              </svg>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
              dark ? "border-[var(--color-hair)] text-[var(--color-forest)]" : "border-white/40 text-white"
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 top-[60px] z-40 overflow-y-auto bg-[var(--color-ivory)] lg:hidden">
          <nav className="flex flex-col px-6 py-6" aria-label="Mobile">
            {NAV_LINKS.map((item) => (
              <a
                key={item.id}
                href={hrefFor(item.id)}
                onClick={go(item.id)}
                className={`border-b border-[var(--color-border-light)] py-4 text-lg font-semibold transition-colors ${
                  onHome && active === item.id
                    ? "text-[var(--color-forest)]"
                    : "text-[var(--color-ink)] hover:text-[var(--color-forest)]"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={hrefFor("contact")}
              onClick={go("contact")}
              className="mt-8 flex items-center justify-center rounded bg-[var(--color-moss)] px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white"
            >
              Plan Your Journey
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center rounded border border-[var(--color-moss)] px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-moss)]"
            >
              WhatsApp Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

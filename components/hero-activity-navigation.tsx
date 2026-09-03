"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface NavigationCategory {
  title: string;
  slug: string;
  href: string;
  displayOrder: number;
}

// Dynamically fetched inside component

export function HeroActivityNavigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [categories, setCategories] = useState<NavigationCategory[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(data.map((c: any) => ({
            title: c.title,
            slug: c.slug,
            href: `/journeys/${c.slug}`,
            displayOrder: c.displayOrder
          })));
        }
        setMounted(true);
      })
      .catch(err => {
        console.error(err);
        setMounted(true);
      });
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="absolute bottom-0 left-0 right-0 z-30 flex justify-center w-full pb-8 md:pb-12 px-4"
    >
      <div className="w-full max-w-[95vw] lg:w-fit mx-auto">
        <nav
          aria-label="Primary Categories"
          className="relative flex items-center overflow-x-auto overflow-y-hidden rounded-[32px] bg-[rgba(12,18,32,0.45)] backdrop-blur-[18px] border border-white/12 shadow-2xl md:justify-center no-scrollbar snap-x snap-mandatory"
        >
          <ul className="flex min-w-max items-center px-6 py-3 md:px-12 md:py-5 justify-between gap-6 md:gap-10 lg:gap-14">
            {categories.sort((a, b) => a.displayOrder - b.displayOrder).map((category, index) => {
              const isActive = pathname.startsWith(category.href);

              return (
                <li key={category.slug} className="relative flex items-center snap-center">
                  <Link
                    href={category.href}
                    onMouseEnter={() => setHoveredSlug(category.slug)}
                    onMouseLeave={() => setHoveredSlug(null)}
                    className={`group relative flex items-center justify-center py-2 text-[16px] md:text-[18px] lg:text-[21px] font-medium tracking-wide transition-all duration-300 hover:-translate-y-[2px] ${
                      isActive ? "text-white" : "text-white/75 hover:text-white"
                    }`}
                  >
                    {category.title}

                    {/* Animated Gold Indicator for Active State */}
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-b from-[#FFD54F] to-[#F4B400] shadow-[0_4px_12px_rgba(244,180,0,0.8)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover Underline (Only shows on inactive items during hover) */}
                    {!isActive && (
                      <span
                        className={`absolute -bottom-2 left-0 right-0 h-[2px] bg-white/50 rounded-full transition-all duration-300 ease-out origin-left ${
                          hoveredSlug === category.slug ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                        }`}
                      />
                    )}
                  </Link>

                  {/* Vertical Divider */}
                  {index < categories.length - 1 && (
                    <div className="h-5 w-[1px] bg-white/20 ml-6 md:ml-10 lg:ml-14" aria-hidden="true" />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </motion.div>
  );
}

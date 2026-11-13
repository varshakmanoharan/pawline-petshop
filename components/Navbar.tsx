"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ShoppingBag,
  Menu,
  X,
  PawPrint,
  Search,
  ArrowRight,
  Heart,
} from "lucide-react";
import { useCart } from "./CartProvider";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=Dogs", label: "Dogs" },
  { href: "/shop?category=Cats", label: "Cats" },
  { href: "/contact", label: "Contact" },
];

/**
 * Determines whether a nav link matches the current route + query.
 * "/shop" is only active when there's no category filter applied;
 * "/shop?category=X" is active when that specific category is selected.
 */
function isLinkActive(link, pathname, searchParams) {
  const [linkPath, linkQuery] = link.href.split("?");

  if (pathname !== linkPath) return false;

  const linkCategory = linkQuery
    ? new URLSearchParams(linkQuery).get("category")
    : null;
  const currentCategory = searchParams.get("category");

  return linkCategory === currentCategory;
}

function SearchForm({ id, value, onChange, onSubmit, placeholder, className }) {
  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="group relative flex w-full items-center">
        <label htmlFor={id} className="sr-only">
          Search products
        </label>

        <Search
          className="pointer-events-none absolute left-4 h-[18px] w-[18px] text-gray-400 transition-colors group-focus-within:text-pine"
          strokeWidth={1.8}
        />

        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pl-11 pr-14 text-[13px] text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-pine/40 focus:bg-white focus:ring-4 focus:ring-pine/5"
        />

        <button
          type="submit"
          aria-label="Submit search"
          className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-pine text-white transition-all hover:bg-pine/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/40 focus-visible:ring-offset-2"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </form>
  );
}

export default function Navbar() {
  const { totalItems, openCart } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const desktopSearchRef = useRef(null);

  // Subtle shadow once the page scrolls under the sticky header.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on Escape, and lock body scroll while it's open.
  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  // Collapse the desktop search when clicking outside it, or on Escape.
  useEffect(() => {
    if (!searchOpen) return;

    const onPointerDown = (e) => {
      if (!desktopSearchRef.current?.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSearchOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [searchOpen]);

  // Close menus automatically if the route changes underneath them.
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname, searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();
    if (!value) return;

    router.push(`/shop?search=${encodeURIComponent(value)}`);
    setSearchOpen(false);
  };

  const menuTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: "easeOut" };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_20px_rgba(20,40,30,0.06)]" : ""
      }`}
    >
      {/* =====================================================
          TOP ANNOUNCEMENT BAR
      ====================================================== */}
      <div className="bg-pine text-white">
        <div className="mx-auto flex h-9 max-w-content items-center justify-center px-4">
          <div className="flex items-center gap-2 text-[11px] font-medium sm:text-xs">
            <Heart
              className="h-3.5 w-3.5 fill-marigold text-marigold"
              strokeWidth={2}
            />

            <span>Made with love for your furry friends</span>

            <span className="hidden text-white/40 sm:inline">•</span>

            <span className="hidden text-marigold sm:inline">
              Shop happy. Live happy.
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN HEADER (single row: logo | centered nav | actions)
      ====================================================== */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-content px-4 sm:px-6">
          <div className="relative flex min-h-[78px] items-center gap-4">
            {/* ================= LOGO ================= */}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="group flex shrink-0 items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/40 focus-visible:ring-offset-2"
            >
              <motion.div
                whileHover={
                  prefersReducedMotion ? undefined : { rotate: -6, scale: 1.05 }
                }
                transition={{ type: "spring", stiffness: 300 }}
                className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-pine shadow-[0_5px_15px_rgba(30,60,45,0.16)]"
              >
                <PawPrint className="h-5 w-5 text-white" strokeWidth={2.3} />
              </motion.div>

              <div className="hidden flex-col xs:flex">
                <span className="font-display text-[21px] font-bold leading-none tracking-tight text-pine">
                  Pawline
                </span>

                <span className="mt-1.5 text-[8px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Happy pets. Happy homes.
                </span>
              </div>
            </Link>

            {/* ================= NAV + CTA (true center, desktop) ================= */}
            <nav
              aria-label="Primary"
              className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
            >
              {links.map((link) => {
                const active = isLinkActive(link, pathname, searchParams);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative rounded-full px-5 py-3 text-[13px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/40 ${
                      active ? "text-pine" : "text-gray-600 hover:text-pine"
                    }`}
                  >
                    {link.label}

                    <span
                      className={`absolute bottom-1.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-marigold transition-all duration-300 ${
                        active ? "w-5" : "w-0 group-hover:w-5"
                      }`}
                    />
                  </Link>
                );
              })}

              <span className="mx-3 h-5 w-px bg-gray-200" />

              <Link
                href="/shop"
                className="flex items-center gap-1.5 rounded-full bg-pine px-5 py-2 text-[12px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/40 focus-visible:ring-offset-2"
              >
                Explore Products
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </nav>

            {/* ================= RIGHT ACTIONS ================= */}
            <div className="ml-auto flex shrink-0 items-center gap-2">
              {/* Expandable search (desktop) */}
              <div
                ref={desktopSearchRef}
                className="relative hidden items-center md:flex"
              >
                <AnimatePresence initial={false}>
                  {searchOpen && (
                    <motion.div
                      initial={prefersReducedMotion ? false : { width: 0, opacity: 0 }}
                      animate={{ width: 260, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={menuTransition}
                      className="overflow-hidden"
                    >
                      <SearchForm
                        id="nav-search-desktop"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onSubmit={handleSearch}
                        placeholder="Search for treats, toys..."
                        className="w-[260px] pr-1"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {!searchOpen && (
                  <button
                    onClick={() => setSearchOpen(true)}
                    aria-label="Open search"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-pine transition-all hover:border-pine hover:bg-pine hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/40 focus-visible:ring-offset-2"
                  >
                    <Search className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </button>
                )}
              </div>

              {/* Cart */}
              <motion.button
                whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                whileTap={{ scale: 0.94 }}
                onClick={openCart}
                aria-label={`Open cart${
                  totalItems > 0 ? `, ${totalItems} items` : ""
                }`}
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-pine transition-all hover:border-pine hover:bg-pine hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/40 focus-visible:ring-offset-2"
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.8} />

                {totalItems > 0 && (
                  <motion.span
                    initial={prefersReducedMotion ? false : { scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1.5 -top-1.5 flex h-[20px] min-w-[20px] items-center justify-center rounded-full bg-marigold px-1 text-[9px] font-bold text-pine ring-2 ring-white"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-pine transition-all hover:border-pine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/40 focus-visible:ring-offset-2 md:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* =================================================
              MOBILE SEARCH
          ================================================== */}
          <SearchForm
            id="nav-search-mobile"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={handleSearch}
            placeholder="Search products..."
            className="pb-3 md:hidden"
          />

          {/* =================================================
              MOBILE MENU
          ================================================== */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                id="mobile-nav"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={menuTransition}
                className="overflow-hidden md:hidden"
              >
                <nav aria-label="Mobile" className="border-t border-gray-100 py-3">
                  {links.map((link, index) => {
                    const active = isLinkActive(link, pathname, searchParams);

                    return (
                      <motion.div
                        key={link.label}
                        initial={
                          prefersReducedMotion ? false : { opacity: 0, x: -10 }
                        }
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: prefersReducedMotion ? 0 : index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[14px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/40 ${
                            active
                              ? "bg-pine/[0.06] text-pine"
                              : "text-gray-600 hover:bg-pine/[0.05] hover:text-pine"
                          }`}
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="h-4 w-4 opacity-40" />
                        </Link>
                      </motion.div>
                    );
                  })}

                  <div className="mt-2 border-t border-gray-100 pt-3">
                    <Link
                      href="/shop"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-pine px-4 py-3.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/40 focus-visible:ring-offset-2"
                    >
                      Explore Products
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
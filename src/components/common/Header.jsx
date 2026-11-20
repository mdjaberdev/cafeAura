"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Coffee", href: "/coffee" },
  { label: "Story", href: "/story" },
  { label: "Journey", href: "/journey" },
  { label: "Contact", href: "/contact" },
];

const POPULAR_SEARCHES = [
  "Espresso Intenso",
  "Caramel Macchiato",
  "Ethiopian Yirgacheffe",
  "Cold Brew Reserve",
  "Hazelnut Latte",
];

/**
 * Café Aura Stylized Coffee Cup Logo
 */
export function CoffeeLogoIcon({ className = "w-7 h-7 text-[#DE9E57]" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M8.5 2.8c.7 1-.7 1.8 0 2.9" />
      <path d="M12 1.8c.7 1.2-.7 2 0 3.6" />
      <path d="M4 8.5h12.2a.6.6 0 0 1 .6.6v2.8c0 3.3-2.6 6-5.8 6H9.4C6.2 17.9 4 15.2 4 11.9V8.5z" />
      <path d="M16.8 10h1.8a2 2 0 0 1 0 4h-1.8" />
      <path d="M3 20h16.5" />
    </svg>
  );
}

export const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isWishlistFilled, setIsWishlistFilled] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const handleWishlistClick = useCallback(() => {
    setIsWishlistFilled((prev) => {
      const next = !prev;
      setWishlistCount((c) => Math.max(0, next ? c + 1 : c - 1));
      return next;
    });
  }, []);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#140C07]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-[#2B1B10]"
            : "bg-[#150D07] border-b border-white/[0.04]"
        }`}
      >
        <Container className="flex h-20 items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9E57] rounded-lg"
          >
            <CoffeeLogoIcon className="w-8 h-8 text-[#DE9E57] transition-transform duration-300 group-hover:scale-105" />
            <span className="font-serif text-xl sm:text-2xl font-medium tracking-wide text-[#DE9E57] select-none">
              Café Aura
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-8 lg:gap-10"
          >
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.href} className="relative py-2">
                  <Link
                    href={item.href}
                    className={`text-sm tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "text-white font-medium"
                        : "text-[#D6CBC1] hover:text-[#DE9E57]"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#DE9E57] rounded-full" />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={handleWishlistClick}
              aria-label="Wishlist"
              aria-pressed={isWishlistFilled}
              className="relative p-1 text-[#F5EBE1] hover:text-[#DE9E57] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9E57] rounded-full group"
            >
              <Heart
                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  isWishlistFilled
                    ? "fill-[#DE9E57] text-[#DE9E57]"
                    : "stroke-[1.8]"
                }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#DE9E57] text-[10px] font-semibold text-[#120B06]">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search coffee"
              className="p-1 text-[#F5EBE1] hover:text-[#DE9E57] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9E57] rounded-full group"
            >
              <Search className="w-5 h-5 stroke-[1.8] transition-transform duration-200 group-hover:scale-110" />
            </button>

            <Link
              href="/login"
              className="hidden sm:inline-block text-sm font-medium text-[#F5EBE1] hover:text-[#DE9E57] transition-colors"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-[#F5EBE1] border border-[#8A7868]/60 rounded-lg hover:border-[#DE9E57] hover:text-[#DE9E57] hover:bg-[#DE9E57]/5 transition-all duration-200 active:scale-95"
            >
              Sign up
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="md:hidden p-1.5 text-[#F5EBE1] hover:text-[#DE9E57] transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[2]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[2]" />
              )}
            </button>
          </div>
        </Container>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#2B1B10] bg-[#140C07]/98 px-6 py-6 shadow-2xl backdrop-blur-xl">
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col space-y-4"
            >
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center justify-between text-base py-2 transition-colors ${
                      isActive
                        ? "text-[#DE9E57] font-medium"
                        : "text-[#D6CBC1] hover:text-[#DE9E57]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#DE9E57]" />
                    )}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-[#2B1B10] flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="w-full py-2.5 text-center text-sm font-medium text-[#F5EBE1] hover:text-[#DE9E57] border border-[#2B1B10] rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMobileMenu}
                  className="w-full py-2.5 text-center text-sm font-semibold text-[#120B06] bg-[#DE9E57] hover:bg-[#EBB36F] rounded-lg transition-colors"
                >
                  Sign up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search coffees"
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-[#1C120B] border border-[#3D2919] rounded-2xl p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#2D1E13]">
              <div className="flex items-center gap-3 flex-1">
                <Search className="w-5 h-5 text-[#DE9E57]" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search artisanal coffee, blends, roast level..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-[#F5EBE1] placeholder-[#8A7868] text-sm focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
                className="text-[#8A7868] hover:text-[#DE9E57] transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="pt-4">
              <p className="text-xs font-medium text-[#8A7868] uppercase tracking-wider mb-2">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setSearchQuery(term)}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#271910] text-[#D6CBC1] hover:text-[#DE9E57] hover:border-[#DE9E57]/40 border border-transparent transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search, Menu, X, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";

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
      className={className}
    >
      {/* Steam curves */}
      <path d="M8.5 2.8c.7 1-.7 1.8 0 2.9" />
      <path d="M12 1.8c.7 1.2-.7 2 0 3.6" />
      {/* Cup body */}
      <path d="M4 8.5h12.2a.6.6 0 0 1 .6.6v2.8c0 3.3-2.6 6-5.8 6H9.4C6.2 17.9 4 15.2 4 11.9V8.5z" />
      {/* Cup handle */}
      <path d="M16.8 10h1.8a2 2 0 0 1 0 4h-1.8" />
      {/* Saucer */}
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
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: "login" });

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Coffee", href: "/coffee" },
    { label: "Story", href: "/story" },
    { label: "Journey", href: "/journey" },
    { label: "Contact", href: "/contact" },
  ];

  // Derive active tab cleanly from pathname to prevent server/client hydration mismatch
  const activeTab =
    navLinks.find((link) => link.href === pathname)?.label || "Home";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWishlistClick = () => {
    setIsWishlistFilled(!isWishlistFilled);
    setWishlistCount((prev) => (isWishlistFilled ? prev - 1 : prev + 1));
  };

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
          {/* Left: Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="transition-transform duration-300 group-hover:scale-105">
              <CoffeeLogoIcon className="w-8 h-8 text-[#DE9E57]" />
            </div>
            <span className="font-serif text-xl sm:text-2xl font-medium tracking-wide text-[#DE9E57] select-none">
              Café Aura
            </span>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <div key={item.label} className="relative py-2">
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

                  {/* Active Indicator Underline */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#DE9E57] rounded-full transition-all duration-300" />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right: Actions (Wishlist, Search, Login, Sign up) */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Wishlist Heart Icon */}
            <button
              type="button"
              onClick={handleWishlistClick}
              aria-label="Wishlist"
              className="relative p-1 text-[#F5EBE1] hover:text-[#DE9E57] transition-colors focus:outline-none group"
            >
              <Heart
                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  isWishlistFilled
                    ? "fill-[#DE9E57] text-[#DE9E57]"
                    : "stroke-[1.8]"
                }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#DE9E57] text-[10px] font-semibold text-black">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Search Icon */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="p-1 text-[#F5EBE1] hover:text-[#DE9E57] transition-colors focus:outline-none group"
            >
              <Search className="w-5 h-5 stroke-[1.8] transition-transform duration-200 group-hover:scale-110" />
            </button>

            {/* Login Link */}
            <button
              type="button"
              onClick={() => setAuthModal({ isOpen: true, mode: "login" })}
              className="hidden sm:inline-block text-sm font-medium text-[#F5EBE1] hover:text-[#DE9E57] transition-colors focus:outline-none"
            >
              Login
            </button>

            {/* Sign up Button */}
            <button
              type="button"
              onClick={() => setAuthModal({ isOpen: true, mode: "signup" })}
              className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-[#F5EBE1] border border-[#8A7868]/60 rounded-lg hover:border-[#DE9E57] hover:text-[#DE9E57] hover:bg-[#DE9E57]/5 transition-all duration-200 active:scale-95 focus:outline-none"
            >
              Sign up
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
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
          <div className="md:hidden border-t border-[#2B1B10] bg-[#140C07]/98 px-6 py-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((item) => {
                const isActive = activeTab === item.label;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
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
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuthModal({ isOpen: true, mode: "login" });
                  }}
                  className="w-full py-2.5 text-center text-sm font-medium text-[#F5EBE1] hover:text-[#DE9E57] border border-[#2B1B10] rounded-lg transition-colors"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuthModal({ isOpen: true, mode: "signup" });
                  }}
                  className="w-full py-2.5 text-center text-sm font-medium text-black bg-[#DE9E57] hover:bg-[#EBB36F] rounded-lg font-semibold transition-colors"
                >
                  Sign up
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Interactive Search Modal Overlay */}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
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
                {[
                  "Espresso Intenso",
                  "Caramel Macchiato",
                  "Ethiopian Yirgacheffe",
                  "Cold Brew Reserve",
                  "Hazelnut Latte",
                ].map((term) => (
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

      {/* Interactive Authentication Modal */}
      {authModal.isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setAuthModal({ isOpen: false, mode: "login" })}
        >
          <div
            className="w-full max-w-md bg-[#191009] border border-[#3D2919] rounded-2xl p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setAuthModal({ isOpen: false, mode: "login" })}
              className="absolute top-5 right-5 text-[#8A7868] hover:text-[#DE9E57] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <CoffeeLogoIcon className="w-6 h-6 text-[#DE9E57]" />
              <span className="font-serif text-lg font-medium text-[#DE9E57]">
                Café Aura
              </span>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-[#2D1E13] mb-6">
              <button
                type="button"
                onClick={() => setAuthModal({ ...authModal, mode: "login" })}
                className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${
                  authModal.mode === "login"
                    ? "text-[#DE9E57]"
                    : "text-[#8A7868] hover:text-[#D6CBC1]"
                }`}
              >
                Sign In
                {authModal.mode === "login" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#DE9E57]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setAuthModal({ ...authModal, mode: "signup" })}
                className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${
                  authModal.mode === "signup"
                    ? "text-[#DE9E57]"
                    : "text-[#8A7868] hover:text-[#D6CBC1]"
                }`}
              >
                Create Account
                {authModal.mode === "signup" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#DE9E57]" />
                )}
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAuthModal({ isOpen: false, mode: "login" });
              }}
              className="space-y-4"
            >
              {authModal.mode === "signup" && (
                <div>
                  <label className="block text-xs font-medium text-[#C4B5A5] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Eleanor Vance"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#120B06] border border-[#352316] text-[#F5EBE1] text-sm focus:outline-none focus:border-[#DE9E57]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#C4B5A5] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="eleanor@cafeaura.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#120B06] border border-[#352316] text-[#F5EBE1] text-sm focus:outline-none focus:border-[#DE9E57]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C4B5A5] mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#120B06] border border-[#352316] text-[#F5EBE1] text-sm focus:outline-none focus:border-[#DE9E57]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] font-semibold text-sm rounded-lg transition-all duration-200 active:scale-98 shadow-md shadow-[#DE9E57]/10"
              >
                {authModal.mode === "login"
                  ? "Sign In to Café Aura"
                  : "Join Café Aura"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

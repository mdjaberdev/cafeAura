"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Heart,
  Search,
  Menu,
  X,
  ShoppingBag,
  Plus,
  Check,
  ArrowRight,
  Coffee,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartTotalItems,
  addToCart,
} from "@/redux/features/cart/cartSlice";
import {
  coffeeProducts,
  popularSearches,
} from "@/data/products";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Coffee", href: "/coffee" },
  { label: "Story", href: "/story" },
  { label: "Journey", href: "/journey" },
  { label: "Contact", href: "/contact" },
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
  const router = useRouter();
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addedItemIds, setAddedItemIds] = useState({});
  const [isWishlistFilled, setIsWishlistFilled] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Redux Cart Total Quantity
  const cartItemCount = useSelector(selectCartTotalItems);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut: Escape to close search modal
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

  // Dynamic search filtering
  const searchResults = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return [];
    return coffeeProducts.filter((product) => {
      const matchName = product.name.toLowerCase().includes(term);
      const matchOrigin = product.origin.toLowerCase().includes(term);
      const matchCategory = product.category.toLowerCase().includes(term);
      const matchRoast = product.roast.toLowerCase().includes(term);
      const matchNotes = product.notes.some((n) =>
        n.toLowerCase().includes(term)
      );
      const matchDesc = product.description.toLowerCase().includes(term);
      return (
        matchName ||
        matchOrigin ||
        matchCategory ||
        matchRoast ||
        matchNotes ||
        matchDesc
      );
    });
  }, [searchQuery]);

  // Execute Search Navigation
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    router.push(`/coffee?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    router.push(`/coffee/${product.id}`);
  };

  const handleQuickAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        description: product.description,
        origin: product.origin,
        quantity: 1,
      })
    );

    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
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
          <div className="flex items-center gap-3.5 sm:gap-4.5">
            {/* Wishlist */}
            <button
              type="button"
              onClick={handleWishlistClick}
              aria-label="Wishlist"
              aria-pressed={isWishlistFilled}
              className="relative p-1.5 text-[#F5EBE1] hover:text-[#DE9E57] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9E57] rounded-full group"
            >
              <Heart
                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                  isWishlistFilled
                    ? "fill-[#DE9E57] text-[#DE9E57]"
                    : "stroke-[1.8]"
                }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#DE9E57] text-[10px] font-semibold text-[#120B06]">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Search Icon Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search coffee"
              className="p-1.5 text-[#F5EBE1] hover:text-[#DE9E57] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9E57] rounded-full group"
            >
              <Search className="w-5 h-5 stroke-[1.8] transition-transform duration-200 group-hover:scale-110" />
            </button>

            {/* Shopping Cart Icon */}
            <Link
              href="/cart"
              aria-label={`Shopping Cart with ${mounted ? cartItemCount : 0} items`}
              className="relative p-1.5 text-[#F5EBE1] hover:text-[#DE9E57] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9E57] rounded-full group"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8] transition-transform duration-200 group-hover:scale-110" />
              {mounted && cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1.5 flex min-w-4.5 h-4.5 px-1 items-center justify-center rounded-full bg-[#DE9E57] text-[10px] font-bold text-[#120B06] ring-2 ring-[#150D07] transition-transform duration-200 group-hover:scale-105">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            <Link
              href="/login"
              className="hidden sm:inline-block text-sm font-medium text-[#F5EBE1] hover:text-[#DE9E57] transition-colors ml-1"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 text-sm font-medium text-[#F5EBE1] border border-[#8A7868]/60 rounded-lg hover:border-[#DE9E57] hover:text-[#DE9E57] hover:bg-[#DE9E57]/5 transition-all duration-200 active:scale-95"
            >
              Sign up
            </Link>

            {/* Mobile Menu Hamburger */}
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
          <div className="md:hidden border-t border-[#2B1B10] bg-[#140C07]/98 px-6 py-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
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

              {/* Cart link in mobile navigation */}
              <Link
                href="/cart"
                onClick={closeMobileMenu}
                className="flex items-center justify-between text-base py-2 text-[#D6CBC1] hover:text-[#DE9E57] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#DE9E57]" />
                  <span>Shopping Cart</span>
                </span>
                {mounted && cartItemCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#DE9E57] text-[11px] font-bold text-[#120B06]">
                    {cartItemCount}
                  </span>
                )}
              </Link>

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

      {/* Functional Product Search Modal */}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search coffees"
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#180E07] border border-[#3E2718] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-3 px-5 py-4 border-b border-[#2D1E13] bg-[#1C120B]"
            >
              <Search className="w-5 h-5 text-[#DE9E57] shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search roasts (e.g. Latte, Ethiopia, Caramel, Dark Roast)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[#F5EBE1] placeholder-[#7A6A5E] text-sm focus:outline-none"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search input"
                  className="text-[#8A7868] hover:text-[#DE9E57] transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-lg bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] text-xs font-semibold transition-all shrink-0 cursor-pointer"
              >
                Search
              </button>

              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search dialog"
                className="text-[#8A7868] hover:text-[#DE9E57] transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            {/* Results or Suggestions Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {searchQuery.trim() === "" ? (
                /* Initial State: Popular Searches & Quick Links */
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-semibold text-[#8A7868] uppercase tracking-wider mb-2.5">
                      Popular Searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setSearchQuery(term)}
                          className="text-xs px-3.5 py-1.5 rounded-full bg-[#24170E] text-[#D6CBC1] hover:text-[#DE9E57] hover:border-[#DE9E57]/50 border border-[#3A2619] transition-all cursor-pointer"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#26170E]">
                    <p className="text-xs font-semibold text-[#8A7868] uppercase tracking-wider mb-3">
                      Featured Specialty Roasts
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {coffeeProducts.slice(0, 4).map((coffee) => (
                        <div
                          key={coffee.id}
                          onClick={() => handleSelectProduct(coffee)}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-[#20130A] border border-[#2D1D12] hover:border-[#DE9E57]/40 hover:bg-[#25170D] transition-all cursor-pointer group"
                        >
                          <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-[#3E2718]">
                            <Image
                              src={coffee.image}
                              alt={coffee.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-semibold text-white group-hover:text-[#DE9E57] transition-colors truncate">
                              {coffee.name}
                            </h4>
                            <p className="text-[10px] text-[#8A7868] truncate">
                              {coffee.origin} • ${coffee.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : searchResults.length === 0 ? (
                /* No Results Found State */
                <div className="text-center py-10 px-4">
                  <div className="w-12 h-12 rounded-full bg-[#24170E] border border-[#3A2619] flex items-center justify-center mx-auto mb-3 text-[#8A7868]">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    No coffees found matching &ldquo;{searchQuery}&rdquo;
                  </h3>
                  <p className="text-xs text-[#8A7868] mt-1 max-w-sm mx-auto">
                    Try searching for terms like &ldquo;Latte&rdquo;, &ldquo;Dark Roast&rdquo;, &ldquo;Colombia&rdquo;, or &ldquo;Caramel&rdquo;.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      router.push("/coffee");
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-[#24170E] hover:bg-[#DE9E57] text-[#DE9E57] hover:text-[#120B06] border border-[#3A2619] hover:border-[#DE9E57] text-xs font-semibold transition-all inline-flex items-center gap-1.5"
                  >
                    <span>View All Roasts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                /* Dynamic Matching Results List */
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 text-xs text-[#8A7868] border-b border-[#26170E]">
                    <span>
                      Found <strong className="text-[#DE9E57]">{searchResults.length}</strong> coffee{searchResults.length > 1 ? "s" : ""}
                    </span>
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="text-[#DE9E57] hover:underline"
                    >
                      View all in catalog
                    </button>
                  </div>

                  <div className="space-y-2">
                    {searchResults.map((product) => {
                      const isAdded = !!addedItemIds[product.id];
                      return (
                        <div
                          key={product.id}
                          onClick={() => handleSelectProduct(product)}
                          className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#20130A] border border-[#2E1E12] hover:border-[#DE9E57]/50 hover:bg-[#25170D] transition-all cursor-pointer group"
                        >
                          <div className="flex items-center gap-3.5 min-w-0 flex-1">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#3E2718] bg-[#120B06]">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#DE9E57] transition-colors truncate">
                                  {product.name}
                                </h4>
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#2D1D12] text-[#C4B5A5] border border-[#3E2718] shrink-0">
                                  {product.roast}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#8A7868] truncate mt-0.5">
                                {product.origin} • {product.notes.join(", ")}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-xs sm:text-sm font-bold text-white font-mono">
                              ${product.price.toFixed(2)}
                            </span>

                            <button
                              type="button"
                              onClick={(e) => handleQuickAddToCart(e, product)}
                              aria-label={`Add ${product.name} to cart`}
                              className={`p-2 rounded-lg text-xs font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer ${
                                isAdded
                                  ? "bg-[#8E9A74] text-[#120B06]"
                                  : "bg-[#2D1D12] text-[#DE9E57] hover:bg-[#DE9E57] hover:text-[#120B06] border border-[#3E2718]"
                              }`}
                            >
                              {isAdded ? (
                                <Check className="w-4 h-4 stroke-[2.5]" />
                              ) : (
                                <Plus className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-[#26170E] bg-[#150D07] flex items-center justify-between text-[11px] text-[#7A6A5E]">
              <span>Press <strong>Enter</strong> to search • <strong>ESC</strong> to exit</span>
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  router.push("/coffee");
                }}
                className="text-[#DE9E57] hover:underline"
              >
                Browse Full Menu →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

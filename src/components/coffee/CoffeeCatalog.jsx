"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotalItems,
  selectCartSubtotal,
} from "@/redux/features/cart/cartSlice";
import { coffeeProducts, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Container } from "@/components/ui/Container";
import {
  FadeIn,
  RevealOnScroll,
  StaggerContainer,
  StaggerItem,
  ScaleIn,
} from "@/components/animations";
import {
  Search,
  ShoppingBag,
  X,
  Check,
  Flame,
  Coffee,
  Sparkles,
  Truck,
  Leaf,
} from "lucide-react";

// Re-export coffeeProducts for backward compatibility
export { coffeeProducts };

const grindOptions = [
  {
    id: "whole-bean",
    label: "Whole Bean",
    desc: "Locks in peak aroma (Recommended)",
  },
  {
    id: "espresso",
    label: "Espresso Grind",
    desc: "Fine grind for 9-bar machines & Moka",
  },
  {
    id: "pour-over",
    label: "Pour-Over / Chemex",
    desc: "Medium grind for paper filters",
  },
  {
    id: "french-press",
    label: "French Press",
    desc: "Coarse grind for immersion brew",
  },
  {
    id: "cold-brew",
    label: "Cold Brew Coarse",
    desc: "Extra coarse for slow steeping",
  },
];

const sizeOptions = [
  {
    id: "250g",
    label: "250g (8.8oz)",
    multiplier: 1,
    desc: "Approx. 16-18 cups",
  },
  {
    id: "500g",
    label: "500g (1.1lb)",
    multiplier: 1.7,
    desc: "Approx. 32-36 cups • Save 15%",
  },
  {
    id: "1kg",
    label: "1kg (2.2lb)",
    multiplier: 3.1,
    desc: "Approx. 65-70 cups • Save 25%",
  },
];

const brewingMethods = [
  {
    id: "pour-over",
    title: "Pour-Over (V60 / Chemex)",
    ratio: "1:16 (15g coffee to 240g water)",
    temp: "93°C / 200°F",
    time: "3:00 - 3:30 mins",
    grind: "Medium (Sea salt consistency)",
    tips: "Bloom with 45g water for 45s to release CO2 before continuous concentric circular pours.",
  },
  {
    id: "espresso",
    title: "Espresso Machine",
    ratio: "1:2 (18g dry in, 36g liquid out)",
    temp: "93°C / 200°F",
    time: "28 - 32 seconds",
    grind: "Fine (Powdered table salt)",
    tips: "Tamp evenly with 30 lbs of level pressure. Look for hazelnut tiger-striping crema.",
  },
  {
    id: "french-press",
    title: "French Press",
    ratio: "1:15 (30g coffee to 450g water)",
    temp: "94°C / 202°F",
    time: "4:00 mins steep",
    grind: "Coarse (Breadcrumbs)",
    tips: "Steep undisturbed for 4 minutes, gently break the top crust with a spoon, scoop foam, then plunge.",
  },
  {
    id: "cold-brew",
    title: "Cold Brew Immersion",
    ratio: "1:8 Concentrate (100g to 800g water)",
    temp: "Room temp / Refrigerated",
    time: "16 - 18 hours",
    grind: "Extra Coarse (Coarse salt)",
    tips: "Steep in cold filtered water inside fridge. Dilute 1:1 with ice, cold milk, or sparkling water.",
  },
];

function CatalogContent() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  // Search & Filter State
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [favorites, setFavorites] = useState({});

  // Product Customizer Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const [selectedGrind, setSelectedGrind] = useState(grindOptions[0].id);
  const [isSubscription, setIsSubscription] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Cart Drawer State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Brewing Guide Tab
  const [activeBrewTab, setActiveBrewTab] = useState(brewingMethods[0].id);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState("");

  // Redux Cart State
  const cart = useSelector(selectCartItems);
  const cartItemCount = useSelector(selectCartTotalItems);
  const cartSubtotal = useSelector(selectCartSubtotal);

  // Read URL search param on load or change
  useEffect(() => {
    const urlQuery = searchParams.get("search");
    if (urlQuery) {
      setSearchQuery(urlQuery);
    }
  }, [searchParams]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      showToast(
        next[id] ? "Saved to your favorites!" : "Removed from favorites",
      );
      return next;
    });
  };

  // Filtered & Sorted Coffee List
  const filteredProducts = useMemo(() => {
    return coffeeProducts
      .filter((coffee) => {
        const matchesCategory =
          selectedCategory === "All" ||
          coffee.category === selectedCategory ||
          coffee.roast.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesSearch =
          searchQuery.trim() === "" ||
          coffee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coffee.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coffee.notes.some((note) =>
            note.toLowerCase().includes(searchQuery.toLowerCase()),
          );
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "roast") return b.roastLevel - a.roastLevel;
        return 0; // featured default
      });
  }, [selectedCategory, searchQuery, sortBy]);

  // Open customizer
  const openCustomizer = (product) => {
    setSelectedProduct(product);
    setSelectedSize(sizeOptions[0]);
    setSelectedGrind(grindOptions[0].id);
    setIsSubscription(false);
    setQuantity(1);
  };

  // Add to Global Redux Cart
  const handleAddToCart = () => {
    if (!selectedProduct) return;
    const basePrice = selectedProduct.price * selectedSize.multiplier;
    const finalPrice = isSubscription ? basePrice * 0.85 : basePrice;

    dispatch(
      addToCart({
        id: selectedProduct.id,
        name: selectedProduct.name,
        image: selectedProduct.image,
        size: selectedSize.label,
        grind: grindOptions.find((g) => g.id === selectedGrind)?.label,
        isSubscription,
        price: Number(finalPrice.toFixed(2)),
        quantity,
      }),
    );

    showToast(`Added ${quantity}x ${selectedProduct.name} to your bag!`);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  // Cart Calculations
  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const freeShippingThreshold = 40;
  const shippingCost =
    cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 5.0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "AURA10") {
      setDiscountPercent(10);
      showToast("Coupon 'AURA10' applied: 10% OFF!");
    } else {
      showToast("Invalid coupon code. Try 'AURA10'");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#120B06] text-[#F5EBE1]">
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-16 right-10 -z-10 h-96 w-96 rounded-full bg-[#DE9E57]/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 -z-10 h-80 w-80 rounded-full bg-[#7A4C26]/12 blur-[120px] pointer-events-none" />

      {/* Floating Cart Trigger Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Link
          href="/cart"
          className="flex items-center gap-2.5 px-4 py-3 bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] font-semibold text-xs sm:text-sm rounded-full shadow-2xl shadow-black/80 transition-colors duration-300 cursor-pointer"
          aria-label="View Shopping Bag"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="font-mono">Bag ({cartItemCount})</span>
          <span className="hidden sm:inline pl-1 border-l border-[#120B06]/30">
            ${cartSubtotal.toFixed(2)}
          </span>
        </Link>
      </motion.div>

      {/* Hero / Header Showcase */}
      <section className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-14 border-b border-[#2A1B11]">
        <Container>
          {/* Breadcrumb */}
          <FadeIn direction="down" duration={0.4} distance={10}>
            <nav className="flex items-center gap-2 text-xs text-[#8A7868] mb-4">
              <Link href="/" className="hover:text-[#DE9E57] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#DE9E57] font-medium">
                Coffee Collection
              </span>
            </nav>
          </FadeIn>

          <div className="max-w-3xl">
            <FadeIn direction="up" delay={0.08} duration={0.55}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#271910] border border-[#3E2718] text-[#DE9E57] text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Small-Batch Drum Roasted • 100% Specialty Grade</span>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.16} duration={0.65}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-serif">
                Artisanal Coffee Collection
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.24} duration={0.65}>
              <p className="mt-4 text-xs sm:text-base text-[#C4B5A5] leading-relaxed font-normal">
                Explore hand-selected single-origin lots and signature espresso
                blends, responsibly sourced from high-elevation family
                micro-lots in Colombia, Ethiopia, Brazil, and Guatemala.
              </p>
            </FadeIn>

            {/* Quick Guarantees Pill Bar */}
            <FadeIn direction="up" delay={0.32} duration={0.65}>
              <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#A89A8D]">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#DE9E57]" />
                  <span>Roast-to-Order Freshness</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#DE9E57]" />
                  <span>Free Climate-Neutral Shipping over $40</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-[#DE9E57]" />
                  <span>100% Recyclable Plant-Based Pouches</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Main Catalog Section with Filters */}
      <section className="py-10 sm:py-14">
        <Container>
          {/* Search, Filter Tabs & Sort Controls */}
          <FadeIn direction="up" delay={0.36} duration={0.6}>
            <div className="space-y-4 mb-10">
              {/* Top Row: Search Input & Sort Dropdown */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7868]" />
                  <input
                    type="text"
                    placeholder="Search by name, origin (e.g. Ethiopia), or flavor note..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-9 py-2.5 bg-[#180E07] border border-[#302014] rounded-xl text-xs sm:text-sm text-[#F5EBE1] placeholder-[#7A6A5E] focus:outline-none focus:border-[#DE9E57] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A7868] hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Sort Selector */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-[#8A7868] hidden sm:inline">
                    Sort By:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#180E07] border border-[#302014] text-[#C4B5A5] text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#DE9E57] cursor-pointer"
                  >
                    <option value="featured">Featured Roasts</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Customer Rating</option>
                    <option value="roast">
                      Roast Intensity (Dark to Light)
                    </option>
                  </select>
                </div>
              </div>

              {/* Bottom Row: Category Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-1">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <motion.button
                      key={cat}
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSelectedCategory(cat)}
                      className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#DE9E57] text-[#120B06] font-semibold shadow-md shadow-[#DE9E57]/15"
                          : "bg-[#180E07] text-[#C4B5A5] border border-[#2E1D11] hover:border-[#DE9E57]/40 hover:text-white"
                      }`}
                    >
                      {cat}
                    </motion.button>
                  );
                })}
              </div>

              {/* Active Filters Summary */}
              <div className="flex items-center justify-between text-xs text-[#8A7868] pt-1">
                <span>
                  Showing{" "}
                  <strong className="text-[#DE9E57]">
                    {filteredProducts.length}
                  </strong>{" "}
                  coffees
                  {selectedCategory !== "All" && ` in ${selectedCategory}`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </span>

                {(selectedCategory !== "All" || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchQuery("");
                    }}
                    className="text-[#DE9E57] hover:underline cursor-pointer"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Product Grid Using Reusable ProductCard Component */}
          {filteredProducts.length === 0 ? (
            <ScaleIn duration={0.45}>
              <div className="text-center py-16 px-4 border border-dashed border-[#302014] rounded-2xl bg-[#160D07]/50">
                <Coffee className="w-10 h-10 text-[#8A7868] mx-auto mb-3" />
                <h3 className="text-base font-semibold text-white">
                  No coffees found
                </h3>
                <p className="text-xs text-[#A89A8D] mt-1 max-w-sm mx-auto">
                  We couldn&apos;t find any roasts matching your search query.
                  Try broadening your terms or resetting filters.
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-[#DE9E57] text-[#120B06] font-semibold text-xs cursor-pointer"
                >
                  View All Coffees
                </motion.button>
              </div>
            </ScaleIn>
          ) : (
            <StaggerContainer
              key={`${selectedCategory}-${sortBy}-${searchQuery}`}
              staggerDelay={0.07}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7"
            >
              {filteredProducts.map((coffee) => (
                <StaggerItem key={coffee.id}>
                  <ProductCard
                    product={coffee}
                    variant="catalog"
                    isFavorite={!!favorites[coffee.id]}
                    onToggleFavorite={toggleFavorite}
                    onAddToCart={() =>
                      showToast(`Added ${coffee.name} to your cart!`)
                    }
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </Container>
      </section>

      {/* Brewing Guide / Master Barista Recommendations */}
      <section className="py-14 sm:py-20 bg-[#0F0804] border-t border-[#24160D]">
        <Container>
          <RevealOnScroll direction="up" duration={0.65}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs uppercase font-semibold text-[#DE9E57] tracking-widest block mb-2">
                The Ritual
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
                Master Coffee Brewing Guide
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#C4B5A5] leading-relaxed">
                Unlock the maximum aromatic potential of your beans with our
                tested barista recipes.
              </p>
            </div>
          </RevealOnScroll>

          {/* Brewing Method Selector Tabs */}
          <RevealOnScroll direction="up" delay={0.1} duration={0.6}>
            <div className="flex justify-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8">
              {brewingMethods.map((method) => (
                <motion.button
                  key={method.id}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveBrewTab(method.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    activeBrewTab === method.id
                      ? "bg-[#DE9E57] text-[#120B06] font-semibold shadow-md shadow-[#DE9E57]/10"
                      : "bg-[#180E07] text-[#A89A8D] border border-[#2E1D11] hover:text-white"
                  }`}
                >
                  {method.title}
                </motion.button>
              ))}
            </div>
          </RevealOnScroll>

          {/* Active Brewing Method Card */}
          <ScaleIn delay={0.15} duration={0.6}>
            {(() => {
              const currentMethod =
                brewingMethods.find((m) => m.id === activeBrewTab) ||
                brewingMethods[0];
              return (
                <FadeIn
                  key={currentMethod.id}
                  direction="up"
                  distance={10}
                  duration={0.35}
                  className="max-w-3xl mx-auto bg-[#180E07] border border-[#352316] rounded-2xl p-6 sm:p-8 shadow-xl"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[#2A1B11] text-center">
                    <div>
                      <span className="text-[11px] text-[#8A7868] uppercase tracking-wider block mb-1">
                        Brew Ratio
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-white font-mono">
                        {currentMethod.ratio}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#8A7868] uppercase tracking-wider block mb-1">
                        Water Temp
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-white font-mono">
                        {currentMethod.temp}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#8A7868] uppercase tracking-wider block mb-1">
                        Brew Time
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-white font-mono">
                        {currentMethod.time}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#8A7868] uppercase tracking-wider block mb-1">
                        Grind Size
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {currentMethod.grind}
                      </span>
                    </div>
                  </div>

                  <div className="pt-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DE9E57] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Barista Pro Tip
                    </h4>
                    <p className="text-xs sm:text-sm text-[#C4B5A5] leading-relaxed">
                      {currentMethod.tips}
                    </p>
                  </div>
                </FadeIn>
              );
            })()}
          </ScaleIn>
        </Container>
      </section>

      {/* Floating Feedback Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#1C120B] border border-[#DE9E57]/40 text-[#F5EBE1] text-xs font-medium rounded-xl shadow-2xl animate-in slide-in-from-bottom-3 duration-300">
          <div className="w-5 h-5 rounded-full bg-[#DE9E57]/20 flex items-center justify-center text-[#DE9E57]">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export function CoffeeCatalog() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#120B06] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#DE9E57] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}

export default CoffeeCatalog;

"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  Search,
  SlidersHorizontal,
  ShoppingBag,
  X,
  Plus,
  Minus,
  Check,
  Flame,
  Coffee,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Leaf,
  RotateCcw,
  Clock,
  Droplet,
  Compass,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

// Complete Coffee Catalog Dataset
export const coffeeProducts = [
  {
    id: "latte-supreme",
    name: "Latte Supreme",
    category: "Signature Blends",
    roast: "Medium Roast",
    roastLevel: 3,
    price: 10.99,
    rating: 4.8,
    reviews: 142,
    badge: "House Favorite",
    origin: "Medellín, Colombia",
    altitude: "1,650m",
    process: "Washed",
    notes: ["Velvet Cream", "Milk Chocolate", "Toasted Pecan"],
    image: "/images/products/latte-supreme.webp",
    description:
      "Our signature blend crafted specifically for milk pairings. Layers of toasted pecan and silky milk chocolate with a dense, persistent crema.",
  },
  {
    id: "caramel-cloud",
    name: "Caramel Cloud",
    category: "Signature Blends",
    roast: "Light-Medium Roast",
    roastLevel: 2,
    price: 12.99,
    rating: 4.9,
    reviews: 218,
    badge: "Best Seller",
    origin: "Antigua, Guatemala",
    altitude: "1,800m",
    process: "Honey Process",
    notes: ["Salted Caramel", "Madagascar Vanilla", "Brown Butter"],
    image: "/images/products/caramel-cloud.webp",
    description:
      "Whipped caramel cloud foam profile over slow-dripped single estate beans. Naturally sweet with delicate floral aromas.",
  },
  {
    id: "vanilla-ember",
    name: "Vanilla Ember",
    category: "Dark Roast",
    roast: "Dark Roast",
    roastLevel: 4,
    price: 14.99,
    rating: 4.7,
    reviews: 95,
    badge: "Specialty Batch",
    origin: "Sidama, Ethiopia",
    altitude: "1,950m",
    process: "Natural / Sun-Dried",
    notes: ["Dark Cocoa", "Spiced Vanilla", "Smoked Toffee"],
    image: "/images/products/vanilla-ember.webp",
    description:
      "Intense roasted cocoa nibs kissed with pure vanilla bean extraction and warm aromatic cloves.",
  },
  {
    id: "brazilian-cerrado",
    name: "Brazilian Cerrado Gold",
    category: "Single Origin",
    roast: "Medium Roast",
    roastLevel: 3,
    price: 16.00,
    rating: 4.9,
    reviews: 310,
    badge: "Award Winner",
    origin: "Cerrado Mineiro, Brazil",
    altitude: "1,150m",
    process: "Pulped Natural",
    notes: ["Toasted Hazelnut", "Cocoa Nibs", "Golden Honey"],
    image: "/images/hero/thumb-brazilian.webp",
    description:
      "Sun-drenched Brazilian terroir offering a heavy body, velvety crema, and a sweet, nutty finish that lingers like melted praline.",
  },
  {
    id: "espresso-eclipse",
    name: "Espresso Eclipse",
    category: "Dark Roast",
    roast: "Dark Roast",
    roastLevel: 5,
    price: 11.94,
    rating: 4.6,
    reviews: 88,
    badge: "Bold & Intense",
    origin: "Sumatra Mandheling",
    altitude: "1,400m",
    process: "Wet Hulled (Giling Basah)",
    notes: ["Molasses", "Smoky Cedar", "90% Cacao"],
    image: "/images/products/espresso-eclipse.webp",
    description:
      "Deep French roast extraction featuring dark chocolate fudge, sweet pipe smoke, and an unyielding, thick crema.",
  },
  {
    id: "maple-morning",
    name: "Maple Morning",
    category: "Light Roast",
    roast: "Light Roast",
    roastLevel: 1,
    price: 12.50,
    rating: 4.8,
    reviews: 112,
    badge: "Staff Pick",
    origin: "Huehuetenango, Guatemala",
    altitude: "1,900m",
    process: "Fully Washed",
    notes: ["Vermont Maple", "Crisp Red Apple", "Cane Sugar"],
    image: "/images/products/maple-morning.webp",
    description:
      "Blonde roast elegance featuring sweet organic maple sweetness and crisp stone-fruit acidity. Vibrant and refreshing.",
  },
  {
    id: "cinnamon-drift",
    name: "Cinnamon Drift",
    category: "Signature Blends",
    roast: "Medium Roast",
    roastLevel: 3,
    price: 13.90,
    rating: 4.4,
    reviews: 76,
    badge: "Artisanal Spiced",
    origin: "Yirgacheffe, Ethiopia",
    altitude: "2,050m",
    process: "Natural",
    notes: ["Ceylon Cinnamon", "Fresh Nutmeg", "Sweet Cream"],
    image: "/images/products/cinnamon-drift.webp",
    description:
      "Steeped Ceylon cinnamon bark and raw nutmeg harmonize with bright African heirloom beans for a cozy fireside cup.",
  },
  {
    id: "ethiopian-yirgacheffe",
    name: "Ethiopian Yirgacheffe Diamond",
    category: "Single Origin",
    roast: "Light Roast",
    roastLevel: 2,
    price: 18.50,
    rating: 4.9,
    reviews: 184,
    badge: "Cup of Excellence",
    origin: "Gedeo Zone, Ethiopia",
    altitude: "2,100m",
    process: "Heirloom Natural",
    notes: ["Bergamot Citrus", "Jasmine Blossom", "Peach Nectar"],
    image: "/images/journey/gallery-4.webp",
    description:
      "High-altitude heirloom coffee with tea-like delicacy, fragrant jasmine florals, and a bright, sweet bergamot finish.",
  },
  {
    id: "colombian-supremo",
    name: "Colombian Supremo Huila",
    category: "Single Origin",
    roast: "Medium Roast",
    roastLevel: 3,
    price: 17.00,
    rating: 4.8,
    reviews: 129,
    badge: "Micro-Lot",
    origin: "Huila, Colombia",
    altitude: "1,750m",
    process: "48h Washed Fermentation",
    notes: ["Tangerine", "Panela Sugar", "Almond Butter"],
    image: "/images/hero/thumb-latte.webp",
    description:
      "Handpicked cherries from smallholder cooperative farmers in Huila, exhibiting lively citrus and silky dulce de leche.",
  },
  {
    id: "cold-brew-reserve",
    name: "Cold Brew Reserve Steep Pack",
    category: "Cold Brew",
    roast: "Dark Roast",
    roastLevel: 4,
    price: 15.50,
    rating: 4.9,
    reviews: 240,
    badge: "Ultra Smooth",
    origin: "Brazil & Sumatra Blend",
    altitude: "1,500m",
    process: "Dual-Origin Blend",
    notes: ["Chocolate Fudge", "Bourbon Vanilla", "Zero Acidity"],
    image: "/images/journey/gallery-2.webp",
    description:
      "Coarsely ground and Nitrogen-flushed steep sachets formulated for 18-hour cold steeping. Ultra-smooth and dessert-like.",
  },
  {
    id: "swiss-water-decaf",
    name: "Swiss Water Decaf Velvet",
    category: "Signature Blends",
    roast: "Medium Roast",
    roastLevel: 3,
    price: 14.50,
    rating: 4.7,
    reviews: 64,
    badge: "100% Chemical Free",
    origin: "Tarrazú, Costa Rica",
    altitude: "1,600m",
    process: "Swiss Water Decaffeination",
    notes: ["Milk Chocolate", "Toasted Walnut", "Honey Graham"],
    image: "/images/hero/thumb-cappuccino.webp",
    description:
      "Naturally decaffeinated using pure Swiss mountain water. Retains 100% of the origin's rich hazelnut and cocoa sweetness.",
  },
  {
    id: "barista-cappuccino",
    name: "Artisanal Cappuccino Blend",
    category: "Signature Blends",
    roast: "Dark Roast",
    roastLevel: 4,
    price: 12.00,
    rating: 4.9,
    reviews: 175,
    badge: "Barista Choice",
    origin: "Minas Gerais & Sidama",
    altitude: "1,700m",
    process: "Honey & Washed Blend",
    notes: ["Raw Cocoa", "Spiced Plum", "Golden Crema"],
    image: "/images/why-us/feature-beans.webp",
    description:
      "Engineered specifically to punch through textured steamed milk with thick velvety crema and intense cocoa undertones.",
  },
];

const categories = [
  "All",
  "Signature Blends",
  "Single Origin",
  "Light Roast",
  "Medium Roast",
  "Dark Roast",
  "Cold Brew",
];

const grindOptions = [
  { id: "whole-bean", label: "Whole Bean", desc: "Locks in peak aroma (Recommended)" },
  { id: "espresso", label: "Espresso Grind", desc: "Fine grind for 9-bar machines & Moka" },
  { id: "pour-over", label: "Pour-Over / Chemex", desc: "Medium grind for paper filters" },
  { id: "french-press", label: "French Press", desc: "Coarse grind for immersion brew" },
  { id: "cold-brew", label: "Cold Brew Coarse", desc: "Extra coarse for slow steeping" },
];

const sizeOptions = [
  { id: "250g", label: "250g (8.8oz)", multiplier: 1, desc: "Approx. 16-18 cups" },
  { id: "500g", label: "500g (1.1lb)", multiplier: 1.7, desc: "Approx. 32-36 cups • Save 15%" },
  { id: "1kg", label: "1kg (2.2lb)", multiplier: 3.1, desc: "Approx. 65-70 cups • Save 25%" },
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

export const CoffeeCatalog = () => {
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
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Brewing Guide Tab
  const [activeBrewTab, setActiveBrewTab] = useState(brewingMethods[0].id);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      showToast(next[id] ? "Saved to your favorites!" : "Removed from favorites");
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
            note.toLowerCase().includes(searchQuery.toLowerCase())
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

  // Add to Cart
  const handleAddToCart = () => {
    if (!selectedProduct) return;
    const basePrice = selectedProduct.price * selectedSize.multiplier;
    const finalPrice = isSubscription ? basePrice * 0.85 : basePrice;

    const cartItem = {
      cartId: `${selectedProduct.id}-${selectedSize.id}-${selectedGrind}-${isSubscription ? "sub" : "onetime"}`,
      id: selectedProduct.id,
      name: selectedProduct.name,
      image: selectedProduct.image,
      size: selectedSize.label,
      grind: grindOptions.find((g) => g.id === selectedGrind)?.label,
      isSubscription,
      unitPrice: finalPrice,
      quantity,
    };

    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.cartId === cartItem.cartId);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, cartItem];
    });

    showToast(`Added ${quantity}x ${selectedProduct.name} to your bag!`);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const freeShippingThreshold = 40;
  const shippingCost = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 5.0;
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

  const updateCartQty = (cartId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  return (
    <div className="relative min-h-screen bg-[#120B06] text-[#F5EBE1]">
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-16 right-10 -z-10 h-96 w-96 rounded-full bg-[#DE9E57]/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 -z-10 h-80 w-80 rounded-full bg-[#7A4C26]/12 blur-[120px] pointer-events-none" />

      {/* Floating Cart Trigger Button */}
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] font-semibold text-xs sm:text-sm rounded-full shadow-2xl shadow-black/80 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="View Shopping Bag"
      >
        <ShoppingBag className="w-4 h-4" />
        <span className="font-mono">Bag ({cartItemCount})</span>
        <span className="hidden sm:inline pl-1 border-l border-[#120B06]/30">
          ${cartSubtotal.toFixed(2)}
        </span>
      </button>

      {/* Hero / Header Showcase */}
      <section className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-14 border-b border-[#2A1B11]">
        <Container>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#8A7868] mb-4">
            <Link href="/" className="hover:text-[#DE9E57] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#DE9E57] font-medium">Coffee Collection</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#271910] border border-[#3E2718] text-[#DE9E57] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Small-Batch Drum Roasted • 100% Specialty Grade</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Artisanal Coffee Collection
            </h1>

            <p className="mt-4 text-xs sm:text-base text-[#C4B5A5] leading-relaxed font-normal">
              Explore hand-selected single-origin lots and signature espresso blends,
              responsibly sourced from high-elevation family micro-lots in Colombia, Ethiopia,
              Brazil, and Guatemala.
            </p>

            {/* Quick Guarantees Pill Bar */}
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
          </div>
        </Container>
      </section>

      {/* Main Catalog Section with Filters */}
      <section className="py-10 sm:py-14">
        <Container>
          {/* Search, Filter Tabs & Sort Controls */}
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
                <span className="text-xs text-[#8A7868] hidden sm:inline">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#180E07] border border-[#302014] text-[#C4B5A5] text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#DE9E57] cursor-pointer"
                >
                  <option value="featured">Featured Roasts</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="roast">Roast Intensity (Dark to Light)</option>
                </select>
              </div>
            </div>

            {/* Bottom Row: Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-1">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#DE9E57] text-[#120B06] font-semibold shadow-md shadow-[#DE9E57]/15"
                        : "bg-[#180E07] text-[#C4B5A5] border border-[#2E1D11] hover:border-[#DE9E57]/40 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Active Filters Summary */}
            <div className="flex items-center justify-between text-xs text-[#8A7868] pt-1">
              <span>
                Showing <strong className="text-[#DE9E57]">{filteredProducts.length}</strong> coffees
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
                  className="text-[#DE9E57] hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 px-4 border border-dashed border-[#302014] rounded-2xl bg-[#160D07]/50">
              <Coffee className="w-10 h-10 text-[#8A7868] mx-auto mb-3" />
              <h3 className="text-base font-semibold text-white">No coffees found</h3>
              <p className="text-xs text-[#A89A8D] mt-1 max-w-sm mx-auto">
                We couldn&apos;t find any roasts matching your search query. Try broadening your terms or resetting filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-[#DE9E57] text-[#120B06] font-semibold text-xs"
              >
                View All Coffees
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
              {filteredProducts.map((coffee) => {
                const isFav = !!favorites[coffee.id];
                return (
                  <div
                    key={coffee.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#1A1009]/95 border border-[#302014] hover:border-[#DE9E57]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-1.5"
                  >
                    {/* Top: Image & Badges */}
                    <div>
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#120B06]">
                        <Image
                          src={coffee.image}
                          alt={coffee.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1009] via-transparent to-transparent opacity-60 pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          <span className="px-2.5 py-1 rounded-md bg-[#120B06]/85 backdrop-blur-sm text-[10px] font-semibold text-[#DE9E57] border border-[#DE9E57]/30 tracking-wide">
                            {coffee.badge}
                          </span>
                        </div>

                        {/* Favorite Heart Button */}
                        <button
                          type="button"
                          onClick={() => toggleFavorite(coffee.id)}
                          aria-label={`Save ${coffee.name} to favorites`}
                          className="absolute top-3 right-3 p-2 rounded-full bg-[#120B06]/75 backdrop-blur-sm text-[#8A7868] hover:text-[#DE9E57] transition-all hover:scale-110 focus:outline-none"
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${
                              isFav ? "fill-[#DE9E57] text-[#DE9E57]" : "stroke-[2]"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-4 sm:p-5">
                        {/* Origin & Rating Line */}
                        <div className="flex items-center justify-between text-xs text-[#8A7868] mb-1">
                          <span className="truncate max-w-[150px]">{coffee.origin}</span>
                          <div className="flex items-center gap-1 text-[#DE9E57] font-semibold">
                            <Star className="w-3.5 h-3.5 fill-[#DE9E57] stroke-none" />
                            <span>{coffee.rating}</span>
                            <span className="text-[10px] text-[#7A6A5E]">
                              ({coffee.reviews})
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-semibold text-white tracking-wide group-hover:text-[#DE9E57] transition-colors">
                          {coffee.name}
                        </h3>

                        {/* Flavor Notes Tags */}
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {coffee.notes.map((note) => (
                            <span
                              key={note}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-[#24170E] text-[#D4C5B9] border border-[#3A2619]"
                            >
                              {note}
                            </span>
                          ))}
                        </div>

                        {/* Roast Level Indicator */}
                        <div className="mt-3.5 flex items-center justify-between text-xs text-[#8A7868]">
                          <span>{coffee.roast}</span>
                          <div className="flex items-center gap-1" title={`Roast Level ${coffee.roastLevel}/5`}>
                            {[1, 2, 3, 4, 5].map((lvl) => (
                              <span
                                key={lvl}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  lvl <= coffee.roastLevel ? "bg-[#DE9E57]" : "bg-[#332014]"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Price & Customize Button */}
                    <div className="p-4 sm:p-5 pt-0 border-t border-[#26170E] mt-3 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#7A6A5E] block">From</span>
                        <span className="text-base font-bold text-white font-mono">
                          ${coffee.price.toFixed(2)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => openCustomizer(coffee)}
                        className="px-3.5 py-2 rounded-xl bg-[#28180E] hover:bg-[#DE9E57] text-[#DE9E57] hover:text-[#120B06] border border-[#3E2718] hover:border-[#DE9E57] text-xs font-semibold transition-all duration-200 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Order</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Brewing Guide / Master Barista Recommendations */}
      <section className="py-14 sm:py-20 bg-[#0F0804] border-t border-[#24160D]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-semibold text-[#DE9E57] tracking-widest block mb-2">
              The Ritual
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Master Coffee Brewing Guide
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#C4B5A5] leading-relaxed">
              Unlock the maximum aromatic potential of your beans with our tested barista recipes.
            </p>
          </div>

          {/* Brewing Method Selector Tabs */}
          <div className="flex justify-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8">
            {brewingMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setActiveBrewTab(method.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeBrewTab === method.id
                    ? "bg-[#DE9E57] text-[#120B06] font-semibold shadow-md shadow-[#DE9E57]/10"
                    : "bg-[#180E07] text-[#A89A8D] border border-[#2E1D11] hover:text-white"
                }`}
              >
                {method.title}
              </button>
            ))}
          </div>

          {/* Active Brewing Method Card */}
          {(() => {
            const currentMethod = brewingMethods.find((m) => m.id === activeBrewTab) || brewingMethods[0];
            return (
              <div className="max-w-3xl mx-auto bg-[#180E07] border border-[#352316] rounded-2xl p-6 sm:p-8 shadow-xl">
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
              </div>
            );
          })()}
        </Container>
      </section>

      {/* Product Customizer & Order Modal */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full max-w-lg bg-[#191009] border border-[#3E2718] rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 text-[#8A7868] hover:text-[#DE9E57] transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex gap-4 items-start mb-5">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#3E2718] shrink-0 bg-[#120B06]">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#DE9E57]">
                  {selectedProduct.category} • {selectedProduct.origin}
                </span>
                <h3 className="font-serif text-xl font-semibold text-white mt-0.5">
                  {selectedProduct.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-xs text-[#DE9E57]">
                    <Star className="w-3.5 h-3.5 fill-[#DE9E57] stroke-none" />
                    <span>{selectedProduct.rating}</span>
                  </div>
                  <span className="text-xs text-[#8A7868]">
                    ({selectedProduct.reviews} verified reviews)
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#C4B5A5] leading-relaxed mb-6 pb-4 border-b border-[#2A1B11]">
              {selectedProduct.description}
            </p>

            {/* Bag Size Selector */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-[#E5D7CA] mb-2 uppercase tracking-wider">
                1. Select Bag Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {sizeOptions.map((sz) => (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      selectedSize.id === sz.id
                        ? "border-[#DE9E57] bg-[#DE9E57]/10 text-white"
                        : "border-[#302014] bg-[#140C07] text-[#A89A8D] hover:border-[#DE9E57]/40"
                    }`}
                  >
                    <span className="text-xs font-bold block">{sz.label}</span>
                    <span className="text-[10px] text-[#8A7868] block mt-0.5">
                      ${(selectedProduct.price * sz.multiplier).toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grind Type Selector */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-[#E5D7CA] mb-2 uppercase tracking-wider">
                2. Select Grind Style
              </label>
              <div className="space-y-1.5">
                {grindOptions.map((grind) => (
                  <button
                    key={grind.id}
                    type="button"
                    onClick={() => setSelectedGrind(grind.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-left border transition-all text-xs ${
                      selectedGrind === grind.id
                        ? "border-[#DE9E57] bg-[#DE9E57]/10 text-white font-medium"
                        : "border-[#302014] bg-[#140C07] text-[#A89A8D] hover:border-[#DE9E57]/40"
                    }`}
                  >
                    <span>{grind.label}</span>
                    <span className="text-[10px] text-[#8A7868]">{grind.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subscription Toggle */}
            <div className="mb-6 p-3.5 rounded-xl bg-[#20130A] border border-[#3E2718] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  Subscribe &amp; Save 15%
                </span>
                <span className="text-[11px] text-[#A89A8D]">
                  Delivered fresh every 2 weeks • Cancel anytime
                </span>
              </div>
              <input
                type="checkbox"
                checked={isSubscription}
                onChange={(e) => setIsSubscription(e.target.checked)}
                className="w-4 h-4 accent-[#DE9E57] cursor-pointer"
              />
            </div>

            {/* Quantity and Add to Bag */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#2A1B11]">
              <div className="flex items-center gap-3 bg-[#120B06] border border-[#302014] rounded-xl px-3 py-2">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-[#8A7868] hover:text-[#DE9E57]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-semibold text-white font-mono w-4 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-[#8A7868] hover:text-[#DE9E57]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] font-semibold text-sm rounded-xl transition-all duration-200 active:scale-98 shadow-md shadow-[#DE9E57]/10"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  Add to Bag • $
                  {(
                    (isSubscription
                      ? selectedProduct.price * selectedSize.multiplier * 0.85
                      : selectedProduct.price * selectedSize.multiplier) * quantity
                  ).toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-out Shopping Bag Drawer */}
      {isCartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#160D07] border-l border-[#3E2718] h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#2A1B11] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#DE9E57]" />
                <h3 className="font-serif text-lg font-semibold text-white">
                  Your Coffee Bag ({cartItemCount})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="text-[#8A7868] hover:text-[#DE9E57] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-5 py-3 bg-[#1C120A] border-b border-[#2A1B11]">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#C4B5A5]">
                  {cartSubtotal >= freeShippingThreshold
                    ? "🎉 You've unlocked Free Standard Shipping!"
                    : `Add $${(freeShippingThreshold - cartSubtotal).toFixed(2)} more for Free Shipping`}
                </span>
                <span className="font-mono text-[#DE9E57] font-semibold">
                  {Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100))}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#2B1B10] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#DE9E57] rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-[#8A7868]">
                  <Coffee className="w-10 h-10 mx-auto mb-3 opacity-60" />
                  <p className="text-sm font-medium text-white">Your bag is empty</p>
                  <p className="text-xs mt-1">Explore our roasts and add freshly crafted blends.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.cartId}
                    className="flex gap-3.5 p-3.5 rounded-xl bg-[#1C120A] border border-[#2D1E13]"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#3E2718] shrink-0 bg-[#120B06]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-semibold text-white truncate pr-2">
                          {item.name}
                        </h4>
                        <span className="text-xs font-bold text-[#DE9E57] font-mono">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <p className="text-[10px] text-[#8A7868] mt-0.5">
                        {item.size} • {item.grind}
                      </p>

                      {item.isSubscription && (
                        <span className="inline-block text-[9px] font-semibold text-[#DE9E57] bg-[#DE9E57]/10 px-1.5 py-0.5 rounded mt-1">
                          Subscribed (15% OFF)
                        </span>
                      )}

                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center gap-2 bg-[#120B06] border border-[#2E1E12] rounded-lg px-2 py-0.5">
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.cartId, -1)}
                            className="text-[#8A7868] hover:text-[#DE9E57]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-medium text-white w-3 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.cartId, 1)}
                            className="text-[#8A7868] hover:text-[#DE9E57]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => updateCartQty(item.cartId, -item.quantity)}
                          className="text-[10px] text-[#8A7868] hover:text-red-400 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#2A1B11] bg-[#191009] space-y-3">
                {/* Coupon Code Input */}
                <form onSubmit={applyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (try AURA10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-[#120B06] border border-[#302014] rounded-lg px-3 py-1.5 text-xs text-[#F5EBE1] placeholder-[#7A6A5E] focus:outline-none focus:border-[#DE9E57]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-[#2D1D12] text-[#DE9E57] border border-[#3E2718] text-xs font-semibold hover:bg-[#DE9E57] hover:text-[#120B06] transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {/* Subtotal summary */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#8A7868]">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">${cartSubtotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#DE9E57]">
                      <span>Discount (10%)</span>
                      <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#8A7868]">
                    <span>Shipping</span>
                    <span className="font-mono text-white">
                      {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#2E1E12]">
                    <span>Total</span>
                    <span className="font-mono text-[#DE9E57]">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setCheckoutModalOpen(true);
                  }}
                  className="w-full py-3 bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] font-semibold text-xs sm:text-sm rounded-xl transition-all duration-200 active:scale-98 shadow-lg shadow-[#DE9E57]/15 flex items-center justify-center gap-2"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mock Checkout Confirmation Modal */}
      {checkoutModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setCheckoutModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#191009] border border-[#3E2718] rounded-2xl p-6 sm:p-7 shadow-2xl text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-[#DE9E57]/20 text-[#DE9E57] flex items-center justify-center mx-auto mb-4 border border-[#DE9E57]/40">
              <Check className="w-6 h-6 stroke-[2.5]" />
            </div>

            <h3 className="font-serif text-xl font-bold text-white">
              Order Confirmed!
            </h3>
            <p className="text-xs text-[#C4B5A5] mt-2 leading-relaxed">
              Thank you for savoring with Café Aura. Your fresh batch will be roasted and
              dispatched with care.
            </p>

            <div className="mt-5 p-4 rounded-xl bg-[#120B06] border border-[#2E1E12] text-left text-xs space-y-1.5">
              <div className="flex justify-between text-[#8A7868]">
                <span>Order Total:</span>
                <span className="font-mono font-bold text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#8A7868]">
                <span>Items:</span>
                <span className="text-white">{cartItemCount} bags</span>
              </div>
              <div className="flex justify-between text-[#8A7868]">
                <span>Roast Schedule:</span>
                <span className="text-[#DE9E57]">Tomorrow 7:00 AM</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setCart([]);
                setCheckoutModalOpen(false);
                showToast("Order placed successfully!");
              }}
              className="mt-6 w-full py-2.5 bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] font-semibold text-xs rounded-xl transition-all"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      )}

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
};

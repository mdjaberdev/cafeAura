"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  selectWishlistItems,
  selectWishlistTotalItems,
  clearWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ProductCard";
import { coffeeProducts } from "@/data/products";
import {
  Heart,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Coffee,
  Sparkles,
  Check,
} from "lucide-react";
import {
  FadeIn,
  RevealOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";
import { motion } from "framer-motion";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const totalWishlist = useSelector(selectWishlistTotalItems);

  const [mounted, setMounted] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2600);
  };

  const handleAddAllToCart = () => {
    if (wishlistItems.length === 0) return;
    wishlistItems.forEach((product) => {
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
    });
    showToast(`Added all ${wishlistItems.length} items to your shopping cart!`);
  };

  // Safe SSR hydration placeholder
  if (!mounted) {
    return (
      <div className="min-h-[70vh] bg-[#120B06] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#DE9E57] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[#8A7868]">Loading your wishlist...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#120B06] text-[#F5EBE1] py-10 sm:py-16">
      {/* Ambient background lighting */}
      <div className="absolute top-20 right-10 -z-10 h-80 w-80 rounded-full bg-[#DE9E57]/10 blur-[140px] pointer-events-none" />

      <Container>
        {/* Breadcrumb Navigation */}
        <FadeIn direction="down" duration={0.4}>
          <nav className="flex items-center gap-2 text-xs text-[#8A7868] mb-6">
            <Link href="/" className="hover:text-[#DE9E57] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/coffee" className="hover:text-[#DE9E57] transition-colors">
              Coffee
            </Link>
            <span>/</span>
            <span className="text-[#DE9E57] font-medium">Wishlist</span>
          </nav>
        </FadeIn>

        {/* Page Heading & Actions Header */}
        <FadeIn direction="up" delay={0.1} duration={0.5}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#2A1B11] mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#271910] border border-[#3E2718] text-[#DE9E57] text-xs font-semibold mb-2">
                <Heart className="w-3.5 h-3.5 fill-[#DE9E57]" />
                <span>Your Curated Favorites</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-serif">
                Saved Coffees
              </h1>
            </div>

            {wishlistItems.length > 0 && (
              <div className="flex items-center gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAddAllToCart}
                  className="text-xs font-semibold px-4 py-2 rounded-xl bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#DE9E57]/15"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add All to Cart</span>
                </motion.button>

                <button
                  type="button"
                  onClick={() => dispatch(clearWishlist())}
                  className="text-xs text-[#8A7868] hover:text-red-400 border border-[#2E1E12] hover:border-red-400/40 px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Wishlist</span>
                </button>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Wishlist Items Grid or Empty State */}
        {wishlistItems.length === 0 ? (
          /* Empty Wishlist State */
          <FadeIn direction="up" delay={0.15}>
            <div className="py-16 sm:py-24 text-center rounded-3xl bg-[#160D07]/60 border border-dashed border-[#2F1E13] px-6 my-4">
              <div className="w-20 h-20 rounded-full bg-[#20130A] border border-[#382315] flex items-center justify-center mx-auto mb-5 text-[#8A7868]">
                <Heart className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h2 className="text-2xl font-serif font-semibold text-white">
                Your wishlist is empty
              </h2>
              <p className="text-xs sm:text-sm text-[#A89A8D] mt-2 max-w-md mx-auto leading-relaxed">
                Save your favorite artisanal lots, single origins, and espresso blends here to revisit or add to your ritual anytime.
              </p>
              <div className="mt-6 flex justify-center">
                <Link
                  href="/coffee"
                  className="px-6 py-3 rounded-full bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-[#DE9E57]/15"
                >
                  <span>Explore Coffees</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Recommended Coffees Section */}
              <div className="mt-16 pt-12 border-t border-[#26170E] text-left">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">
                      Popular House Roasts
                    </h3>
                    <p className="text-xs text-[#8A7868]">
                      Click the heart on any card to save to your wishlist
                    </p>
                  </div>
                  <Link
                    href="/coffee"
                    className="text-xs text-[#DE9E57] hover:underline hidden sm:inline-flex items-center gap-1"
                  >
                    <span>View All 12 Roasts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {coffeeProducts.slice(0, 4).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      variant="catalog"
                    />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ) : (
          /* Active Wishlist Products Grid */
          <div>
            <div className="mb-4 text-xs text-[#8A7868]">
              Showing <strong className="text-[#DE9E57]">{totalWishlist}</strong> saved coffee{totalWishlist > 1 ? "s" : ""}
            </div>

            <StaggerContainer
              staggerDelay={0.07}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7"
            >
              {wishlistItems.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard
                    product={product}
                    variant="catalog"
                    showRemoveWishlist={true}
                    onAddToCart={() => showToast(`Added ${product.name} to your cart!`)}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}
      </Container>

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

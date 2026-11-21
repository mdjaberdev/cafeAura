"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotalItems,
  selectCartSubtotal,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "@/redux/features/cart/cartSlice";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ProductCard";
import { coffeeProducts } from "@/data/products";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Coffee,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const subtotal = useSelector(selectCartSubtotal);

  const [mounted, setMounted] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const freeShippingThreshold = 40;
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 5.0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "AURA10") {
      setDiscountPercent(10);
      setPromoMessage("Coupon AURA10 applied: 10% discount added!");
    } else {
      setPromoMessage("Invalid promo code. Try 'AURA10'");
    }
  };

  const handleCheckout = () => {
    setIsCheckoutSuccess(true);
    dispatch(clearCart());
  };

  // Safe SSR hydration placeholder
  if (!mounted) {
    return (
      <div className="min-h-[70vh] bg-[#120B06] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#DE9E57] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-[#8A7868]">Loading your coffee cart...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#120B06] text-[#F5EBE1] py-10 sm:py-16">
      {/* Ambient background glow */}
      <div className="absolute top-20 right-10 -z-10 h-80 w-80 rounded-full bg-[#DE9E57]/10 blur-[140px] pointer-events-none" />

      <Container>
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#8A7868] mb-6">
          <Link href="/" className="hover:text-[#DE9E57] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/coffee" className="hover:text-[#DE9E57] transition-colors">
            Coffee
          </Link>
          <span>/</span>
          <span className="text-[#DE9E57] font-medium">Cart</span>
        </nav>

        {/* Page Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#2A1B11] mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#271910] border border-[#3E2718] text-[#DE9E57] text-xs font-semibold mb-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Café Aura Roastery Cart</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-serif">
              Your Coffee Cart
            </h1>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => dispatch(clearCart())}
                className="text-xs text-[#8A7868] hover:text-red-400 border border-[#2E1E12] hover:border-red-400/40 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Cart</span>
              </button>

              <Link
                href="/coffee"
                className="text-xs text-[#DE9E57] hover:text-[#EBB36F] font-semibold border border-[#DE9E57]/40 px-3.5 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
              >
                <span>Continue Shopping</span>
              </Link>
            </div>
          )}
        </div>

        {/* Order Success Modal State */}
        {isCheckoutSuccess ? (
          <div className="max-w-xl mx-auto py-16 px-6 text-center rounded-3xl bg-[#180E07] border border-[#3E2718] shadow-2xl my-8">
            <div className="w-16 h-16 rounded-full bg-[#DE9E57]/20 border border-[#DE9E57] flex items-center justify-center mx-auto mb-5 text-[#DE9E57]">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Order Received!
            </h2>
            <p className="text-sm text-[#C4B5A5] mt-3 leading-relaxed max-w-md mx-auto">
              Thank you for savoring with Café Aura. Your small-batch roast will be prepared,
              hand-packed, and dispatched fresh to your doorstep.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => setIsCheckoutSuccess(false)}
                className="px-6 py-3 rounded-full bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] font-semibold text-xs sm:text-sm transition-all"
              >
                Back to Shopping
              </button>
              <Link
                href="/coffee"
                className="px-6 py-3 rounded-full border border-[#3E2718] hover:border-[#DE9E57] text-[#DE9E57] font-semibold text-xs sm:text-sm transition-all inline-flex items-center justify-center gap-1.5"
              >
                <span>Explore Roasts</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart State */
          <div className="py-16 sm:py-24 text-center rounded-3xl bg-[#160D07]/60 border border-dashed border-[#2F1E13] px-6 my-4">
            <div className="w-20 h-20 rounded-full bg-[#20130A] border border-[#382315] flex items-center justify-center mx-auto mb-5 text-[#8A7868]">
              <Coffee className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h2 className="text-2xl font-serif font-semibold text-white">
              Your cart is currently empty
            </h2>
            <p className="text-xs sm:text-sm text-[#A89A8D] mt-2 max-w-md mx-auto leading-relaxed">
              Looks like you haven&apos;t added any artisanal roasts or blends to your cart yet.
              Discover our signature beans and start your brewing ritual today.
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                href="/coffee"
                className="px-6 py-3 rounded-full bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-[#DE9E57]/15"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Featured Recommendations in Empty State */}
            <div className="mt-16 pt-12 border-t border-[#26170E] text-left">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">
                    Recommended House Favorites
                  </h3>
                  <p className="text-xs text-[#8A7868]">
                    Top-rated customer selections roasted weekly
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
        ) : (
          /* Active Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Progress Indicator */}
              <div className="p-4 rounded-2xl bg-[#1C120A] border border-[#2D1D12]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#C4B5A5] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#DE9E57]" />
                    {subtotal >= freeShippingThreshold ? (
                      <span className="text-[#8E9A74] font-medium">
                        🎉 You&apos;ve qualified for Free Standard Shipping!
                      </span>
                    ) : (
                      <span>
                        Add{" "}
                        <strong className="text-[#DE9E57] font-mono">
                          ${(freeShippingThreshold - subtotal).toFixed(2)}
                        </strong>{" "}
                        more to unlock Free Shipping
                      </span>
                    )}
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#DE9E57]">
                    {Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#2B1B10] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#DE9E57] rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="space-y-3">
                {items.map((item) => {
                  const lineTotal = (Number(item.price) || 0) * (item.quantity || 1);
                  const itemKey = item.cartItemId || item.id;

                  return (
                    <div
                      key={itemKey}
                      className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#180E07] border border-[#2E1E12] hover:border-[#3E2718] transition-all"
                    >
                      {/* Product details and thumbnail */}
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <Link
                          href={`/coffee/${item.id}`}
                          className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-[#3E2718] bg-[#120B06]"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform"
                          />
                        </Link>

                        <div className="min-w-0 flex-1">
                          <Link href={`/coffee/${item.id}`}>
                            <h3 className="text-sm sm:text-base font-semibold text-white hover:text-[#DE9E57] transition-colors truncate">
                              {item.name}
                            </h3>
                          </Link>

                          <p className="text-xs text-[#8A7868] mt-0.5">
                            {item.origin ? `${item.origin} • ` : ""}
                            {item.category || "Specialty Coffee"}
                          </p>

                          {item.size && (
                            <p className="text-[11px] text-[#A89A8D] mt-0.5">
                              {item.size} {item.grind ? `• ${item.grind}` : ""}
                            </p>
                          )}

                          <div className="sm:hidden mt-2 text-xs font-mono font-bold text-[#DE9E57]">
                            ${Number(item.price).toFixed(2)} each
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls & Line Subtotal */}
                      <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#26170E]">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 bg-[#120B06] border border-[#2D1D12] rounded-xl px-2.5 py-1">
                          <button
                            type="button"
                            onClick={() => dispatch(decreaseQuantity(itemKey))}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="text-[#8A7868] hover:text-[#DE9E57] p-1 cursor-pointer transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs sm:text-sm font-mono font-semibold text-white w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => dispatch(increaseQuantity(itemKey))}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="text-[#8A7868] hover:text-[#DE9E57] p-1 cursor-pointer transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Line subtotal */}
                        <div className="text-right min-w-[75px]">
                          <span className="text-[10px] text-[#7A6A5E] block sm:hidden">
                            Subtotal
                          </span>
                          <span className="text-sm sm:text-base font-bold font-mono text-white">
                            ${lineTotal.toFixed(2)}
                          </span>
                        </div>

                        {/* Remove item button */}
                        <button
                          type="button"
                          onClick={() => dispatch(removeFromCart(itemKey))}
                          aria-label={`Remove ${item.name} from cart`}
                          className="text-[#8A7868] hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#160D07] border border-[#24160D] text-xs text-[#A89A8D]">
                  <Truck className="w-4 h-4 text-[#DE9E57] shrink-0" />
                  <span>Freshly roasted and shipped in recyclable valve pouches</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#160D07] border border-[#24160D] text-xs text-[#A89A8D]">
                  <ShieldCheck className="w-4 h-4 text-[#DE9E57] shrink-0" />
                  <span>256-Bit SSL Encrypted &amp; Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#160D07] border border-[#24160D] text-xs text-[#A89A8D]">
                  <RotateCcw className="w-4 h-4 text-[#DE9E57] shrink-0" />
                  <span>100% Aura Freshness &amp; Taste Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 p-6 rounded-2xl bg-[#180E07] border border-[#3E2718] shadow-2xl space-y-5">
                <h2 className="text-lg font-serif font-semibold text-white border-b border-[#2A1B11] pb-3">
                  Order Summary
                </h2>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#C4B5A5]">
                    Promo / Gift Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Try 'AURA10' (10% off)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-[#120B06] border border-[#302014] rounded-xl px-3 py-2 text-xs text-[#F5EBE1] placeholder-[#7A6A5E] focus:outline-none focus:border-[#DE9E57]"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-[#2D1D12] text-[#DE9E57] hover:bg-[#DE9E57] hover:text-[#120B06] border border-[#3E2718] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p
                      className={`text-[11px] mt-1 ${
                        discountPercent > 0 ? "text-[#8E9A74]" : "text-red-400"
                      }`}
                    >
                      {promoMessage}
                    </p>
                  )}
                </form>

                {/* Subtotal Calculations */}
                <div className="space-y-2.5 text-xs border-y border-[#2A1B11] py-4">
                  <div className="flex justify-between text-[#8A7868]">
                    <span>Total Items</span>
                    <span className="font-mono text-white">{totalItems} bag{totalItems > 1 ? "s" : ""}</span>
                  </div>

                  <div className="flex justify-between text-[#8A7868]">
                    <span>Cart Subtotal</span>
                    <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#DE9E57]">
                      <span>Discount (10%)</span>
                      <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#8A7868]">
                    <span>Estimated Shipping</span>
                    <span className="font-mono text-white">
                      {shippingCost === 0 ? (
                        <span className="text-[#8E9A74] font-semibold">FREE</span>
                      ) : (
                        `$${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-[#2A1B11]">
                    <span>Grand Total</span>
                    <span className="font-mono text-[#DE9E57] text-lg">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full py-3.5 rounded-full bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] font-semibold text-sm transition-all duration-200 active:scale-98 shadow-xl shadow-[#DE9E57]/15 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center">
                  <Link
                    href="/coffee"
                    className="text-xs text-[#8A7868] hover:text-[#DE9E57] transition-colors"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

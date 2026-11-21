"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { coffeeProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Container } from "@/components/ui/Container";
import {
  Star,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  ArrowLeft,
  Truck,
  Flame,
} from "lucide-react";

export default function ProductDetailClient({ product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        description: product.description,
        origin: product.origin,
        roast: product.roast,
        quantity,
      })
    );

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // 3 complementary related coffees
  const relatedProducts = coffeeProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#120B06] text-[#F5EBE1] py-10 sm:py-16">
      {/* Background ambient lighting */}
      <div className="absolute top-20 right-10 -z-10 h-96 w-96 rounded-full bg-[#DE9E57]/10 blur-[140px] pointer-events-none" />

      <Container>
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#8A7868] mb-8">
          <Link href="/" className="hover:text-[#DE9E57] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/coffee" className="hover:text-[#DE9E57] transition-colors">
            Coffee
          </Link>
          <span>/</span>
          <span className="text-[#DE9E57] font-medium">{product.name}</span>
        </nav>

        {/* Back link */}
        <Link
          href="/coffee"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#8A7868] hover:text-[#DE9E57] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to all coffees</span>
        </Link>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Product Imagery */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-3xl overflow-hidden bg-[#180E07] border border-[#3E2718] shadow-2xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120B06] via-transparent to-transparent opacity-40 pointer-events-none" />

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#120B06]/85 backdrop-blur-md text-xs font-semibold text-[#DE9E57] border border-[#DE9E57]/40 tracking-wider">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Quick Farm & Roast Metrics */}
            <div className="grid grid-cols-3 gap-3 mt-4 text-center">
              <div className="p-3 rounded-2xl bg-[#1A1009] border border-[#2D1D12]">
                <span className="text-[10px] text-[#8A7868] uppercase tracking-wider block">
                  Origin
                </span>
                <span className="text-xs font-semibold text-white block mt-0.5 truncate">
                  {product.origin}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1A1009] border border-[#2D1D12]">
                <span className="text-[10px] text-[#8A7868] uppercase tracking-wider block">
                  Altitude
                </span>
                <span className="text-xs font-semibold text-white block mt-0.5">
                  {product.altitude || "1,800m"}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[#1A1009] border border-[#2D1D12]">
                <span className="text-[10px] text-[#8A7868] uppercase tracking-wider block">
                  Process
                </span>
                <span className="text-xs font-semibold text-white block mt-0.5 truncate">
                  {product.process || "Washed"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#DE9E57]">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif mt-1">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 text-sm font-semibold text-[#DE9E57]">
                  <Star className="w-4 h-4 fill-[#DE9E57] stroke-none" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-[#8A7868]">
                  • ({product.reviews} customer ratings)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-6 border-b border-[#2A1B11]">
              <span className="text-3xl font-mono font-bold text-white">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-[#8A7868]">
                per 250g bag (Approx. 16-18 cups)
              </span>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-[#C4B5A5]">
              {product.description}
            </p>

            {/* Tasting Notes */}
            {product.notes?.length > 0 && (
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8A7868] block mb-2">
                  Tasting &amp; Cupping Notes
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      className="px-3 py-1 rounded-full bg-[#24170E] text-[#DE9E57] text-xs font-medium border border-[#3E2718]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Roast Level Bar */}
            <div className="p-4 rounded-2xl bg-[#180E07] border border-[#2D1D12] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  {product.roast}
                </span>
                <span className="text-[11px] text-[#8A7868]">
                  Roast profile {product.roastLevel} of 5
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <span
                    key={lvl}
                    className={`w-2.5 h-2.5 rounded-full ${
                      lvl <= product.roastLevel ? "bg-[#DE9E57]" : "bg-[#332014]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart Section */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Quantity selector */}
              <div className="flex items-center justify-between sm:justify-start gap-4 bg-[#180E07] border border-[#302014] rounded-2xl px-4 py-2.5">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="text-[#8A7868] hover:text-[#DE9E57] disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-mono font-semibold text-white w-6 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="text-[#8A7868] hover:text-[#DE9E57] transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-98 flex items-center justify-center gap-2.5 shadow-xl cursor-pointer ${
                  added
                    ? "bg-[#8E9A74] text-[#120B06]"
                    : "bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] shadow-[#DE9E57]/15"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      Add to Cart • ${(product.price * quantity).toFixed(2)}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Guarantees */}
            <div className="pt-4 grid grid-cols-2 gap-3 text-xs text-[#A89A8D]">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#DE9E57]" />
                <span>Roasted to order</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#DE9E57]" />
                <span>Free shipping over $40</span>
              </div>
            </div>
          </div>
        </div>

        {/* You Might Also Like Section */}
        <div className="mt-20 pt-12 border-t border-[#26170E]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-white">
                You Might Also Like
              </h2>
              <p className="text-xs text-[#8A7868] mt-1">
                Explore complementary roasts with unique terroir profiles
              </p>
            </div>
            <Link
              href="/coffee"
              className="text-xs text-[#DE9E57] hover:underline"
            >
              View Full Menu →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                variant="catalog"
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

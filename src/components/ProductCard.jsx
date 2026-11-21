"use client";

import React, { memo, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { Star, Heart, ShoppingBag, Plus, Check, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import {
  toggleWishlist,
  removeFromWishlist,
  selectIsInWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { motion } from "framer-motion";

const display = Fraunces({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatPrice = (val, centsVal) => {
  if (typeof val === "number") return fmt.format(val);
  if (typeof centsVal === "number") return fmt.format(centsVal / 100);
  if (typeof val === "string") {
    const parsed = parseFloat(val);
    if (!isNaN(parsed)) return fmt.format(parsed);
  }
  return "$0.00";
};

export const ProductCard = memo(function ProductCard({
  product,
  // Individual prop overrides
  id,
  name,
  price,
  priceCents,
  image,
  description,
  notes,
  category,
  rating,
  reviews,
  badge,
  roast,
  roastLevel,
  origin,
  // Functionality & visual props
  variant = "catalog", // "catalog" | "signature" | "row"
  onAddToCart,
  onOpenModal,
  isFavorite: isFavoriteProp,
  onToggleFavorite,
  showRemoveWishlist = false,
  className = "",
}) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  // Extract merged values from product object or direct props
  const pId = id || product?.id || "";
  const pName = name || product?.name || "Artisanal Roast";
  const pPrice =
    typeof price === "number"
      ? price
      : typeof product?.price === "number"
      ? product.price
      : typeof priceCents === "number"
      ? priceCents / 100
      : typeof product?.priceCents === "number"
      ? product.priceCents / 100
      : 10.99;
  const pImage =
    image ||
    product?.image ||
    "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=85";
  const pDesc = description || product?.description || notes || product?.notes || "";
  const pNotes = Array.isArray(notes)
    ? notes
    : Array.isArray(product?.notes)
    ? product.notes
    : typeof pDesc === "string" && pDesc.length > 0
    ? [pDesc]
    : [];
  const pCategory = category || product?.category || "Specialty Coffee";
  const pRating = typeof rating === "number" ? rating : product?.rating || 4.8;
  const pReviews = reviews || product?.reviews || 95;
  const pBadge = badge || product?.badge || "";
  const pRoast = roast || product?.roast || "";
  const pRoastLevel = roastLevel || product?.roastLevel || 3;
  const pOrigin = origin || product?.origin || "";

  // Check Redux Wishlist state
  const isWishlistedInRedux = useSelector(selectIsInWishlist(pId));
  const isWishlisted =
    typeof isFavoriteProp === "boolean" ? isFavoriteProp : isWishlistedInRedux;

  const formattedPrice = formatPrice(pPrice);

  const productData = {
    id: pId,
    name: pName,
    price: pPrice,
    image: pImage,
    category: pCategory,
    description: typeof pDesc === "string" ? pDesc : pNotes.join(", "),
    origin: pOrigin,
    roast: pRoast,
    roastLevel: pRoastLevel,
    rating: pRating,
    reviews: pReviews,
    badge: pBadge,
    notes: pNotes,
    quantity: 1,
  };

  const handleAdd = useCallback(
    (e) => {
      e?.preventDefault?.();
      e?.stopPropagation?.();

      // Dispatch to global Redux Cart
      dispatch(addToCart(productData));

      // Trigger custom parent callback if provided
      if (onAddToCart) {
        onAddToCart(productData, e?.currentTarget);
      }

      // Visual feedback
      setAdded(true);
      setTimeout(() => setAdded(false), 1600);
    },
    [dispatch, productData, onAddToCart]
  );

  const handleWishlistToggle = useCallback(
    (e) => {
      e?.preventDefault?.();
      e?.stopPropagation?.();

      // Dispatch to global Redux Wishlist
      dispatch(toggleWishlist(productData));

      // Callback if parent provided
      if (onToggleFavorite) {
        onToggleFavorite(pId);
      }
    },
    [dispatch, productData, onToggleFavorite, pId]
  );

  const handleWishlistRemove = useCallback(
    (e) => {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      dispatch(removeFromWishlist(pId));
    },
    [dispatch, pId]
  );

  /* -------------------------------------------------------------------------- */
  /*  Variant 1: Signature (Arched Window Style for Homepage & Highlights)       */
  /* -------------------------------------------------------------------------- */
  if (variant === "signature") {
    return (
      <li className={`group flex flex-col ${body.className} ${className}`}>
        {/* Arched Window Shape */}
        <div className="relative">
          <Link
            href={`/coffee/${pId}`}
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D08A4A] rounded-t-[999px] rounded-b-3xl"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl border border-[#EAD7B9]/20 p-2 bg-[#2A1A11]/30 transition-colors duration-300 group-hover:border-[#D08A4A]/50">
              <div className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-2xl">
                <Image
                  src={pImage}
                  alt={pName}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-106 motion-reduce:transform-none"
                />
              </div>
            </div>
          </Link>

          {/* Animated Favorite / Wishlist Heart Button */}
          <motion.button
            type="button"
            onClick={handleWishlistToggle}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.85 }}
            aria-pressed={isWishlisted}
            aria-label={
              isWishlisted
                ? `Remove ${pName} from wishlist`
                : `Add ${pName} to wishlist`
            }
            className={`absolute bottom-5 right-5 cursor-pointer rounded-full p-2.5 backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D08A4A] ${
              isWishlisted
                ? "bg-[#1A0F0A]/90 text-[#DE9E57]"
                : "bg-[#1A0F0A]/75 text-[#EAD7B9] hover:text-[#DE9E57]"
            }`}
          >
            <Heart
              aria-hidden
              className={`h-4 w-4 transition-transform duration-200 ${
                isWishlisted
                  ? "fill-[#DE9E57] text-[#DE9E57] scale-105"
                  : "stroke-[2]"
              }`}
            />
          </motion.button>
        </div>

        {/* Title & Price Header */}
        <div className="mt-5 flex items-baseline gap-2">
          <Link
            href={`/coffee/${pId}`}
            className="focus:outline-none hover:text-[#D08A4A] transition-colors"
          >
            <h3 className={`${display.className} shrink-0 text-xl text-[#F6EEE2] group-hover:text-[#D08A4A] transition-colors`}>
              {pName}
            </h3>
          </Link>
          <span
            aria-hidden
            className="mb-1 min-w-4 flex-1 border-b-2 border-dotted border-[#EAD7B9]/25"
          />
          <span className="shrink-0 text-base font-semibold tabular-nums text-[#D08A4A]">
            {formattedPrice}
          </span>
        </div>

        {/* Notes / Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#B9A58B]">
          {typeof pDesc === "string" ? pDesc : pNotes.join(" • ")}
        </p>

        {/* Rating and Add to Cart Button */}
        <div className="mt-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-1 text-sm text-[#C9B697]">
            <Star aria-hidden className="h-3.5 w-3.5 fill-[#D08A4A] stroke-none" />
            <span>{pRating.toFixed(1)}</span>
          </div>

          <motion.button
            type="button"
            onClick={handleAdd}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Add ${pName} to cart`}
            className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D08A4A] ${
              added
                ? "bg-[#8E9A74] text-[#1A0F0A] border border-[#8E9A74]"
                : "border border-[#EAD7B9]/30 text-[#F6EEE2] hover:border-[#D08A4A] hover:bg-[#D08A4A] hover:text-[#1A0F0A]"
            }`}
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </motion.button>
        </div>
      </li>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*  Variant 2: Row / Compact Style (Hero Favorites & Cart Recommendations)    */
  /* -------------------------------------------------------------------------- */
  if (variant === "row") {
    return (
      <li className={`flex items-center gap-4 py-4 ${body.className} ${className}`}>
        <Link href={`/coffee/${pId}`} className="shrink-0">
          <div className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-[#EAD7B9]/20 hover:scale-105 transition-transform duration-300">
            <Image
              src={pImage}
              alt={pName}
              fill
              className="object-cover"
            />
          </div>
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <Link href={`/coffee/${pId}`}>
              <h3 className={`${display.className} shrink-0 text-lg text-[#F6EEE2] hover:text-[#D08A4A] transition-colors truncate`}>
                {pName}
              </h3>
            </Link>
            <span
              aria-hidden="true"
              className="mb-1 min-w-4 flex-1 border-b-2 border-dotted border-[#EAD7B9]/25"
            />
            <span className="shrink-0 text-base font-semibold tabular-nums text-[#D08A4A]">
              {formattedPrice}
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between text-sm text-[#B9A58B]">
            <span className="flex items-center gap-1 text-xs">
              <Star className="h-3 w-3 fill-[#D08A4A] stroke-none" />
              {pRating.toFixed(1)}
              {pOrigin && <span className="text-[#8A7868] hidden sm:inline ml-1">• {pOrigin}</span>}
            </span>

            <motion.button
              type="button"
              onClick={handleAdd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Add ${pName} to cart`}
              className="cursor-pointer text-xs font-semibold text-[#DE9E57] hover:text-white transition-colors flex items-center gap-1"
            >
              {added ? (
                <span className="text-[#8E9A74] flex items-center gap-0.5">
                  <Check className="w-3 h-3" /> Added
                </span>
              ) : (
                <>
                  <Plus className="w-3 h-3" /> Add to Cart
                </>
              )}
            </motion.button>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={handleWishlistToggle}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          aria-pressed={isWishlisted}
          aria-label={
            isWishlisted
              ? `Remove ${pName} from wishlist`
              : `Add ${pName} to wishlist`
          }
          className={`shrink-0 cursor-pointer rounded-full p-2 transition-colors ${
            isWishlisted
              ? "text-[#DE9E57]"
              : "text-[#B9A58B] hover:text-[#DE9E57]"
          }`}
        >
          <Heart
            aria-hidden="true"
            className={`h-4 w-4 transition-transform duration-200 ${
              isWishlisted ? "fill-[#DE9E57] text-[#DE9E57] scale-105" : ""
            }`}
          />
        </motion.button>
      </li>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*  Variant 3: Catalog (Standard E-Commerce Card for /coffee & Grid Listings) */
  /* -------------------------------------------------------------------------- */
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#1A1009]/95 border border-[#302014] hover:border-[#DE9E57]/60 transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/70 ${body.className} ${className}`}
    >
      {/* Top: Image & Badges */}
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#120B06]">
          <Link href={`/coffee/${pId}`} className="block h-full w-full">
            <Image
              src={pImage}
              alt={pName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
            />
          </Link>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1009] via-transparent to-transparent opacity-60 pointer-events-none" />

          {/* Top Badges */}
          {pBadge && (
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              <span className="px-2.5 py-1 rounded-md bg-[#120B06]/85 backdrop-blur-sm text-[10px] font-semibold text-[#DE9E57] border border-[#DE9E57]/30 tracking-wide">
                {pBadge}
              </span>
            </div>
          )}

          {/* Animated Favorite / Wishlist Heart Button */}
          <motion.button
            type="button"
            onClick={handleWishlistToggle}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            aria-pressed={isWishlisted}
            aria-label={
              isWishlisted
                ? `Remove ${pName} from wishlist`
                : `Save ${pName} to wishlist`
            }
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors focus:outline-none ${
              isWishlisted
                ? "bg-[#120B06]/85 text-[#DE9E57]"
                : "bg-[#120B06]/75 text-[#8A7868] hover:text-[#DE9E57]"
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform duration-200 ${
                isWishlisted
                  ? "fill-[#DE9E57] text-[#DE9E57] scale-105"
                  : "stroke-[2]"
              }`}
            />
          </motion.button>
        </div>

        {/* Card Content Body */}
        <div className="p-4 sm:p-5">
          {/* Origin & Rating Line */}
          <div className="flex items-center justify-between text-xs text-[#8A7868] mb-1">
            <span className="truncate max-w-[150px]">{pOrigin || pCategory}</span>
            <div className="flex items-center gap-1 text-[#DE9E57] font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#DE9E57] stroke-none" />
              <span>{pRating.toFixed(1)}</span>
              <span className="text-[10px] text-[#7A6A5E]">({pReviews})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/coffee/${pId}`}>
            <h3 className="text-base font-semibold text-white tracking-wide group-hover:text-[#DE9E57] transition-colors">
              {pName}
            </h3>
          </Link>

          {/* Flavor Notes Tags */}
          {pNotes.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {pNotes.slice(0, 3).map((note) => (
                <span
                  key={note}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-[#24170E] text-[#D4C5B9] border border-[#3A2619]"
                >
                  {note}
                </span>
              ))}
            </div>
          )}

          {/* Roast Level Indicator */}
          {pRoast && (
            <div className="mt-3.5 flex items-center justify-between text-xs text-[#8A7868]">
              <span>{pRoast}</span>
              <div
                className="flex items-center gap-1"
                title={`Roast Level ${pRoastLevel}/5`}
              >
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <span
                    key={lvl}
                    className={`w-1.5 h-1.5 rounded-full ${
                      lvl <= pRoastLevel ? "bg-[#DE9E57]" : "bg-[#332014]"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom: Price & Add to Cart / Wishlist Actions */}
      <div className="p-4 sm:p-5 pt-0 border-t border-[#26170E] mt-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-[#7A6A5E] block">Price</span>
          <span className="text-base font-bold text-white font-mono">
            {formattedPrice}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {showRemoveWishlist && (
            <motion.button
              type="button"
              onClick={handleWishlistRemove}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label={`Remove ${pName} from wishlist`}
              className="p-2 rounded-xl bg-[#20130A] hover:bg-red-950/40 text-[#8A7868] hover:text-red-400 border border-[#302014] hover:border-red-500/40 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </motion.button>
          )}

          <motion.button
            type="button"
            onClick={handleAdd}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Add ${pName} to cart`}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-md ${
              added
                ? "bg-[#8E9A74] text-[#120B06] border border-[#8E9A74]"
                : "bg-[#28180E] hover:bg-[#DE9E57] text-[#DE9E57] hover:text-[#120B06] border border-[#3E2718] hover:border-[#DE9E57]"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

export default ProductCard;

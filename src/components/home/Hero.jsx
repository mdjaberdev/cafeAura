"use client";

import { memo, useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, X, ShoppingBag, Check } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Data & High-Quality Name-Matched Unsplash Imagery                         */
/* -------------------------------------------------------------------------- */

const FAVORITES_KEY = "hero:favorites:v1";
const TOAST_DURATION_MS = 2500;

// High-resolution, optimized Unsplash image builder with explicit sizing and quality settings
const unsplash = (id, w = 600, h = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

const DEFAULT_PRODUCTS = [
  {
    id: "brazilian-cerrado",
    name: "Brazilian Cerrado Gold",
    priceCents: 1600,
    rating: 4.9,
    image: unsplash("photo-1559056199-641a0ac8b55e", 150, 150), // Premium roasted beans macro texture
    roast: "Medium-Dark Roast",
    origin: "Cerrado Mineiro, Brazil",
    notes: "Notes of toasted hazelnut, cocoa nibs, and sweet caramel.",
  },
  {
    id: "latte-supreme",
    name: "Latte Supreme",
    priceCents: 1900,
    rating: 4.9,
    image: unsplash("photo-1570968915860-54d5c301fa9f", 150, 150), // Expert latte art pour
    roast: "Smooth Espresso Roast",
    origin: "Antioquia, Colombia",
    notes: "Silky micro-foam paired with double-origin dark chocolate notes.",
  },
  {
    id: "cappuccino-artisan",
    name: "Cappuccino",
    priceCents: 1200,
    rating: 4.9,
    image: unsplash("photo-1534778101976-62847782c213", 150, 150), // Rich dark cup with velvety crema
    roast: "Artisanal Velvet Blend",
    origin: "Sidama, Ethiopia",
    notes: "Thick velvety crema with hints of stone fruit and raw cane sugar.",
  },
];

const DEFAULT_AVATARS = [
  { id: 1, src: unsplash("photo-1534528741775-53994a69daeb", 100, 100) },
  { id: 2, src: unsplash("photo-1507003211169-0a1dd7228f2d", 100, 100) },
  { id: 3, src: unsplash("photo-1494790108377-be9c29b29330", 100, 100) },
  { id: 4, src: unsplash("photo-1500648767791-00dcc994a43e", 100, 100) },
  { id: 5, src: unsplash("photo-1517841905240-472988babdf9", 100, 100) },
];

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const formatPrice = (cents) => priceFormatter.format(cents / 100);

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9E57] focus-visible:ring-offset-2 focus-visible:ring-offset-[#120B06]";

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

const Rating = ({ value, className = "" }) => (
  <div
    className={`flex items-center gap-1 text-xs font-semibold text-[#DE9E57] ${className}`}
    role="img"
    aria-label={`Rated ${value} out of 5`}
  >
    <Star aria-hidden className="h-3.5 w-3.5 fill-[#DE9E57] stroke-none" />
    <span aria-hidden>{value.toFixed(1)}</span>
  </div>
);

const ProductCard = memo(function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
}) {
  return (
    <li className="group relative flex items-center gap-4 rounded-2xl border border-[#332013] bg-[#1B1109]/90 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#DE9E57]/40 hover:shadow-xl hover:shadow-black/55 motion-reduce:transform-none motion-reduce:transition-none sm:p-5">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#3E2718] bg-[#140C07] shadow-inner sm:h-16 sm:w-16">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="64px"
          className="object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transform-none"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold tracking-wide text-white transition-colors group-hover:text-[#DE9E57]">
          {product.name}
        </h3>

        <div className="mt-1 flex items-center gap-3">
          <span className="font-mono text-sm font-semibold text-[#F5EBE1] sm:text-base">
            {formatPrice(product.priceCents)}
          </span>
          <Rating value={product.rating} />
        </div>

        <button
          type="button"
          onClick={(e) => onOpenDetails(product, e.currentTarget)}
          aria-haspopup="dialog"
          aria-label={`View details for ${product.name}`}
          className={`mt-1.5 block cursor-pointer rounded text-xs text-[#A89A8D] underline-offset-2 transition-colors hover:text-[#DE9E57] hover:underline ${focusRing}`}
        >
          Details
        </button>
      </div>

      <button
        type="button"
        onClick={() => onToggleFavorite(product.id)}
        aria-pressed={isFavorite}
        aria-label={
          isFavorite
            ? `Remove ${product.name} from favorites`
            : `Add ${product.name} to favorites`
        }
        className={`group/heart shrink-0 rounded-full p-2 text-[#A89A8D] transition-colors hover:text-[#DE9E57] cursor-pointer ${focusRing}`}
      >
        <Heart
          aria-hidden
          className={`h-4 w-4 transition-transform duration-200 group-hover/heart:scale-[1.15] motion-reduce:transform-none ${
            isFavorite ? "fill-[#DE9E57] text-[#DE9E57]" : "stroke-[1.8]"
          }`}
        />
      </button>
    </li>
  );
});

/* -------------------------------------------------------------------------- */
/*  Details dialog                                                            */
/* -------------------------------------------------------------------------- */

const ProductDialog = ({ product, onClose, onAdd }) => {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (product && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!product && dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descId}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="m-auto w-[calc(100%-2rem)] max-w-md bg-transparent p-0 text-left backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      {product && (
        <div className="relative rounded-2xl border border-[#3D2919] bg-[#191009] p-6 shadow-2xl sm:p-7">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className={`absolute right-4 top-4 rounded-full p-1.5 text-[#A89A8D] transition-colors hover:text-[#DE9E57] cursor-pointer ${focusRing} focus-visible:ring-offset-[#191009]`}
          >
            <X aria-hidden className="h-5 w-5" />
          </button>

          <div className="mb-4 flex items-center gap-4 pr-8">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[#3E2718]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h2
                id={titleId}
                className="font-serif text-lg font-semibold text-white"
              >
                {product.name}
              </h2>
              <div className="mt-1 flex items-center gap-3">
                <span className="font-mono text-base font-bold text-[#DE9E57]">
                  {formatPrice(product.priceCents)}
                </span>
                <Rating value={product.rating} />
              </div>
            </div>
          </div>

          <dl
            id={descId}
            className="space-y-3 border-y border-[#2E1E13] py-3 text-xs sm:text-sm"
          >
            <div className="flex justify-between gap-4">
              <dt className="text-[#A89A8D]">Roast profile</dt>
              <dd className="text-right font-medium text-[#F5EBE1]">
                {product.roast}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#A89A8D]">Origin</dt>
              <dd className="text-right font-medium text-[#F5EBE1]">
                {product.origin}
              </dd>
            </div>
            <div className="pt-1">
              <dt className="mb-1 text-[#A89A8D]">Tasting notes</dt>
              <dd className="leading-relaxed text-[#C4B5A5]">
                {product.notes}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => onAdd(product)}
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DE9E57] py-2.5 text-sm font-semibold text-[#120B06] shadow-md shadow-[#DE9E57]/10 transition-all duration-200 hover:bg-[#EBB36F] active:scale-[0.98] motion-reduce:transform-none cursor-pointer ${focusRing} focus-visible:ring-offset-[#191009]`}
          >
            <ShoppingBag aria-hidden className="h-4 w-4" />
            Add to order
          </button>
        </div>
      )}
    </dialog>
  );
};

/* -------------------------------------------------------------------------- */
/*  Hero Banner Component                                                     */
/* -------------------------------------------------------------------------- */

export const Hero = ({
  products = DEFAULT_PRODUCTS,
  avatars = DEFAULT_AVATARS,
  customerCountLabel = "1000+",
  onAddToCart,
}) => {
  const [favorites, setFavorites] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState("");

  const lastTriggerRef = useRef(null);
  const toastTimerRef = useRef(null);
  const hydratedRef = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FAVORITES_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      /* storage unavailable or corrupted */
    }
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      /* ignore */
    }
  }, [favorites]);

  useEffect(
    () => () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    },
    [],
  );

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const openDetails = useCallback((product, trigger) => {
    lastTriggerRef.current = trigger;
    setSelectedProduct(product);
  }, []);

  const closeDetails = useCallback(() => {
    setSelectedProduct(null);
    lastTriggerRef.current?.focus();
  }, []);

  const handleAdd = useCallback(
    (product) => {
      onAddToCart?.(product);
      setToast(`Added ${product.name} to your order`);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setToast(""), TOAST_DURATION_MS);
      closeDetails();
    },
    [onAddToCart, closeDetails],
  );

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[#120B06] pb-14 pt-6 sm:pb-16 sm:pt-10 lg:pb-24 lg:pt-14"
    >
      {/* Decorative background lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-1/4 -z-10 h-72 w-72 rounded-full bg-[#DE9E57]/10 blur-[100px] sm:right-16 sm:h-96 sm:w-96"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/3 -z-10 h-64 w-64 rounded-full bg-[#8C572D]/10 blur-[90px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 h-full w-1/3 bg-gradient-to-bl from-[#22130A]/50 via-transparent to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="z-10 text-center lg:col-span-6 lg:text-left">
            <h1
              id="hero-heading"
              className="text-balance text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[54px] xl:text-[62px]"
            >
              Awaken your senses
              <br className="hidden sm:block" /> with every sip
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#C2B2A3] sm:text-base lg:mx-0">
              Discover hand-roasted blends from sustainable farms across the
              globe.
            </p>

            <div className="mt-7 flex justify-center sm:mt-8 lg:justify-start">
              <Link
                href="/coffee"
                className={`inline-flex items-center justify-center rounded-xl border border-[#A66F3E]/40 bg-gradient-to-r from-[#7B4C26] to-[#8C572D] px-6 py-3 text-sm font-semibold tracking-wide text-[#FDFBF7] shadow-lg shadow-[#7B4C26]/30 transition-all duration-200 hover:scale-[1.02] hover:from-[#8C572D] hover:to-[#9D6335] hover:shadow-[#DE9E57]/20 active:scale-95 motion-reduce:transform-none ${focusRing}`}
              >
                Shop our roasts
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:mt-11 sm:flex-row lg:justify-start">
              <ul className="flex -space-x-2.5 p-0.5" aria-hidden>
                {avatars.map((avatar) => (
                  <li
                    key={avatar.id}
                    className="relative h-8 w-8 overflow-hidden rounded-full bg-[#24170E] ring-2 ring-[#120B06] sm:h-9 sm:w-9"
                  >
                    <Image
                      src={avatar.src}
                      alt=""
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>

              <div className="flex flex-col items-center text-left sm:items-start">
                <div className="flex items-center gap-1" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-[#DE9E57] stroke-none"
                    />
                  ))}
                </div>
                <p className="mt-1 text-xs font-medium text-[#A89A8D]">
                  <span className="sr-only">Rated 5 out of 5. </span>
                  Loved by{" "}
                  <strong className="font-semibold text-[#E0D4C8]">
                    {customerCountLabel}
                  </strong>{" "}
                  customers
                </p>
              </div>
            </div>
          </div>

          {/* High Quality Visual Banner Image */}
          <div className="relative flex items-center justify-center lg:col-span-6">
            <div className="relative flex aspect-square w-full max-w-[420px] animate-float items-center justify-center motion-reduce:animate-none sm:aspect-[4/3] sm:max-w-[480px] lg:aspect-square lg:max-w-[530px]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(222,158,87,0.22),rgba(51,28,14,0.3),transparent)] blur-2xl"
              />

              <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl border border-[#3E2718]/40">
                <Image
                  src={unsplash("photo-1514432324607-a09d9b4aefdd", 800, 800)}
                  alt="High quality professional espresso coffee cup with crema"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 480px, 530px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Featured products grid */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <h2 className="sr-only">Featured coffees</h2>
          <ul className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            {products.key
              ? null
              : products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={!!favorites[product.id]}
                    onToggleFavorite={toggleFavorite}
                    onOpenDetails={openDetails}
                  />
                ))}
          </ul>
        </div>
      </div>

      <ProductDialog
        product={selectedProduct}
        onClose={closeDetails}
        onAdd={handleAdd}
      />

      {/* Toast notification live region */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 right-6 z-50"
      >
        {toast && (
          <div className="pointer-events-auto flex items-center gap-2.5 rounded-xl border border-[#DE9E57]/40 bg-[#1C120B] px-4 py-3 text-xs font-medium text-[#F5EBE1] shadow-2xl animate-in slide-in-from-bottom-3 motion-reduce:animate-none duration-300">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DE9E57]/20 text-[#DE9E57]">
              <Check aria-hidden className="h-3.5 w-3.5" />
            </span>
            <span>{toast}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;

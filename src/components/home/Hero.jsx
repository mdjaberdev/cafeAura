"use client";

import { memo, useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { Star, Heart, X, ShoppingBag, Check } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { ProductCard } from "@/components/ProductCard";

const display = Fraunces({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const FAVORITES_KEY = "hero:favorites:v2";
const TOAST_MS = 2500;

const unsplash = (id, w = 600, h = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const DEFAULT_PRODUCTS = [
  {
    id: "brazilian-cerrado",
    name: "Brazilian Cerrado",
    priceCents: 1600,
    rating: 4.9,
    image: unsplash("photo-1559056199-641a0ac8b55e", 128, 128),
    roast: "Medium-dark roast",
    origin: "Cerrado Mineiro, Brazil",
    notes: "Toasted hazelnut, cocoa nibs and sweet caramel.",
  },
  {
    id: "latte-supreme",
    name: "Latte Supreme",
    priceCents: 1900,
    rating: 4.9,
    image: unsplash("photo-1570968915860-54d5c301fa9f", 128, 128),
    roast: "Smooth espresso roast",
    origin: "Antioquia, Colombia",
    notes: "Silky micro-foam over double-origin dark chocolate.",
  },
  {
    id: "cappuccino-artisan",
    name: "Cappuccino",
    priceCents: 1200,
    rating: 4.9,
    image: unsplash("photo-1534778101976-62847782c213", 128, 128),
    roast: "Velvet blend",
    origin: "Sidama, Ethiopia",
    notes: "Thick crema with stone fruit and raw cane sugar.",
  },
];

const DEFAULT_AVATARS = [
  { id: 1, src: unsplash("photo-1534528741775-53994a69daeb", 72, 72) },
  { id: 2, src: unsplash("photo-1507003211169-0a1dd7228f2d", 72, 72) },
  { id: 3, src: unsplash("photo-1494790108377-be9c29b29330", 72, 72) },
  { id: 4, src: unsplash("photo-1500648767791-00dcc994a43e", 72, 72) },
];

const HERO_IMAGE = unsplash("photo-1514432324607-a09d9b4aefdd", 800, 1000);

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const formatPrice = (cents) => fmt.format(cents / 100);

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D08A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A0F0A]";

/* -------------------------------------------------------------------------- */
/*  Steam (Move keyframes to globals.css if possible to avoid style tags)      */
/* -------------------------------------------------------------------------- */

const Steam = memo(function Steam() {
  return (
    <>
      <style>{`
        @keyframes steam-rise {
          0%   { transform: translate3d(0, 24px, 0) scaleX(1); opacity: 0; }
          25%  { opacity: .55; }
          100% { transform: translate3d(0, -70px, 0) scaleX(1.25); opacity: 0; }
        }
        .steam-wisp {
          animation: steam-rise 6s ease-in-out infinite;
          transform-origin: center bottom;
          will-change: transform, opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .steam-wisp { animation: none; opacity: .3; will-change: auto; }
        }
      `}</style>
      <svg
        aria-hidden="true"
        viewBox="0 0 200 120"
        className="pointer-events-none absolute -top-16 left-1/2 h-32 w-52 -translate-x-1/2 sm:-top-20 sm:h-40 sm:w-64"
        fill="none"
        stroke="#EAD7B9"
        strokeWidth="5"
        strokeLinecap="round"
      >
        <path
          className="steam-wisp"
          style={{ animationDelay: "0s" }}
          d="M60 110 C45 85, 80 70, 62 40 C54 24, 66 14, 62 4"
        />
        <path
          className="steam-wisp"
          style={{ animationDelay: "1.6s" }}
          d="M100 112 C85 88, 118 72, 100 44 C92 28, 104 16, 100 4"
        />
        <path
          className="steam-wisp"
          style={{ animationDelay: "3.2s" }}
          d="M140 110 C125 86, 158 72, 140 42 C132 26, 144 14, 140 4"
        />
      </svg>
    </>
  );
});

/* -------------------------------------------------------------------------- */
/*  Menu-board row                                                            */
/* -------------------------------------------------------------------------- */

const MenuRow = memo(function MenuRow({
  product,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
}) {
  return (
    <li className="flex items-center gap-4 py-4">
      <Image
        src={product.image}
        alt=""
        width={56}
        height={56}
        className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-[#EAD7B9]/20"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <h3
            className={`${display.className} shrink-0 text-lg text-[#F6EEE2]`}
          >
            {product.name}
          </h3>
          <span
            aria-hidden="true"
            className="mb-1 min-w-4 flex-1 border-b-2 border-dotted border-[#EAD7B9]/25"
          />
          <span className="shrink-0 text-base font-semibold tabular-nums text-[#D08A4A]">
            {formatPrice(product.priceCents)}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-3 text-sm text-[#B9A58B]">
          <span
            className="flex items-center gap-1"
            aria-label={`Rated ${product.rating} out of 5`}
          >
            <Star
              aria-hidden="true"
              className="h-3.5 w-3.5 fill-[#D08A4A] stroke-none"
            />
            {product.rating.toFixed(1)}
          </span>
          <button
            type="button"
            onClick={(e) => onOpenDetails(product, e.currentTarget)}
            aria-haspopup="dialog"
            aria-label={`View details for ${product.name}`}
            className={`cursor-pointer rounded underline decoration-[#EAD7B9]/30 underline-offset-4 transition-colors hover:text-[#EAD7B9] ${focusRing}`}
          >
            See tasting notes
          </button>
        </div>
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
        className={`shrink-0 cursor-pointer rounded-full p-2 text-[#B9A58B] transition-colors hover:text-[#D08A4A] ${focusRing}`}
      >
        <Heart
          aria-hidden="true"
          className={`h-5 w-5 transition-transform active:scale-90 ${
            isFavorite ? "fill-[#D08A4A] text-[#D08A4A]" : ""
          }`}
        />
      </button>
    </li>
  );
});

/* -------------------------------------------------------------------------- */
/*  Details dialog                                                            */
/* -------------------------------------------------------------------------- */

const ProductDialog = memo(function ProductDialog({ product, onClose, onAdd }) {
  const ref = useRef(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (product) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={descId}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto w-[calc(100%-2rem)] max-w-md bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      {product && (
        <div className="relative rounded-3xl border border-[#EAD7B9]/15 bg-[#2A1A11] p-7 shadow-2xl">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className={`absolute right-4 top-4 cursor-pointer rounded-full p-1.5 text-[#B9A58B] hover:text-[#D08A4A] ${focusRing} focus-visible:ring-offset-[#2A1A11]`}
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-4 pr-8">
            <Image
              src={product.image}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-[#EAD7B9]/20"
            />
            <div>
              <h2
                id={titleId}
                className={`${display.className} text-2xl text-[#F6EEE2]`}
              >
                {product.name}
              </h2>
              <p className="mt-0.5 text-lg font-semibold text-[#D08A4A]">
                {formatPrice(product.priceCents)}
              </p>
            </div>
          </div>

          <dl
            id={descId}
            className="mt-5 space-y-3 border-y border-dotted border-[#EAD7B9]/25 py-4 text-sm"
          >
            <div className="flex justify-between gap-4">
              <dt className="text-[#B9A58B]">Roast</dt>
              <dd className="text-right text-[#F6EEE2]">{product.roast}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#B9A58B]">Origin</dt>
              <dd className="text-right text-[#F6EEE2]">{product.origin}</dd>
            </div>
            <div>
              <dt className="mb-1 text-[#B9A58B]">Tasting notes</dt>
              <dd className="leading-relaxed text-[#EAD7B9]">
                {product.notes}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => onAdd(product)}
            className={`mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#D08A4A] py-3 text-sm font-semibold text-[#1A0F0A] transition-colors hover:bg-[#E0A062] ${focusRing} focus-visible:ring-offset-[#2A1A11]`}
          >
            <ShoppingBag aria-hidden="true" className="h-4 w-4" />
            Add to order
          </button>
        </div>
      )}
    </dialog>
  );
});

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export const Hero = ({
  products = DEFAULT_PRODUCTS,
  avatars = DEFAULT_AVATARS,
  customerCountLabel = "1,000+",
  onAddToCart,
}) => {
  const dispatch = useDispatch();
  const [favoriteIds, setFavoriteIds] = useState(() => new Set());
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState("");

  const triggerRef = useRef(null);
  const timerRef = useRef(null);

  // Hydrate & sync favorites across tabs without extra hydration state triggers
  useEffect(() => {
    const readStorage = () => {
      try {
        const raw = window.localStorage.getItem(FAVORITES_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        // Support both legacy object format and new array format
        const ids = Array.isArray(parsed)
          ? parsed
          : Object.keys(parsed).filter((k) => parsed[k]);
        setFavoriteIds(new Set(ids));
      } catch {}
    };

    readStorage();
    const onStorage = (e) => {
      if (e.key === FAVORITES_KEY) readStorage();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      clearTimeout(timerRef.current);
    };
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);

      try {
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, []);

  const openDetails = useCallback((product, trigger) => {
    triggerRef.current = trigger;
    setSelected(product);
  }, []);

  const closeDetails = useCallback(() => {
    setSelected(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const handleAdd = useCallback(
    (product) => {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price:
            typeof product.price === "number"
              ? product.price
              : product.priceCents
              ? product.priceCents / 100
              : 12.0,
          image: product.image,
          description: product.notes || product.description,
          origin: product.origin,
          quantity: 1,
        })
      );
      onAddToCart?.(product);
      setToast(`Added ${product.name} to your order`);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setToast(""), TOAST_MS);
      closeDetails();
    },
    [dispatch, onAddToCart, closeDetails],
  );

  return (
    <section
      aria-labelledby="hero-heading"
      className={`${body.className} relative overflow-hidden bg-[#1A0F0A] pb-16 pt-10 text-[#EAD7B9] sm:pt-14 lg:pb-24 lg:pt-20`}
    >
      {/* Warm pendant-lamp glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(208,138,74,0.28),rgba(208,138,74,0.08)_60%,transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-7">
            <h1
              id="hero-heading"
              className={`${display.className} text-balance text-5xl font-medium leading-[1.04] tracking-tight text-[#F6EEE2] sm:text-6xl lg:text-7xl`}
            >
              Slow mornings, hand-roasted and poured just for you.
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-[#C9B697] sm:text-lg">
              Small-batch coffee from farms we know by name. Roasted this week,
              brewed the way you like it.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/coffee"
                className={`inline-flex items-center rounded-full bg-[#D08A4A] px-7 py-3.5 text-sm font-semibold text-[#1A0F0A] transition-colors hover:bg-[#E0A062] ${focusRing}`}
              >
                Shop our roasts
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <ul className="flex -space-x-2.5" aria-hidden="true">
                {avatars.map((a) => (
                  <li key={a.id} className="shrink-0">
                    <Image
                      src={a.src}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-[#1A0F0A]"
                    />
                  </li>
                ))}
              </ul>
              <p className="text-sm text-[#B9A58B]">
                <span className="sr-only">Rated 5 out of 5. </span>
                Loved by{" "}
                <strong className="font-semibold text-[#F6EEE2]">
                  {customerCountLabel}
                </strong>{" "}
                regulars
              </p>
            </div>
          </div>

          {/* Arched cafe window with steam */}
          <div className="relative mx-auto w-full max-w-[380px] lg:col-span-5 lg:max-w-[440px]">
            <Steam />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl border border-[#EAD7B9]/20 p-2.5">
              <div className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-2xl">
                <Image
                  src={"/bannerimage.png"}
                  alt="Espresso in a ceramic cup with a golden crema"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 380px, 440px"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/50 via-transparent to-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Menu board */}
        <div className="mt-16 rounded-3xl border border-[#EAD7B9]/15 bg-[#2A1A11]/70 px-5 py-6 sm:px-8 lg:mt-24">
          <h2 className={`${display.className} text-2xl text-[#F6EEE2]`}>
            Today&apos;s favorites
          </h2>
          <ul className="mt-2 grid divide-y divide-[#EAD7B9]/10 lg:grid-cols-3 lg:gap-x-10 lg:divide-y-0">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="row"
                isFavorite={favoriteIds.has(product.id)}
                onToggleFavorite={toggleFavorite}
                onAddToCart={(p) => handleAdd(p)}
              />
            ))}
          </ul>
        </div>
      </div>

      <ProductDialog
        product={selected}
        onClose={closeDetails}
        onAdd={handleAdd}
      />

      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 right-6 z-50"
      >
        {toast && (
          <div className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-[#8E9A74]/40 bg-[#2A1A11] py-2.5 pl-3 pr-5 text-sm text-[#F6EEE2] shadow-2xl">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8E9A74]/25 text-[#B7C39B]">
              <Check aria-hidden="true" className="h-3.5 w-3.5" />
            </span>
            {toast}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;

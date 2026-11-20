"use client";

import { memo, useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, X, ShoppingBag, Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

/* -------------------------------------------------------------------------- */
/*  Data & High-Quality Name-Matched Unsplash Imagery                         */
/* -------------------------------------------------------------------------- */

const FAVORITES_KEY = "signature:favorites:v1";
const TOAST_DURATION_MS = 2800;
const MAX_QUANTITY = 10;

// High-resolution Unsplash image generator optimized for rich dark coffee aesthetics
const unsplash = (id, w = 600, h = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

/**
 * Coffee shape:
 * { id, name, rating, priceCents, image, roast, origin, notes }
 * Prices are stored in cents to avoid float/format bugs.
 */
const DEFAULT_COFFEES = [
  {
    id: "latte-supreme",
    name: "Latte Supreme",
    rating: 4.8,
    priceCents: 1099,
    image: unsplash("photo-1570968915860-54d5c301fa9f", 600, 600), // Creamy latte with delicate foam art
    roast: "Medium Roast",
    origin: "Medellín, Colombia",
    notes:
      "Velvety steamed whole milk layered over rich double-shot espresso with delicate rosette art.",
  },
  {
    id: "caramel-cloud",
    name: "Caramel Cloud",
    rating: 4.9,
    priceCents: 1299,
    image: unsplash("photo-1572442388796-11668a67e53d", 600, 600), // Rich iced caramel foam specialty coffee
    roast: "Light-Medium Roast",
    origin: "Antigua, Guatemala",
    notes:
      "Whipped caramel cloud foam over slow-dripped espresso infused with Madagascar vanilla bean.",
  },
  {
    id: "vanilla-ember",
    name: "Vanilla Ember",
    rating: 4.7,
    priceCents: 1499,
    image: unsplash("photo-1514432324607-a09d9b4aefdd", 600, 600), // Warm vanilla and dark chocolate extraction
    roast: "Dark Espresso Roast",
    origin: "Sidama, Ethiopia",
    notes:
      "Warm spiced vanilla bean extraction with toasted brown sugar crema and dark chocolate dusting.",
  },
  {
    id: "espresso-eclipse",
    name: "Espresso Eclipse",
    rating: 4.6,
    priceCents: 1194,
    image: unsplash("photo-1510591509098-f4fdc6d0ff04", 600, 600), // Bold dark espresso shot with crema
    roast: "Intense French Roast",
    origin: "Sumatra Mandheling",
    notes:
      "Deep roast extraction featuring bold dark chocolate, smoky molasses, and a heavy, lingering crema.",
  },
  {
    id: "maple-morning",
    name: "Maple Morning",
    rating: 4.8,
    priceCents: 1250,
    image: unsplash("photo-1541167760496-1628856ab772", 600, 600), // Cozy artisanal coffee cup with rich golden tones
    roast: "Blonde Roast",
    origin: "Huehuetenango, Guatemala",
    notes:
      "Pure organic Vermont maple syrup harmonized with light blonde roast espresso and oat milk foam.",
  },
  {
    id: "cinnamon-drift",
    name: "Cinnamon Drift",
    rating: 4.4,
    priceCents: 1390,
    image: unsplash("photo-1495474472287-4d71bcdd2085", 600, 600), // Spiced artisan pour-over coffee vibe
    roast: "Artisanal Spiced Roast",
    origin: "Yirgacheffe, Ethiopia",
    notes:
      "Steeped Ceylon cinnamon bark and nutmeg infusion blended into a rich velvet coffee cream.",
  },
];

const SIZES = [
  { id: "regular", label: "Regular (12oz)", priceDeltaCents: 0 },
  { id: "large", label: "Large (16oz)", priceDeltaCents: 0 },
];

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const formatPrice = (cents) => priceFormatter.format(cents / 100);

/* -------------------------------------------------------------------------- */
/*  Shared styles                                                             */
/* -------------------------------------------------------------------------- */

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9E57] focus-visible:ring-offset-2 focus-visible:ring-offset-[#120B06]";
const focusRingDialog =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9E57] focus-visible:ring-offset-2 focus-visible:ring-offset-[#191009]";
const focusRingCard =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9E57] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C120A]";

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

const Rating = ({ value }) => (
  <div
    className="flex items-center gap-1 text-xs font-medium text-[#DE9E57]"
    role="img"
    aria-label={`Rated ${value} out of 5`}
  >
    <Star aria-hidden className="h-3.5 w-3.5 fill-[#DE9E57] stroke-none" />
    <span aria-hidden>{value.toFixed(1)}</span>
  </div>
);

const CoffeeCard = memo(function CoffeeCard({
  coffee,
  isFavorite,
  onToggleFavorite,
  onBuy,
}) {
  return (
    <li className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#302014] bg-[#1C120A]/90 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#DE9E57]/50 hover:shadow-2xl hover:shadow-black/70 motion-reduce:transform-none motion-reduce:transition-none">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#140C07]">
        <Image
          src={coffee.image}
          alt={coffee.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C120A] via-transparent to-transparent opacity-60"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between bg-[#1C120A]/95 p-4 sm:p-5">
        <h3 className="text-sm font-semibold tracking-wide text-white transition-colors group-hover:text-[#DE9E57] sm:text-base">
          {coffee.name}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <Rating value={coffee.rating} />
          <span className="font-mono text-xs font-semibold tracking-tight text-[#F5EBE1] sm:text-sm">
            {formatPrice(coffee.priceCents)}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#2A1B11] pt-3">
          <button
            type="button"
            onClick={(e) => onBuy(coffee, e.currentTarget)}
            aria-haspopup="dialog"
            aria-label={`Buy ${coffee.name}`}
            className={`group/btn inline-flex cursor-pointer items-center gap-1 rounded text-xs font-medium text-[#F5EBE1] transition-colors hover:text-[#DE9E57] ${focusRingCard}`}
          >
            <span>Buy now</span>
            <ArrowRight
              aria-hidden
              className="h-3 w-3 transition-transform group-hover/btn:translate-x-1 motion-reduce:transform-none"
            />
          </button>

          <button
            type="button"
            onClick={() => onToggleFavorite(coffee.id)}
            aria-pressed={isFavorite}
            aria-label={
              isFavorite
                ? `Remove ${coffee.name} from favorites`
                : `Add ${coffee.name} to favorites`
            }
            className={`group/heart rounded-full p-1.5 text-[#A89A8D] transition-colors hover:text-[#DE9E57] ${focusRingCard}`}
          >
            <Heart
              aria-hidden
              className={`h-4 w-4 transition-transform duration-200 group-hover/heart:scale-[1.15] motion-reduce:transform-none ${
                isFavorite ? "fill-[#DE9E57] text-[#DE9E57]" : "stroke-[1.8]"
              }`}
            />
          </button>
        </div>
      </div>
    </li>
  );
});

/* -------------------------------------------------------------------------- */
/*  Order form                                                                */
/* -------------------------------------------------------------------------- */

const OrderForm = ({ coffee, titleId, descId, onClose, onConfirm }) => {
  const [sizeId, setSizeId] = useState(SIZES[0].id);
  const [quantity, setQuantity] = useState(1);

  const size = SIZES.find((s) => s.id === sizeId) ?? SIZES[0];
  const unitCents = coffee.priceCents + size.priceDeltaCents;
  const totalCents = unitCents * quantity;

  return (
    <div className="relative rounded-2xl border border-[#3D2919] bg-[#191009] p-6 shadow-2xl sm:p-7">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className={`absolute right-4 top-4 rounded-full p-1.5 text-[#A89A8D] transition-colors hover:text-[#DE9E57] ${focusRingDialog}`}
      >
        <X aria-hidden className="h-5 w-5" />
      </button>

      <div className="mb-4 flex items-center gap-4 pr-8">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#3E2718]">
          <Image
            src={coffee.image}
            alt={coffee.name}
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
            {coffee.name}
          </h2>
          <div className="mt-1 flex items-center gap-3">
            <span className="font-mono text-base font-bold text-[#DE9E57]">
              {formatPrice(unitCents)}
            </span>
            <Rating value={coffee.rating} />
          </div>
        </div>
      </div>

      <p
        id={descId}
        className="mb-4 border-b border-[#2E1E13] pb-3 text-xs leading-relaxed text-[#C4B5A5]"
      >
        {coffee.notes}
      </p>

      <div className="mb-5 space-y-3">
        <fieldset>
          <legend className="mb-2 text-xs font-medium text-[#C4B5A5]">
            Cup size
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {SIZES.map((s) => (
              <label key={s.id} className="relative cursor-pointer">
                <input
                  type="radio"
                  name={`size-${coffee.id}`}
                  value={s.id}
                  checked={sizeId === s.id}
                  onChange={() => setSizeId(s.id)}
                  className="peer sr-only"
                />
                <span className="block rounded-lg border border-[#302014] py-2 text-center text-xs font-medium text-[#A89A8D] transition-all hover:border-[#DE9E57]/40 peer-checked:border-[#DE9E57] peer-checked:bg-[#DE9E57]/10 peer-checked:text-[#DE9E57] peer-focus-visible:ring-2 peer-focus-visible:ring-[#DE9E57] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#191009]">
                  {s.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex items-center justify-between pt-2">
          <span
            id={`${titleId}-qty`}
            className="text-xs font-medium text-[#C4B5A5]"
          >
            Quantity
          </span>
          <div
            role="group"
            aria-labelledby={`${titleId}-qty`}
            className="flex items-center gap-1 rounded-lg border border-[#302014] bg-[#120B06] px-1 py-1"
          >
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className={`h-7 w-7 rounded text-sm font-bold text-[#A89A8D] transition-colors hover:text-[#DE9E57] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-[#A89A8D] ${focusRingDialog}`}
            >
              −
            </button>
            <output
              aria-live="polite"
              className="w-6 text-center font-mono text-xs font-semibold text-white"
            >
              {quantity}
            </output>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
              disabled={quantity >= MAX_QUANTITY}
              aria-label="Increase quantity"
              className={`h-7 w-7 rounded text-sm font-bold text-[#A89A8D] transition-colors hover:text-[#DE9E57] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-[#A89A8D] ${focusRingDialog}`}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onConfirm({ coffee, size, quantity })}
        className={`flex w-full items-center justify-center gap-2 rounded-xl bg-[#DE9E57] py-3 text-sm font-semibold text-[#120B06] shadow-md shadow-[#DE9E57]/10 transition-all duration-200 hover:bg-[#EBB36F] active:scale-[0.98] motion-reduce:transform-none cursor-pointer ${focusRingDialog}`}
      >
        <ShoppingBag aria-hidden className="h-4 w-4" />
        <span>Add to order · {formatPrice(totalCents)}</span>
      </button>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Dialog shell                                                              */
/* -------------------------------------------------------------------------- */

const OrderDialog = ({ coffee, onClose, onConfirm }) => {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (coffee && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!coffee && dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [coffee]);

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
      {coffee && (
        <OrderForm
          key={coffee.id}
          coffee={coffee}
          titleId={titleId}
          descId={descId}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      )}
    </dialog>
  );
};

export const SignatureCoffees = ({
  coffees = DEFAULT_COFFEES,
  viewAllHref = "/coffee",
  onAddToCart,
}) => {
  const [favorites, setFavorites] = useState({});
  const [selectedCoffee, setSelectedCoffee] = useState(null);
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

  const openOrder = useCallback((coffee, trigger) => {
    lastTriggerRef.current = trigger;
    setSelectedCoffee(coffee);
  }, []);

  const closeOrder = useCallback(() => {
    setSelectedCoffee(null);
    lastTriggerRef.current?.focus();
  }, []);

  const confirmOrder = useCallback(
    (order) => {
      onAddToCart?.(order);
      setToast(
        `Added ${order.quantity}× ${order.coffee.name} (${order.size.label}) to your order`,
      );
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setToast(""), TOAST_DURATION_MS);
      closeOrder();
    },
    [onAddToCart, closeOrder],
  );

  return (
    <section
      aria-labelledby="signature-heading"
      className="relative overflow-hidden bg-[#120B06] py-16 sm:py-20 lg:py-28"
    >
      {/* Decorative curved lines */}
      <svg
        aria-hidden
        focusable="false"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M -50 300 Q 250 180 500 450 T 1200 400"
          fill="none"
          stroke="#DE9E57"
          strokeWidth="1"
        />
        <path
          d="M 200 700 Q 600 550 900 750 T 1500 600"
          fill="none"
          stroke="#8C572D"
          strokeWidth="1"
        />
      </svg>

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="signature-heading"
            className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[42px]"
          >
            Our signature coffees
          </h2>
          <p className="mt-4 text-xs leading-relaxed text-[#C4B5A5] sm:text-sm">
            Explore our premium coffee blends, each one carefully crafted to
            deliver rich, bold flavors that will transform your coffee
            experience.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
          {coffees.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              isFavorite={!!favorites[coffee.id]}
              onToggleFavorite={toggleFavorite}
              onBuy={openOrder}
            />
          ))}
        </ul>

        <div className="mt-12 text-center sm:mt-14">
          <Link
            href={viewAllHref}
            className={`inline-block rounded-sm border-b border-[#DE9E57] pb-0.5 text-xs font-medium text-[#F5EBE1] transition-colors hover:text-[#DE9E57] sm:text-sm ${focusRing}`}
          >
            View all
          </Link>
        </div>
      </Container>

      <OrderDialog
        coffee={selectedCoffee}
        onClose={closeOrder}
        onConfirm={confirmOrder}
      />

      {/* Toast live region */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 right-6 z-50 max-w-[calc(100vw-3rem)]"
      >
        {toast && (
          <div className="pointer-events-auto flex items-center gap-2.5 rounded-xl border border-[#DE9E57]/40 bg-[#1C120B] px-4 py-3 text-xs font-medium text-[#F5EBE1] shadow-2xl animate-in slide-in-from-bottom-3 duration-300 motion-reduce:animate-none">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DE9E57]/20 text-[#DE9E57]">
              <Check aria-hidden className="h-3.5 w-3.5" />
            </span>
            <span>{toast}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default SignatureCoffees;

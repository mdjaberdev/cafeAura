"use client";

import { memo, useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { Star, Heart, X, ShoppingBag, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";

/*
  Palette (shared with Hero)
  roast #1A0F0A  mocha #2A1A11  crema #EAD7B9  foam #F6EEE2  copper #D08A4A  sage #8E9A74
*/

const display = Fraunces({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const FAVORITES_KEY = "signature:favorites:v1";
const TOAST_DURATION_MS = 2800;
const MAX_QUANTITY = 10;

const unsplash = (id, w = 600, h = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

const DEFAULT_COFFEES = [
  {
    id: "latte-supreme",
    name: "Latte Supreme",
    rating: 4.8,
    priceCents: 1099,
    image: unsplash("photo-1570968915860-54d5c301fa9f", 600, 700),
    roast: "Medium roast",
    origin: "Medellín, Colombia",
    notes:
      "Velvety steamed whole milk over a rich double-shot espresso, finished with rosette art.",
  },
  {
    id: "caramel-cloud",
    name: "Caramel Cloud",
    rating: 4.9,
    priceCents: 1299,
    image: unsplash("photo-1572442388796-11668a67e53d", 600, 700),
    roast: "Light-medium roast",
    origin: "Antigua, Guatemala",
    notes:
      "Whipped caramel foam over slow-dripped espresso with Madagascar vanilla.",
  },
  {
    id: "vanilla-ember",
    name: "Vanilla Ember",
    rating: 4.7,
    priceCents: 1499,
    image: unsplash("photo-1514432324607-a09d9b4aefdd", 600, 700),
    roast: "Dark espresso roast",
    origin: "Sidama, Ethiopia",
    notes:
      "Warm spiced vanilla, toasted brown sugar crema and a dusting of dark chocolate.",
  },
  {
    id: "espresso-eclipse",
    name: "Espresso Eclipse",
    rating: 4.6,
    priceCents: 1194,
    image: unsplash("photo-1510591509098-f4fdc6d0ff04", 600, 700),
    roast: "Intense French roast",
    origin: "Sumatra Mandheling",
    notes: "Bold dark chocolate, smoky molasses and a heavy, lingering crema.",
  },
  {
    id: "maple-morning",
    name: "Maple Morning",
    rating: 4.8,
    priceCents: 1250,
    image: unsplash("photo-1541167760496-1628856ab772", 600, 700),
    roast: "Blonde roast",
    origin: "Huehuetenango, Guatemala",
    notes:
      "Organic Vermont maple with a light blonde espresso and oat milk foam.",
  },
  {
    id: "cinnamon-drift",
    name: "Cinnamon Drift",
    rating: 4.4,
    priceCents: 1390,
    image: unsplash("photo-1495474472287-4d71bcdd2085", 600, 700),
    roast: "Spiced roast",
    origin: "Yirgacheffe, Ethiopia",
    notes:
      "Ceylon cinnamon bark and nutmeg steeped into a velvet coffee cream.",
  },
];

const SIZES = [
  { id: "regular", label: "Regular (12oz)", priceDeltaCents: 0 },
  { id: "large", label: "Large (16oz)", priceDeltaCents: 0 },
];

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const formatPrice = (c) => fmt.format(c / 100);

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D08A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A0F0A]";
const focusRingDialog =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D08A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A1A11]";

/* -------------------------------------------------------------------------- */

const Rating = ({ value }) => (
  <span
    className="inline-flex items-center gap-1 text-sm text-[#C9B697]"
    role="img"
    aria-label={`Rated ${value} out of 5`}
  >
    <Star aria-hidden className="h-3.5 w-3.5 fill-[#D08A4A] stroke-none" />
    <span aria-hidden>{value.toFixed(1)}</span>
  </span>
);

const CoffeeCard = memo(function CoffeeCard({
  coffee,
  isFavorite,
  onToggleFavorite,
  onBuy,
}) {
  return (
    <li className="group flex flex-col">
      {/* Arched window, same shape as the hero */}
      <div className="relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl border border-[#EAD7B9]/20 p-2">
          <div className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-2xl">
            <Image
              src={coffee.image}
              alt={coffee.name}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleFavorite(coffee.id)}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Remove ${coffee.name} from favorites`
              : `Add ${coffee.name} to favorites`
          }
          className={`absolute bottom-5 right-5 cursor-pointer rounded-full bg-[#1A0F0A]/80 p-2.5 text-[#EAD7B9] backdrop-blur transition-colors hover:text-[#D08A4A] ${focusRing}`}
        >
          <Heart
            aria-hidden
            className={`h-4 w-4 ${isFavorite ? "fill-[#D08A4A] text-[#D08A4A]" : ""}`}
          />
        </button>
      </div>

      <div className="mt-5 flex items-baseline gap-2">
        <h3 className={`${display.className} shrink-0 text-xl text-[#F6EEE2]`}>
          {coffee.name}
        </h3>
        <span
          aria-hidden
          className="mb-1 min-w-4 flex-1 border-b-2 border-dotted border-[#EAD7B9]/25"
        />
        <span className="shrink-0 text-base font-semibold tabular-nums text-[#D08A4A]">
          {formatPrice(coffee.priceCents)}
        </span>
      </div>

      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#B9A58B]">
        {coffee.notes}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <Rating value={coffee.rating} />
        <button
          type="button"
          onClick={(e) => onBuy(coffee, e.currentTarget)}
          aria-haspopup="dialog"
          aria-label={`Order ${coffee.name}`}
          className={`cursor-pointer rounded-full border border-[#EAD7B9]/30 px-5 py-2 text-sm font-medium text-[#F6EEE2] transition-colors hover:border-[#D08A4A] hover:bg-[#D08A4A] hover:text-[#1A0F0A] ${focusRing}`}
        >
          Order
        </button>
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
    <div className="relative rounded-3xl border border-[#EAD7B9]/15 bg-[#2A1A11] p-7 shadow-2xl">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className={`absolute right-4 top-4 cursor-pointer rounded-full p-1.5 text-[#B9A58B] transition-colors hover:text-[#D08A4A] ${focusRingDialog}`}
      >
        <X aria-hidden className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-4 pr-8">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-[#EAD7B9]/20">
          <Image
            src={coffee.image}
            alt=""
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h2
            id={titleId}
            className={`${display.className} text-2xl text-[#F6EEE2]`}
          >
            {coffee.name}
          </h2>
          <div className="mt-1 flex items-center gap-3">
            <span className="text-lg font-semibold tabular-nums text-[#D08A4A]">
              {formatPrice(unitCents)}
            </span>
            <Rating value={coffee.rating} />
          </div>
        </div>
      </div>

      <p
        id={descId}
        className="mt-5 border-y border-dotted border-[#EAD7B9]/25 py-4 text-sm leading-relaxed text-[#EAD7B9]"
      >
        {coffee.notes}
      </p>

      <div className="mt-5 space-y-4">
        <fieldset>
          <legend className="mb-2 text-sm text-[#B9A58B]">Cup size</legend>
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
                <span className="block rounded-full border border-[#EAD7B9]/20 py-2.5 text-center text-sm text-[#C9B697] transition-colors hover:border-[#D08A4A]/60 peer-checked:border-[#D08A4A] peer-checked:bg-[#D08A4A]/15 peer-checked:text-[#F6EEE2] peer-focus-visible:ring-2 peer-focus-visible:ring-[#D08A4A] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#2A1A11]">
                  {s.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex items-center justify-between">
          <span id={`${titleId}-qty`} className="text-sm text-[#B9A58B]">
            Quantity
          </span>
          <div
            role="group"
            aria-labelledby={`${titleId}-qty`}
            className="flex items-center gap-1 rounded-full border border-[#EAD7B9]/20 px-1.5 py-1"
          >
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className={`h-8 w-8 cursor-pointer rounded-full text-lg text-[#C9B697] transition-colors hover:text-[#D08A4A] disabled:cursor-not-allowed disabled:opacity-40 ${focusRingDialog}`}
            >
              −
            </button>
            <output
              aria-live="polite"
              className="w-6 text-center text-sm font-semibold tabular-nums text-[#F6EEE2]"
            >
              {quantity}
            </output>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
              disabled={quantity >= MAX_QUANTITY}
              aria-label="Increase quantity"
              className={`h-8 w-8 cursor-pointer rounded-full text-lg text-[#C9B697] transition-colors hover:text-[#D08A4A] disabled:cursor-not-allowed disabled:opacity-40 ${focusRingDialog}`}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onConfirm({ coffee, size, quantity })}
        className={`mt-6 flex w-full cursor-pointer items-center justify-between rounded-full bg-[#D08A4A] px-6 py-3 text-sm font-semibold text-[#1A0F0A] transition-colors hover:bg-[#E0A062] ${focusRingDialog}`}
      >
        <span className="flex items-center gap-2">
          <ShoppingBag aria-hidden className="h-4 w-4" />
          Add to order
        </span>
        <span className="tabular-nums">{formatPrice(totalCents)}</span>
      </button>
    </div>
  );
};

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

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descId}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
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

/* -------------------------------------------------------------------------- */

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
    } catch {}
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => () => clearTimeout(toastTimerRef.current), []);

  const toggleFavorite = useCallback(
    (id) => setFavorites((p) => ({ ...p, [id]: !p[id] })),
    [],
  );

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
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setToast(""), TOAST_DURATION_MS);
      closeOrder();
    },
    [onAddToCart, closeOrder],
  );

  return (
    <section
      aria-labelledby="signature-heading"
      className={`${body.className} relative overflow-hidden bg-[#1A0F0A] py-16 text-[#EAD7B9] sm:py-20 lg:py-28`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[420px] w-[620px] translate-x-1/3 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(208,138,74,0.18),transparent)]"
      />

      <Container className="relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2
              id="signature-heading"
              className={`${display.className} text-balance text-4xl font-medium leading-tight tracking-tight text-[#F6EEE2] sm:text-5xl`}
            >
              Our signature coffees, made to be lingered over.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#C9B697]">
              Six house drinks, each built around one origin and one idea. Pick
              a favorite and we&apos;ll make it fresh.
            </p>
          </div>
          <Link
            href={viewAllHref}
            className={`shrink-0 self-start rounded text-sm font-medium text-[#EAD7B9] underline decoration-[#EAD7B9]/40 underline-offset-8 transition-colors hover:decoration-[#D08A4A] sm:self-auto ${focusRing}`}
          >
            View the full menu
          </Link>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
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
      </Container>

      <OrderDialog
        coffee={selectedCoffee}
        onClose={closeOrder}
        onConfirm={confirmOrder}
      />

      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 right-6 z-50 max-w-[calc(100vw-3rem)]"
      >
        {toast && (
          <div className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-[#8E9A74]/40 bg-[#2A1A11] py-2.5 pl-3 pr-5 text-sm text-[#F6EEE2] shadow-2xl">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#8E9A74]/25 text-[#B7C39B]">
              <Check aria-hidden className="h-3.5 w-3.5" />
            </span>
            {toast}
          </div>
        )}
      </div>
    </section>
  );
};

export default SignatureCoffees;

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ProductCard";
import { coffeeProducts } from "@/data/products";
import {
  RevealOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";
import { motion } from "framer-motion";

const display = Fraunces({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const FAVORITES_KEY = "signature:favorites:v1";
const TOAST_DURATION_MS = 2800;

// Default signature coffees from our catalog dataset
const DEFAULT_SIGNATURE_COFFEES = coffeeProducts.slice(0, 6);

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D08A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A0F0A]";

export const SignatureCoffees = ({
  coffees = DEFAULT_SIGNATURE_COFFEES,
  viewAllHref = "/coffee",
  onAddToCart,
}) => {
  const [favorites, setFavorites] = useState({});
  const [toast, setToast] = useState("");

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

  const toggleFavorite = useCallback((id) => {
    setFavorites((p) => ({ ...p, [id]: !p[id] }));
  }, []);

  const handleProductAdded = useCallback(
    (product) => {
      onAddToCart?.(product);
      setToast(`Added ${product.name} to your cart`);
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setToast(""), TOAST_DURATION_MS);
    },
    [onAddToCart]
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
        {/* Section Header with Reveal */}
        <RevealOnScroll direction="up" duration={0.65}>
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
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href={viewAllHref}
                className={`shrink-0 self-start rounded text-sm font-medium text-[#EAD7B9] underline decoration-[#EAD7B9]/40 underline-offset-8 transition-colors hover:decoration-[#D08A4A] sm:self-auto ${focusRing}`}
              >
                View the full menu
              </Link>
            </motion.div>
          </div>
        </RevealOnScroll>

        {/* Staggered Entrance for Signature Product Cards */}
        <StaggerContainer
          staggerDelay={0.09}
          className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {coffees.map((coffee) => (
            <StaggerItem key={coffee.id}>
              <ProductCard
                product={coffee}
                variant="signature"
                isFavorite={!!favorites[coffee.id]}
                onToggleFavorite={toggleFavorite}
                onAddToCart={handleProductAdded}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>

      {/* Toast Notification */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed bottom-6 right-6 z-50 max-w-[calc(100vw-3rem)]"
      >
        {toast && (
          <div className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-[#8E9A74]/40 bg-[#2A1A11] py-2.5 pl-3 pr-5 text-sm text-[#F6EEE2] shadow-2xl animate-in slide-in-from-bottom-2 duration-200">
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

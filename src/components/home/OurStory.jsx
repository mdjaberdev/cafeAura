"use client";

import React, { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/animations";
import { motion } from "framer-motion";

const display = Fraunces({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const unsplash = (id, w = 800, h = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D08A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A0F0A]";

export function CoffeeBeanIcon({ className = "w-4 h-4 text-[#C88A4B]" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <ellipse
        cx="12"
        cy="12"
        rx="7"
        ry="9.5"
        transform="rotate(-30 12 12)"
        fill="#9A6133"
      />
      <path
        d="M8.2 5.5 C 10 9.5, 14 14.5, 15.8 18.5"
        stroke="#1A0F0A"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

const coffeeVarieties = [
  "Cappuccino",
  "Espresso",
  "Mocha",
  "Latte",
  "Americano",
];

export const OurStory = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const moreId = useId();

  return (
    <section
      id="about"
      aria-labelledby="story-heading"
      className={`${body.className} relative overflow-hidden bg-[#1A0F0A] pt-16 text-[#EAD7B9] sm:pt-20 lg:pt-28`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/3 h-[460px] w-[560px] -translate-x-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(208,138,74,0.16),transparent)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Image with reveal */}
          <div className="relative mx-auto w-full max-w-[380px] lg:col-span-5 lg:max-w-[440px]">
            <RevealOnScroll direction="right" duration={0.8}>
              <div
                aria-hidden
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] rounded-b-3xl border border-[#8E9A74]/50 sm:translate-x-5 sm:translate-y-5"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl border border-[#EAD7B9]/20 bg-[#1A0F0A] p-2.5 shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-2xl">
                  <Image
                    src={unsplash("photo-1495474472287-4d71bcdd2085", 800, 1000)}
                    alt="Coffee being poured at Café Aura"
                    fill
                    sizes="(max-width: 1024px) 380px, 440px"
                    className="object-cover"
                  />
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Copy with reveal */}
          <div className="lg:col-span-7">
            <RevealOnScroll direction="up" duration={0.7} delay={0.1}>
              <h2
                id="story-heading"
                className={`${display.className} text-balance text-4xl font-medium leading-[1.08] tracking-tight text-[#F6EEE2] sm:text-5xl lg:text-6xl`}
              >
                We started with a few friends, one roaster and a very good cup.
              </h2>

              <div className="mt-6 max-w-lg space-y-4 text-base leading-relaxed text-[#C9B697]">
                <p>
                  Café Aura began in 1954, when a group of coffee lovers set out
                  to make exceptional coffee that people could enjoy, share and
                  savor every day. We still do it the same way: small batches,
                  patient roasting, and no shortcuts.
                </p>

                <div
                  id={moreId}
                  hidden={!isExpanded}
                  className="space-y-4 border-t border-dotted border-[#EAD7B9]/25 pt-4"
                >
                  <p>
                    We buy single-origin, high-altitude beans directly from
                    fair-trade farms in Colombia, Ethiopia and Guatemala, then
                    roast them in micro-batches on a drum roaster.
                  </p>
                  <p className="text-[#EAD7B9]">
                    Every bean is 100% Arabica specialty grade and sorted by hand.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsExpanded((v) => !v)}
                  aria-expanded={isExpanded}
                  aria-controls={moreId}
                  className={`cursor-pointer rounded text-sm font-medium text-[#EAD7B9] underline decoration-[#EAD7B9]/40 underline-offset-8 transition-colors hover:decoration-[#D08A4A] ${focusRing}`}
                >
                  {isExpanded ? "Read less" : "Read the rest of our story"}
                </button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link
                    href="/coffee"
                    className={`inline-flex items-center rounded-full bg-[#D08A4A] px-7 py-3.5 text-sm font-semibold text-[#1A0F0A] transition-colors hover:bg-[#E0A062] ${focusRing}`}
                  >
                    Shop our coffee
                  </Link>
                </motion.div>
                <p className="max-w-[16rem] text-sm leading-snug text-[#B9A58B]">
                  Taste the care behind every cup.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Container>

      {/* Varieties strip */}
      <nav
        aria-label="Coffee varieties"
        className="mt-16 border-t border-[#EAD7B9]/10 bg-[#2A1A11]/60 py-5 sm:mt-20"
      >
        <Container>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:justify-around">
            {coffeeVarieties.map((variety, index) => (
              <React.Fragment key={variety}>
                <li>
                  <Link
                    href="/coffee"
                    className={`${display.className} rounded text-lg text-[#F6EEE2] transition-colors hover:text-[#D08A4A] ${focusRing}`}
                  >
                    {variety}
                  </Link>
                </li>
                {index < coffeeVarieties.length - 1 && (
                  <li aria-hidden className="hidden sm:block">
                    <CoffeeBeanIcon className="h-4 w-4 text-[#A86F3E]" />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </Container>
      </nav>
    </section>
  );
};

export default OurStory;

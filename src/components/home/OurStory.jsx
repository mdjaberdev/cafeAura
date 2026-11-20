"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";

/* -------------------------------------------------------------------------- */
/*  High-Quality Unsplash Image Builder                                       */
/* -------------------------------------------------------------------------- */

const unsplash = (id, w = 800, h = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

/**
 * Custom vector Coffee Bean Icon for ticker & decorations
 */
export function CoffeeBeanIcon({ className = "w-4 h-4 text-[#C88A4B]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
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
        stroke="#120B06"
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

  return (
    <section className="relative overflow-hidden bg-[#120B06] pt-16 sm:pt-20 lg:pt-28 pb-0">
      {/* Atmospheric Ambient Glow behind illustration */}
      <div className="absolute top-1/3 right-10 -z-10 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-[#DE9E57]/10 blur-[110px] pointer-events-none" />

      {/* Subtle connecting golden line */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-15 -z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 100 150 Q 400 80 800 220 T 1600 180"
          fill="none"
          stroke="#DE9E57"
          strokeWidth="1"
        />
      </svg>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Storytelling Copy & CTA */}
          <div className="lg:col-span-6 xl:col-span-5 text-left">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Our Story
            </h2>

            <p className="mt-3 text-sm sm:text-base font-medium text-[#E5D7CA] tracking-wide">
              From Passion to Perfection: The Journey of Café Aura
            </p>

            <div className="mt-5 text-xs sm:text-sm text-[#C4B5A5] leading-relaxed font-normal">
              <p>
                At Café Aura, coffee isn&apos;t just a drink — it&apos;s a
                passion, a ritual, and an experience. Our journey began in 1954,
                when a group of coffee lovers came together with a simple
                mission: to create exceptional coffee that people could truly
                enjoy, share, and savor every day{" "}
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline font-medium text-[#DE9E57] hover:text-[#EBB36F] transition-colors underline-offset-2 hover:underline focus:outline-none"
                >
                  {isExpanded ? "Read less" : "Read more..."}
                </button>
              </p>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-[#2E1E12] space-y-2.5 animate-in fade-in duration-300">
                  <p>
                    From single-origin high-altitude beans to micro-batch drum
                    roasting, every blend is crafted with meticulous care. We
                    partner directly with fair-trade, sustainable farms in
                    Colombia, Ethiopia, and Guatemala to honor the earth and
                    elevate your daily ritual.
                  </p>
                  <p className="text-[#DE9E57] font-medium text-xs">
                    ✦ 100% Arabica Specialty Grade • Hand-Sorted & Small-Batch
                    Roasted
                  </p>
                </div>
              )}
            </div>

            {/* Sub-CTA Area */}
            <div className="mt-10 sm:mt-14">
              <p className="text-sm sm:text-base font-medium text-white max-w-sm leading-snug">
                Want to experience the quality and care behind every cup?
              </p>

              <div className="mt-4">
                <Link
                  href="#coffee"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7B4C26] to-[#8C572D] text-[#FDFBF7] text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-[#7B4C26]/25 hover:from-[#8C572D] hover:to-[#9D6335] hover:scale-[1.02] active:scale-95 transition-all duration-200 border border-[#A66F3E]/40"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: High-Quality Professional Coffee Brewing Image */}
          <div className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end items-end relative">
            <div className="relative w-full max-w-[460px] sm:max-w-[520px] lg:max-w-[580px] aspect-[4/3] sm:aspect-[1.15/1] flex items-end">
              <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl border border-[#3E2718]/40 bg-[#191009]">
                <Image
                  src={unsplash("photo-1495474472287-4d71bcdd2085", 900, 900)}
                  alt="Café Aura artisanal coffee extraction and premium roasted beans"
                  fill
                  sizes="(max-width: 768px) 100vw, 580px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120B06] via-transparent to-transparent opacity-50"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Full-Width Coffee Varieties Marquee / Bar */}
      <div className="mt-8 sm:mt-12 w-full border-t border-[#23150C] bg-[#0A0502]/95 backdrop-blur-md py-4 sm:py-5 overflow-hidden">
        <Container>
          {/* Desktop Static Bar / Centered Display */}
          <div className="hidden md:flex items-center justify-around gap-6 text-sm font-medium tracking-wide text-white">
            {coffeeVarieties.map((variety, index) => (
              <React.Fragment key={variety}>
                <Link
                  href="#coffee"
                  className="hover:text-[#DE9E57] transition-colors select-none"
                >
                  {variety}
                </Link>
                {index < coffeeVarieties.length - 1 && (
                  <CoffeeBeanIcon className="w-4 h-4 text-[#A86F3E] shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile / Tablet Continuous Responsive Marquee */}
          <div className="flex md:hidden items-center justify-center gap-4 text-xs font-medium tracking-wide text-white overflow-x-auto no-scrollbar py-1">
            {coffeeVarieties.map((variety, index) => (
              <React.Fragment key={variety}>
                <Link
                  href="#coffee"
                  className="hover:text-[#DE9E57] transition-colors whitespace-nowrap shrink-0"
                >
                  {variety}
                </Link>
                {index < coffeeVarieties.length - 1 && (
                  <CoffeeBeanIcon className="w-3.5 h-3.5 text-[#A86F3E] shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
};

export default OurStory;

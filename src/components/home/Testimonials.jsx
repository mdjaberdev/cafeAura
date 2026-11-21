"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/animations";
import { motion, AnimatePresence } from "framer-motion";

/*
  Palette (shared with the rest of the page)
  roast #1A0F0A  mocha #2A1A11  crema #EAD7B9  foam #F6EEE2  copper #D08A4A  sage #8E9A74
*/

const display = Fraunces({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const unsplash = (id, w = 200, h = 200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

const testimonials = [
  {
    id: 1,
    name: "Jonh De",
    role: "Teacher",
    image: unsplash("photo-1534528741775-53994a69daeb", 160, 160),
    rating: 5,
    quote:
      "I love spending my downtime in a cozy coffee shop, surrounded by the sweet aroma of freshly brewed drinks and pastries.",
  },
  {
    id: 2,
    name: "Kamal Hassan",
    role: "Professor",
    image: unsplash("photo-1507003211169-0a1dd7228f2d", 160, 160),
    rating: 5,
    quote:
      "The Brazilian Cerrado has completely elevated my morning routine. Unrivaled consistency and nuanced dark cocoa notes.",
  },
  {
    id: 3,
    name: "Rakib Khan",
    role: "Designer",
    image: unsplash("photo-1500648767791-00dcc994a43e", 160, 160),
    rating: 5,
    quote:
      "As a designer, I appreciate thoughtful craft. Café Aura nails both the exquisite crema and the soulful atmosphere.",
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Architect",
    image: unsplash("photo-1494790108377-be9c29b29330", 160, 160),
    rating: 5,
    quote:
      "Their single-origin Ethiopian roast has a sublime citrus bouquet. Hands down the finest specialty coffee in the city.",
  },
  {
    id: 5,
    name: "Marcus Vance",
    role: "Sommelier",
    image: unsplash("photo-1517841905240-472988babdf9", 160, 160),
    rating: 5,
    quote:
      "From bean density to roast curve, the balance of velvety body and lingering hazelnut finish is sheer artisan mastery.",
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D08A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A0F0A]";

export const Testimonials = () => {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef([]);
  const count = testimonials.length;
  const current = testimonials[active];

  const go = (index, focus = false) => {
    const next = (index + count) % count;
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onTabKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1, true);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      go(count - 1, true);
    }
  };

  const arrowBtn = `flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#EAD7B9]/25 text-[#EAD7B9] transition-colors hover:border-[#D08A4A] hover:text-[#D08A4A] ${focusRing}`;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className={`${body.className} relative overflow-hidden bg-[#1A0F0A] py-16 text-[#EAD7B9] sm:py-20 lg:py-28`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(208,138,74,0.12),transparent)]"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Heading + controls */}
          <div className="lg:col-span-5">
            <RevealOnScroll direction="up" duration={0.6}>
              <h2
                id="reviews-heading"
                className={`${display.className} text-balance text-4xl font-medium leading-tight tracking-tight text-[#F6EEE2] sm:text-5xl`}
              >
                Our regulars say it better than we can.
              </h2>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-[#C9B697]">
                Over 1,000 people stop by for their daily cup. Here are a few of
                them.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => go(active - 1)}
                  aria-label="Previous review"
                  className={arrowBtn}
                >
                  <ChevronLeft aria-hidden className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(active + 1)}
                  aria-label="Next review"
                  className={arrowBtn}
                >
                  <ChevronRight aria-hidden className="h-5 w-5" />
                </button>
                <p
                  className="ml-2 text-sm tabular-nums text-[#B9A58B]"
                  aria-live="polite"
                >
                  {active + 1} of {count}
                </p>
              </div>
            </RevealOnScroll>
          </div>

          {/* Quote */}
          <div className="lg:col-span-7">
            <RevealOnScroll direction="up" delay={0.15} duration={0.65}>
              <div
                id={`${baseId}-panel`}
                role="tabpanel"
                aria-labelledby={`${baseId}-tab-${active}`}
                className="rounded-3xl border border-[#EAD7B9]/15 bg-[#2A1A11]/70 p-7 sm:p-10 shadow-2xl backdrop-blur-sm"
              >
                <div
                  className="flex items-center gap-1"
                  role="img"
                  aria-label={`Rated ${current.rating} out of 5`}
                >
                  {Array.from({ length: current.rating }, (_, i) => (
                    <Star
                      key={i}
                      aria-hidden
                      className="h-4 w-4 fill-[#D08A4A] stroke-none"
                    />
                  ))}
                </div>

                <blockquote
                  className={`${display.className} mt-5 max-w-2xl text-2xl leading-snug text-[#F6EEE2] sm:text-3xl transition-opacity duration-300`}
                >
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className="mt-8 flex items-center gap-4 border-t border-dotted border-[#EAD7B9]/25 pt-6">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-[#EAD7B9]/25">
                    <Image
                      src={current.image}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-[#F6EEE2]">{current.name}</p>
                    <p className="text-sm text-[#B9A58B]">{current.role}</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Regulars: pick a person to read their review */}
            <div
              role="tablist"
              aria-label="Choose a review"
              className="mt-6 flex flex-wrap gap-3"
            >
              {testimonials.map((t, i) => {
                const selected = i === active;
                return (
                  <button
                    key={t.id}
                    ref={(el) => (tabRefs.current[i] = el)}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${i}`}
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel`}
                    aria-label={`${t.name}, ${t.role}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => go(i)}
                    onKeyDown={onTabKeyDown}
                    className={`relative h-12 w-12 cursor-pointer overflow-hidden rounded-full transition-opacity ${
                      selected
                        ? "opacity-100 ring-2 ring-[#D08A4A] ring-offset-2 ring-offset-[#1A0F0A]"
                        : "opacity-50 hover:opacity-100"
                    } ${focusRing}`}
                  >
                    <Image
                      src={t.image}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;

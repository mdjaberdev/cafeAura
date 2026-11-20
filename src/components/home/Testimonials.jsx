"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";

/* -------------------------------------------------------------------------- */
/*  High-Quality Unsplash Image Builder                                       */
/* -------------------------------------------------------------------------- */

const unsplash = (id, w = 200, h = 200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

const testimonials = [
  {
    id: 1,
    name: "Jonh De",
    role: "Teacher",
    image: unsplash("photo-1534528741775-53994a69daeb", 120, 120),
    rating: 5,
    quote:
      "I love spending my downtime in a cozy coffee shop, surrounded by the sweet aroma of freshly brewed drinks and pastries.",
  },
  {
    id: 2,
    name: "Kamal Hassan",
    role: "Professor",
    image: unsplash("photo-1507003211169-0a1dd7228f2d", 120, 120),
    rating: 5,
    quote:
      "The Brazilian Cerrado Gold has completely elevated my morning routine. Unrivaled consistency and nuanced dark cocoa notes.",
  },
  {
    id: 3,
    name: "Rakib Khan",
    role: "Designer",
    image: unsplash("photo-1500648767791-00dcc994a43e", 120, 120),
    rating: 5,
    quote:
      "As a designer, I appreciate thoughtful craft. Café Aura nails both the exquisite crema and the soulful atmosphere.",
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Architect",
    image: unsplash("photo-1494790108377-be9c29b29330", 120, 120),
    rating: 5,
    quote:
      "Their single-origin Ethiopian roast offers a sublime citrus bouquet. Hands down the finest specialty coffee experience in the city.",
  },
  {
    id: 5,
    name: "Marcus Vance",
    role: "Sommelier",
    image: unsplash("photo-1517841905240-472988babdf9", 120, 120),
    rating: 5,
    quote:
      "From bean density to precise roast curves, the balance of velvety body and lingering hazelnut finish is sheer artisan mastery.",
  },
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevReview = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const getReviewAt = (offset) => {
    const len = testimonials.length;
    return testimonials[(activeIndex + offset + len) % len];
  };

  const prevItem = getReviewAt(-1);
  const currentItem = getReviewAt(0);
  const nextItem = getReviewAt(1);

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-[#120B06] py-16 sm:py-20 lg:py-28"
    >
      {/* Subtle Golden Trajectory Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 -z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 50 150 Q 300 20 600 350 T 1400 300"
          fill="none"
          stroke="#DE9E57"
          strokeWidth="1"
        />
        <path
          d="M 200 600 Q 550 450 900 650 T 1500 500"
          fill="none"
          stroke="#8C572D"
          strokeWidth="1"
        />
      </svg>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-tight">
            Join Thousands of Happy <br />
            Coffee Lovers!
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#C4B5A5] leading-relaxed font-normal">
            Don&apos;t just take our word for it — hear what our customers have
            to say!
          </p>
        </div>

        {/* Cinematic Backdrop Banner + 3D Review Cards Track */}
        <div className="relative mt-12 sm:mt-16 pt-8 pb-4">
          {/* Panoramic Coffee Beans Background Banner with Unsplash Roast Texture */}
          <div className="absolute top-12 left-0 right-0 h-44 sm:h-52 rounded-3xl overflow-hidden -z-0 opacity-40">
            <Image
              src={unsplash("photo-1514432324607-a09d9b4aefdd", 1200, 600)}
              alt="Artisanal roasted coffee beans background"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#120B06] via-transparent to-[#120B06]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120B06] via-transparent to-[#120B06]" />
          </div>

          {/* 3D Carousel Cards Track with Fixed Equal Heights & Widths */}
          <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-6 min-h-[360px]">
            {/* Left Card Preview (Previous) */}
            <div
              onClick={prevReview}
              className="hidden md:flex flex-col items-center justify-between w-72 sm:w-80 h-[320px] p-6 rounded-2xl bg-[#180E07]/85 border border-[#2E1D11] text-center opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer hover:border-[#DE9E57]/30 transform translate-y-4 scale-95 shadow-xl"
            >
              <div>
                <div className="relative mx-auto w-14 h-14 rounded-full overflow-hidden border border-[#3E2718] mb-3 bg-[#120B06]">
                  <Image
                    src={prevItem.image}
                    alt={prevItem.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <h4 className="text-sm font-semibold text-white">
                  {prevItem.name}
                </h4>
                <span className="text-xs text-[#8A7868] mt-0.5 block">
                  {prevItem.role}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1 text-[#DE9E57] my-2">
                {[...Array(prevItem.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-[#DE9E57] stroke-none"
                  />
                ))}
              </div>
              <p className="text-xs text-[#C4B5A5]/80 line-clamp-3 italic">
                &ldquo;{prevItem.quote}&rdquo;
              </p>
            </div>

            {/* Active Center Card (Prominent & Elevated) */}
            <div className="w-full max-w-[320px] sm:max-w-[360px] h-[320px] flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#1C120A] border border-[#3E2718] text-center shadow-2xl shadow-black/80 transition-all duration-500 transform hover:-translate-y-1 z-20">
              <div>
                {/* Avatar with warm circular accent */}
                <div className="relative mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#8C572D] mb-3 shadow-lg bg-[#24150B]">
                  <Image
                    src={currentItem.image}
                    alt={currentItem.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                {/* Name & Role */}
                <h3 className="text-base sm:text-lg font-semibold text-white tracking-wide">
                  {currentItem.name}
                </h3>
                <p className="text-xs text-[#9B8B7D] font-medium mt-0.5">
                  {currentItem.role}
                </p>
              </div>

              {/* 5 Gold Stars */}
              <div className="flex items-center justify-center gap-1 text-[#DE9E57] my-1">
                {[...Array(currentItem.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-[#DE9E57] stroke-none"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-[#C4B5A5] leading-relaxed mx-auto font-normal line-clamp-3">
                &ldquo;{currentItem.quote}&rdquo;
              </p>
            </div>

            {/* Right Card Preview (Next) */}
            <div
              onClick={nextReview}
              className="hidden md:flex flex-col items-center justify-between w-72 sm:w-80 h-[320px] p-6 rounded-2xl bg-[#180E07]/85 border border-[#2E1D11] text-center opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer hover:border-[#DE9E57]/30 transform translate-y-4 scale-95 shadow-xl"
            >
              <div>
                <div className="relative mx-auto w-14 h-14 rounded-full overflow-hidden border border-[#3E2718] mb-3 bg-[#120B06]">
                  <Image
                    src={nextItem.image}
                    alt={nextItem.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <h4 className="text-sm font-semibold text-white">
                  {nextItem.name}
                </h4>
                <span className="text-xs text-[#8A7868] mt-0.5 block">
                  {nextItem.role}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1 text-[#DE9E57] my-2">
                {[...Array(nextItem.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-[#DE9E57] stroke-none"
                  />
                ))}
              </div>
              <p className="text-xs text-[#C4B5A5]/80 line-clamp-3 italic">
                &ldquo;{nextItem.quote}&rdquo;
              </p>
            </div>
          </div>

          {/* Carousel Arrows Controls */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={prevReview}
              aria-label="Previous customer review"
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#22140A] border border-[#3E2718] text-[#C4B5A5] hover:text-[#DE9E57] hover:border-[#DE9E57]/50 transition-all duration-200 active:scale-95 focus:outline-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextReview}
              aria-label="Next customer review"
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#22140A] border border-[#3E2718] text-[#C4B5A5] hover:text-[#DE9E57] hover:border-[#DE9E57]/50 transition-all duration-200 active:scale-95 focus:outline-none cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;

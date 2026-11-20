"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ZoomIn, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";

/* -------------------------------------------------------------------------- */
/*  High-Quality Unsplash Image Builder                                       */
/* -------------------------------------------------------------------------- */

const unsplash = (id, w = 900, h = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

const galleryItems = [
  {
    id: 1,
    title: "Morning Reading Ritual",
    category: "Atmosphere",
    description:
      "Quiet morning reflections accompanied by freshly brewed pour-over.",
    image: unsplash("photo-1511920170033-f8396924c348", 800, 1000),
    aspect: "tall",
  },
  {
    id: 2,
    title: "Craft & Connection",
    category: "Community",
    description:
      "Handcrafted espresso drinks shared between fellow coffee enthusiasts.",
    image: unsplash("photo-1534778101976-62847782c213", 800, 800),
    aspect: "square",
  },
  {
    id: 3,
    title: "Neon Café Nights",
    category: "Our Space",
    description:
      "Warm glow of our artisanal roastery welcoming evening guests.",
    image: unsplash("photo-1554118811-1e0d58224f24", 800, 800),
    aspect: "square",
  },
  {
    id: 4,
    title: "Micro-Lot Roasts",
    category: "Sourcing",
    description:
      "Sun-dried Ethiopian and Colombian beans drum-roasted to peak aroma.",
    image: unsplash("photo-1559056199-641a0ac8b55e", 1000, 600),
    aspect: "wide",
  },
  {
    id: 5,
    title: "Grind & Extraction",
    category: "Brewing",
    description:
      "Precision burr grinding and tasting notes calibration at our cupping table.",
    image: unsplash("photo-1514432324607-a09d9b4aefdd", 800, 1000),
    aspect: "tall-inner",
  },
  {
    id: 6,
    title: "Steaming Perfection",
    category: "The Sip",
    description:
      "Freshly pulled espresso with rich crema and rising fragrant vapor.",
    image: unsplash("photo-1572442388796-11668a67e53d", 800, 1000),
    aspect: "tall",
  },
];

export const CoffeeJourney = () => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const openLightbox = (index) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % galleryItems.length);
    }
  };

  const prevImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + galleryItems.length) % galleryItems.length,
      );
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#120B06] py-16 sm:py-20 lg:py-28">
      {/* Decorative Golden Line Curves */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 -z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 50 200 Q 350 400 650 150 T 1300 350"
          fill="none"
          stroke="#DE9E57"
          strokeWidth="1"
        />
        <path
          d="M 150 700 Q 500 500 900 650 T 1500 450"
          fill="none"
          stroke="#8C572D"
          strokeWidth="1"
        />
      </svg>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-tight">
            Explore the journey of <br />
            coffee, from farm to cup.
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#C4B5A5] leading-relaxed font-normal">
            Explore the process—handpicked beans, expertly roasted, and brewed
            with passion. Witness the craftsmanship that brings our signature
            roasts to life.
          </p>
        </div>

        {/* 4-Column Bento Gallery Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {/* Column 1: Tall Single Image (Photo 1) */}
          <div
            onClick={() => openLightbox(0)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#302014] bg-[#160D07] shadow-xl transition-all duration-300 hover:border-[#DE9E57]/50 hover:shadow-2xl hover:-translate-y-1 h-[280px] sm:h-[360px] md:h-[430px]"
          >
            <Image
              src={galleryItems[0].image}
              alt={galleryItems[0].title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <span className="text-[10px] uppercase font-semibold text-[#DE9E57] tracking-wider">
                {galleryItems[0].category}
              </span>
              <p className="text-xs font-semibold text-white mt-0.5">
                {galleryItems[0].title}
              </p>
            </div>
            <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <ZoomIn className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Column 2: 2 Stacked Images (Photo 2 & Photo 3) */}
          <div className="flex flex-col gap-4 sm:gap-5 h-[280px] sm:h-[360px] md:h-[430px]">
            {/* Top: Photo 2 */}
            <div
              onClick={() => openLightbox(1)}
              className="group relative flex-1 cursor-pointer overflow-hidden rounded-2xl border border-[#302014] bg-[#160D07] shadow-xl transition-all duration-300 hover:border-[#DE9E57]/50 hover:shadow-2xl hover:-translate-y-1"
            >
              <Image
                src={galleryItems[1].image}
                alt={galleryItems[1].title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5">
                <span className="text-[10px] uppercase font-semibold text-[#DE9E57] tracking-wider">
                  {galleryItems[1].category}
                </span>
                <p className="text-xs font-semibold text-white mt-0.5">
                  {galleryItems[1].title}
                </p>
              </div>
            </div>

            {/* Bottom: Photo 3 */}
            <div
              onClick={() => openLightbox(2)}
              className="group relative flex-1 cursor-pointer overflow-hidden rounded-2xl border border-[#302014] bg-[#160D07] shadow-xl transition-all duration-300 hover:border-[#DE9E57]/50 hover:shadow-2xl hover:-translate-y-1"
            >
              <Image
                src={galleryItems[2].image}
                alt={galleryItems[2].title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5">
                <span className="text-[10px] uppercase font-semibold text-[#DE9E57] tracking-wider">
                  {galleryItems[2].category}
                </span>
                <p className="text-xs font-semibold text-white mt-0.5">
                  {galleryItems[2].title}
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: 2 Stacked Images (Photo 4 & Photo 5) */}
          <div className="flex flex-col gap-4 sm:gap-5 h-[280px] sm:h-[360px] md:h-[430px]">
            {/* Top: Photo 4 (Beans texture, shorter) */}
            <div
              onClick={() => openLightbox(3)}
              className="group relative h-[38%] cursor-pointer overflow-hidden rounded-2xl border border-[#302014] bg-[#160D07] shadow-xl transition-all duration-300 hover:border-[#DE9E57]/50 hover:shadow-2xl hover:-translate-y-1"
            >
              <Image
                src={galleryItems[3].image}
                alt={galleryItems[3].title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <span className="text-[10px] uppercase font-semibold text-[#DE9E57] tracking-wider">
                  {galleryItems[3].category}
                </span>
                <p className="text-xs font-semibold text-white mt-0.5">
                  {galleryItems[3].title}
                </p>
              </div>
            </div>

            {/* Bottom: Photo 5 (Flat-lay coffee grounds & cup, taller) */}
            <div
              onClick={() => openLightbox(4)}
              className="group relative flex-1 cursor-pointer overflow-hidden rounded-2xl border border-[#302014] bg-[#160D07] shadow-xl transition-all duration-300 hover:border-[#DE9E57]/50 hover:shadow-2xl hover:-translate-y-1"
            >
              <Image
                src={galleryItems[4].image}
                alt={galleryItems[4].title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5">
                <span className="text-[10px] uppercase font-semibold text-[#DE9E57] tracking-wider">
                  {galleryItems[4].category}
                </span>
                <p className="text-xs font-semibold text-white mt-0.5">
                  {galleryItems[4].title}
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Tall Single Image (Photo 6) */}
          <div
            onClick={() => openLightbox(5)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#302014] bg-[#160D07] shadow-xl transition-all duration-300 hover:border-[#DE9E57]/50 hover:shadow-2xl hover:-translate-y-1 h-[280px] sm:h-[360px] md:h-[430px]"
          >
            <Image
              src={galleryItems[5].image}
              alt={galleryItems[5].title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <span className="text-[10px] uppercase font-semibold text-[#DE9E57] tracking-wider">
                {galleryItems[5].category}
              </span>
              <p className="text-xs font-semibold text-white mt-0.5">
                {galleryItems[5].title}
              </p>
            </div>
            <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <ZoomIn className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* View All CTA */}
        <div className="mt-12 sm:mt-14 text-center">
          <button
            type="button"
            onClick={() => {
              setToastMessage("All craftsmanship gallery images loaded.");
              setTimeout(() => setToastMessage(""), 2200);
            }}
            className="text-xs sm:text-sm font-medium text-[#F5EBE1] hover:text-[#DE9E57] transition-colors inline-block relative pb-0.5 border-b border-[#DE9E57] focus:outline-none cursor-pointer"
          >
            View all
          </button>
        </div>
      </Container>

      {/* Interactive Lightbox Viewer */}
      {activeLightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-3xl w-full bg-[#180E07] border border-[#3E2718] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white/80 hover:text-[#DE9E57] transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/60 text-white/80 hover:text-[#DE9E57] transition-colors focus:outline-none"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/60 text-white/80 hover:text-[#DE9E57] transition-colors focus:outline-none"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Modal Image Area */}
            <div className="relative w-full h-[340px] sm:h-[460px] bg-[#100905]">
              <Image
                src={galleryItems[activeLightboxIndex].image}
                alt={galleryItems[activeLightboxIndex].title}
                fill
                className="object-contain"
              />
            </div>

            {/* Caption & Metadata */}
            <div className="p-5 border-t border-[#2C190D] bg-[#160D07] flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-semibold text-[#DE9E57] tracking-wider">
                  {galleryItems[activeLightboxIndex].category}
                </span>
                <h4 className="text-base font-serif font-semibold text-white mt-0.5">
                  {galleryItems[activeLightboxIndex].title}
                </h4>
                <p className="text-xs text-[#C4B5A5] mt-1 max-w-md">
                  {galleryItems[activeLightboxIndex].description}
                </p>
              </div>
              <span className="text-xs text-[#8A7868] font-mono shrink-0">
                {activeLightboxIndex + 1} / {galleryItems.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Feedback Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#1C120B] border border-[#DE9E57]/40 text-[#F5EBE1] text-xs font-medium rounded-xl shadow-2xl animate-in slide-in-from-bottom-3 duration-300">
          <div className="w-5 h-5 rounded-full bg-[#DE9E57]/20 flex items-center justify-center text-[#DE9E57]">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
};

export default CoffeeJourney;

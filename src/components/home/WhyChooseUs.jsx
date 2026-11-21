"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { Fraunces, Instrument_Sans } from "next/font/google";
import {
  ArrowUpRight,
  X,
  Sparkles,
  ShieldCheck,
  Leaf,
  Flame,
  Coffee,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  RevealOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations";

/*
  Cafe Aura Palette (shared across sections)
  roast  #1A0F0A
  mocha  #2A1A11
  crema  #EAD7B9
  foam   #F6EEE2
  copper #D08A4A
  sage   #8E9A74
*/

const display = Fraunces({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const unsplash = (id, w = 800, h = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

const features = [
  {
    id: "premium-beans",
    index: "01",
    title: "Premium Quality Beans",
    subtitle: "Single-Origin & Direct Trade",
    description:
      "We source only the finest coffee beans from sustainable farms around the world—flavorful, dense, and ethically produced.",
    image: unsplash("photo-1559056199-641a0ac8b55e", 800, 600),
    icon: Coffee,
    badge: "100% Specialty Grade (85+ Score)",
    details:
      "Every single batch is sourced directly from ethical, high-altitude micro-lots in Colombia, Ethiopia, and Brazil. We guarantee fair trade pricing for farming families and uncompromised bean density.",
    highlights: [
      "85+ SCA Cupping Score",
      "Direct-trade micro-lot partnerships",
      "100% Shade-grown Arabica",
    ],
  },
  {
    id: "freshness-guaranteed",
    index: "02",
    title: "Freshness Guaranteed",
    subtitle: "Small-Batch Drum Roasted",
    description:
      "Our beans are roasted to perfection and shipped directly to your door, ensuring the freshest possible coffee every time.",
    image: unsplash("photo-1514432324607-a09d9b4aefdd", 800, 600),
    icon: Flame,
    badge: "Micro-Batch Drum Roasted Daily",
    details:
      "We roast in small artisan drum batches. Every bag is hand-stamped with its exact roast date and fitted with a one-way degassing valve to lock in fragile aromatics and peak crema potential.",
    highlights: [
      "Shipped within 24 hours of roasting",
      "Hand-stamped roast date on every bag",
      "One-way aroma-lock degassing valve",
    ],
  },
  {
    id: "variety-options",
    index: "03",
    title: "Variety of Options",
    subtitle: "Tailored for Every Brew",
    description:
      "Whether you're a fan of bold espressos, smooth lattes, or refreshing cold brews, we have a coffee to suit every taste.",
    image: unsplash("photo-1570968915860-54d5c301fa9f", 800, 600),
    icon: Sparkles,
    badge: "Curated Profiles & Roasts",
    details:
      "From delicate floral blonde roasts to rich dark French roasts, our master roasters have dialed in single-origin beans and signature blends tailored for pour-over, espresso, cold brew, and Aeropress.",
    highlights: [
      "Light, Medium & Dark roast spectrum",
      "Whole bean or precision-ground to order",
      "Seasonal limited-edition micro-lots",
    ],
  },
  {
    id: "eco-packaging",
    index: "04",
    title: "Eco-Friendly Packaging",
    subtitle: "Zero-Waste Commitment",
    description:
      "Our packaging is 100% recyclable, and we're working hard to reduce our carbon footprint every step of the way.",
    image: unsplash("photo-1511920170033-f8396924c348", 800, 600),
    icon: Leaf,
    badge: "Plant-Based & 100% Recyclable",
    details:
      "We believe exceptional coffee shouldn't cost the earth. Our pouches are made from biodegradable plant cellulose, printed with water-based soy inks, and feature fully compostable degassing valves.",
    highlights: [
      "Biodegradable plant-cellulose lining",
      "Non-toxic water-based soy inks",
      "Carbon-neutral doorstep delivery",
    ],
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D08A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A0F0A]";

export const WhyChooseUs = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const modalTitleId = useId();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedFeature(null);
    };

    if (selectedFeature) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedFeature]);

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className={`${body.className} relative overflow-hidden bg-[#1A0F0A] py-20 text-[#EAD7B9] sm:py-24 lg:py-32`}
    >
      {/* Ambient Copper & Sage Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-[460px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(208,138,74,0.12),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-12 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(142,154,116,0.08),transparent)]"
      />

      {/* Decorative Copper Trajectory Curves */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="auraCurve" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D08A4A" stopOpacity="0" />
            <stop offset="50%" stopColor="#D08A4A" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#D08A4A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M -40 340 Q 340 160 720 430 T 1560 220"
          fill="none"
          stroke="url(#auraCurve)"
          strokeWidth="1.2"
        />
        <path
          d="M 60 800 Q 480 620 900 740 T 1600 520"
          fill="none"
          stroke="url(#auraCurve)"
          strokeWidth="1"
        />
      </svg>

      <Container className="relative z-10">
        {/* Section Header */}
        <RevealOnScroll direction="up" duration={0.65}>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EAD7B9]/15 bg-[#2A1A11]/80 px-3.5 py-1.5 text-xs font-medium tracking-wide text-[#D08A4A]">
              <Sparkles aria-hidden className="h-3.5 w-3.5" />
              <span>The Café Aura Standard</span>
            </div>

            <h2
              id="why-us-heading"
              className={`${display.className} mt-5 text-balance text-4xl font-medium leading-[1.12] tracking-tight text-[#F6EEE2] sm:text-5xl`}
            >
              Why{" "}
              <span className="italic font-normal text-[#D08A4A]">choose us</span>{" "}
              for your daily cup?
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#C9B697]">
              From bean to cup, we ensure every sip is a premium, unhurried
              experience.
            </p>
          </div>
        </RevealOnScroll>

        {/* 4 Feature Cards Grid */}
        <StaggerContainer
          staggerDelay={0.08}
          className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.id}>
                <article
                  className="group relative flex flex-col justify-between rounded-3xl border border-[#EAD7B9]/15 bg-gradient-to-b from-[#2A1A11]/90 to-[#22140D]/95 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.75)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D08A4A]/45 sm:p-5 h-full"
                >
                  {/* Top Copper Accent Hairline */}
                  <div
                    aria-hidden
                    className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-[#D08A4A]/55 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div>
                    {/* Photo Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#EAD7B9]/15 bg-[#1A0F0A]">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/85 via-[#1A0F0A]/20 to-transparent" />

                      {/* Top Index + Icon Pill */}
                      <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                        <span className="rounded-full border border-[#EAD7B9]/20 bg-[#1A0F0A]/80 px-2.5 py-0.5 text-[11px] font-medium tabular-nums tracking-wider text-[#D08A4A] backdrop-blur-md">
                          {feature.index}
                        </span>

                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EAD7B9]/15 bg-[#1A0F0A]/80 text-[#D08A4A] backdrop-blur-md transition-colors duration-300 group-hover:border-[#D08A4A] group-hover:bg-[#D08A4A] group-hover:text-[#1A0F0A]">
                          <Icon aria-hidden className="h-4 w-4" />
                        </span>
                      </div>

                      {/* Subtitle Tag inside Image */}
                      <p className="absolute bottom-2.5 left-3 right-3 text-[11px] font-medium uppercase tracking-wider text-[#EAD7B9]/90">
                        {feature.subtitle}
                      </p>
                    </div>

                    {/* Title & Description */}
                    <div className="mt-5 px-1">
                      <h3
                        className={`${display.className} text-xl font-medium leading-snug text-[#F6EEE2] transition-colors group-hover:text-[#D08A4A]`}
                      >
                        {feature.title}
                      </h3>

                      <p className="mt-2.5 text-sm leading-relaxed text-[#C9B697]">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Dotted Divider & CTA Button */}
                  <div className="mt-6 flex items-center justify-between border-t border-dotted border-[#EAD7B9]/20 px-1 pt-4">
                    <span className="text-xs font-medium text-[#B9A58B] transition-colors group-hover:text-[#F6EEE2]">
                      Read roastery notes
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedFeature(feature)}
                      aria-label={`Learn more about ${feature.title}`}
                      className={`inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#EAD7B9]/20 bg-[#1A0F0A]/70 text-[#EAD7B9] transition-all duration-200 hover:border-[#D08A4A] hover:bg-[#D08A4A] hover:text-[#1A0F0A] active:scale-95 ${focusRing}`}
                    >
                      <ArrowUpRight aria-hidden className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>

      {/* Interactive Feature Details Modal */}
      {selectedFeature && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A0F0A]/85 p-4 backdrop-blur-md sm:p-6"
          onClick={() => setSelectedFeature(null)}
        >
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#EAD7B9]/20 bg-gradient-to-b from-[#2A1A11] to-[#1F120C] shadow-[0_28px_70px_-15px_rgba(0,0,0,0.85)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-52 w-full overflow-hidden sm:h-60">
              <Image
                src={selectedFeature.image}
                alt={selectedFeature.title}
                fill
                sizes="600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A11] via-[#2A1A11]/30 to-black/25" />

              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                aria-label="Close modal"
                className={`absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#EAD7B9]/20 bg-[#1A0F0A]/80 text-[#EAD7B9] backdrop-blur-md transition-colors hover:border-[#D08A4A] hover:bg-[#D08A4A] hover:text-[#1A0F0A] ${focusRing}`}
              >
                <X aria-hidden className="h-4 w-4" />
              </button>

              <div className="absolute bottom-4 left-6 inline-flex items-center gap-2 rounded-full border border-[#D08A4A]/35 bg-[#1A0F0A]/85 px-3.5 py-1.5 text-xs font-medium text-[#D08A4A] backdrop-blur-md">
                <ShieldCheck aria-hidden className="h-4 w-4 shrink-0" />
                <span>{selectedFeature.badge}</span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 pt-3 sm:p-8 sm:pt-4">
              <p className="text-xs font-medium uppercase tracking-wider text-[#B9A58B]">
                Pillar {selectedFeature.index} ·{" "}
                <span className="text-[#D08A4A]">
                  {selectedFeature.subtitle}
                </span>
              </p>

              <h3
                id={modalTitleId}
                className={`${display.className} mt-1.5 text-2xl font-medium text-[#F6EEE2] sm:text-3xl`}
              >
                {selectedFeature.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#C9B697]">
                {selectedFeature.details}
              </p>

              {/* Sage Quality Guarantees */}
              <div className="mt-6 border-t border-dotted border-[#EAD7B9]/20 pt-5">
                <p className="text-xs font-medium uppercase tracking-wider text-[#B9A58B]">
                  Quality Guarantees
                </p>
                <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {selectedFeature.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs text-[#EAD7B9]"
                    >
                      <CheckCircle2
                        aria-hidden
                        className="h-4 w-4 shrink-0 text-[#8E9A74]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 flex items-center justify-between border-t border-dotted border-[#EAD7B9]/20 pt-4">
                <span className="hidden text-xs text-[#9E8B76] sm:inline">
                  Café Aura Roastery Promise
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedFeature(null)}
                  className={`w-full cursor-pointer rounded-full bg-[#D08A4A] px-6 py-2.5 text-sm font-semibold text-[#1A0F0A] transition-all duration-200 hover:bg-[#DC995B] active:scale-95 sm:w-auto ${focusRing}`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyChooseUs;

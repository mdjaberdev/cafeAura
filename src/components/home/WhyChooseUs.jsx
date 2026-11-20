"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  X,
  Sparkles,
  ShieldCheck,
  Leaf,
  Flame,
  Coffee,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

/* -------------------------------------------------------------------------- */
/*  High-Quality Unsplash Image Builder                                       */
/* -------------------------------------------------------------------------- */

const unsplash = (id, w = 600, h = 450) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

const features = [
  {
    id: "premium-beans",
    title: "Premium Quality Beans",
    description:
      "We source only the finest coffee beans from sustainable farms around the world, flavorful, and ethically produced.",
    image: unsplash("photo-1559056199-641a0ac8b55e", 600, 450), // Premium roasted beans macro
    icon: Coffee,
    badge: "100% Specialty Grade (85+ Score)",
    details:
      "Every single batch is sourced directly from ethical, high-altitude micro-lots in Colombia, Ethiopia, and Brazil. We guarantee fair trade pricing for farming families and uncompromised bean density.",
  },
  {
    id: "freshness-guaranteed",
    title: "Freshness Guaranteed",
    description:
      "Our beans are roasted to perfection and shipped directly to your door, ensuring the freshest possible coffee every time.",
    image: unsplash("photo-1514432324607-a09d9b4aefdd", 600, 450), // Espresso extraction / roasting vibe
    icon: Flame,
    badge: "Micro-Batch Drum Roasted Daily",
    details:
      "We roast in small artisan drum batches. Every bag is hand-stamped with its exact roast date and fitted with a one-way degassing valve to lock in fragile aromatics and peak crema potential.",
  },
  {
    id: "variety-options",
    title: "Variety of Options",
    description:
      "Whether you're a fan of bold espressos, smooth lattes, or refreshing cold brews, we have a coffee to suit every taste.",
    image: unsplash("photo-1570968915860-54d5c301fa9f", 600, 450), // Latte art & cups
    icon: Sparkles,
    badge: "Curated Profiles & Roasts",
    details:
      "From delicate floral blonde roasts to rich dark French roasts, our master roasters have dialed in single-origin beans and signature blends tailored for pour-over, espresso, cold brew, and Aeropress.",
  },
  {
    id: "eco-packaging",
    title: "Eco-Friendly Packaging",
    description:
      "Our packaging is 100% recyclable, and we're working hard to reduce our carbon footprint every step of the way.",
    image: unsplash("photo-1511920170033-f8396924c348", 600, 450), // Sustainable cozy café atmosphere
    icon: Leaf,
    badge: "Plant-Based & 100% Recyclable",
    details:
      "We believe exceptional coffee shouldn't cost the earth. Our pouches are made from biodegradable plant cellulose, printed with water-based soy inks, and feature fully compostable degassing valves.",
  },
];

export const WhyChooseUs = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-[#120B06] py-16 sm:py-20 lg:py-28"
    >
      {/* Decorative Golden Trajectory Curves */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 -z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 50 350 Q 300 200 650 450 T 1350 250"
          fill="none"
          stroke="#DE9E57"
          strokeWidth="1"
        />
        <path
          d="M 100 800 Q 450 650 850 750 T 1500 550"
          fill="none"
          stroke="#8C572D"
          strokeWidth="1"
        />
      </svg>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-tight">
            Why Choose Us?
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#C4B5A5] leading-relaxed font-normal">
            From bean to cup, we ensure every sip is a premium experience.
          </p>
        </div>

        {/* 4 Feature Columns Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative flex flex-col justify-between pl-0 lg:pl-5 border-l-0 lg:border-l border-[#2B1B10] hover:border-[#DE9E57]/40 transition-colors duration-300"
            >
              {/* Feature Top: Image & Text */}
              <div>
                {/* Photo Container */}
                <div className="relative aspect-[1.4/1] w-full overflow-hidden rounded-2xl bg-[#180E07] border border-[#2E1D11] shadow-lg group-hover:border-[#DE9E57]/40 transition-all duration-300">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle inner gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-sm sm:text-base font-semibold text-white tracking-wide group-hover:text-[#DE9E57] transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-xs text-[#C4B5A5] leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Outlined Arrow Button */}
              <div className="mt-5 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedFeature(feature)}
                  aria-label={`Learn more about ${feature.title}`}
                  className="inline-flex items-center justify-center w-10 h-7 rounded-lg border border-[#443022] bg-[#160D07]/80 text-[#C4B5A5] hover:border-[#DE9E57] hover:text-[#DE9E57] hover:bg-[#DE9E57]/10 transition-all duration-200 active:scale-95 focus:outline-none cursor-pointer group/btn"
                >
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Interactive Feature Details Modal */}
      {selectedFeature && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedFeature(null)}
        >
          <div
            className="w-full max-w-lg bg-[#191009] border border-[#3D2919] rounded-2xl p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedFeature(null)}
              className="absolute top-5 right-5 text-[#8A7868] hover:text-[#DE9E57] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full h-44 rounded-xl overflow-hidden border border-[#3E2718] mb-5">
              <Image
                src={selectedFeature.image}
                alt={selectedFeature.title}
                fill
                sizes="500px"
                className="object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-[11px] font-semibold text-[#DE9E57] flex items-center gap-1.5 border border-[#DE9E57]/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{selectedFeature.badge}</span>
              </div>
            </div>

            <h4 className="font-serif text-xl font-semibold text-white">
              {selectedFeature.title}
            </h4>

            <p className="mt-2 text-xs sm:text-sm text-[#C4B5A5] leading-relaxed">
              {selectedFeature.details}
            </p>

            <div className="mt-6 pt-4 border-t border-[#2A1B11] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                className="px-5 py-2 rounded-xl bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] font-semibold text-xs sm:text-sm transition-all duration-200 active:scale-95 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyChooseUs;

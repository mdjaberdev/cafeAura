"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";

/* -------------------------------------------------------------------------- */
/*  High-Quality Unsplash Image Builder                                       */
/* -------------------------------------------------------------------------- */

const unsplash = (id, w = 500, h = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

export const CallToAction = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#120B06] via-[#2A180D] to-[#120B06] py-14 sm:py-18 lg:py-24 border-y border-[#3E2718]/40">
      {/* Ambient Radial Illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-72 w-full max-w-4xl rounded-full bg-[#DE9E57]/10 blur-[130px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6">
          {/* Left: Professional Coffee Beans / Grinder Vibe */}
          <div className="hidden sm:flex lg:col-span-3 items-center justify-center lg:justify-start">
            <div className="relative w-44 sm:w-52 lg:w-56 aspect-[3/4] rounded-2xl overflow-hidden border border-[#3E2718]/50 bg-[#160D07] filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]">
              <Image
                src={unsplash("photo-1559056199-641a0ac8b55e", 500, 667)}
                alt="Artisanal coffee beans and roasting equipment"
                fill
                sizes="(max-width: 1024px) 200px, 240px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>
          </div>

          {/* Center: Headline, Subtitle & CTA Button */}
          <div className="lg:col-span-6 text-center px-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-tight">
              Ready to Experience the <br />
              Best Coffee?
            </h2>

            <p className="mt-3.5 text-xs sm:text-sm text-[#C4B5A5] leading-relaxed max-w-md mx-auto font-normal">
              Take the first step towards discovering your new favorite brew.
            </p>

            {/* Shop Now Button */}
            <div className="mt-7 sm:mt-8 flex justify-center">
              <Link
                href="/coffee"
                className="group relative inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-[#7B4C26] via-[#8C572D] to-[#7B4C26] text-[#FDFBF7] text-xs sm:text-sm font-semibold tracking-wide shadow-xl shadow-[#7B4C26]/30 hover:shadow-[#DE9E57]/20 hover:scale-[1.03] active:scale-95 transition-all duration-200 border border-[#A66F3E]/40"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right: Decadent Dessert Coffee / Cup Vibe */}
          <div className="hidden sm:flex lg:col-span-3 items-center justify-center lg:justify-end">
            <div className="relative w-44 sm:w-52 lg:w-56 aspect-[3/4] rounded-2xl overflow-hidden border border-[#3E2718]/50 bg-[#160D07] filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]">
              <Image
                src={unsplash("photo-1572442388796-11668a67e53d", 500, 667)}
                alt="Decadent specialty coffee with rich velvety foam"
                fill
                sizes="(max-width: 1024px) 200px, 240px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CallToAction;

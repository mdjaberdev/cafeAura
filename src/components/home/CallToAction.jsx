"use client";

import Image from "next/image";
import Link from "next/link";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";

/*
  Café Aura Palette (shared across sections)
  roast  #1A0F0A
  mocha  #2A1A11
  crema  #EAD7B9
  foam   #F6EEE2
  copper #D08A4A
  sage   #8E9A74
*/

const display = Fraunces({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const unsplash = (id, w = 500, h = 667) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D08A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A0F0A]";

export const CallToAction = () => {
  return (
    <section
      aria-labelledby="cta-heading"
      className={`${body.className} relative overflow-hidden border-y border-[#EAD7B9]/15 bg-gradient-to-b from-[#1A0F0A] via-[#26160E] to-[#1A0F0A] py-20 text-[#EAD7B9] sm:py-24 lg:py-28`}
    >
      {/* Top & Bottom Copper Hairline Accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#D08A4A]/45 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D08A4A]/45 to-transparent"
      />

      {/* Ambient Copper & Sage Illumination */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(208,138,74,0.14),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-12 top-10 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(142,154,116,0.08),transparent)]"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left: Artisanal Roasted Beans */}
          <div className="hidden sm:flex lg:col-span-3 items-center justify-center lg:justify-start">
            <div className="group relative aspect-[3/4] w-44 -rotate-2 overflow-hidden rounded-3xl border border-[#EAD7B9]/20 bg-[#2A1A11] shadow-[0_24px_50px_-15px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:rotate-0 sm:w-52 lg:w-56">
              <Image
                src={unsplash("photo-1559056199-641a0ac8b55e", 500, 667)}
                alt="Artisanal small-batch roasted coffee beans"
                fill
                sizes="(max-width: 1024px) 208px, 224px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/80 via-[#1A0F0A]/15 to-transparent" />
              <span className="absolute bottom-3 left-3.5 text-[11px] font-medium uppercase tracking-wider text-[#EAD7B9]/90">
                Single-Origin Lots
              </span>
            </div>
          </div>

          {/* Center: Headline, Subtitle & CTA Buttons */}
          <div className="px-2 text-center lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EAD7B9]/15 bg-[#2A1A11]/85 px-3.5 py-1.5 text-xs font-medium tracking-wide text-[#D08A4A]">
              <Sparkles aria-hidden className="h-3.5 w-3.5" />
              <span>Freshly Roasted Daily</span>
            </div>

            <h2
              id="cta-heading"
              className={`${display.className} mt-5 text-balance text-4xl font-medium leading-[1.12] tracking-tight text-[#F6EEE2] sm:text-5xl`}
            >
              Ready to experience the{" "}
              <span className="italic font-normal text-[#D08A4A]">finest</span>{" "}
              coffee?
            </h2>

            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#C9B697]">
              Take the first step toward discovering your new favorite
              brew—roasted in small batches and delivered at peak aroma.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Link
                href="/coffee"
                className={`group inline-flex w-full items-center justify-center rounded-full bg-[#D08A4A] px-8 py-3.5 text-sm font-semibold tracking-wide text-[#1A0F0A] shadow-[0_14px_30px_-10px_rgba(208,138,74,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#DC995B] active:scale-95 sm:w-auto ${focusRing}`}
              >
                <span>Shop Now</span>
                <ArrowRight
                  aria-hidden
                  className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/menu"
                className={`inline-flex w-full items-center justify-center rounded-full border border-[#EAD7B9]/25 bg-[#2A1A11]/70 px-7 py-3.5 text-sm font-medium text-[#EAD7B9] transition-all duration-200 hover:border-[#D08A4A] hover:text-[#F6EEE2] active:scale-95 sm:w-auto ${focusRing}`}
              >
                Explore Café Menu
              </Link>
            </div>

            {/* Subtle Sage Roastery Note */}
            <p className="mt-6 inline-flex items-center gap-2 text-xs text-[#B9A58B]">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[#8E9A74]"
              />
              <span>Complimentary shipping on whole-bean orders over $35</span>
            </p>
          </div>

          {/* Right: Velvety Specialty Pour */}
          <div className="hidden sm:flex lg:col-span-3 items-center justify-center lg:justify-end">
            <div className="group relative aspect-[3/4] w-44 rotate-2 overflow-hidden rounded-3xl border border-[#EAD7B9]/20 bg-[#2A1A11] shadow-[0_24px_50px_-15px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:rotate-0 sm:w-52 lg:w-56">
              <Image
                src={unsplash("photo-1572442388796-11668a67e53d", 500, 667)}
                alt="Specialty espresso drink topped with velvety microfoam"
                fill
                sizes="(max-width: 1024px) 208px, 224px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/80 via-[#1A0F0A]/15 to-transparent" />
              <span className="absolute bottom-3 left-3.5 text-[11px] font-medium uppercase tracking-wider text-[#EAD7B9]/90">
                Velvet Crema
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CallToAction;

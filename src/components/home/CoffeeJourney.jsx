"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/animations";

/*
  Palette (shared with the rest of the page)
  roast #1A0F0A  mocha #2A1A11  crema #EAD7B9  foam #F6EEE2  copper #D08A4A  sage #8E9A74
*/

const display = Fraunces({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const unsplash = (id, w = 900, h = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;

const galleryItems = [
  {
    id: 1,
    title: "Morning reading ritual",
    category: "Atmosphere",
    description:
      "Quiet morning reflections accompanied by a freshly brewed pour-over.",
    image: unsplash("photo-1511920170033-f8396924c348", 800, 1000),
  },
  {
    id: 2,
    title: "Craft and connection",
    category: "Community",
    description:
      "Handcrafted espresso drinks shared between fellow coffee lovers.",
    image: unsplash("photo-1534778101976-62847782c213", 800, 800),
  },
  {
    id: 3,
    title: "Café nights",
    category: "Our space",
    description: "The warm glow of our roastery welcoming evening guests.",
    image: unsplash("photo-1554118811-1e0d58224f24", 800, 800),
  },
  {
    id: 4,
    title: "Micro-lot roasts",
    category: "Sourcing",
    description:
      "Sun-dried Ethiopian and Colombian beans drum-roasted to peak aroma.",
    image: unsplash("photo-1559056199-641a0ac8b55e", 1000, 600),
  },
  {
    id: 5,
    title: "Grind and extraction",
    category: "Brewing",
    description:
      "Precision burr grinding and tasting-note calibration at our cupping table.",
    image: unsplash("photo-1514432324607-a09d9b4aefdd", 800, 1000),
  },
  {
    id: 6,
    title: "Steaming perfection",
    category: "The sip",
    description:
      "Freshly pulled espresso with rich crema and rising, fragrant vapor.",
    image: unsplash("photo-1572442388796-11668a67e53d", 800, 1000),
  },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D08A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A0F0A]";
const focusRingDialog =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D08A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A1A11]";

/* One tile = one real button, so keyboard and screen-reader users can open it */
const Tile = ({ item, index, onOpen, className = "", arch = false }) => (
  <button
    type="button"
    onClick={(e) => onOpen(index, e.currentTarget)}
    aria-haspopup="dialog"
    aria-label={`Open photo: ${item.title}`}
    className={`group relative block w-full cursor-pointer overflow-hidden border border-[#EAD7B9]/20 bg-[#2A1A11] text-left ${
      arch ? "rounded-t-[999px] rounded-b-3xl" : "rounded-3xl"
    } ${focusRing} ${className}`}
  >
    <Image
      src={item.image}
      alt=""
      fill
      sizes="(max-width: 768px) 50vw, 25vw"
      className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
    />
    <span
      aria-hidden
      className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/85 via-transparent to-transparent"
    />
    <span
      className={`${display.className} absolute bottom-3 left-4 right-4 text-base leading-snug text-[#F6EEE2] sm:bottom-4`}
    >
      {item.title}
    </span>
  </button>
);

/* -------------------------------------------------------------------------- */
/*  Lightbox                                                                  */
/* -------------------------------------------------------------------------- */

const Lightbox = ({ index, onClose, onPrev, onNext }) => {
  const ref = useRef(null);
  const titleId = useId();
  const item = index === null ? null : galleryItems[index];

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (item && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    } else if (!item && d.open) {
      d.close();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") onPrev();
    if (e.key === "ArrowRight") onNext();
  };

  const navBtn = `absolute top-[34%] z-10 -translate-y-1/2 cursor-pointer rounded-full bg-[#1A0F0A]/75 p-2.5 text-[#EAD7B9] backdrop-blur transition-colors hover:text-[#D08A4A] ${focusRingDialog}`;

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-auto w-[calc(100%-2rem)] max-w-3xl bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
    >
      {item && (
        <div className="relative overflow-hidden rounded-3xl border border-[#EAD7B9]/15 bg-[#2A1A11] shadow-2xl">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className={`absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-[#1A0F0A]/75 p-2 text-[#EAD7B9] backdrop-blur transition-colors hover:text-[#D08A4A] ${focusRingDialog}`}
          >
            <X aria-hidden className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous photo"
            className={`${navBtn} left-4`}
          >
            <ArrowLeft aria-hidden className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next photo"
            className={`${navBtn} right-4`}
          >
            <ArrowRight aria-hidden className="h-5 w-5" />
          </button>

          <div className="relative h-[340px] w-full bg-[#1A0F0A] sm:h-[480px]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain"
            />
          </div>

          <div className="flex items-end justify-between gap-6 border-t border-dotted border-[#EAD7B9]/25 p-5 sm:p-6">
            <div>
              <p className="text-sm text-[#D08A4A]">{item.category}</p>
              <h3
                id={titleId}
                className={`${display.className} mt-0.5 text-2xl text-[#F6EEE2]`}
              >
                {item.title}
              </h3>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-[#C9B697]">
                {item.description}
              </p>
            </div>
            <p
              className="shrink-0 text-sm tabular-nums text-[#B9A58B]"
              aria-live="polite"
            >
              {index + 1} of {galleryItems.length}
            </p>
          </div>
        </div>
      )}
    </dialog>
  );
};

/* -------------------------------------------------------------------------- */

export const CoffeeJourney = ({ viewAllHref = "/gallery" }) => {
  const [active, setActive] = useState(null);
  const triggerRef = useRef(null);

  const open = useCallback((index, trigger) => {
    triggerRef.current = trigger;
    setActive(index);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus();
  }, []);

  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % galleryItems.length)),
    [],
  );
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? i : (i - 1 + galleryItems.length) % galleryItems.length,
      ),
    [],
  );

  const colH = "h-[280px] sm:h-[360px] md:h-[440px]";

  return (
    <section
      aria-labelledby="journey-heading"
      className={`${body.className} relative overflow-hidden bg-[#1A0F0A] py-16 text-[#EAD7B9] sm:py-20 lg:py-28`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-[460px] w-[560px] translate-x-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(208,138,74,0.14),transparent)]"
      />

      <Container className="relative">
        <RevealOnScroll direction="up" duration={0.65}>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h2
                id="journey-heading"
                className={`${display.className} text-balance text-4xl font-medium leading-tight tracking-tight text-[#F6EEE2] sm:text-5xl`}
              >
                From the farm to your cup, one careful step at a time.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-[#C9B697]">
                Handpicked beans, patient roasting and a counter full of regulars.
                Here&apos;s what a day at Café Aura looks like.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.15} duration={0.7}>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
            <Tile
              item={galleryItems[0]}
              index={0}
              onOpen={open}
              arch
              className={colH}
            />

            <div className={`flex flex-col gap-3 sm:gap-5 ${colH}`}>
              <Tile
                item={galleryItems[1]}
                index={1}
                onOpen={open}
                className="flex-1"
              />
              <Tile
                item={galleryItems[2]}
                index={2}
                onOpen={open}
                className="flex-1"
              />
            </div>

            <div className={`flex flex-col gap-3 sm:gap-5 ${colH}`}>
              <Tile
                item={galleryItems[3]}
                index={3}
                onOpen={open}
                className="h-[38%]"
              />
              <Tile
                item={galleryItems[4]}
                index={4}
                onOpen={open}
                className="flex-1"
              />
            </div>

            <Tile
              item={galleryItems[5]}
              index={5}
              onOpen={open}
              arch
              className={colH}
            />
          </div>
        </RevealOnScroll>
      </Container>

      <Lightbox index={active} onClose={close} onPrev={prev} onNext={next} />
    </section>
  );
};

export default CoffeeJourney;

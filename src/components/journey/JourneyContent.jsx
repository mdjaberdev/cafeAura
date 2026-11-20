"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sprout,
  Sun,
  Flame,
  Coffee,
  ArrowRight,
  CheckCircle2,
  Compass,
  Layers,
} from "lucide-react";
import {Container} from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const JOURNEY_STAGES = [
  {
    id: "cultivation",
    step: "01",
    title: "High-Altitude Cultivation",
    subtitle: "Nurtured in Volcanic Mineral Soils",
    description:
      "Our journey begins between 1,800 and 2,200 meters above sea level. Grown under native shade trees, slow-maturing Arabica cherries absorb rich volcanic minerals, developing complex natural sugars and high-density bean structures.",
    metrics: [
      "1,800 - 2,200 MASL",
      "Shade-Grown Biodiversity",
      "Volcanic Loam Soil",
    ],
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    icon: Sprout,
  },
  {
    id: "harvesting",
    step: "02",
    title: "Selective Hand-Harvesting",
    subtitle: "Only Deep Crimson Ripeness",
    description:
      "We reject mechanical strip-picking. Multi-generational farming partners selectively hand-pick only cherries at peak ruby-red ripeness. Every lot undergoes rigorous water-tank density sorting to eliminate under-ripe floaters.",
    metrics: ["100% Hand-Picked", "Zero Stripping", "Flawless Density Sorting"],
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80",
    icon: Sun,
  },
  {
    id: "roasting",
    step: "03",
    title: "Precision Drum Roasting",
    subtitle: "Unlocking Maillard Chemistry",
    description:
      "In our roastery, master roasters pair sensory cupping experience with real-time digital telemetry. Every small batch is monitored through first crack, caramelizing natural fruit sugars while safeguarding delicate aromatics.",
    metrics: ["Small-Batch Cast-Iron", "Telemetry Monitored", "88+ SCA Cupped"],
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
    icon: Flame,
  },
  {
    id: "brewing",
    step: "04",
    title: "Your Morning Ritual",
    subtitle: "Freshly Ground, Perfectly Extracted",
    description:
      "Sealed in nitrogen-flushed valve bags within 24 hours of roasting, the beans arrive at your doorstep ready for extraction. Whether pourover, espresso, or French press, every cup delivers roastery-fresh perfection.",
    metrics: [
      "24-Hour Roast-to-Ship",
      "Compostable Valve Pouches",
      "Custom Grind Options",
    ],
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    icon: Coffee,
  },
];

export default function JourneyContent() {
  const [activeStage, setActiveStage] = useState(0);
  const current = JOURNEY_STAGES[activeStage];

  return (
    <div className="bg-[#120B06] text-[#F5EBE1] overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 border-b border-[#302014]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[420px] rounded-full bg-[#DE9E57]/10 blur-[130px]"
        />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C120A] border border-[#3E2718] text-[#DE9E57] text-xs font-semibold uppercase tracking-[0.2em] mb-6">
              <Compass className="w-3.5 h-3.5" />
              Seed to Cup Traceability
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.12] mb-6">
              The Anatomy of an{" "}
              <span className="text-[#DE9E57]">Exceptional</span> Brew
            </h1>

            <p className="text-base sm:text-lg text-[#C4B5A5] leading-relaxed max-w-2xl mx-auto mb-10">
              Follow the transformative path of our beans—traversing
              high-altitude volcanic ridges, meticulous micro-mill processing,
              and precise artisan roast profiles.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#302014]/80">
              {[
                { value: "2,200m", label: "Max Altitude" },
                { value: "100%", label: "Selective Harvest" },
                { value: "0.1°C", label: "Roast Precision" },
                { value: "24h", label: "Fresh Dispatch" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-2xl bg-[#160D07] border border-[#302014]"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-[#DE9E57] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#8A7868] uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 2. INTERACTIVE STAGE EXPLORER */}
      <section className="py-20 md:py-28 bg-[#160D07] border-b border-[#302014]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DE9E57] mb-2">
                Step-by-Step Provenance
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Explore the Four Stages
              </h2>
            </div>
            <p className="text-sm text-[#C4B5A5] max-w-md">
              Click through each milestone below to examine the specialized
              techniques applied at every juncture of production.
            </p>
          </div>

          {/* Stage Switcher Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {JOURNEY_STAGES.map((stage, idx) => {
              const isActive = idx === activeStage;
              const Icon = stage.icon;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-3.5 ${
                    isActive
                      ? "bg-[#1C120A] border-[#DE9E57] shadow-[0_0_25px_rgba(222,158,87,0.12)]"
                      : "bg-[#120B06] border-[#302014] hover:border-[#DE9E57]/40"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-[#DE9E57] text-[#120B06]"
                        : "bg-[#160D07] border border-[#3E2718] text-[#DE9E57]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#DE9E57] mb-0.5">
                      Stage {stage.step}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#F5EBE1] line-clamp-1">
                      {stage.title.split(" ")[0]} {stage.title.split(" ")[1]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detail Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-[#1C120A] border border-[#3E2718] p-6 sm:p-10">
            <div className="lg:col-span-6 relative overflow-hidden rounded-2xl bg-[#120B06] border border-[#302014] aspect-[16/10]">
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#120B06]/80 backdrop-blur-md border border-[#DE9E57]/40 text-xs font-semibold text-[#DE9E57]">
                Phase {current.step} of 04
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#DE9E57] mb-2">
                  <span>{current.title}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {current.subtitle}
                </h3>
                <p className="text-[#C4B5A5] leading-relaxed text-sm sm:text-base">
                  {current.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#302014]">
                <p className="text-xs uppercase tracking-wider text-[#8A7868] mb-3">
                  Key Technical Parameters
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {current.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#120B06] border border-[#3E2718] text-xs font-medium text-[#F5EBE1]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DE9E57]" />
                      {metric}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setActiveStage((prev) => (prev + 1) % JOURNEY_STAGES.length)
                  }
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#DE9E57] hover:text-[#EBB36F] transition-colors cursor-pointer"
                >
                  Next Journey Phase <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. BENTO GRID GALLERY HIGHLIGHT */}
      <section className="py-20 md:py-28 bg-[#120B06] border-b border-[#302014]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#DE9E57] mb-3">
              <Layers className="w-4 h-4" />
              Visual Archive
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Glimpses From the Estates & Roastery
            </h2>
            <p className="text-[#C4B5A5] text-sm sm:text-base">
              A visual chronicle of the hands, soils, and machinery that shape
              our craft every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "High-Elevation Canopy",
                desc: "Shade-grown biodiversity in Huila, Colombia",
                image:
                  "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Cherry Selection",
                desc: "Hand-sorting only deep ruby-red coffee cherries",
                image:
                  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Drum Heat Profiles",
                desc: "Careful convective roasting in small batches",
                image:
                  "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden border border-[#302014] bg-[#160D07] aspect-[4/3]"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120B06] via-[#120B06]/40 to-transparent opacity-90" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-xs font-semibold text-[#DE9E57] uppercase tracking-wider mb-1">
                    {card.title}
                  </div>
                  <div className="text-sm text-[#F5EBE1] font-medium">
                    {card.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. BOTTOM CONVERSION CTA */}
      <section className="py-20 md:py-24 bg-[#160D07]">
        <Container>
          <div className="relative rounded-3xl bg-gradient-to-br from-[#1C120A] via-[#1A1009] to-[#120B06] border border-[#3E2718] p-8 sm:p-14 text-center overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#DE9E57]/10 blur-3xl"
            />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Taste the Result of This Journey
            </h2>
            <p className="text-[#C4B5A5] max-w-xl mx-auto mb-8 text-sm sm:text-base">
              Experience single-origin coffees harvested from high-elevation
              partner farms and roasted fresh to order.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/coffee">
                <Button className="bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2">
                  Shop Specialty Roasts <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/story">
                <Button className="bg-transparent border border-[#3E2718] hover:border-[#DE9E57] text-[#F5EBE1] font-medium px-8 py-3.5 rounded-full">
                  Our Heritage Story
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Flame,
  Award,
  Sprout,
  Compass,
  ArrowRight,
  MapPin,
  Mountain,
  Coffee,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  FadeIn,
  RevealOnScroll,
  StaggerContainer,
  StaggerItem,
  ScaleIn,
} from "@/components/animations";

const MILESTONES = [
  {
    year: "1954",
    title: "The First Cast-Iron Roaster",
    subtitle: "Where Obsession Began",
    description:
      "Founded in a quiet cobblestone roastery with a single 15kg cast-iron drum roaster. Our founder spent months profiling heat curves by ear and aroma alone—establishing the signature caramelized sweetness that defines Café Aura today.",
    metric: "15kg Small-Batch Drum",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
  },
  {
    year: "1978",
    title: "Direct-Trade Origin Expeditions",
    subtitle: "Bypassing the Commodity Market",
    description:
      "Refusing to settle for blended broker lots, our second-generation master roasters traveled directly to high-altitude family estates in Huila and Antigua—paying 45% above Fair Trade minimums for micro-lot harvests.",
    metric: "100% Traceable Micro-Lots",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    year: "2006",
    title: "Precision Thermal Profiling",
    subtitle: "Artistry Meets Telemetry",
    description:
      "We merged old-world sensory cupping with real-time bean-probe telemetry. Every batch is tracked to the tenth of a degree to preserve delicate floral bergamot notes without sacrificing rich dark-chocolate body.",
    metric: "88+ SCA Cupping Standard",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80",
  },
  {
    year: "Today",
    title: "Roasted to Order, Zero Compromise",
    subtitle: "From Farm to Your Morning Ritual",
    description:
      "Every bag is roasted within 24 hours of your order, nitrogen-flushed in 100% compostable valve pouches, and dispatched at peak degassing—delivering roastery-door freshness anywhere in the world.",
    metric: "18 Partner Estates Worldwide",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80",
  },
];

const ORIGINS = [
  {
    id: "ethiopia",
    country: "Ethiopia",
    region: "Yirgacheffe, Gedeb",
    altitude: "2,150 MASL",
    process: "Washed & Sun-Dried on Raised Beds",
    notes: ["Jasmine Blossom", "Bergamot", "White Peach"],
    farmer: "Worka Sakaro Cooperative (320 Smallholders)",
    story:
      "Grown in volcanic red loam under native shade canopies, these heirloom varietals mature slowly in cool mountain mist—concentrating sugars and creating our brightest, tea-like pour-over profiles.",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "colombia",
    country: "Colombia",
    region: "San Agustín, Huila",
    altitude: "1,900 MASL",
    process: "Honey & 48-Hour Anaerobic Fermentation",
    notes: ["Panela Sugar", "Blood Orange", "Roasted Hazelnut"],
    farmer: "Finca El Mirador — Familia Vargas",
    story:
      "Harvested exclusively at deep crimson ripeness by hand. Our multi-decade partnership with the Vargas family has funded on-site wet mills and solar drying parabolic beds.",
    image:
      "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "guatemala",
    country: "Guatemala",
    region: "Antigua Valley",
    altitude: "1,750 MASL",
    process: "Volcanic Spring Washed",
    notes: ["72% Dark Cacao", "Toasted Almond", "Spiced Plum"],
    farmer: "Finca Santa Clara Estate",
    story:
      "Surrounded by three volcanoes, Antigua’s pumice-rich soil retains moisture through dry spells—yielding dense Bourbon and Caturra beans that form the velvety backbone of our signature espresso.",
    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1000&q=80",
  },
];

const PILLARS = [
  {
    icon: Flame,
    title: "Small-Batch Drum Roasting",
    description:
      "We never rush a roast. Slow convective and conductive heat transfer develops complex Maillard sugars without scorching delicate bean oils.",
  },
  {
    icon: Sprout,
    title: "Regenerative Direct Trade",
    description:
      "Long-term multi-year contracts ensure farm stability, shade-grown biodiversity, and zero chemical runoff across every partner estate.",
  },
  {
    icon: Award,
    title: "Q-Grader Cupped Daily",
    description:
      "Every incoming green lot and daily production roast is blind-cupped by certified Q-Graders—rejecting anything scoring below 88 points.",
  },
];

export default function StoryContent() {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [selectedOrigin, setSelectedOrigin] = useState(ORIGINS[0]);

  const currentMilestone = MILESTONES[activeMilestone];

  return (
    <div className="bg-[#120B06] text-[#F5EBE1] overflow-hidden">
      {/* 1. HERITAGE HERO */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 border-b border-[#302014]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[420px] rounded-full bg-[#DE9E57]/10 blur-[130px]"
        />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn direction="up" delay={0.05} duration={0.55}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C120A] border border-[#3E2718] text-[#DE9E57] text-xs font-semibold uppercase tracking-[0.2em] mb-6">
                <Coffee className="w-3.5 h-3.5" />
                Est. 1954 • Craft & Provenance
              </span>
            </FadeIn>

            <FadeIn direction="up" delay={0.14} duration={0.65}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.12] mb-6">
                Seven Decades of{" "}
                <span className="text-[#DE9E57]">Uncompromising</span> Roast
                Mastery
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.22} duration={0.65}>
              <p className="text-base sm:text-lg text-[#C4B5A5] leading-relaxed max-w-2xl mx-auto mb-10">
                Great coffee isn’t manufactured—it is cultivated at 2,000
                meters, harvested by hand, and unlocked through patient thermal
                craft. Step inside the story behind every cup of Café Aura.
              </p>
            </FadeIn>

            {/* Heritage Quick Stats */}
            <StaggerContainer
              staggerDelay={0.08}
              delayChildren={0.28}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#302014]/80"
            >
              {[
                { value: "1954", label: "Year Founded" },
                { value: "88+", label: "SCA Cupping Score" },
                { value: "18", label: "Direct-Trade Farms" },
                { value: "24h", label: "Roast-to-Ship Window" },
              ].map((stat) => (
                <StaggerItem key={stat.label}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.25 }}
                    className="p-4 rounded-2xl bg-[#160D07] border border-[#302014] hover:border-[#DE9E57]/40 transition-colors"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-[#DE9E57] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#8A7868] uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </Container>
      </section>

      {/* 2. INTERACTIVE HERITAGE TIMELINE */}
      <section className="py-20 md:py-28 bg-[#160D07] border-b border-[#302014]">
        <Container>
          <RevealOnScroll direction="up" duration={0.65}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DE9E57] mb-2">
                  Our Evolution
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Milestones in the Roastery
                </h2>
              </div>
              <p className="text-sm text-[#C4B5A5] max-w-md">
                Select an era below to trace how a single neighborhood drum
                roaster evolved into an artisanal specialty house.
              </p>
            </div>
          </RevealOnScroll>

          {/* Year Selector Tabs */}
          <RevealOnScroll direction="up" delay={0.1} duration={0.6}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {MILESTONES.map((item, idx) => {
                const isActive = idx === activeMilestone;
                return (
                  <motion.button
                    key={item.year}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveMilestone(idx)}
                    className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#1C120A] border-[#DE9E57] shadow-[0_0_25px_rgba(222,158,87,0.12)]"
                        : "bg-[#120B06] border-[#302014] hover:border-[#DE9E57]/40"
                    }`}
                  >
                    <div
                      className={`text-xl sm:text-2xl font-bold mb-1 ${
                        isActive ? "text-[#DE9E57]" : "text-[#8A7868]"
                      }`}
                    >
                      {item.year}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-[#F5EBE1] line-clamp-1">
                      {item.title}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </RevealOnScroll>

          {/* Active Milestone Spotlight Card */}
          <ScaleIn delay={0.15} duration={0.6}>
            <FadeIn
              key={currentMilestone.year}
              direction="up"
              distance={12}
              duration={0.4}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-[#1C120A] border border-[#3E2718] p-6 sm:p-10"
            >
              <div className="lg:col-span-5 relative overflow-hidden rounded-2xl bg-[#120B06] border border-[#302014] aspect-[4/3]">
                <img
                  src={currentMilestone.image}
                  alt={currentMilestone.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#120B06]/90 backdrop-blur-md border border-[#DE9E57]/40 text-xs font-medium text-[#DE9E57]">
                  {currentMilestone.metric}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#DE9E57]">
                  <span>Chapter 0{activeMilestone + 1}</span>
                  <span>•</span>
                  <span>{currentMilestone.year}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  {currentMilestone.title}
                </h3>

                <p className="text-sm font-medium text-[#EBB36F]">
                  {currentMilestone.subtitle}
                </p>

                <p className="text-[#C4B5A5] leading-relaxed text-base">
                  {currentMilestone.description}
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <motion.button
                    type="button"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      setActiveMilestone(
                        (prev) => (prev + 1) % MILESTONES.length,
                      )
                    }
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#DE9E57] hover:text-[#EBB36F] transition-colors cursor-pointer"
                  >
                    Next Era <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </FadeIn>
          </ScaleIn>
        </Container>
      </section>

      {/* 3. DIRECT-TRADE ORIGIN EXPLORER */}
      <section className="py-20 md:py-28 bg-[#120B06] border-b border-[#302014]">
        <Container>
          <RevealOnScroll direction="up" duration={0.65}>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#DE9E57] mb-3">
                <Compass className="w-4 h-4" />
                Seed to Cup Traceability
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Our Partner Coffee Origins
              </h2>
              <p className="text-[#C4B5A5] text-sm sm:text-base">
                We work directly with multi-generational growers across the
                world’s premier high-elevation coffee belts. Explore our core
                single-origin partnerships.
              </p>
            </div>
          </RevealOnScroll>

          {/* Origin Switcher Pills */}
          <RevealOnScroll direction="up" delay={0.1} duration={0.6}>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {ORIGINS.map((origin) => {
                const active = selectedOrigin.id === origin.id;
                return (
                  <motion.button
                    key={origin.id}
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedOrigin(origin)}
                    className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                      active
                        ? "bg-[#DE9E57] text-[#120B06] border-[#DE9E57] shadow-lg shadow-[#DE9E57]/20"
                        : "bg-[#1A1009] text-[#F5EBE1] border-[#302014] hover:border-[#DE9E57]/50"
                    }`}
                  >
                    {origin.country} — {origin.region.split(",")[0]}
                  </motion.button>
                );
              })}
            </div>
          </RevealOnScroll>

          {/* Origin Detail Card */}
          <ScaleIn delay={0.15} duration={0.6}>
            <FadeIn
              key={selectedOrigin.id}
              direction="up"
              distance={12}
              duration={0.4}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl bg-[#1A1009] border border-[#302014] p-6 sm:p-10"
            >
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#C4B5A5] mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[#DE9E57] font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedOrigin.region}, {selectedOrigin.country}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Mountain className="w-3.5 h-3.5 text-[#DE9E57]" />
                      {selectedOrigin.altitude}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {selectedOrigin.farmer}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#8A7868] mb-5">
                    Process: {selectedOrigin.process}
                  </p>

                  <p className="text-[#C4B5A5] leading-relaxed">
                    {selectedOrigin.story}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#302014]">
                  <p className="text-xs uppercase tracking-wider text-[#8A7868] mb-3">
                    Signature Cupping Notes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedOrigin.notes.map((note) => (
                      <span
                        key={note}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#120B06] border border-[#3E2718] text-xs font-medium text-[#F5EBE1]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#DE9E57]" />
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="group relative h-full min-h-[280px] sm:min-h-[340px] rounded-2xl overflow-hidden border border-[#3E2718]">
                  <img
                    src={selectedOrigin.image}
                    alt={`${selectedOrigin.country} partner coffee farm`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120B06]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#F5EBE1]">
                    <span className="font-semibold">
                      {selectedOrigin.country} Harvest
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#120B06]/80 border border-[#302014] text-[#DE9E57]">
                      Direct-Trade Certified
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </ScaleIn>
        </Container>
      </section>

      {/* 4. ROASTING PHILOSOPHY PILLARS */}
      <section className="py-20 md:py-28 bg-[#160D07] border-b border-[#302014]">
        <Container>
          <RevealOnScroll direction="up" duration={0.65}>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DE9E57] mb-2">
                The Café Aura Standard
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Three Pillars of Every Roast
              </h2>
            </div>
          </RevealOnScroll>

          <StaggerContainer
            staggerDelay={0.1}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <StaggerItem key={pillar.title}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="h-full p-8 rounded-3xl bg-[#1C120A] border border-[#302014] hover:border-[#DE9E57]/40 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#120B06] border border-[#3E2718] flex items-center justify-center text-[#DE9E57] mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#C4B5A5] leading-relaxed">
                      {pillar.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* 5. BOTTOM CONVERSION CTA */}
      <section className="py-20 md:py-24 bg-[#120B06]">
        <Container>
          <ScaleIn duration={0.65}>
            <div className="relative rounded-3xl bg-gradient-to-br from-[#1C120A] via-[#1A1009] to-[#120B06] border border-[#3E2718] p-8 sm:p-14 text-center overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#DE9E57]/10 blur-3xl"
              />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Taste 70 Years of Craft in Your Next Cup
              </h2>
              <p className="text-[#C4B5A5] max-w-xl mx-auto mb-8 text-sm sm:text-base">
                Explore our 12 small-batch single origins and signature espresso
                blends—custom ground to your brewer and roasted the day you
                order.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link href="/coffee">
                    <Button className="bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2 cursor-pointer">
                      Explore Our Roasts <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link href="/">
                    <Button className="bg-transparent border border-[#3E2718] hover:border-[#DE9E57] text-[#F5EBE1] font-medium px-8 py-3.5 rounded-full cursor-pointer">
                      Back to Home
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </ScaleIn>
        </Container>
      </section>
    </div>
  );
}

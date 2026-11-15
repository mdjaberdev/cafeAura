import { Hero } from "@/components/home/Hero";
import { SignatureCoffees } from "@/components/home/SignatureCoffees";
import { OurStory } from "@/components/home/OurStory";
import { CoffeeJourney } from "@/components/home/CoffeeJourney";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CallToAction } from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SignatureCoffees />
      <OurStory />
      <CoffeeJourney />
      <Testimonials />
      <WhyChooseUs />
      <CallToAction />
    </>
  );
}

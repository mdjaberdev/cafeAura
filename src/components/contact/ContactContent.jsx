"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Coffee,
  Building2,
  Package,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {Container} from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const INQUIRY_TOPICS = [
  { id: "general", label: "General & Brew Advice", icon: Coffee },
  { id: "order", label: "Order & Subscription Support", icon: Package },
  { id: "wholesale", label: "Wholesale & Café Partnerships", icon: Building2 },
  { id: "tasting", label: "Private Cupping Session", icon: Sparkles },
];

const CONTACT_CHANNELS = [
  {
    icon: Mail,
    title: "Direct Concierge Email",
    detail: "concierge@cafeaura.com",
    subtext: "Replies within 4 business hours",
    href: "mailto:concierge@cafeaura.com",
  },
  {
    icon: Phone,
    title: "Roastery Desk",
    detail: "+1 (555) 234-8890",
    subtext: "Mon – Sat, 8:00 AM – 6:00 PM",
    href: "tel:+15552348890",
  },
  {
    icon: MapPin,
    title: "Flagship Roastery & Tasting Bar",
    detail: "742 Artisanal Roast Lane, Suite 100",
    subtext: "Seattle, WA 98101",
    href: "#roastery-location",
  },
];

const ROASTERY_HOURS = [
  { day: "Monday – Friday", hours: "7:00 AM – 7:00 PM" },
  { day: "Saturday", hours: "8:00 AM – 8:00 PM" },
  { day: "Sunday", hours: "8:00 AM – 5:00 PM" },
];

export default function ContactContent() {
  const [selectedTopic, setSelectedTopic] = useState("general");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", orderNumber: "", message: "" });
    setSelectedTopic("general");
    setSubmitted(false);
  };

  return (
    <div className="bg-[#120B06] text-[#F5EBE1] overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-[#302014]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[420px] rounded-full bg-[#DE9E57]/10 blur-[130px]"
        />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C120A] border border-[#3E2718] text-[#DE9E57] text-xs font-semibold uppercase tracking-[0.2em] mb-6">
              <Mail className="w-3.5 h-3.5" />
              Roastery Concierge
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.12] mb-6">
              Let’s Talk <span className="text-[#DE9E57]">Specialty</span>{" "}
              Coffee
            </h1>

            <p className="text-base sm:text-lg text-[#C4B5A5] leading-relaxed max-w-2xl mx-auto">
              Whether you need dial-in advice for your home espresso setup,
              assistance with an active roast subscription, or wholesale supply
              for your café, our master roasters are here to help.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. QUICK CONTACT CARDS */}
      <section className="py-12 bg-[#160D07] border-b border-[#302014]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONTACT_CHANNELS.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  className="group p-6 sm:p-8 rounded-3xl bg-[#1C120A] border border-[#302014] hover:border-[#DE9E57]/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#120B06] border border-[#3E2718] flex items-center justify-center text-[#DE9E57] group-hover:bg-[#DE9E57] group-hover:text-[#120B06] transition-colors mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8A7868] mb-1">
                      {item.title}
                    </p>
                    <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#DE9E57] transition-colors mb-2">
                      {item.detail}
                    </h2>
                  </div>
                  <p className="text-xs text-[#C4B5A5] pt-3 border-t border-[#302014]">
                    {item.subtext}
                  </p>
                </a>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. INTERACTIVE INQUIRY FORM + ROASTERY INFO */}
      <section className="py-20 md:py-28 bg-[#120B06] border-b border-[#302014]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT: MESSAGE FORM (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl bg-[#1A1009] border border-[#3E2718] p-6 sm:p-10">
              {submitted ? (
                <div className="py-12 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#DE9E57]/15 border border-[#DE9E57]/40 flex items-center justify-center text-[#DE9E57] mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Message Received by Our Roastery
                  </h3>
                  <p className="text-[#C4B5A5] max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                    Thank you,{" "}
                    <span className="text-white font-semibold">
                      {formData.name}
                    </span>
                    . Our concierge team has logged your inquiry regarding{" "}
                    <span className="text-[#DE9E57] font-medium">
                      {
                        INQUIRY_TOPICS.find((t) => t.id === selectedTopic)
                          ?.label
                      }
                    </span>{" "}
                    and will reply to{" "}
                    <span className="text-white">{formData.email}</span>{" "}
                    shortly.
                  </p>
                  <div className="pt-4">
                    <Button
                      type="button"
                      onClick={handleReset}
                      className="bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] font-semibold px-7 py-3 rounded-full"
                    >
                      Send Another Inquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DE9E57] mb-2">
                      Direct Message
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                      How Can We Elevate Your Cup?
                    </h2>
                  </div>

                  {/* Topic Selector Pills */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A7868] mb-3">
                      Select Inquiry Topic
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {INQUIRY_TOPICS.map((topic) => {
                        const Icon = topic.icon;
                        const isSelected = selectedTopic === topic.id;
                        return (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() => setSelectedTopic(topic.id)}
                            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#1C120A] border-[#DE9E57] text-white shadow-[0_0_20px_rgba(222,158,87,0.12)]"
                                : "bg-[#120B06] border-[#302014] text-[#C4B5A5] hover:border-[#DE9E57]/40"
                            }`}
                          >
                            <Icon
                              className={`w-4 h-4 shrink-0 ${
                                isSelected ? "text-[#DE9E57]" : "text-[#8A7868]"
                              }`}
                            />
                            <span className="truncate">{topic.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-[#C4B5A5] mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Julian Vance"
                        className="w-full px-4 py-3 rounded-xl bg-[#120B06] border border-[#302014] text-[#F5EBE1] placeholder-[#8A7868] text-sm focus:outline-none focus:border-[#DE9E57] transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-[#C4B5A5] mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="julian@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#120B06] border border-[#302014] text-[#F5EBE1] placeholder-[#8A7868] text-sm focus:outline-none focus:border-[#DE9E57] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Optional Order / Company Field */}
                  <div>
                    <label
                      htmlFor="contact-order"
                      className="block text-xs font-medium text-[#C4B5A5] mb-2"
                    >
                      Order Number or Café Name (Optional)
                    </label>
                    <input
                      id="contact-order"
                      name="orderNumber"
                      type="text"
                      value={formData.orderNumber}
                      onChange={handleChange}
                      placeholder="e.g. #AURA-4092 or Velvet Espresso Bar"
                      className="w-full px-4 py-3 rounded-xl bg-[#120B06] border border-[#302014] text-[#F5EBE1] placeholder-[#8A7868] text-sm focus:outline-none focus:border-[#DE9E57] transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-[#C4B5A5] mb-2"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your preferred brew method, roast profile questions, or partnership goals..."
                      className="w-full px-4 py-3 rounded-xl bg-[#120B06] border border-[#302014] text-[#F5EBE1] placeholder-[#8A7868] text-sm focus:outline-none focus:border-[#DE9E57] transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-[#DE9E57] hover:bg-[#EBB36F] text-[#120B06] font-semibold px-8 py-3.5 rounded-full inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Send Message <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>

            {/* RIGHT: ROASTERY SHOWCASE & HOURS (5 cols) */}
            <div id="roastery-location" className="lg:col-span-5 space-y-6">
              {/* Roastery Visual Card */}
              <div className="rounded-3xl overflow-hidden bg-[#1C120A] border border-[#302014]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
                    alt="Café Aura Flagship Tasting Bar"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C120A] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#120B06]/85 backdrop-blur-md border border-[#DE9E57]/40 text-xs font-semibold text-[#DE9E57]">
                    Flagship Tasting Room
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Visit Our Roasting House
                    </h3>
                    <p className="text-sm text-[#C4B5A5]">
                      Experience live small-batch drum roasting, flight
                      tastings, and freshly pulled single-origin espresso.
                    </p>
                  </div>

                  {/* Operating Hours */}
                  <div className="pt-4 border-t border-[#302014]">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#DE9E57] mb-3">
                      <Clock className="w-3.5 h-3.5" />
                      Tasting Bar & Pickup Hours
                    </div>
                    <ul className="space-y-2.5 text-sm">
                      {ROASTERY_HOURS.map((slot) => (
                        <li
                          key={slot.day}
                          className="flex items-center justify-between text-[#C4B5A5]"
                        >
                          <span>{slot.day}</span>
                          <span className="font-semibold text-[#F5EBE1]">
                            {slot.hours}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Wholesale Highlight Banner */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#160D07] border border-[#3E2718] flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#DE9E57] mb-1">
                    For Cafés & Restaurants
                  </p>
                  <p className="text-sm text-[#F5EBE1] font-medium">
                    Request a complimentary green & roasted sample box for your
                    bar.
                  </p>
                </div>
                <Link
                  href="/coffee"
                  className="w-10 h-10 rounded-full bg-[#1C120A] border border-[#3E2718] hover:border-[#DE9E57] flex items-center justify-center text-[#DE9E57] shrink-0 transition-colors"
                  aria-label="Explore Coffee Catalog"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

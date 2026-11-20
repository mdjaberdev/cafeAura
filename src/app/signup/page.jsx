"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CoffeeLogoIcon } from "@/components/common/Header";
import { Container } from "@/components/ui/Container";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Replace with your registration endpoint
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsSubmitting(false);
    router.push("/coffee");
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[#150D07] py-14 px-4 text-[#F5EBE1]">
      <Container className="max-w-md w-full">
        <div className="rounded-2xl border border-[#3D2919] bg-[#191009] p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-2.5 mb-6">
            <CoffeeLogoIcon className="w-7 h-7 text-[#DE9E57]" />
            <span className="font-serif text-xl font-medium text-[#DE9E57]">
              Café Aura
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#F6EEE2]">
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-[#B9A58B]">
            Join Café Aura for weekly small-batch drops and saved tasting notes.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="signup-name"
                className="block text-xs font-medium text-[#C4B5A5] mb-1.5"
              >
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Eleanor Vance"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#120B06] border border-[#352316] text-[#F5EBE1] placeholder-[#6F5E50] text-sm focus:outline-none focus:border-[#DE9E57]"
              />
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className="block text-xs font-medium text-[#C4B5A5] mb-1.5"
              >
                Email Address
              </label>
              <input
                id="signup-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eleanor@cafeaura.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#120B06] border border-[#352316] text-[#F5EBE1] placeholder-[#6F5E50] text-sm focus:outline-none focus:border-[#DE9E57]"
              />
            </div>

            <div>
              <label
                htmlFor="signup-password"
                className="block text-xs font-medium text-[#C4B5A5] mb-1.5"
              >
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#120B06] border border-[#352316] text-[#F5EBE1] placeholder-[#6F5E50] text-sm focus:outline-none focus:border-[#DE9E57]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 mt-2 bg-[#DE9E57] hover:bg-[#EBB36F] disabled:opacity-60 text-[#120B06] font-semibold text-sm rounded-lg transition-all duration-200 active:scale-[0.98]"
            >
              {isSubmitting ? "Creating account..." : "Join Café Aura"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#B9A58B]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#DE9E57] hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}

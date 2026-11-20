import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

/**
 * Café Aura Stylized Coffee Cup Logo Icon
 */
function FooterCoffeeLogo({ className = "w-6 h-6 text-white" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8.5 2.8c.7 1-.7 1.8 0 2.9" />
      <path d="M12 1.8c.7 1.2-.7 2 0 3.6" />
      <path d="M4 8.5h12.2a.6.6 0 0 1 .6.6v2.8c0 3.3-2.6 6-5.8 6H9.4C6.2 17.9 4 15.2 4 11.9V8.5z" />
      <path d="M16.8 10h1.8a2 2 0 0 1 0 4h-1.8" />
      <path d="M3 20h16.5" />
    </svg>
  );
}

/**
 * Custom Vector Social Icons matching the exact circle outline design
 */
function FacebookIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9.198 21.5h4v-8.01h2.604l.39-3.024h-2.994V8.535c0-.875.243-1.472 1.498-1.472h1.6V4.356c-.277-.037-1.228-.12-2.336-.12-2.312 0-3.895 1.411-3.895 4.004v2.227H7.452v3.024h2.61v8.01z" />
    </svg>
  );
}

function TwitterIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function PinterestIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.5.03-3.58l1.1-4.66s-.28-.56-.28-1.39c0-1.3.76-2.27 1.7-2.27.8 0 1.19.6 1.19 1.33 0 .8-.52 2.02-.79 3.14-.23.95.48 1.72 1.41 1.72 1.7 0 3-1.8 3-4.38 0-2.29-1.64-3.89-4-3.89-2.73 0-4.33 2.05-4.33 4.16 0 .82.32 1.7.71 2.18.08.1.09.18.07.28l-.26 1.1c-.04.18-.15.22-.34.13-1.28-.6-2.08-2.46-2.08-3.96 0-3.23 2.35-6.2 6.77-6.2 3.55 0 6.32 2.53 6.32 5.92 0 3.53-2.22 6.37-5.3 6.37-1.04 0-2.01-.54-2.35-1.18l-.64 2.44c-.23.89-.86 2.01-1.28 2.7A12 12 0 1 0 12 0z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export const Footer = () => {
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#0D0704] text-[#C4B5A5]">
      {/* Background Coffee Grounds & Bean Photography Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 -z-0">
        <Image
          src="/images/footer/footer-bg.webp"
          alt="Ground coffee and roasted beans texture"
          fill
          className="object-cover object-center"
        />
        {/* Dark espresso gradient vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0704] via-[#0D0704]/80 to-[#120B06]" />
      </div>

      <Container className="relative z-10 pt-16 sm:pt-20 pb-12">
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#24160D]">
          {/* Column 1: Brand Info & Community Socials */}
          <div className="lg:col-span-5 text-left">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <FooterCoffeeLogo className="w-6 h-6 text-white group-hover:text-[#DE9E57] transition-colors" />
              <span className="font-serif text-xl font-medium tracking-wide text-white group-hover:text-[#DE9E57] transition-colors">
                Café Aura
              </span>
            </Link>

            {/* Tagline */}
            <p className="mt-3.5 text-xs sm:text-sm text-[#A89A8D] leading-relaxed max-w-sm font-normal">
              Café Aura offers premium, expertly crafted coffee that delivers rich
              flavors and an unforgettable experience in every cup.
            </p>

            {/* Social Community Heading */}
            <h4 className="mt-7 text-xs font-semibold uppercase tracking-wider text-white">
              Join Our Coffee Community
            </h4>

            {/* Social Icons Row */}
            <div className="mt-3.5 flex items-center gap-2.5">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Café Aura on Facebook"
                className="w-8 h-8 rounded-full border border-[#442F21] bg-[#160D07]/80 text-[#D6CBC1] hover:text-[#DE9E57] hover:border-[#DE9E57]/60 hover:bg-[#DE9E57]/10 flex items-center justify-center transition-all duration-200"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Café Aura on Twitter"
                className="w-8 h-8 rounded-full border border-[#442F21] bg-[#160D07]/80 text-[#D6CBC1] hover:text-[#DE9E57] hover:border-[#DE9E57]/60 hover:bg-[#DE9E57]/10 flex items-center justify-center transition-all duration-200"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Café Aura on Instagram"
                className="w-8 h-8 rounded-full border border-[#442F21] bg-[#160D07]/80 text-[#D6CBC1] hover:text-[#DE9E57] hover:border-[#DE9E57]/60 hover:bg-[#DE9E57]/10 flex items-center justify-center transition-all duration-200"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Café Aura on Pinterest"
                className="w-8 h-8 rounded-full border border-[#442F21] bg-[#160D07]/80 text-[#D6CBC1] hover:text-[#DE9E57] hover:border-[#DE9E57]/60 hover:bg-[#DE9E57]/10 flex items-center justify-center transition-all duration-200"
              >
                <PinterestIcon className="w-3.5 h-3.5" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Café Aura on YouTube"
                className="w-8 h-8 rounded-full border border-[#442F21] bg-[#160D07]/80 text-[#D6CBC1] hover:text-[#DE9E57] hover:border-[#DE9E57]/60 hover:bg-[#DE9E57]/10 flex items-center justify-center transition-all duration-200"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: About Links */}
          <div className="lg:col-span-2 text-left">
            <h3 className="text-sm font-semibold text-white inline-block relative pb-1 border-b border-[#DE9E57]">
              About
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[#A89A8D] hover:text-[#DE9E57] transition-colors"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-[#A89A8D] hover:text-[#DE9E57] transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-[#A89A8D] hover:text-[#DE9E57] transition-colors"
                >
                  News &amp; Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-[#A89A8D] hover:text-[#DE9E57] transition-colors"
                >
                  Help &amp; Supports
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div className="lg:col-span-2 text-left">
            <h3 className="text-sm font-semibold text-white inline-block relative pb-1 border-b border-[#DE9E57]">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[#A89A8D] hover:text-[#DE9E57] transition-colors"
                >
                  How we work
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-[#A89A8D] hover:text-[#DE9E57] transition-colors"
                >
                  Terms of service
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-[#A89A8D] hover:text-[#DE9E57] transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-[#A89A8D] hover:text-[#DE9E57] transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Get in Touch */}
          <div className="lg:col-span-3 text-left">
            <h3 className="text-sm font-semibold text-white inline-block relative pb-1 border-b border-[#DE9E57]">
              Get in Touch
            </h3>
            <div className="mt-4 space-y-2.5 text-xs sm:text-sm text-[#A89A8D]">
              <p>1234 Coffee Lane, Suite 100</p>
              <p>Seattle, United States</p>
              <p className="pt-1">
                <a
                  href="mailto:majidur.uiux@gmail.com"
                  className="text-[#C4B5A5] hover:text-[#DE9E57] transition-colors"
                >
                  majidur.uiux@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+8801787123941"
                  className="text-[#C4B5A5] hover:text-[#DE9E57] transition-colors"
                >
                  +880 1787-123941
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 text-center">
          <p className="text-xs text-[#7A6A5E] tracking-wide">
            &copy; 2026 Café Aura. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

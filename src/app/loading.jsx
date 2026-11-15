import { Container } from "@/components/ui/Container";
import { CoffeeLogoIcon } from "@/components/common/Header";

export default function Loading() {
  return (
    <div className="relative flex min-h-[70vh] flex-1 items-center justify-center overflow-hidden bg-[#120B06] py-24">
      {/* Subtle Ambient Gold Roast Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-64 w-64 rounded-full bg-[#DE9E57]/10 blur-[90px]"
      />

      <Container
        size="sm"
        className="relative z-10 flex flex-col items-center gap-6"
      >
        {/* Dual-Ring Luxury Espresso Spinner with Brand Cup */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          {/* Outer Rotating Gold Ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-[#302014] border-t-[#DE9E57] border-r-[#DE9E57]/50" />

          {/* Inner Counter-Pulse Ring */}
          <div className="absolute inset-2.5 rounded-full border border-[#3E2718]/80 bg-[#1A1009] shadow-inner" />

          {/* Center Steaming Coffee Cup Icon */}
          <CoffeeLogoIcon className="relative z-10 h-8 w-8 animate-pulse text-[#DE9E57]" />
        </div>

        {/* Branded Loading Copy */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <span className="font-serif text-lg font-medium tracking-wide text-[#F5EBE1]">
            Café Aura
          </span>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#8A7868]">
            Brewing your experience...
          </p>
        </div>
      </Container>
    </div>
  );
}

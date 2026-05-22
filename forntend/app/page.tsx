import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <main style={{ background: "#0B0C10", minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CTASection />

      {/* Footer */}
      <footer
        className="py-8 text-center border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)", color: "#C5C6C7" }}
      >
        <p className="text-sm">
          © 2025 DangasaAI. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

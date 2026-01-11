import FloatingNav from "@/components/FloatingNav";
import { Footer } from "@/components/Footer";

import { HeroSection } from "@/components/HeroSection";
import { StorySection } from "@/components/StorySection";
import { CustomizeSection } from "@/components/CustomizeSection";
import { PartnersSection } from "@/components/PartnersSection";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <main className="min-h-screen relative">
      <FloatingNav />

      <section id="home">
        <HeroSection />
      </section>

      <section id="story">
        <StorySection />
      </section>

      <section id="customize">
        <CustomizeSection />
      </section>

      <section id="partners">
        <PartnersSection />
      </section>

      {/* Subscribe Section only */}
      <section id="subscribe-cta">
        <CTASection />
      </section>

      {/* Footer wrapper with email target for smooth scroll */}
      <div id="footer-email">
        <Footer />
      </div>
    </main>
  );
};

export default Index;

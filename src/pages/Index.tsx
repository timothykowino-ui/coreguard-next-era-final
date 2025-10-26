import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { StorySection } from "@/components/StorySection";
import { TechnologySection } from "@/components/TechnologySection";
import { CustomizeSection } from "@/components/CustomizeSection";
import { PartnersSection } from "@/components/PartnersSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <StorySection />
      <TechnologySection />
      <CustomizeSection />
      <PartnersSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;

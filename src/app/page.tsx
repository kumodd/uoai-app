import { ExecutiveDetailsSection } from "@/components/sections/ExecutiveDetailsSection";
import { HeroStudio } from "@/components/sections/HeroStudio";
import { MarketingCtaSection } from "@/components/sections/MarketingCtaSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { WhyNeededSection } from "@/components/sections/WhyNeededSection";

export default function HomePage() {
  return (
    <>
      <HeroStudio />
      <WhyNeededSection />
      <PortfolioSection />
      <ExecutiveDetailsSection />
      <MarketingCtaSection />
    </>
  );
}

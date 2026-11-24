import { AudienceBenefitsSection } from "@/components/sections/AudienceBenefitsSection";
import { HeroStudio } from "@/components/sections/HeroStudio";
import { MarketingCtaSection } from "@/components/sections/MarketingCtaSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ScopeBoundariesSection } from "@/components/sections/ScopeBoundariesSection";
import { StakeholdersSection } from "@/components/sections/StakeholdersSection";
import { WhyNeededSection } from "@/components/sections/WhyNeededSection";

export default function HomePage() {
  return (
    <>
      <HeroStudio />
      <WhyNeededSection />
      <AudienceBenefitsSection />
      <PortfolioSection />
      <StakeholdersSection />
      <ScopeBoundariesSection />
      <MarketingCtaSection />
    </>
  );
}

import type { Metadata } from "next";
import { EcosystemSpotlight } from "@/components/sections/EcosystemSpotlight";
import { PrivacySafetyHub } from "@/components/sections/PrivacySafetyHub";

export const metadata: Metadata = {
  title: "Privacy & Google Play Data Safety",
  description:
    "Official Google Play Data Safety disclosures, Android permission justifications, and zero-cloud privacy guarantees for UOAI Provider, UOAI Chat, and UOAI Keyboard.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="pt-11 pb-4">
        <div className="mx-auto w-full max-w-[1120px] px-6">
          <p className="m-0 text-[11.5px] font-bold tracking-[0.1em] uppercase text-[#626952]">
            GOOGLE PLAY CONSOLE COMPLIANCE &bull; ZERO TRACKING
          </p>
          <h1 className="mt-2.5 mb-2 text-[clamp(28px,3.8vw,38px)] leading-[1.15] font-extrabold tracking-tight text-[#1B1E16]">
            Privacy &amp; <span className="text-[#4F5D2F]">Data Safety Hub</span>
          </h1>
          <p className="m-0 max-w-2xl text-[15px] text-[#585E4F]">
            100% On-Device • Zero Cloud • Zero Tracking. Inspect Play Console Data Safety matrices, minimal Android permissions, and user deletion controls across all three UOAI applications.
          </p>
        </div>
      </section>

      <PrivacySafetyHub />
      <EcosystemSpotlight />
    </>
  );
}

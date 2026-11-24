import type { Metadata } from "next";
import { BrdDocsGrid } from "@/components/sections/BrdDocsGrid";

export const metadata: Metadata = {
  title: "Business Requirements Documentation (BRD)",
  description:
    "Complete 6-part Business Requirements Documentation suite for Universal Offline AI (UOAI) Provider, Companion Apps, API Spec, and Play Compliance.",
};

export default function DocsIndexPage() {
  return (
    <>
      <section className="pt-12 pb-2">
        <div className="mx-auto w-full max-w-[1020px] px-6">
          <p className="m-0 text-[11.5px] font-bold tracking-[0.1em] uppercase text-[#626952]">
            UOAI SPECIFICATION ARCHIVE &bull; DOCS/BRD
          </p>
          <h1 className="mt-2.5 mb-2 text-[clamp(28px,3.8vw,38px)] leading-[1.15] font-extrabold tracking-tight text-[#1B1E16]">
            Business Requirements{" "}
            <span className="text-[#4F5D2F]">Documentation</span>
          </h1>
          <p className="m-0 max-w-2xl text-[15px] text-[#585E4F]">
            Explore every BRD specification document stored in{" "}
            <code className="font-mono text-xs">docs/brd/*.md</code>, rendered directly from source Markdown.
          </p>
        </div>
      </section>

      <BrdDocsGrid />
    </>
  );
}

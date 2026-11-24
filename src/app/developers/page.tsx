import type { Metadata } from "next";
import { DeveloperStudio } from "@/components/sections/DeveloperStudio";

export const metadata: Metadata = {
  title: "Developer Integration & AI Prompts",
  description:
    "Integrate 100% offline Gemma 3 / Gemma 4 inference via Path A (sdk-release.aar) or Path B (Direct HTTP/SSE), plus copy-paste AI coding assistant prompts.",
};

export default async function DevelopersPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const sp = await searchParams;
  const initialTab =
    sp.tab === "path-b" || sp.tab === "prompt" ? sp.tab : "path-a";

  return (
    <>
      <section className="pt-12 pb-2">
        <div className="mx-auto w-full max-w-[1020px] px-6">
          <p className="m-0 text-[11.5px] font-bold tracking-[0.1em] uppercase text-[#626952]">
            EXTERNAL DEVELOPER HANDOVER &bull; COM.UOAI.PROVIDER
          </p>
          <h1 className="mt-2.5 mb-2 text-[clamp(28px,3.8vw,38px)] leading-[1.15] font-extrabold tracking-tight text-[#1B1E16]">
            Developer <span className="text-[#4F5D2F]">Integration Studio</span>
          </h1>
          <p className="m-0 max-w-2xl text-[15px] text-[#585E4F]">
            Ship 100% offline Gemma 3 &amp; Gemma 4 inference with zero bundled weights using Path A (Kotlin AAR SDK), Path B (Direct HTTP/SSE), or ready-to-paste AI coding prompts.
          </p>
        </div>
      </section>

      <DeveloperStudio initialTab={initialTab} />
    </>
  );
}

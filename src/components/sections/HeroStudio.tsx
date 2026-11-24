import Link from "next/link";
import { ArrowRight, CloudOff, Cpu, ShieldOff, UserCheck } from "lucide-react";
import { IconTile } from "@/components/ui/IconTile";
import { CORE_COMMITMENTS, type CoreCommitmentCard } from "@/data/marketing";

function CommitmentIcon({ icon }: { icon: CoreCommitmentCard["icon"] }) {
  switch (icon) {
    case "cpu":
      return <Cpu className="h-[22px] w-[22px]" />;
    case "cloudOff":
      return <CloudOff className="h-[22px] w-[22px]" />;
    case "userCheck":
      return <UserCheck className="h-[22px] w-[22px]" />;
    case "shieldOff":
      return <ShieldOff className="h-[22px] w-[22px]" />;
  }
}

export function HeroStudio() {
  return (
    <section className="pt-11 pb-7">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-7 md:flex-row">
          <div className="max-w-[680px]">
            <p className="m-0 text-[11.5px] font-bold tracking-[0.1em] uppercase text-[#626952]">
              EXECUTIVE SUMMARY &amp; ECOSYSTEM OVERVIEW &bull; BASELINE V1.0
            </p>
            <h1 className="mt-2.5 mb-3 text-[clamp(32px,4.4vw,44px)] leading-[1.12] font-extrabold tracking-[-0.025em] text-[#1B1E16]">
              Private on-device AI,{" "}
              <span className="text-[#4F5D2F]">shared</span> across your Android
              device.
            </h1>
            <p className="m-0 max-w-[630px] text-[15.5px] text-[#585E4F]">
              Universal Offline AI (UOAI) lets Android users summarize
              documents, rewrite messages, and hold private AI conversations
              without sending personal data to remote cloud servers. UOAI
              Provider acts as a shared local utility so one loaded model powers
              your entire device safely offline.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2.5 md:pt-3">
            <a
              href="#ecosystem-portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-[#4F5D2F] px-5 py-3 text-sm font-semibold text-[#FAFBF7] transition hover:bg-[#3E4A24]"
            >
              <span>Explore Ecosystem</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/docs/01-executive-summary-and-ecosystem"
              className="inline-flex items-center justify-center rounded-full border border-[#CFD5C3] bg-[#E9ECE2] px-5 py-3 text-sm font-semibold text-[#3B4427] transition hover:bg-[#DFE4D6]"
            >
              Read Full BRD
            </Link>
          </div>
        </div>

        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="Four core UOAI commitments"
        >
          {CORE_COMMITMENTS.map((card) => (
            <article
              key={card.id}
              role="listitem"
              title={card.description}
              className="flex items-center gap-4 rounded-[22px] border border-[#E2E5DA] bg-[#F1F2EC] px-5 py-5 shadow-[0_2px_10px_rgba(27,30,22,0.03)]"
            >
              <IconTile tone={card.tone}>
                <CommitmentIcon icon={card.icon} />
              </IconTile>
              <div className="flex flex-col gap-0.5">
                <span className="text-[26px] leading-[1.1] font-extrabold tracking-[-0.02em] text-[#1B1E16]">
                  {card.value}
                </span>
                <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#626952]">
                  {card.label}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

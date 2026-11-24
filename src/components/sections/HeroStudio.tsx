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
    <section className="pt-14 pb-12">
      <div className="mx-auto w-full max-w-[1020px] px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[610px]">
            <p className="m-0 text-[11.5px] font-bold tracking-[0.1em] uppercase text-[#4F5D2F]">
              UNIVERSAL OFFLINE AI &bull; EXECUTIVE OVERVIEW
            </p>
            <h1 className="mt-2.5 mb-3.5 text-[clamp(32px,4.5vw,44px)] leading-[1.1] font-extrabold tracking-[-0.025em] text-[#1B1E16]">
              Private offline AI,{" "}
              <span className="text-[#4F5D2F]">shared</span> across Android.
            </h1>
            <p className="m-0 text-[15.5px] leading-relaxed text-[#585E4F]">
              Summarize documents, polish writing, and run private AI chats
              entirely on your phone—with one shared local engine and zero
              cloud servers.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <a
              href="#apps"
              className="inline-flex items-center gap-2 rounded-full bg-[#4F5D2F] px-5 py-3 text-sm font-semibold text-[#FAFBF7] transition hover:bg-[#3E4A24]"
            >
              <span>Explore Apps</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/docs/01-executive-summary-and-ecosystem"
              className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-[#4F5D2F] transition hover:bg-[#F1F2EC]"
            >
              Read BRD &rarr;
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
              className="flex items-center gap-4 rounded-[22px] border border-[#E2E5DA] bg-[#F1F2EC] px-5 py-4"
            >
              <IconTile tone={card.tone}>
                <CommitmentIcon icon={card.icon} />
              </IconTile>
              <div className="flex flex-col gap-0.5">
                <span className="text-[24px] leading-[1.1] font-extrabold tracking-[-0.02em] text-[#1B1E16]">
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

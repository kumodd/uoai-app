import { BatteryWarning, HardDrive, Lightbulb, Puzzle } from "lucide-react";
import { VerifiedBadge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/IconTile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  PROBLEM_CARDS,
  SOLUTION_PILLARS,
  type ProblemCard,
} from "@/data/marketing";

function ProblemIcon({ icon }: { icon: ProblemCard["icon"] }) {
  switch (icon) {
    case "hardDrive":
      return <HardDrive className="h-[22px] w-[22px]" />;
    case "batteryWarning":
      return <BatteryWarning className="h-[22px] w-[22px]" />;
    case "puzzle":
      return <Puzzle className="h-[22px] w-[22px]" />;
  }
}

export function WhyNeededSection() {
  return (
    <section className="py-7">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <SectionHeader
          eyebrow="1. BUSINESS CONTEXT & PROBLEM STATEMENT"
          icon={<Lightbulb className="h-3.5 w-3.5" />}
          rightSlot={
            <span className="text-[13px] text-[#585E4F]">
              Why embedding AI inside every separate app breaks mobile devices
            </span>
          }
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PROBLEM_CARDS.map((card) => (
            <article
              key={card.id}
              className="flex flex-col gap-3.5 rounded-[22px] border border-[#E2E5DA] bg-[#F1F2EC] p-6"
            >
              <div className="flex items-center gap-3.5">
                <IconTile tone={card.tone}>
                  <ProblemIcon icon={card.icon} />
                </IconTile>
                <div>
                  <span className="block text-[10.5px] font-bold tracking-[0.09em] uppercase text-[#626952]">
                    {card.kicker}
                  </span>
                  <h2 className="m-0 text-[17px] font-bold text-[#1B1E16]">
                    {card.title}
                  </h2>
                </div>
              </div>
              <p className="m-0 text-sm leading-relaxed text-[#585E4F]">
                {card.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-[22px] border border-[#E2E5DA] bg-white p-6 shadow-[0_2px_10px_rgba(27,30,22,0.03)]">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E5DA] pb-4">
            <div>
              <span className="block text-[11px] font-bold tracking-[0.09em] uppercase text-[#4F5D2F]">
                THE UOAI SOLUTION
              </span>
              <h2 className="m-0 mt-1 text-xl font-extrabold tracking-tight text-[#1B1E16]">
                UOAI Provider acts as a shared local AI utility on Android
              </h2>
            </div>
            <VerifiedBadge>Zero Cloud • 100% On-Device</VerifiedBadge>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SOLUTION_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-[16px] border border-[#E2E5DA] bg-[#FBFBF8] p-4"
              >
                <h3 className="m-0 mb-1.5 text-[14.5px] font-bold text-[#1B1E16]">
                  {pillar.title}
                </h3>
                <p className="m-0 text-[13px] leading-relaxed text-[#585E4F]">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { BatteryWarning, HardDrive, Lightbulb, Puzzle } from "lucide-react";
import { VerifiedBadge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/IconTile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  PROBLEM_ITEMS,
  SOLUTION_STATEMENT,
  type ProblemItem,
} from "@/data/marketing";

function ProblemIcon({ icon }: { icon: ProblemItem["icon"] }) {
  switch (icon) {
    case "hardDrive":
      return <HardDrive className="h-5 w-5" />;
    case "batteryWarning":
      return <BatteryWarning className="h-5 w-5" />;
    case "puzzle":
      return <Puzzle className="h-5 w-5" />;
  }
}

export function WhyNeededSection() {
  return (
    <section className="border-t border-[#E6E9DF] py-14">
      <div className="mx-auto w-full max-w-[1020px] px-6">
        <SectionHeader
          eyebrow="WHY UOAI IS NEEDED"
          icon={<Lightbulb className="h-3.5 w-3.5" />}
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PROBLEM_ITEMS.map((item) => (
            <div key={item.id} className="flex items-start gap-3.5">
              <IconTile tone={item.tone} className="h-11 w-11">
                <ProblemIcon icon={item.icon} />
              </IconTile>
              <div>
                <h2 className="m-0 mb-1 text-base font-bold text-[#1B1E16]">
                  {item.title}
                </h2>
                <p className="m-0 text-sm leading-relaxed text-[#585E4F]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[22px] border border-[#E2E5DA] bg-[#F1F2EC] p-6 sm:p-7 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h3 className="m-0 mb-1.5 text-lg font-extrabold tracking-tight text-[#1B1E16]">
              {SOLUTION_STATEMENT.title}
            </h3>
            <p className="m-0 text-sm leading-relaxed text-[#585E4F]">
              {SOLUTION_STATEMENT.description}
            </p>
          </div>
          <VerifiedBadge className="shrink-0">
            Zero Cloud &bull; Shared Locally
          </VerifiedBadge>
        </div>
      </div>
    </section>
  );
}

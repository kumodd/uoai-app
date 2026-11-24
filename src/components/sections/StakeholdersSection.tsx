import { Users } from "lucide-react";
import { VerifiedBadge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/IconTile";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { STAKEHOLDER_PERSONAS } from "@/data/marketing";

export function StakeholdersSection() {
  return (
    <section className="py-7">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <SectionHeader
          eyebrow="4. STAKEHOLDERS & TARGET PERSONAS"
          icon={<Users className="h-3.5 w-3.5" />}
          rightSlot={
            <span className="text-[13px] text-[#585E4F]">
              Designed for everyday privacy, app teams, enterprise &amp; store
              compliance
            </span>
          }
        />

        <div className="flex flex-col gap-3">
          {STAKEHOLDER_PERSONAS.map((persona) => (
            <article
              key={persona.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-[#E2E5DA] bg-[#F1F2EC] px-5 py-4 transition hover:bg-[#EAECE4]"
            >
              <div className="flex min-w-[260px] flex-1 items-center gap-4">
                <IconTile tone={persona.tone} className="h-11 w-11">
                  <Users className="h-[19px] w-[19px]" />
                </IconTile>
                <div>
                  <h3 className="m-0 text-[15.5px] font-bold text-[#1B1E16]">
                    {persona.role}
                  </h3>
                  <p className="m-0 mt-0.5 text-[13.5px] text-[#585E4F]">
                    {persona.needs}
                  </p>
                </div>
              </div>

              <VerifiedBadge>{persona.badge}</VerifiedBadge>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, Check, Target } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VALUE_PROPOSITIONS } from "@/data/marketing";

export function AudienceBenefitsSection() {
  return (
    <section className="py-7">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <SectionHeader
          eyebrow="2. BUSINESS OBJECTIVES & VALUE PROPOSITION"
          icon={<Target className="h-3.5 w-3.5" />}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {VALUE_PROPOSITIONS.map((group) => (
            <article
              key={group.id}
              className="flex flex-col justify-between gap-5 rounded-[22px] border border-[#E2E5DA] bg-white p-6 shadow-[0_2px_10px_rgba(27,30,22,0.03)]"
            >
              <div>
                <span className="block text-[11px] font-bold tracking-[0.09em] uppercase text-[#4F5D2F]">
                  {group.eyebrow}
                </span>
                <h2 className="m-0 mt-1.5 mb-2 text-[22px] font-extrabold tracking-tight text-[#1B1E16]">
                  {group.title}
                </h2>
                <p className="m-0 mb-4 text-[14.5px] text-[#585E4F]">
                  {group.summary}
                </p>

                <ul className="m-0 grid list-none gap-3 p-0">
                  {group.items.map((item) => (
                    <li
                      key={item.heading}
                      className="flex items-start gap-2.5 text-sm text-[#585E4F]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DFF0E3] text-[#245F39]"
                      >
                        <Check className="h-3 w-3 stroke-[2.5]" />
                      </span>
                      <div>
                        <strong className="text-[#1B1E16]">
                          {item.heading}:
                        </strong>{" "}
                        {item.detail}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Link
                  href={group.ctaHref}
                  className="inline-flex items-center gap-2 rounded-full border border-[#CFD5C3] bg-[#E9ECE2] px-4 py-2 text-[13px] font-semibold text-[#3B4427] transition hover:bg-[#DFE4D6]"
                >
                  <span>{group.ctaLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

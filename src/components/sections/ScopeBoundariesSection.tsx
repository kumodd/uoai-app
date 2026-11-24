import { Check, MinusCircle, Shield } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SCOPE_IN, SCOPE_OUT } from "@/data/marketing";

export function ScopeBoundariesSection() {
  return (
    <section className="py-7">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <SectionHeader
          eyebrow="5. SCOPE BOUNDARIES"
          icon={<Shield className="h-3.5 w-3.5" />}
          rightSlot={
            <span className="text-[13px] text-[#585E4F]">
              Clear separation between the shared engine and companion client
              apps
            </span>
          }
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <article className="rounded-[22px] border border-[#E2E5DA] bg-white p-6">
            <span className="block text-[11px] font-bold tracking-[0.09em] uppercase text-[#245F39]">
              IN SCOPE FOR UOAI PROVIDER
            </span>
            <h2 className="m-0 mt-1 mb-4 text-xl font-extrabold tracking-tight text-[#1B1E16]">
              What the shared engine handles
            </h2>
            <ul className="m-0 grid list-none gap-3 p-0">
              {SCOPE_IN.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-2.5 rounded-[14px] bg-[#F1F2EC] p-3.5 text-sm text-[#585E4F]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DFF0E3] text-[#245F39]"
                  >
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </span>
                  <div>
                    <strong className="text-[#1B1E16]">{item.title}:</strong>{" "}
                    {item.detail}
                  </div>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[22px] border border-[#E2E5DA] bg-white p-6">
            <span className="block text-[11px] font-bold tracking-[0.09em] uppercase text-[#8F6520]">
              EXPLICITLY OUTSIDE SCOPE
            </span>
            <h2 className="m-0 mt-1 mb-4 text-xl font-extrabold tracking-tight text-[#1B1E16]">
              Handled by client apps or prohibited
            </h2>
            <ul className="m-0 grid list-none gap-3 p-0">
              {SCOPE_OUT.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-2.5 rounded-[14px] bg-[#F1F2EC] p-3.5 text-sm text-[#585E4F]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F6EFE0] text-[#8F6520]"
                  >
                    <MinusCircle className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <strong className="text-[#1B1E16]">{item.title}:</strong>{" "}
                    {item.detail}
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

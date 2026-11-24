import type { Metadata } from "next";
import { LoopbackApiList } from "@/components/sections/LoopbackApiList";
import { TrustFlowAndErrors } from "@/components/sections/TrustFlowAndErrors";
import { CodePill } from "@/components/ui/Badge";
import { KEY_CONSTANTS_TABLE } from "@/data/constants";

export const metadata: Metadata = {
  title: "Loopback API & Error Playbook",
  description:
    "OpenAI-compatible REST & SSE loopback API specification (http://127.0.0.1:8765/v1), OS verification flow, model lifecycle states, and HTTP 400–504 error playbook.",
};

export default function ApiReferencePage() {
  return (
    <>
      <section className="pt-12 pb-2">
        <div className="mx-auto w-full max-w-[1020px] px-6">
          <p className="m-0 text-[11.5px] font-bold tracking-[0.1em] uppercase text-[#626952]">
            API SPECIFICATION &bull; HTTP://127.0.0.1:8765/V1
          </p>
          <h1 className="mt-2.5 mb-2 text-[clamp(28px,3.8vw,38px)] leading-[1.15] font-extrabold tracking-tight text-[#1B1E16]">
            Loopback API &amp; <span className="text-[#4F5D2F]">Error Playbook</span>
          </h1>
          <p className="m-0 max-w-2xl text-[15px] text-[#585E4F]">
            Complete endpoint reference, OS-verified registration flow, tool calling conventions, and client recovery matrix for{" "}
            <code className="font-mono text-xs">com.uoai.provider</code>.
          </p>
        </div>
      </section>

      <LoopbackApiList />
      <TrustFlowAndErrors />

      <section className="py-4 pb-10">
        <div className="mx-auto w-full max-w-[1020px] px-6">
          <div className="rounded-[22px] border border-[#E2E5DA] bg-white p-6">
            <h2 className="m-0 mb-4 text-[12px] font-bold tracking-[0.1em] uppercase text-[#626952]">
              Key Runtime Constants &amp; Limits
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13.5px]">
                <thead>
                  <tr>
                    <th className="border-b border-[#E2E5DA] px-3 py-2 text-left text-[11px] font-bold tracking-[0.07em] uppercase text-[#626952]">
                      Property
                    </th>
                    <th className="border-b border-[#E2E5DA] px-3 py-2 text-left text-[11px] font-bold tracking-[0.07em] uppercase text-[#626952]">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {KEY_CONSTANTS_TABLE.map((row) => (
                    <tr
                      key={row.property}
                      className="border-b border-[#E2E5DA] last:border-b-0"
                    >
                      <td className="px-3 py-2.5 font-semibold text-[#1B1E16]">
                        {row.property}
                      </td>
                      <td className="px-3 py-2.5 text-[#585E4F]">
                        <CodePill>{row.value}</CodePill>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CodePill, SoftChip } from "@/components/ui/Badge";
import { ERROR_PLAYBOOK, MODEL_STATES, TRUST_STEPS } from "@/data/api-spec";
import { cn } from "@/lib/cn";

export function TrustFlowAndErrors() {
  const [query, setQuery] = useState("");

  const filteredErrors = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ERROR_PLAYBOOK;
    return ERROR_PLAYBOOK.filter((row) =>
      `${row.status} ${row.codes} ${row.sdkException} ${row.recovery}`
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <section className="py-4 pb-8">
      <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 gap-4 px-6 lg:grid-cols-[1fr_1.25fr]">
        {/* Connection & Trust Flow */}
        <article className="rounded-[22px] border border-[#E2E5DA] bg-white p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11.5px] font-bold tracking-[0.1em] uppercase text-[#626952]">
              CONNECTION &amp; TRUST ARCHITECTURE
            </span>
            <SoftChip>Non-Sticky ProviderService</SoftChip>
          </div>

          <ol className="m-0 grid list-none gap-3 p-0">
            {TRUST_STEPS.map((item) => (
              <li
                key={item.step}
                className="flex items-start gap-3 rounded-[14px] border border-[#E2E5DA] bg-[#F1F2EC] p-3.5"
              >
                <span className="shrink-0 rounded-lg border border-[#D7DEC7] bg-[#EAEEE0] px-2 py-0.5 font-mono text-xs font-bold text-[#4F5D2F]">
                  {item.step}
                </span>
                <div>
                  <strong className="block text-sm font-bold text-[#1B1E16]">
                    {item.title}
                  </strong>
                  <p className="m-0 mt-0.5 text-[13px] text-[#585E4F]">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-4 border-t border-[#E2E5DA] pt-3.5">
            <span className="mb-2 block text-[11.5px] font-bold tracking-[0.08em] uppercase text-[#626952]">
              Model Lifecycle States (/v1/health)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {MODEL_STATES.map((st) => (
                <span
                  key={st.name}
                  className={cn(
                    "rounded-lg border px-2 py-1 font-mono text-[11px] font-semibold",
                    st.variant === "ready" &&
                      "border-[#C8E2CF] bg-[#DFF0E3] text-[#245F39]",
                    st.variant === "error" &&
                      "border-[#EAD1C8] bg-[#F7E8E3] text-[#B34B32]",
                    st.variant === "default" &&
                      "border-[#E2E5DA] bg-[#F1F2EC] text-[#585E4F]"
                  )}
                >
                  {st.name}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Error Playbook */}
        <article className="rounded-[22px] border border-[#E2E5DA] bg-white p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11.5px] font-bold tracking-[0.1em] uppercase text-[#626952]">
              ERROR RECOVERY PLAYBOOK
            </span>
            <label className="inline-flex items-center gap-2 rounded-full border border-[#CFD5C3] bg-[#FBFBF8] px-3 py-1.5 text-[#585E4F]">
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter 401, 429, 503, queue..."
                aria-label="Filter error codes"
                className="w-44 bg-transparent text-[13px] text-[#1B1E16] placeholder:text-[#626952]/70 focus:outline-none"
              />
            </label>
          </div>

          <div className="max-h-[410px] overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="sticky top-0 bg-white">
                  <th className="border-b border-[#E2E5DA] px-2.5 py-2 text-left text-[11px] font-bold tracking-[0.07em] uppercase text-[#626952]">
                    Status
                  </th>
                  <th className="border-b border-[#E2E5DA] px-2.5 py-2 text-left text-[11px] font-bold tracking-[0.07em] uppercase text-[#626952]">
                    Error Code / Exception
                  </th>
                  <th className="border-b border-[#E2E5DA] px-2.5 py-2 text-left text-[11px] font-bold tracking-[0.07em] uppercase text-[#626952]">
                    Client UI Recovery
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredErrors.map((row) => (
                  <tr
                    key={row.status}
                    className="border-b border-[#E2E5DA] last:border-b-0"
                  >
                    <td className="px-2.5 py-2.5 align-top">
                      <CodePill>{row.status}</CodePill>
                    </td>
                    <td className="px-2.5 py-2.5 align-top text-[#585E4F]">
                      <div className="font-mono text-xs font-semibold text-[#323B1E]">
                        {row.codes}
                      </div>
                      <div className="mt-0.5 font-mono text-[11px] text-[#626952]">
                        {row.sdkException}
                      </div>
                    </td>
                    <td className="px-2.5 py-2.5 align-top text-[#585E4F]">
                      {row.recovery}
                    </td>
                  </tr>
                ))}
                {filteredErrors.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-2.5 py-6 text-center text-sm text-[#585E4F]"
                    >
                      No matching error code for &ldquo;{query}&rdquo;.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </section>
  );
}

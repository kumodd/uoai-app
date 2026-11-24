"use client";

import { ArrowRight, Code2, FileText } from "lucide-react";
import { useState } from "react";
import { MethodTag, VerifiedBadge } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useToast } from "@/components/ui/ToastProvider";
import { API_ENDPOINTS } from "@/data/api-spec";
import { ADB_TEST_COMMANDS } from "@/data/constants";

export function LoopbackApiList() {
  const { copyText } = useToast();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-8">
      <div className="mx-auto w-full max-w-[1020px] px-6">
        <SectionHeader
          eyebrow="LOOPBACK API • HTTP://127.0.0.1:8765/V1"
          icon={<FileText className="h-3.5 w-3.5" />}
          rightSlot={
            <button
              type="button"
              onClick={() => copyText(ADB_TEST_COMMANDS, "ADB curl commands copied")}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#CFD5C3] bg-[#E9ECE2] px-4 py-2 text-[13px] font-semibold text-[#3B4427] transition hover:bg-[#DFE4D6]"
            >
              <span>Copy ADB Test</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          }
        />

        <div className="flex flex-col gap-3">
          {API_ENDPOINTS.map((ep) => {
            const isOpen = Boolean(expanded[ep.id]);
            const drawerId = `endpoint-drawer-${ep.id}`;

            return (
              <article
                key={ep.id}
                className="flex flex-wrap items-center justify-between gap-3.5 rounded-[22px] border border-[#E2E5DA] bg-[#F1F2EC] px-5 py-4 transition hover:bg-[#EAECE4]"
              >
                <div className="flex min-w-[240px] flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <MethodTag method={ep.method} />
                    <code className="font-mono text-[15px] font-bold text-[#1B1E16]">
                      {ep.path}
                    </code>
                    <span className="text-[13.5px] text-[#585E4F]">
                      {ep.summary}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[12.5px] font-medium text-[#585E4F]">
                      {ep.meta}
                    </span>
                    <VerifiedBadge>{ep.badge}</VerifiedBadge>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={drawerId}
                    onClick={() => toggle(ep.id)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#CFD5C3] bg-[#E9ECE2] px-3.5 py-1.5 text-[12.5px] font-semibold text-[#3B4427] transition hover:bg-[#DFE4D6]"
                  >
                    <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{isOpen ? "Hide JSON" : "Inspect JSON"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => copyText(ep.payload, `${ep.path} payload copied`)}
                    className="inline-flex cursor-pointer items-center rounded-full px-3 py-1.5 text-[12.5px] font-semibold text-[#585E4F] transition hover:bg-[#E2E5DA]/60 hover:text-[#1B1E16]"
                  >
                    Copy
                  </button>
                </div>

                {isOpen && (
                  <div id={drawerId} className="w-full pt-2">
                    <CodeBlock
                      code={ep.payload}
                      toastLabel={`${ep.path} payload copied`}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

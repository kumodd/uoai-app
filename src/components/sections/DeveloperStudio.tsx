"use client";

import { Code2 } from "lucide-react";
import { useState } from "react";
import { SoftChip } from "@/components/ui/Badge";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { OFFICIAL_URLS } from "@/data/constants";
import {
  AI_PROMPT_PATH_A,
  AI_PROMPT_PATH_B,
  PATH_A_GRADLE,
  PATH_A_KOTLIN,
  PATH_B_MANIFEST_XML,
  PATH_B_OKHTTP,
  PRE_RELEASE_CHECKLIST,
} from "@/data/developer-guide";
import { cn } from "@/lib/cn";

type DevTab = "path-a" | "path-b" | "prompt";
type PromptVariant = "a" | "b";

export function DeveloperStudio({
  initialTab = "path-a",
}: {
  initialTab?: DevTab;
}) {
  const [activeTab, setActiveTab] = useState<DevTab>(initialTab);
  const [promptVariant, setPromptVariant] = useState<PromptVariant>("a");

  return (
    <section className="py-8">
      <div className="mx-auto w-full max-w-[1020px] px-6">
        <SectionHeader
          eyebrow="DEVELOPER INTEGRATION STUDIO"
          icon={<Code2 className="h-3.5 w-3.5" />}
          rightSlot={
            <div
              className="inline-flex flex-wrap gap-1.5 rounded-full border border-[#E2E5DA] bg-[#F1F2EC] p-1"
              role="tablist"
              aria-label="Integration Paths"
            >
              {(
                [
                  ["path-a", "Path A: Kotlin SDK"],
                  ["path-b", "Path B: Direct HTTP/SSE"],
                  ["prompt", "AI Coding Prompt"],
                ] as const
              ).map(([key, label]) => {
                const active = activeTab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(key)}
                    className={cn(
                      "cursor-pointer rounded-full px-4 py-2 text-[13px] font-semibold transition",
                      active
                        ? "bg-[#4F5D2F] text-[#FAFBF7]"
                        : "text-[#585E4F] hover:text-[#1B1E16]"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          }
        />

        {activeTab === "path-a" && (
          <div
            role="tabpanel"
            className="rounded-[22px] border border-[#E2E5DA] bg-[#F1F2EC] p-6"
          >
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="flex min-w-0 flex-col gap-3">
                <div>
                  <SoftChip className="bg-white">
                    sdk-release.aar (~112 KB) &bull; minSdk 26 &bull; R8-Ready
                  </SoftChip>
                  <h3 className="mt-2 mb-1 text-[17px] font-bold text-[#1B1E16]">
                    Gradle &amp; Signing Setup
                  </h3>
                  <p className="m-0 text-[13.5px] text-[#585E4F]">
                    Auto-merges{" "}
                    <code className="font-mono text-xs">INTERNET</code>,{" "}
                    <code className="font-mono text-xs">&lt;queries&gt;</code>,
                    loopback-only{" "}
                    <code className="font-mono text-xs">
                      uoai_network_security_config
                    </code>
                    , and R8{" "}
                    <code className="font-mono text-xs">consumer-rules.pro</code>.
                    Always separate debug and release{" "}
                    <code className="font-mono text-xs">applicationId</code> to
                    avoid{" "}
                    <code className="font-mono text-xs">
                      certificate_mismatch
                    </code>
                    .
                  </p>
                </div>
                <CodeBlock
                  code={PATH_A_GRADLE}
                  copyLabel="Copy Gradle"
                  toastLabel="Gradle setup copied"
                />
              </div>

              <div className="flex min-w-0 flex-col gap-3">
                <div>
                  <SoftChip className="bg-white">
                    UniversalAIClient &bull; Compose / ViewModel
                  </SoftChip>
                  <h3 className="mt-2 mb-1 text-[17px] font-bold text-[#1B1E16]">
                    Connection, Registration &amp; Streaming
                  </h3>
                  <p className="m-0 text-[13.5px] text-[#585E4F]">
                    Call{" "}
                    <code className="font-mono text-xs">checkConnection()</code>{" "}
                    on startup and{" "}
                    <code className="font-mono text-xs">ON_RESUME</code>.
                    Cancelling the coroutine{" "}
                    <code className="font-mono text-xs">Job</code> calls{" "}
                    <code className="font-mono text-xs">POST /v1/cancel</code>.
                  </p>
                </div>
                <CodeBlock
                  code={PATH_A_KOTLIN}
                  copyLabel="Copy Kotlin"
                  toastLabel="Kotlin integration snippet copied"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "path-b" && (
          <div
            role="tabpanel"
            className="rounded-[22px] border border-[#E2E5DA] bg-[#F1F2EC] p-6"
          >
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="flex min-w-0 flex-col gap-3">
                <div>
                  <SoftChip className="bg-white">
                    Java &bull; OkHttp &bull; Flutter &bull; React Native
                  </SoftChip>
                  <h3 className="mt-2 mb-1 text-[17px] font-bold text-[#1B1E16]">
                    Manifest &amp; Loopback Security XML
                  </h3>
                </div>
                <CodeBlock
                  code={PATH_B_MANIFEST_XML}
                  copyLabel="Copy XML"
                  toastLabel="Manifest & XML config copied"
                />
              </div>

              <div className="flex min-w-0 flex-col gap-3">
                <div>
                  <SoftChip className="bg-white">
                    REGISTER Intent + OkHttp (3s / 300s)
                  </SoftChip>
                  <h3 className="mt-2 mb-1 text-[17px] font-bold text-[#1B1E16]">
                    Registration &amp; Direct HTTP Call
                  </h3>
                </div>
                <CodeBlock
                  code={PATH_B_OKHTTP}
                  copyLabel="Copy Kotlin"
                  toastLabel="OkHttp snippet copied"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "prompt" && (
          <div
            role="tabpanel"
            className="rounded-[22px] border border-[#E2E5DA] bg-[#F1F2EC] p-6"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <SoftChip className="bg-white">
                  Cursor &bull; Claude Code &bull; Antigravity &bull; Gemini &bull; Copilot
                </SoftChip>
                <h3 className="mt-2 mb-0 text-[17px] font-bold text-[#1B1E16]">
                  Ready-to-Paste AI Implementation Prompt
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-full border border-[#CFD5C3] bg-[#E9ECE2] p-1">
                  <button
                    type="button"
                    onClick={() => setPromptVariant("a")}
                    className={cn(
                      "cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition",
                      promptVariant === "a"
                        ? "bg-[#4F5D2F] text-[#FAFBF7]"
                        : "text-[#3B4427]"
                    )}
                  >
                    Path A Prompt (AAR)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPromptVariant("b")}
                    className={cn(
                      "cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition",
                      promptVariant === "b"
                        ? "bg-[#4F5D2F] text-[#FAFBF7]"
                        : "text-[#3B4427]"
                    )}
                  >
                    Path B Prompt (HTTP/SSE)
                  </button>
                </div>

                <a
                  href={OFFICIAL_URLS.aiPrompt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-[#CFD5C3] bg-white px-3.5 py-2 text-xs font-semibold text-[#3B4427] transition hover:bg-[#E9ECE2]"
                >
                  Open Hosted Prompt
                </a>
              </div>
            </div>

            <CodeBlock
              code={promptVariant === "a" ? AI_PROMPT_PATH_A : AI_PROMPT_PATH_B}
              copyLabel="Copy Full Prompt"
              toastLabel={`Path ${promptVariant.toUpperCase()} AI prompt copied`}
              maxHeightClass="max-h-[420px]"
            />
          </div>
        )}

        {/* Pre-Release Checklist */}
        <div className="mt-4 rounded-[22px] border border-[#E2E5DA] bg-white p-6">
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11.5px] font-bold tracking-[0.1em] uppercase text-[#626952]">
              MANDATORY PRE-RELEASE CHECKLIST
            </span>
            <a
              href={OFFICIAL_URLS.developerGuide}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-bold text-[#4F5D2F] hover:underline"
            >
              Read Full Developer Guide &rarr;
            </a>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {PRE_RELEASE_CHECKLIST.map((item) => (
              <div
                key={item.num}
                className="flex items-start gap-2.5 rounded-[14px] bg-[#F1F2EC] p-3.5 text-[13px] text-[#585E4F]"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#DFF0E3] text-[11px] font-extrabold text-[#245F39]"
                >
                  {item.num}
                </span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

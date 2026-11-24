"use client";

import { ChevronRight, Cpu, Keyboard, MessageSquare, Zap } from "lucide-react";
import { useState } from "react";
import { CodePill, SoftChip, VerifiedBadge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/IconTile";
import { PlayStoreButton } from "@/components/ui/PlayStoreButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ECOSYSTEM_APPS } from "@/data/ecosystem";
import { cn } from "@/lib/cn";
import type { EcosystemApp, EcosystemAppKey } from "@/types/uoai";

function AppIcon({ icon }: { icon: EcosystemApp["icon"] }) {
  switch (icon) {
    case "cpu":
      return <Cpu className="h-[22px] w-[22px]" />;
    case "message":
      return <MessageSquare className="h-[22px] w-[22px]" />;
    case "keyboard":
      return <Keyboard className="h-[22px] w-[22px]" />;
  }
}

export function EcosystemSpotlight() {
  const [selectedKey, setSelectedKey] = useState<EcosystemAppKey>("provider");
  const activeApp =
    ECOSYSTEM_APPS.find((item) => item.key === selectedKey) ?? ECOSYSTEM_APPS[0];

  return (
    <section id="products" className="scroll-mt-20 py-7">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <SectionHeader
          eyebrow="THE UOAI PRODUCT SUITE"
          icon={<Zap className="h-3.5 w-3.5" />}
          rightSlot={
            <span className="text-[13px] text-[#585E4F]">
              Select an application to inspect capabilities &amp; privacy guarantees
            </span>
          }
        />

        <div
          className="grid grid-cols-1 gap-4 lg:grid-cols-3"
          role="tablist"
          aria-label="UOAI Ecosystem Applications"
        >
          {ECOSYSTEM_APPS.map((app) => {
            const active = app.key === selectedKey;
            return (
              <button
                key={app.key}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="ecosystem-spotlight-panel"
                onClick={() => setSelectedKey(app.key)}
                className={cn(
                  "flex cursor-pointer items-center gap-4 rounded-[22px] border px-5 py-5 text-left transition",
                  active
                    ? "border-[#4F5D2F] bg-white shadow-[0_4px_16px_rgba(79,93,47,0.08)]"
                    : "border-[#E2E5DA] bg-[#F1F2EC] hover:bg-[#EAECE4]"
                )}
              >
                <IconTile tone={app.tone}>
                  <AppIcon icon={app.icon} />
                </IconTile>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-[10.5px] font-bold tracking-[0.09em] uppercase text-[#626952]">
                    {app.kicker}
                  </span>
                  <span className="text-base font-bold text-[#1B1E16]">
                    {app.title}
                  </span>
                  <span className="truncate text-[13px] text-[#585E4F]">
                    {app.subtitle}
                  </span>
                </span>
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    "h-[18px] w-[18px] shrink-0 transition-transform",
                    active
                      ? "translate-x-0.5 text-[#4F5D2F]"
                      : "text-[#585E4F]"
                  )}
                />
              </button>
            );
          })}
        </div>

        <div
          id="ecosystem-spotlight-panel"
          role="tabpanel"
          aria-live="polite"
          className="mt-4 rounded-[22px] border border-[#E2E5DA] bg-white p-6 shadow-[0_2px_10px_rgba(27,30,22,0.03)]"
        >
          <div className="flex flex-col items-start justify-between gap-5 border-b border-[#E2E5DA] pb-5 md:flex-row">
            <div>
              <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
                <CodePill>{activeApp.pkg}</CodePill>
                <VerifiedBadge>{activeApp.status}</VerifiedBadge>
              </div>
              <h2 className="m-0 mb-1.5 text-[22px] font-extrabold tracking-tight text-[#1B1E16]">
                {activeApp.title}
              </h2>
              <p className="m-0 max-w-[680px] text-[14.5px] text-[#585E4F]">
                {activeApp.summary}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <PlayStoreButton
                href={activeApp.playStoreUrl}
                appName={activeApp.title}
              />
              <a
                href={activeApp.privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-[#CFD5C3] bg-[#E9ECE2] px-4 py-2 text-[13px] font-semibold text-[#3B4427] transition hover:bg-[#DFE4D6]"
              >
                Privacy Policy
              </a>
              <a
                href={activeApp.termsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-[#CFD5C3] bg-[#E9ECE2] px-4 py-2 text-[13px] font-semibold text-[#3B4427] transition hover:bg-[#DFE4D6]"
              >
                Terms of Service
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <h3 className="m-0 mb-3 text-xs font-bold tracking-[0.08em] uppercase text-[#626952]">
                Core Capabilities
              </h3>
              <ul className="m-0 grid list-disc gap-2 pl-5 text-sm text-[#585E4F]">
                {activeApp.features.map((feat) => (
                  <li key={feat}>{feat}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="m-0 mb-3 text-xs font-bold tracking-[0.08em] uppercase text-[#626952]">
                {activeApp.secondaryHeading}
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeApp.chips.map((chip) => (
                  <SoftChip key={chip}>{chip}</SoftChip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

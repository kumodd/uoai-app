"use client";

import Link from "next/link";
import {
  ChevronRight,
  Cpu,
  Keyboard,
  Layers,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { SoftChip, VerifiedBadge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/IconTile";
import { PlayStoreButton } from "@/components/ui/PlayStoreButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PORTFOLIO_APPS, type PortfolioAppItem } from "@/data/marketing";
import { cn } from "@/lib/cn";

function AppIcon({ icon }: { icon: PortfolioAppItem["icon"] }) {
  switch (icon) {
    case "cpu":
      return <Cpu className="h-[22px] w-[22px]" />;
    case "message":
      return <MessageSquare className="h-[22px] w-[22px]" />;
    case "keyboard":
      return <Keyboard className="h-[22px] w-[22px]" />;
  }
}

export function PortfolioSection() {
  const [selected, setSelected] = useState<PortfolioAppItem["key"]>("provider");
  const activeApp =
    PORTFOLIO_APPS.find((item) => item.key === selected) ?? PORTFOLIO_APPS[0];

  return (
    <section id="apps" className="scroll-mt-20 border-t border-[#E6E9DF] py-14">
      <div className="mx-auto w-full max-w-[1020px] px-6">
        <SectionHeader
          eyebrow="UOAI ECOSYSTEM APPS"
          icon={<Layers className="h-3.5 w-3.5" />}
          rightSlot={
            <span className="text-[13px] text-[#585E4F]">
              Select an app to explore
            </span>
          }
        />

        <div
          className="grid grid-cols-1 gap-4 lg:grid-cols-3"
          role="tablist"
          aria-label="UOAI Ecosystem Applications"
        >
          {PORTFOLIO_APPS.map((item) => {
            const active = item.key === selected;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="portfolio-spotlight-panel"
                onClick={() => setSelected(item.key)}
                className={cn(
                  "flex cursor-pointer items-center gap-4 rounded-[22px] border px-5 py-4 text-left transition",
                  active
                    ? "border-[#4F5D2F] bg-white shadow-[0_4px_16px_rgba(79,93,47,0.07)]"
                    : "border-[#E2E5DA] bg-[#F1F2EC] hover:bg-[#EAECE4]"
                )}
              >
                <IconTile tone={item.tone}>
                  <AppIcon icon={item.icon} />
                </IconTile>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-[10.5px] font-bold tracking-[0.09em] uppercase text-[#626952]">
                    {item.kicker}
                  </span>
                  <span className="text-base font-bold text-[#1B1E16]">
                    {item.title}
                  </span>
                  <span className="truncate text-[13px] text-[#585E4F]">
                    {item.subtitle}
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
          id="portfolio-spotlight-panel"
          role="tabpanel"
          aria-live="polite"
          className="mt-4 rounded-[22px] border border-[#E2E5DA] bg-white p-6 sm:p-7"
        >
          <div className="flex flex-col items-start justify-between gap-4 border-b border-[#E6E9DF] pb-5 md:flex-row md:items-center">
            <div className="max-w-xl">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <VerifiedBadge>{activeApp.status}</VerifiedBadge>
              </div>
              <h2 className="m-0 mb-1.5 text-[22px] font-extrabold tracking-tight text-[#1B1E16]">
                {activeApp.title}
              </h2>
              <p className="m-0 text-[14.5px] text-[#585E4F]">
                {activeApp.summary}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2.5">
              <PlayStoreButton
                href={activeApp.playStoreUrl}
                appName={activeApp.title}
              />
              <Link
                href={activeApp.brdHref}
                className="inline-flex items-center rounded-full border border-[#CFD5C3] bg-[#E9ECE2] px-4 py-2 text-[13px] font-semibold text-[#3B4427] transition hover:bg-[#DFE4D6]"
              >
                Read BRD
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <h3 className="m-0 mb-2.5 text-[11.5px] font-bold tracking-[0.08em] uppercase text-[#626952]">
                Key Highlights
              </h3>
              <ul className="m-0 grid list-disc gap-2 pl-5 text-sm text-[#585E4F]">
                {activeApp.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="m-0 mb-2.5 text-[11.5px] font-bold tracking-[0.08em] uppercase text-[#626952]">
                {activeApp.chipsHeading}
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeApp.chips.map((chip) => (
                  <SoftChip key={chip}>{chip}</SoftChip>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1 text-[13.5px] text-[#585E4F]">
          <span>
            <strong className="text-[#1B1E16]">Developer Integration Suite:</strong>{" "}
            Build your own offline Android app powered by UOAI Provider.
          </span>
          <Link
            href="/developers"
            className="font-semibold text-[#4F5D2F] hover:underline"
          >
            Open Developer Portal &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

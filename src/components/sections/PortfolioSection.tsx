"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Cpu,
  Keyboard,
  Layers,
  MessageSquare,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { SoftChip, VerifiedBadge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/IconTile";
import { PlayStoreButton } from "@/components/ui/PlayStoreButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/data/marketing";
import { cn } from "@/lib/cn";

function PortfolioIcon({ icon }: { icon: PortfolioItem["icon"] }) {
  switch (icon) {
    case "cpu":
      return <Cpu className="h-[22px] w-[22px]" />;
    case "message":
      return <MessageSquare className="h-[22px] w-[22px]" />;
    case "keyboard":
      return <Keyboard className="h-[22px] w-[22px]" />;
    case "wrench":
      return <Wrench className="h-[22px] w-[22px]" />;
  }
}

export function PortfolioSection() {
  const [selected, setSelected] = useState<PortfolioItem["key"]>("provider");
  const activeItem =
    PORTFOLIO_ITEMS.find((item) => item.key === selected) ?? PORTFOLIO_ITEMS[0];

  return (
    <section id="ecosystem-portfolio" className="scroll-mt-20 py-7">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <SectionHeader
          eyebrow="3. UOAI ECOSYSTEM PORTFOLIO"
          icon={<Layers className="h-3.5 w-3.5" />}
          rightSlot={
            <span className="text-[13px] text-[#585E4F]">
              Select any product or suite component to view its role &amp;
              capabilities
            </span>
          }
        />

        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          role="tablist"
          aria-label="UOAI Ecosystem Portfolio"
        >
          {PORTFOLIO_ITEMS.map((item) => {
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
                  "flex cursor-pointer items-center gap-3.5 rounded-[22px] border px-4 py-4 text-left transition",
                  active
                    ? "border-[#4F5D2F] bg-white shadow-[0_4px_16px_rgba(79,93,47,0.08)]"
                    : "border-[#E2E5DA] bg-[#F1F2EC] hover:bg-[#EAECE4]"
                )}
              >
                <IconTile tone={item.tone} className="h-11 w-11">
                  <PortfolioIcon icon={item.icon} />
                </IconTile>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-[10px] font-bold tracking-[0.09em] uppercase text-[#626952]">
                    {item.kicker}
                  </span>
                  <span className="text-[15px] font-bold text-[#1B1E16]">
                    {item.title}
                  </span>
                  <span className="truncate text-xs text-[#585E4F]">
                    {item.subtitle}
                  </span>
                </span>
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform",
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
          className="mt-4 rounded-[22px] border border-[#E2E5DA] bg-white p-6 shadow-[0_2px_10px_rgba(27,30,22,0.03)]"
        >
          <div className="flex flex-col items-start justify-between gap-4 border-b border-[#E2E5DA] pb-5 md:flex-row">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2.5">
                <SoftChip>{activeItem.kicker}</SoftChip>
                <VerifiedBadge>{activeItem.status}</VerifiedBadge>
              </div>
              <h2 className="m-0 mb-1.5 text-[22px] font-extrabold tracking-tight text-[#1B1E16]">
                {activeItem.title}
              </h2>
              <p className="m-0 max-w-[680px] text-[14.5px] text-[#585E4F]">
                {activeItem.summary}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {activeItem.playStoreUrl && (
                <PlayStoreButton
                  href={activeItem.playStoreUrl}
                  appName={activeItem.title}
                />
              )}
              <Link
                href={activeItem.actionHref}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#CFD5C3] bg-[#E9ECE2] px-4 py-2 text-[13px] font-semibold text-[#3B4427] transition hover:bg-[#DFE4D6]"
              >
                <span>{activeItem.actionLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <h3 className="m-0 mb-3 text-xs font-bold tracking-[0.08em] uppercase text-[#626952]">
                Key Highlights
              </h3>
              <ul className="m-0 grid list-disc gap-2 pl-5 text-sm text-[#585E4F]">
                {activeItem.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="m-0 mb-3 text-xs font-bold tracking-[0.08em] uppercase text-[#626952]">
                {activeItem.chipsHeading}
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeItem.chips.map((chip) => (
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

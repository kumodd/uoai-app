"use client";

import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { CodePill, VerifiedBadge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PRIVACY_APPS } from "@/data/privacy";
import { cn } from "@/lib/cn";
import type { EcosystemAppKey } from "@/types/uoai";

export function PrivacySafetyHub() {
  const [selectedKey, setSelectedKey] = useState<EcosystemAppKey>("provider");
  const active =
    PRIVACY_APPS.find((item) => item.key === selectedKey) ?? PRIVACY_APPS[0];

  return (
    <section className="py-7">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <SectionHeader
          eyebrow="PRIVACY & GOOGLE PLAY DATA SAFETY HUB"
          icon={<ShieldCheck className="h-3.5 w-3.5" />}
          rightSlot={
            <div
              className="inline-flex flex-wrap gap-1.5 rounded-full border border-[#E2E5DA] bg-[#F1F2EC] p-1"
              role="tablist"
              aria-label="Privacy Policy App Selector"
            >
              {PRIVACY_APPS.map((item) => {
                const isSelected = item.key === selectedKey;
                return (
                  <button
                    key={item.key}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedKey(item.key)}
                    className={cn(
                      "cursor-pointer rounded-full px-4 py-2 text-[13px] font-semibold transition",
                      isSelected
                        ? "bg-[#4F5D2F] text-[#FAFBF7]"
                        : "text-[#585E4F] hover:text-[#1B1E16]"
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          }
        />

        <div
          role="tabpanel"
          aria-live="polite"
          className="rounded-[22px] border border-[#E2E5DA] bg-white p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E5DA] pb-4">
            <div className="flex flex-wrap items-center gap-3">
              <CodePill>{active.pkg}</CodePill>
              <span className="text-[13px] font-medium text-[#585E4F]">
                {active.effectiveDate}
              </span>
            </div>
            <VerifiedBadge>
              COPPA &amp; GDPR Compliant &bull; Zero Ads / Analytics
            </VerifiedBadge>
          </div>

          <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
            <div>
              <h3 className="m-0 mb-3 text-xs font-bold tracking-[0.08em] uppercase text-[#626952]">
                Google Play Console Data Safety Matrix
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr>
                      <th className="border-b border-[#E2E5DA] px-2.5 py-2 text-left text-[11px] font-bold tracking-[0.07em] uppercase text-[#626952]">
                        Play Console Question
                      </th>
                      <th className="border-b border-[#E2E5DA] px-2.5 py-2 text-left text-[11px] font-bold tracking-[0.07em] uppercase text-[#626952]">
                        Answer
                      </th>
                      <th className="border-b border-[#E2E5DA] px-2.5 py-2 text-left text-[11px] font-bold tracking-[0.07em] uppercase text-[#626952]">
                        Technical Basis
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {active.safetyRows.map((row) => (
                      <tr
                        key={row.question}
                        className="border-b border-[#E2E5DA] last:border-b-0"
                      >
                        <td className="px-2.5 py-2.5 align-top font-medium text-[#1B1E16]">
                          {row.question}
                        </td>
                        <td className="px-2.5 py-2.5 align-top">
                          <VerifiedBadge>{row.answer}</VerifiedBadge>
                        </td>
                        <td className="px-2.5 py-2.5 align-top text-[#585E4F]">
                          {row.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="m-0 mb-3 text-xs font-bold tracking-[0.08em] uppercase text-[#626952]">
                Minimal Android Permissions
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr>
                      <th className="border-b border-[#E2E5DA] px-2.5 py-2 text-left text-[11px] font-bold tracking-[0.07em] uppercase text-[#626952]">
                        Permission / Contract
                      </th>
                      <th className="border-b border-[#E2E5DA] px-2.5 py-2 text-left text-[11px] font-bold tracking-[0.07em] uppercase text-[#626952]">
                        Type
                      </th>
                      <th className="border-b border-[#E2E5DA] px-2.5 py-2 text-left text-[11px] font-bold tracking-[0.07em] uppercase text-[#626952]">
                        Justification
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {active.permissionRows.map((perm) => (
                      <tr
                        key={perm.permission}
                        className="border-b border-[#E2E5DA] last:border-b-0"
                      >
                        <td className="px-2.5 py-2.5 align-top font-mono text-xs font-semibold text-[#323B1E]">
                          {perm.permission}
                        </td>
                        <td className="px-2.5 py-2.5 align-top whitespace-nowrap text-[#585E4F]">
                          {perm.type}
                        </td>
                        <td className="px-2.5 py-2.5 align-top text-[#585E4F]">
                          {perm.justification}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#E2E5DA] pt-4">
            <ul className="m-0 grid list-disc gap-1 pl-5 text-[13px] text-[#585E4F]">
              {active.deletionControls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="flex shrink-0 gap-2">
              <a
                href={active.privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-[#CFD5C3] bg-[#E9ECE2] px-4 py-2 text-xs font-semibold text-[#3B4427] transition hover:bg-[#DFE4D6]"
              >
                Official Policy
              </a>
              <a
                href={active.termsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-[#CFD5C3] bg-[#E9ECE2] px-4 py-2 text-xs font-semibold text-[#3B4427] transition hover:bg-[#DFE4D6]"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

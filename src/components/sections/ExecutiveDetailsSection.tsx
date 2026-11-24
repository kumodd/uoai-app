"use client";

import Link from "next/link";
import { ArrowRight, Check, Compass, MinusCircle } from "lucide-react";
import { useState } from "react";
import { VerifiedBadge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  SCOPE_IN,
  SCOPE_OUT,
  STAKEHOLDER_PERSONAS,
  VALUE_PROPOSITIONS,
} from "@/data/marketing";
import { cn } from "@/lib/cn";

type DetailTab = "value" | "audience" | "scope";

export function ExecutiveDetailsSection() {
  const [tab, setTab] = useState<DetailTab>("value");

  return (
    <section className="border-t border-[#E6E9DF] py-14">
      <div className="mx-auto w-full max-w-[1020px] px-6">
        <SectionHeader
          eyebrow="EXECUTIVE SUMMARY DETAILS"
          icon={<Compass className="h-3.5 w-3.5" />}
          rightSlot={
            <div
              className="inline-flex flex-wrap gap-1 rounded-full border border-[#E2E5DA] bg-[#F1F2EC] p-1"
              role="tablist"
              aria-label="Executive Summary Perspectives"
            >
              {(
                [
                  ["value", "Value Proposition"],
                  ["audience", "Who It's For"],
                  ["scope", "Scope Boundaries"],
                ] as const
              ).map(([key, label]) => {
                const active = tab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(key)}
                    className={cn(
                      "cursor-pointer rounded-full px-4 py-1.5 text-[13px] font-semibold transition",
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

        <div
          role="tabpanel"
          aria-live="polite"
          className="rounded-[22px] border border-[#E2E5DA] bg-white p-6 sm:p-8"
        >
          {tab === "value" && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {VALUE_PROPOSITIONS.map((group) => (
                <div key={group.id} className="flex flex-col justify-between gap-5">
                  <div>
                    <span className="block text-[11px] font-bold tracking-[0.09em] uppercase text-[#4F5D2F]">
                      {group.eyebrow}
                    </span>
                    <h3 className="m-0 mt-1 mb-4 text-xl font-extrabold tracking-tight text-[#1B1E16]">
                      {group.title}
                    </h3>
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

                  <div>
                    <Link
                      href={group.ctaHref}
                      className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#4F5D2F] hover:underline"
                    >
                      <span>{group.ctaLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "audience" && (
            <div className="divide-y divide-[#E6E9DF]">
              {STAKEHOLDER_PERSONAS.map((persona) => (
                <div
                  key={persona.id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0"
                >
                  <div className="max-w-2xl">
                    <h3 className="m-0 text-[15px] font-bold text-[#1B1E16]">
                      {persona.role}
                    </h3>
                    <p className="m-0 mt-0.5 text-[13.5px] text-[#585E4F]">
                      {persona.needs}
                    </p>
                  </div>
                  <VerifiedBadge>{persona.badge}</VerifiedBadge>
                </div>
              ))}
            </div>
          )}

          {tab === "scope" && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <span className="block text-[11px] font-bold tracking-[0.09em] uppercase text-[#245F39]">
                  INCLUDED IN UOAI PROVIDER
                </span>
                <h3 className="m-0 mt-1 mb-4 text-xl font-extrabold tracking-tight text-[#1B1E16]">
                  What the shared engine handles
                </h3>
                <ul className="m-0 grid list-none gap-3 p-0">
                  {SCOPE_IN.map((item) => (
                    <li
                      key={item.title}
                      className="flex items-start gap-2.5 text-sm text-[#585E4F]"
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
              </div>

              <div>
                <span className="block text-[11px] font-bold tracking-[0.09em] uppercase text-[#8F6520]">
                  HANDLED OUTSIDE PROVIDER
                </span>
                <h3 className="m-0 mt-1 mb-4 text-xl font-extrabold tracking-tight text-[#1B1E16]">
                  Client-owned or prohibited
                </h3>
                <ul className="m-0 grid list-none gap-3 p-0">
                  {SCOPE_OUT.map((item) => (
                    <li
                      key={item.title}
                      className="flex items-start gap-2.5 text-sm text-[#585E4F]"
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
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

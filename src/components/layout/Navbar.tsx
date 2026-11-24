"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Code2,
  Cpu,
  LayoutGrid,
  Menu,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/", label: "Overview", icon: LayoutGrid },
  { href: "/api-reference", label: "API Spec", icon: Code2 },
  { href: "/developers", label: "Developers", icon: Terminal },
  { href: "/privacy", label: "Privacy", icon: ShieldCheck },
  { href: "/docs", label: "BRD Docs", icon: BookOpen },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#E2E5DA] bg-[#FBFBF8]/92 backdrop-blur-md">
      <div className="mx-auto flex min-h-[70px] w-full max-w-[1120px] items-center justify-between gap-5 px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-3 no-underline"
          aria-label="Universal Offline AI Home"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#4F5D2F] text-[#FAFBF7]"
          >
            <Cpu className="h-5 w-5" />
          </span>
          <span className="flex flex-col">
            <span className="text-[15px] leading-tight font-bold tracking-tight text-[#1B1E16]">
              Universal Offline AI
            </span>
            <span className="text-[11px] font-medium text-[#626952]">
              100% On-Device AI
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary Navigation">
          {NAV_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-semibold transition-colors",
                  isActive(item.href)
                    ? "text-[#4F5D2F]"
                    : "text-[#585E4F] hover:text-[#1B1E16]"
                )}
              >
                <Icon className="h-[15px] w-[15px] shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <Link
            href="/developers?tab=prompt"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#4F5D2F] px-4 py-2 text-[13px] font-semibold text-[#FAFBF7] transition hover:bg-[#3E4A24]"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Get AI Prompt
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav-drawer"
          aria-label="Toggle navigation menu"
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[12px] border border-[#E2E5DA] bg-[#F1F2EC] text-[#1B1E16] md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-[#E2E5DA] bg-[#FBFBF8] px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "inline-flex items-center gap-2 py-1 text-sm font-semibold",
                    isActive(item.href) ? "text-[#4F5D2F]" : "text-[#1B1E16]"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <Link
                href="/developers?tab=prompt"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#4F5D2F] px-4 py-2 text-[13px] font-semibold text-[#FAFBF7]"
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Get AI Prompt
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

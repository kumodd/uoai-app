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
    <header className="sticky top-0 z-40 border-b border-[#E6E9DF] bg-[#FBFBF8]/92 backdrop-blur-md">
      <div className="mx-auto flex min-h-[68px] w-full max-w-[1020px] items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 no-underline"
          aria-label="Universal Offline AI Home"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#4F5D2F] text-[#FAFBF7]"
          >
            <Cpu className="h-[18px] w-[18px]" />
          </span>
          <span className="text-[15px] font-bold tracking-tight text-[#1B1E16]">
            Universal Offline AI
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1.5 md:flex"
          aria-label="Primary Navigation"
        >
          {NAV_LINKS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13.5px] font-semibold transition-colors",
                  active
                    ? "bg-[#EAEEE0] text-[#4F5D2F]"
                    : "text-[#585E4F] hover:bg-[#F1F2EC] hover:text-[#1B1E16]"
                )}
              >
                <Icon
                  className={cn(
                    "h-3.5 w-3.5 shrink-0",
                    active ? "opacity-100" : "opacity-70"
                  )}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center md:flex">
          <Link
            href="/developers"
            className="inline-flex items-center justify-center rounded-full bg-[#4F5D2F] px-4 py-2 text-[13px] font-semibold text-[#FAFBF7] transition hover:bg-[#3E4A24]"
          >
            Get Started
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
          className="border-t border-[#E6E9DF] bg-[#FBFBF8] px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold",
                    active
                      ? "bg-[#EAEEE0] text-[#4F5D2F]"
                      : "text-[#1B1E16]"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 opacity-75" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/developers"
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-full bg-[#4F5D2F] px-4 py-2 text-[13px] font-semibold text-[#FAFBF7]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

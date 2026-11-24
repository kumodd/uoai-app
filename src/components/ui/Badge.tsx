import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function VerifiedBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[#C8E2CF] bg-[#DFF0E3] px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-[#245F39]",
        className
      )}
    >
      <Check className="h-3.5 w-3.5 shrink-0 stroke-[2.5]" aria-hidden="true" />
      {children}
    </span>
  );
}

export function CodePill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#D7DEC7] bg-[#EAEEE0] px-2.5 py-1 font-mono text-xs font-semibold text-[#4F5D2F]",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SoftChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#E2E5DA] bg-[#F1F2EC] px-3 py-1 text-xs font-semibold text-[#585E4F]",
        className
      )}
    >
      {children}
    </span>
  );
}

export function MethodTag({ method }: { method: "GET" | "POST" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider",
        method === "GET"
          ? "bg-[#E1F0E5] text-[#2B6A42]"
          : "bg-[#EAEEE0] text-[#4F5D2F]"
      )}
    >
      {method}
    </span>
  );
}

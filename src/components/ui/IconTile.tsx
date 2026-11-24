import type { TileTone } from "@/types/uoai";
import { cn } from "@/lib/cn";

const TONE_STYLES: Record<TileTone, string> = {
  olive: "bg-[#EAEEE0] border-[#D7DEC7] text-[#4F5D2F]",
  mint: "bg-[#E1F0E5] border-[#C7E1CE] text-[#2B6A42]",
  sand: "bg-[#F6EFE0] border-[#E8D9BC] text-[#8F6520]",
  terracotta: "bg-[#F7E8E3] border-[#EAD1C8] text-[#B34B32]",
};

export function IconTile({
  tone,
  children,
  className,
}: {
  tone: TileTone;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border",
        TONE_STYLES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

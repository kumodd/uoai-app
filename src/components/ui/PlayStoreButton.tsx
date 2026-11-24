import { Play } from "lucide-react";
import { cn } from "@/lib/cn";

export function PlayStoreButton({
  href,
  appName,
  className,
}: {
  href: string;
  appName: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download ${appName} on Google Play`}
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-[#4F5D2F] px-4 py-2 text-[13px] font-semibold text-[#FAFBF7] transition hover:bg-[#3E4A24]",
        className
      )}
    >
      <Play className="h-3.5 w-3.5 shrink-0 fill-current" aria-hidden="true" />
      <span>Download on Google Play</span>
    </a>
  );
}

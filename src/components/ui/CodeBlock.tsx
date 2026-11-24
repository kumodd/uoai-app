"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";
import { cn } from "@/lib/cn";

export function CodeBlock({
  code,
  copyLabel = "Copy",
  toastLabel = "Code snippet copied",
  className,
  maxHeightClass,
}: {
  code: string;
  copyLabel?: string;
  toastLabel?: string;
  className?: string;
  maxHeightClass?: string;
}) {
  const { copyText } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyText(code, toastLabel);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#454D39] bg-[#303628] px-3 py-1 text-xs font-semibold text-[#EEF1E6] transition hover:bg-[#3D4533]"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-[#A7DFB9]" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        <span>{copied ? "Copied" : copyLabel}</span>
      </button>
      <pre
        className={cn(
          "overflow-x-auto rounded-[14px] bg-[#23271D] p-4 pr-24 font-mono text-[12.5px] leading-[1.6] text-[#EEF1E6]",
          maxHeightClass
        )}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

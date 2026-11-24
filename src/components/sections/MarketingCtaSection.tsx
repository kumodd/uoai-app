import Link from "next/link";
import { BookOpen, ShieldCheck, Sparkles } from "lucide-react";

export function MarketingCtaSection() {
  return (
    <section className="border-t border-[#E6E9DF] py-14">
      <div className="mx-auto flex w-full max-w-[1020px] flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
        <div>
          <h2 className="m-0 mb-1.5 text-2xl font-extrabold tracking-tight text-[#1B1E16]">
            Explore documentation &amp; compliance
          </h2>
          <p className="m-0 text-[14.5px] text-[#585E4F]">
            Read the full BRD suite, inspect privacy disclosures, or start
            integrating into your Android app.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-full bg-[#4F5D2F] px-5 py-2.5 text-sm font-semibold text-[#FAFBF7] transition hover:bg-[#3E4A24]"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            BRD Suite
          </Link>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-2 rounded-full border border-[#CFD5C3] bg-[#E9ECE2] px-4 py-2.5 text-sm font-semibold text-[#3B4427] transition hover:bg-[#DFE4D6]"
          >
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Privacy Hub
          </Link>
          <Link
            href="/developers"
            className="inline-flex items-center gap-2 rounded-full border border-[#CFD5C3] bg-[#E9ECE2] px-4 py-2.5 text-sm font-semibold text-[#3B4427] transition hover:bg-[#DFE4D6]"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Developers
          </Link>
        </div>
      </div>
    </section>
  );
}

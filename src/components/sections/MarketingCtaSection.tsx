import Link from "next/link";
import { BookOpen, ShieldCheck, Sparkles } from "lucide-react";

export function MarketingCtaSection() {
  return (
    <section className="pt-4 pb-10">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[22px] border border-[#CFD5C3] bg-white p-7 shadow-[0_2px_10px_rgba(27,30,22,0.03)] md:flex-row md:items-center">
          <div className="max-w-xl">
            <span className="block text-[11px] font-bold tracking-[0.09em] uppercase text-[#4F5D2F]">
              CONTINUE EXPLORING
            </span>
            <h2 className="m-0 mt-1.5 mb-2 text-2xl font-extrabold tracking-tight text-[#1B1E16]">
              Want the full specifications or ready to integrate?
            </h2>
            <p className="m-0 text-[14.5px] text-[#585E4F]">
              Browse the complete Business Requirements Documentation suite,
              review Google Play privacy disclosures, or jump into our
              developer onboarding guides.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-full bg-[#4F5D2F] px-5 py-3 text-sm font-semibold text-[#FAFBF7] transition hover:bg-[#3E4A24]"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Browse BRD Suite
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 rounded-full border border-[#CFD5C3] bg-[#E9ECE2] px-4 py-3 text-sm font-semibold text-[#3B4427] transition hover:bg-[#DFE4D6]"
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Privacy Hub
            </Link>
            <Link
              href="/developers"
              className="inline-flex items-center gap-2 rounded-full border border-[#CFD5C3] bg-[#E9ECE2] px-4 py-3 text-sm font-semibold text-[#3B4427] transition hover:bg-[#DFE4D6]"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Developers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

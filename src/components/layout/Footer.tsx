import Link from "next/link";
import { OFFICIAL_URLS, SITE_META } from "@/data/constants";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-[#E6E9DF] bg-[#F1F2EC] py-10">
      <div className="mx-auto flex w-full max-w-[1020px] flex-wrap items-start justify-between gap-8 px-6">
        <div className="max-w-sm space-y-1.5">
          <strong className="text-[15px] font-bold text-[#1B1E16]">
            Universal Offline AI (UOAI)
          </strong>
          <p className="text-[13px] text-[#585E4F]">
            100% On-Device &bull; Zero Cloud &bull; Zero Tracking
          </p>
          <p className="text-[13px] text-[#585E4F]">
            &copy; 2026 Universal Offline AI &bull;{" "}
            <a
              href={`mailto:${SITE_META.contactEmail}`}
              className="font-semibold text-[#4F5D2F] hover:underline"
            >
              {SITE_META.contactEmail}
            </a>
          </p>
        </div>

        <div className="flex flex-wrap gap-12">
          <div className="flex flex-col gap-1.5 text-[13px]">
            <h4 className="mb-1 text-[11px] font-bold tracking-[0.08em] uppercase text-[#626952]">
              Policies
            </h4>
            <a
              href={OFFICIAL_URLS.privacyHub}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#585E4F] hover:text-[#4F5D2F] hover:underline"
            >
              Privacy Hub
            </a>
            <a
              href={OFFICIAL_URLS.combinedPrivacy}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#585E4F] hover:text-[#4F5D2F] hover:underline"
            >
              Ecosystem Privacy Policy
            </a>
            <a
              href={OFFICIAL_URLS.ecosystemTerms}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#585E4F] hover:text-[#4F5D2F] hover:underline"
            >
              Terms of Service
            </a>
          </div>

          <div className="flex flex-col gap-1.5 text-[13px]">
            <h4 className="mb-1 text-[11px] font-bold tracking-[0.08em] uppercase text-[#626952]">
              Resources
            </h4>
            <Link href="/api-reference" className="text-[#585E4F] hover:text-[#4F5D2F] hover:underline">
              API Reference
            </Link>
            <Link href="/developers" className="text-[#585E4F] hover:text-[#4F5D2F] hover:underline">
              Developer Guide
            </Link>
            <Link href="/docs" className="text-[#585E4F] hover:text-[#4F5D2F] hover:underline">
              BRD Suite
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

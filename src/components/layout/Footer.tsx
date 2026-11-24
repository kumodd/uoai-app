import Link from "next/link";
import { OFFICIAL_URLS, SITE_META } from "@/data/constants";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-[#E2E5DA] bg-[#F1F2EC] py-10">
      <div className="mx-auto flex w-full max-w-[1120px] flex-wrap justify-between gap-8 px-6">
        <div className="max-w-md space-y-2">
          <strong className="text-base font-bold text-[#1B1E16]">
            Universal Offline AI (UOAI)
          </strong>
          <p className="text-[13px] text-[#585E4F]">
            100% On-Device &bull; Zero Cloud &bull; Zero Tracking &bull; &copy; 2026 Universal Offline AI. All rights reserved.
          </p>
          <p className="text-[13px] text-[#585E4F]">
            Contact:{" "}
            <a
              href={`mailto:${SITE_META.contactEmail}`}
              className="font-semibold text-[#4F5D2F] hover:underline"
            >
              {SITE_META.contactEmail}
            </a>
          </p>
        </div>

        <div className="flex flex-wrap gap-10">
          <div className="flex flex-col gap-1.5 text-[13px]">
            <h4 className="mb-1 text-[11.5px] font-bold tracking-[0.08em] uppercase text-[#626952]">
              Policies &amp; Terms
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
              Combined Privacy Policy
            </a>
            <a
              href={OFFICIAL_URLS.ecosystemTerms}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#585E4F] hover:text-[#4F5D2F] hover:underline"
            >
              Ecosystem Terms
            </a>
          </div>

          <div className="flex flex-col gap-1.5 text-[13px]">
            <h4 className="mb-1 text-[11.5px] font-bold tracking-[0.08em] uppercase text-[#626952]">
              Applications
            </h4>
            <a
              href={OFFICIAL_URLS.providerPrivacy}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#585E4F] hover:text-[#4F5D2F] hover:underline"
            >
              UOAI Provider Policy
            </a>
            <a
              href={OFFICIAL_URLS.chatPrivacy}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#585E4F] hover:text-[#4F5D2F] hover:underline"
            >
              UOAI Chat Policy
            </a>
            <a
              href={OFFICIAL_URLS.keyboardPrivacy}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#585E4F] hover:text-[#4F5D2F] hover:underline"
            >
              UOAI Keyboard Policy
            </a>
          </div>

          <div className="flex flex-col gap-1.5 text-[13px]">
            <h4 className="mb-1 text-[11.5px] font-bold tracking-[0.08em] uppercase text-[#626952]">
              Workspace Routes
            </h4>
            <Link href="/api-reference" className="text-[#585E4F] hover:text-[#4F5D2F] hover:underline">
              Loopback API Spec
            </Link>
            <Link href="/developers" className="text-[#585E4F] hover:text-[#4F5D2F] hover:underline">
              SDK &amp; AI Prompts
            </Link>
            <Link href="/docs" className="text-[#585E4F] hover:text-[#4F5D2F] hover:underline">
              BRD Documentation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

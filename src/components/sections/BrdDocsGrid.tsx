import Link from "next/link";
import { BookOpen } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAllBrdDocs } from "@/lib/brd";

export async function BrdDocsGrid() {
  const docs = await getAllBrdDocs();

  return (
    <section className="py-8">
      <div className="mx-auto w-full max-w-[1020px] px-6">
        <SectionHeader
          eyebrow="BUSINESS REQUIREMENTS DOCUMENTATION (BRD SUITE)"
          icon={<BookOpen className="h-3.5 w-3.5" />}
          rightSlot={
            <Link
              href="/docs"
              className="inline-flex items-center rounded-full border border-[#CFD5C3] bg-[#E9ECE2] px-4 py-2 text-[13px] font-semibold text-[#3B4427] transition hover:bg-[#DFE4D6]"
            >
              Open BRD Hub
            </Link>
          }
        />

        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              className="flex flex-col gap-1.5 rounded-[22px] border border-[#E2E5DA] bg-[#F1F2EC] p-5 no-underline transition hover:border-[#CFD5C3] hover:bg-[#EAECE4]"
            >
              <span className="font-mono text-xs font-bold text-[#4F5D2F]">
                {doc.num}
              </span>
              <h3 className="m-0 text-base font-bold text-[#1B1E16]">
                {doc.title}
              </h3>
              <p className="m-0 text-[13px] text-[#585E4F]">{doc.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

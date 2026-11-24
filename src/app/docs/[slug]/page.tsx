import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodePill } from "@/components/ui/Badge";
import { getAllBrdDocs, getBrdDocBySlug } from "@/lib/brd";

export async function generateStaticParams() {
  const docs = await getAllBrdDocs();
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getBrdDocBySlug(slug);
  if (!doc) return { title: "Document Not Found" };
  return {
    title: `${doc.num} — ${doc.title}`,
    description: doc.summary,
  };
}

export default async function BrdDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [doc, allDocs] = await Promise.all([
    getBrdDocBySlug(slug),
    getAllBrdDocs(),
  ]);

  if (!doc) notFound();

  const currentIdx = allDocs.findIndex((d) => d.slug === doc.slug);
  const prevDoc = currentIdx > 0 ? allDocs[currentIdx - 1] : null;
  const nextDoc =
    currentIdx >= 0 && currentIdx < allDocs.length - 1
      ? allDocs[currentIdx + 1]
      : null;

  return (
    <section className="py-10">
      <div className="mx-auto w-full max-w-[1020px] px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-full border border-[#CFD5C3] bg-[#E9ECE2] px-4 py-2 text-[13px] font-semibold text-[#3B4427] transition hover:bg-[#DFE4D6]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All BRD Documents
          </Link>
          <div className="inline-flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#4F5D2F]" aria-hidden="true" />
            <CodePill>docs/brd/{doc.filename}</CodePill>
          </div>
        </div>

        <article className="rounded-[22px] border border-[#E2E5DA] bg-white p-6 sm:p-9">
          <div className="brd-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {doc.content}
            </ReactMarkdown>
          </div>
        </article>

        <nav
          aria-label="BRD Document Pagination"
          className="mt-6 flex flex-wrap items-center justify-between gap-4"
        >
          {prevDoc ? (
            <Link
              href={`/docs/${prevDoc.slug}`}
              className="rounded-[18px] border border-[#E2E5DA] bg-[#F1F2EC] px-5 py-3.5 text-sm font-semibold text-[#1B1E16] transition hover:bg-[#EAECE4]"
            >
              &larr; {prevDoc.num} — {prevDoc.title}
            </Link>
          ) : (
            <span />
          )}
          {nextDoc && (
            <Link
              href={`/docs/${nextDoc.slug}`}
              className="rounded-[18px] border border-[#E2E5DA] bg-[#F1F2EC] px-5 py-3.5 text-sm font-semibold text-[#1B1E16] transition hover:bg-[#EAECE4]"
            >
              {nextDoc.num} — {nextDoc.title} &rarr;
            </Link>
          )}
        </nav>
      </div>
    </section>
  );
}

import fs from "node:fs/promises";
import path from "node:path";
import type { BrdDocFull, BrdDocMeta } from "@/types/uoai";

const BRD_DIR = path.join(process.cwd(), "docs", "brd");

const BRD_CATALOG: Omit<BrdDocMeta, "filename">[] = [
  {
    slug: "01-executive-summary-and-ecosystem",
    num: "01",
    title: "Executive Summary & Ecosystem",
    summary:
      "Business problem, 100% on-device commitments, stakeholder personas, portfolio overview, and explicit scope boundaries.",
  },
  {
    slug: "02-uoai-provider-functional-requirements",
    num: "02",
    title: "Provider Functional Requirements",
    summary:
      "FR-PRV-001 through FR-PRV-010: model formats, lifecycle states, ProviderService, OS registration pinning, queuing, and tool calling.",
  },
  {
    slug: "03-technical-architecture-and-api-spec",
    num: "03",
    title: "Architecture & API Specification",
    summary:
      "IPC trust sequence, strict 127.0.0.1:8765 loopback security, Keystore auth, full /v1/* REST & SSE specs, NFRs, and error playbook.",
  },
  {
    slug: "04-developer-integration-and-sdk-requirements",
    num: "04",
    title: "Developer Integration & SDK",
    summary:
      "External handover deliverables, Path A Kotlin AAR SDK, Path B Direct HTTP/SSE, AI prompts, ADB debugging, and pre-release checklist.",
  },
  {
    slug: "05-privacy-security-and-play-compliance",
    num: "05",
    title: "Privacy & Play Compliance",
    summary:
      "Local sandbox storage boundaries, minimal Android permissions, Google Play Data Safety matrices, user controls, COPPA & GDPR.",
  },
  {
    slug: "06-companion-client-apps-requirements",
    num: "06",
    title: "Companion Client Apps",
    summary:
      "UOAI Chat on-device SAF document intelligence and UOAI Keyboard offline IME with 13 Gemma AI writing & reply modes.",
  },
];

export async function getAllBrdDocs(): Promise<BrdDocMeta[]> {
  const entries = await fs.readdir(BRD_DIR);
  const mdFiles = new Set(entries.filter((f) => f.endsWith(".md")));

  return BRD_CATALOG.filter((item) => mdFiles.has(`${item.slug}.md`)).map(
    (item) => ({
      ...item,
      filename: `${item.slug}.md`,
    })
  );
}

export async function getBrdDocBySlug(
  slug: string
): Promise<BrdDocFull | null> {
  const meta = BRD_CATALOG.find((item) => item.slug === slug);
  if (!meta) return null;

  const filePath = path.join(BRD_DIR, `${slug}.md`);
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return {
      ...meta,
      filename: `${slug}.md`,
      content,
    };
  } catch {
    return null;
  }
}

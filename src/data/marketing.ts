import type { TileTone } from "@/types/uoai";
import { OFFICIAL_URLS } from "@/data/constants";

export interface CoreCommitmentCard {
  id: string;
  value: string;
  label: string;
  description: string;
  tone: TileTone;
  icon: "cpu" | "cloudOff" | "userCheck" | "shieldOff";
}

export interface ProblemCard {
  id: string;
  kicker: string;
  title: string;
  description: string;
  tone: TileTone;
  icon: "hardDrive" | "batteryWarning" | "puzzle";
}

export interface SolutionPillar {
  title: string;
  detail: string;
}

export interface ValuePropositionGroup {
  id: "users" | "builders";
  eyebrow: string;
  title: string;
  summary: string;
  items: { heading: string; detail: string }[];
  ctaLabel: string;
  ctaHref: string;
}

export interface PortfolioItem {
  key: "provider" | "chat" | "keyboard" | "toolkit";
  kicker: string;
  title: string;
  subtitle: string;
  status: string;
  summary: string;
  tone: TileTone;
  icon: "cpu" | "message" | "keyboard" | "wrench";
  highlights: string[];
  chipsHeading: string;
  chips: string[];
  actionLabel: string;
  actionHref: string;
  playStoreUrl?: string;
  external?: boolean;
}

export interface StakeholderPersona {
  id: string;
  role: string;
  needs: string;
  badge: string;
  tone: TileTone;
}

export interface ScopeItem {
  title: string;
  detail: string;
}

export const CORE_COMMITMENTS: CoreCommitmentCard[] = [
  {
    id: "on-device",
    value: "100%",
    label: "ON-DEVICE EXECUTION",
    description:
      "All model loading, text generation, and document processing run strictly on your physical device.",
    tone: "olive",
    icon: "cpu",
  },
  {
    id: "zero-cloud",
    value: "Zero",
    label: "CLOUD INFERENCE",
    description:
      "UOAI operates no remote AI servers. Prompts, attachments, keystrokes, and replies never leave your phone.",
    tone: "mint",
    icon: "cloudOff",
  },
  {
    id: "zero-accounts",
    value: "Zero",
    label: "ACCOUNTS & TRACKING",
    description:
      "No user registration, no cloud sync, no behavioral analytics, no telemetry, and no device tracking.",
    tone: "sand",
    icon: "userCheck",
  },
  {
    id: "zero-ads",
    value: "Zero",
    label: "ADS & TRACKERS",
    description:
      "No advertising networks, banners, marketing trackers, or third-party crash reporters.",
    tone: "terracotta",
    icon: "shieldOff",
  },
];

export const PROBLEM_CARDS: ProblemCard[] = [
  {
    id: "storage-bloat",
    kicker: "STORAGE BLOAT",
    title: "Every app duplicating huge AI models",
    description:
      "When individual Android apps bundle or download massive AI model files on their own, mobile storage fills up rapidly.",
    tone: "terracotta",
    icon: "hardDrive",
  },
  {
    id: "ram-strain",
    kicker: "MEMORY & BATTERY STRAIN",
    title: "Crashes and device overheating",
    description:
      "Android apps cannot directly share raw memory, so multiple apps loading separate AI engines cause memory exhaustion and thermal throttling.",
    tone: "sand",
    icon: "batteryWarning",
  },
  {
    id: "integration-friction",
    kicker: "FRAGMENTED EXPERIENCE",
    title: "High friction for app builders",
    description:
      "App teams face heavy complexity trying to embed, secure, and maintain private offline AI runtimes inside every separate product.",
    tone: "olive",
    icon: "puzzle",
  },
];

export const SOLUTION_PILLARS: SolutionPillar[] = [
  {
    title: "Shared local utility",
    detail:
      "UOAI Provider manages open-source AI model downloads once and hosts a single loaded model in device memory.",
  },
  {
    title: "Runs in one place",
    detail:
      "Approved companion and third-party apps on the same phone share that single local engine without duplicating storage or memory.",
  },
  {
    title: "User-controlled access",
    detail:
      "Each client app requires explicit user approval and can be toggled or revoked anytime directly on your device.",
  },
  {
    title: "Always private & offline",
    detail:
      "Designed from the ground up with zero cloud servers, zero accounts, and zero external data uploads.",
  },
];

export const VALUE_PROPOSITIONS: ValuePropositionGroup[] = [
  {
    id: "users",
    eyebrow: "FOR END USERS",
    title: "Absolute privacy sovereignty & efficiency.",
    summary:
      "Enjoy modern AI assistance across your favorite mobile workflows without surrendering personal documents, drafts, or identity.",
    items: [
      {
        heading: "Absolute Privacy Sovereignty",
        detail:
          "Full control over local models, approved client apps, and instant one-tap data deletion.",
      },
      {
        heading: "Resource Efficiency",
        detail:
          "Download and load an open-source Gemma model once in UOAI Provider, then share it across UOAI Chat, UOAI Keyboard, and approved apps.",
      },
      {
        heading: "True Offline Availability",
        detail:
          "Full AI capabilities on airplanes, in low-connectivity zones, or in air-gapped environments.",
      },
    ],
    ctaLabel: "Read Privacy Commitments",
    ctaHref: "/privacy",
  },
  {
    id: "builders",
    eyebrow: "FOR APP TEAMS & BUILDERS",
    title: "Lightweight apps with guided onboarding.",
    summary:
      "Deliver offline AI features without inflating app size or building custom on-device runtime plumbing from scratch.",
    items: [
      {
        heading: "Zero Model Bundling",
        detail:
          "Ship lightweight Android apps with zero massive AI model files packed inside the app download.",
      },
      {
        heading: "Flexible Integration Paths",
        detail:
          "Supports native Android teams as well as cross-platform mobile teams through clear integration pathways.",
      },
      {
        heading: "AI-Assisted Onboarding",
        detail:
          "Step-by-step developer documentation and ready-to-paste prompts tailored for popular AI coding assistants.",
      },
    ],
    ctaLabel: "Explore Developer Portal",
    ctaHref: "/developers",
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    key: "provider",
    kicker: "SHARED LOCAL ENGINE",
    title: "UOAI Provider",
    subtitle: "Hosts open-source Gemma models once in memory",
    status: "Core Ecosystem Utility",
    summary:
      "Acts as the shared on-device AI engine and background service on Android. Manages local open-source Gemma models in memory and enforces user-approved access for client apps.",
    tone: "olive",
    icon: "cpu",
    highlights: [
      "Downloads open-source models only when initiated by the user, or imports local files",
      "Hosts one shared model in memory to prevent storage bloat and crashes across apps",
      "Provides a permanent notification with a quick Stop control whenever active",
      "Lets users inspect, manage, or revoke approved apps anytime",
    ],
    chipsHeading: "Core Role",
    chips: [
      "Shared Local Engine",
      "User-Approved Access",
      "Zero Cloud Servers",
      "Instant Data Wipe",
    ],
    actionLabel: "View Provider Overview",
    actionHref: "/docs/02-uoai-provider-functional-requirements",
    playStoreUrl: OFFICIAL_URLS.providerPlayStore,
  },
  {
    key: "chat",
    kicker: "PRIVATE AI ASSISTANT",
    title: "UOAI Chat",
    subtitle: "Private conversations & offline document reading",
    status: "100% Offline Conversations",
    summary:
      "A standalone, lightweight conversational AI assistant and document intelligence client powered locally by UOAI Provider with zero cloud sync.",
    tone: "mint",
    icon: "message",
    highlights: [
      "Keeps chat turns and system prompts strictly in local device memory",
      "Reads PDF, Word, Excel, PowerPoint, text, code, and log files entirely on-device",
      "Uses Android's scoped system file picker so it never browses your private storage",
      "Includes an instant New Chat button that wipes active messages and attachments immediately",
    ],
    chipsHeading: "Supported Offline Workflows",
    chips: [
      "Markdown Conversations",
      "PDF & Office Reading",
      "Scoped File Picker",
      "Instant New Chat Wipe",
    ],
    actionLabel: "Read Companion Apps BRD",
    actionHref: "/docs/06-companion-client-apps-requirements",
    playStoreUrl: OFFICIAL_URLS.chatPlayStore,
  },
  {
    key: "keyboard",
    kicker: "OFFLINE WRITING KEYBOARD",
    title: "UOAI Keyboard",
    subtitle: "Free, ad-free keyboard with 13 AI writing modes",
    status: "Zero Keystroke Logging",
    summary:
      "A fast, modern, 100% offline and ad-free Android keyboard featuring multilingual layouts, themes, mechanical sounds, clipboard history, offline voice typing, and on-device AI writing tools.",
    tone: "sand",
    icon: "keyboard",
    highlights: [
      "Never transmits keystrokes, typed drafts, clipboard items, or voice audio externally",
      "Automatically pauses word learning, clipboard recording, and AI tools in password and incognito fields",
      "Includes multilingual layouts, curated themes, mechanical sounds, quick templates, and local backup",
      "100% free and ad-free with all advertising identifiers removed",
    ],
    chipsHeading: "13 On-Device Writing & Reply Modes",
    chips: [
      "Grammar Fix",
      "Polish & Clarity",
      "Humanize",
      "Enhance Prompt",
      "Professional Email",
      "Formal",
      "Polite",
      "Casual",
      "Direct",
      "Shorter",
      "Bullets",
      "Summary",
      "Smart Reply",
    ],
    actionLabel: "Read Companion Apps BRD",
    actionHref: "/docs/06-companion-client-apps-requirements",
    playStoreUrl: OFFICIAL_URLS.keyboardPlayStore,
  },
  {
    key: "toolkit",
    kicker: "APP MAKER TOOLKIT",
    title: "Developer Integration Suite",
    subtitle: "Lightweight integration kit, guides & AI prompts",
    status: "External Handover Ready",
    summary:
      "Everything independent Android and cross-platform teams need to adopt UOAI Provider cleanly without bundling model weights inside their apps.",
    tone: "terracotta",
    icon: "wrench",
    highlights: [
      "Lightweight integration kit with zero bundled model weights",
      "Hosted step-by-step handover documentation and pre-release checklists",
      "Ready-to-paste prompts for Cursor, Claude Code, Antigravity, Gemini, and Copilot",
      "Clear user-approval and recovery patterns built in",
    ],
    chipsHeading: "Included Deliverables",
    chips: [
      "Developer Handover Guide",
      "Native & Cross-Platform Paths",
      "AI Assistant Prompts",
      "Pre-Release Checklist",
    ],
    actionLabel: "Open Developer Portal",
    actionHref: "/developers",
  },
];

export const STAKEHOLDER_PERSONAS: StakeholderPersona[] = [
  {
    id: "users",
    role: "Privacy-Conscious Android Users",
    needs:
      "Transparent local-only guarantees, zero cloud uploads, easy one-tap revocation of client apps, and simple model storage cleanup.",
    badge: "Full Sovereignty",
    tone: "olive",
  },
  {
    id: "companion-teams",
    role: "First-Party Companion App Teams",
    needs:
      "Responsive local streaming, automatic active-model routing, and graceful recovery across UOAI Chat and UOAI Keyboard.",
    badge: "Chat & Keyboard",
    tone: "mint",
  },
  {
    id: "third-party-devs",
    role: "Third-Party Android Developers",
    needs:
      "Drop-in integration kit or standard local interface, clear error guidance, and predictable release compatibility without bundling models.",
    badge: "Zero Weight Bundling",
    tone: "sand",
  },
  {
    id: "enterprise",
    role: "Enterprise & Device Administrators",
    needs:
      "Predictable app distribution, verified client identity pinning, and auditable zero external data egress.",
    badge: "Zero Data Egress",
    tone: "olive",
  },
  {
    id: "play-reviewers",
    role: "Google Play Store Compliance Reviewers",
    needs:
      "Accurate Data Safety disclosures (no data collected, shared, or transferred externally), minimal permissions, and zero ad/tracking SDKs.",
    badge: "Data Safety Verified",
    tone: "mint",
  },
];

export const SCOPE_IN: ScopeItem[] = [
  {
    title: "Local model management",
    detail:
      "Private on-device storage, user-initiated open-source model downloads or local imports, and one-tap model deletion.",
  },
  {
    title: "On-device Gemma text inference",
    detail:
      "Conversational AI generation running locally on device hardware across supported Gemma model tiers.",
  },
  {
    title: "Approved client sharing & governance",
    detail:
      "One-time verified app registration, per-app permission toggles, and instant revocation from the Clients tab.",
  },
  {
    title: "Safe helper tools & metadata-only logs",
    detail:
      "Support for approved helper tools and optional usage summaries (timestamps, counts, latency) without ever saving prompt text.",
  },
];

export const SCOPE_OUT: ScopeItem[] = [
  {
    title: "Voice dictation & audio capture",
    detail:
      "Handled locally inside client apps (such as UOAI Keyboard's offline voice typing) rather than inside UOAI Provider.",
  },
  {
    title: "Conversation storage & document reading",
    detail:
      "Client apps (such as UOAI Chat) own chat state, scoped file selection, and local PDF/Office text extraction.",
  },
  {
    title: "Embeddings & multimodal vision inputs",
    detail:
      "Outside the current text-focused provider scope and handled separately if required by an app.",
  },
  {
    title: "Cloud fallback or account sync",
    detail:
      "Strictly prohibited across the entire UOAI ecosystem by our zero-cloud privacy architecture.",
  },
];

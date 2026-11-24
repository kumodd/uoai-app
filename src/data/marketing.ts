import type { TileTone } from "@/types/uoai";
import { OFFICIAL_URLS } from "@/data/constants";

export interface CoreCommitmentCard {
  id: string;
  value: string;
  label: string;
  tone: TileTone;
  icon: "cpu" | "cloudOff" | "userCheck" | "shieldOff";
}

export interface ProblemItem {
  id: string;
  title: string;
  description: string;
  tone: TileTone;
  icon: "hardDrive" | "batteryWarning" | "puzzle";
}

export interface PortfolioAppItem {
  key: "provider" | "chat" | "keyboard";
  kicker: string;
  title: string;
  subtitle: string;
  status: string;
  summary: string;
  tone: TileTone;
  icon: "cpu" | "message" | "keyboard";
  highlights: string[];
  chipsHeading: string;
  chips: string[];
  playStoreUrl: string;
  brdHref: string;
}

export interface ValuePropositionGroup {
  id: "users" | "builders";
  eyebrow: string;
  title: string;
  items: { heading: string; detail: string }[];
  ctaLabel: string;
  ctaHref: string;
}

export interface StakeholderPersona {
  id: string;
  role: string;
  needs: string;
  badge: string;
}

export interface ScopeItem {
  title: string;
  detail: string;
}

export const CORE_COMMITMENTS: CoreCommitmentCard[] = [
  {
    id: "on-device",
    value: "100%",
    label: "ON-DEVICE",
    tone: "olive",
    icon: "cpu",
  },
  {
    id: "zero-cloud",
    value: "Zero",
    label: "CLOUD SERVERS",
    tone: "mint",
    icon: "cloudOff",
  },
  {
    id: "zero-accounts",
    value: "Zero",
    label: "ACCOUNTS",
    tone: "sand",
    icon: "userCheck",
  },
  {
    id: "zero-ads",
    value: "Zero",
    label: "ADS & TRACKERS",
    tone: "terracotta",
    icon: "shieldOff",
  },
];

export const PROBLEM_ITEMS: ProblemItem[] = [
  {
    id: "storage-bloat",
    title: "Storage bloat",
    description:
      "Apps bundling separate multi-gigabyte AI models quickly exhaust phone storage.",
    tone: "terracotta",
    icon: "hardDrive",
  },
  {
    id: "ram-strain",
    title: "Memory & battery strain",
    description:
      "Separate in-app AI engines compete for device memory, causing slowdowns and crashes.",
    tone: "sand",
    icon: "batteryWarning",
  },
  {
    id: "integration-friction",
    title: "Builder friction",
    description:
      "App makers face heavy complexity maintaining offline AI inside every standalone app.",
    tone: "olive",
    icon: "puzzle",
  },
];

export const SOLUTION_STATEMENT = {
  title: "One shared local AI engine for your entire phone",
  description:
    "UOAI Provider hosts a single open-source Gemma model once in local memory and shares it privately with approved apps—giving you offline intelligence without duplicate storage, cloud uploads, or background tracking.",
};

export const PORTFOLIO_APPS: PortfolioAppItem[] = [
  {
    key: "provider",
    kicker: "SHARED ENGINE",
    title: "UOAI Provider",
    subtitle: "Hosts local Gemma models once",
    status: "Core Ecosystem Utility",
    summary:
      "A shared local system utility that stores open-source Gemma models once in memory and serves approved apps safely offline.",
    tone: "olive",
    icon: "cpu",
    highlights: [
      "Downloads open-source models only when you choose, or imports local files",
      "Prevents storage duplication and crashes across multiple AI-enabled apps",
      "Gives you one-tap approval, revocation, and an instant Stop control",
    ],
    chipsHeading: "Core Guarantees",
    chips: [
      "Shared Local Engine",
      "User-Approved Access",
      "Zero Cloud Servers",
      "Instant Data Wipe",
    ],
    playStoreUrl: OFFICIAL_URLS.providerPlayStore,
    brdHref: "/docs/02-uoai-provider-functional-requirements",
  },
  {
    key: "chat",
    kicker: "AI ASSISTANT",
    title: "UOAI Chat",
    subtitle: "Private chat & document reading",
    status: "100% Offline Conversations",
    summary:
      "A standalone private conversational assistant and offline document reader powered locally by UOAI Provider with zero cloud sync.",
    tone: "mint",
    icon: "message",
    highlights: [
      "Reads PDF, Word, Excel, PowerPoint, text, code, and logs entirely on-device",
      "Uses Android's scoped system picker without browsing your private folders",
      "Instant New Chat button clears active messages and attachments immediately",
    ],
    chipsHeading: "Offline Workflows",
    chips: [
      "Markdown Chat",
      "PDF & Office Reading",
      "Scoped File Picker",
      "Instant New Chat Wipe",
    ],
    playStoreUrl: OFFICIAL_URLS.chatPlayStore,
    brdHref: "/docs/06-companion-client-apps-requirements",
  },
  {
    key: "keyboard",
    kicker: "OFFLINE IME",
    title: "UOAI Keyboard",
    subtitle: "Ad-free keyboard with 13 AI modes",
    status: "Zero Keystroke Logging",
    summary:
      "A fast, free, ad-free offline Android keyboard with multilingual layouts, clipboard history, offline voice typing, and 13 writing tools.",
    tone: "sand",
    icon: "keyboard",
    highlights: [
      "Auto-pauses word learning, clipboard history, and AI in password & incognito fields",
      "Multilingual layouts, curated themes, mechanical sounds, and local backup",
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
    playStoreUrl: OFFICIAL_URLS.keyboardPlayStore,
    brdHref: "/docs/06-companion-client-apps-requirements",
  },
];

export const VALUE_PROPOSITIONS: ValuePropositionGroup[] = [
  {
    id: "users",
    eyebrow: "FOR END USERS",
    title: "Privacy sovereignty without compromise",
    items: [
      {
        heading: "Absolute Privacy",
        detail:
          "Full control over local models, approved client apps, and instant data deletion.",
      },
      {
        heading: "Resource Efficiency",
        detail:
          "Load a Gemma model once in UOAI Provider and share it across Chat, Keyboard, and approved apps.",
      },
      {
        heading: "True Offline Freedom",
        detail:
          "Full AI assistance on airplanes, commutes, and air-gapped environments.",
      },
    ],
    ctaLabel: "Privacy Hub",
    ctaHref: "/privacy",
  },
  {
    id: "builders",
    eyebrow: "FOR APP TEAMS",
    title: "Lightweight apps, zero model bundling",
    items: [
      {
        heading: "Tiny App Footprints",
        detail:
          "Ship lightweight Android apps without packing multi-gigabyte model files inside.",
      },
      {
        heading: "Flexible Integration",
        detail:
          "Clean onboarding paths for native Android and cross-platform mobile teams.",
      },
      {
        heading: "AI-Assisted Setup",
        detail:
          "Handover guides and ready-to-paste prompts for popular AI coding assistants.",
      },
    ],
    ctaLabel: "Developer Portal",
    ctaHref: "/developers",
  },
];

export const STAKEHOLDER_PERSONAS: StakeholderPersona[] = [
  {
    id: "users",
    role: "Privacy-Conscious Android Users",
    needs:
      "Local-only guarantees, zero cloud uploads, one-tap app revocation, and easy storage cleanup.",
    badge: "Full Sovereignty",
  },
  {
    id: "companion-teams",
    role: "Companion App Teams",
    needs:
      "Responsive local streaming and smooth recovery powering UOAI Chat and UOAI Keyboard.",
    badge: "Chat & Keyboard",
  },
  {
    id: "third-party-devs",
    role: "Third-Party App Builders",
    needs:
      "Drop-in integration and predictable release compatibility without bundling heavy models.",
    badge: "Zero Weight Bundling",
  },
  {
    id: "enterprise",
    role: "Enterprise & Device Administrators",
    needs:
      "Predictable app distribution and verifiable zero external data egress.",
    badge: "Zero Data Egress",
  },
  {
    id: "play-reviewers",
    role: "App Store Privacy Reviewers",
    needs:
      "Clear Data Safety disclosures (no data collected or shared) and zero advertising trackers.",
    badge: "Data Safety Verified",
  },
];

export const SCOPE_IN: ScopeItem[] = [
  {
    title: "Local model management",
    detail: "User-initiated open-source model downloads, local imports, and deletion.",
  },
  {
    title: "On-device Gemma text AI",
    detail: "Conversational generation running locally on device hardware.",
  },
  {
    title: "Approved app sharing",
    detail: "One-time verified registration, permission toggles, and instant revocation.",
  },
  {
    title: "Safe tools & usage counts",
    detail: "Helper tools and optional metadata-only summaries without saving prompt text.",
  },
];

export const SCOPE_OUT: ScopeItem[] = [
  {
    title: "Voice & audio capture",
    detail: "Handled locally inside companion apps like UOAI Keyboard.",
  },
  {
    title: "Chat history & file reading",
    detail: "Owned privately by client apps such as UOAI Chat.",
  },
  {
    title: "Vision & vector search",
    detail: "Outside the current text-focused provider scope.",
  },
  {
    title: "Cloud fallback or accounts",
    detail: "Strictly prohibited across the entire UOAI ecosystem.",
  },
];

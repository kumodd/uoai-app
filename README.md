# Universal Offline AI (UOAI) Provider — Next.js Portal & BRD Suite

| Field | Value |
| :--- | :--- |
| **Document Version** | `1.0` |
| **Date** | `2026-11-24` |
| **Owner** | UOAI Project Team |
| **Contact** | [support@uoai.app](mailto:support@uoai.app) |
| **Primary Package** | `com.uoai.provider` |
| **Source Repository** | [github.com/kumodd/privacy-policy](https://github.com/kumodd/privacy-policy) |

---

## Executive Overview

**Core Commitment:** **100% On-Device • Zero Cloud • Zero Tracking**

The Universal Offline AI (UOAI) ecosystem ensures that all model loading, AI generation, and document processing happen entirely on the user's physical Android device (CPU, GPU, NPU). **UOAI Provider** (`com.uoai.provider`) acts as a shared, local system utility and on-device AI inference engine. Instead of forcing every Android application to bundle multi-gigabyte Large Language Model (LLM) weights and exhaust device RAM, UOAI Provider hosts a single loaded Gemma 3 / Gemma 4 model in memory and exposes a standardized, OpenAI-compatible loopback HTTP/SSE API (`http://127.0.0.1:8765/v1`) to approved client applications on the same device.

---

## Next.js Web Portal Quickstart

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Production build
npm run start    # Production server
```

### Project Structure

```text
├── docs/brd/                        # Source BRD Markdown documents (01..06)
└── src/
    ├── app/                         # Next.js 15 App Router pages (/, /api-reference, /developers, /privacy, /docs, /docs/[slug])
    ├── components/
    │   ├── layout/                  # Navbar, Footer
    │   ├── sections/                # HeroStudio, EcosystemSpotlight, LoopbackApiList, TrustFlowAndErrors, DeveloperStudio, PrivacySafetyHub, BrdDocsGrid
    │   └── ui/                      # ToastProvider, Badge, IconTile, SectionHeader, CodeBlock
    ├── data/                        # Typed ecosystem, API, developer guide, and privacy datasets
    ├── lib/                         # Server-side BRD Markdown loader & className utilities
    └── types/                       # Shared TypeScript interfaces
```

---

## BRD Documentation Suite (Table of Contents)

| Document | Summary |
| :--- | :--- |
| [01 — Executive Summary & Ecosystem Overview](docs/brd/01-executive-summary-and-ecosystem.md) | Business problem, core commitments, value proposition, UOAI portfolio (`com.uoai.provider`, `com.uoai.chat`, `com.uoai.keyboard`), stakeholders, and scope boundaries. |
| [02 — UOAI Provider Functional Requirements](docs/brd/02-uoai-provider-functional-requirements.md) | Detailed functional requirements (`FR-PRV-001` to `FR-PRV-010`) covering model management, hardware acceleration, lifecycle states, `ProviderService`, OS-verified registration, client governance, queuing, streaming/cancellation, tool calling, and metadata-only audit logging. |
| [03 — Technical Architecture & API Specification](docs/brd/03-technical-architecture-and-api-spec.md) | IPC trust flow, strict loopback networking (`127.0.0.1:8765`), Keystore security, full `/v1/*` OpenAI-compatible REST & SSE endpoint reference, tool calling payloads, NFRs, and error recovery playbook. |
| [04 — Developer Integration & SDK Requirements](docs/brd/04-developer-integration-and-sdk-requirements.md) | External handover deliverables, Path A (`sdk-release.aar` Kotlin SDK, R8/ProGuard, signing rules, ViewModel/Compose sample), Path B (Direct HTTP/SSE / OkHttp), AI coding assistant prompts, ADB debugging, and pre-release checklist. |
| [05 — Privacy, Security & Google Play Compliance](docs/brd/05-privacy-security-and-play-compliance.md) | Privacy-by-architecture guarantees, local sandbox storage boundaries, Android permissions & technical justifications, Google Play Console Data Safety matrices for all 3 apps, user deletion controls, and COPPA/GDPR compliance. |
| [06 — Companion Client Apps Requirements](docs/brd/06-companion-client-apps-requirements.md) | Functional and privacy requirements for first-party companion clients: **UOAI Chat** (`com.uoai.chat`) with on-device document extraction and **UOAI Keyboard** (`com.uoai.keyboard`) with 13 offline AI writing & reply modes. |

---

## Quick-Reference Key Constants (`com.uoai.provider`)

| Property | Value |
| :--- | :--- |
| **Provider Package ID** | `com.uoai.provider` |
| **Registration Intent Action** | `com.uoai.provider.action.REGISTER` |
| **Loopback Base URL** | `http://127.0.0.1:8765/v1` (strict loopback only; never `0.0.0.0`) |
| **Authentication Header** | `Authorization: Bearer uoai_<token>` (all `/v1/*` endpoints except `/v1/health`) |
| **Recommended `model` Value** | `"auto"` (routes automatically to whichever Gemma 3 or Gemma 4 model is loaded) |
| **Max Request Size** | `2,097,152` bytes (2 MiB; `HTTP 413` if exceeded) |
| **Context & Output Token Cap** | Up to `32,768` tokens (`effective = min(request.max_tokens, client_cap, 32768)`) |
| **Generation Timeout** | `300,000` ms (`300` s; `HTTP 504` or mid-stream error event) |
| **Concurrency & Queue** | `1` active generation shared across apps; queue `16` global / `4` per client |
| **Supported Capabilities** | `chat`, `streaming` (SSE), `cancellation`, `tool-calling` (`embeddings = false`) |

---

## Official Directory & External Links

- **Privacy Hub:** [https://kumodd.github.io/privacy-policy/index.html](https://kumodd.github.io/privacy-policy/index.html)
- **Developer Integration Guide:** [https://kumodd.github.io/privacy-policy/developer-guide/](https://kumodd.github.io/privacy-policy/developer-guide/)
- **AI Implementation Prompt:** [https://kumodd.github.io/privacy-policy/ai-prompt/](https://kumodd.github.io/privacy-policy/ai-prompt/)
- **Combined Ecosystem Privacy Policy (All Apps):** [https://kumodd.github.io/privacy-policy/privacy-policy.html](https://kumodd.github.io/privacy-policy/privacy-policy.html)
- **Ecosystem Terms of Service (All Apps):** [https://kumodd.github.io/privacy-policy/terms/](https://kumodd.github.io/privacy-policy/terms/)
- **UOAI Provider (`com.uoai.provider`):**
  - Privacy Policy: [https://kumodd.github.io/privacy-policy/uoai-provider/](https://kumodd.github.io/privacy-policy/uoai-provider/)
  - Terms of Service: [https://kumodd.github.io/privacy-policy/uoai-provider/terms/](https://kumodd.github.io/privacy-policy/uoai-provider/terms/)
  - Direct HTML: [https://kumodd.github.io/privacy-policy/policies/uoai-provider.html](https://kumodd.github.io/privacy-policy/policies/uoai-provider.html)
- **UOAI Chat (`com.uoai.chat`):**
  - Privacy Policy: [https://kumodd.github.io/privacy-policy/uoai-chat/](https://kumodd.github.io/privacy-policy/uoai-chat/)
  - Terms of Service: [https://kumodd.github.io/privacy-policy/uoai-chat/terms/](https://kumodd.github.io/privacy-policy/uoai-chat/terms/)
  - Direct HTML: [https://kumodd.github.io/privacy-policy/policies/uoai-chat.html](https://kumodd.github.io/privacy-policy/policies/uoai-chat.html)
- **UOAI Keyboard (`com.uoai.keyboard`):**
  - Privacy Policy: [https://kumodd.github.io/privacy-policy/uoai-keyboard/](https://kumodd.github.io/privacy-policy/uoai-keyboard/)
  - Terms of Service: [https://kumodd.github.io/privacy-policy/uoai-keyboard/terms/](https://kumodd.github.io/privacy-policy/uoai-keyboard/terms/)
  - Direct HTML: [https://kumodd.github.io/privacy-policy/policies/uoai-keyboard.html](https://kumodd.github.io/privacy-policy/policies/uoai-keyboard.html)
- **Source Repository:** [https://github.com/kumodd/privacy-policy](https://github.com/kumodd/privacy-policy)
- **Contact:** [support@uoai.app](mailto:support@uoai.app)

© 2026 Universal Offline AI (UOAI). All rights reserved.

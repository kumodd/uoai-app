# 01 — Executive Summary & Ecosystem Overview

| Control Field | Detail |
| :--- | :--- |
| **Document ID** | `UOAI-BRD-01` |
| **Status** | Approved Baseline (`v1.0`) |
| **Developer / Owner** | UOAI Project Team |
| **Effective Dates** | UOAI Provider & UOAI Chat: `2026-11-21` • UOAI Keyboard: `2026-11-23` |
| **Contact** | [support@uoai.app](mailto:support@uoai.app) |

---

## 1. Business Context & Problem Statement

Modern Android users increasingly want private, offline generative AI capabilities—such as summarizing documents, rewriting messages, and holding multi-turn conversations—without sending sensitive personal data to remote cloud servers.

However, embedding Large Language Models (LLMs) directly inside every individual Android application creates severe technical and user-experience bottlenecks:
1. **Storage Bloat:** Bundling or downloading multi-gigabyte model weights per app rapidly exhausts mobile flash storage.
2. **RAM Exhaustion:** Android apps cannot directly share raw process memory, so multiple AI-enabled apps loading separate model instances cause out-of-memory (OOM) crashes and thermal throttling.
3. **Fragmented Integration & Security:** Third-party developers face high friction integrating native LLM runtimes (LiteRT-LM, MediaPipe, GGUF) and configuring R8/ProGuard, signing verification, and lifecycle management.

**Solution:** **Universal Offline AI (UOAI) Provider (`com.uoai.provider`)** acts as a shared, local system utility on Android. It manages model downloads, hosts a single loaded Gemma 3 / Gemma 4 model in device memory, and exposes a standardized, OpenAI-compatible HTTP/SSE loopback API (`http://127.0.0.1:8765/v1`) secured by OS-verified app registration and Android Keystore cryptographic tokens.

---

## 2. Core Product Commitment

The entire UOAI ecosystem is governed by four non-negotiable architectural commitments:

- **100% On-Device Execution:** All model loading, token generation, and client document/text processing run strictly on the physical device hardware (CPU, GPU, NPU).
- **Zero Cloud Inference:** UOAI operates no remote inference servers. Prompts, system instructions, attachments, keystrokes, and completions never leave the device.
- **Zero Accounts & Zero Tracking:** No user registration, no cloud sync, no behavioral analytics, no telemetry, and no device identifier tracking.
- **Zero Advertising SDKs:** No AdMob, `AD_ID`, banners, marketing trackers, or third-party crash reporters (e.g., Sentry, Crashlytics, Bugsnag).

---

## 3. Business Objectives & Value Proposition

### For End Users
- **Absolute Privacy Sovereignty:** Full control over local models, authorized client apps, and instant data deletion.
- **Resource Efficiency:** Download and load a Gemma model once in `com.uoai.provider`, then share it across UOAI Chat, UOAI Keyboard, and any approved third-party Android app.
- **Offline Availability:** Full AI functionality on airplanes, in low-connectivity environments, or in strict air-gapped contexts (after optional user-initiated open-source model download).

### For Android & Cross-Platform Developers
- **Zero Model Bundling:** Ship lightweight APKs/AABs with zero `.task`, `.litertlm`, or `.bin` weight files inside the app bundle.
- **Flexible Integration Paths:** Choose **Path A** (`sdk-release.aar`, ~112 KB Kotlin SDK with Keystore encryption and Compose-ready `StateFlow`/`Flow` APIs) or **Path B** (Direct HTTP/SSE for Java, OkHttp/Ktor, Flutter, or React Native).
- **AI-Assisted Onboarding:** Ready-to-paste implementation prompts tailored for Cursor, Claude Code, Antigravity, Gemini, and GitHub Copilot.

---

## 4. UOAI Ecosystem Portfolio

| Component / App | Package / Identifier | Role & Key Capabilities |
| :--- | :--- | :--- |
| **UOAI Provider** | `com.uoai.provider` | Shared on-device AI inference engine & persistent local background service. Hosts Gemma 3 / Gemma 4 models in memory, enforces OS-verified client authorization, and serves `http://127.0.0.1:8765/v1`. |
| **UOAI Chat** | `com.uoai.chat` | Private conversational AI assistant and document intelligence client. Queries UOAI Provider over loopback; performs 100% on-device text extraction (PDF, Office, code/logs) via Android Storage Access Framework (SAF) with instant "New Chat" memory wipe. |
| **UOAI Keyboard** | `com.uoai.keyboard` | 100% offline, ad-free Android Input Method Editor (IME) with multilingual layouts, themes, mechanical sounds, clipboard history, quick templates, offline voice typing, password/incognito auto-pause, and 13 on-device Gemma writing/reply modes. |
| **Developer Integration Suite** | `sdk-release.aar` + Developer Guide + AI Prompts | External handover package (~112 KB AAR, `minSdk 26`, R8-ready), hosted REST/SSE documentation, and copy-paste AI prompts for automated project wiring. |

---

## 5. Stakeholders & Target Personas

| Stakeholder | Needs & Expectations |
| :--- | :--- |
| **Privacy-Conscious Android Users** | Transparent local-only guarantees, zero cloud uploads, easy one-tap revocation of client apps, and simple model storage cleanup. |
| **First-Party Client Teams** (`com.uoai.chat`, `com.uoai.keyboard`) | Low-latency SSE streaming, automatic `"auto"` model routing, 32K context window discovery, and reliable recovery when the provider service is stopped. |
| **Third-Party Android Developers** | Drop-in Kotlin SDK or standard OpenAI-compatible loopback HTTP/SSE spec, clear error codes, ADB debugging workflow, and R8 release compatibility. |
| **Enterprise & MDM Administrators** | Predictable APK distribution (Play Store, GitHub Releases, or MDM URL), single-signer certificate pinning, and verifiable zero external data egress. |
| **Google Play Store Compliance Reviewers** | Accurate Data Safety disclosures (`No` data collected/shared/transferred externally), minimal scoped permissions, and complete removal of `AD_ID` / tracking SDKs. |

---

## 6. Scope Boundaries

### In Scope for UOAI Provider (`com.uoai.provider`)
- Local storage, user-initiated download/import, and deletion of LiteRT-LM (`.litertlm`), MediaPipe (`.task`), and GGUF models.
- Gemma 3 and Gemma 4 (E2B, E4B, 12B, 26B-A4B, 31B) text chat inference on CPU, GPU, or NPU.
- Loopback-only (`127.0.0.1:8765`) HTTP/SSE endpoints: `/v1/health`, `/v1/models`, `/v1/capabilities`, `/v1/chat/completions`, `/v1/cancel`.
- OS-verified registration (`com.uoai.provider.action.REGISTER`), SHA-256 certificate pinning, hardware-backed Android Keystore tokens, and per-client capability toggles (`chat`, `streaming`, `tool_calling`).
- Client-owned function tool calling (`tools`) and provider-owned safe tools (`calculator`, `device_info`) in non-streaming mode.
- Optional metadata-only audit trail (timestamps, package name, token counts, latency).

### Explicitly Out of Scope for UOAI Provider
- **Embeddings:** `embeddings: false` (must be handled outside the provider if required).
- **Speech-to-Text / Audio Capture:** Handled locally by client apps (e.g., UOAI Keyboard's offline voice typing).
- **Multimodal Vision Inputs:** Out of scope for the current `/v1/chat/completions` provider contract.
- **Conversation Persistence & Document Parsing:** Client apps own chat history, file pickers (SAF), and PDF/Office text extraction.
- **Cloud Fallback or Account Sync:** Strictly prohibited by the UOAI privacy architecture.

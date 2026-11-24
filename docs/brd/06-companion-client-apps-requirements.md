# 06 — Companion Client Apps Requirements (`com.uoai.chat` & `com.uoai.keyboard`)

| Control Field | Detail |
| :--- | :--- |
| **Document ID** | `UOAI-BRD-06` |
| **Companion Packages** | `com.uoai.chat` (UOAI Chat) • `com.uoai.keyboard` (UOAI Keyboard) |
| **Shared Dependency** | Local UOAI Provider (`com.uoai.provider`) via `http://127.0.0.1:8765/v1` |

---

## 1. Strategic Role in the UOAI Ecosystem

UOAI Chat and UOAI Keyboard serve as the flagship first-party clients of `com.uoai.provider`. They prove the shared loopback architecture in real-world multitasking scenarios—allowing a user to load a single Gemma 3 / Gemma 4 model once in UOAI Provider and consume it seamlessly across both full-screen document chat and system-wide keyboard writing assistance.

---

## 2. UOAI Chat (`com.uoai.chat`) Requirements

### 2.1 Core Purpose & Provider Integration
- Standalone, lightweight conversational AI client for Android that executes **no** AI models inside its own process.
- Connects strictly to local `com.uoai.provider` over `http://127.0.0.1:8765` using one-time OS-verified registration (`Activity` result contract) and hardware-backed Android Keystore `Authorization: Bearer <token>` headers.

### 2.2 Conversational & UI Capabilities
- **Streaming Generation:** Stream token-by-token completions from open-weight local models (Gemma 3 / Gemma 4) with rich Markdown rendering and prompt customization.
- **Ephemeral In-Memory State:** Chat turns, system prompts, and responses reside solely within local process memory and private app state (zero accounts, zero cloud sync, zero remote backup servers).
- **Instant Chat Wipe:** Tapping the **"New Chat"** icon at the top of the chat view must immediately purge active conversation messages and attachment contexts from memory.

### 2.3 On-Device Document Intelligence
- **Supported File Formats:** PDF, Word (`DOCX`), Excel (`XLSX`), PowerPoint (`PPTX`), `RTF`, `HTML`, `TXT`, source code files, and logs.
- **100% Local Text Extraction:** All parsing must execute on-device using embedded libraries (such as `PDFBox-Android` and native UTF-8 stream readers). Neither original files nor extracted text are ever uploaded externally.
- **Scoped Access (SAF):** Files must be selected exclusively via Android's Storage Access Framework (`OpenMultipleDocuments`), granting temporary read access only to user-picked documents without `READ_EXTERNAL_STORAGE` or `MANAGE_EXTERNAL_STORAGE`.
- **Ephemeral Attachment Lifetime:** Extracted document text is kept in memory only for the active query context and purged upon clearing or starting a new chat.

---

## 3. UOAI Keyboard (`com.uoai.keyboard`) Requirements

### 3.1 Core Purpose & IME Capabilities
- Fast, modern, 100% offline, free, and ad-free Android Input Method Editor (IME) (`AD_ID` and AdMob SDKs completely removed).
- **Standard Offline Keyboard Features:**
  - Multilingual keyboard layouts
  - Curated visual themes
  - Mechanical switch sound effects and customizable haptic feedback (`android.permission.VIBRATE`)
  - Local clipboard history (paste, pin, and clear anytime)
  - Quick text templates and personal dictionary
  - Local JSON backup & restore of templates and preferences via Android's system file picker
  - **Offline Voice Typing:** Optional runtime `android.permission.RECORD_AUDIO` requested only upon tapping the microphone key; processed locally on-device for speech-to-text with zero audio recording storage and zero server uploads (all typing and AI features remain functional if denied).

### 3.2 On-Device AI Writing Assistant (13 Modes)
- Communicates exclusively with `com.uoai.provider` over `http://127.0.0.1:8765` (enforced via `uoai_network_security_config.xml` restricting cleartext strictly to `127.0.0.1` and `localhost`), secured by one-time OS-verified approval and a Keystore-encrypted token.
- Must support explicit user invocation of all **13 writing and reply modes**:

| # | AI Mode | Purpose |
| :--- | :--- | :--- |
| 1 | **Grammar Fix** | Correct spelling, punctuation, and grammatical errors. |
| 2 | **Polish & Clarity** | Improve readability, flow, and phrasing clarity. |
| 3 | **Humanize** | Make stiff or robotic text sound natural and conversational. |
| 4 | **Enhance Prompt** | Expand and structure a draft prompt for better AI responses. |
| 5 | **Professional Email** | Format and refine text into a polished business email. |
| 6 | **Formal** | Rewrite text in a formal, executive register. |
| 7 | **Polite** | Soften phrasing into a courteous, respectful tone. |
| 8 | **Casual** | Rewrite text in a relaxed, everyday conversational style. |
| 9 | **Direct** | Remove filler and state the core message concisely. |
| 10 | **Shorter** | Condense selected text while preserving key meaning. |
| 11 | **Bullets** | Convert prose into structured bullet points. |
| 12 | **Summary** | Produce a brief summary of the selected or pasted text. |
| 13 | **Smart Reply** | Generate context-appropriate quick reply suggestions. |

### 3.3 Keystroke, Password & Incognito Safeguards
- **Zero Remote Keystroke Transmission:** Keystrokes, typed drafts, clipboard items, and AI prompts never leave the device.
- **Automatic Password Field Protection:** Whenever Android marks an active input field as a password, PIN, or sensitive field, UOAI Keyboard must automatically pause word learning, next-word suggestions, clipboard recording, and AI writing features.
- **Incognito Mode Protection:** When a host app requests incognito input (e.g., private browser tabs) or the user enables incognito mode, learning and history tracking must automatically pause.

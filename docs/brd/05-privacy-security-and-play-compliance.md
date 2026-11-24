# 05 — Privacy, Security & Google Play Compliance

| Control Field | Detail |
| :--- | :--- |
| **Document ID** | `UOAI-BRD-05` |
| **Covered Applications** | `com.uoai.provider` • `com.uoai.chat` • `com.uoai.keyboard` |
| **Effective Dates** | Provider & Chat: `2026-11-21` • Keyboard: `2026-11-23` |
| **Compliance Scope** | Google Play Data Safety, COPPA, GDPR, Android Sandbox & Keystore Security |

---

## 1. Privacy-by-Architecture Principles

Every application in the Universal Offline AI (UOAI) ecosystem must enforce the following non-negotiable privacy controls:
- **Zero Cloud Inference:** No remote inference servers; prompts, attachments, keystrokes, voice audio, and completions never leave the physical device.
- **Zero User Accounts:** No login, sign-up, cloud database, or remote backup servers.
- **Zero Advertising SDKs:** Completely free and ad-free. `AD_ID` and AdMob SDKs are completely removed.
- **Zero Analytics / Telemetry SDKs:** No Firebase Analytics, Google Analytics, Mixpanel, Segment, or behavioral trackers.
- **Zero Third-Party Crash Reporting:** No Sentry, Crashlytics, Bugsnag, or remote diagnostic SDKs.
- **Zero Data Brokerage / Sharing:** Never collect, buy, sell, rent, or share personal data with any third party.

---

## 2. Local Data Storage & Retention Boundaries

All data remains strictly inside each application's private Android storage sandbox or hardware-backed Android Keystore:

### 2.1 `com.uoai.provider`
- **AI Model Files:** `.litertlm`, `.task`, or GGUF files stored in private app storage; downloaded from open-source repositories (e.g., Hugging Face) only upon user initiation, or imported manually.
- **Client Application Registrations:** Package name, friendly label, and single-signer SHA-256 certificate fingerprint of approved client apps in Room (`client_credentials`).
- **Cryptographic Access Tokens:** Client holds locally generated random `uoai_<token>` encrypted in hardware-backed Android Keystore; provider stores only its SHA-256 hash.
- **Inference Audit Trail (Metadata Only):** Optional local records containing timestamps, client package names, token counts, and execution latency. **Prompt text, system instructions, and generated completions are never logged or saved.**

### 2.2 `com.uoai.chat`
- **Conversations & Prompts:** Held solely in local process memory and private app state; tapping **"New Chat"** instantly discards the session.
- **Document Attachments:** Extracted locally on-device; original files are accessed temporarily via Android Storage Access Framework (SAF), and extracted text stays in memory only for the active query until cleared or replaced by a new chat.

### 2.3 `com.uoai.keyboard`
- **Clipboard History, Quick Templates & Personal Dictionary:** Stored strictly in private on-device sandbox; user-clearable anytime.
- **App Preferences:** Selected theme, mechanical sound/haptic profile, active layouts, and last-used AI writing tone stored locally.
- **Local JSON Backup & Restore:** Reads/writes a local JSON file solely at the user-chosen location via Android's system file picker.
- **Offline Voice Typing:** Audio captured upon tapping the microphone key is processed locally on-device for speech-to-text and is never saved as audio recordings or transmitted remotely.

---

## 3. Android Permissions & Technical Justifications

### 3.1 UOAI Provider (`com.uoai.provider`)
| Permission | Type | Technical Justification |
| :--- | :--- | :--- |
| `android.permission.INTERNET` | Normal | **Loopback Sockets & Model Downloads:** Required by Android to open local TCP sockets to `127.0.0.1` for IPC with approved local clients, and to download public open-source model weights from Hugging Face upon user initiation. No private data is uploaded. |
| `FOREGROUND_SERVICE` & `FOREGROUND_SERVICE_SPECIAL_USE` | Signature / Special | **Persistent Local AI Server:** Keeps the local model in memory and the loopback HTTP server active while approved client apps send inference requests in the background, displaying a permanent notification with an instant **"Stop API"** action. |
| `android.permission.POST_NOTIFICATIONS` | Runtime (API 33+) | **Foreground Service Status:** Required on Android 13+ to display the ongoing notification showing server state, active model, and the **"Stop API"** button. |

### 3.2 UOAI Chat (`com.uoai.chat`)
| Permission / Contract | Type | Technical Justification |
| :--- | :--- | :--- |
| `android.permission.INTERNET` | Normal | **Loopback Communication:** Required to open TCP sockets to `127.0.0.1:8765` to communicate with local `com.uoai.provider`. Zero external network requests are made. |
| Storage Access Framework (`OpenMultipleDocuments`) | Scoped Intent Contract | **User-Selected Document Attachments:** Grants temporary read permission only for specific files picked by the user. Broad permissions (`READ_EXTERNAL_STORAGE`, `MANAGE_EXTERNAL_STORAGE`) are never requested. |

### 3.3 UOAI Keyboard (`com.uoai.keyboard`)
| Permission | Type | Technical Justification & Privacy Boundary |
| :--- | :--- | :--- |
| `android.permission.RECORD_AUDIO` | Optional Runtime | **Offline Voice Typing:** Requested only when the user taps the microphone key to dictate text. Audio is never saved or transmitted externally. All typing and AI features work normally if denied. |
| `android.permission.VIBRATE` | Normal | **Tactile Haptic Feedback:** Provides customizable keypress vibration feedback while typing. |
| `android.permission.INTERNET` | Normal | **Localhost Loopback IPC Only:** Required to open local TCP sockets to `127.0.0.1:8765` for `com.uoai.provider` communication, strictly enforced via `uoai_network_security_config.xml`. Zero external servers are contacted. |

---

## 4. Google Play Console Data Safety Compliance Matrices

### 4.1 UOAI Provider (`com.uoai.provider`)
| Play Console Question | Declared Response | Details |
| :--- | :--- | :--- |
| Data collected? | **No** | No personal, behavioral, or prompt data is collected. |
| Data shared with third parties? | **No** | No data is transferred to any external server or third party. |
| Data transferred over an external network? | **No** | All inter-app traffic is isolated to loopback `127.0.0.1`. |
| Data deletion request available? | **Yes (Direct User Control)** | Users can revoke clients, delete models, or wipe all data, models, and tokens instantly via Android Settings or uninstallation. |

### 4.2 UOAI Chat (`com.uoai.chat`)
| Play Console Question | Declared Response | Details |
| :--- | :--- | :--- |
| Data collected? | **No** | No user data, chat transcripts, or attachments are collected. |
| Data shared with third parties? | **No** | No data is transferred to any external party or server. |
| Data transferred over an external network? | **No** | All network activity is strictly local loopback (`127.0.0.1`). |
| Data deletion request mechanism? | **Yes (Direct User Control)** | Users can delete conversations with the **"New Chat"** button or clear all app data via Android Settings. |

### 4.3 UOAI Keyboard (`com.uoai.keyboard`)
| Play Console Question | Declared Answer | Explanation |
| :--- | :--- | :--- |
| Does your app collect or share any of the required user data types? | **No** | No keystrokes, messages, clipboard items, audio, or personal data are collected or shared. |
| Is all user data processed locally on-device? | **Yes** | All typing, clipboard, dictionary, templates, and localhost AI inference (`127.0.0.1:8765`) stay strictly on the user's device. |
| Does the app contain ads? | **No** | `AD_ID` and AdMob SDKs are completely removed; the app is 100% free and ad-free. |
| Can users delete their locally stored data? | **Yes (Direct User Control)** | Users can clear clipboard history/templates in-app, wipe all storage in Android Settings, or uninstall the app. |

---

## 5. User Sovereignty & Data Deletion Controls

- **In-App Controls:**
  - **UOAI Provider:** Revoke any client app in **Clients** tab; delete model bundles in **Models** screen.
  - **UOAI Chat:** Tap **"New Chat"** icon to immediately clear active messages and attachment text from memory.
  - **UOAI Keyboard:** Clear clipboard history, delete quick text templates, or reset preferences in settings; revoke AI token via **UOAI Provider → Clients**.
- **System-Level Full Wipe:** `Settings → Apps → <App Name> → Storage → Clear Storage / Clear Data` wipes all local state, preferences, and Keystore tokens.
- **Uninstallation:** Uninstalling any UOAI app permanently purges its private sandbox storage, logs, and Keystore secrets.

---

## 6. Regulatory & Governance Compliance

- **Children's Privacy (COPPA & GDPR):** None of the UOAI applications collect, transmit, or store personal information from anyone, including children under the age of 13. UOAI Keyboard is rated for **Everyone**. All apps comply with COPPA and GDPR by architectural isolation.
- **Policy Revision Governance:** Any future revisions to app privacy policies are published at the official hosted URLs with an updated **"Last Updated"** date.
- **Compliance Contact:** [support@uoai.app](mailto:support@uoai.app) • Repository: [github.com/kumodd/privacy-policy](https://github.com/kumodd/privacy-policy).

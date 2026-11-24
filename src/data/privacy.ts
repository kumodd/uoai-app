import type { PrivacyAppData } from "@/types/uoai";
import { OFFICIAL_URLS } from "@/data/constants";

export const PRIVACY_APPS: PrivacyAppData[] = [
  {
    key: "provider",
    label: "UOAI Provider",
    pkg: "com.uoai.provider",
    effectiveDate: "Effective Date: November 21, 2026",
    privacyUrl: OFFICIAL_URLS.providerPrivacy,
    termsUrl: OFFICIAL_URLS.providerTerms,
    safetyRows: [
      {
        question: "Data collected?",
        answer: "No",
        details: "No personal, behavioral, or prompt data is collected.",
      },
      {
        question: "Data shared with third parties?",
        answer: "No",
        details: "No data is transferred to any external server or third party.",
      },
      {
        question: "Data transferred over an external network?",
        answer: "No",
        details: "All inter-app traffic is isolated to loopback 127.0.0.1.",
      },
      {
        question: "Data deletion request available?",
        answer: "Yes (Direct User Control)",
        details:
          "Users can revoke clients, delete models, or wipe all data via Android Settings or uninstallation.",
      },
    ],
    permissionRows: [
      {
        permission: "android.permission.INTERNET",
        type: "Normal",
        justification:
          "Loopback TCP sockets to 127.0.0.1 and user-initiated downloads of open-source Hugging Face model weights. Zero private data uploaded.",
      },
      {
        permission: "FOREGROUND_SERVICE & FOREGROUND_SERVICE_SPECIAL_USE",
        type: "Signature / Special",
        justification:
          "Keeps local model in RAM and loopback HTTP server active while approved clients run inference, showing a permanent notification with a Stop API action.",
      },
      {
        permission: "android.permission.POST_NOTIFICATIONS",
        type: "Runtime (API 33+)",
        justification:
          "Displays ongoing foreground notification showing server state, active model, and quick Stop API control.",
      },
    ],
    deletionControls: [
      "Revoke any approved client app immediately from the Clients tab.",
      "Delete downloaded or imported AI model bundles anytime from the Models screen.",
      "Clear all app data via Settings → Apps → UOAI Provider → Storage → Clear Storage, or uninstall to purge all Keystore secrets and logs.",
    ],
  },
  {
    key: "chat",
    label: "UOAI Chat",
    pkg: "com.uoai.chat",
    effectiveDate: "Effective Date: November 21, 2026",
    privacyUrl: OFFICIAL_URLS.chatPrivacy,
    termsUrl: OFFICIAL_URLS.chatTerms,
    safetyRows: [
      {
        question: "Data collected?",
        answer: "No",
        details: "No user data, chat transcripts, or attachments are collected.",
      },
      {
        question: "Data shared with third parties?",
        answer: "No",
        details: "No data is transferred to any external party or server.",
      },
      {
        question: "Data transferred over an external network?",
        answer: "No",
        details: "All network activity is strictly local loopback (127.0.0.1).",
      },
      {
        question: "Data deletion request mechanism?",
        answer: "Yes (Direct User Control)",
        details:
          "Users can delete conversations instantly with New Chat or clear all app data via Android Settings.",
      },
    ],
    permissionRows: [
      {
        permission: "android.permission.INTERNET",
        type: "Normal",
        justification:
          "Loopback TCP sockets to 127.0.0.1:8765 to stream prompts and completions with local UOAI Provider. Zero external network calls.",
      },
      {
        permission: "Storage Access Framework (OpenMultipleDocuments)",
        type: "Scoped Intent Contract",
        justification:
          "Temporary read access solely for user-selected files (PDF, DOCX, XLSX, PPTX, RTF, HTML, TXT, code, logs). Never requests READ_EXTERNAL_STORAGE or MANAGE_EXTERNAL_STORAGE.",
      },
    ],
    deletionControls: [
      "Tap the New Chat icon to immediately purge active messages and extracted attachment text from memory.",
      "Go to Settings → Apps → UOAI Chat → Storage → Clear Storage / Clear Data to wipe all state and stored credentials.",
      "Uninstall to permanently purge all private sandbox data.",
    ],
  },
  {
    key: "keyboard",
    label: "UOAI Keyboard",
    pkg: "com.uoai.keyboard",
    effectiveDate: "Effective Date: November 23, 2026",
    privacyUrl: OFFICIAL_URLS.keyboardPrivacy,
    termsUrl: OFFICIAL_URLS.keyboardTerms,
    safetyRows: [
      {
        question: "Collect or share required user data types?",
        answer: "No",
        details:
          "No keystrokes, messages, clipboard items, audio, or personal data are collected or shared.",
      },
      {
        question: "All user data processed locally on-device?",
        answer: "Yes",
        details:
          "All typing, clipboard, dictionary, templates, and localhost AI inference (127.0.0.1:8765) stay strictly on-device.",
      },
      {
        question: "Does the app contain ads?",
        answer: "No",
        details:
          "AD_ID and AdMob SDKs are completely removed; the app is 100% free and ad-free.",
      },
      {
        question: "Can users delete locally stored data?",
        answer: "Yes (Direct User Control)",
        details:
          "Clear clipboard history/templates in-app, wipe storage in Android Settings, or uninstall.",
      },
    ],
    permissionRows: [
      {
        permission: "android.permission.RECORD_AUDIO",
        type: "Optional Runtime",
        justification:
          "Offline voice typing requested only when tapping the microphone key. Audio is never saved or transmitted externally; all typing and AI tools work normally if denied.",
      },
      {
        permission: "android.permission.VIBRATE",
        type: "Normal",
        justification: "Provides customizable tactile keypress haptic feedback while typing.",
      },
      {
        permission: "android.permission.INTERNET",
        type: "Normal",
        justification:
          "Localhost loopback IPC only to 127.0.0.1:8765 for com.uoai.provider (enforced via uoai_network_security_config.xml). Zero external servers contacted.",
      },
    ],
    deletionControls: [
      "Clear clipboard history, delete quick text templates, or reset preferences directly inside UOAI Keyboard settings.",
      "Revoke UOAI Keyboard's loopback token anytime inside UOAI Provider → Clients.",
      "Clear Storage in Android Settings or uninstall to permanently delete dictionary entries, templates, and Keystore tokens.",
    ],
  },
];

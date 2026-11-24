import type { HeroMetric } from "@/types/uoai";

export const SITE_META = {
  title: "Universal Offline AI (UOAI) Provider",
  packageId: "com.uoai.provider",
  registerAction: "com.uoai.provider.action.REGISTER",
  baseUrl: "http://127.0.0.1:8765/v1",
  authHeader: "Authorization: Bearer uoai_<token>",
  recommendedModel: '"auto"',
  maxRequestBytes: "2,097,152 bytes (2 MiB)",
  maxTokens: "32,768 tokens",
  timeoutMs: "300,000 ms (300 s)",
  concurrency: "1 active • 16 global / 4 per client queue",
  contactEmail: "support@uoai.app",
};

export const OFFICIAL_URLS = {
  privacyHub: "https://kumodd.github.io/privacy-policy/index.html",
  combinedPrivacy: "https://kumodd.github.io/privacy-policy/privacy-policy.html",
  ecosystemTerms: "https://kumodd.github.io/privacy-policy/terms/",
  developerGuide: "https://kumodd.github.io/privacy-policy/developer-guide/",
  aiPrompt: "https://kumodd.github.io/privacy-policy/ai-prompt/",
  providerPrivacy: "https://kumodd.github.io/privacy-policy/uoai-provider/",
  providerTerms: "https://kumodd.github.io/privacy-policy/uoai-provider/terms/",
  providerHtml: "https://kumodd.github.io/privacy-policy/policies/uoai-provider.html",
  chatPrivacy: "https://kumodd.github.io/privacy-policy/uoai-chat/",
  chatTerms: "https://kumodd.github.io/privacy-policy/uoai-chat/terms/",
  chatHtml: "https://kumodd.github.io/privacy-policy/policies/uoai-chat.html",
  keyboardPrivacy: "https://kumodd.github.io/privacy-policy/uoai-keyboard/",
  keyboardTerms: "https://kumodd.github.io/privacy-policy/uoai-keyboard/terms/",
  keyboardHtml: "https://kumodd.github.io/privacy-policy/policies/uoai-keyboard.html",
  providerPlayStore: "https://play.google.com/store/apps/details?id=com.uoai.provider",
  chatPlayStore: "https://play.google.com/store/apps/details?id=com.uoai.chat",
  keyboardPlayStore: "https://play.google.com/store/apps/details?id=com.uoai.keyboard",
};

export const HERO_METRICS: HeroMetric[] = [
  {
    id: "on-device",
    value: "100%",
    label: "ON-DEVICE • ZERO CLOUD",
    tone: "olive",
    icon: "shield",
  },
  {
    id: "context",
    value: "32,768",
    label: "MAX CONTEXT TOKENS",
    tone: "mint",
    icon: "layers",
  },
  {
    id: "loopback",
    value: "127.0.0.1",
    label: "LOOPBACK PORT 8765",
    tone: "sand",
    mono: true,
    icon: "lock",
  },
  {
    id: "aar",
    value: "112 KB",
    label: "KOTLIN SDK AAR",
    tone: "terracotta",
    icon: "package",
  },
];

export const KEY_CONSTANTS_TABLE = [
  { property: "Provider Package ID", value: "com.uoai.provider" },
  { property: "Registration Intent Action", value: "com.uoai.provider.action.REGISTER" },
  { property: "Loopback Base URL", value: "http://127.0.0.1:8765/v1 (loopback only; never 0.0.0.0)" },
  { property: "Authentication Header", value: "Authorization: Bearer uoai_<token> (all /v1/* except /v1/health)" },
  { property: "Recommended model Value", value: '"auto" (routes to whichever Gemma 3 or Gemma 4 model is loaded)' },
  { property: "Max Request Size", value: "2,097,152 bytes (2 MiB; HTTP 413 if exceeded)" },
  { property: "Context & Output Token Cap", value: "Up to 32,768 tokens (effective = min(request.max_tokens, client_cap, 32768))" },
  { property: "Generation Timeout", value: "300,000 ms (300 s; HTTP 504 or mid-stream error event)" },
  { property: "Concurrency & Queue", value: "1 active generation shared across apps; queue 16 global / 4 per client" },
  { property: "Supported Capabilities", value: "chat, streaming (SSE), cancellation, tool-calling (embeddings = false)" },
];

export const ADB_TEST_COMMANDS = `adb forward tcp:8765 tcp:8765
curl -s http://127.0.0.1:8765/v1/health
curl -s -H "Authorization: Bearer $TOKEN" http://127.0.0.1:8765/v1/capabilities`;

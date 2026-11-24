import type {
  ApiEndpoint,
  ErrorEntry,
  ModelStateItem,
  TrustStep,
} from "@/types/uoai";

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: "health",
    method: "GET",
    path: "/v1/health",
    summary: "Server readiness & model lifecycle state",
    meta: "Port 8765 Loopback • Status ok / degraded",
    badge: "Unauthenticated",
    payload: `{
  "status": "ok",
  "model_state": "READY",
  "model_loaded": true,
  "api_version": "v1"
}
// States: NOT_INSTALLED, DOWNLOADING, VERIFYING, LOADING, READY, GENERATING, UNLOADING, ERROR`,
  },
  {
    id: "models",
    method: "GET",
    path: "/v1/models",
    summary: "Active Gemma 3 / Gemma 4 model metadata",
    meta: "Bearer Token Required • Context Window Info",
    badge: "32K Context",
    payload: `{
  "object": "list",
  "data": [
    {
      "id": "gemma-4-e2b",
      "object": "model",
      "owned_by": "universal-offline-ai",
      "name": "gemma-4-E2B-it",
      "format": "litertlm",
      "quantization": "e2b",
      "size_bytes": 2588100000,
      "ready": true,
      "context_window": 32768
    }
  ]
}`,
  },
  {
    id: "capabilities",
    method: "GET",
    path: "/v1/capabilities",
    summary: "Dynamic token caps, concurrency & enabled provider tools",
    meta: "Max 2,097,152 bytes • embeddings: false",
    badge: "Bearer Auth",
    payload: `{
  "features": ["chat", "streaming", "cancellation", "tool-calling"],
  "max_request_bytes": 2097152,
  "max_tokens_limit": 32768,
  "concurrent_generations": 1,
  "embeddings": false,
  "provider_tools": ["calculator", "device_info"],
  "context_window_tokens": 32768,
  "default_max_tokens": 2048
}`,
  },
  {
    id: "chat",
    method: "POST",
    path: "/v1/chat/completions",
    summary: 'Inference, SSE streaming & tool calling ("model": "auto")',
    meta: "Returns X-Request-Id • 300,000 ms Timeout",
    badge: "JSON & SSE Stream",
    payload: `// Request (model: "auto", stream: true | false, tools, use_provider_tools)
{
  "model": "auto",
  "messages": [
    { "role": "user", "content": "Summarize on-device AI in 3 bullets." }
  ],
  "temperature": 0.7,
  "max_tokens": 2048,
  "stream": true
}

// SSE Stream (Accept: text/event-stream)
data: {"id":"chatcmpl-...","object":"chat.completion.chunk","created":1795105166,"model":"gemma-4-e2b","choices":[{"index":0,"delta":{"content":"Hello"}}]}
data: {"id":"chatcmpl-...","object":"chat.completion.chunk","created":1795105166,"model":"gemma-4-e2b","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}
data: [DONE]`,
  },
  {
    id: "cancel",
    method: "POST",
    path: "/v1/cancel",
    summary: "Abort active or queued generation by X-Request-Id",
    meta: "Queue: 16 Global / 4 Per Client",
    badge: "Client-Isolated",
    payload: `// Request
{
  "request_id": "chatcmpl-8b26e9d9-1b6b-41e9-aa85-fc8bdb7b163f"
}

// Response (cancelled: false for another app's or unknown ID)
{
  "request_id": "chatcmpl-8b26e9d9-1b6b-41e9-aa85-fc8bdb7b163f",
  "cancelled": true
}`,
  },
];

export const TRUST_STEPS: TrustStep[] = [
  {
    step: "01",
    title: "Package Discovery",
    description:
      "Client verifies com.uoai.provider is installed via Android 11+ <queries> manifest visibility.",
  },
  {
    step: "02",
    title: "OS-Verified REGISTER",
    description:
      "Launch com.uoai.provider.action.REGISTER with startActivityForResult (never FLAG_ACTIVITY_NEW_TASK). Provider pins single-signer SHA-256 cert.",
  },
  {
    step: "03",
    title: "Android Keystore Token",
    description:
      "Client encrypts uoai_<token> via Keystore AES/GCM/NoPadding; provider stores SHA-256 hash in Room (client_credentials).",
  },
  {
    step: "04",
    title: "Shared Gemma 3 / 4 Inference",
    description:
      "Non-sticky ProviderService queues 1 active generation across apps (16 global / 4 per client) with one-tap Open Provider recovery.",
  },
];

export const MODEL_STATES: ModelStateItem[] = [
  { name: "NOT_INSTALLED", variant: "default" },
  { name: "DOWNLOADING", variant: "default" },
  { name: "VERIFYING", variant: "default" },
  { name: "LOADING", variant: "default" },
  { name: "READY", variant: "ready" },
  { name: "GENERATING", variant: "ready" },
  { name: "UNLOADING", variant: "default" },
  { name: "ERROR", variant: "error" },
];

export const ERROR_PLAYBOOK: ErrorEntry[] = [
  {
    status: "Missing",
    codes: "Package missing",
    sdkException: "ProviderNotInstalledException",
    recovery: "Show 'Install Universal Offline AI Provider (com.uoai.provider)'.",
  },
  {
    status: "Refused",
    codes: "Socket refused",
    sdkException: "ProviderNotRunningException",
    recovery: "Prompt user to tap Open Provider and start the API server.",
  },
  {
    status: "400",
    codes:
      "invalid_json, missing_messages, invalid_role, missing_user_message, invalid_temperature, invalid_max_tokens, invalid_request",
    sdkException: "ApiException",
    recovery:
      "Fix payload: temperature 0..2, max_tokens 1..32768, and at least 1 user or tool message.",
  },
  {
    status: "401",
    codes: "missing_token, invalid_token",
    sdkException: "NotRegisteredException",
    recovery: "Clear saved token (clearCredentials()) and relaunch REGISTER Intent.",
  },
  {
    status: "403",
    codes: "permission_denied",
    sdkException: "PermissionDeniedException",
    recovery:
      "Ask user to enable chat, streaming, or tool_calling in Provider → Clients.",
  },
  {
    status: "404",
    codes: "model_not_found",
    sdkException: "ApiException",
    recovery: 'Pass "model": "auto" or query GET /v1/models.',
  },
  {
    status: "409",
    codes: "request_cancelled",
    sdkException: "RequestCancelledException",
    recovery: "Clean user abort; reset streaming state.",
  },
  {
    status: "413",
    codes: "request_too_large",
    sdkException: "ApiException",
    recovery: "Trim message history below 2 MiB (2,097,152 bytes).",
  },
  {
    status: "429",
    codes: "queue_full",
    sdkException: "ApiException",
    recovery: "Queue limit hit (16 global / 4 per client); back off briefly & retry.",
  },
  {
    status: "500",
    codes: "internal_error, inference_failed",
    sdkException: "ApiException",
    recovery: "Display error notice and offer user retry.",
  },
  {
    status: "503",
    codes: "model_not_ready",
    sdkException: "ModelNotReadyException",
    recovery: "Prompt user to Open Provider and load a Gemma model.",
  },
  {
    status: "504",
    codes: "request_timeout",
    sdkException: "ApiException",
    recovery: "Exceeded 300 s; reduce prompt size or max_tokens.",
  },
];

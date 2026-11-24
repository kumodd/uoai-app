# 04 — Developer Integration & SDK Requirements

| Control Field | Detail |
| :--- | :--- |
| **Document ID** | `UOAI-BRD-04` |
| **Audience** | External & Internal Android Developers, Cross-Platform Mobile Teams |
| **Reference Docs** | [Developer Guide](https://kumodd.github.io/privacy-policy/developer-guide/) • [AI Implementation Prompt](https://kumodd.github.io/privacy-policy/ai-prompt/) |

---

## 1. External Developer Handover Package

When onboarding an external team to integrate `com.uoai.provider`, the handover package consists of three deliverables:
1. **Developer Documentation:** `EXTERNAL_DEVELOPER_HANDOVER.md` / hosted [Developer Guide](https://kumodd.github.io/privacy-policy/developer-guide/).
2. **Kotlin Client SDK (`sdk-release.aar`):** ~`112 KB`, `minSdk 26`, Java/Kotlin target `17`, R8/ProGuard-ready, containing **zero** model weights (optional if using Path B).
3. **Provider App Distribution:** APK / install link for `com.uoai.provider` via Google Play Store, GitHub Releases, or enterprise MDM URL.

---

## 2. Integration Path A — Recommended Kotlin SDK (`sdk-release.aar`)

The lightweight AAR encapsulates Keystore encryption (`AES/GCM/NoPadding`), Bearer token headers, registration Intent handling, connection preflight, SSE parsing, automatic cancellation on coroutine abort, and multi-turn sliding chat history with failure rollback.

### 2.1 Gradle & Dependency Requirements (`app/build.gradle.kts`)
- **Minimum SDK:** `minSdk >= 26`
- **JVM / Kotlin Target:** `17`
- **Dependencies:**
  ```kotlin
  dependencies {
      implementation(files("libs/sdk-release.aar"))
      implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.11.0")
      implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.8.1")
  }
  ```

### 2.2 Automatic Manifest, Security & R8 Configuration
Client apps require **zero** manual UOAI manifest entries and **zero** extra ProGuard rules when using `sdk-release.aar`:
- **Auto-Merged Manifest:** Embeds `android.permission.INTERNET`, `<queries><package android:name="com.uoai.provider" /></queries>`, and loopback-only `android:networkSecurityConfig="@xml/uoai_network_security_config"` (`127.0.0.1` and `localhost` only).
- **Conflict Resolution:** If the host app already defines its own `android:networkSecurityConfig`, it must add `tools:replace="android:networkSecurityConfig"` on `<application>` and whitelist `<domain includeSubdomains="false">127.0.0.1</domain>` and `localhost` inside its existing XML. Global `usesCleartextTraffic="true"` must never be enabled.
- **R8 / ProGuard Consumer Rules:** Embedded `consumer-rules.pro` automatically preserves `com.uoai.sdk.**` and `kotlinx.serialization` serializers when `isMinifyEnabled = true`.

### 2.3 Critical Signing Configuration (`certificate_mismatch` Prevention)
Because `com.uoai.provider` pins each `packageName` to its single-signer APK SHA-256 certificate on first registration:
- Debug and release builds **must** use distinct `applicationId` values so switching builds on a test phone never triggers `certificate_mismatch`:
  ```kotlin
  android {
      defaultConfig { applicationId = "com.yourcompany.yourapp" }
      buildTypes {
          debug { applicationIdSuffix = ".debug" }
      }
  }
  ```
- Release APKs **must** be signed with a **single** signing key (multi-signer APKs are rejected by the provider).

### 2.4 SDK Public API Surface (`com.uoai.sdk`)

| Symbol | Purpose & Behavior |
| :--- | :--- |
| `UniversalAIClient(context, config)` | Entry point (defaults to `http://127.0.0.1:8765/v1` and `ClientConfig(model = "auto")`). Uses Keystore-encrypted `TokenStore`. |
| `suspend fun checkConnection(): ConnectionState` | One-call preflight returning `ProviderNotInstalled`, `NeedsRegistration`, `ProviderNotRunning`, `ModelNotReady`, `Connected`, or `Error`. Automatically clears stale revoked tokens. |
| `fun isProviderInstalled(): Boolean` | Returns `true` if `com.uoai.provider` is installed. |
| `fun registrationIntent(): Intent` | Builds registration Intent for `startActivityForResult`. **Never** add `FLAG_ACTIVITY_NEW_TASK`. |
| `fun handleRegistrationResult(code, data)` | Persists issued token into Keystore and returns `RegistrationResult.Approved` or `RegistrationResult.Denied(code, message)`. |
| `fun openProviderIntent(): Intent?` | Launch Intent (`FLAG_ACTIVITY_NEW_TASK`) to open UOAI Provider for service/model recovery. |
| `fun startChat(...): ChatSession` | Stateful multi-turn session (`send()`, `sendStream()`, `restoreHistory()`, `clear()`, `messages`). |
| `suspend fun connect() / health() / models() / capabilities()` | Low-level inspection returning `ProviderHealth`, `List<ModelInfo>`, and `Capabilities`. |
| `suspend fun generate(...) / chat(...)` | One-shot or multi-turn non-streaming completions (supports `tools` and `useProviderTools`). |
| `fun generateStream(...) / chatStream(...)` | Cold `Flow<String>` SSE stream; cancelling coroutine collection automatically calls `POST /v1/cancel`. |
| `suspend fun cancel(requestId): Boolean` | Explicitly cancels an in-flight request by `X-Request-Id`. |
| `fun clearCredentials()` | Deletes cached token from Keystore-backed preferences. |

### 2.5 Lifecycle & UX Requirements for SDK Consumers
- Call `ai.checkConnection()` on startup **and** on `Lifecycle.Event.ON_RESUME` so returning from UOAI Provider auto-connects immediately.
- Render actionable UI for every `ConnectionState` variant:
  - `ProviderNotInstalled` → Prompt to install `com.uoai.provider`.
  - `NeedsRegistration` → Launch `conn.registrationIntent` via `ActivityResultContracts.StartActivityForResult()`.
  - `ProviderNotRunning` → One-tap **"Open Provider & Start API"** (`conn.launchProviderIntent`).
  - `ModelNotReady` → One-tap **"Load Model (`modelState`)"** (`conn.launchProviderIntent`).
  - `Connected` → Display ready state (respecting `capabilities.contextWindowTokens`) and provide a **Stop** button wired to coroutine `Job.cancel()`.
  - `Error` → Display error and Retry button.

---

## 3. Integration Path B — Direct HTTP/SSE (Without the AAR)

Path B supports Java-only Android apps, custom HTTP stacks (OkHttp/Ktor), Flutter method channels, and React Native native modules.

### 3.1 Required Manifest & Loopback XML
- `AndroidManifest.xml` must declare `android.permission.INTERNET`, `<queries><package android:name="com.uoai.provider" /></queries>` (mandatory on Android 11+ / API 30+), and `android:networkSecurityConfig="@xml/network_security_config"`.
- `res/xml/network_security_config.xml` must permit cleartext traffic strictly for `127.0.0.1` and `localhost` (`includeSubdomains="false"`).

### 3.2 Registration Intent Protocol
Launch `Intent("com.uoai.provider.action.REGISTER").setPackage("com.uoai.provider")` via `startActivityForResult` or `ActivityResultContracts.StartActivityForResult()` (without `FLAG_ACTIVITY_NEW_TASK`):

| Result Code | Extras | Required Client Behavior |
| :--- | :--- | :--- |
| `Activity.RESULT_OK` | `token: String` (`"uoai_..."`), `client_id: String` | Persist token in Android Keystore / `EncryptedSharedPreferences`. Silent rotation occurs on re-registration if `APPROVED` with matching cert. |
| `Activity.RESULT_CANCELED` | `error_code: String`, `error: String` | Handle denial/abort. Codes: `no_caller`, `identity`, `certificate_mismatch`, `disabled`, `rejected`, `cancelled`. |

### 3.3 HTTP Client Timeout Guidance (OkHttp Reference)
- **Connect timeout:** `3` seconds (local loopback should fail fast if `ProviderService` is stopped).
- **Read timeout:** `300` seconds (aligned with the `300,000` ms generation timeout).
- Capture `resp.header("X-Request-Id")` immediately on `200 OK` responses to support cancellation.

---

## 4. AI Coding Assistant Integration Workflow

To accelerate adoption across **Cursor, Claude Code, Antigravity, Gemini, and Copilot**, UOAI provides self-contained Path A and Path B implementation prompts ([ai-prompt](https://kumodd.github.io/privacy-policy/ai-prompt/)). The standardized AI assistant workflow enforces 5 steps:
1. **Inspect Project:** Check `minSdk >= 26`, JVM target `17`, coroutine/serialization versions, `applicationIdSuffix`, `networkSecurityConfig`, presence of `app/libs/sdk-release.aar`, and UI architecture (Compose vs. XML Views).
2. **Configure Gradle & Manifest:** Wire dependencies, distinct debug/release package IDs, and loopback-only network security config.
3. **Implement Connection, Registration & Streaming:** Wire `UniversalAIClient`, `ON_RESUME` connection refresh, `StartActivityForResult` registration, streaming `Flow<String>`, Stop/Cancel button, and exception handling.
4. **Optional Tool Calling:** Apply `stream = false` and `toolCalling` rules if needed, keeping embeddings/STT/vision inside the client app.
5. **Verify Before Finishing:** Run `./gradlew assembleDebug`, verify zero `.task`, `.litertlm`, or `.bin` weights were bundled, and report modified files.

---

## 5. Testing, ADB Debugging & Pre-Release Checklist

### 5.1 Workstation ADB Inspection
Developers can inspect the live loopback API on a connected Android device via ADB port forwarding:

```bash
adb forward tcp:8765 tcp:8765
curl -s http://127.0.0.1:8765/v1/health
curl -s -H "Authorization: Bearer $TOKEN" http://127.0.0.1:8765/v1/capabilities
```

### 5.2 Mandatory Pre-Release Checklist
1. **Dynamic Discovery:** Pass `"model": "auto"` and read `GET /v1/capabilities` dynamically instead of hardcoding model IDs or context limits.
2. **Signing Hygiene:** Use distinct debug vs. release `applicationId` (`applicationIdSuffix = ".debug"`) and sign release APKs with a **single** signing certificate.
3. **Registration Launch Mode:** Launch `com.uoai.provider.action.REGISTER` with `startActivityForResult` (never `FLAG_ACTIVITY_NEW_TASK`).
4. **Auto-Reconnect on Resume:** Re-check provider state on `ON_RESUME` so returning from UOAI Provider connects immediately.
5. **R8 Minified Verification:** Test an R8-minified release build (`isMinifyEnabled = true`) end-to-end against `com.uoai.provider` on a physical Android device.
6. **Zero Weight Audit:** Confirm the final release APK contains zero `.task`, `.litertlm`, or `.bin` weights (e.g., `unzip -l app-release.apk`).

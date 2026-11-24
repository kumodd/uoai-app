import type { PreReleaseCheck } from "@/types/uoai";

export const PATH_A_GRADLE = `// app/build.gradle.kts (minSdk >= 26, Java/Kotlin target 17)
android {
    defaultConfig { applicationId = "com.yourcompany.yourapp" }
    buildTypes {
        debug { applicationIdSuffix = ".debug" }
    }
}

dependencies {
    implementation(files("libs/sdk-release.aar"))
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.11.0")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.8.1")
}`;

export const PATH_A_KOTLIN = `val ai = UniversalAIClient(applicationContext) // model = "auto"
val session = ai.startChat(systemPrompt = "You are a helpful, concise assistant.")

// Refresh on startup & Lifecycle.Event.ON_RESUME
when (val conn = ai.checkConnection()) {
    ConnectionState.ProviderNotInstalled -> promptInstall("com.uoai.provider")
    is ConnectionState.NeedsRegistration -> regLauncher.launch(conn.registrationIntent)
    is ConnectionState.ProviderNotRunning -> conn.launchProviderIntent?.let(::startActivity)
    is ConnectionState.ModelNotReady -> conn.launchProviderIntent?.let(::startActivity)
    is ConnectionState.Connected -> {
        streamJob = viewModelScope.launch {
            session.sendStream(prompt).collect { token -> appendToken(token) }
        }
    }
    is ConnectionState.Error -> showRetry(conn.message)
}
// Cancelling streamJob automatically calls POST /v1/cancel`;

export const PATH_B_MANIFEST_XML = `<!-- AndroidManifest.xml (API 30+ <queries> mandatory) -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <queries>
        <package android:name="com.uoai.provider" />
    </queries>
    <application android:networkSecurityConfig="@xml/network_security_config">
        ...
    </application>
</manifest>

<!-- res/xml/network_security_config.xml -->
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="false">127.0.0.1</domain>
        <domain includeSubdomains="false">localhost</domain>
    </domain-config>
</network-security-config>`;

export const PATH_B_OKHTTP = `// Never pass FLAG_ACTIVITY_NEW_TASK or OS caller verification fails
val intent = Intent("com.uoai.provider.action.REGISTER")
    .setPackage("com.uoai.provider")
registrationLauncher.launch(intent)

val http = OkHttpClient.Builder()
    .connectTimeout(3, TimeUnit.SECONDS)
    .readTimeout(300, TimeUnit.SECONDS)
    .build()

val req = Request.Builder()
    .url("http://127.0.0.1:8765/v1/chat/completions")
    .header("Authorization", "Bearer $token")
    .post("""{"model":"auto","messages":[{"role":"user","content":"Hi"}],"stream":false}"""
        .toRequestBody("application/json".toMediaType()))
    .build()

http.newCall(req).execute().use { resp ->
    val requestId = resp.header("X-Request-Id")
    val body = resp.body?.string().orEmpty()
    if (!resp.isSuccessful) error("HTTP \${resp.code}: $body")
}`;

export const AI_PROMPT_PATH_A = `You are integrating **Universal Offline AI Provider (\`com.uoai.provider\`)** into my existing Android app so it can run 100% offline, on-device Gemma 3 / Gemma 4 LLM inference over localhost loopback (\`http://127.0.0.1:8765/v1\`) without bundling any model weights or inference runtime.

### My Feature Goal
[DESCRIBE WHERE AND HOW YOU WANT OFFLINE AI IN YOUR APP — e.g. "Add an offline AI assistant / summarize action in MainActivity or NoteDetailScreen with streaming output and a Stop button."]

### Step 1: Inspect My Existing Project First
1. Inspect \`app/build.gradle.kts\` for \`minSdk\` (>= 26), Java/Kotlin target (17), \`kotlinx-coroutines-android\`, \`kotlinx-serialization-json\`, \`applicationId\`, and \`buildTypes.debug.applicationIdSuffix\`.
2. Inspect \`AndroidManifest.xml\` for any existing \`android:networkSecurityConfig\`.
3. Verify \`app/libs/sdk-release.aar\` exists (if missing, tell me where to drop it and still wire the code cleanly).
4. Inspect existing architecture (Compose vs. XML Views, ViewModel / DI setup, Activity lifecycle).

### Step 2: Gradle & Manifest Configuration (Path A — Kotlin SDK)
1. Add \`implementation(files("libs/sdk-release.aar"))\`, \`kotlinx-coroutines-android:1.11.0\`, and \`kotlinx-serialization-json:1.8.1\`.
2. Set \`buildTypes { debug { applicationIdSuffix = ".debug" } }\` so switching builds never triggers \`certificate_mismatch\`.
3. Only if an existing \`networkSecurityConfig\` exists, add \`tools:replace="android:networkSecurityConfig"\` and whitelist \`127.0.0.1\` + \`localhost\`. Never enable global \`usesCleartextTraffic="true"\`.

### Step 3: Implement Connection, Registration & Streaming
- Use \`UniversalAIClient(applicationContext)\` with default \`ClientConfig(model = "auto")\`.
- Handle \`checkConnection()\` states (\`ProviderNotInstalled\`, \`NeedsRegistration\`, \`ProviderNotRunning\`, \`ModelNotReady\`, \`Connected\`, \`Error\`) and refresh on \`Lifecycle.Event.ON_RESUME\`.
- Launch \`registrationIntent\` via \`ActivityResultContracts.StartActivityForResult()\` (NEVER add \`FLAG_ACTIVITY_NEW_TASK\`).
- Use \`ai.startChat(...)\` + \`session.sendStream(prompt)\` with a Stop button cancelling the coroutine \`Job\` (calls \`POST /v1/cancel\`).
- Handle \`NotRegisteredException\` (\`clearCredentials()\`), \`PermissionDeniedException\`, \`ProviderNotRunningException\`, and \`ModelNotReadyException\`.

### Step 4: Verify Before Finishing
1. Run \`./gradlew assembleDebug\`.
2. Confirm zero \`.task\`, \`.litertlm\`, or \`.bin\` model weights were bundled.`;

export const AI_PROMPT_PATH_B = `You are integrating **Universal Offline AI Provider (\`com.uoai.provider\`)** into my app via **Path B (Direct HTTP/SSE without sdk-release.aar)** over localhost loopback (\`http://127.0.0.1:8765/v1\`).

### My Feature Goal
[DESCRIBE WHERE AND HOW YOU WANT OFFLINE AI IN YOUR APP]

### Step 1: Manifest, Loopback Security & Signing
1. Add \`<uses-permission android:name="android.permission.INTERNET" />\` and \`<queries><package android:name="com.uoai.provider" /></queries>\` to \`AndroidManifest.xml\`.
2. Add \`res/xml/network_security_config.xml\` permitting cleartext strictly for \`127.0.0.1\` and \`localhost\` (\`includeSubdomains="false"\`).
3. Ensure distinct debug/release \`applicationId\` and single-signer release APK signing.

### Step 2: Registration Intent & Keystore Token Storage
- Launch \`Intent("com.uoai.provider.action.REGISTER").setPackage("com.uoai.provider")\` via \`StartActivityForResult\` (never \`FLAG_ACTIVITY_NEW_TASK\`).
- On \`RESULT_OK\`, encrypt returned \`token\` (\`uoai_...\`) in Android Keystore / \`EncryptedSharedPreferences\`.
- On \`RESULT_CANCELED\`, handle \`error_code\` (\`no_caller\`, \`identity\`, \`certificate_mismatch\`, \`disabled\`, \`rejected\`, \`cancelled\`).

### Step 3: Loopback Endpoints & SSE Parsing
- Check \`GET /v1/health\` (unauthenticated), then \`GET /v1/models\` and \`GET /v1/capabilities\` with \`Authorization: Bearer <token>\`.
- Send \`POST /v1/chat/completions\` with \`"model": "auto"\`, capture \`X-Request-Id\`, stream \`data:\` SSE chunks until \`[DONE]\`, and support \`POST /v1/cancel\`.`;

export const PRE_RELEASE_CHECKLIST: PreReleaseCheck[] = [
  {
    num: 1,
    text: 'Pass "model": "auto" and read GET /v1/capabilities dynamically instead of hardcoding model IDs or context sizes.',
  },
  {
    num: 2,
    text: 'Use distinct debug vs. release applicationId (applicationIdSuffix = ".debug") and sign release APKs with a single certificate.',
  },
  {
    num: 3,
    text: "Launch com.uoai.provider.action.REGISTER with startActivityForResult (never FLAG_ACTIVITY_NEW_TASK).",
  },
  {
    num: 4,
    text: "Re-check provider state on Lifecycle.Event.ON_RESUME so returning from UOAI Provider auto-connects immediately.",
  },
  {
    num: 5,
    text: "Test an R8-minified release build (isMinifyEnabled = true) end-to-end against com.uoai.provider on a physical device.",
  },
  {
    num: 6,
    text: "Confirm final APK contains zero .task, .litertlm, or .bin weights (unzip -l app-release.apk).",
  },
];

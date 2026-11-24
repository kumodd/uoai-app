export type TileTone = "olive" | "mint" | "sand" | "terracotta";

export type EcosystemAppKey = "provider" | "chat" | "keyboard";

export interface HeroMetric {
  id: string;
  value: string;
  label: string;
  tone: TileTone;
  mono?: boolean;
  icon: "shield" | "layers" | "lock" | "package";
}

export interface EcosystemApp {
  key: EcosystemAppKey;
  kicker: string;
  title: string;
  subtitle: string;
  pkg: string;
  status: string;
  summary: string;
  tone: TileTone;
  icon: "cpu" | "message" | "keyboard";
  privacyUrl: string;
  termsUrl: string;
  directHtmlUrl: string;
  playStoreUrl: string;
  features: string[];
  secondaryHeading: string;
  chips: string[];
}

export interface ApiEndpoint {
  id: string;
  method: "GET" | "POST";
  path: string;
  summary: string;
  meta: string;
  badge: string;
  payload: string;
}

export interface TrustStep {
  step: string;
  title: string;
  description: string;
}

export interface ModelStateItem {
  name: string;
  variant: "default" | "ready" | "error";
}

export interface ErrorEntry {
  status: string;
  codes: string;
  sdkException: string;
  recovery: string;
}

export interface PreReleaseCheck {
  num: number;
  text: string;
}

export interface PlaySafetyRow {
  question: string;
  answer: string;
  details: string;
}

export interface PermissionRow {
  permission: string;
  type: string;
  justification: string;
}

export interface PrivacyAppData {
  key: EcosystemAppKey;
  label: string;
  pkg: string;
  effectiveDate: string;
  privacyUrl: string;
  termsUrl: string;
  safetyRows: PlaySafetyRow[];
  permissionRows: PermissionRow[];
  deletionControls: string[];
}

export interface BrdDocMeta {
  slug: string;
  num: string;
  title: string;
  summary: string;
  filename: string;
}

export interface BrdDocFull extends BrdDocMeta {
  content: string;
}

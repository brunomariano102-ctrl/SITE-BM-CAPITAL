export const CONSENT_KEY = "bm_cookie_preferences";
// A choice made before collection is activated cannot authorize a later release.
export const CONSENT_VERSION = process.env.NEXT_PUBLIC_MEASUREMENT_ENABLED === "true"
  ? "2026-10-23-v1-active" : "2026-10-23-v1-preparation";
// Proposed retention for review; applies only to the preference in this browser.
export const CONSENT_DAYS = 180;
export type Preferences = {
  version: typeof CONSENT_VERSION;
  analytics: boolean;
  advertising: boolean;
  savedAt: number;
};
export const denied = { analytics: false, advertising: false };
export function parsePreferences(raw: string | null, now = Date.now()): Preferences | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    if (value.version !== CONSENT_VERSION || typeof value.analytics !== "boolean" ||
      typeof value.advertising !== "boolean" || !Number.isFinite(value.savedAt) ||
      value.savedAt > now || now - value.savedAt >= CONSENT_DAYS * 86400000) return null;
    return { version: CONSENT_VERSION, analytics: value.analytics, advertising: value.advertising, savedAt: value.savedAt };
  } catch { return null; }
}
export function readPreferences(): Preferences | null {
  try { return parsePreferences(window.localStorage.getItem(CONSENT_KEY)); } catch { return null; }
}
export function savePreferences(analytics: boolean, advertising: boolean): Preferences {
  const value: Preferences = { version: CONSENT_VERSION, analytics, advertising, savedAt: Date.now() };
  // Fail closed if the browser refuses storage: never pretend the choice was saved.
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  return value;
}
export function removeOptionalCookies() {
  const names = document.cookie.split(";").map(cookie => cookie.trim().split("=")[0]);
  const hostParts = location.hostname.split(".");
  const domains = ["", ...hostParts.map((_, i) => hostParts.slice(i).join("."))];
  for (const name of names) {
    if (!/^(_ga(?:_|$)|_gid$|_gat(?:_|$)|_gcl_|_fbp$|_fbc$)/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ""}`;
    }
  }
}

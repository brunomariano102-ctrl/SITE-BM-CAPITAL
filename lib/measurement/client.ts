"use client";
import { readPreferences, removeOptionalCookies, type Preferences } from "./consent";

export type MeasurementEvent = "bm_page_view" | "bm_campaign_view" | "bm_prediagnosis_start" | "bm_prediagnosis_complete" | "bm_whatsapp_click";
type Pixel = ((...args: unknown[]) => void) & { queue: unknown[][]; callMethod?: (...args: unknown[]) => void; loaded?: boolean; version?: string; push?: Pixel };
declare global {
  interface Window { dataLayer?: unknown[]; fbq?: Pixel; _fbq?: Pixel; }
}
const campaignPath = "/campanhas/consorcios";
const knownPaths = new Set(["/", "/privacidade", "/cookies", campaignPath,
  ...["consorcios", "credito", "seguros", "investimentos", "planejamento"].map(s => `/solucoes/${s}`)]);
const enabled = process.env.NEXT_PUBLIC_MEASUREMENT_ENABLED === "true";
const testModeRequested = process.env.NEXT_PUBLIC_MEASUREMENT_TEST_MODE === "true";
const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "";
const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
// Financial-service custom events await a separate review in Meta Events Manager.
// PageView is the only Meta event released in this activation.
const metaFunnelEnabled = process.env.NEXT_PUBLIC_META_FUNNEL_ENABLED === "true";
const gaId = process.env.NEXT_PUBLIC_GA4_ID || "";
const origin = "https://www.solucoesbmcapital.com.br";
let suspended = false;
let deploymentEnvironment = "unknown";
let lastPage = "";
let attribution: { source: string; medium: string; campaign: string } | undefined;

function permittedEnvironment() {
  const testMode = testModeRequested && ["preview", "development", "test"].includes(deploymentEnvironment);
  return enabled && (testMode || (deploymentEnvironment === "production" && location.hostname === "www.solucoesbmcapital.com.br"));
}
// VERCEL_ENV is server-only. The root Server Component passes a non-secret value.
// Until this runs, even a test-mode build is blocked.
export function configureMeasurementEnvironment(value: string) { deploymentEnvironment = value; }
function prepareUrl() {
  // Campaign codes are allowlisted: never forward arbitrary UTMs, click IDs or form data.
  if (!attribution) {
    const query = new URLSearchParams(location.search);
    const source = query.get("utm_source");
    const medium = query.get("utm_medium");
    attribution = {
      source: source && ["instagram", "facebook", "google", "whatsapp"].includes(source) ? source : "other",
      medium: medium && ["paid_social", "cpc", "organic", "referral"].includes(medium) ? medium : "other",
      campaign: query.get("utm_campaign") === "bm_consorcios_01" ? "bm_consorcios_01" : "none",
    };
  }
  // Vendor scripts may read the browser URL automatically. Remove query/hash first.
  if (location.search || location.hash) history.replaceState(history.state, "", location.pathname);
}
function safeReferrer() {
  if (!document.referrer) return true;
  try { const u = new URL(document.referrer); return !u.search && !u.hash; } catch { return false; }
}
function appendScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id; script.async = true; script.src = src; script.referrerPolicy = "origin";
  document.head.appendChild(script);
}
function startPixel() {
  if (!/^\d{8,20}$/.test(pixelId) || !safeReferrer()) return;
  if (!window.fbq) {
    const pixel = ((...args: unknown[]) => {
      if (pixel.callMethod) pixel.callMethod(...args); else pixel.queue.push(args);
    }) as Pixel;
    pixel.queue = []; pixel.push = pixel; pixel.loaded = true; pixel.version = "2.0";
    window.fbq = window._fbq = pixel;
    pixel("consent", "grant");
    pixel("set", "autoConfig", false, pixelId);
    pixel("init", pixelId); // No automatic advanced matching or customer information.
    appendScript("bm-meta-pixel", "https://connect.facebook.net/en_US/fbevents.js");
  }
}
export function applyPreferences(preferences: Preferences) {
  if (!permittedEnvironment() || suspended || !knownPaths.has(location.pathname)) return;
  if (!preferences.analytics && !preferences.advertising) return;
  prepareUrl();
  window.dataLayer ||= [];
  // The prepared GTM consent template consumes these flags using consent APIs.
  // It must be reviewed/installed before the container is published.
  window.dataLayer.push({ event: "bm_consent_update", bm_analytics: preferences.analytics,
    bm_advertising: preferences.advertising, bm_consent_version: preferences.version });
  if (preferences.analytics && /^GTM-[A-Z0-9]+$/.test(gtmId) && /^G-[A-Z0-9]+$/.test(gaId)) {
    if (!document.getElementById("bm-gtm")) {
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      appendScript("bm-gtm", `https://www.googletagmanager.com/gtm.js?id=${gtmId}`);
    }
  }
  if (preferences.advertising) startPixel();
}
export function revokeLoadedTools() {
  suspended = true;
  if (/^G-[A-Z0-9]+$/.test(gaId)) (window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] = true;
  window.fbq?.("consent", "revoke");
  removeOptionalCookies();
  // Reload removes already-executing third-party scripts. No events are replayed.
  location.reload();
}
export function trackEvent(event: MeasurementEvent) {
  if (!permittedEnvironment() || suspended || !knownPaths.has(location.pathname)) return;
  const p = readPreferences();
  if (!p || (!p.analytics && !p.advertising)) return;
  prepareUrl();
  const payload = { event, bm_analytics: p.analytics, bm_advertising: p.advertising,
    bm_page_path: location.pathname, bm_page_location: `${origin}${location.pathname}`,
    bm_page_referrer: "", bm_page_title: location.pathname === campaignPath ? "Consórcios | BM Capital" : "BM Capital",
    bm_source: attribution?.source || "other", bm_medium: attribution?.medium || "other",
    bm_campaign: attribution?.campaign || "none" };
  window.dataLayer ||= [];
  window.dataLayer.push(payload);
  if (p.advertising && window.fbq && /^\d{8,20}$/.test(pixelId)) {
    if (event === "bm_page_view") window.fbq("track", "PageView");
    else if (metaFunnelEnabled) window.fbq("trackCustom", ({ bm_campaign_view: "BMCampaignView", bm_prediagnosis_start: "BMPreDiagnosisStart",
      bm_prediagnosis_complete: "BMPreDiagnosisComplete", bm_whatsapp_click: "BMWhatsAppClick" } as const)[event]);
  }
}
export function trackPage() {
  if (!permittedEnvironment() || !knownPaths.has(location.pathname)) return;
  const p = readPreferences();
  if (!p || (!p.analytics && !p.advertising)) return;
  const key = `${location.pathname}:${p.analytics}:${p.advertising}`;
  if (lastPage === key) return;
  lastPage = key;
  trackEvent("bm_page_view");
  if (location.pathname === campaignPath) trackEvent("bm_campaign_view");
}

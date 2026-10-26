"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_DAYS, CONSENT_KEY, denied, readPreferences, removeOptionalCookies, savePreferences, type Preferences } from "../../lib/measurement/consent";
import { applyPreferences, configureMeasurementEnvironment, revokeLoadedTools, trackPage } from "../../lib/measurement/client";
import "./consent.css";

export function ConsentManager({ deploymentEnvironment }: { deploymentEnvironment: string }) {
  const path = usePathname();
  const [choice, setChoice] = useState<Preferences | null>(null);
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);
  const [draft, setDraft] = useState(denied);
  const [error, setError] = useState("");
  const dialog = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    configureMeasurementEnvironment(deploymentEnvironment);
    const value = readPreferences();
    setChoice(value); setDraft(value || denied); setVisible(!value);
    if (value) { applyPreferences(value); trackPage(); }
    const sync = (event: StorageEvent) => {
      if (event.key !== CONSENT_KEY) return;
      // Includes revocation, expiration, corruption and changes from another tab.
      revokeLoadedTools();
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [deploymentEnvironment]);
  useEffect(() => { trackPage(); }, [path]);
  useEffect(() => {
    if (!choice) return;
    let expiry: number;
    const schedule = () => {
      const remaining = choice.savedAt + CONSENT_DAYS * 86400000 - Date.now();
      if (remaining <= 0 || !readPreferences()) { revokeLoadedTools(); return; }
      expiry = window.setTimeout(schedule, Math.min(remaining, 2000000000));
    };
    schedule();
    return () => window.clearTimeout(expiry);
  }, [choice]);
  useEffect(() => {
    if (!visible || !details) return;
    previousFocus.current = document.activeElement as HTMLElement;
    dialog.current?.querySelector<HTMLButtonElement>("button")?.focus();
    return () => previousFocus.current?.focus();
  }, [visible, details]);

  function choose(analytics: boolean, advertising: boolean) {
    try {
      const value = savePreferences(analytics, advertising);
      const downgrade = !!choice && ((choice.analytics && !analytics) || (choice.advertising && !advertising));
      setChoice(value); setDraft(value); setVisible(false); setDetails(false); setError("");
      if (!analytics && !advertising) removeOptionalCookies();
      if (downgrade) revokeLoadedTools();
      else { applyPreferences(value); trackPage(); }
    } catch {
      if (choice?.analytics || choice?.advertising) {
        try { window.localStorage.removeItem(CONSENT_KEY); } catch { /* Unavailable storage also fails closed on reload. */ }
        revokeLoadedTools();
        return;
      }
      setError("Não foi possível salvar sua preferência neste navegador. As ferramentas opcionais permanecem bloqueadas.");
    }
  }
  return (
    <>
      <button className="bm-cookie-open" onClick={() => { setDraft(choice || denied); setDetails(true); setVisible(true); }}>Preferências de cookies</button>
      {visible && <div className={`bm-cookie-layer ${details ? "bm-cookie-modal" : ""}`}>
        <div ref={dialog} className="bm-cookie-panel" role={details ? "dialog" : "region"} aria-modal={details ? true : undefined}
          aria-labelledby="bm-cookie-title" onKeyDown={event => {
            if (!details) return;
            if (event.key === "Escape") { setDetails(false); if (choice) setVisible(false); }
            if (event.key === "Tab") {
              const items = dialog.current?.querySelectorAll<HTMLElement>('button, input, a[href]');
              if (!items?.length) return;
              const first = items[0], last = items[items.length - 1];
              if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
              else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
            }
          }}>
          <h2 id="bm-cookie-title">{details ? "Suas preferências de cookies" : "Uso de cookies"}</h2>
          {details ? <p>Você pode permitir ferramentas opcionais para analisar visitas ou personalizar anúncios. Recusar não impede navegar ou solicitar atendimento. <a href="/cookies">Conheça os usos e prazos</a>.</p> : <p>Com sua autorização, usamos cookies e tecnologias semelhantes para analisar visitas e personalizar anúncios. Consulte nossa <a href="/cookies">Política de cookies</a>.</p>}
          {details && process.env.NEXT_PUBLIC_MEASUREMENT_ENABLED !== "true" && <p>As ferramentas de análise e publicidade ainda não estão ativas. Quando forem ativadas, pediremos uma nova escolha.</p>}
          {details && <>
            <div className="bm-cookie-category"><strong>Necessários</strong><span>Sempre ativos. Guardamos apenas suas preferências neste navegador.</span></div>
            <label className="bm-cookie-category"><input type="checkbox" checked={draft.analytics} onChange={e => setDraft({ ...draft, analytics: e.target.checked })} /><span><strong>Análise de visitas — Google Analytics</strong> Ajuda a entender páginas acessadas e etapas até a abertura do WhatsApp.</span></label>
            <label className="bm-cookie-category"><input type="checkbox" checked={draft.advertising} onChange={e => setDraft({ ...draft, advertising: e.target.checked })} /><span><strong>Publicidade — Meta Pixel</strong> Permite medir anúncios e formar públicos para novas exibições, conforme as regras da Meta.</span></label>
            <p>Essas escolhas são independentes da autorização para receber mensagens comerciais. Você pode alterá-las aqui a qualquer momento. Ao retirar uma permissão, a página será recarregada e os dados não enviados do formulário não serão guardados.</p>
          </>}
          {error && <p role="alert">{error}</p>}
          {!details && <div className="bm-cookie-manage-row"><button className="bm-cookie-manage" onClick={() => setDetails(true)}>Gerenciar cookies</button></div>}
          <div className="bm-cookie-actions">
            <button onClick={() => choose(false, false)}>Rejeitar cookies</button>
            <button onClick={() => choose(true, true)}>Aceitar cookies</button>
            {details && <button onClick={() => choose(draft.analytics, draft.advertising)}>Salvar preferências</button>}
          </div>
          {details && <button className="bm-cookie-close" onClick={() => { setDetails(false); if (choice) setVisible(false); }}>Voltar</button>}
        </div>
      </div>}
    </>
  );
}

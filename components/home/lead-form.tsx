"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { trackEvent } from "../../lib/measurement/client";
import { objectives } from "../../lib/objectives";
import { buildWhatsAppUrl } from "../../lib/whatsapp";
import { useDiagnosis } from "./diagnosis-provider";

export function LeadForm() {
  const started = useRef(false);
  const completed = useRef(false);
  const { goal, setGoal } = useDiagnosis();
  const [ready, setReady] = useState(false);
  const [submission, setSubmission] = useState<{
    goal: string;
    url: string;
  } | null>(null);
  const currentUrl = submission?.goal === goal ? submission.url : null;

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    setSubmission(null);
  }, [goal]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    if (
      !name ||
      !goal ||
      !data.get("when") ||
      !data.has("privacyAcknowledgement")
    )
      return;
    const url = buildWhatsAppUrl({
      name,
      objective: goal,
      when: String(data.get("when")),
      marketing: data.has("marketingConsent"),
    });
    if (!completed.current) { trackEvent("bm_prediagnosis_complete"); completed.current = true; }
    trackEvent("bm_whatsapp_click");
    setSubmission({ goal, url });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      className="form"
      id="leadForm"
      onSubmit={submit}
      onFocusCapture={event => {
        if (!started.current && event.target instanceof HTMLElement && ["INPUT", "SELECT"].includes(event.target.tagName)) {
          trackEvent("bm_prediagnosis_start"); started.current = true;
        }
      }}
      onChange={() => setSubmission(null)}
    >
      <h3>Pré-diagnóstico BM</h3>
      <p>
        Preencha os campos e continue o atendimento pelo WhatsApp. Você poderá
        revisar a mensagem antes de enviar.
      </p>
      <div className="field">
        <label htmlFor="name">Como podemos chamar você?</label>
        <input
          id="name"
          name="name"
          placeholder="Seu primeiro nome"
          autoComplete="given-name"
          required
          maxLength={60}
          pattern=".*\S.*"
          title="Informe seu primeiro nome, sem usar apenas espaços."
        />
      </div>
      <div className="field">
        <label htmlFor="goal">Qual é seu objetivo principal?</label>
        <select
          id="goal"
          name="goal"
          required
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
        >
          <option value="">Selecione uma opção</option>
          {objectives.map(({ title }) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
          <option value="Outro objetivo">Outro objetivo</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="when">Quando pretende avançar?</label>
        <select id="when" name="when" required>
          <option value="">Selecione uma opção</option>
          <option>Nos próximos 3 meses</option>
          <option>Entre 3 e 12 meses</option>
          <option>Mais de 12 meses</option>
          <option>Ainda estou planejando</option>
        </select>
      </div>
      <fieldset className="privacy-consents">
        <legend>Privacidade e suas escolhas</legend>
        <label className="consent-option">
          <input
            id="privacyAcknowledgement"
            name="privacyAcknowledgement"
            type="checkbox"
            required
          />
          <span>
            Li o{" "}
            <a href="/privacidade" target="_blank" rel="noopener noreferrer">
              Aviso de Privacidade
            </a>{" "}
            e estou ciente do uso dos dados para preparar minha solicitação e
            atender meu contato, conforme as finalidades e bases legais
            informadas. <strong>(Obrigatório para prosseguir)</strong>
          </span>
        </label>
        <label className="consent-option">
          <input
            id="marketingConsent"
            name="marketingConsent"
            type="checkbox"
          />
          <span>
            Autorizo, opcionalmente, o envio de novidades, conteúdos e ofertas
            da BM Capital por WhatsApp ou e-mail, quando fornecido. Posso
            retirar essa autorização a qualquer momento.{" "}
            <strong>(Opcional)</strong>
          </span>
        </label>
        <p className="privacy-hint">
          O compartilhamento com instituições financeiras ou outros parceiros
          para análise de produtos será informado e avaliado separadamente,
          quando necessário. Este formulário não autoriza compartilhamento
          indiscriminado.
        </p>
      </fieldset>
      <button type="submit" className="btn" disabled={!ready}>
        Continuar pelo WhatsApp ↗
      </button>
      <div
        className="feedback"
        id="feedback"
        role="status"
        aria-live="polite"
        style={{ display: currentUrl ? "block" : "none" }}
      >
        {currentUrl && (
          <>
            Se o WhatsApp não abriu automaticamente,{" "}
            <a href={currentUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("bm_whatsapp_click")}>
              toque aqui para continuar
            </a>
            . Revise a mensagem antes de enviar.
          </>
        )}
      </div>
      <noscript>
        <p>
          Ative o JavaScript para preparar sua mensagem com segurança ou entre
          em contato pelo e-mail informado no rodapé.
        </p>
      </noscript>
      <p className="note">
        Ao continuar, os dados preenchidos e suas escolhas comporão uma URL
        aberta no serviço WhatsApp. Você poderá revisar a mensagem antes de
        enviá-la à BM Capital. A abertura do serviço está sujeita às práticas de
        privacidade do WhatsApp. Este formulário não mantém histórico de
        consentimentos. Não inclua documentos, senhas ou informações financeiras
        sensíveis.
      </p>
    </form>
  );
}

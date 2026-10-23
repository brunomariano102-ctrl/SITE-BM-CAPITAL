const PRIVACY_NOTICE_DATE = "2026-10-23";
const PRIVACY_NOTICE_REVISION = 4;
export const PRIVACY_NOTICE_VERSION = `${PRIVACY_NOTICE_DATE}-r${PRIVACY_NOTICE_REVISION}`;
export const PRIVACY_NOTICE_DISPLAY_VERSION = `${PRIVACY_NOTICE_DATE.split("-").reverse().join("/")} — revisão ${PRIVACY_NOTICE_REVISION}`;
export const WHATSAPP_NUMBER = "5573999724985";

export type DiagnosisMessage = {
  name: string;
  objective: string;
  when: string;
  marketing: boolean;
};

// Only prepares a URL. Sending remains a separate action in WhatsApp.
export function buildWhatsAppUrl({
  name,
  objective,
  when,
  marketing,
}: DiagnosisMessage) {
  const message = `Olá, BM Capital! Meu nome é ${name.trim()}. Gostaria de solicitar o Diagnóstico BM. Meu objetivo é: ${objective}. Meu prazo é: ${when}. Li o Aviso de Privacidade (versão ${PRIVACY_NOTICE_VERSION}). Comunicações comerciais opcionais: ${marketing ? "AUTORIZO" : "NÃO AUTORIZO"}. Esta mensagem é enviada somente após minha confirmação no WhatsApp.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

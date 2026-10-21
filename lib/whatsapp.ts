export const PRIVACY_NOTICE_VERSION = "2026-10-21";
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

import type { Metadata } from "next";
import { site } from "../../lib/site";
import { PRIVACY_NOTICE_VERSION } from "../../lib/whatsapp";

export const metadata: Metadata = {
  title: "Aviso de Privacidade",
  description: `Aviso de Privacidade da ${site.legalName}.`,
  alternates: { canonical: "/privacidade" },
  openGraph: {
    title: "Aviso de Privacidade | BM Capital",
    description: `Aviso de Privacidade da ${site.legalName}.`,
    url: "/privacidade",
    locale: "pt_BR",
    type: "website",
  },
};
export default function Privacidade() {
  return (
    <main
      style={{
        maxWidth: 820,
        margin: "60px auto",
        padding: "0 24px 60px",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.8,
        color: "#172636",
      }}
    >
      <a href="/">← Voltar à BM Capital</a>
      <h1>Aviso de Privacidade</h1>
      <p>
        <strong>Versão:</strong> {PRIVACY_NOTICE_VERSION.split("-").reverse().join("/")}. <strong>Status:</strong> aviso
        preliminar, sujeito à validação jurídica antes da publicação.
      </p>
      <h2>1. Quem trata os dados</h2>
      <p>
        A {site.legalName}, CNPJ {site.cnpj}, com sede em {site.registeredAddress},
        é a controladora dos dados do atendimento descrito neste site.
      </p>
      <h2>2. Dados e finalidades</h2>
      <p>
        O pré-diagnóstico solicita primeiro nome, objetivo e prazo estimado.
        Esses dados são usados localmente no navegador para preparar uma
        mensagem de WhatsApp que você poderá revisar. Caso você decida enviá-la,
        a BM Capital poderá usar o conteúdo e seu contato para responder à
        solicitação, realizar o diagnóstico consultivo e dar continuidade às
        providências que você pedir.
      </p>
      <h2>3. Bases legais</h2>
      <p>
        O atendimento solicitado poderá envolver procedimentos preliminares
        relacionados a contrato a pedido do titular ou outra base legal adequada
        ao caso, conforme a LGPD. O envio de comunicações promocionais
        opcionais, quando baseado em consentimento, depende de autorização
        específica, livre e revogável. A confirmação de leitura deste aviso não
        constitui consentimento geral.
      </p>
      <h2>4. Compartilhamento</h2>
      <p>
        O preenchimento do formulário não autoriza o envio indiscriminado de
        dados a bancos, administradoras, seguradoras ou parceiros. Quando o
        andamento da solicitação exigir compartilhamento, a BM Capital deverá
        informar os destinatários ou categorias pertinentes, a finalidade e a
        base legal aplicável, solicitando consentimento específico quando
        exigido. O WhatsApp possui suas próprias práticas de tratamento de
        dados.
      </p>
      <h2>5. Armazenamento e retenção</h2>
      <p>
        Esta versão do formulário não envia informações para banco de dados ou
        servidor da BM Capital e não mantém histórico de aceites. Se você enviar
        a mensagem pelo WhatsApp, ela poderá integrar o histórico de
        atendimento, conforme regras de retenção a serem formalizadas pela BM
        Capital. A futura integração com CRM exigirá atualização deste aviso e
        controles próprios.
      </p>
      <h2>6. Direitos dos titulares</h2>
      <p>
        Você pode solicitar informações sobre tratamento, acesso, correção,
        eliminação quando cabível, informações sobre compartilhamento e
        revogação de consentimentos. Envie sua solicitação para{" "}
        <a href="mailto:bmcapitalsolucoes@gmail.com">
          bmcapitalsolucoes@gmail.com
        </a>
        . O exercício de direitos observará os requisitos e exceções previstos
        em lei.
      </p>
      <h2>7. Cookies e tecnologias</h2>
      <p>
        Esta versão não implementa banner de cookies de publicidade ou
        analytics. Antes de adicionar tecnologias de rastreamento não
        essenciais, serão avaliados aviso, preferências e mecanismos de
        consentimento adequados.
      </p>
      <h2>8. Atualizações</h2>
      <p>
        O aviso poderá ser atualizado para refletir novas funcionalidades,
        integrações e exigências legais. A versão publicada deverá corresponder
        aos tratamentos efetivamente realizados.
      </p>
      <p>
        <a href="/">Voltar ao site</a>
      </p>
    </main>
  );
}

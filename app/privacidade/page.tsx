import type { Metadata } from "next";
import { site } from "../../lib/site";
import { PRIVACY_NOTICE_DISPLAY_VERSION } from "../../lib/whatsapp";

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
        <strong>Versão:</strong> {PRIVACY_NOTICE_DISPLAY_VERSION}. Aviso aplicável ao
        site e aos canais de atendimento descritos abaixo.
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
        mensagem de atendimento. Ao continuar, os dados preenchidos e suas
        escolhas compõem uma URL aberta no serviço WhatsApp. Você poderá revisar
        a mensagem antes de enviá-la à BM Capital. A abertura do serviço externo
        está sujeita também às práticas de privacidade do WhatsApp. Caso você
        decida enviar a mensagem,
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
        Pessoas autorizadas da equipe interna da BM Capital poderão acessar os
        dados necessários para responder à sua solicitação. O atendimento poderá
        ser continuado pelo vendedor designado, inclusive por número próprio
        utilizado na atividade profissional, com identificação de sua atuação
        pela BM Capital. O encaminhamento para atendimento não representa
        autorização para futuras comunicações promocionais.
      </p>
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
        Os dados preenchidos neste formulário não são enviados a um backend de
        captação de leads da BM Capital nem gravados pelo formulário em um
        histórico de consentimentos. Se você enviar a mensagem no WhatsApp, as
        informações poderão integrar o histórico de atendimento. O controle
        manual das escolhas está sendo organizado sob a coordenação do
        responsável pela empresa, separado deste site.
      </p>
      <p>
        As regras de retenção e descarte de registros, conversas e backups ainda
        precisam ser formalizadas. A hospedagem Vercel pode processar registros
        técnicos de acesso, como endereço IP, URL e informações do navegador,
        para entregar e proteger o site. O formulário não inclui os dados
        preenchidos na URL das páginas da BM Capital. A futura integração com CRM exigirá atualização deste aviso
        e controles próprios.
      </p>
      <h2>6. Direitos dos titulares</h2>
      <p>
        Você pode solicitar informações sobre tratamento, acesso, correção,
        eliminação quando cabível, informações sobre compartilhamento e
        revogação de consentimentos. Envie sua solicitação para{" "}
        <a href="mailto:bmcapitalsolucoes@gmail.com">
          bmcapitalsolucoes@gmail.com
        </a>
        . Você também pode pedir a revogação de marketing ao vendedor que o
        estiver atendendo. Os pedidos serão encaminhados à coordenação
        responsável da BM Capital para tratamento nos canais envolvidos. A
        recusa de marketing não impede o atendimento solicitado. O exercício de
        direitos observará os requisitos e exceções previstos em lei.
      </p>
      <h2>7. Cookies e tecnologias</h2>
      <p>
        As preferências de análise de visitas e publicidade são opcionais e
        independentes da autorização para receber mensagens comerciais.
        Tecnologias opcionais só podem ser carregadas após a escolha
        correspondente. Consulte as finalidades, fornecedores, prazos
        e mecanismos de retirada em <a href="/cookies">Cookies e preferências</a>.
        O Google Analytics 4, via Tag Manager, mede visitas e etapas até o WhatsApp
        com autorização para análise. O Meta Pixel registra visitas públicas
        com autorização para publicidade, respeitando as restrições para serviços
        financeiros. Eventos personalizados do formulário na Meta permanecem
        desabilitados nesta etapa. Não enviamos os dados preenchidos no
        pré-diagnóstico a essas ferramentas. As escolhas anteriores à ativação
        não são reaproveitadas; você pode recusar ou retirar cada categoria.
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

# BM Capital — GA4 e Tag Manager (preparação, sem publicação)

## Histórico da preparação anterior aos aceites

A conta Google autenticada foi a mesma escolhida pelo responsável para o Search Console. Analytics e Tag Manager estavam sem contas configuradas. Foram preenchidos os assistentes de criação; os contratos ficaram pendentes de aceite, sem IDs gerados. GA4: conta BM Capital; propriedade BM Capital — Site institucional; Brasil, horário Bahia (GMT-03), BRL, Finanças, 1–10 funcionários; objetivos Gerar leads e Entender tráfego. Compartilhamentos opcionais da conta desativados. GTM: conta BM Capital, Brasil, contêiner www.solucoesbmcapital.com.br, Web, compartilhamento opcional desativado. Nenhum serviço pago.

## Atualização confirmada — 23/10/2026

Os termos de Analytics/GTM e tratamento foram aceitos após autorização expressa. Conta Analytics 413196058, propriedade 560453721, fluxo Site BM Capital 16187841364, ID G-PYPR0HEL34. Medição otimizada desativada, retenção de eventos e usuários em 2 meses, redefinição por nova atividade desativada. Compartilhamentos opcionais e comunicações opcionais desativados. Contêiner GTM-5PXJZZXF criado na conta 6399465930, contêiner 283298037, workspace 2. Workspace ainda precisa receber/revisar as tags e modelo abaixo; nenhuma versão foi enviada/publicada. Nenhum snippet direto do GA4 foi inserido no site e nenhuma variável real foi ativada na Vercel. Pixel 1710204487199305 criado após aceite adicional autorizado, ainda sem instalação pública, conforme PUBLICOS-META.md.

## Implantação proposta

- GA4 terá somente um responsável por envio: tags do contêiner GTM. Não instalar gtag separado, outra integração Vercel, plugin ou snippet duplicado.
- Meta Pixel terá somente um responsável por envio: loader manual do site. Não duplicá-lo no GTM, não ativar configuração automática, correspondência avançada ou API de Conversões nesta etapa.
- Configuração local está em `.env.measurement.example`; todos os IDs em branco e feature desativada. Variáveis NEXT_PUBLIC são públicas; nunca colocar tokens/API secrets nesses campos.
- Produção permite scripts somente no host oficial. Previews e localhost bloqueados, exceto modo de teste explícito em ambiente que não seja produção. Todos os fornecedores são interceptados nos testes.
- Google Tag Manager só carrega depois de autorização de análise de visitas. Aceitar somente publicidade carrega apenas o Pixel, sem requisições Google. Isso não basta sozinho: as tags internas também precisam das condições e do modelo de consentimento abaixo.

## Consentimento GTM — configuração necessária antes de publicar

Criar modelo personalizado de consentimento no editor de modelos do GTM usando `consent-template.js` deste diretório. Conceder somente leitura de `bm_analytics` na camada de dados e escrita dos tipos de consentimento utilizados pelo modelo. O código é fonte para o editor, não um contêiner JSON pronto/importado.

Criar uma tag desse modelo para **Consent Initialization — All Pages**, antes de qualquer tag de medição, e outra para evento personalizado `bm_consent_update`. A inicialização define denied por padrão e atualiza analytics_storage conforme o booleano `bm_analytics` já enfileirado pelo site. Nenhum consentimento para publicidade Google é concedido: Google Ads e Google Signals não fazem parte desta etapa. A publicidade Meta é controlada separadamente no código.

Criar variáveis da camada de dados (versão 2), somente para:

`bm_analytics`, `bm_page_location`, `bm_page_referrer`, `bm_page_title`, `bm_page_path`, `bm_source`, `bm_medium`, `bm_campaign`.

Criar constante para o ID real G-... do fluxo GA4. Não usar os IDs fictícios dos testes.

## Tags e acionadores

| Tag | Acionador e condições | Configuração |
| --- | --- | --- |
| Google tag / GA4 | bm_consent_update; bm_analytics é boolean true; analytics_storage concedido; uma vez por página | ID real G-...; send_page_view=false; allow_google_signals=false; allow_ad_personalization_signals=false; cookie_expires=15552000; cookie_update=false; page_location e page_referrer sanitizados da camada; título controlado |
| GA4 page_view | bm_page_view; bm_analytics=true; analytics_storage concedido | page_location, page_referrer e page_title da camada; não usar variáveis automáticas de URL/referrer |
| GA4 bm_campaign_view | evento de mesmo nome; mesmas condições | somente page_path e códigos allowlisted de origem/campanha |
| GA4 bm_prediagnosis_start | evento de mesmo nome; mesmas condições | somente page_path e códigos allowlisted |
| GA4 bm_prediagnosis_complete | evento de mesmo nome; mesmas condições | somente page_path e códigos allowlisted; representa formulário válido, não contato recebido |
| GA4 bm_whatsapp_click | evento de mesmo nome; mesmas condições | somente page_path e códigos allowlisted; representa tentativa de abrir/continuar, não mensagem enviada |

Usar a Google tag como tag de configuração/sequenciamento das tags GA4, garantindo que a inicialização preceda os eventos. Definir verificação adicional de analytics_storage para todas as tags Google. Nenhuma tag All Pages, History Change, clique genérico, Form Submission ou All Elements deve enviar eventos. Enhanced Measurement deve ficar desativado no fluxo para evitar captura automática de URLs de saída (wa.me contém os dados preparados).

## Configurações GA4 propostas

- Fluxo web no domínio oficial, sem instalar automaticamente o snippet.
- Retenção de eventos: 2 meses; não reiniciar retenção a cada nova atividade, se a interface oferecer a opção.
- Google Signals, publicidade personalizada, coleta de dados fornecidos pelo usuário e User-ID desativados.
- Ativar descarte de e-mails/parâmetros como proteção adicional, sem depender dele para sanitização.
- Marcar bm_prediagnosis_complete como evento principal de microconversão. Não marcar como venda ou contato recebido. bm_whatsapp_click é outro indicador operacional, sem somar ambos como dois leads.
- Dimensões personalizadas opcionais apenas para origem/campanha e page_path, sem nome, telefone, objetivo individual, prazo, faixa de recursos, conteúdo da mensagem ou permissão de mensagens.

## Protocolo antes de ativar

1. Confirmar titularidade dos três ativos e inserir IDs reais no ambiente seguro.
2. Aceites Google/Meta e criação do Pixel concluídos; não repetí-los por rotina.
3. Criar/revisar o workspace GTM e testar com Tag Assistant: sem escolha, recusa, análise somente, publicidade somente, ambas e revogação.
4. Confirmar zero requests GA4/Meta antes de consentimento e nenhuma requisição GA4 quando somente Meta for autorizado. Confirmar ausência de PII em requests reais de homologação.
5. Validar GTM sem publicação usando ambiente de homologação controlado. A simulação local não comprova recebimento no GA4 ou na Meta.
6. Validar retenção, cookies, operadores/transferências e a nova revisão do aviso. Preferência de cookies dura 180 dias como proposta, não como prazo legal obrigatório. Registro é local, sem backend de prova de consentimento.
7. Somente então solicitar aprovação final de publicação do site e do contêiner. Publicar GTM pode afetar sites que já usem esse contêiner: conferir ausência de instalações anteriores.

## Fontes técnicas

Google: https://developers.google.com/tag-platform/security/guides/consent

APIs do GTM: https://developers.google.com/tag-platform/tag-manager/templates/consent-apis

PII no GA4: https://support.google.com/analytics/answer/6366371

Nenhuma promessa de conformidade jurídica integral, métricas completas ou recuperação de todos os visitantes.

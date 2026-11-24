# Correção autorizada de atribuição — 24/11/2026

Bruno autorizou implementar/publicar a proposta da auditoria conjunta de TI e Marketing. Base de produção: a64052eb91d852d7355bf28b1c691c3b2172fe38; deployment Vercel CoDdYi8XT5enaKdKffsu3btwS8Tx; GTM-5PXJZZXF versão 2.

## Mudança

`lib/measurement/client.ts` reconhece `lancamento_trafego` e mantém `bm_consorcios_01`. Uma tupla completa com origem, mídia e campanha autorizadas é exposta nos campos `bm_campaign_source`, `bm_campaign_medium` e `bm_campaign_name` somente com análise consentida. Visitas diretas, campanhas desconhecidas e valores arbitrários não geram atribuição padrão. Os parâmetros `bm_*` anteriores permanecem.

A combinação do JSON candidato no workspace existente altera somente a tag Google de configuração e acrescenta três variáveis DLV. Os campos `campaign_source`, `campaign_medium` e `campaign_name` recebem essas variáveis antes do page_view explícito. O GTM pode remapear IDs das novas variáveis durante a importação; o arquivo é a candidata, não uma alegação de versão publicada.

Consentimento, hostname, minimização de URL/referenciador, send_page_view=false, Google Signals desativado, personalização negada, Meta, formulário, páginas e identidade visual são preservados. Nenhuma variável Vercel precisa mudar.

## Verificação

- Build preview e TypeScript aprovados.
- Nove testes isolados do código TypeScript real aprovados: campanhas reconhecidas, ausência/desconhecida, origem/mídia inválidas, consentimento, navegação interna, não duplicação e hostname.
- A suíte Playwright foi tentada, mas o Chromium local encerrou antes de iniciar os casos: socket() failed: Operation not permitted. Não considerar esses testes aprovados nem falhas funcionais do site.
- Acrescentados testes Playwright de regressão para execução em ambiente compatível.
- Comparação do JSON candidato contra o backup: seis tags, cinco acionadores, modelo de consentimento e todas as outras tags idênticos; apenas uma tag modificada e três DLV novas. Interface GTM confirmou 1 modificada, 3 adicionadas, 0 excluídas em Combinar.
- Build de produção e verificação em nuvem devem ser registrados no retorno compartilhado após execução. Testes isolados não comprovam processamento no GA4.

## Publicação e rollback

Publicar primeiro o site compatível com o GTM anterior; depois publicar a alteração do GTM existente e testar em cliente novo. Verificar ausência de coleta sem escolha/recusa, categorias isoladas, ambos e revogação; confirmar uma visualização e os valores padrão no hit GA4. Não enviar formulários ou mensagens reais. Validar também visita direta sem atribuição manual fabricada.

Se houver regressão, republicar a versão 2 do GTM e restaurar o deployment Vercel indicado, ou reverter somente este ajuste preservando commits posteriores. O JSON v2 foi extraído integralmente do exportador autenticado antes das alterações. Não apagar dados, recriar ativos ou enfraquecer privacidade.

O recebimento e as dimensões de aquisição processadas devem ser homologados com Marketing; testes não representam leads nem recuperam retroativamente a atribuição histórica perdida.

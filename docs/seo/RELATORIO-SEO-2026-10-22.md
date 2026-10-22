# BM Capital — SEO Técnico e Google Search Console

Data: 22/10/2026. Estado: preparação local validada; aguardando aprovação de publicação.

## Acessos, projeto e fontes

GitHub acessível por integração e clone de leitura. Checkout criado em workspace inicialmente sem projeto; branch `preparacao-publicacao`, limpo antes das alterações, base `b170931cb015afd20661623b6a0a498eceb1bd1e`. Nenhum arquivo do usuário foi removido. Node local 24.19.0; Next.js instalado pelo lockfile 15.5.28.

Lidos AGENTS.md, README.md e RELATORIO-MISSAO-01.md. Não encontrados no checkout MEMORIA-2026-10-21.md e PLANO-MARKETING-E-CONTROLES-2026-10-22.md; buscas diretas desses caminhos na branch também retornaram 404. Relatórios antigos tratados como históricos. A aprovação jurídica e o funcionamento em aparelhos reais foram declarados pelo responsável nesta missão; não representam nova validação jurídica ou teste físico executado aqui.

O papel do Agente de SEO está documentado em AGENTE-SEO.md. Houve revisão estática adicional do agente, sem alterações visuais identificadas.

## Search Console e DNS — efetivamente realizados

Criada propriedade **Domínio**, `solucoesbmcapital.com.br`, na conta `bruno.mariano102@gmail.com`, confirmada pelo responsável como a conta escolhida. Google mostrou **Propriedade verificada**, por provedor do nome de domínio. O painel da propriedade foi aberto e mostrou relatórios de desempenho, indexação, experiência e melhorias ainda em processamento.

Autenticação no Registro.br concluída pela interface segura, incluindo chave de acesso. Não foram solicitados nem registrados segredos no chat ou repositório.

Zona antes: A raiz `216.198.79.1`; CNAME www `980492e01a167cf0.vercel-dns-017.com.`. Valores confirmados no painel. Adicionado apenas:

- Tipo: TXT
- Nome: raiz (`solucoesbmcapital.com.br`)
- Conteúdo: `google-site-verification=f7cjIF5stogYNnvbU382Yr2AO5PZoce5bdLBEp8spfE`

Salvamento e persistência confirmados reabrindo a zona. A e CNAME permaneceram iguais. Nenhuma troca de servidores DNS, provedor ou acesso de terceiros. Manter o TXT. A primeira verificação Google falhou por não localizar o TXT; a tentativa posterior foi bem-sucedida.

## Auditoria pública antes de qualquer publicação

| Item | Resultado observado |
| --- | --- |
| HTTPS com www | HTTP 200, sem desativar validação TLS; HSTS presente |
| Domínio sem www | HTTP 308 para domínio oficial com www |
| Sete páginas | Todas HTTP 200 |
| Canônicas | Específicas, domínio oficial com www |
| Títulos | Sete títulos individualizados |
| Meta robots | `noindex, nofollow` em todas as sete páginas |
| X-Robots-Tag | Ausente nas respostas das sete páginas consultadas |
| /robots.txt | 404 |
| /sitemap.xml | 404 |
| /seo-rota-inexistente | 404 com noindex |

Páginas: `/`, `/solucoes/consorcios`, `/solucoes/credito`, `/solucoes/seguros`, `/solucoes/investimentos`, `/solucoes/planejamento`, `/privacidade`.

A inspeção pública é uma amostra HTTP atual; não comprova a ausência de configurações adicionais no painel Vercel. O projeto/equipe e vínculo de produção informados pelo usuário não foram auditados no painel Vercel. Certificado aceito pelo cliente HTTP; não houve auditoria completa da cadeia/renovação. Testes físicos mobile são a declaração do responsável; nova execução de navegador local ficou bloqueada, conforme abaixo.

## Alterações locais preparadas

- `lib/seo.ts`: lista fechada das sete páginas e política que habilita indexação somente com `VERCEL_ENV=production`.
- `app/layout.tsx`: substitui bloqueio fixo pela política do ambiente. Produção candidata emite `index, follow`; local e preview mantêm `noindex, nofollow`.
- `app/sitemap.ts`: apenas sete URLs canônicas públicas de produção, sem vercel.app nem lastModified artificial. Preview/local retorna lista vazia.
- `app/robots.ts`: produção permite renderização/rastreamento e declara sitemap oficial. Preview/local mantém bloqueio de rastreamento.
- `middleware.ts`: hosts diferentes do oficial e ambientes diferentes de produção recebem X-Robots-Tag `noindex, nofollow`; robots desses destinos bloqueia rastreamento.
- Testes existentes ajustados à política por ambiente; script HTTP acrescentado para testar metadados, links/âncoras, 404, sitemap, robots e hosts alternativos.
- Guia do Agente e este relatório.

CSS, imagens/logotipos, cores, tipografia, componentes, conteúdo comercial, formulário, telefone e versão do aviso não foram alterados. Sem dados estruturados novos: não havia necessidade de acrescentar alegações comerciais. Nenhuma dependência, CRM ou rastreador foi adicionado.

Robots não protege informação privada. `Disallow: /` em um ambiente alternativo não garante remoção de URLs previamente indexadas, pois impede a leitura do noindex; não houve evidência de indexação prévia desses ambientes. Noindex também segue presente nos cabeçalhos. A verificação pós-deploy deve confirmar Host oficial e variáveis Vercel efetivas.

## Testes realmente executados

| Verificação | Resultado |
| --- | --- |
| npm ci | Aprovado com lockfile existente, sem mudanças de dependências |
| npm run build, local sem ambiente Vercel | Aprovado |
| Build com VERCEL_ENV=preview | Aprovado |
| Build com VERCEL_ENV=production | Aprovado |
| npm run typecheck | Aprovado |
| Script HTTP, preview | Aprovado |
| Script HTTP, produção candidata | Aprovado |
| Revisão estática de preservação visual | Nenhuma alteração em CSS/componentes/ativos |
| Playwright, 54 casos | 2 passaram; 52 falharam ao iniciar navegador ausente |
| Instalação Chromium Playwright | Falhou: download recebido não era ZIP válido |

O script HTTP confirmou sete respostas 200, títulos e descrições distintos, canônicas, meta robots conforme ambiente, links internos/âncoras existentes, quatro rotas inválidas 404, sitemap com sete URLs em produção e vazio no preview, ausência de datas inventadas e vercel.app, e cabeçalho de bloqueio para três hosts alternativos. Não envia formulários nem mensagens. Os testes HTTP não substituem a suíte funcional de navegador. Nenhuma aprovação dessa suíte foi inferida de execuções históricas.

## Publicação e etapas pendentes

Sem commit novo, push, deploy ou remoção do noindex público nesta etapa. A alteração candidata só terá efeito após publicação aprovada. Nenhum sitemap foi enviado ao Google; nenhuma solicitação de indexação ou teste de URL publicada foi executado antes de confirmar a versão pública indexável.

Após autorização: revisar novamente HEAD remoto, preservar mudanças concorrentes, fazer commit/push na branch autorizada, confirmar deploy real pelo endereço público e auditar novamente as sete páginas, robots, sitemap, cabeçalhos, canônicas, 404 e redirecionamentos. Então enviar `https://www.solucoesbmcapital.com.br/sitemap.xml`, inspecionar home e páginas principais, usar teste de URL publicada e solicitar indexação conforme disponibilidade/limites do Google.

Solicitar indexação não garante indexação, posição nem prazo. Dados em processamento ainda não comprovam resultados orgânicos.

## Checklist do responsável

- [x] Escolher conta Google controlada pelo responsável.
- [x] Verificar propriedade Domínio e manter TXT.
- [ ] Aprovar publicação das correções técnicas.
- [ ] Confirmar versão pública indexável após deploy.
- [ ] Enviar e acompanhar processamento do sitemap.
- [ ] Inspecionar URLs e solicitar indexação.
- [ ] Acompanhar páginas indexadas/excluídas e alertas; investigar causas antes de alterar bloqueios.

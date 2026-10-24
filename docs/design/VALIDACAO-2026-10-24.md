# Validação — imagens editoriais da home

24/10/2026. Branch local `design/imagens-editoriais-2026-10-24`, derivada de `0db26a32db92f903f7e62166ab092f0f2b9ddeab`.

## Resultado observado

- `npm ci`: aprovado, lockfile preservado.
- `npm run build`: aprovado com Next.js 15.5.28, em Node 24.22.1; 13 páginas/rotas geradas.
- `npm run typecheck`: aprovado.
- Suíte existente Playwright/Chromium: **66 aprovados, 0 falhas, 16 pulados**, 52,9 segundos na execução final. Os pulados exigem variáveis/condições de medição que não foram ativadas nesta revisão visual.
- Sete páginas de conteúdo, navegação, âncoras, formulário, marketing aceito/recusado, menu, cabeçalhos, consentimento e rotas inválidas cobertos pela suíte existente. WhatsApp interceptado, sem envio real.
- Responsividade das sete páginas exercitada pela suíte entre 320 e 1440 px. Capturas adicionais da home em 1440×1000, 390×844 e 320×740; sem largura horizontal excedente nesses tamanhos.
- Imagens oficiais da marca, contato, SEO, medição e avisos não alterados. `git diff --check` aprovado.

Na primeira execução, um teste mobile falhou porque pressupunha que todas as imagens estavam carregadas antes da rolagem. A verificação foi adaptada para rolar até cada imagem e aguardar seu carregamento, incluindo a foto secundária carregada sob demanda. Não foi desativada a verificação de imagens. A suíte final passou após esse ajuste e após o refinamento da ordem visual mobile.

## Ambiente e limites

O Chromium documentado em `/usr/bin/chromium` não existia neste ambiente. O download automático do navegador Playwright retornou um arquivo inválido. A suíte e as capturas foram executadas com Chromium 153.0.8010.0 fornecido pelo pacote npm `@sparticuz/chromium`, instalado fora do projeto. Nenhuma dependência ou versão do site foi alterada por essa preparação.

Capturas em `validacao-2026-10-24/`; script reproduzível em `scripts/capturar-editorial.mjs`. O script requer servidor local de produção e aceita `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` para selecionar o navegador. As capturas rejeitam cookies opcionais somente no contexto local de teste e bloqueiam requisições externas.

O desktop mantém texto e botões ao lado da foto. No mobile, título e botões precedem a foto; o parágrafo de apoio vem em seguida. Isso aproxima a imagem da primeira tela sem adicionar mais fotos ou remover o conteúdo comercial. O fluxo de leitura do HTML permanece compreensível, e a ordem relativa dos controles de teclado não foi alterada.

Não foi testado Safari/iOS real, nem foram revalidados fornecedores de analytics em produção. Não houve alteração no Facebook ou Instagram. Build local e capturas não comprovam publicação.

## Publicação

Candidata pronta para revisão visual do responsável. Sem push, deploy ou alteração do site oficial nesta etapa. Após aprovação específica, publicar e conferir a versão pública, imagens, recortes e navegação no domínio oficial.

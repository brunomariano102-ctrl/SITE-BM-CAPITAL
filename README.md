# BM Capital — Site institucional

Projeto Next.js 15 / React 19 / TypeScript baseado integralmente em `bm-capital-site-v102-revisao.zip`. Revisão técnica local; sem publicação, CRM ou rastreadores. Identidade visual e conteúdo institucional preservados.

## Abrir no Windows, sem publicar

1. No GitHub, selecione a branch **`entrega-windows`**, clique em **Code → Download ZIP** e use **Extrair Tudo** no Windows.
2. Instale Node.js **24** pelo site oficial <https://nodejs.org/>, caso ainda não esteja instalado.
3. Na pasta extraída que contém `package.json`, dê dois cliques em **`INICIAR-SITE-WINDOWS.cmd`**.
4. Aguarde a instalação e a abertura do navegador. Mantenha a janela aberta; use **Ctrl+C** para encerrar.

O iniciador usa somente `127.0.0.1:3000`, verifica se a porta está livre e não ativa deploy ou GitHub Pages. Revisto estaticamente no Linux; execução em Windows ainda precisa ser confirmada. Guia: [Assistente Windows](docs/AGENTE-WINDOWS.md).

## Desenvolvimento

Node.js **24.19.0** (`.node-version`) e npm. No checkout existente:

```sh
npm ci
npm run dev
```

A aplicação não depende de banco, API externa, credenciais ou variáveis de ambiente para iniciar. As três imagens oficiais estão em `public/assets`. O arquivo `preview.html` é uma referência histórica do ZIP; a aplicação servida é a pasta `app/`.

## Validação

```sh
npm run build
npm run typecheck
npm audit --audit-level=moderate
```

Testes de navegador sobre **build de produção**, sem servidor concorrente na porta 3000:

```sh
# Neste ambiente, Chromium já está instalado:
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

Em outra máquina, instale o Chromium correspondente ao Playwright com `npx playwright install chromium` e execute `npm run test:e2e`. A suíte inicia/encerra seu próprio servidor. O projeto mobile usa emulação de iPhone em Chromium, não Safari real. As mensagens WhatsApp são interceptadas nos testes e nunca enviadas.

Para verificar produção manualmente, depois do build:

```sh
npm run start -- --hostname 127.0.0.1 --port 3000
```

## Arquitetura

- `app/page.tsx`: composição da home como Server Component.
- `components/home/`: seções, cabeçalho, cards e formulário React. Apenas menu, seleção de objetivo, contexto e formulário precisam de estado cliente.
- `lib/objectives.ts`: objetivos compartilhados pelos cards e seletor.
- `lib/solution-summaries.ts`: conteúdo dos cards de soluções.
- `lib/whatsapp.ts`: número oficial, versão do aviso e preparação da mensagem.
- `app/solucoes/[slug]/page.tsx`: cinco páginas estáticas e validação de slugs.
- `app/privacidade/page.tsx`: aviso preliminar preservado.
- `tests/site.spec.ts`: testes funcionais e de responsividade; `playwright.config.ts`: execução desktop/mobile.

O lockfile fixa as versões instaladas. O override do PostCSS para `8.5.31` corrige os alertas transitivos encontrados na auditoria, sem migrar para Next.js 16.

## Privacidade e limites

Ciência do aviso é obrigatória; marketing é separado, opcional e inicialmente desmarcado. Os dados ficam em memória e compõem a URL de WhatsApp apenas após envio do formulário. Alterações nos campos invalidam o link de fallback anterior. A confirmação final de envio ocorre no WhatsApp.

Sem backend, cookies adicionados, armazenamento local ou evidência auditável de consentimento. Sem JavaScript, o botão permanece desativado para evitar submissão GET com dados pessoais na URL do site. A versão do aviso e a escolha de marketing acompanham a mensagem preparada; isso não equivale a um registro estruturado de consentimento.

A identificação da controladora e o domínio planejado foram fornecidos pelo responsável e incorporados à preparação. Continuam pendentes a revisão jurídica, retenção e regras de operadores/compartilhamento, além de teste real em iOS/Android. `noindex, nofollow` foi mantido. Não publicar sem aprovação expressa.

Relatório atual: [RELATORIO-MISSAO-01.md](RELATORIO-MISSAO-01.md). Os relatórios anteriores do ZIP permanecem como histórico e não descrevem o estado técnico desta revisão.

## Missão 02 — homologação

Consulte [RELATORIO-MISSAO-02.md](RELATORIO-MISSAO-02.md) e [CHECKLIST-MISSAO-02.md](CHECKLIST-MISSAO-02.md). A galeria offline está em `docs/missao-02/index.html`; ela exibe capturas, não o site interativo. Os testes adicionais estão em `tests/homologacao.spec.ts`. Para renovar as capturas, com um servidor de produção local na porta 3000, execute `node scripts/capturar-homologacao.mjs`. Esse comando não inicia servidor nem publica o site.

## Etapa atual — preparação final

O responsável aprovou a versão que executou no Windows. Veja [PREPARACAO-PUBLICACAO.md](docs/PREPARACAO-PUBLICACAO.md) e [RELATORIO-MISSAO-03.md](RELATORIO-MISSAO-03.md) para o aceite registrado, a preparação técnica e a revisão jurídica e a hospedagem ainda pendentes. Essa etapa não publica o site nem retira `noindex`.

Para revisão jurídica, há um [briefing técnico](docs/BRIEFING-REVISAO-PRIVACIDADE.md) descrevendo o fluxo implementado e as decisões ainda necessárias. Domínio e dados institucionais estão centralizados em `lib/site.ts`; isso não configura DNS nem publica o site.

## Apoio à revisão jurídica

O [Agente Jurídico BM Capital](docs/AGENTE-JURIDICO.md) organiza a revisão do aviso e do fluxo WhatsApp. Suas análises são preliminares e não substituem validação profissional. Nenhuma sugestão desse agente é aplicada ao site automaticamente.

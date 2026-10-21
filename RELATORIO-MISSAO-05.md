# MISSÃO 05 | BM CAPITAL — Preparação de hospedagem

Data: 21/10/2026. **Preparação local, sem publicação.**

## Informação e escopo

O responsável confirmou ter comprado apenas o domínio no Registro.br e pediu continuidade na opção Vercel. Isso foi interpretado como autorização para preparar o código e o roteiro, não para contratar plano, criar/importar projeto, gerar preview, alterar DNS ou publicar o site.

## Trabalho realizado

- Declarado `engines.node: 24.x` no `package.json`, compatível com o Node local já usado e com o suporte identificado no código oficial da Vercel.
- Atualizada somente a informação correspondente na raiz do lockfile; conferido que o conjunto de pacotes e todas as versões permaneceram iguais.
- Preparado `docs/hospedagem/VERCEL-REGISTROBR.md`, com conta/plano, campos de futura importação, cuidados com branch e deploy automático, domínio, DNS e verificação posterior.
- Esclarecido que o uso é comercial e os termos/preços do plano precisam ser confirmados pelo responsável; não foi indicada contratação gratuita como solução garantida.
- Nenhum `vercel.json` desnecessário ou ferramenta de deploy foi instalado. A aplicação permanece Next.js padrão, sem serviços/segredos adicionais.

## Fontes e limitações

O acesso direto a `vercel.com/docs` e `openapi.vercel.sh` retornou HTTP 403. Não se alegou validação do painel, de preços ou termos atuais. Foi consultado o repositório público oficial `vercel/vercel`, commit `c628be7835e03a965b93e9cf9e2bd5ac2acbf5eb`, para confirmar Node 24.x e seleção via `engines.node`.

## Verificação local

| Verificação | Resultado |
| --- | --- |
| Lockfile | Atualizada apenas a declaração de engine; grafo e versões de pacotes preservados |
| `npm ci --include=dev --no-audit --no-fund` | Aprovado |
| `npm run build` | Aprovado |
| `npm run typecheck` | Aprovado |
| Build de produção local | Sete páginas HTTP 200, conteúdo/títulos presentes e noindex preservado |
| Slug inválido `constructor` | HTTP 404 |
| Cabeçalho `X-Content-Type-Options` | `nosniff` nas respostas verificadas |

Logs e respostas estruturadas em `docs/missao-05/`. A aplicação, layout e fluxo WhatsApp não foram modificados nesta etapa. Não foi feito deploy na Vercel para esses testes.

A suíte funcional de 54 testes passou na Missão 04. Não é necessário repetir todos esses testes apenas por uma declaração de engine; nesta etapa são verificadas a instalação limpa, compilação, tipos e respostas representativas do build de produção. Esses resultados não equivalem a testes na infraestrutura Vercel.

## Pendências externas

- Responsável criar/acessar conta, conferir plano compatível com uso comercial e decidir os custos, sem compartilhar credenciais no chat.
- Autorizar separadamente a criação/importação do projeto e o primeiro deploy quando desejar disponibilização online; até preview pode gerar URL acessível.
- Configurar registros reais do domínio apenas quando o projeto e os valores existirem e houver autorização.
- Completar revisão profissional e políticas de retenção/operação do atendimento.

Nenhum projeto Vercel, domínio, DNS, contrato, pixel, analytics, CRM ou indexação foi ativado pelo agente.

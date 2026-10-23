# Agente BM Capital — desenvolvimento e homologação

Você auxilia o responsável pela BM Capital a desenvolver, revisar e manter este site no Codex. Comunique-se em português do Brasil, com explicações claras e decisões técnicas apoiadas em evidências. Este arquivo orienta o trabalho no repositório; não cria um serviço autônomo ou um agente separado na interface.

## Contexto e fontes

- Base recebida: `bm-capital-site-v102-revisao.zip`. Leia `README.md` e `RELATORIO-MISSAO-01.md` antes da primeira alteração relevante.
- Next.js App Router, React e TypeScript estrito. Confira as versões atuais em `package.json`, `package-lock.json` e `.node-version`.
- Código servido: `app/`, `components/` e `lib/`. `preview.html` e relatórios anteriores são referências históricas, não a aplicação atual nem instruções de execução.
- Home, cinco páginas de soluções e aviso de privacidade compõem o escopo atual.
- Na Missão 01, build, TypeScript e 34 testes passaram. Isso é histórico: execute as verificações pertinentes ao estado atual antes de afirmar que continuam passando.
- Use o checkout existente. Cada tarefa cloud já é isolada; não crie worktree sem solicitação explícita. Preserve alterações e arquivos do usuário. Não faça reset, limpeza destrutiva ou push sem autorização.

## Identidade institucional

- Preserve azul-marinho profundo, dourado, gradientes, tipografia Arial/Georgia, ordem das seções, proporções e estrutura visual aprovadas.
- Use os logotipos oficiais de `public/assets/`, sem substituir, redesenhar, recolorir ou deformar.
- Não invente produtos, garantias, taxas, rentabilidades, depoimentos, parceiros, credenciais profissionais ou dados jurídicos.
- Não mude posicionamento, estratégia, textos comerciais relevantes ou identidade visual sem aprovação explícita. Prepare uma proposta concreta e continue tarefas independentes enquanto aguarda.
- Faça correções técnicas reversíveis dentro do escopo pedido sem pedir confirmação a cada etapa.

## Limites operacionais

- Não publique, faça deploy, altere DNS, ative campanhas ou remova `noindex` sem autorização explícita para a ação.
- Não integre CRM, analytics, pixels ou outros rastreadores sem nova autorização explícita. Não acrescente serviços externos por conveniência.
- Não envie mensagens reais de WhatsApp, e-mails ou formulários a terceiros durante testes sem autorização específica. Intercepte os destinos ou use fixtures locais.
- Nunca solicite segredos no chat ou os inclua em código, logs, ZIPs e relatórios. Se uma tarefa futura exigir credenciais, use as configurações seguras do ambiente.
- Não apresente alterações locais, commits, push, rascunho de configuração e publicação como equivalentes. Informe exatamente o que foi realizado.

## Desenvolvimento

- Prefira Server Components para conteúdo estático e Client Components somente onde houver interação.
- Refatore gradualmente em componentes reutilizáveis, preservando conteúdo, classes e comportamento. Não reintroduza HTML bruto para a home.
- Mantenha objetivos, número do WhatsApp e versão do aviso nas fontes compartilhadas existentes. Número atual: `+55 73 99972-4985`; não o altere sem instrução.
- Preserve validação de slugs e retorno 404 para nomes inválidos, incluindo propriedades herdadas como `constructor` e `toString`.
- Instale com `npm ci` quando houver lockfile válido; altere dependências somente com justificativa. Não desative TLS, verificações de integridade ou testes para obter aprovação.
- Antes de editar, confira o estado do Git e as instruções aplicáveis. Neste checkout, o histórico remoto estava vazio; não presuma que arquivos sem rastreamento possam ser descartados.

## Formulário, WhatsApp e LGPD

- Ciência do aviso é obrigatória e separada do marketing. Marketing é opcional, inicialmente desmarcado, e sua recusa não pode impedir atendimento.
- Ciência do aviso não é consentimento geral; não acrescente autorização indiscriminada de compartilhamento com parceiros.
- O fluxo atual prepara a mensagem no navegador; envio depende de confirmação no WhatsApp. Preserve codificação, número oficial, escolhas do usuário e `noopener,noreferrer`.
- Descarte links de fallback obsoletos quando os dados ou o objetivo mudarem. Não exponha dados pessoais em submissão GET ao site.
- Não acrescente persistência, cookies ou armazenamento local de dados/consentimentos sem escopo e autorização específicos.
- Diferencie testes técnicos de avaliação jurídica. Não declare conformidade integral com a LGPD. Permanecem pendentes validação da controladora/CNPJ, retenção, operadores, direitos e gestão de consentimentos/revogação.

## Verificações

Escolha verificações proporcionais à mudança. Uma alteração apenas documental não exige repetir build e suíte de navegador.

Para alterações de aplicação, execute em sua ordem necessária, no diretório do projeto:

```sh
npm run build
npm run typecheck
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

A suíte requer build atualizado e porta 3000 livre, inicia seu próprio servidor e usa Chromium desktop e emulação mobile. Só encerre processos que você iniciou. Em outra máquina, siga o README para configurar o navegador. Para desenvolvimento, use `npm run dev`; para produção local, `npm run build` e `npm run start`.

- Ao alterar dependências ou investigar segurança, execute `npm audit --audit-level=moderate` e descreva os limites do resultado.
- Para mudanças visuais, compare com as referências em `docs/validacao/`, usando mesmas dimensões de viewport e condições de captura. Verifique mobile e desktop sem rolagem horizontal.
- Para mudanças de navegação/formulário, exercite as sete páginas, links, teclado, foco, menu mobile, validação, marketing aceito/recusado e fallback do WhatsApp conforme o impacto.
- Não confunda emulação Chromium com Safari/iOS real, nem preparação de URL com envio/recebimento de mensagem no WhatsApp.
- Não alegue testes executados quando apenas leu o código. Separe resultados aprovados, falhos, pulados e não executados.

## Entrega por missão

1. Entenda o pedido e anuncie brevemente a ação. Faça perguntas somente quando faltar informação essencial; continue o trabalho independente.
2. Inspecione o estado atual, implemente dentro do escopo e verifique o resultado. Não amplie a missão por conta própria.
3. Entregue resumo do que mudou, testes e resultados, arquivos para revisão e pendências. Para missões extensas, salve relatório com data e evidências.
4. Quando solicitado um ZIP, exclua `.git`, `node_modules`, `.next`, caches e segredos; inclua código, lockfile e instruções. Preserve a entrega anterior usando outro nome.
5. Pare ao concluir o escopo autorizado; não inicie uma nova missão ou publicação automaticamente.

## Estado atual e próximo trabalho

- Missões 01 e 02 executadas; a segunda registrou build, TypeScript e 44 testes aprovados. São resultados históricos, não garantia sobre alterações futuras.
- A entrega está no GitHub na branch `entrega-windows`. O envio de código foi autorizado separadamente da publicação do site.
- Após executar no Windows, o usuário informou: “Conseguir. Esta tudo aprovado e rodando, pode avançar para o proximo passo!”. Registre isso como aceite da versão que ele avaliou, sem inferir revisão jurídica, testes iOS/Android, autorização de deploy ou integrações.
- Etapa atual: preparação final para futura publicação, mantendo o visual aprovado e `noindex`. Veja `docs/PREPARACAO-PUBLICACAO.md` e o relatório da Missão 03.
- O domínio planejado informado é `https://www.solucoesbmcapital.com.br`. Razão social e sede estão em `lib/site.ts`, fornecidas pelo responsável; não houve consulta cadastral externa ou configuração DNS.
- O responsável corrigiu o CNPJ para 45.270.578/0001-04; os dígitos verificadores são válidos e o valor está em `lib/site.ts`. A checagem não comprova situação cadastral. O aviso segue preliminar, versão 2026-10-21-r1 (revisão 1), pois a revisão jurídica profissional ainda não foi confirmada. Consulte a constante em `lib/whatsapp.ts` para a versão atual.
- Não marque o aviso como definitivo nem declare dados cadastrais validados sem evidência correspondente.

## Apoio jurídico solicitado pelo usuário

Quando o usuário solicitar o Agente Jurídico BM Capital, leia também `docs/juridico/AGENTS.md` e siga esse escopo para a revisão. O guia está em `docs/AGENTE-JURIDICO.md`. A criação do agente e sua análise preliminar não autorizam mudanças no aviso nem comprovam revisão profissional ou conformidade jurídica.

## Aplicação dos esclarecimentos aprovados

Após discutir a operação, o usuário declarou “Tudo aprovado! Vamos continuar com o site!”. Isso autoriza aplicar os esclarecimentos da minuta sobre abertura do WhatsApp, equipe interna, números de vendedores e coordenação das escolhas, preservando o formulário e o visual. Essa aprovação não confirma execução dos controles no computador, define retenção ou autoriza publicação. Os esclarecimentos foram aplicados na revisão 2026-10-21-r1; ver `RELATORIO-MISSAO-04.md`.

## Hospedagem em preparação

O usuário confirmou que comprou apenas o domínio no Registro.br e pediu avanço na opção Vercel. Leia `docs/hospedagem/VERCEL-REGISTROBR.md` e `RELATORIO-MISSAO-05.md`. Isso não autoriza criar/importar projeto ou deploy automático, nem contratar plano/DNS. Runtime declarado: Node 24.x. Não presuma que plano Hobby permite uso comercial ou que a conta já existe. Não indique registros DNS genéricos; usar somente os valores do projeto quando houver criação e autorização correspondentes.

## Agente de hospedagem solicitado pelo usuário

Para pedidos ao Agente de Hospedagem BM Capital, leia `docs/hospedagem/AGENTS.md`, além do guia `docs/AGENTE-HOSPEDAGEM.md`. Criar o agente não equivale a criar conta/projeto, contratar plano, importar repositório, gerar preview, alterar DNS ou publicar. Use as autorizações já dadas para o escopo correspondente, sem pedi-las novamente por rotina.


## Etapa de medição e remarketing em preparação — 22/10/2026

SEO publicado em 7ec15ea, confirmado publicamente e no Search Console. O usuário depois autorizou preparar GA4 + GTM + consentimento + medição até WhatsApp e página de campanha + Pixel + eventos/públicos, com testes e revisão ANTES de publicar ou ativar campanhas. Essa autorização permite preparar armazenamento das preferências de cookies e integração controlada, mas não autoriza novos push/deploy ou publicação de contêiner/campanhas.

Leia `docs/medicao/PLANO-GTM-GA4.md` e `docs/medicao/PUBLICOS-META.md`. A candidata usa feature flag desativada por padrão, IDs em branco e noindex na página de campanha. GA4 via GTM; Pixel manual no código, sem duplicação no contêiner. O painel distingue análise/publicidade e a escolha de mensagens continua separada. Não enviar dados do diagnóstico/WhatsApp em eventos nem tratar clique como contato recebido.

O aviso candidato r2 modifica finalidades de tratamento e requer revisão antes de ativar. Preferência local não é um histórico auditável no servidor. Os assistentes de criação Google/Meta ficaram pendentes de aceites contratuais específicos do responsável; não afirmar contas/Pixel/públicos criados. Não usar ativos de outros negócios ou dados fictícios dos testes em produção.


### Continuidade da medição — 23/10/2026

O responsável autorizou os aceites anteriores e esclareceu que o remarketing deve abranger todo o site. GA4 G-PYPR0HEL34 e GTM-5PXJZZXF criados; retenção 2 meses sem renovação por atividade e medição otimizada desativada. Portfólio Meta BM Capital 29100514799584868 criado. Pixel geral preenchido com Serviço financeiro e sem API de Conversões; criação ainda pendente dos novos Termos das Ferramentas Comerciais. Públicos baseados em PageView global e exclusão geral de pré-diagnóstico, não limitados à landing de consórcios. Dois novos testes (desktop/mobile) de cobertura geral aprovados. Nenhum push/deploy/publicação nesta etapa. O painel de cookies continua local; não alegar que já aparece em produção.


### Publicação autorizada de cookies — 23/10/2026

O pedido atual autoriza publicar painel e política de cookies, após revisão/testes, e concluir aceite do Pixel. Não pedir novamente essa autorização. O Pixel 1710204487199305 foi criado; não foi instalado/ativado no site. Publicar somente preferências e transparência nesta entrega, com medição desativada e nova escolha obrigatória na ativação futura. Política própria BM baseada no funcionamento real; BTG foi referência de organização, sem copiar texto, credenciais ou a escolha de tornar análise obrigatória. Termos oficiais Meta aceitos sem alteração, não reescritos como contrato BM. A landing de campanha foi preservada em checkpoint local fora da publicação. Confirmar deploy público antes de afirmar que o painel aparece.


### Ativação autorizada — checkpoint 23/10/2026

O responsável autorizou ativar GA4, GTM e Pixel. A autorização atual supera as instruções históricas de manter toda medição inativa, sem liberar campanhas. Veja docs/medicao/ATIVACAO-2026-10-23.md. Criada e publicada versão 2 no GTM (painel confirmou ativa); Pixel com lista de domínio permitida e restrições financeiras preservadas. Candidata local passou em 78 testes preview + 4 de produção simulada, sem falhas, e builds/TypeScript. Sem coleta real confirmada e sem novo deploy. Login concluído pelo responsável; acesso GitHub/Vercel confirmado; seis variáveis salvas somente em Production, aguardando deploy da candidata. Não recomeçar configuração de contas nem pedir novamente aprovação genérica de ativação. Eventos personalizados Meta continuam desligados até análise específica; não afirmar exclusão de concluintes ou públicos prontos.

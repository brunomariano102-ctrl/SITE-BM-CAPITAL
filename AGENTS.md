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
- Domínio definitivo e informações jurídicas precisam ser fornecidos/confirmados pelo responsável antes de configurar URLs definitivas ou substituir o aviso preliminar.

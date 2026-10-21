# MISSÃO 01 | BM CAPITAL

Data: 21/10/2026. Base: `bm-capital-site-v102-revisao.zip`.

## Escopo e arquitetura analisada

O repositório remoto estava vazio; o ZIP foi extraído no checkout existente `/workspace/SITE-BM-CAPITAL`, preservando seus metadados Git. Nenhum push ou publicação foi realizado. Os documentos do ZIP foram tratados como histórico do projeto; o escopo seguido foi o pedido desta missão.

Base: Next.js App Router, TypeScript em modo estrito e React 19. A aplicação contém sete páginas de conteúdo: home, cinco soluções e privacidade. Não há API, banco de dados ou integração CRM. O formulário prepara uma mensagem para WhatsApp.

A home original era um Client Component com todo o HTML em `dangerouslySetInnerHTML`, listeners manuais e consultas globais ao DOM. As demais páginas já eram JSX. A instalação inicial e o build original passaram; os relatórios antigos que registravam build não executado foram preservados como histórico.

## Alterações

1. Home composta por seções React: cabeçalho, hero, objetivos, soluções, método, apresentação, contato e rodapé. Cards de objetivos/soluções, passos do método e cabeçalhos de seção reutilizáveis. Não há mais HTML bruto na home.
2. Home e seções estáticas renderizadas no servidor; estado cliente limitado aos componentes interativos. Contexto React conecta os cards ao seletor do pré-diagnóstico. Lista de objetivos compartilhada evita divergência entre cards e formulário.
3. Menu controlado por estado, ARIA sincronizado, fechamento por link, Escape e mudança para desktop. Corrigida captura indevida de Escape quando o menu está fechado, que antes deslocava o foco do formulário para o menu.
4. Validação nativa de obrigatórios e rejeição de nome composto apenas por espaços. O botão só é habilitado após hidratação, evitando submissão GET acidental de dados quando JavaScript não executa. Aviso alternativo sem JavaScript.
5. Mensagem WhatsApp centralizada, mantendo número oficial `+55 73 99972-4985`, versão do aviso, escolha de marketing, codificação da URL e abertura com `noopener,noreferrer`. Link de fallback mantido e invalidado quando os dados mudam, evitando reuso de escolha antiga.
6. Corrigidos erros 500 confirmados em `/solucoes/constructor` e `/solucoes/toString`: propriedades herdadas não são soluções válidas e agora retornam 404. Também testados `__proto__` e slug inexistente.
7. Corrigida duplicação de “BM Capital” nos títulos das soluções e privacidade, respeitando o template de metadados do layout.
8. Acrescentada margem de rolagem para âncoras não ficarem cobertas pelo cabeçalho fixo.
9. Criados lockfile, pin de Node, comando de typecheck, suíte Playwright e instruções reproduzíveis. PostCSS transitivo atualizado por override compatível para 8.5.31; sem migração de major do Next.js.

## Preservação institucional

Cores originais, gradientes, tipografia Arial/Georgia, textos institucionais, ordem das seções, espaçamentos, imagens e estrutura visual preservados. Os três PNGs oficiais foram comparados por SHA-256 com o ZIP e são idênticos. O CSS original foi mantido, acrescentando somente o ajuste de âncoras.

Comparação de capturas integrais da home antes/depois, no mesmo Chromium:

| Largura | Dimensão integral | Pixels diferentes |
| --- | --- | --- |
| 1440 px | 1440 × 4657 | 128 de 6.706.080 (0,001909%) |
| 390 px | 390 × 8232 | 0 |
| 320 px | 320 × 9114 | 0 |

As diferenças mínimas no desktop ficam no desenho de caracteres dos textos dos checkboxes, sem mudança de dimensões ou quebra de linha; a inspeção lado a lado não identificou alteração de design. Evidências em `docs/validacao/`. A comparação captura o estado inicial da home, não todos os estados de interação.

## LGPD — verificação técnica

- Ciência do Aviso de Privacidade: campo separado e obrigatório, sem transformá-la em consentimento geral.
- Marketing: checkbox separado, opcional, inicialmente desmarcado; atendimento e WhatsApp funcionam com a recusa. Autorização/recusa acompanha a mensagem preparada.
- Compartilhamento: texto preservado, sem autorização indiscriminada a parceiros; nenhum fluxo de compartilhamento foi adicionado.
- Preenchimento não gera POST, requisição a terceiros, cookies ou persistência em localStorage/sessionStorage nos fluxos testados. Não há backend de leads.
- Os dados são codificados em uma URL destinada ao WhatsApp após a ação de continuar. Ao abrir esse destino, passam a valer também as práticas do fornecedor. Codificação de URL não é criptografia nem anonimização.
- Sem JavaScript, botão desativado e alternativa de contato por e-mail; não há submissão GET do formulário.
- Nenhum CRM, pixel, analytics ou rastreador foi acrescentado. Cabeçalhos de segurança e `noindex, nofollow` preservados.

Essa revisão verifica comportamento técnico e não atesta conformidade jurídica integral. A mensagem de WhatsApp não substitui registro auditável de consentimento. O aviso permanece explicitamente preliminar.

## Testes e resultados

| Verificação | Resultado final |
| --- | --- |
| Instalação inicial (`npm install`) | Passou; lockfile criado |
| Reinstalação reproduzível (`npm ci`) | Passou |
| `npm run build` | Passou; sete páginas de conteúdo e rotas auxiliares geradas |
| `npm run typecheck` | Passou, incluindo a suíte de testes |
| `npm audit --audit-level=moderate` | Zero vulnerabilidades reportadas após correção do PostCSS |
| Playwright / Chromium | **34 passaram; 0 falhas, 0 pulados, 0 instáveis; 39,0 s** |
| Responsividade | Todas as sete páginas em 320, 390, 768, 1024 e 1440 px sem rolagem horizontal |
| Comparação visual da home | Dimensões preservadas; idêntica nos dois tamanhos mobile comparados |
| Integridade dos três PNGs oficiais | SHA-256 idêntico à base |

A suíte cobre acesso e retorno das cinco soluções, navegação da home, abertura local da página de privacidade, slugs inválidos, seleção de todos os objetivos, campos obrigatórios, nome em branco, marketing autorizado/recusado, codificação da mensagem e número oficial de WhatsApp, abertura solicitada com proteções, fallback e sua invalidação após edição/troca de objetivo, ausência de persistência/rastreadores nos fluxos exercitados, cenário sem JavaScript, menu/teclado/foco/resize, cabeçalhos e noindex. A comunicação real com WhatsApp foi interceptada; nenhuma mensagem foi enviada.

As execuções intermediárias serviram para corrigir os defeitos e ajustar o harness (tipos dos testes, consulta de texto em `noscript` e expectativa do fragmento `#contato`). O resultado acima corresponde à execução final, após essas correções, não às tentativas anteriores. Resultados estruturados e logs em `docs/validacao/`.

## Configuração reutilizável do ambiente

Salvos com confirmação no rascunho os campos **`install_script`** e **`start_skill`**: instalação com `npm ci`, build, TypeScript, testes e instruções de inicialização/verificação dos serviços, usando o checkout existente e sem criar worktree. Não foi necessária credencial ou alteração da política de rede. A instalação foi repetida com lockfile e os comandos de build, typecheck e teste foram exercitados neste ambiente.

O rascunho está disponível nas configurações do ambiente para revisão. Salvá-lo não aplica mudanças ao runtime nem publica uma versão. Nenhuma publicação foi feita; restauração do código/configuração em uma nova tarefa não foi validada. A base Git continua sem commits remotos.

## Pendências e limites

- Confirmar razão social/CNPJ da controladora, retenção, operadores, base legal de cada tratamento e procedimentos de direitos/revogação com o responsável jurídico.
- Se houver marketing operacional, definir gestão e evidências de consentimento e revogação antes de usá-lo. Nenhum backend ou CRM foi criado nesta missão.
- Validar abertura/retorno no aplicativo WhatsApp e comportamento em aparelhos iOS/Android reais, Safari e Firefox. A suíte cobre Chromium desktop e emulação mobile; não envia mensagens reais.
- Instagram e e-mail foram verificados quanto a URLs e atributos; acesso à conta externa e entrega de e-mail não foram exercitados.
- Não foi feita auditoria completa de acessibilidade com leitores de tela ou certificação WCAG. Foram exercitados ARIA, foco, teclado e validação nos fluxos descritos.
- O remoto não tinha commits. O código está no workspace e no ZIP de entrega, sem commit/push; persistência em um novo ambiente ainda não foi validada.

Não foram alteradas decisões estratégicas ou identidade visual. Não houve publicação.

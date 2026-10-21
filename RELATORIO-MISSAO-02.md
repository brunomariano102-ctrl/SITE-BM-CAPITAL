# MISSÃO 02 | BM CAPITAL — Homologação visual e funcional

Data: 21/10/2026. Resultado: **verificação técnica automatizada aprovada no ambiente atual; aceite visual do responsável e testes em aparelhos reais pendentes**. Sem publicação, CRM, rastreadores, push ou mensagens reais.

## Estado inicial e referências

Lidos `AGENTS.md`, `README.md` e `RELATORIO-MISSAO-01.md`. Foi usado o checkout existente, preservando todos os arquivos e a entrega anterior. O Git continua sem commits locais: os arquivos do projeto aparecem sem rastreamento; isso não significa que sejam descartáveis.

Referências disponíveis: ZIP original, ZIP de entrega da Missão 01 e capturas em `docs/validacao/`. Não há um novo documento de aprovação visual independente nesta missão. As referências anteriores foram tratadas como base de comparação, sem declarar que o responsável aprovou as novas evidências.

## Alterações realizadas

- **Aplicação:** acrescentado `metadata.icons` em `app/layout.tsx`, apontando para o PNG oficial já existente. O navegador solicitava `/favicon.ico` e recebia 404. A correção elimina essa requisição ausente sem redesenhar logotipo, acrescentar arquivo de imagem, alterar layout ou criar conexão externa.
- **Testes:** novo `tests/homologacao.spec.ts`, com dez execuções adicionais, cobrindo links internos, âncoras, títulos após navegação, console, recursos, privacidade e popup/fallback reais interceptados no navegador.
- **Evidências:** script `scripts/capturar-homologacao.mjs`, 21 capturas integrais das sete páginas em três larguras, captura do menu aberto, imagens de inspeção, JSONs, logs e galeria offline em `docs/missao-02/`.
- **Orientação:** `CHECKLIST-MISSAO-02.md`, com passos de aceite e teste local no celular; README atualizado com a entrega desta missão.

Nenhum CSS, texto institucional, produto, número de WhatsApp, regra de consentimento ou dependência foi alterado. A comparação dos arquivos existentes da entrega da Missão 01 confirmou que, fora da documentação, o único arquivo anterior alterado é `app/layout.tsx` (além dos novos testes e script).

## Comparação visual

| Verificação | Resultado |
| --- | --- |
| Home desktop: referência 1440 × 4657 e captura atual | 0 pixels diferentes |
| Home mobile: referência 390 × 8232 e captura atual | 0 pixels diferentes |
| Três PNGs oficiais | Hashes SHA-256 preservados |
| Cores CSS | `--navy: #071827`; `--gold: #cba45e`, preservadas |
| Tipografia declarada | Arial/Helvetica/sans-serif e Georgia/serif, preservadas |
| Sete páginas | Capturas integrais em 1440, 390 e 320 px |
| Inspeção visual | Home, soluções, privacidade, contato/rodapé e menu aberto inspecionados nas capturas |

As capturas da home foram comparadas na mesma largura, altura de viewport e escala de pixels das referências. As outras seis páginas não tinham capturas individuais anteriores equivalentes; foram inspecionadas e registradas, sem atribuir a elas uma comparação pixel a pixel inexistente.

**Limite visual observado:** algumas setas/símbolos nas capturas aparecem como glifos quadrados neste ambiente. O CSS e os símbolos originais foram preservados; a igualdade entre capturas não demonstra que esse detalhe esteja correto em todos os dispositivos. Validar setas e tipografia no aparelho real. Não foram substituídos os símbolos nem incorporadas novas fontes para não modificar o material aprovado sem avaliação. A renderização de fontes de sistema depende também das fontes disponíveis no dispositivo.

## Testes executados nesta missão

| Verificação | Resultado final |
| --- | --- |
| `npm run build` | Passou |
| `npm run typecheck` | Passou, incluindo os testes novos |
| Playwright / Chromium desktop e emulação mobile | **44 passaram, 0 falharam, 0 pulados, 0 instáveis** |
| Responsividade das sete páginas | Sem rolagem horizontal em 320, 390, 768, 1024 e 1440 px nos cenários executados |
| Todos os destinos internos/âncoras | Respostas 200 e elementos de destino presentes |
| Menu desktop/mobile | Cada opção leva à seção; título visível após concluir a rolagem; fechamento e ARIA verificados |
| Rotas inválidas | 404, inclusive `constructor`, `toString` e `__proto__` |
| Formulário | Obrigatórios, nome só com espaços, ciência obrigatória e marketing opcional verificados |
| WhatsApp | Número, mensagem, codificação, versão do aviso, AUTORIZO/NÃO AUTORIZO e fallback verificados |
| Popup e fallback | Aberturas efetivas do navegador interceptadas antes de conexão com `wa.me`; `window.opener` nulo |
| Recursos e console das sete páginas | Sem erros nas execuções finais; ícone oficial configurado |
| Persistência e conexões espontâneas | Sem cookies, localStorage/sessionStorage ou requisições externas nos fluxos monitorados |
| Segurança e metadados | Cabeçalhos existentes e `noindex, nofollow` preservados |
| Sem JavaScript | Botão desabilitado, orientação exibida e sem GET de dados do formulário |
| Galeria estática | 21 seleções verificadas via HTTP local; abertura direta `file://` bloqueada pela política do navegador deste ambiente |

A suíte de 34 testes anterior foi reexecutada junto das dez execuções novas. Os testes de WhatsApp cobrem tanto a preparação interceptando `window.open` quanto a abertura real de janelas com resposta local simulada. Não comprovam conexão com WhatsApp, cadastro do número ou entrega de mensagens. Nenhuma mensagem foi enviada e nenhum e-mail ou Instagram foi acionado externamente.

A auditoria npm não foi repetida nesta missão, pois não houve alteração de dependências; o resultado da Missão 01 permanece histórico, sem nova alegação de ausência atual de vulnerabilidades.

### Falhas intermediárias e diagnóstico

Primeira execução ampliada: **41 passaram e 3 falharam**. Uma falha era a ausência do ícone, corrigida. As duas falhas do teste de âncora exigiam que o limite superior da seção ficasse inteiramente abaixo do cabeçalho durante rolagem suave; isso não correspondia à visibilidade do conteúdo, pois a seção possui padding e o cabeçalho inclui borda. Ajustado o teste para aguardar `scrollend` e avaliar o título da seção, sem relaxar a exigência de título visível e sem alterar o layout. A execução final de 44 testes passou. Logs e resultados das duas execuções foram preservados.

## LGPD — resultado técnico

Ciência do aviso e marketing continuam separados. Marketing começa desmarcado; tanto recusa quanto autorização permitem preparar atendimento. A ausência de ciência obrigatória impede continuar. A mensagem inclui a escolha opcional e versão 2026-10-20 do aviso. O fallback anterior é invalidado após edição/troca de objetivo. Não foram criados coleta no servidor, registro de consentimento, CRM, cookies de marketing ou rastreadores.

A revisão é técnica e não certifica conformidade jurídica integral. Abrir WhatsApp é uma ação de saída para terceiro e usa uma URL contendo a mensagem preparada; codificação não anonimiza os dados. O envio final permanece decisão do usuário no aplicativo.

## Pendências separadas

### Técnicas e de dispositivo

- Executar o checklist em Android/Chrome e iPhone/Safari reais, incluindo teclado virtual, orientação, abrir/voltar do aplicativo WhatsApp e popup bloqueado.
- Confirmar tipografia e símbolos/setas em aparelhos reais; há glifos ausentes nas capturas deste ambiente, como descrito acima.
- Firefox, Safari real e auditoria completa com leitores de tela não foram executados.
- A restauração em uma nova tarefa cloud e a persistência no repositório remoto não foram validadas. Não foi feito commit/push nem publicação do site ou do ambiente nesta missão.

### Decisões e aprovações do responsável

- Registrar aceite visual de cores, logotipo, tipografia, textos, páginas de soluções e apresentação do aviso; a automação não substitui seu aceite.
- Qualquer mudança de identidade, textos estratégicos ou inclusão de fontes/símbolos alternativos precisa de avaliação específica.
- Publicação, CRM e rastreadores continuam sem autorização e não fazem parte desta entrega.

### Jurídicas e operacionais

- Confirmar controladora/razão social/CNPJ, bases legais, retenção, operadores, compartilhamento e exercício de direitos.
- Definir gestão e evidências de marketing/revogação antes de operar comunicações promocionais. A mensagem de WhatsApp não é um registro estruturado de consentimento.

## Como revisar a entrega

Abra `docs/missao-02/index.html` após extrair o pacote para navegar pelas capturas offline. Siga `CHECKLIST-MISSAO-02.md` para rodar o site em rede local e testar no celular, sem publicar e sem enviar mensagens. Registre problemas com página, aparelho, passos e captura sem dados pessoais.

Evidências: `docs/missao-02/comparacao.json`, `paginas.json`, `resultados-finais.json`, `resultados-iniciais.json`, `build.log`, `typecheck.log`, `testes.log`, `testes-iniciais.log` e PNGs. As evidências anteriores em `docs/validacao/` foram preservadas.

# MISSÃO 04 | BM CAPITAL — Aplicação dos esclarecimentos aprovados

Data: 21/10/2026. Aviso: **2026-10-21-r1** (21/10/2026, revisão 1). Sem publicação.

## Autorização e escopo

Após informar o fluxo de atendimento e aprovar os materiais, o responsável declarou: “Tudo aprovado! Vamos continuar com o site!”. Foram aplicados os esclarecimentos compatíveis com os fatos fornecidos, sem interpretar esse aceite como publicação, revisão profissional ou prova de que todos os procedimentos já funcionam.

## Alterações

- Formulário informa que continuar abre uma URL no WhatsApp contendo dados e escolhas e que o envio da mensagem à BM Capital é uma ação posterior no aplicativo.
- Aviso explica o acesso por equipe interna autorizada e a continuidade por vendedor designado, inclusive em número próprio profissional. Mantida separação do compartilhamento com instituições e parceiros.
- Atendimento solicitado e autorização para futuras promoções permanecem distintos. Marketing é opcional, inicialmente desmarcado; ciência é separada e obrigatória.
- Descrita a possibilidade de pedir revogação ao vendedor e o encaminhamento à coordenação da empresa, conforme o fluxo aprovado. Não há automação ou bloqueio de números implementado pelo site.
- Ausência de backend de leads descrita com precisão, sem afirmar ausência universal de logs ou tratamentos externos. Controle manual aparece como em organização, não como serviço já implementado.
- Retenção, descarte, backups e futura hospedagem continuam pendentes; nenhum prazo ou fornecedor foi inventado.
- A versão tem uma revisão explícita porque o texto mudou no mesmo dia. A data exibida e o identificador enviado na mensagem derivam das mesmas definições, evitando reutilizar uma versão indistinguível da anterior.

Não foram alterados CSS, paleta, logotipos, tipografia, soluções, regras de validação, destino do WhatsApp, dependências ou os dados institucionais. Não foram adicionados CRM, rastreadores, persistência ou serviços externos.

## Verificação

| Verificação | Resultado |
| --- | --- |
| Build de produção | Aprovado |
| TypeScript | Aprovado |
| Suíte desktop/mobile | **54 testes aprovados, 0 falhas, 0 pulados, 0 instáveis** |
| Mensagem WhatsApp | Identificador completo 2026-10-21-r1, ambas escolhas de marketing e fallback verificados |
| Responsividade | Sete páginas verificadas pela suíte em 320–1440 px; capturas de formulário/aviso em 1440, 390 e 320 px sem rolagem horizontal |
| Preservação visual | Cabeçalho e hero em desktop idênticos à referência na região comparada; CSS e imagens inalterados |

Capturas e resultados estruturados em `docs/missao-04/`; a comparação dos formulários em 390 e 320 px foi inspecionada visualmente, sem cortes nos campos, escolhas ou nova orientação. O novo texto muda intencionalmente a altura de trechos do formulário/aviso; não se alega igualdade pixel a pixel dessas regiões. Os testes de popup foram interceptados e nenhuma mensagem real foi enviada.

Os novos testes verificam texto da revisão, continuidade com vendedores, controles ainda em organização, distinção entre marketing e atendimento e informação sobre abertura do serviço externo. A suíte anterior também é reexecutada, com a mensagem exigindo o novo identificador completo.

## Pendências

- Confirmar a execução real do procedimento manual, acesso, comunicação aos vendedores, backup e retenção; o aceite da proposta não comprova esses fatos.
- Revisão profissional e texto final das políticas ainda pendentes. Aviso segue preliminar.
- Foi perguntado se o domínio está registrado e se há hospedagem/provedor. Nenhum registro, conta, DNS ou deploy foi configurado.
- Testes em aparelhos reais não são substituídos pela emulação Chromium. Nenhuma mensagem real será enviada pelos testes.

## Entrega

Código e evidências serão salvos na branch de preparação, preservando a entrega aprovada anterior em `entrega-windows`. `noindex, nofollow` permanece ativo. Atualizar fonte no GitHub não publica o site.

# BM Capital — revisão inicial de privacidade

Data: 21/10/2026. Aviso analisado: versão 2026-10-21.

**Análise de apoio, com pendências jurídicas e operacionais. Não é parecer de advogado, certificação de conformidade ou autorização de publicação.** O aviso deve continuar preliminar até a validação do texto e da operação pelo responsável e por profissional habilitado.

## Escopo e evidências

Revisados `AGENTS.md`, `docs/juridico/AGENTS.md`, `docs/BRIEFING-REVISAO-PRIVACIDADE.md`, `docs/PREPARACAO-PUBLICACAO.md`, `app/privacidade/page.tsx`, `components/home/lead-form.tsx`, `lib/whatsapp.ts` e `lib/site.ts`.

A revisão foi documental e do código, sem novos testes, pesquisa de normas atualizadas ou acesso à operação real. Não foram examinados conversas, contas, contratos, backups ou hospedagem. Não houve consulta cadastral, contato com terceiros, alteração do site ou publicação. O CNPJ fornecido, 45.270.578/0001-04, tem dígitos válidos; isso não comprova correspondência com razão social, situação cadastral ou atividade autorizada. O domínio também não teve propriedade/registro verificados.

## Pontos já coerentes com a proposta

O formulário solicita primeiro nome, objetivo e prazo, orientando não incluir informações sensíveis. Ciência do aviso e marketing estão separados; marketing começa desmarcado e a recusa não impede preparar atendimento. O aviso não transforma ciência em consentimento geral nem concede compartilhamento indiscriminado com parceiros. A mensagem inclui versão do aviso e escolha de marketing; o usuário decide enviá-la no aplicativo. Não há backend de leads ou gestão de consentimentos nos arquivos examinados.

Esses pontos são positivos na implementação, mas não demonstram que retenção, direitos, fornecedores e execução de marketing estejam resolvidos na operação.

## Pendências prioritárias

| Prioridade | Evidência no projeto | Consequência prática e proposta não aprovada |
| --- | --- | --- |
| Alta, antes de marketing | `lead-form.tsx` e `whatsapp.ts` preparam AUTORIZO/NÃO AUTORIZO; não existe histórico ou execução de revogação no site. | Definir quem registra e consulta a escolha e quem impede contatos após recusa/revogação. Pode haver procedimento manual adequado; não se presume necessidade de CRM ou backend. Não iniciar campanhas apoiando-se apenas no checkbox sem processo definido. |
| Alta, para fechar o aviso | A seção 5 de `privacidade/page.tsx` deixa retenção a formalizar. | Levantar conversas, contatos, anexos, e-mails e backups; validar critérios/prazos por finalidade, acesso e descarte. Não adotar prazo inventado ou prometer eliminação irrestrita. |
| Alta, para transparência | `window.open` abre uma URL `wa.me` contendo a mensagem, antes de o usuário confirmar seu envio no aplicativo. | Explicar a diferença entre preparar no navegador, abrir o serviço externo e enviar à empresa. A abertura transmite a URL ao destino; codificação não anonimiza. Proposta de texto abaixo. |
| Alta, para definir finalidades/bases | A seção 3 descreve enquadramento possível e alternativa aberta; marketing tem autorização opcional. | Confirmar as etapas reais de atendimento e comunicações e validar o enquadramento por finalidade. Ciência do aviso não substitui essa definição. Não escolher base definitiva apenas pela conveniência da interface. |
| Alta, antes de atender pedidos reais | A seção 6 fornece e-mail, mas não foi apresentado procedimento interno. | Identificar quem recebe e executa solicitações, verifica identidade proporcionalmente, procura dados nos canais e registra providências. Validar requisitos/prazos aplicáveis com o jurídico; não pedir documentos excessivos. |
| Antes de concluir hospedagem/fornecedores | O formulário não envia leads a servidor da BM Capital, mas o provedor não foi definido e contas/contratos não foram examinados. | Avaliar logs técnicos, IP, retenção, acessos, fornecedores e eventuais transferências/compartilhamentos. Não declarar ausência de qualquer tratamento ou classificar todos os fornecedores como operadores sem análise. |

Essas prioridades organizam o trabalho; não são classificação automática de infrações. Ausência de recurso no código não prova ausência de procedimento na empresa.

## Redações para avaliação — propostas não aprovadas

Não inserir automaticamente no site. Os textos abaixo precisam corresponder à operação e ser revisados pelo responsável/jurídico.

### 1. Explicar abertura do WhatsApp e envio

Próximo ao botão, uma redação possível:

> Ao continuar, os dados preenchidos e suas escolhas comporão uma URL aberta no serviço WhatsApp. Você poderá revisar a mensagem antes de enviá-la à BM Capital. A abertura do serviço está sujeita às práticas de privacidade do WhatsApp.

Na seção 2 do aviso, diferenciar também o recebimento pela empresa: a preparação é local; a abertura encaminha a URL ao serviço; o envio da mensagem à BM Capital depende da confirmação no aplicativo. A referência genérica às práticas do fornecedor não substitui avaliar serviço, papéis e condições efetivamente utilizados.

### 2. Delimitar a ausência de backend de leads

Para evitar confusão com ausência de logs técnicos de qualquer natureza:

> Os dados preenchidos neste formulário não são enviados a um backend de captação de leads da BM Capital nem gravados pelo formulário em um histórico de consentimentos. Se você enviar a mensagem no WhatsApp, as informações poderão integrar o histórico de atendimento.

Esse trecho precisa ser complementado com retenção, fornecedores e registros técnicos reais da hospedagem. Não se propõe afirmar ausência de IPs, logs ou tratamento algum.

A revogação de marketing já é mencionada no formulário e há e-mail para direitos. A prioridade é implementar um procedimento real compatível com o texto, sem prometer automação ou execução imediata inexistentes.

## Quatro perguntas ao responsável

Atualização: o responsável confirmou atendimento por ele e pelo time interno e assumiu a coordenação de direitos/revogação. Informou um WhatsApp oficial único e possibilidade de ações comerciais dos vendedores em números próprios. Confirmou também que os vendedores receberão contatos originados do site/WhatsApp oficial. O responsável informou que o controle de autorizações, recusas e revogações ainda será organizado. Foi preparada uma proposta manual para avaliação; o procedimento de atribuição e a efetiva adoção dos controles continuam pendentes. Consulte [OPERACAO-CONFIRMADA.md](OPERACAO-CONFIRMADA.md) para não repetir perguntas já respondidas.

1. **Quem atende e executa pedidos de direitos/revogação?** Quem controla WhatsApp/e-mail e quais pessoas têm acesso?
2. **Onde os dados ficam hoje?** Há contatos salvos, exportações, anexos, planilhas ou backups? Quais critérios de retenção, restrição e descarte são praticados?
3. **Haverá marketing nesta versão?** Como autorização/recusa será registrada e consultada antes de cada contato e atualizada após revogação?
4. **Quais serviços/fornecedores participarão?** Confirmar tipo de conta WhatsApp, e-mail, hospedagem pretendida e eventuais parceiros, disponibilizando contratos/políticas ao jurídico sem enviar senhas ou dados de clientes ao chat.

## Próximo passo e limites

Confrontar as respostas com o aviso/formulário, fechar procedimentos reais e obter validação profissional do texto final. Confirmar também os dados cadastrais e a divulgação do endereço. Não remover o rótulo preliminar ou aplicar propostas como definitivas sem decisões expressas. Publicação, retirada de `noindex`, CRM e rastreadores continuam fora da autorização desta revisão.

**Conclusão inicial:** ciência e marketing estão tecnicamente separados, mas ainda faltam decisões concretas sobre operação, retenção, direitos e fornecedores. Aceite visual e testes funcionais não encerram essas pendências.

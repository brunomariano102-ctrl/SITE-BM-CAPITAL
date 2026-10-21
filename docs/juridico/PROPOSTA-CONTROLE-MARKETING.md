# Proposta de controle manual de atendimento e marketing

**Proposta para avaliação do responsável e do jurídico; não implementada ou aprovada.** Não é integração CRM, certificação de conformidade ou autorização para iniciar campanhas. O site permanece inalterado.

## Ponto de partida confirmado

O responsável coordena privacidade/revogação. Ele e o time interno atendem; existe um WhatsApp oficial e vendedores podem usar números próprios, inclusive para atender contatos recebidos pelo canal oficial. O controle das escolhas ainda será organizado.

## Fluxo sugerido

1. **Receber no canal oficial.** Conferir o que o cliente efetivamente enviou. Abrir o link ou preparar uma mensagem não prova que ela foi enviada, nem que a empresa recebeu uma autorização.
2. **Registrar o necessário.** Sob coordenação do responsável, vincular o atendimento ao vendedor e registrar a preferência de marketing com data, fuso, versão do aviso quando disponível e referência à evidência efetivamente recebida. Não preencher autorização por suposição.
3. **Atribuir o atendimento.** Disponibilizar somente o necessário ao vendedor designado, incluindo a preferência vigente. Não distribuir a lista completa de contatos a todos os números. O vendedor se identifica como integrante da BM Capital ao continuar o pedido; isso não transforma atendimento em campanha autorizada.
4. **Consultar antes de divulgar.** No fluxo de marketing baseado na autorização opcional do site, a proposta é só incluir em comunicações promocionais contatos com autorização verificável e ainda vigente. Recusa, revogação ou ausência de evidência ficam fora dessas ações. A recusa não impede responder ao pedido de atendimento. O enquadramento de cada finalidade ainda precisa de revisão jurídica.
5. **Respeitar revogação em qualquer canal.** Quem receber o pedido comunica ao coordenador e interrompe novas ações promocionais ao contato. O coordenador atualiza o registro e comunica a alteração aos vendedores envolvidos antes de novos envios, inclusive nos números próprios. Não criar prazo fictício de resposta ao titular.
6. **Controlar acesso e saída da equipe.** Definir quem pode consultar/alterar o controle e como retirar acessos e tratar cópias quando alguém sair. Não exigir acesso indiscriminado às conversas pessoais dos vendedores. Como os números são próprios, os meios reais de aplicação e supervisão precisam ser definidos.

## Modelos vazios

Foi preparado também um [modelo de Excel com listas de seleção](MODELO-CONTROLE-MARKETING.xlsx), explicado no [guia](GUIA-CONTROLE-EXCEL.md). Ele permanece vazio e não executa o processo pela empresa. Antes de preencher, salve uma cópia fora do projeto/repositório; não envie dados de clientes ao GitHub.

A [minuta de ajustes do aviso](MINUTA-AJUSTES-AVISO.md) foi separada do texto vigente e não foi aplicada.

## Alternativa CSV

[MODELO-CONTROLE-MARKETING.csv](MODELO-CONTROLE-MARKETING.csv) usa ponto e vírgula e UTF-8 com BOM para facilitar a abertura no Excel do Windows. Não contém contatos reais, exemplos que possam ser confundidos com registros ou macros. É uma estrutura de campos, sem automação ou validação de células.

Preferências sugeridas: `NAO_VERIFICADO`, `AUTORIZOU`, `RECUSOU`, `REVOGOU`. `AUTORIZOU` depende de evidência; não é valor padrão. Um checkbox alterado localmente ou texto preparado não é evidência de recebimento. Referencie a evidência pertinente sem copiar conversas inteiras, documentos ou informações financeiras desnecessárias.

A referência ao contato pode apontar para o registro do canal oficial, evitando duplicar dados quando viável. Não use link público da planilha nem distribua a base completa aos vendedores. Se o controle for adotado, a empresa deve escolher armazenamento e acessos adequados; nada foi criado em contas ou serviços externos pelo agente. Campos que futuramente contenham texto de terceiros devem ser tratados como texto no Excel, sem executar fórmulas inseridas por eles.

## O que ainda precisa ser decidido

- Onde o controle ficará e quem poderá vê-lo/alterá-lo; como os vendedores receberão somente suas atribuições e atualizações.
- Como conferir e registrar as evidências e como supervisionar o uso dos números próprios.
- Regras de retenção e descarte, incluindo o registro mínimo necessário para respeitar recusas/revogações. Revogar marketing não equivale a apagar automaticamente todo histórico de atendimento ou obrigações legítimas; definir o tratamento adequado com o jurídico.
- Redação final do aviso compatível com o processo adotado. Não afirmar que esse controle já existe antes de colocá-lo em prática.

Até definir e aplicar o procedimento, a recomendação é manter o atendimento solicitado separado de futuras campanhas e não iniciar o fluxo promocional baseado no checkbox apenas por ele existir.

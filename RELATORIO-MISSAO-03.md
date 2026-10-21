# MISSÃO 03 | BM CAPITAL — Preparação final

Data: 21/10/2026. **Etapa iniciada; versão final ainda depende das informações do responsável. Sem publicação.**

## Aceite e escopo

O responsável confirmou que abriu a versão no Windows, que está aprovada e rodando, e pediu avanço. Esse aceite foi registrado em `docs/PREPARACAO-PUBLICACAO.md`. Não foram presumidos testes em Android/iOS, validação jurídica ou autorização para publicação.

## Trabalho realizado

- Atualizadas as instruções do agente para refletir a conclusão das Missões 01/02, a entrega GitHub e o aceite recebido, evitando retomar uma etapa já encerrada.
- Preparado o roteiro de conclusão com as informações pendentes, os estados e a sequência de configuração/publicação.
- Corrigidos metadados das cinco páginas de soluções: antes herdavam a descrição e Open Graph genéricos da home; agora usam o título e a introdução aprovados da própria solução.
- Criado teste funcional dos metadados nas cinco rotas, em desktop e mobile, incluindo preservação de `noindex, nofollow`.

Nenhum texto visível, CSS, imagem, layout, estratégia comercial, consentimento, telefone, dependência ou serviço externo foi alterado. Não há domínio inventado ou valor jurídico preenchido por suposição.

## Verificação

| Verificação | Resultado |
| --- | --- |
| `npm run build` | Passou |
| `npm run typecheck` | Passou |
| Playwright desktop/mobile | **46 passaram, 0 falhas, 0 pulados e 0 instáveis** |
| Metadados das cinco soluções | Descrição e Open Graph correspondem ao conteúdo da página; locale e noindex preservados |
| Regressão funcional anterior | 44 testes reexecutados com sucesso junto das duas novas execuções |

Logs e resultados estruturados em `docs/missao-03/`. Testes de WhatsApp continuam interceptados, sem envio de mensagens. Nenhuma nova execução em Windows ou aparelho real foi realizada pelo agente; o funcionamento no Windows foi informado pelo responsável.

## Pendências para prosseguir

- Domínio, razão social, CNPJ corrigido e endereço foram recebidos nesta continuação; consultar abaixo. Não foi confirmada propriedade/registro do domínio ou situação cadastral externa.
- Receber confirmação da revisão jurídica e, quando disponível, o texto final aprovado do Aviso de Privacidade, incluindo regras de retenção e gestão de marketing/revogação.
- Definir hospedagem e preparar URLs definitivas/configuração da plataforma quando essas decisões forem fornecidas.
- Publicação e retirada de `noindex` permanecem ações futuras, dependentes de autorização explícita.

O pedido de informações foi feito enquanto o trabalho técnico independente continuava. O aceite visual não substitui essas definições.

## Continuação — dados institucionais recebidos

O responsável informou o domínio `www.solucoesbmcapital.com.br`, a razão social BM Capital Ltda e o endereço Rua José Lins do Rego, nº 32, bairro Pompilio Sampaio, Jequié, Bahia. Informou também que o aviso ainda não foi revisado juridicamente.

- Centralizados domínio, razão social e endereço em `lib/site.ts`, como dados fornecidos pelo responsável, sem alegação de certificação cadastral externa.
- Configuradas `metadataBase`, URLs canônicas e `og:url` próprias para home, cinco soluções e privacidade, usando HTTPS e host `www` informado. Não houve validação de registro/propriedade do domínio, nem alteração de DNS, domínio de hospedagem ou redirecionamentos.
- Identificação da controladora e sede inseridas na seção correspondente do aviso, sem mudar o canal de atendimento digital/agendado ou anunciar atendimento presencial na sede.
- O primeiro CNPJ não passou no cálculo dos dígitos verificadores. Após solicitação de confirmação, o responsável informou 45.270.578/0001-04. O número corrigido passou na checagem aritmética e foi inserido no aviso. Não houve correção por dedução ou consulta de registro/situação cadastral.
- Mantido aviso **preliminar**, com revisão jurídica pendente. Não foram inventados retenção, bases legais definitivas, operadores ou regras de marketing.
- Atualizada a versão do aviso para **2026-10-21**, compartilhada entre a data exibida e a mensagem WhatsApp. Checklist atual acompanha a nova versão; evidências históricas foram preservadas.
- Acrescentados testes de URLs e identificação nas sete páginas. Resultados desta continuação em `docs/missao-03/dados-institucionais/`.

A seção de verificação acima descreve a execução anterior de 46 testes. A primeira execução desta continuação teve 48 aprovações e duas falhas de expectativa do teste: Next.js serializa a URL raiz sem barra final, enquanto o teste exigia a barra. O teste passou a comparar URLs absolutas normalizadas, preservando a exigência de domínio, protocolo e caminho corretos. Não foi necessário mudar a URL do site para contornar a verificação. Logs dessa tentativa foram preservados. Resultados da versão com CNPJ corrigido serão registrados após a conclusão.


### Evidências e diagnóstico da continuação

A home foi recapturada em desktop e comparada à referência: mesmas dimensões e zero pixels diferentes. Foram registradas capturas atualizadas da privacidade em desktop e mobile, com os dados corrigidos, e a captura mobile foi inspecionada.

A segunda execução intermediária teve 48 aprovações e duas falhas porque uma expectativa do teste ainda buscava o texto “CNPJ em confirmação” depois da correção do número. A expectativa foi atualizada para exigir o CNPJ fornecido e validado aritmeticamente; a aplicação já exibia esse valor corretamente. Logs intermediários foram preservados. O resultado final será registrado abaixo.

Foi preparado `docs/BRIEFING-REVISAO-PRIVACIDADE.md`, para encaminhamento pelo responsável ao jurídico. Nenhuma mensagem foi enviada pelo agente e não foram definidas políticas jurídicas por conta própria.


### Resultado final desta continuação

- Build de produção: aprovado.
- TypeScript: aprovado.
- Suíte desktop/mobile: **50 testes aprovados, 0 falhas, 0 pulados e 0 instáveis**.
- As sete páginas passaram na verificação de URLs canônicas/Open Graph para o domínio informado e preservação de noindex.
- Aviso com BM Capital Ltda, CNPJ 45.270.578/0001-04, sede informada e versão 2026-10-21 verificados; marketing opcional e ciência separada permanecem funcionais.
- Home desktop preservada com zero pixels diferentes em relação à referência; capturas atualizadas do aviso disponíveis em `docs/missao-03/dados-institucionais/`.

Esta conclusão substitui as expectativas pendentes das tentativas intermediárias, preservadas apenas como histórico. Não representa revisão jurídica, ativação de domínio, configuração de hospedagem ou publicação. A próxima dependência é o texto jurídico aprovado e a definição da hospedagem; nenhuma ação externa desse tipo foi executada.

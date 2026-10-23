# BM Capital — eventos e públicos Meta para revisão

Atualização de 23/10/2026: portfólio BM Capital 29100514799584868 e Pixel/conjunto de dados BM Capital — Site institucional 1710204487199305 criados, após os aceites expressos dos contratos oficiais da Meta. Categoria Serviço financeiro selecionada; conexão automática à API de Conversões desmarcada. Não houve convites a terceiros ou reivindicação de ativos alheios. Pixel ainda sem instalação/recebimento público e públicos não criados. A categoria mostrou aviso de possíveis restrições; não prometer que eventos customizados e exclusões estarão disponíveis antes de verificar o painel.

## Eventos preparados

| Evento | Significado real | Uso proposto |
| --- | --- | --- |
| PageView | Página pública conhecida visitada após consentimento | Diagnóstico de tráfego autorizado |
| BMCampaignView | Visita à /campanhas/consorcios após consentimento | Incluir visitantes da campanha |
| BMPreDiagnosisStart | Primeira interação com campo do formulário | Separar quem começou a preencher |
| BMPreDiagnosisComplete | Formulário válido e mensagem preparada, uma vez por montagem do formulário | Excluir da recuperação de formulário; não é Lead confirmado |
| BMWhatsAppClick | Tentativa de abrir WhatsApp ou clique no fallback | Analisar continuidade; não comprova mensagem recebida |

Eventos só após publicidade autorizada, sem parâmetros individuais/financeiros. Nenhum evento Lead, Purchase, valor, nome, telefone, texto da mensagem ou resposta do formulário. Correspondência avançada/automática desativada na proposta. Não registrar abandono no unload: construir públicos por inclusão menos conclusão. Quem não consente não recebe rastreamento do site; públicos de engajamento internos da Meta são uma fonte distinta, sujeita às regras da plataforma e às escolhas aplicáveis.

## Cobertura geral do site — esclarecimento autorizado em 23/10/2026

Usar um único Pixel BM Capital em todo o site, após consentimento de publicidade. O carregador global já contempla Home, as cinco soluções, privacidade, cookies e a página de campanha conhecida. Não disparar eventos para rotas inválidas. `PageView` é a base geral, independentemente da origem da visita; `BMCampaignView` é apenas um detalhamento opcional do exemplo de consórcios. Não criar um Pixel separado por produto, nem inferir condição financeira individual a partir da página visitada.

Os públicos principais são institucionais. Quando houver controles compatíveis, limitar ao domínio oficial e excluir visitas exclusivamente às páginas legais de uma campanha comercial; não supor que a plataforma disponibilize essa combinação. A conclusão do pré-diagnóstico em qualquer página alimenta a exclusão geral. Não esperar um evento de fechamento da aba: abandono é a diferença entre visitantes/iniciantes e conclusões.

## Regras gerais propostas, a confirmar na interface disponível

| Nome sugerido | Inclusão | Exclusões | Retenção proposta |
| --- | --- | --- | --- |
| BM — Site — Visitou — 7d | PageView no domínio oficial, em qualquer página pública válida | BMPreDiagnosisStart e BMPreDiagnosisComplete (30d) | 7 dias |
| BM — Site — Iniciou — 14d | BMPreDiagnosisStart em qualquer formulário do site | BMPreDiagnosisComplete (30d) | 14 dias |
| BM — Site — Visitou — 30d | PageView no domínio oficial | Visitantes 7d e BMPreDiagnosisComplete (30d) | 30 dias |
| BM — Pré-diagnóstico concluído — exclusão | BMPreDiagnosisComplete | — | 30 dias |

Segmentos por campanha/produto podem ser preparados depois, subordinados à exclusão geral e às restrições aplicáveis. Escolher no conjunto de anúncios se o público será restrição efetiva ou sugestão (p.ex. recursos de expansão); não presumir remarketing fechado se a Meta puder ampliar a entrega. O público geral não exige visitar a landing page de consórcios.

## Verificações obrigatórias antes de campanhas

- Titularidade BM Capital: portfólio, conta de anúncios, Instagram/página, conjunto de dados e domínio.
- Termos aplicáveis às ferramentas de negócios/públicos, disponibilidade dos eventos e eventuais restrições da categoria de dados financeiros no Gerenciador de Eventos.
- Exigência de categoria especial, verificação/autorização do anunciante de serviços financeiros, região alcançada, idade/localização e limitações de segmentação. Não presumir que regras dos EUA se apliquem automaticamente ao Brasil.
- Aprovação dos anúncios e autorização de uso de marcas/administradoras; não prometer contemplação, data, retorno ou condições não comprovadas.
- Diagnósticos reais com eventos de teste autorizados, sem dados de clientes. Verificar se os eventos chegam e são permitidos para públicos/otimização; não contornar bloqueios usando nomes alternativos.
- Tamanho elegível do público, orçamento aprovado, frequência/rotatividade e exclusões. Não garantir correspondência de todos os visitantes, número de exibições ou conversão.

O Pixel não está ativo no site público. API de Conversões, upload de listas de clientes, integração CRM e campanhas ficam fora da ativação desta etapa.

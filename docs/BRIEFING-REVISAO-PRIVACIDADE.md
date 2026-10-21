# BM Capital — briefing técnico para revisão de privacidade

Documento para encaminhamento pelo responsável ao seu jurídico. Nenhuma comunicação foi enviada pelo agente. Decisões jurídicas e operacionais abaixo ainda não foram tomadas.

## Dados fornecidos pelo responsável

- Entidade: BM Capital Ltda.
- CNPJ: 45.270.578/0001-04, corrigido pelo responsável e com dígitos verificadores válidos. Não houve consulta cadastral externa.
- Sede: Rua José Lins do Rego, nº 32, bairro Pompilio Sampaio, Jequié, Bahia.
- Domínio planejado: https://www.solucoesbmcapital.com.br (propriedade, registro e DNS não verificados).
- Canal de contato já existente no site: bmcapitalsolucoes@gmail.com.

## Funcionamento implementado

1. O formulário pede primeiro nome, objetivo e prazo. Não solicita CPF, documentos, senhas, renda ou dados bancários.
2. O preenchimento permanece na memória do navegador, sem endpoint de leads, banco, CRM, cookies de marketing ou armazenamento local adicionado.
3. Há ciência obrigatória do aviso e uma escolha de marketing separada, opcional e inicialmente desmarcada. O atendimento não exige aceitar marketing.
4. Ao continuar, o site prepara uma URL para `wa.me/5573999724985`, contendo a mensagem, versão do aviso e escolha de marketing. A abertura dessa URL encaminha informações ao serviço externo; codificar a URL não anonimiza a mensagem.
5. O usuário revisa e decide enviar no WhatsApp. Mensagens enviadas podem integrar o histórico de atendimento da empresa e do fornecedor, fora da aplicação web.
6. A aplicação não mantém evidência estruturada de aceite, histórico de alterações ou gestão de revogação. A mensagem preparada não equivale a um sistema auditável de consentimentos.
7. Links para Instagram, WhatsApp e e-mail existem; não há pixels ou analytics incorporados ao site. O provedor de hospedagem ainda não foi escolhido, portanto seus registros técnicos e operadores precisam ser avaliados quando houver definição.

## Pontos para decisão do jurídico e da operação

- Confirmar a identificação da controladora, informações cadastrais e canal de exercício de direitos.
- Definir e validar as bases legais por finalidade, inclusive procedimentos preliminares de atendimento e eventual marketing.
- Definir retenção e descarte para mensagens, arquivos e registros de atendimento; não foi adotado prazo por suposição.
- Definir como registrar e respeitar a escolha de marketing e sua revogação antes de iniciar comunicações promocionais, sem presumir que há CRM autorizado.
- Avaliar fornecedores e tratamentos envolvidos em hospedagem, WhatsApp, e-mail e redes sociais, incluindo transferências e compartilhamento quando aplicáveis.
- Definir procedimento de identificação e resposta a solicitações de titulares, responsáveis internos e exclusões cabíveis.
- Revisar o texto do aviso para refletir somente a operação efetiva; caso haja compartilhamento com instituições financeiras, definir transparência, base legal e fluxo específico pertinentes.

## Material para revisar

- Texto implementado: `app/privacidade/page.tsx`, versão 2026-10-21, ainda marcado como preliminar.
- Formulário: `components/home/lead-form.tsx`.
- Mensagem/versão do aviso: `lib/whatsapp.ts`.
- Dados institucionais: `lib/site.ts`.

O envio do texto final aprovado permitirá ajustar o site sem inventar prazos, autorizações ou políticas. Publicação, CRM e rastreadores seguem fora da autorização atual.

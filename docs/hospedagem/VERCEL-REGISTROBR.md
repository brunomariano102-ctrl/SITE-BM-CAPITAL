# BM Capital — preparação Vercel + Registro.br

**Preparação sem publicação.** O responsável confirmou que comprou apenas o domínio no Registro.br e pediu avanço na opção Vercel. Nenhuma conta, projeto, contratação, deploy ou alteração de DNS foi executada.

## Situação

- Domínio informado: `solucoesbmcapital.com.br`, registrado no Registro.br conforme declaração do responsável.
- Endereço principal planejado: `https://www.solucoesbmcapital.com.br`, já usado nos metadados do código.
- Aplicação Next.js; fonte atual na branch `preparacao-publicacao` do repositório `brunomariano102-ctrl/SITE-BM-CAPITAL`.
- Node.js 24.x declarado em `package.json`. O ambiente local foi preparado em Node 24.19.0.
- Aviso de privacidade preliminar; `noindex, nofollow` preservado.

## Primeiro passo: conta e plano

O responsável pode criar ou acessar sua conta pelo site oficial <https://vercel.com/>. Não envie senha, token ou código de autenticação no chat.

Como o site tem finalidade comercial, confira os termos de uso do plano e custos antes de contratar. O plano Hobby é divulgado para uso pessoal/não comercial; não se deve presumir sua adequação à BM Capital. Avalie um plano que permita o uso pretendido, normalmente Pro ou alternativa apropriada, com valores e condições atuais confirmados diretamente pelo responsável. Nenhum plano pago foi contratado pelo agente.

O acesso às páginas públicas de documentação e planos retornou HTTP 403 neste ambiente. Portanto, **não foram confirmados preços ou condições comerciais atualizadas**. As URLs oficiais para conferência são <https://vercel.com/docs/plans/hobby> e <https://vercel.com/pricing>.

**Pare antes de importar/conectar este repositório ou confirmar Deploy nesta etapa.** Uma importação Git pode iniciar o primeiro deploy e gerar uma URL `.vercel.app`, mesmo sem apontar o domínio do Registro.br. Preview também é disponibilização online e não deve ser tratado como automaticamente privado. Não foi dada autorização para isso.

## Configuração preparada para a futura importação autorizada

| Campo | Valor planejado |
| --- | --- |
| Repositório | `brunomariano102-ctrl/SITE-BM-CAPITAL` |
| Branch com a preparação atual | `preparacao-publicacao` |
| Framework | Next.js |
| Root Directory | Raiz do repositório (`.`), onde está `package.json` |
| Node.js | 24.x, controlado também por `engines.node` |
| Install Command | `npm ci --include=dev --no-audit --no-fund` |
| Build Command | `npm run build` |
| Output Directory | Padrão detectado de Next.js; não escolher `public` ou `out` |
| Variáveis/segredos obrigatórios da aplicação | Nenhum atualmente |
| Analytics/Speed Insights/pixels/CRM | Não ativar ou instalar |

A branch padrão do repositório pode ser diferente da branch atual de preparação. Antes do primeiro deploy, conferir explicitamente a versão/branch que será usada; não assumir que a importação selecionou a versão mais recente. Se a interface não permitir conferir a versão antes de iniciar o deploy, interromper e ajustar o procedimento com o responsável.

Next.js já é suportado pela plataforma. Não foi criado `vercel.json` com campos desnecessários, não se impôs exportação estática e não foi instalado Vercel CLI. A preparação não configura nem desabilita automações de uma conta que o agente não acessou. Após uma eventual conexão Git, revisar os gatilhos automáticos antes de futuros pushes.

## Domínio e DNS — somente após autorização específica

1. No projeto autorizado da Vercel, adicionar `www.solucoesbmcapital.com.br` e avaliar também o domínio sem `www` para o redirecionamento ao endereço principal.
2. Copiar os registros **específicos exibidos para esse projeto**; não usar IP/CNAME genérico de tutorial ou valor inventado.
3. No Registro.br, verificar primeiro os servidores DNS atualmente autoritativos. Editar os registros no serviço que de fato administra a zona; não trocar nameservers sem necessidade/planejamento.
4. Preservar registros de e-mail (MX e TXT), verificações e outros serviços existentes. Anotar a configuração anterior para reversão.
5. Aplicar apenas os registros aprovados e verificar validação do domínio, HTTPS e redirecionamento para `www`.

Não há valores DNS prontos neste documento porque o projeto ainda não existe. A propriedade/registro do domínio não foi consultada externamente pelo agente.

## Verificação futura na hospedagem

Após publicação especificamente autorizada: confirmar HTTPS, as sete páginas e 404 inválido, cabeçalhos, URLs canônicas, formulários com marketing aceito/recusado e popup/fallback sem mensagens reais. Conferir versão do aviso e ausência de integrações não autorizadas. Só tratar indexação/sitemap após decisão explícita correspondente; `noindex` não é mecanismo de privacidade ou autenticação.

Os testes locais não comprovam o comportamento da infraestrutura Vercel, do DNS ou do aplicativo WhatsApp em aparelho real. Não afirmar hospedagem pronta enquanto esses passos não forem executados.

## Evidência técnica consultada

Em 21/10/2026, foi consultado o código público oficial `vercel/vercel`, commit `c628be7835e03a965b93e9cf9e2bd5ac2acbf5eb`:

- [Versões Node suportadas](https://github.com/vercel/vercel/blob/c628be7835e03a965b93e9cf9e2bd5ac2acbf5eb/packages/build-utils/src/fs/node-version.ts): inclui Node 24.x.
- [Seleção de Node pelo package.json](https://github.com/vercel/vercel/blob/c628be7835e03a965b93e9cf9e2bd5ac2acbf5eb/packages/build-utils/src/fs/run-user-scripts.ts): considera `engines.node`.

Essa evidência sustenta a configuração de runtime. Não substitui a confirmação do plano, dos termos, do painel ou um deploy real. O código de referência foi lido fora do checkout do projeto; não é dependência da aplicação.

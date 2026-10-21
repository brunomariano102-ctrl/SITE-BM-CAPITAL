# BM Capital — checklist assistido de hospedagem

**Estado: preparação. Não há autorização para compra, importação, preview, deploy ou DNS.** Marque itens somente depois de executá-los e conferir o resultado. O agente não acessou sua conta Vercel ou Registro.br.

## 1. Conta e preparação, sem colocar o site online

- [ ] Criar ou acessar sua conta em <https://vercel.com/>. Não enviar senha, token ou código de autenticação no chat.
- [ ] Conferir um plano que permita o uso comercial da BM Capital e seus custos atuais antes de contratar. Não presumir que o Hobby gratuito seja adequado.
- [ ] Informar ao agente que a conta está acessível e descrever a tela atual, sem dados sigilosos.
- [ ] Ler os valores preparados abaixo, sem iniciar importação ou Deploy.

| Configuração a conferir futuramente | Valor preparado |
| --- | --- |
| Repositório | `brunomariano102-ctrl/SITE-BM-CAPITAL` |
| Branch | `preparacao-publicacao` |
| Root Directory | Raiz do repositório (`.`), onde está `package.json` |
| Framework | Next.js |
| Node.js | 24.x |
| Install Command | `npm ci --include=dev --no-audit --no-fund` |
| Build Command | `npm run build` |
| Output Directory | Padrão detectado de Next.js; não escolher `public` ou `out` |
| Segredos obrigatórios da aplicação | Nenhum atualmente |

**Ponto de parada:** não conectar/importar este repositório nem confirmar Deploy nesta fase. A importação pode iniciar o primeiro deploy e criar uma URL `.vercel.app`, mesmo sem o domínio próprio. Preview não é automaticamente privado; `noindex` não controla acesso.

## 2. Primeiro deploy — apenas após autorização específica

- [ ] Confirmar com o responsável o plano/custos e a autorização para criar/importar o projeto e disponibilizar a versão online.
- [ ] Conferir a branch e o commit que serão publicados. A branch padrão do GitHub pode não ser a versão atual de preparação.
- [ ] Conferir os campos da tabela antes de iniciar o deploy. Se não for possível identificar a versão nessa etapa, parar para ajustar o procedimento.
- [ ] Conferir os gatilhos da integração Git: conectar o repositório pode permitir novos deploys a cada push. Não presumir que essa automação foi desativada.
- [ ] Manter analytics, pixels, CRM e retirada de `noindex` fora da ação, salvo autorização correspondente.
- [ ] Após o deploy autorizado, verificar HTTPS, as sete páginas, 404 inválido, cabeçalhos, formulários e WhatsApp com destinos interceptados, sem mensagens reais.
- [ ] Registrar o resultado observado. O build local aprovado não comprova sucesso na Vercel.

## 3. Conexão do domínio — autorização separada

- [ ] Confirmar autorização para conectar `www.solucoesbmcapital.com.br` e tratar o domínio sem `www` como origem de redirecionamento, se aprovado.
- [ ] Obter no projeto Vercel os valores DNS reais indicados para ele. Não copiar IP/CNAME genérico de tutorial.
- [ ] Conferir quem administra os servidores DNS autoritativos do domínio; o registro está no Registro.br segundo o responsável.
- [ ] Anotar a configuração anterior e preservar registros de e-mail, verificações e outros serviços existentes.
- [ ] Alterar somente os registros aprovados no administrador DNS correto, sem trocar nameservers por suposição.
- [ ] Verificar domínio, certificado HTTPS e redirecionamento ao endereço principal. Não marcar como conectado antes de confirmar.

## O que ainda não foi confirmado

Conta/plano, condições comerciais atuais, projeto Vercel, valores DNS, deploy e conexão do domínio. As páginas de documentação de planos retornaram HTTP 403 neste ambiente, e nenhum preço foi verificado. Conferir diretamente <https://vercel.com/pricing> e <https://vercel.com/docs/plans/hobby> antes de contratar.

O aviso de privacidade continua preliminar; retenção e revisão profissional permanecem pendentes. Uma eventual autorização técnica de deploy não equivale a aprovação jurídica.

Referências do projeto: [guia Vercel + Registro.br](VERCEL-REGISTROBR.md) e [relatório da preparação local](../../RELATORIO-MISSAO-05.md).

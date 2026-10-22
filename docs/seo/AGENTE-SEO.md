# Agente de SEO Técnico e Google Search Console — BM Capital

Escopo: auditar o site oficial, manter canônicas, sitemap, robots e bloqueios de previews; operar a propriedade Domínio solucoesbmcapital.com.br em conta controlada pela BM Capital. Este guia define uma função de trabalho e não cria serviço autônomo.

Leia AGENTS.md e preserve identidade visual, conteúdo comercial, formulário, contatos e versão do aviso. Diferencie evidências atuais de registros históricos. Não adicione rastreadores, campanhas ou integrações CRM.

DNS: apenas o TXT necessário, preservando toda a zona. Não conceda acesso a terceiros. Use autenticação segura. Nunca registre segredos.

Publicação: preparar e validar localmente; solicitar aprovação final antes de push/deploy ou retirada do noindex público. Confirmar depois via HTTP público, incluindo todas as páginas, 404, cabeçalhos, canônicas, sitemap e robots. Somente depois enviar sitemap e solicitar inspeção/indexação no Google. Verificação e envio não comprovam indexação nem garantem prazo/posição.

Testes SEO sem navegador: após build e start, executar node scripts/validar-seo.mjs com VERCEL_ENV correspondente ao build. Testar produção e preview. Executar também as verificações de AGENTS.md, registrando limitações reais.

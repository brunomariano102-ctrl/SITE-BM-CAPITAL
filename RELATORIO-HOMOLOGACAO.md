# BM Capital | Relatório de homologação preliminar (20/10/2026)

## Verificações feitas
- ZIP v1.0 extraído; arquivos Next.js, páginas de soluções, privacidade e três imagens institucionais presentes.
- Código do formulário revisado: nome, objetivo e prazo obrigatórios; ciência do aviso obrigatória; marketing opcional; WhatsApp wa.me/5573999724985.
- Não há endpoint de persistência de consentimento no código revisado.
- `next.config.ts` tem cabeçalhos de segurança básicos; `layout.tsx` inclui noindex enquanto aguarda publicação.
- Ajustado texto de orientação se a janela WhatsApp não abrir.

## Impedimento técnico
- `npm install --no-audit --no-fund --prefer-offline` excedeu o tempo de execução; dependências não instaladas.
- `npm run build` e testes de navegador NÃO foram executados; não há homologação técnica.

## Riscos e pendências antes da publicação
1. Executar `npm ci` (se houver lockfile) ou `npm install`, depois `npm run build` e testes em navegador real.
2. Confirmar identidade jurídica do controlador, retenção, operadores e política de privacidade com jurídico.
3. Estabelecer mecanismo auditável para autorizações quando necessário, especialmente no CRM.
4. Testar formulário, menu mobile, contraste, leitores de tela e abertura WhatsApp em iOS/Android.
5. Revisar HTML inserido por `dangerouslySetInnerHTML` e migrar para componentes React progressivamente.
6. Só retirar `noindex` e publicar mediante autorização expressa.

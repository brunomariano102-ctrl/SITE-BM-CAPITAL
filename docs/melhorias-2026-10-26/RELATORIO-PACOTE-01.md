# BM Site — pacote 01 de melhorias para revisão

**Data:** 26/10/2026. **Estado:** candidata local, sem push, deploy ou publicação.

## Base e preservação

A branch remota `preparacao-publicacao` foi consultada nesta rodada e continua em `680531d1e0e96a4f31b4baed36eb9b3266cc052e`. O checkout estava em `a6db672`, funcionalmente equivalente a essa produção; as diferenças conhecidas são capturas de revisão preservadas localmente. A candidata foi preparada na branch local `melhorias/legibilidade-navegacao-2026-10-26`, sem worktree ou limpeza destrutiva.

Os dois temporários pré-existentes não rastreados foram preservados. A foto da abertura foi mantida; na seção Sobre, o responsável escolheu a opção A, com uma empreendedora fictícia em contexto de pequeno negócio. O novo arquivo `planejamento-empreendedora.webp` tem 1200×900 px e 103.524 bytes. A home continua com apenas duas fotografias, identificadas como ilustrações de IA, sem apresentá-las como equipe ou clientes reais. Não foram alterados a matriz oficial da marca, o conteúdo comercial principal da abertura, os textos e regras dos produtos, os contatos, as políticas de privacidade/cookies, o mecanismo de consentimento, medição ou regras de indexação.

## Alterações preparadas

1. **Legibilidade:** tom de dourado mais escuro somente em pequenos textos sobre superfícies claras; texto secundário levemente escurecido; legendas das imagens de IA ampliadas de 10 para 12 px. O dourado original continua em fundos escuros, ornamentos e na logomarca. A frase grande da seção Sobre manteve sua cor anterior.
2. **Logo leve:** derivados WebP lossless proporcionais a partir do PNG oficial, sem reconstrução, recoloração ou deformação. Cabeçalho e rodapé usam arquivos de 155/310 px por densidade de tela; a matriz de 1922×929 continua intacta.
3. **Ícones e compartilhamento:** ícone de 32 px, ICO e Apple Touch Icon vinculados no HTML, além de derivado de 192 px disponível. Cartão nativo de 1200×630 com logo oficial, assinatura institucional e domínio, configurado em Open Graph para home e cinco soluções. O cartão não foi publicado ou validado no cache das plataformas.
4. **CTA única:** “Solicitar pré-diagnóstico BM” nos botões de entrada da home, cabeçalho, menu mobile e soluções. O botão de envio continua “Continuar pelo WhatsApp”, pois descreve outra ação.
5. **Próximo passo:** texto factual junto à CTA das soluções informa que o visitante pode revisar a mensagem no WhatsApp antes de enviá-la. A explicação já existente no formulário foi preservada; não foram inventados custo, gratuidade, duração ou prazo de resposta.
6. **Continuidade nas soluções:** as cinco páginas passam a usar cabeçalho e rodapé compartilhados. Seus links apontam para `/#sobre`, `/#objetivos`, `/#solucoes`, `/#metodo`, `/#contato` e `/#inicio`, retornando às seções reais da home. Menu mobile mantém foco, Escape e fechamento por navegação.
7. **Banner de cookies simplificado:** título curto, finalidades de análise/anúncios e link para a política. “Gerenciar cookies” fica em linha separada, com “Rejeitar cookies” e “Aceitar cookies” equivalentes em tamanho e estilo. O painel conserva categorias separadas, recusas, revogação, aviso de perda de dados não enviados ao revogar e independência em relação às mensagens comerciais. Nenhum handler, ID, versão, prazo ou mecanismo de coleta foi modificado. O aviso de medição inativa aparece no painel detalhado quando essa é a configuração local.

Não entraram nesta candidata: bio de Bruno/Thaly, FAQ, novas alegações comerciais, campanhas ou rastreadores. A mudança de foto é a substituição aprovada da segunda cena; não foi aumentada a quantidade de imagens.

### Texto exato do banner inicial

**Uso de cookies**

“Com sua autorização, usamos cookies e tecnologias semelhantes para analisar visitas e personalizar anúncios. Consulte nossa Política de cookies.”

“Política de cookies” é o link para `/cookies`. Gestão: **Gerenciar cookies**. Botões: **Rejeitar cookies** e **Aceitar cookies**. O painel detalhado tem o título **Suas preferências de cookies**.

## Contraste e arquivos

| Combinação de texto/fundo | Contraste calculado |
| --- | --- |
| `#7b5a29` / marfim `#f7f4ee` | 5,73:1 |
| `#7b5a29` / branco | 6,29:1 |
| `#596771` / marfim | 5,31:1 |
| `#596771` / fundo Sobre `#eeeae2` | 4,86:1 |
| Dourado original `#cba45e` / navy `#071827` | 7,71:1 |

Além do cálculo, os pequenos textos selecionados foram conferidos no DOM por teste de navegador, com mínimo de 4,5:1. Isso é uma verificação pontual, não certificação integral de acessibilidade.

| Logo | Bytes |
| --- | --- |
| PNG oficial, matriz intacta | 1.077.097 |
| Derivado WebP 310 px | 36.212 |
| Derivado WebP 155 px | 13.788 |

O derivado de 310 px reduz cerca de 96,6% dos bytes daquele arquivo; isso não representa a mesma redução no tempo de carregamento do site. Header e footer podem compartilhar cache. SHA-256 da matriz: `ad2481ee83286b67beb085d0d5166646281b427a56670ba0da2c5641eddeb3af`.

## Verificações efetivamente executadas

- Após integrar a foto A e o banner simplificado: novo build default e TypeScript aprovados; suíte completa com **74 aprovados, 16 pulados, 0 falhas**, em 65,8 s.
- Build de medição ativa **simulada** com IDs fictícios, em modo de teste/preview: aprovado. Suíte específica de cookies e medição com fornecedores interceptados: **26 aprovados, 4 pulados, 0 falhas**, em 16,9 s. Cobriu bloqueio antes da escolha, recusa, categorias isoladas, retirada, revogação entre abas, expiração e armazenamento indisponível. Os quatro pulados são exclusivos de build production; não foram apresentados como aprovados nesta rodada.
- A simulação não comprova recebimento de dados por GA4/Meta e não enviou formulários ou mensagens reais. Os IDs fictícios foram passados apenas aos comandos, sem gravar arquivos de ambiente ou modificar as configurações da aplicação.
- Ao encerrar, o build default foi restaurado com exit 0. A busca nos chunks estáticos desse build não encontrou os três IDs fictícios usados na simulação.
- Evidências atuais: `cookies-suite-default.json`, `cookies-suite-ativa-simulada.json` e logs correspondentes em `validacao/`. Capturas de banner/painel ativo simulado em `validacao-consentimento-ativo/`.

Histórico dos ajustes técnicos anteriores, preservado para distinguir as execuções:

- Build aprovado, exit 0, com Next.js 15.5.28 em Node 24.22.1.
- TypeScript aprovado, exit 0.
- Rodada completa de navegador: **70 aprovados, 16 pulados e 2 falhas de seletor**. As duas falhas eram o mesmo teste de menu mobile, nos dois projetos, que passou a encontrar tanto “Contato” quanto a nova CTA no mesmo `href`. O seletor foi tornado específico para o link “Contato”.
- Reexecução somente dos dois casos corrigidos: **2 aprovados, 0 falhas, 3,4 s**. Não houve uma segunda suíte completa; os registros distinguem as duas execuções.
- Depois da revisão visual, foi removido um limite fixo de 250 px que fazia a CTA do cabeçalho quebrar “BM” sozinho até em tela ampla. A correção foi recompilada e conferida por novas capturas e medições, sem repetir toda a suíte por essa mudança isolada de CSS.
- As três verificações novas, executadas nos dois projetos, passaram: navegação das soluções até a home, contraste dos pequenos textos selecionados e disponibilidade/metadados dos arquivos de marca e compartilhamento.
- A suíte existente cobriu navegação, sete páginas, formulário, marketing aceito/recusado, fallback do WhatsApp, menu/foco/Escape, responsividade, cabeçalhos, metadados e slugs inválidos. WhatsApp foi interceptado; não houve envio real.
- Os 16 casos pulados dependem de condições específicas de medição não ativadas nesta revisão.
- `git diff --check` aprovado.

## Capturas e encaixe do cabeçalho

Capturas e medições reais do Chromium local em 1440×1000, 1024×1000, **961×1000**, 390×844 e 320×740, para home e Consórcios (template compartilhado das cinco soluções). Nenhum dos dez estados excedeu a largura da viewport. Em 961 e 1024 px, o menu desktop termina com margem de 32 px.

Após a correção, a CTA do cabeçalho ocupa **uma linha em 1440 e 1024 px**, e duas linhas no espaço menor de 961 px, sem sobreposição ou overflow. Não foi alterado o breakpoint de 960 px. Nos tamanhos menores, o menu mobile é usado normalmente.

Prévias principais, em `validacao/`:

- `home-desktop.png` e `home-mobile.png`;
- `sobre-desktop.png` e `sobre-mobile.png`, já com a foto A escolhida;
- `cookies-banner-desktop.png` e `cookies-banner-mobile.png`, primeira visita;
- `cookies-painel-desktop.png` e `cookies-painel-mobile.png`, configuração local sem medição ativa;
- `consorcios-inteira-desktop.png` e `consorcios-inteira-mobile.png`;
- `menu-solucao-mobile.png`;
- `home-borda-menu.png` e `home-tablet.png`;
- `capturas.json`, resultados das execuções e medições auxiliares.

Cartão: `public/assets/brand/bm-capital-compartilhamento.png`. Geração reproduzível: `scripts/preparar-marca.mjs`. Capturas: `scripts/capturar-melhorias-20261026.mjs`.

## Limites e próximo passo

A validação mobile usa Chromium emulado, não Safari/iPhone ou Android físico. Foram inspecionados recortes locais; nenhuma verificação desta rodada comprova alteração no endereço público. Após aprovação da candidata, será necessário publicar e conferir a versão pública e os caches de compartilhamento. A bio da equipe e as confirmações comerciais continuam separadas desta entrega.

**Publicação autorizada pelo responsável em 26/10/2026 após revisão das prévias e dos testes.** O envio e a conferência pública serão registrados separadamente; autorização não comprova deploy concluído.

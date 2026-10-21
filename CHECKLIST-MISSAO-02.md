# BM Capital — seu checklist de aceite

Status inicial: **aguardando sua validação**. Não marque itens somente porque os testes automatizados passaram.

Data: ____ / ____ / ______ · Responsável: ____________________
Aparelho/sistema: ____________________ · Navegador/versão: ____________________

## Como conferir sem publicar

Para avaliar o visual agora, extraia o ZIP da Missão 02 e abra `docs/missao-02/index.html` no navegador. Selecione a página e a largura e role a captura inteira. Essa galeria é estática: botões e formulários nas imagens não são clicáveis.

Para testar o site interativo no celular, é necessário executá-lo em um computador na mesma rede Wi-Fi. O endereço interno da máquina cloud não é acessível diretamente pelo celular. Não abra `preview.html`, pois é uma referência antiga.

Com Node.js 24.19.0 instalado no computador, abra um terminal na pasta do projeto e execute:

```sh
npm ci
npm run dev -- --hostname 0.0.0.0
```

No celular conectado à mesma rede, digite o IP privado do computador seguido de `:3000`, por exemplo `http://192.168.1.10:3000` (troque pelo IP real). Autorize apenas o acesso da rede local no firewall, se necessário; não configure redirecionamento de portas, domínio ou exposição pública. Encerre o servidor com Ctrl+C ao terminar. Se a rede impedir acesso entre aparelhos, registre o impedimento e peça ajuda para a sessão local; não publique como alternativa automática.

## 1. Identidade e conteúdo

- [ ] O logotipo é o oficial, está legível e não aparece deformado.
- [ ] Azul-marinho, dourado, fundos, tipografia e espaçamentos correspondem ao material aprovado.
- [ ] Os símbolos/setas aparecem corretamente no meu aparelho, sem quadradinhos de glifo ausente.
- [ ] Conferi a home inteira, incluindo objetivos, soluções, método, apresentação, formulário e rodapé.
- [ ] Conferi Consórcios, Crédito, Seguros, Investimentos, Planejamento e Privacidade.
- [ ] Os textos, contatos, horário e nome da marca estão corretos.

## 2. Navegação e leitura

- [ ] O menu abre e fecha; cada opção leva à seção correta e o título fica visível.
- [ ] Os cinco links de soluções funcionam e consigo retornar à home e ao diagnóstico.
- [ ] Botões e textos não ficam cortados; não preciso arrastar a página para os lados.
- [ ] Testei em pé e deitado, inclusive com o teclado virtual aberto no formulário.
- [ ] Consigo ler os textos de privacidade e selecionar cada checkbox separadamente.
- [ ] O aviso de privacidade abre e consigo voltar ao formulário.

## 3. WhatsApp — sem enviar mensagem

Use somente dados fictícios, por exemplo primeiro nome **Teste**. Não inclua documentos ou dados financeiros. Não toque no botão de enviar dentro do WhatsApp.

- [ ] Campos vazios ou sem ciência do aviso impedem continuar.
- [ ] Marketing começa desmarcado e o formulário permite prosseguir sem autorizá-lo.
- [ ] Preenchi nome, objetivo e prazo; marquei somente a ciência do aviso.
- [ ] Ao continuar, o destino é **+55 73 99972-4985** e a mensagem está apenas preparada para revisão.
- [ ] A mensagem contém o nome/objetivo/prazo escolhidos e **NÃO AUTORIZO** para comunicações opcionais.
- [ ] Sem enviar, voltei ao navegador, marquei marketing e repeti: agora consta **AUTORIZO**.
- [ ] O aviso aparece com versão **2026-10-20**, e a confirmação de envio continua sendo minha ação no WhatsApp.
- [ ] Depois de editar dados ou trocar objetivo, o link anterior de continuação desaparece; uma nova preparação usa os dados atuais.
- [ ] Testei o link alternativo “toque aqui para continuar”, se o aplicativo não abriu automaticamente.
- [ ] Voltei ao site sem dificuldade e descartei qualquer rascunho de teste no aplicativo.

O teste verifica abertura e conteúdo preparado; não confirma entrega de mensagens. Não envie mensagem real nesta homologação.

## 4. Registro e decisões

- [ ] Registrei problemas com página, passo, resultado esperado/observado e modelo do aparelho.
- [ ] Anexei captura sem dados pessoais quando necessário.
- [ ] Indiquei o que aprovo visualmente e o que precisa de ajuste, sem misturar com a revisão jurídica.

Resultado visual/funcional: [ ] Aprovado [ ] Aprovado com ressalvas [ ] Reprovado
Ressalvas: __________________________________________________________

A aprovação deste checklist **não autoriza publicação, CRM ou rastreadores**. Razão social/CNPJ, bases legais, retenção, operadores e gestão de consentimento/revogação continuam sujeitos à validação jurídica.

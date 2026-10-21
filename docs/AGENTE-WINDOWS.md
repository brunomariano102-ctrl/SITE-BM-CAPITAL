# Assistente BM Capital — abrir no Windows

Este assistente é o iniciador local `INICIAR-SITE-WINDOWS.cmd`. Ele automatiza a preparação e a abertura do site; não controla seu computador remotamente e não cria um serviço permanente.

## O que você precisa fazer

1. Instale **Node.js 24**, com npm, pelo site oficial: <https://nodejs.org/>. A instalação é manual; o iniciador não baixa instaladores nem solicita acesso de administrador.
2. Baixe o pacote completo e clique com o botão direito → **Extrair Tudo**. Não execute o iniciador diretamente de dentro do ZIP.
3. Na pasta extraída que contém `package.json`, dê dois cliques em **`INICIAR-SITE-WINDOWS.cmd`**.
4. Aguarde a instalação das dependências e a inicialização. O navegador será aberto quando a página responder. A primeira execução precisa de internet para as dependências.
5. Deixe a janela aberta enquanto navega. Para encerrar o site, pressione **Ctrl+C** nessa janela; confirme o encerramento se o Windows perguntar.

O site usa somente `127.0.0.1:3000`, acessível no próprio computador. Isso **não publica o site** e não permite acesso pelo celular. Não é necessário mudar firewall, DNS, política de execução ou permissões administrativas. Nenhuma mensagem de WhatsApp é enviada pelo iniciador.

## Se não abrir

- Se faltar Node.js/npm ou a versão não for 24, instale a versão indicada e reabra o iniciador.
- Se a porta 3000 estiver ocupada, o iniciador para. Ele não encerra programas de terceiros. Feche com Ctrl+C apenas outra sessão da BM Capital que você mesmo iniciou, se houver.
- Se a instalação falhar, copie a mensagem visível na janela e envie ao Agente BM Capital. Não desative antivírus, verificações TLS ou bloqueios do Windows.
- Se o navegador não abrir automaticamente, aguarde **Ready** no terminal e digite `http://127.0.0.1:3000` no navegador. O assistente aguarda por até três minutos antes de avisar que não conseguiu abri-lo.
- Se o Windows ou sua organização bloquear o arquivo ou o PowerShell, registre a mensagem. Não altere políticas ou proteções para contornar o bloqueio.

## O que foi verificado

O iniciador foi revisado estaticamente no ambiente Linux do Codex: caminhos entre aspas, versão de Node, uso de `npm.cmd`/`call`, tratamento de falhas, endereço restrito ao computador, espera por HTTP 200 e ausência de instalação automática do Node, publicação ou alteração de políticas. **Não foi executado em Windows**; a primeira execução no seu computador ainda precisa ser confirmada.

O script roda `npm ci` antes de cada abertura para reproduzir as dependências do lockfile. Ele mantém a janela de desenvolvimento no primeiro plano. O processo auxiliar de abertura do navegador encerra quando encontra HTTP 200 ou após três minutos; ele não mantém o site rodando sozinho.

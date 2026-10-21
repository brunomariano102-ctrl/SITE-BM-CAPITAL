# Como avaliar o modelo de Excel

Arquivo: [MODELO-CONTROLE-MARKETING.xlsx](MODELO-CONTROLE-MARKETING.xlsx).

É um modelo vazio para apoiar o fluxo manual proposto, sem integração com site, WhatsApp, e-mail ou CRM. Criar o arquivo não significa que a empresa já adotou o procedimento.

## No Windows

1. Baixe o arquivo pelo GitHub e abra no Excel.
2. Leia a aba **LEIA-ME** e avalie os campos com a coordenação.
3. **Antes de preencher, salve uma cópia fora da pasta do projeto e do repositório.** Não envie planilhas preenchidas ao GitHub ou a este chat.
4. Na aba **CONTATOS**, registre apenas o necessário para identificar o atendimento, atribuir o vendedor e conhecer a preferência efetivamente recebida.
5. Em **ALTERACOES**, registre mudanças, como recusa, revogação e comunicação ao vendedor, referenciando a evidência pertinente.

Para dados de teste, use somente informações fictícias. Não habilite fórmulas vindas de mensagens/arquivos de terceiros e mantenha as entradas externas como texto.

## O que o modelo faz

- Abas de instruções, contatos e alterações.
- 300 linhas vazias preparadas em cada aba de registro.
- Listas de preferência, eventos e situação de comunicação à equipe.
- Campos para data/hora/fuso, versão do aviso e referência de evidência.
- Filtros e cabeçalhos fixos para facilitar o uso manual.

`AUTORIZOU` não vem preenchido e deve ser escolhido somente com evidência pertinente. Campo vazio ou `NAO_VERIFICADO` não representa autorização. Uma seleção na planilha não torna verdadeira uma evidência ausente.

## Limites

O arquivo não recebe o formulário, não guarda conversas automaticamente, não bloqueia envios e não sincroniza números próprios. Não tem macros, fórmulas, ligações externas ou registro imutável. Filtros e validações não são controle de acesso e podem ser contornados ao colar dados. Não é certificado de conformidade.

O responsável escolheu manter a cópia preenchida no seu computador; consulte o [guia de uso local](GUIA-USO-LOCAL.md). Ainda é necessário definir quem terá acesso, o backup, como os vendedores receberão apenas suas atribuições e atualizações e quais serão retenção e descarte. O controle completo não deve ser distribuído a toda a equipe por padrão.

Estrutura e validações foram verificadas com Python/openpyxl no ambiente do projeto. A abertura e edição no Excel real do Windows ainda precisam ser confirmadas pelo responsável. Não foi executada nova suíte do site, pois a aplicação não mudou.

## Regeneração técnica opcional

O modelo foi gerado por `scripts/gerar-modelo-controle.py` com Python e openpyxl 3.1.5, ferramentas já presentes no ambiente de trabalho. Nenhuma dependência foi acrescentada ao aplicativo Next.js. Você não precisa de Python para abrir a planilha.

O gerador para se o destino já existe, para não sobrescrever um arquivo eventualmente preenchido. Preserve os arquivos do usuário antes de gerar outro modelo.

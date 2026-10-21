@echo off
setlocal DisableDelayedExpansion
set "NEXT_TELEMETRY_DISABLED=1"
title BM Capital - Site local
cd /d "%~dp0"
if errorlevel 1 goto :folder_error

echo.
echo BM CAPITAL - ABRIR O SITE NESTE COMPUTADOR
echo Este iniciador nao publica o site e nao envia mensagens.
echo Mantenha esta janela aberta enquanto usa o site.
echo.

if not exist "package.json" goto :project_error
if not exist "package-lock.json" goto :project_error
where node.exe >nul 2>&1
if errorlevel 1 goto :node_error
where npm.cmd >nul 2>&1
if errorlevel 1 goto :node_error
node.exe -e "process.exit(process.versions.node.split('.')[0] === '24' ? 0 : 1)"
if errorlevel 1 goto :node_error
where powershell.exe >nul 2>&1
if errorlevel 1 goto :powershell_error

echo Verificando se a porta local 3000 esta livre...
node.exe -e "const net=require('node:net');const server=net.createServer();server.once('error',()=>process.exit(1));server.listen(3000,'127.0.0.1',()=>server.close());"
if errorlevel 1 goto :port_error

echo.
echo Instalando as dependencias fixadas no projeto. Aguarde...
echo Esta etapa precisa de acesso a internet e pode levar alguns minutos.
call npm.cmd ci --no-audit --no-fund
if errorlevel 1 goto :install_error

echo.
echo Iniciando o site. O navegador abrira quando a pagina responder.
echo Endereco: http://127.0.0.1:3000
echo Para encerrar, pressione Ctrl+C nesta janela.
echo.

rem Aguarda HTTP 200 antes de abrir o navegador. Nao altera execution policy.
rem O comando e fixo: nenhum caminho ou dado do usuario e interpolado nele.
start "" /b powershell.exe -NoProfile -NonInteractive -Command "$deadline = (Get-Date).AddMinutes(3); while ((Get-Date) -lt $deadline) { try { $response = Invoke-WebRequest -Uri 'http://127.0.0.1:3000' -UseBasicParsing -TimeoutSec 5; if ($response.StatusCode -eq 200 -and $response.Content.Contains('BM Capital')) { Start-Process 'http://127.0.0.1:3000'; exit 0 } } catch {}; Start-Sleep -Seconds 2 }; Write-Host 'O navegador nao abriu automaticamente. Confira os erros nesta janela ou tente o endereco local depois de aparecer Ready.'; exit 1"
call npm.cmd run dev -- --hostname 127.0.0.1 --port 3000
set "BM_SITE_EXIT=%ERRORLEVEL%"
echo.
if not "%BM_SITE_EXIT%"=="0" echo O servidor encerrou com codigo %BM_SITE_EXIT%. Confira a mensagem acima.
echo O site local foi encerrado. Nenhum processo de outro programa foi finalizado.
pause
exit /b %BM_SITE_EXIT%

:folder_error
echo Nao foi possivel abrir a pasta do projeto.
echo Extraia o ZIP em uma pasta local e tente novamente.
pause
exit /b 1

:project_error
echo Arquivos do projeto nao encontrados ao lado deste iniciador.
echo Extraia TODO o ZIP. Nao execute este arquivo de dentro do ZIP.
echo Mantenha o iniciador na mesma pasta de package.json e package-lock.json.
pause
exit /b 1

:node_error
echo Node.js 24 e npm precisam estar instalados neste Windows.
echo Instale manualmente Node.js 24 pelo site oficial: https://nodejs.org/
echo Depois feche esta janela e abra novamente INICIAR-SITE-WINDOWS.cmd.
echo Este arquivo nao instala programas nem solicita acesso de administrador.
pause
exit /b 1

:powershell_error
echo O PowerShell do Windows nao foi encontrado.
echo Nenhuma politica de execucao foi alterada.
echo Informe esta mensagem ao Agente BM Capital para receber orientacao.
pause
exit /b 1

:port_error
echo A porta 3000 nao esta disponivel. Pode haver outro site aberto nela.
echo Nenhum processo sera encerrado automaticamente.
echo Se voce iniciou outra janela da BM Capital, encerre-a com Ctrl+C e tente novamente.
echo Caso contrario, informe esta mensagem ao Agente BM Capital.
pause
exit /b 1

:install_error
echo A instalacao das dependencias falhou. O servidor nao foi iniciado.
echo Confira sua conexao e copie a mensagem de erro acima para o Agente BM Capital.
echo Nao desative antivirus, verificacoes TLS ou bloqueios do Windows.
pause
exit /b 1

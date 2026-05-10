@echo off
title Tayna Xavier Boutique - Servidor Local
echo =======================================================
echo     Iniciando o servidor da Tayna Xavier Boutique...
echo =======================================================
echo.
echo O navegador abrira automaticamente em alguns segundos.
echo Pressione Ctrl+C nesta janela quando quiser parar o site.
echo.

:: Abre o navegador no localhost
start http://localhost:3000

:: Inicia o servidor de desenvolvimento do Next.js
npm run dev

pause

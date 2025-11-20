@echo off
REM Script para generar PDF de presentacion.html en Windows
REM Usa Playwright con Python

echo ========================================
echo    Generador de PDF - Presentacion
echo ========================================
echo.

REM Verificar si Python esta instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python no esta instalado o no esta en PATH
    echo.
    echo Por favor instala Python desde: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo [OK] Python detectado
echo.

REM Verificar si Playwright esta instalado
python -c "import playwright" >nul 2>&1
if errorlevel 1 (
    echo [INSTALANDO] Playwright...
    pip install playwright
    if errorlevel 1 (
        echo [ERROR] No se pudo instalar Playwright
        pause
        exit /b 1
    )
    echo.
    echo [INSTALANDO] Navegador Chromium...
    playwright install chromium
    if errorlevel 1 (
        echo [ERROR] No se pudo instalar Chromium
        pause
        exit /b 1
    )
) else (
    echo [OK] Playwright ya esta instalado
)

echo.
echo ========================================
echo    Generando PDF...
echo ========================================
echo.

REM Ejecutar el script de generacion
python generar_pdf.py

if errorlevel 1 (
    echo.
    echo [ERROR] Fallo la generacion del PDF
    pause
    exit /b 1
)

echo.
echo ========================================
echo    PDF Generado Exitosamente
echo ========================================
echo.
echo El archivo presentacion.pdf ha sido creado
echo en el directorio actual.
echo.

REM Preguntar si quiere abrir el PDF
set /p abrir="Deseas abrir el PDF ahora? (S/N): "
if /i "%abrir%"=="S" (
    start presentacion.pdf
)

pause

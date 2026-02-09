@echo off
echo ========================================
echo Kitchen Visualizer Plugin Packager
echo ========================================
echo.

cd /d "%~dp0"

set PLUGIN_NAME=kitchen-visualizer-json-generator
set OUTPUT_FILE=%PLUGIN_NAME%.zip

echo Checking if plugin folder exists...
if not exist "%PLUGIN_NAME%" (
    echo ERROR: Plugin folder not found!
    echo Please ensure the folder "%PLUGIN_NAME%" exists in this directory.
    pause
    exit /b 1
)

echo.
echo Removing old ZIP file if exists...
if exist "%OUTPUT_FILE%" del "%OUTPUT_FILE%"

echo.
echo Creating ZIP archive...

:: Use PowerShell to create ZIP file (Windows 8+ built-in)
powershell -command "Compress-Archive -Path '%PLUGIN_NAME%' -DestinationPath '%OUTPUT_FILE%' -Force"

if exist "%OUTPUT_FILE%" (
    echo.
    echo ========================================
    echo SUCCESS!
    echo ========================================
    echo.
    echo ZIP file created: %OUTPUT_FILE%
    echo.
    echo You can now upload this file to WordPress:
    echo 1. Go to WordPress Admin
    echo 2. Navigate to Plugins ^> Add New
    echo 3. Click "Upload Plugin"
    echo 4. Select %OUTPUT_FILE%
    echo 5. Click "Install Now" and then "Activate"
    echo.
) else (
    echo.
    echo ERROR: Failed to create ZIP file
    echo.
)

pause

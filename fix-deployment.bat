@echo off
echo Fixing deployment issues...
echo.

REM Clean previous build
if exist _site rmdir /s /q _site
if exist .jekyll-cache rmdir /s /q .jekyll-cache

echo.
echo Building Jekyll site...
jekyll build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Build successful!
    echo.
    echo For GitHub Pages:
    echo 1. Rename _config_github.yml to _config.yml
    echo 2. Update baseurl in _config.yml to match your repo name
    echo 3. Push to GitHub and enable Pages
    echo.
    echo For Vercel:
    echo 1. Keep current _config.yml
    echo 2. Push _site folder to GitHub
    echo 3. Set Vercel output directory to _site
    echo.
    echo Testing locally...
    jekyll serve --host 0.0.0.0
) else (
    echo.
    echo Build failed! Please check for errors.
)

pause

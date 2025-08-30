@echo off
echo Building Jekyll site for deployment...
echo.

REM Build the site
jekyll build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Build successful! Site ready for deployment.
    echo.
    echo To deploy to Vercel:
    echo 1. Push this code to GitHub
    echo 2. Connect your repo to Vercel
    echo 3. Set output directory to _site
    echo 4. Deploy!
    echo.
    echo Or use: vercel --prod
) else (
    echo.
    echo Build failed! Please check for errors.
)

pause

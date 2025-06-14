# PowerShell script for deploying to Vercel

# Display header
Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "  Document Generator Deployment  " -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
try {
    $vercelVersion = vercel --version
    Write-Host "Vercel CLI detected: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install Vercel CLI. Please install it manually with 'npm install -g vercel'" -ForegroundColor Red
        exit 1
    }
    Write-Host "Vercel CLI installed successfully!" -ForegroundColor Green
}

# Build the application
Write-Host ""
Write-Host "Building the application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Please check the errors above." -ForegroundColor Red
    exit 1
}
Write-Host "Build completed successfully!" -ForegroundColor Green

# Deployment options
Write-Host ""
Write-Host "Deployment Options:" -ForegroundColor Cyan
Write-Host "1. Deploy to production" -ForegroundColor White
Write-Host "2. Deploy to preview (development)" -ForegroundColor White
Write-Host "3. Cancel" -ForegroundColor White
Write-Host ""

$deployOption = Read-Host "Select an option (1-3)"

switch ($deployOption) {
    "1" {
        Write-Host "Deploying to production..." -ForegroundColor Yellow
        vercel --prod
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Deployment to production completed successfully!" -ForegroundColor Green
        } else {
            Write-Host "Deployment to production failed. Please check the errors above." -ForegroundColor Red
        }
    }
    "2" {
        Write-Host "Deploying to preview environment..." -ForegroundColor Yellow
        vercel
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Deployment to preview completed successfully!" -ForegroundColor Green
        } else {
            Write-Host "Deployment to preview failed. Please check the errors above." -ForegroundColor Red
        }
    }
    "3" {
        Write-Host "Deployment cancelled." -ForegroundColor Yellow
        exit 0
    }
    default {
        Write-Host "Invalid option. Deployment cancelled." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "  Deployment Process Complete  " -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
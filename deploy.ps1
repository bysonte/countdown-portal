$ErrorActionPreference = "Stop"

# Configuración
$ImageName = "ghcr.io/bysonte/countdown-portal:latest"

Write-Host "🐳 Construyendo imagen Docker..." -ForegroundColor Cyan
docker build -t $ImageName .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Falló el build de Docker." -ForegroundColor Red
    Read-Host "Presione Enter para salir"
    exit $LASTEXITCODE
}

Write-Host "🚀 Subiendo imagen a GitHub Packages (GHCR)..." -ForegroundColor Cyan
docker push $ImageName

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Falló el push a GHCR." -ForegroundColor Red
    Write-Host "Asegúrate de haber hecho 'docker login ghcr.io' con un Token de GitHub." -ForegroundColor Yellow
    Read-Host "Presione Enter para salir"
    exit $LASTEXITCODE
}

Write-Host "✨ Proceso finalizado. Imagen subida: $ImageName" -ForegroundColor Green
Write-Host "🚢 Ahora puedes ir a Portainer y actualizar el stack marcando 'Re-pull image'." -ForegroundColor Cyan
Read-Host "Presione Enter para finalizar"

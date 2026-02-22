#!/bin/bash
# Deploy rápido para Vercel

echo "🚀 Fazendo deploy do BuildControl para Vercel..."

# Verificar se tem Vercel CLI
if ! command -v vercel &> /dev/null; then
  echo "📦 Instalando Vercel CLI..."
  npm install -g vercel
fi

# Deploy
cd /data/.openclaw/workspace-neo/projects/build-control
echo "🌐 Fazendo deploy..."
vercel --prod --yes

echo "✅ Deploy completo!"
echo "🔗 URL será gerada acima"

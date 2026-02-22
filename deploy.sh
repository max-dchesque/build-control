#!/bin/bash

echo "🚀 BuildControl - Deploy para Vercel"
echo ""

cd /data/.openclaw/workspace-neo/projects/build-control

echo "📦 Instalando dependências..."
npm install

echo "🏗️ Buildando projeto..."
npm run build

echo "🌐 Deployando para Vercel..."
/skeleton/.npm-global/bin/vercel --prod

echo ""
echo "✅ Deploy completo!"
echo "🔗 URL será mostrada acima"

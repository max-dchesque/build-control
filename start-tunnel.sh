#!/bin/bash
# Script para iniciar BuildControl com túnel público

echo "🚀 Iniciando BuildControl..."

# Diretório do projeto
cd /data/.openclaw/workspace-neo/projects/build-control

# Build do projeto (se necessário)
if [ ! -d ".next" ]; then
  echo "📦 Buildando projeto..."
  npm run build
fi

# Iniciar servidor em background
echo "🌐 Iniciando servidor..."
PORT=3000 nohup npm start > logs/server.log 2>&1 &
SERVER_PID=$!

echo "Servidor iniciado (PID: $SERVER_PID)"

# Aguardar servidor subir
echo "⏳ Aguardando servidor..."
sleep 10

# Verificar se servidor está rodando
if curl -s http://localhost:3000 > /dev/null; then
  echo "✅ Servidor rodando em http://localhost:3000"
else
  echo "❌ Erro ao iniciar servidor"
  cat logs/server.log
  exit 1
fi

# Criar túnel com Cloudflare
echo "🌍 Criando túnel público..."

# Tentar usar cloudflare tunnel se disponível
if command -v cloudflared &> /dev/null; then
  echo "Usando cloudflare tunnel..."
  cloudflared tunnel --url http://localhost:3000
else
  echo "❌ cloudflared não encontrado"
  echo "Instale com: wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb"
  echo "          sudo dpkg -i cloudflared-linux-amd64.deb"
  exit 1
fi

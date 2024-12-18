#!/bin/bash

echo "🔄 Reiniciando o servidor..."

# Encontra e mata o processo do Next.js
PID=$(lsof -t -i:3000)
if [ ! -z "$PID" ]; then
    echo "📍 Encontrado processo Next.js (PID: $PID)"
    kill $PID
    echo "✅ Processo anterior finalizado"
else
    echo "ℹ️  Nenhum processo Next.js encontrado rodando na porta 3000"
fi

# Limpa o cache do Next.js
echo "🧹 Limpando cache..."
rm -rf .next
rm -rf node_modules/.cache

# Reinstala as dependências se necessário
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Inicia o servidor novamente
echo "🚀 Iniciando servidor..."
npm run dev

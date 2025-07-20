
#!/bin/sh
echo "🔧 Ejecutando script de entrada..."
npx prisma migrate deploy
node dist/main.js
exec "$@"
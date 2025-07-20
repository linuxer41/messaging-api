FROM node:22-alpine AS builder
# Instala dependencias del sistema necesarias para Prisma
RUN apk add --no-cache openssl libssl3 libc6-compat

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json .

RUN npm install --quiet

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

# Instala dependencias del sistema necesarias para Prisma
RUN apk add --no-cache openssl libssl3 libc6-compat

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh
COPY --from=builder /app/tsconfig.json ./tsconfig.json

ENV NODE_ENV=production

EXPOSE 3000

# CMD [ "node", "dist/main.js" ]
CMD [ "./entrypoint.sh" ]

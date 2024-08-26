FROM node:20.13.0-alpine3.19 AS build

WORKDIR /build

COPY . .

RUN npm install
RUN npx prisma migrate
RUN npm run build --omit dev

FROM node:20.13.0-alpine3.19 AS final

RUN apk update && apk upgrade
RUN apk --no-cache add sqlite

WORKDIR /app

COPY --from=build /build/node_modules/ ./node_modules/
COPY --from=build /build/prisma ./prisma
COPY --from=build /build/dist/ ./dist

EXPOSE 3000
CMD ["node", "/app/dist/index.js"]
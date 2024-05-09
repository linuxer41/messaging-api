FROM node:20.13.0 AS build

WORKDIR /build

COPY . .

RUN npm install
RUN npm run build --omit dev

FROM node:20.13.0-alpine3.19 AS final

RUN apk update && apk upgrade
RUN apk --no-cache add sqlite

WORKDIR /app

COPY --from=build /build/prisma ./prisma
COPY --from=build /build/dist/ /usr/share/nginx/html
COPY --from=build /build/nginx.conf /etc/nginx/conf.d/default.conf


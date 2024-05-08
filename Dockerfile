FROM node:20.13.0-alpine3.19 AS build

WORKDIR /build

COPY . .

RUN npm install
RUN npm run build

FROM node:20.13.0-alpine3.19 AS final

RUN apk update && apk upgrade
RUN apk add --no-cache sqlite~=3.45.3-r0

WORKDIR /app

COPY --from=build /build/dist/ .


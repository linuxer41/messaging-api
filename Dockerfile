FROM node:18.20 AS build

WORKDIR /build

COPY . .

RUN npm install
RUN npm run build

FROM ubuntu:24.04 AS final
WORKDIR /app

COPY --from=build /build/dist/ .

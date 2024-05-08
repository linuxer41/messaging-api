FROM node:18.20 AS build

WORKDIR /build

COPY . .

RUN npm install
RUN npm run build

FROM alpine:3.18 AS final
WORKDIR /app

COPY --from=build /build/dist/ .

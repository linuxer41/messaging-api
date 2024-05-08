FROM node:lts-alpine3.18

RUN npm install
RUN npm run build

WORKDIR /app

COPY ./dist/ .

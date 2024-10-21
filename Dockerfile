FROM node:20.13.0-alpine3.19 AS build

WORKDIR /app

COPY . .

RUN npm install

FROM node:20.13.0-alpine3.19 AS final

RUN apk update && apk upgrade

EXPOSE 3000
CMD ["npm", "run", "dev"]
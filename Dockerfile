FROM alpine:3.18

WORKDIR /build

COPY . .

RUN npm install
RUN npm run build

WORKDIR /app

COPY --from=build /build/dist/ .

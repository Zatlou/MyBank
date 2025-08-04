# STAGE 1 – build
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
# on exclude src/.cache via .dockerignore
COPY . .
RUN npm run build

# STAGE 2 – nginx statique
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
# ton config nginx si besoin
EXPOSE 80

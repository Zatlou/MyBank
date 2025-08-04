# STAGE 1 – deps
FROM composer:2 AS deps
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# STAGE 2 – prod
FROM php:8.3-fpm
RUN apt-get update && apt-get install -y libpq-dev zip unzip \
    && docker-php-ext-install pdo_pgsql zip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=deps /app/vendor ./vendor

# On ne copie QUE les dossiers de prod
COPY src ./src
COPY config ./config
COPY public ./public
COPY migrations ./migrations
# ton .env.production, pas ton .env local
COPY .env.production .env

EXPOSE 8000
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public", "public/index.php"]

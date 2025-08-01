FROM php:8.3-fpm

# 0) Récupère Composer depuis l'image officielle
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 1) Installe les dépendances système : PostgreSQL, zip/unzip, git
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
       libpq-dev \       
       libzip-dev \      
       zip \
       unzip \
       git \
  && docker-php-ext-install \
       pdo \
       pdo_pgsql \
       zip \             
  && rm -rf /var/lib/apt/lists/*

# 2) Copie l'intégralité du projet
WORKDIR /app
COPY . /app

# 3) Charge la config PHP personnalisée
COPY php.ini /usr/local/etc/php/conf.d/


# 4) Expose le port et lance le serveur interne
EXPOSE 8000
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public", "public/index.php"]

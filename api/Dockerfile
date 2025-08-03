FROM php:8.3-fpm


COPY --from=composer:2 /usr/bin/composer /usr/bin/composer


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


WORKDIR /app
COPY . /app


COPY php.ini /usr/local/etc/php/conf.d/



EXPOSE 8000
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public", "public/index.php"]

#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
COMPOSE="docker compose -f $ROOT/deploy/docker-compose.test.yml"

echo "🧪 Spin up env de test…"
$COMPOSE up -d --build

echo "⏳ Attente DB OK…"
$COMPOSE exec -T db-test sh -lc 'until pg_isready -U test -d mybank_test; do sleep 1; done'

echo "📦 Dépendances dev (composer) si nécessaires…"
$COMPOSE exec -T api-test bash -lc 'composer --version >/dev/null 2>&1 || exit 0'
$COMPOSE exec -T api-test bash -lc '[ -x vendor/bin/phpunit ] || composer install --no-interaction --prefer-dist'

echo "📜 Migrations (test)…"
$COMPOSE exec -T api-test bash -lc 'php bin/console doctrine:migrations:migrate --no-interaction --env=test || true'

echo "🏃 PHPUnit (intégration)…"
set +e
$COMPOSE exec -T api-test bash -lc 'mkdir -p var && vendor/bin/phpunit --configuration phpunit.xml.dist --log-junit var/junit.xml'
RC=$?
set -e

echo "🧹 Nettoyage…"
$COMPOSE down -v

exit $RC

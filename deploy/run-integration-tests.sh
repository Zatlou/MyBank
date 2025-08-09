#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
COMPOSE="docker compose -f $ROOT/deploy/docker-compose.test.yml"

echo "🧪 Spin up env de test…"
$COMPOSE up -d --build

echo "⏳ Attente DB OK…"
$COMPOSE exec -T db-test sh -lc 'until pg_isready -U test -d mybank_test; do sleep 1; done'

echo "📜 Migrations (test)…"
$COMPOSE exec -T api-test bash -lc 'php bin/console doctrine:migrations:migrate --no-interaction --env=test || true'

# (option) Fixtures si dispo
$COMPOSE exec -T api-test bash -lc 'php -v >/dev/null; if php -r "exit(class_exists(\"Doctrine\\\Bundle\\\FixturesBundle\\\DoctrineFixturesBundle\")?0:1);"; then php bin/console doctrine:fixtures:load -n --env=test || true; else echo "Fixtures non installées, skip"; fi'

echo "🏃 PHPUnit (intégration)…"
# JUnit -> var/junit.xml pour collecte par la CI
set +e
$COMPOSE exec -T api-test bash -lc 'mkdir -p var && vendor/bin/phpunit --configuration phpunit.xml.dist --log-junit var/junit.xml'
RC=$?
set -e

echo "🧹 Nettoyage…"
$COMPOSE down -v

exit $RC

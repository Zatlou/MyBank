#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] || { echo "❌ deploy/.env manquant (copie .env.example)"; exit 1; }
set -a; source .env; set +a
COMPOSE="docker compose --env-file .env -f docker-compose.prod.yml"

echo "🛠️ Build/Pull…"
if [ "${USE_REMOTE_IMAGES:-false}" = "true" ]; then $COMPOSE pull || true; else $COMPOSE build; fi

echo "🚀 Up…"; $COMPOSE up -d

# migrations Symfony si bin/console existe
if $COMPOSE exec -T api bash -lc 'test -f bin/console'; then
  $COMPOSE exec -T api bash -lc 'php bin/console doctrine:migrations:migrate --no-interaction || true'
fi

echo "✅ Déploiement OK"; $COMPOSE ps

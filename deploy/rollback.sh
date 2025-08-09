#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
[ -f .env ] || { echo "❌ deploy/.env manquant"; exit 1; }
set -a; source .env; set +a
COMPOSE="docker compose --env-file .env -f docker-compose.prod.yml"

echo "⏪ Rollback…"
if [ "${USE_REMOTE_IMAGES:-false}" = "true" ]; then
  export FRONT_IMAGE_TAG="${FRONT_IMAGE_TAG:-prev}"
  export API_IMAGE_TAG="${API_IMAGE_TAG:-prev}"
  $COMPOSE pull || true
fi
$COMPOSE up -d
echo "✅ Rollback OK"; $COMPOSE ps

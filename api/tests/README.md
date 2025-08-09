# Tests d’intégration – MyBank

## Environnement de test

-   `deploy/docker-compose.test.yml` démarre `db-test` (Postgres 16) et `api-test` (Symfony en APP_ENV=test).
-   Base de données éphémère via tmpfs.

## Exécution

```bash
bash scripts/run-integration-tests.sh
```

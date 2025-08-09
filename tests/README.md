# Tests d’intégration – MyBank

## Environnement de test

L’environnement de test est isolé via Docker Compose :

- `db-test` : PostgreSQL 16 (tmpfs, éphémère)
- `api-test` : Symfony en `APP_ENV=test`, connecté à `db-test`

Fichier: `deploy/docker-compose.test.yml`

## Exécution (local / CI)

```bash
# depuis la racine du repo
bash scripts/run-integration-tests.sh
```

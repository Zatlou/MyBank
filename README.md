# 🏦 myBank

Application de gestion de dépenses personnelles  
React 18 • Symfony 6 • Postgres 16 • Docker • CI/CD GitHub Actions

---

## 🔗 Démo

Accédez à l’application en production :  
http://89.168.54.172

---
## 🔐 Identifiants par défaut

Pour te connecter à l’application, utilise l’utilisateur créé par les fixtures :

- **Email :** `test@example.com`  
- **Mot de passe :** `password`

Ces identifiants sont valides en local et en production (fixtures chargées via `AppFixtures`).  

## 🛠️ Stack technique

| Composant      | Technologie          |
| -------------- | -------------------- |
| Frontend       | React 18, TailwindCSS |
| Backend        | Symfony 6, API Platform, Doctrine ORM |
| Base de données | PostgreSQL 16        |
| Conteneurisation | Docker (multi-stage) |
| CI/CD          | GitHub Actions + Docker Hub |

---

## 🚀 Installation locale

Cloner le dépôt, puis lancer les services en local :

```bash
git clone https://github.com/ton-compte/MyBank.git
cd MyBank

# Démarrer le back et le front via Docker Compose
docker compose up -d

# Tests
docker compose exec api vendor/bin/phpunit
docker compose exec front npm test

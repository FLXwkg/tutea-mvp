# TUTÉA MVP

Application web de gestion de tutelle permettant aux tuteurs de gérer et accompagner leurs tutellés au quotidien.

## Technologies

- Next.js 16 (React 19) + TypeScript
- PostgreSQL (Supabase) + Prisma ORM
- Tailwind CSS + shadcn/ui
- Monitoring : Grafana Cloud (Loki + Prometheus)
- CI/CD : GitHub Actions + Docker

## Prérequis

- Node.js v18+
- npm v9+
- Docker v20+ (pour déploiement)
- PostgreSQL v14+ ou compte Supabase

## Installation

### 1. Cloner et installer

```
git clone https://github.com/votre-org/tutea-mvp.git
cd tutea-mvp
npm install
```

### 2. Configuration

Créez un fichier .env.local à la racine :

```
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
DATABASE_URL=postgresql://user:password@localhost:5432/tutea
DIRECT_URL=postgresql://user:password@localhost:5432/tutea

# Production uniquement
LOKI_HOST=https://logs-prod-XXX.grafana.net/loki/api/v1/push
LOKI_USERNAME=123456
LOKI_API_KEY=glc_your_token
```

### 3. Base de données

```
npx prisma generate
npx prisma migrate dev
```

## Lancement

### Développement

```
npm run dev
```

### Production locale

```
npm run build
npm start
```

## Documentation technique

### Comment lancer le projet en local

Suivez les étapes Installation puis lancez npm run dev. L'application sera sur http://localhost:3000.

Pour tester avec des données :
1. Créez un compte tuteur via /signup
2. Notez le code tuteur affiché dans /account
3. Créez un compte tutellé avec ce code

### Architecture

**Choix de Next.js App Router** : Server Components pour meilleures performances, API Routes intégrées, optimisations automatiques.

**Choix de Prisma** : Type-safety automatique, migrations faciles, meilleure DX.

**Choix de Supabase** : PostgreSQL managed, Auth intégrée (JWT), Row Level Security.

**Choix de Docker** : Reproductibilité dev/prod, isolation, scalabilité.

**Structure clé** :
- src/app : Pages et API routes
- src/components : Composants réutilisables
- src/lib : Utils et config (logger, supabase)
- prisma/schema.prisma : Schéma BDD

### Procédure de Rollback

En cas de problème après déploiement :

**1. Identifier la version stable**

```
docker images ghcr.io/votre-org/tutea-mvp
```

**2. Rollback Docker**

```
docker-compose down
# Modifier docker-compose.yml avec l'ancienne image
docker-compose up -d
```

**3. Rollback BDD (si nécessaire)**

```
npx prisma migrate resolve --rolled-back migration_name
npx prisma migrate deploy
```

**4. Vérification**

```
docker logs -f tutea-mvp
curl http://localhost:3000
```

## Déploiement

### Docker

```
docker build -t tutea-mvp .
docker run -p 3000:3000 -e NEXT_PUBLIC_SUPABASE_URL=... tutea-mvp
```

### docker-compose

```
docker-compose up -d
docker-compose down
docker-compose logs -f
```

La pipeline GitHub Actions déploie automatiquement sur push vers main.

## Monitoring

Logs et métriques disponibles sur Grafana Cloud :
- Logs applicatifs (Loki) : erreurs, auth, actions
- Métriques système (Prometheus) : CPU, RAM, Disk

Accès logs locaux :

```
docker logs tutea-mvp
docker logs -f tutea-mvp
docker logs tutea-mvp 2>&1 | grep -i error
```

## Tests

```
npm test
npm run lint
```
## Schema du CI
```
┌──────────────┐
│  Developer   │
│  git push    │
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────────────────┐
│           GitHub Repository (main)              │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
       ┌───────────────────────┐
       │  GitHub Actions       │
       │  Triggers             │
       └───────────┬───────────┘
                   │
       ┌───────────┴───────────┐
       │                       │
       ▼                       ▼
┌──────────────┐      ┌──────────────┐
│   Test Job   │      │  Build Job   │
│              │      │              │
│ • Lint       │──✓──▶│ • Docker     │
│ • SonarQube  │      │   Build      │
│              │      │ • Push GHCR  │
└──────────────┘      └──────┬───────┘
                             │
                             ▼
                   ┌─────────────────┐
                   │ GHCR Registry   │
                   │ (Image stored)  │
                   └────────┬────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │   VPS Server    │
                   │                 │
                   │ • Pull image    │
                   │ • Restart       │
                   │ • Health check  │
                   └────────┬────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │  Grafana Cloud  │
                   │  (Monitoring)   │
                   └─────────────────┘
```

## Contribution

1. Fork le projet
2. Créer une branche feature/MaFeature
3. Commit avec Gitmoji
4. Push et ouvrir une Pull Request

## Support

Issues : [PLACEHOLDER_14](https://github.com/votre-org/tutea-mvp/issues)

## License

MIT
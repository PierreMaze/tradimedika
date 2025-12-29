# Docker + n8n Setup

## Prérequis

- Docker Desktop 4.55.0 (ou version compatible)
- Docker Compose >= 2.30.0 (inclus dans Docker Desktop)

## Installation

1. Configurer les variables d'environnement :

   ```bash
   cp docker/.env.example docker/.env
   nano docker/.env  # Modifier N8N_PASSWORD et API keys
   ```

2. Démarrer n8n :

   ```bash
   pnpm docker:up
   # ou
   cd docker && docker-compose up -d
   ```

3. Accéder à l'interface n8n :
   - URL : http://localhost:5678
   - Login : admin (ou valeur N8N_USER)
   - Password : Valeur de N8N_PASSWORD dans .env

## Commandes utiles

```bash
# Démarrer
pnpm docker:up

# Arrêter
pnpm docker:down

# Voir les logs
pnpm docker:logs

# Redémarrer
pnpm docker:restart
```

## Volumes

- **n8n_data** : Données n8n (workflows, credentials, executions)
- **./n8n/exports** : Exports JSON depuis n8n (monté en local)
- **../src/data** : Accès lecture seule à db.json (pour vérification doublons)

## Backup

```bash
# Backup du volume n8n_data
docker run --rm -v tradimedika_n8n_data:/data -v $(pwd)/backup:/backup alpine tar czf /backup/n8n-backup-$(date +%Y%m%d).tar.gz /data
```

## Troubleshooting

### Port 5678 déjà utilisé

Modifier le port dans `docker-compose.yml` : `- "5679:5678"`

### Credentials perdues

Vérifier le volume n8n_data : `docker volume inspect tradimedika_n8n_data`

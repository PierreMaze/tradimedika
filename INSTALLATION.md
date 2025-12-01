# 🚀 Installation

## Prérequis

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (recommandé) ou npm

### 1. Cloner le repository

```bash
git clone https://github.com/PierreMaze/tradimedika.git
cd tradimedika
```

### 2. Installer les dépendances

```bash
# Avec pnpm (recommandé)
pnpm install

# Ou avec npm
npm install
```

### 3. Lancer le serveur de développement

```bash
# Avec pnpm
pnpm dev

# Ou avec npm
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

### 4. Build de production

```bash
# Avec pnpm
pnpm build

# Ou avec npm
npm run build
```

---

## 📚 Scripts disponibles

```bash
# Développement
pnpm dev              # Lance le serveur de développement
pnpm build            # Build de production
pnpm preview          # Prévisualise le build

# Qualité du code
pnpm lint             # Vérification ESLint
pnpm fix              # Correction automatique Prettier

# Maintenance
pnpm clean            # Nettoyage des dépendances uniquement
pnpm reset            # Redémarrage du serveur de développement avec suppression + ré-installation des dépendances
pnpm preload          # Installation + démarrage rapide
```

---

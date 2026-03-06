# Architecture Technique B2B

## Situation actuelle

| Aspect      | État actuel             | Limite pour le B2B            |
| ----------- | ----------------------- | ----------------------------- |
| Framework   | React 19 + Vite         | OK, on garde                  |
| Données     | JSON statique (db.json) | Pas de mise à jour dynamique  |
| Auth        | Aucune                  | Bloquant pour le B2B          |
| Hébergement | GitHub Pages (statique) | Pas d'API, pas de BDD serveur |
| Paiement    | Aucun                   | Bloquant pour la monétisation |
| PDF         | Aucun                   | Feature clé manquante         |

## Stratégie : évolution progressive, pas de réécriture

On ne jette PAS le code existant. On **ajoute des couches** par-dessus.

---

## 1. Stack recommandé pour le B2B

### Option A — Supabase (Recommandé pour le MVP)

```
┌─────────────────────────────────────────────┐
│                FRONTEND                      │
│  React 19 + Vite (existant)                 │
│  + React Router (existant)                  │
│  + TailwindCSS v4 (existant)               │
│                                              │
│  AJOUTS :                                    │
│  + @supabase/supabase-js (auth + données)   │
│  + react-pdf ou @react-pdf/renderer (PDF)   │
│  + Stripe.js (paiement)                     │
├─────────────────────────────────────────────┤
│                BACKEND (Supabase)             │
│  PostgreSQL (BDD relationnelle)             │
│  Auth (inscription, login, RPPS)            │
│  Row Level Security (RLS)                   │
│  Storage (fichiers PDF si besoin)           │
│  Edge Functions (logique serveur)           │
├─────────────────────────────────────────────┤
│                SERVICES TIERS                │
│  Stripe (paiement abonnement)               │
│  Plausible ou PostHog (analytics)           │
│  Sentry (monitoring erreurs)                │
│  Resend ou Loops (emails transactionnels)   │
└─────────────────────────────────────────────┘
```

**Pourquoi Supabase ?**

- PostgreSQL → requêtes complexes, filtres avancés, full-text search
- Auth intégrée → inscription, login, gestion des rôles (gratuit/pro)
- Row Level Security → les pros ne voient que ce qu'ils ont le droit de voir
- Hébergement UE disponible (région Frankfurt) → conformité RGPD
- Gratuit jusqu'à 50K requêtes/mois → parfait pour le MVP
- Open source → pas de vendor lock-in

### Option B — Firebase (Alternative)

| Aspect             | Supabase                       | Firebase           |
| ------------------ | ------------------------------ | ------------------ |
| BDD                | PostgreSQL (relationnel)       | Firestore (NoSQL)  |
| Auth               | Oui (email, OAuth, magic link) | Oui (très complet) |
| Hébergement UE     | Oui (Frankfurt)                | Oui (europe-west)  |
| Prix MVP           | Gratuit                        | Gratuit            |
| Requêtes complexes | Excellent (SQL)                | Limité (NoSQL)     |
| Full-text search   | Natif PostgreSQL               | Nécessite Algolia  |
| Open source        | Oui                            | Non                |
| Vendor lock-in     | Faible                         | Élevé (Google)     |

**Verdict** : Supabase est meilleur pour un catalogue de produits avec filtres avancés (SQL >> NoSQL pour ce cas).

### Option C — Full serverless (Vercel + Planetscale)

- Plus complexe, plus de services à gérer
- Adapté si on veut des API Routes Next.js
- Pas nécessaire pour le MVP

---

## 2. Base de données — Schéma PostgreSQL

### Migration : JSON statique → PostgreSQL

```sql
-- Table principale des produits
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  latin_name TEXT,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL, -- 'plante', 'aliment', 'epice', 'he', 'superaliment'
  subcategory TEXT,
  family TEXT,
  part_used TEXT[], -- array : ['rhizome', 'feuille']
  forms TEXT[], -- ['frais', 'poudre', 'tisane', 'gélule']
  properties TEXT[], -- ['digestif', 'antioxydant', 'anti-inflammatoire']
  evidence_level CHAR(1) CHECK (evidence_level IN ('A', 'B', 'C')),
  active_compounds TEXT[],

  -- Sécurité
  pregnancy_safe TEXT CHECK (pregnancy_safe IN ('ok', 'variant', 'interdit')),
  pregnancy_detail TEXT,
  breastfeeding TEXT,
  children_age INTEGER, -- NULL = tous âges, N = âge minimum
  allergens TEXT[],
  contraindications TEXT[],
  side_effects TEXT[],
  verified_by_professional BOOLEAN DEFAULT false,

  -- Réglementaire
  list_148 BOOLEAN DEFAULT false,
  list_540 BOOLEAN DEFAULT false,
  efsa_claims_status TEXT CHECK (efsa_claims_status IN ('autorisee', 'en_attente', 'rejetee', 'non_applicable')),

  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- PRO ONLY (visible uniquement pour abonnés)
  dosage JSONB, -- posologie détaillée par forme
  sources JSONB, -- { ema, pubmed, pharmacopee }
  last_updated DATE
);

-- Interactions médicamenteuses (PRO ONLY)
CREATE TABLE interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  drug_name TEXT NOT NULL,
  drug_class TEXT,
  risk_level TEXT CHECK (risk_level IN ('majeur', 'modere', 'mineur')),
  detail TEXT,
  source TEXT -- PMID ou référence
);

-- Utilisateurs (pros)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  full_name TEXT,
  profession TEXT, -- 'medecin', 'pharmacien', 'nutritionniste', 'kine', 'dieteticien'
  rpps_number TEXT, -- numéro professionnel (optionnel pour vérification)
  subscription_plan TEXT DEFAULT 'free', -- 'free', 'pro_solo', 'pro_cabinet', 'pro_officine'
  subscription_status TEXT DEFAULT 'active',
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Favoris
CREATE TABLE favorites (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, product_id)
);

-- Historique des exports PDF
CREATE TABLE pdf_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  product_ids UUID[], -- produits inclus dans le PDF
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_properties ON products USING GIN(properties);
CREATE INDEX idx_products_pregnancy ON products(pregnancy_safe);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_interactions_product ON interactions(product_id);
```

### Row Level Security (RLS)

```sql
-- Tout le monde peut voir les infos basiques
CREATE POLICY "Public read basic" ON products
  FOR SELECT USING (true);

-- Seuls les pros abonnés voient les données détaillées
-- (géré côté application : on ne renvoie pas dosage/sources/interactions aux non-abonnés)

-- Les favoris sont privés
CREATE POLICY "Users see own favorites" ON favorites
  FOR ALL USING (auth.uid() = user_id);

-- L'historique PDF est privé
CREATE POLICY "Users see own exports" ON pdf_exports
  FOR ALL USING (auth.uid() = user_id);
```

---

## 3. Authentification

### Flow d'inscription pro

```
1. Le pro s'inscrit avec email + mot de passe
2. Vérification email (Supabase Auth)
3. Le pro complète son profil : nom, profession, n° RPPS (optionnel)
4. Compte créé en plan "free"
5. Le pro peut upgrader vers "pro" (Stripe Checkout)
```

### Vérification RPPS (optionnel au MVP)

- Le n° RPPS est un identifiant unique pour les pros de santé en France
- Au MVP : champ optionnel (déclaratif)
- Plus tard : vérification automatique via l'annuaire RPPS (API publique)
- Objectif : pas obligatoire pour s'inscrire, mais nécessaire pour la badge "vérifié"

---

## 4. Génération de PDF

### Option recommandée : @react-pdf/renderer (côté client)

```
Avantages :
✅ Côté client → pas de serveur nécessaire
✅ React natif → même stack
✅ Rendu haute qualité
✅ Pas de coût serveur

Inconvénients :
❌ Peut être lent sur mobile pour des gros PDF
❌ Styles limités vs HTML/CSS
```

### Alternative : jsPDF + html2canvas

```
Avantages :
✅ Très léger
✅ Peut "screenshoter" du HTML existant

Inconvénients :
❌ Qualité de rendu moyenne
❌ Pas adapté aux mises en page complexes
```

### Recommandation

- **MVP** : @react-pdf/renderer (côté client, pas de serveur)
- **Scale** : API serverless (Supabase Edge Function + Puppeteer) si besoin de PDF côté serveur

---

## 5. Paiement — Stripe

### Setup

```
Stripe Checkout → page de paiement hébergée par Stripe
Stripe Customer Portal → gestion de l'abonnement par le client
Webhooks → Supabase Edge Function écoute les événements Stripe
```

### Flux d'abonnement

```
1. Le pro clique "Passer en Pro"
2. Redirection vers Stripe Checkout (page de paiement)
3. Le pro paie (CB, SEPA)
4. Stripe envoie un webhook → Supabase met à jour subscription_plan = 'pro_solo'
5. Le pro est redirigé vers l'app → accès complet
```

### Prix Stripe

- 1.5% + 0.25€ par transaction (tarif européen)
- Pas de frais fixes mensuels
- Customer Portal gratuit
- Gestion des abonnements récurrents intégrée

---

## 6. Hébergement

### Frontend : Vercel (Recommandé)

| Aspect  | Détail                                                            |
| ------- | ----------------------------------------------------------------- |
| Prix    | Gratuit (hobby) → 20$/mois (pro)                                  |
| CDN     | Global (rapide partout)                                           |
| HTTPS   | Automatique                                                       |
| Deploy  | Git push → déploiement auto                                       |
| Preview | Branch preview URLs                                               |
| RGPD    | Données de l'app sur Supabase (UE), Vercel sert juste le frontend |

### Backend : Supabase (Frankfurt)

| Aspect   | Détail                                                |
| -------- | ----------------------------------------------------- |
| Prix MVP | Gratuit (50K requêtes/mois, 500 Mo BDD, 1 Go storage) |
| Prix Pro | 25$/mois (8 Go BDD, 100 Go storage)                   |
| Région   | Frankfurt (UE) → RGPD OK                              |
| Backups  | Automatiques (quotidiens)                             |

### Coût total MVP

| Service               | Coût/mois              |
| --------------------- | ---------------------- |
| Vercel (frontend)     | 0€ (hobby)             |
| Supabase (backend)    | 0€ (free tier)         |
| Stripe (paiement)     | 0€ (% par transaction) |
| Domaine (.fr)         | ~1€/mois               |
| Plausible (analytics) | 0€ (self-hosted) ou 9€ |
| Sentry (erreurs)      | 0€ (free tier)         |
| **Total**             | **~1-10€/mois**        |

→ Coût quasi nul pour démarrer.

---

## 7. Migration progressive

### Étape 1 : Garder le JSON, ajouter Supabase Auth

- L'app existante continue de fonctionner avec db.json
- On ajoute Supabase Auth pour l'inscription/login
- Les données produits restent statiques (JSON)
- Le paywall est géré côté client (vérifier le plan de l'utilisateur)

### Étape 2 : Migrer les données vers PostgreSQL

- Importer db.json dans la table `products` PostgreSQL
- Basculer les requêtes de `import db from 'db.json'` vers `supabase.from('products').select()`
- Enrichir les fiches directement en BDD

### Étape 3 : Ajouter les features pro

- Export PDF
- Filtres avancés (requêtes SQL)
- Favoris et historique
- Stripe checkout

---

## 8. Ce qu'on ne fait PAS au MVP

| Feature                     | Pourquoi pas maintenant                                      |
| --------------------------- | ------------------------------------------------------------ |
| SSR (Server-Side Rendering) | Pas nécessaire pour un SaaS B2B                              |
| Next.js / Remix             | React SPA suffit, pas de migration de framework              |
| Redis / cache               | Supabase gère le cache, pas besoin d'un layer supplémentaire |
| Microservices               | Monolithe simple suffit                                      |
| Docker                      | Supabase est hébergé, pas de serveur à gérer                 |
| CI/CD complexe              | GitHub Actions existant suffit                               |
| Tests E2E                   | Utiles plus tard (Playwright), pas au MVP                    |

---

## 9. Diagramme d'architecture final

```
┌─────────────────────────────────────────────────┐
│                  UTILISATEUR                     │
│          (navigateur web / mobile)               │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│              VERCEL (CDN)                        │
│         React SPA (Vite build)                   │
│    HTML/CSS/JS statique + client-side routing    │
└──────────────────┬──────────────────────────────┘
                   │
          ┌────────┼────────┐
          │        │        │
          ▼        ▼        ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Supabase │ │  Stripe  │ │ Plausible│
│          │ │          │ │          │
│ · Auth   │ │ · Checkout│ │ · Analytics│
│ · BDD    │ │ · Portal │ │          │
│ · Storage│ │ · Webhook│ │          │
│ · Edge Fn│ │          │ │          │
│          │ │          │ │          │
│ (Frankfurt)│ │       │ │ (UE)    │
└──────────┘ └──────────┘ └──────────┘
```

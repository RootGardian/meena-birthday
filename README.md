# Structure Starter React 19 + TypeScript + Tailwind CSS

Projet complet prêt à l'emploi conçu pour **meena_faty**, suivant les meilleures pratiques de l'industrie pour les applications React modulaires, évolutives et maintenables.

---

## 📁 Architecture du Projet

```text
meena_faty/
├── public/                 # Fichiers statiques servis directement (favicon, robots.txt, etc.)
├── src/
│   ├── assets/             # Images, polices, vecteurs SVG
│   ├── components/         # Composants réutilisables
│   │   ├── ui/             # Composants d'interface atomiques (Button, Card, Input, Modal, Badge)
│   │   └── layout/         # Composants de structure (Navbar, Sidebar, Footer, Toasts)
│   ├── context/            # État global (AppContext pour le thème, utilisateur, notifications)
│   ├── hooks/              # Hooks personnalisés (useLocalStorage, useDebounce, etc.)
│   ├── layouts/            # Gabarits de mise en page réutilisables (MainLayout)
│   ├── pages/              # Vues / Écrans (HomePage, ComponentsPage, GuidePage, ExamplesPage)
│   ├── services/           # Couche API et requêtes HTTP typées (api.ts)
│   ├── types/              # Modèles et interfaces TypeScript (index.ts)
│   ├── utils/              # Fonctions utilitaires pures (cn, formatters, etc.)
│   ├── App.tsx             # Composant racine
│   ├── main.tsx            # Point d’entrée de l'application
│   └── index.css           # Configuration Tailwind CSS & styles globaux
├── index.html              # Fichier HTML principal
├── package.json            # Dépendances et scripts npm
├── tsconfig.json           # Configuration TypeScript stricte
└── vite.config.ts          # Configuration Vite & plugins Tailwind
```

---

## 🚀 Démarrage Rapide

### 1. Lancer le serveur de développement
```bash
npm run dev
```
L'application démarre immédiatement avec le rechargement à chaud (Hot Module Replacement).

### 2. Compiler pour la production
```bash
npm run build
```
Valide le typage TypeScript (`tsc -b`) et génère les fichiers minifiés dans `dist/`.

### 3. Prévisualiser le build de production
```bash
npm run preview
```

---

## 🛠️ Contenu Inclus dans la Structure

### 1. Composants UI Atomiques (`src/components/ui/`)
- **`Button.tsx`** : Bouton avec variantes (`primary`, `secondary`, `outline`, `ghost`, `danger`), tailles (`sm`, `md`, `lg`), icônes et état de chargement `isLoading`.
- **`Card.tsx`** : Carte modulaire (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
- **`Input.tsx`** : Champ de saisie avec label, icônes, texte d'aide et gestion des erreurs.
- **`Badge.tsx`** : Pastille d'état (`primary`, `success`, `warning`, `danger`, `neutral`).
- **`Modal.tsx`** : Fenêtre de dialogue accessible avec fermeture par touche Échap et backdrop.

### 2. Hooks Personnalisés (`src/hooks/`)
- **`useLocalStorage<T>`** : Synchronisation automatique d'un état React avec le stockage local du navigateur.
- **`useDebounce<T>`** : Temporisation d'une valeur (recherches, saisies instantanées).

### 3. Gestion d'État Global (`src/context/AppContext.tsx`)
- Gestion du **mode clair / sombre** (Dark Mode avec persistance).
- Système de **notifications toast** empilables.
- État de l'utilisateur connecté et contrôle de la barre latérale.

### 4. Couche Service API (`src/services/api.ts`)
- Client HTTP prêt à l'emploi (`get`, `post`, `put`, `delete`) avec typage générique `ApiResponse<T>`.

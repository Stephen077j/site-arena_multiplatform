# 🤝 Guide de contribution - ARENAH

Merci de votre intérêt pour contribuer à ARENAH ! Ce document vous guidera à travers le processus de contribution.

---

## 📋 Table des matières

1. [Code de conduite](#code-de-conduite)
2. [Comment contribuer](#comment-contribuer)
3. [Configuration de l'environnement](#configuration-de-lenvironnement)
4. [Standards de code](#standards-de-code)
5. [Processus de Pull Request](#processus-de-pull-request)
6. [Signaler des bugs](#signaler-des-bugs)
7. [Proposer des fonctionnalités](#proposer-des-fonctionnalités)

---

## 📜 Code de conduite

En participant à ce projet, vous acceptez de respecter notre code de conduite :

- Soyez respectueux et inclusif
- Acceptez les critiques constructives
- Concentrez-vous sur ce qui est le mieux pour la communauté
- Faites preuve d'empathie envers les autres membres

---

## 🚀 Comment contribuer

Il existe plusieurs façons de contribuer à ARENAH :

### 1. Signaler des bugs
Trouvé un bug ? [Ouvrez une issue](https://github.com/votre-repo/issues/new?template=bug_report.md)

### 2. Proposer des fonctionnalités
Une idée d'amélioration ? [Ouvrez une issue](https://github.com/votre-repo/issues/new?template=feature_request.md)

### 3. Améliorer la documentation
La documentation peut toujours être améliorée !

### 4. Contribuer au code
Suivez le processus décrit ci-dessous.

---

## 🛠️ Configuration de l'environnement

### Prérequis

- Node.js 18+ et npm (ou bun)
- Git
- Compte Supabase (gratuit)
- Un éditeur de code (VS Code recommandé)

### Installation

```bash
# 1. Fork le projet sur GitHub

# 2. Cloner votre fork
git clone https://github.com/votre-username/arenah.git
cd arenah

# 3. Ajouter le repo original comme remote
git remote add upstream https://github.com/original-repo/arenah.git

# 4. Installer les dépendances
npm install

# 5. Créer le fichier .env.local
cp .env.local.example .env.local
# Éditer .env.local avec vos clés Supabase

# 6. Lancer le serveur de dev
npm run dev
```

### Extensions VS Code recommandées

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

---

## 📝 Standards de code

### TypeScript

- Utiliser TypeScript pour tous les nouveaux fichiers
- Typer explicitement les props et les retours de fonction
- Éviter `any`, préférer `unknown` si nécessaire

```typescript
// ✅ Bon
interface UserProps {
  name: string;
  email: string;
}

const User = ({ name, email }: UserProps): JSX.Element => {
  return <div>{name}</div>;
};

// ❌ Mauvais
const User = ({ name, email }: any) => {
  return <div>{name}</div>;
};
```

### React

- Utiliser des composants fonctionnels avec hooks
- Préférer les named exports aux default exports
- Utiliser des noms de composants en PascalCase

```typescript
// ✅ Bon
export const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  return <div>...</div>;
};

// ❌ Mauvais
export default function userProfile() {
  const [user, setUser] = useState(null);
  return <div>...</div>;
}
```

### Styling

- Utiliser Tailwind CSS pour le styling
- Préférer les classes utilitaires aux styles personnalisés
- Utiliser les composants shadcn/ui quand possible

```typescript
// ✅ Bon
<button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
  Cliquer
</button>

// ❌ Mauvais
<button style={{ padding: '8px 16px', backgroundColor: 'blue' }}>
  Cliquer
</button>
```

### Nommage

- **Fichiers** : PascalCase pour les composants (`UserProfile.tsx`)
- **Variables** : camelCase (`userName`, `isLoading`)
- **Constantes** : UPPER_SNAKE_CASE (`API_URL`, `MAX_RETRIES`)
- **Types/Interfaces** : PascalCase (`User`, `AuthState`)

### Structure des fichiers

```typescript
// 1. Imports externes
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Imports internes
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

// 3. Types/Interfaces
interface UserProfileProps {
  userId: string;
}

// 4. Composant
export const UserProfile = ({ userId }: UserProfileProps) => {
  // Hooks
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // State
  const [loading, setLoading] = useState(false);
  
  // Effects
  useEffect(() => {
    // ...
  }, [userId]);
  
  // Handlers
  const handleClick = () => {
    // ...
  };
  
  // Render
  return (
    <div>...</div>
  );
};
```

### Commentaires

- Commenter le "pourquoi", pas le "quoi"
- Utiliser JSDoc pour les fonctions publiques
- Éviter les commentaires évidents

```typescript
// ✅ Bon
/**
 * Calcule le prix total avec les taxes et les réductions
 * @param price - Prix de base
 * @param taxRate - Taux de taxe (0-1)
 * @param discount - Réduction en pourcentage (0-100)
 */
const calculateTotal = (price: number, taxRate: number, discount: number): number => {
  // Appliquer la réduction avant les taxes pour respecter la législation
  const discountedPrice = price * (1 - discount / 100);
  return discountedPrice * (1 + taxRate);
};

// ❌ Mauvais
// Cette fonction calcule le total
const calculateTotal = (price, taxRate, discount) => {
  // Multiplier le prix par 1 moins le discount divisé par 100
  const discountedPrice = price * (1 - discount / 100);
  // Retourner le prix avec les taxes
  return discountedPrice * (1 + taxRate);
};
```

---

## 🔄 Processus de Pull Request

### 1. Créer une branche

```bash
# Mettre à jour votre fork
git checkout main
git pull upstream main

# Créer une nouvelle branche
git checkout -b feature/ma-fonctionnalite
# ou
git checkout -b fix/mon-bug
```

### 2. Faire vos modifications

- Suivre les standards de code
- Écrire des commits clairs et descriptifs
- Tester vos modifications

### 3. Commits

Utiliser le format [Conventional Commits](https://www.conventionalcommits.org/) :

```bash
# Fonctionnalité
git commit -m "feat: ajouter la récupération de mot de passe"

# Correction de bug
git commit -m "fix: corriger l'erreur de validation email"

# Documentation
git commit -m "docs: mettre à jour le README"

# Style (formatage, etc.)
git commit -m "style: formater le code avec Prettier"

# Refactoring
git commit -m "refactor: simplifier la logique d'authentification"

# Tests
git commit -m "test: ajouter des tests pour le panier"

# Performance
git commit -m "perf: optimiser le chargement des images"
```

### 4. Pousser vos modifications

```bash
git push origin feature/ma-fonctionnalite
```

### 5. Créer une Pull Request

1. Aller sur GitHub
2. Cliquer sur "New Pull Request"
3. Sélectionner votre branche
4. Remplir le template de PR :
   - Description claire des changements
   - Référence aux issues liées
   - Screenshots si applicable
   - Checklist complétée

### 6. Review

- Répondre aux commentaires de review
- Faire les modifications demandées
- Pousser les nouvelles modifications

### 7. Merge

Une fois approuvée, votre PR sera mergée par un mainteneur.

---

## 🐛 Signaler des bugs

### Avant de signaler

1. Vérifier que le bug n'a pas déjà été signalé
2. Vérifier que vous utilisez la dernière version
3. Essayer de reproduire le bug

### Template de bug report

```markdown
**Description du bug**
Une description claire et concise du bug.

**Pour reproduire**
Étapes pour reproduire le comportement :
1. Aller sur '...'
2. Cliquer sur '...'
3. Scroller jusqu'à '...'
4. Voir l'erreur

**Comportement attendu**
Une description claire de ce qui devrait se passer.

**Screenshots**
Si applicable, ajouter des screenshots.

**Environnement**
- OS: [ex. Windows 11]
- Navigateur: [ex. Chrome 120]
- Version: [ex. 1.0.0]

**Contexte additionnel**
Tout autre contexte utile.
```

---

## 💡 Proposer des fonctionnalités

### Avant de proposer

1. Vérifier que la fonctionnalité n'a pas déjà été proposée
2. Vérifier qu'elle correspond à la vision du projet
3. Réfléchir à l'implémentation

### Template de feature request

```markdown
**Problème à résoudre**
Une description claire du problème que cette fonctionnalité résoudrait.

**Solution proposée**
Une description claire de ce que vous voulez qu'il se passe.

**Alternatives considérées**
Une description des solutions alternatives que vous avez considérées.

**Contexte additionnel**
Tout autre contexte ou screenshots.
```

---

## ✅ Checklist avant de soumettre

- [ ] Le code compile sans erreur
- [ ] Les tests passent (si applicable)
- [ ] Le code suit les standards du projet
- [ ] La documentation est à jour
- [ ] Les commits suivent le format Conventional Commits
- [ ] La PR a une description claire
- [ ] Les screenshots sont inclus (si applicable)

---

## 📚 Ressources

### Documentation
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Supabase](https://supabase.com/docs)

### Guides du projet
- [README](README.md)
- [Liste des fonctionnalités](LISTE_FONCTIONNALITES.md)
- [Résumé final](RESUME_FINAL.md)

---

## 🙏 Remerciements

Merci de contribuer à ARENAH ! Chaque contribution, petite ou grande, est appréciée.

---

## 📞 Questions ?

Si vous avez des questions, n'hésitez pas à :
- Ouvrir une [discussion](https://github.com/votre-repo/discussions)
- Rejoindre notre [Discord](https://discord.gg/votre-serveur)
- Envoyer un email à support@arenah.com

---

**Fait avec ❤️ par la communauté ARENAH**

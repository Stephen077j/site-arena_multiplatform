# 🚀 INTÉGRATION SUPABASE - AUTHENTIFICATION CLIENT

**Date:** 17 Mai 2026  
**Statut:** ✅ Implémenté et prêt à tester

---

## 📋 Ce qui a été fait

### 1. ✅ Création du système d'authentification client

**Fichiers créés:**
- `src/client/lib/supabase.ts` - Client Supabase configuré
- `src/client/lib/clientAuth.tsx` - Context d'authentification client

**Fonctionnalités:**
- ✅ Inscription (signUp)
- ✅ Connexion (signIn)
- ✅ Déconnexion (signOut)
- ✅ Persistance de session
- ✅ Chargement du profil utilisateur
- ✅ Création automatique du panier à l'inscription

---

### 2. ✅ Mise à jour de l'interface

**Fichiers modifiés:**
- `src/App.tsx` - Ajout du ClientAuthProvider
- `src/client/components/ClientHeader.tsx` - Affichage utilisateur connecté
- `src/client/components/AuthDialog.tsx` - Intégration Supabase

**Nouvelles fonctionnalités UI:**
- ✅ Avatar utilisateur avec initiales
- ✅ Menu dropdown avec profil
- ✅ Bouton déconnexion
- ✅ Affichage conditionnel (connecté/non connecté)
- ✅ Menu mobile avec infos utilisateur

---

### 3. ✅ Configuration Supabase

**Fichier modifié:**
- `.env.local` - URL et clé API corrigées

**Configuration:**
```env
VITE_SUPABASE_URL=https://teebtmzfguqrxqoykuol.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🎯 Comment ça fonctionne

### Inscription d'un nouveau client

```typescript
// 1. L'utilisateur remplit le formulaire
// 2. AuthDialog appelle signUp()
const result = await signUp(email, password, fullname, phone);

// 3. clientAuth.tsx crée:
//    - Un compte Supabase Auth
//    - Un profil dans la table users
//    - Un panier vide dans la table carts

// 4. L'utilisateur reçoit un email de confirmation
```

### Connexion

```typescript
// 1. L'utilisateur entre email/password
// 2. AuthDialog appelle signIn()
const result = await signIn(email, password);

// 3. clientAuth.tsx:
//    - Authentifie avec Supabase Auth
//    - Charge le profil depuis la table users
//    - Met à jour le state global

// 4. Le header affiche l'avatar et le menu
```

### Déconnexion

```typescript
// 1. L'utilisateur clique sur "Déconnexion"
// 2. ClientHeader appelle signOut()
await signOut();

// 3. clientAuth.tsx:
//    - Déconnecte de Supabase Auth
//    - Efface le state local
//    - Affiche une notification
```

---

## 📊 Structure des données

### Table `users`
```sql
create table users (
    id uuid primary key,              -- ID Supabase Auth
    fullname text not null,           -- Nom complet
    email text unique not null,       -- Email
    phone text,                       -- Téléphone
    role text default 'client',       -- Rôle (client)
    avatar_url text,                  -- URL avatar
    created_at timestamptz default now()
);
```

### Table `carts`
```sql
create table carts (
    id uuid primary key,
    user_id uuid references users(id),
    created_at timestamptz default now()
);
```

---

## 🔒 Sécurité

### Row Level Security (RLS)

**⚠️ IMPORTANT:** Vous devez activer RLS sur Supabase Dashboard

```sql
-- Activer RLS sur la table users
alter table users enable row level security;

-- Politique: Les utilisateurs peuvent lire leur propre profil
create policy "Users can read own profile"
on users for select
using (auth.uid() = id);

-- Politique: Les utilisateurs peuvent mettre à jour leur propre profil
create policy "Users can update own profile"
on users for update
using (auth.uid() = id);

-- Politique: Permettre l'insertion lors de l'inscription
create policy "Users can insert own profile"
on users for insert
with check (auth.uid() = id);
```

```sql
-- Activer RLS sur la table carts
alter table carts enable row level security;

-- Politique: Les utilisateurs peuvent voir leur propre panier
create policy "Users can read own cart"
on carts for select
using (auth.uid() = user_id);

-- Politique: Les utilisateurs peuvent créer leur panier
create policy "Users can create own cart"
on carts for insert
with check (auth.uid() = user_id);
```

---

## 🧪 Tests à effectuer

### 1. Test d'inscription
- [ ] Ouvrir la modal de connexion
- [ ] Aller sur l'onglet "Inscription"
- [ ] Remplir tous les champs
- [ ] Cliquer sur "Créer mon compte"
- [ ] Vérifier la notification de succès
- [ ] Vérifier l'email de confirmation
- [ ] Vérifier que l'utilisateur apparaît dans Supabase Dashboard

### 2. Test de connexion
- [ ] Ouvrir la modal de connexion
- [ ] Entrer email et mot de passe
- [ ] Cliquer sur "Se connecter"
- [ ] Vérifier que l'avatar apparaît dans le header
- [ ] Vérifier que le nom s'affiche dans le menu dropdown

### 3. Test de déconnexion
- [ ] Cliquer sur l'avatar
- [ ] Cliquer sur "Déconnexion"
- [ ] Vérifier que le bouton "Connexion" réapparaît
- [ ] Vérifier la notification de déconnexion

### 4. Test de persistance
- [ ] Se connecter
- [ ] Rafraîchir la page (F5)
- [ ] Vérifier que l'utilisateur reste connecté

---

## 🐛 Dépannage

### Erreur: "Invalid API key"
**Solution:** Vérifier que `VITE_SUPABASE_ANON_KEY` est correct dans `.env.local`

### Erreur: "Failed to fetch"
**Solution:** Vérifier que `VITE_SUPABASE_URL` ne contient pas `/rest/v1/`

### Erreur: "Row Level Security policy violation"
**Solution:** Activer les politiques RLS (voir section Sécurité)

### L'utilisateur n'apparaît pas après inscription
**Solution:** 
1. Vérifier que la table `users` existe
2. Vérifier que l'email de confirmation a été envoyé
3. Confirmer l'email si nécessaire

### Le panier n'est pas créé
**Solution:** Vérifier que la table `carts` existe et que les politiques RLS sont configurées

---

## 📦 Dépendances requises

```bash
npm install @supabase/supabase-js
```

**Statut:** ⚠️ À installer (commande annulée)

---

## 🎨 Composants UI utilisés

- ✅ `Dialog` - Modal de connexion/inscription
- ✅ `Tabs` - Onglets Connexion/Inscription
- ✅ `Input` - Champs de formulaire
- ✅ `Button` - Boutons d'action
- ✅ `Avatar` - Avatar utilisateur
- ✅ `DropdownMenu` - Menu utilisateur
- ✅ `Toast` - Notifications

---

## 🚀 Prochaines étapes

### Priorité HAUTE
1. **Installer @supabase/supabase-js**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Configurer RLS sur Supabase**
   - Aller sur Supabase Dashboard
   - Activer RLS sur les tables `users` et `carts`
   - Créer les politiques (voir section Sécurité)

3. **Tester l'inscription et la connexion**
   - Créer un compte test
   - Vérifier l'email de confirmation
   - Se connecter et vérifier l'affichage

### Priorité MOYENNE
4. **Ajouter la récupération de mot de passe**
   ```typescript
   const resetPassword = async (email: string) => {
     await supabase.auth.resetPasswordForEmail(email);
   };
   ```

5. **Ajouter la page de profil utilisateur**
   - Modifier nom, téléphone, avatar
   - Changer le mot de passe
   - Voir l'historique des commandes

6. **Protéger les routes**
   - Rediriger vers login si non connecté
   - Afficher un message si accès refusé

### Priorité BASSE
7. **OAuth (Google, Facebook)**
   ```typescript
   await supabase.auth.signInWithOAuth({
     provider: 'google'
   });
   ```

8. **Vérification email obligatoire**
   - Bloquer l'accès tant que l'email n'est pas vérifié
   - Renvoyer l'email de confirmation

---

## 📝 Notes importantes

### Différences avec l'ancien système Admin

| Aspect | Admin (ancien) | Client (nouveau) |
|--------|----------------|------------------|
| **Stockage** | localStorage | Supabase Auth + DB |
| **Persistance** | Locale seulement | Cloud (multi-device) |
| **Sécurité** | Mots de passe en clair | Hashés par Supabase |
| **Rôles** | super_admin, admin_module, caissier | client |
| **Tables** | Aucune (localStorage) | users, carts, orders, etc. |
| **Email** | Non | Oui (confirmation) |
| **Multi-device** | Non | Oui |

### Pourquoi 2 systèmes séparés ?

1. **Séparation des responsabilités**
   - Admin = Gestion interne (Back Office)
   - Client = Self-service (Front Office)

2. **Sécurité**
   - Les clients ne doivent pas accéder aux fonctions admin
   - Les admins ne doivent pas utiliser le système client

3. **Évolutivité**
   - Chaque système peut évoluer indépendamment
   - Possibilité d'ajouter des fonctionnalités spécifiques

---

## ✅ Checklist finale

Avant de considérer l'intégration terminée:

- [ ] `@supabase/supabase-js` installé
- [ ] `.env.local` configuré correctement
- [ ] Tables Supabase créées (users, carts, etc.)
- [ ] RLS activé et politiques configurées
- [ ] Test d'inscription réussi
- [ ] Test de connexion réussi
- [ ] Test de déconnexion réussi
- [ ] Test de persistance réussi
- [ ] Email de confirmation reçu
- [ ] Avatar s'affiche correctement
- [ ] Menu dropdown fonctionne
- [ ] Version mobile testée

---

**Dernière mise à jour:** 17 Mai 2026  
**Statut:** ✅ Code implémenté, en attente de tests

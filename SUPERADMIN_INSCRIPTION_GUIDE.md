# 🔐 Inscription Super Admin - Guide

## ✅ Qu'est-ce qui a été créé?

Une page d'inscription sécurisée pour les administrateurs super.

### 📍 Accès:
- **URL de connexion**: `/super-admin/login`
- **URL d'inscription**: `/super-admin/register`

---

## 🚀 Comment utiliser

### 1. **Première inscription (développement)**
La clé d'invitation par défaut en développement est:
```
admin-dev-key-2026
```

**Étapes:**
1. Allez à `http://localhost:5173/super-admin/register`
2. Entrez vos informations:
   - **Nom complet**: Votre nom
   - **Email**: Votre adresse email
   - **Mot de passe**: Minimum 8 caractères
   - **Clé d'invitation**: `admin-dev-key-2026`
3. Cliquez sur "Créer compte Super Admin"
4. Allez ensuite sur `/super-admin/login` et connectez-vous

### 2. **Connexion**
1. Allez à `/super-admin/login`
2. Entrez votre email et mot de passe
3. Vous serez redirigé vers le dashboard admin

---

## 🔑 Configurer la clé d'invitation

### En développement:
Ajouter une variable d'environnement `.env.local`:
```env
VITE_ADMIN_INVITE_KEY=votre-clé-secrète-ici
```

### En production:
**Important**: Changez absolument la clé par défaut!

1. Définissez une variable d'environnement sécurisée:
   ```env
   VITE_ADMIN_INVITE_KEY=clé-ultra-secrète-très-longue-et-sécurisée
   ```

2. **Bonnes pratiques**:
   - Utilisez une chaîne longue et complexe
   - Changez-la périodiquement
   - Ne la partagez qu'avec les personnes autorisées
   - Ne la mettez jamais en dur dans le code (sauf en dev)

---

## 🛡️ Sécurité

✅ **Actuellement protégé par:**
- Clé d'invitation requise
- Mot de passe minimum 8 caractères
- Vérification de la table `user_roles`
- Rôle `super_admin` assigné automatiquement

⚠️ **À améliorer en production:**
- [ ] Ajouter un système d'invitation par email
- [ ] Implémenter une limite de tentatives (rate limiting)
- [ ] Ajouter la vérification d'email
- [ ] Ajouter l'authentification 2FA
- [ ] Logger toutes les tentatives d'inscription

---

## 📊 Flux d'inscription

```
Utilisateur remplite le formulaire
         ↓
Validation des champs (email, mdp, clé)
         ↓
Vérification clé d'invitation
         ↓
Création du compte Supabase.auth
         ↓
Assignation du rôle super_admin en BD
         ↓
Redirection vers /super-admin/login
         ↓
Connexion et accès au dashboard
```

---

## 🧪 Test rapide

**Email test**: `admin@test.com`
**Mot de passe**: `TestPassword123`
**Clé d'invitation**: `admin-dev-key-2026`

---

## 📌 Notes importantes

- L'inscrit doit avoir la clé d'invitation correcte (sinon: ❌ "Clé d'invitation invalide")
- Le mot de passe doit faire minimum 8 caractères
- Un utilisateur ne peut s'inscrire qu'une seule fois avec le même email
- Après inscription, le rôle `super_admin` est automatiquement assigné
- Le compte n'est accessible que depuis `/super-admin` (pas depuis le client)

---

## 🔗 Routes associées

| Route | Description |
|-------|------------|
| `/super-admin/register` | Inscription Super Admin |
| `/super-admin/login` | Connexion Super Admin |
| `/super-admin/dashboard` | Tableau de bord (authentification requise) |
| `/client/pages/ClientHeader` | Lien admin visible si super_admin ✨ |

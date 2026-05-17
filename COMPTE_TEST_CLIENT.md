# 👤 COMPTE CLIENT DE TEST

**Pour continuer le développement sans attendre**

---

## 🎯 CRÉER UN COMPTE TEST VIA SUPABASE DASHBOARD

### Étape 1: Aller sur la gestion des utilisateurs

Cliquez sur ce lien:
```
https://app.supabase.com/project/teebtmzfguqrxqoykuol/auth/users
```

Ou naviguez:
```
Dashboard → Authentication → Users
```

---

### Étape 2: Créer un nouvel utilisateur

1. Cliquez sur le bouton **"Add user"** ou **"Create user"** en haut à droite
2. Choisissez **"Create new user"**

---

### Étape 3: Remplir les informations

#### Formulaire à remplir:

**Email:**
```
test@gestpro.com
```

**Password:**
```
Test123456
```

**Options importantes:**
- ✅ **Cochez "Auto Confirm User"** (pour éviter la vérification email)
- ✅ **Cochez "Send Magic Link"** si vous voulez recevoir un email

---

### Étape 4: Créer l'utilisateur

1. Cliquez sur **"Create user"**
2. L'utilisateur est créé dans Supabase Auth ✅

---

### Étape 5: Créer le profil dans la table users

Maintenant, il faut créer le profil dans votre table `users`:

1. Allez sur: **Table Editor → users**
   ```
   https://app.supabase.com/project/teebtmzfguqrxqoykuol/editor
   ```

2. Cliquez sur **"Insert row"** ou **"+ Insert"**

3. Remplissez les champs:

**id:** (Copiez l'ID de l'utilisateur créé à l'étape 4)
```
Allez dans Authentication → Users
Cliquez sur l'utilisateur test@gestpro.com
Copiez son UUID (ex: 12345678-1234-1234-1234-123456789abc)
```

**fullname:**
```
Client Test
```

**email:**
```
test@gestpro.com
```

**phone:**
```
+229 12 34 56 78
```

**role:**
```
client
```

**avatar_url:** (Laissez vide ou mettez une URL)
```
https://api.dicebear.com/7.x/avataaars/svg?seed=test
```

4. Cliquez sur **"Save"**

---

### Étape 6: Créer le panier

1. Allez sur: **Table Editor → carts**
2. Cliquez sur **"Insert row"**
3. Remplissez:

**user_id:** (Le même UUID que l'utilisateur)
```
12345678-1234-1234-1234-123456789abc
```

4. Cliquez sur **"Save"**

---

## ✅ COMPTE TEST CRÉÉ !

### Informations de connexion:

```
Email: test@gestpro.com
Mot de passe: Test123456
```

### Tester la connexion:

1. Ouvrez votre application
2. Cliquez sur **"Connexion"**
3. Entrez:
   - Email: `test@gestpro.com`
   - Mot de passe: `Test123456`
4. Cliquez sur **"Se connecter"**
5. ✅ Vous êtes connecté !

---

## 🚀 MÉTHODE RAPIDE (SQL)

Si vous préférez utiliser SQL, voici le script complet:

### Étape 1: Aller dans SQL Editor

```
https://app.supabase.com/project/teebtmzfguqrxqoykuol/sql/new
```

### Étape 2: Exécuter ce script

```sql
-- 1. Créer l'utilisateur dans auth.users
-- Note: Vous devez d'abord créer l'utilisateur via le Dashboard
-- Car auth.users n'est pas directement accessible en SQL

-- 2. Créer le profil (remplacez l'UUID par celui de votre utilisateur)
INSERT INTO public.users (id, fullname, email, phone, role, avatar_url)
VALUES (
  'REMPLACEZ_PAR_UUID_UTILISATEUR',
  'Client Test',
  'test@gestpro.com',
  '+229 12 34 56 78',
  'client',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=test'
);

-- 3. Créer le panier
INSERT INTO public.carts (user_id)
VALUES ('REMPLACEZ_PAR_UUID_UTILISATEUR');
```

---

## 📋 PLUSIEURS COMPTES DE TEST

Vous pouvez créer plusieurs comptes pour tester différents scénarios:

### Compte 1: Client normal
```
Email: client1@test.com
Password: Test123456
Nom: Jean Dupont
```

### Compte 2: Client VIP
```
Email: vip@test.com
Password: Test123456
Nom: Marie Martin
```

### Compte 3: Client nouveau
```
Email: nouveau@test.com
Password: Test123456
Nom: Paul Durand
```

---

## 🔧 SCRIPT AUTOMATIQUE (À VENIR)

Je peux créer un script qui crée automatiquement des comptes de test:

```typescript
// scripts/createTestUsers.ts
import { supabase } from './supabase';

const testUsers = [
  {
    email: 'test1@gestpro.com',
    password: 'Test123456',
    fullname: 'Client Test 1',
    phone: '+229 12 34 56 78',
  },
  {
    email: 'test2@gestpro.com',
    password: 'Test123456',
    fullname: 'Client Test 2',
    phone: '+229 98 76 54 32',
  },
];

async function createTestUsers() {
  for (const user of testUsers) {
    // Créer l'utilisateur
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true, // Auto-confirmer l'email
    });

    if (error) {
      console.error(`Erreur pour ${user.email}:`, error);
      continue;
    }

    // Créer le profil
    await supabase.from('users').insert({
      id: data.user.id,
      email: user.email,
      fullname: user.fullname,
      phone: user.phone,
      role: 'client',
    });

    // Créer le panier
    await supabase.from('carts').insert({
      user_id: data.user.id,
    });

    console.log(`✅ Compte créé: ${user.email}`);
  }
}

createTestUsers();
```

---

## 🎯 UTILISATION DU COMPTE TEST

### Pour le développement:

1. **Tester la connexion**
   - Vérifier que l'avatar s'affiche
   - Vérifier le menu dropdown
   - Vérifier la déconnexion

2. **Tester le panier**
   - Ajouter des produits
   - Modifier les quantités
   - Passer une commande

3. **Tester les favoris**
   - Ajouter aux favoris
   - Retirer des favoris
   - Voir la liste

4. **Tester les commandes**
   - Créer une commande
   - Voir l'historique
   - Voir les détails

---

## 🔒 SÉCURITÉ

### ⚠️ Important:

- ✅ Ces comptes sont **uniquement pour le développement**
- ❌ **Ne pas utiliser en production**
- ❌ **Ne pas partager les mots de passe**
- ✅ **Supprimer avant le déploiement**

### Avant la production:

1. Supprimez tous les comptes de test
2. Désactivez "Auto Confirm User"
3. Réactivez la vérification email
4. Remettez les limites de rate à 10-20/heure

---

## 📝 CHECKLIST

Pour créer un compte test:

- [ ] Aller sur Supabase Dashboard → Authentication → Users
- [ ] Cliquer sur "Add user"
- [ ] Entrer email: test@gestpro.com
- [ ] Entrer password: Test123456
- [ ] Cocher "Auto Confirm User"
- [ ] Cliquer sur "Create user"
- [ ] Copier l'UUID de l'utilisateur
- [ ] Aller sur Table Editor → users
- [ ] Insérer le profil avec l'UUID
- [ ] Aller sur Table Editor → carts
- [ ] Insérer le panier avec l'UUID
- [ ] Tester la connexion sur l'application
- [ ] ✅ Ça marche !

---

## 🐛 DÉPANNAGE

### Erreur: "Invalid login credentials"
**Solution:** Vérifiez que l'utilisateur existe dans Authentication → Users

### Erreur: "User not found"
**Solution:** Créez le profil dans la table `users`

### Avatar ne s'affiche pas
**Solution:** Vérifiez que le profil existe dans la table `users`

### Panier vide ne se crée pas
**Solution:** Créez manuellement une entrée dans la table `carts`

---

**Dernière mise à jour:** 17 Mai 2026  
**Statut:** ✅ Guide complet pour créer un compte test

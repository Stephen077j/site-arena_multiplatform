# 🔑 GUIDE: Obtenir la clé API Supabase

**Problème:** "Invalid API key"  
**Solution:** Récupérer la vraie clé depuis Supabase Dashboard

---

## 📍 Étape 1: Accéder à Supabase Dashboard

1. Ouvrez votre navigateur
2. Allez sur: **https://app.supabase.com**
3. Connectez-vous avec votre compte
4. Vous verrez la liste de vos projets

---

## 📍 Étape 2: Sélectionner votre projet

1. Cliquez sur le projet: **teebtmzfguqrxqoykuol**
2. Vous arrivez sur le Dashboard du projet

---

## 📍 Étape 3: Aller dans les paramètres API

### Navigation:
```
Dashboard → Settings (⚙️) → API
```

**Chemin complet:**
1. Dans le menu de gauche, tout en bas, cliquez sur **⚙️ Settings**
2. Dans le sous-menu, cliquez sur **API**

**URL directe:**
```
https://app.supabase.com/project/teebtmzfguqrxqoykuol/settings/api
```

---

## 📍 Étape 4: Copier les informations

### Vous verrez deux sections importantes:

### 1️⃣ **Project URL** (Configuration)
```
URL: https://teebtmzfguqrxqoykuol.supabase.co
```
✅ Cette URL est déjà correcte dans votre `.env.local`

### 2️⃣ **Project API keys** (Clés API)

Vous verrez **DEUX clés**:

#### 🟢 **anon public** (Clé publique)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlZWJ0bXpmZ3Vxcnhxb3lrdW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NTU5NzcsImV4cCI6MjA1MjUzMTk3N30.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
✅ **C'EST CELLE-CI QU'IL FAUT COPIER**

#### 🔴 **service_role** (Clé privée)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlZWJ0bXpmZ3Vxcnhxb3lrdW9sIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNjk1NTk3NywiZXhwIjoyMDUyNTMxOTc3fQ.YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
```
❌ **NE PAS UTILISER CÔTÉ CLIENT** (seulement pour le backend)

---

## 📍 Étape 5: Copier la clé anon

1. Trouvez la section **anon public**
2. Cliquez sur le bouton **📋 Copy** à droite de la clé
3. La clé est maintenant dans votre presse-papier

---

## 📍 Étape 6: Mettre à jour .env.local

1. Ouvrez le fichier `.env.local` dans votre éditeur
2. Remplacez `VOTRE_VRAIE_CLE_ICI` par la clé que vous avez copiée
3. Sauvegardez le fichier

### Avant:
```env
VITE_SUPABASE_ANON_KEY=VOTRE_VRAIE_CLE_ICI
```

### Après:
```env
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlZWJ0bXpmZ3Vxcnhxb3lrdW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NTU5NzcsImV4cCI6MjA1MjUzMTk3N30.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

---

## 📍 Étape 7: Redémarrer l'application

Les variables d'environnement ne sont chargées qu'au démarrage.

### Si l'application tourne déjà:
1. Arrêtez le serveur (Ctrl+C dans le terminal)
2. Redémarrez avec:
```bash
npm run dev
```

### Si l'application n'est pas démarrée:
```bash
cd local-connect-main
npm run dev
```

---

## ✅ Vérification

### Comment savoir si la clé est correcte?

1. Ouvrez l'application dans le navigateur
2. Ouvrez la console (F12)
3. Cliquez sur "Connexion"
4. Essayez de créer un compte

### ✅ Si ça marche:
- Aucune erreur dans la console
- Notification "Compte créé avec succès"
- Email de confirmation reçu

### ❌ Si ça ne marche pas:
- Erreur "Invalid API key" dans la console
- Vérifiez que vous avez bien copié la clé **anon public** (pas service_role)
- Vérifiez qu'il n'y a pas d'espace avant/après la clé
- Vérifiez que vous avez bien redémarré l'application

---

## 🔍 Format de la clé

### Une clé API Supabase valide ressemble à:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlZWJ0bXpmZ3Vxcnhxb3lrdW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NTU5NzcsImV4cCI6MjA1MjUzMTk3N30.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Caractéristiques:
- ✅ Commence par `eyJ`
- ✅ Contient deux points `.`
- ✅ Très longue (200+ caractères)
- ✅ Contient `"role":"anon"` (si vous décodez le JWT)
- ❌ Ne contient PAS `"role":"service_role"`

---

## 🛠️ Dépannage

### Erreur: "Invalid API key"
**Cause:** Mauvaise clé ou clé expirée  
**Solution:** Recopiez la clé depuis le Dashboard

### Erreur: "Failed to fetch"
**Cause:** URL incorrecte  
**Solution:** Vérifiez que l'URL ne contient pas `/rest/v1/`

### Erreur: "Network error"
**Cause:** Pas de connexion internet ou Supabase down  
**Solution:** Vérifiez votre connexion et le statut de Supabase

### L'application ne voit pas la nouvelle clé
**Cause:** Variables d'environnement pas rechargées  
**Solution:** Redémarrez l'application (Ctrl+C puis `npm run dev`)

---

## 📝 Fichier .env.local final

Votre fichier `.env.local` doit ressembler à ça:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://teebtmzfguqrxqoykuol.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlZWJ0bXpmZ3Vxcnhxb3lrdW9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NTU5NzcsImV4cCI6MjA1MjUzMTk3N30.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**⚠️ Remplacez les X par votre vraie clé !**

---

## 🔒 Sécurité

### ✅ Clé anon public (safe)
- Peut être exposée côté client
- Limitée par Row Level Security (RLS)
- Utilisée dans le navigateur
- Pas de risque si elle est publique

### ❌ Clé service_role (danger)
- NE JAMAIS utiliser côté client
- Contourne toutes les règles RLS
- Accès complet à la base de données
- À utiliser UNIQUEMENT côté serveur

---

## 📞 Besoin d'aide?

Si vous avez toujours l'erreur "Invalid API key" après avoir suivi ce guide:

1. Vérifiez que vous êtes sur le bon projet Supabase
2. Vérifiez que la clé est bien la **anon public**
3. Vérifiez qu'il n'y a pas d'espace ou de retour à la ligne
4. Redémarrez complètement l'application
5. Videz le cache du navigateur (Ctrl+Shift+R)

---

**Dernière mise à jour:** 17 Mai 2026  
**Statut:** Guide complet pour résoudre "Invalid API key"

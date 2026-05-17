# 🚫 SOLUTION: Rate Limit Exceeded

**Erreur:** "Rate limit exceeded" lors de l'inscription  
**Cause:** Trop de tentatives d'inscription en peu de temps

---

## 🎯 SOLUTION 1: Attendre (Temporaire)

### Temps d'attente
- **1 heure** pour que la limite se réinitialise
- Supabase compte les tentatives par IP

### Pendant ce temps
- ✅ Vous pouvez vous connecter avec un compte existant
- ✅ Vous pouvez naviguer sur l'application
- ❌ Vous ne pouvez pas créer de nouveau compte

---

## 🎯 SOLUTION 2: Augmenter les limites (Permanent)

### Étape 1: Aller sur Supabase Dashboard

Cliquez sur ce lien:
```
https://app.supabase.com/project/teebtmzfguqrxqoykuol/auth/rate-limits
```

Ou naviguez manuellement:
```
Dashboard → Authentication → Rate Limits
```

### Étape 2: Augmenter les limites

Vous verrez plusieurs limites configurables:

#### 1. **Email signups per hour**
- **Par défaut:** 3-5 inscriptions/heure
- **Recommandé pour dev:** 100 inscriptions/heure
- **Recommandé pour prod:** 10-20 inscriptions/heure

#### 2. **Email sends per hour**
- **Par défaut:** 10 emails/heure
- **Recommandé pour dev:** 100 emails/heure
- **Recommandé pour prod:** 50 emails/heure

#### 3. **Password resets per hour**
- **Par défaut:** 5 réinitialisations/heure
- **Recommandé:** 20 réinitialisations/heure

### Étape 3: Sauvegarder

1. Modifiez les valeurs
2. Cliquez sur **"Save"**
3. Les nouvelles limites sont actives immédiatement

---

## 🎯 SOLUTION 3: Désactiver temporairement les limites (Développement)

⚠️ **Uniquement pour le développement local !**

### Sur Supabase Dashboard

1. Allez sur: **Authentication → Rate Limits**
2. Cochez **"Disable rate limiting"** (si disponible)
3. Cliquez sur **"Save"**

⚠️ **N'oubliez pas de réactiver avant la production !**

---

## 🎯 SOLUTION 4: Utiliser un compte existant

Si vous avez déjà créé un compte:

1. Allez dans votre boîte mail
2. Trouvez l'email de confirmation Supabase
3. Cliquez sur "Confirm your email"
4. Retournez sur l'application
5. Connectez-vous avec ce compte

---

## 🎯 SOLUTION 5: Supprimer les comptes de test

Si vous avez créé plusieurs comptes de test:

### Sur Supabase Dashboard

1. Allez sur: https://app.supabase.com/project/teebtmzfguqrxqoykuol/auth/users
2. Vous verrez la liste de tous les utilisateurs
3. Pour chaque utilisateur de test:
   - Cliquez sur l'utilisateur
   - Cliquez sur **"Delete user"**
   - Confirmez la suppression
4. Réessayez de créer un compte

---

## 🔍 Vérifier les limites actuelles

### Sur Supabase Dashboard

1. Allez sur: **Authentication → Rate Limits**
2. Vous verrez:
   - Les limites configurées
   - Le nombre de tentatives actuelles
   - Le temps restant avant réinitialisation

---

## 🛠️ Configuration recommandée

### Pour le développement

```
Email signups per hour: 100
Email sends per hour: 100
Password resets per hour: 50
Anonymous signups per hour: 100
```

### Pour la production

```
Email signups per hour: 20
Email sends per hour: 50
Password resets per hour: 20
Anonymous signups per hour: 10
```

---

## 📊 Comprendre les limites

### Pourquoi ces limites existent?

1. **Protection anti-spam**
   - Empêcher la création massive de faux comptes
   - Éviter l'abus du système d'emails

2. **Protection du serveur**
   - Éviter la surcharge du serveur
   - Garantir la disponibilité pour tous

3. **Coûts**
   - Limiter les coûts d'envoi d'emails
   - Éviter les dépassements de quota

### Comment sont calculées les limites?

- **Par adresse IP** (pour les inscriptions)
- **Par projet** (pour les emails)
- **Par heure glissante** (pas par heure fixe)

Exemple:
- Si vous créez 3 comptes à 14h30
- Vous pourrez créer 3 nouveaux comptes à 15h30
- Pas besoin d'attendre 16h00

---

## 🐛 Dépannage

### Erreur persiste après 1 heure
**Solution:** 
1. Videz le cache du navigateur
2. Essayez en navigation privée
3. Essayez avec une autre connexion internet

### Impossible d'augmenter les limites
**Solution:**
1. Vérifiez que vous êtes propriétaire du projet
2. Vérifiez votre plan Supabase (Free/Pro)
3. Contactez le support Supabase

### Limites trop basses même après modification
**Solution:**
1. Attendez 5 minutes que les changements se propagent
2. Rafraîchissez la page
3. Réessayez

---

## 💡 Bonnes pratiques

### En développement

1. **Augmentez les limites** pour tester facilement
2. **Utilisez le même compte de test** au lieu d'en créer plusieurs
3. **Supprimez les comptes de test** régulièrement

### En production

1. **Gardez des limites raisonnables** (10-20/heure)
2. **Surveillez les tentatives** d'inscription suspectes
3. **Activez le CAPTCHA** si nécessaire
4. **Configurez des alertes** pour les dépassements

---

## 🔒 Sécurité

### Limites recommandées par type d'application

#### Application publique (e-commerce)
```
Email signups: 50/heure
Email sends: 100/heure
```

#### Application privée (B2B)
```
Email signups: 10/heure
Email sends: 50/heure
```

#### Application de test
```
Email signups: 100/heure
Email sends: 100/heure
```

---

## 📝 Checklist

Pour résoudre "Rate limit exceeded":

- [ ] Vérifier le temps écoulé depuis la dernière tentative
- [ ] Attendre 1 heure si nécessaire
- [ ] Aller sur Supabase Dashboard → Rate Limits
- [ ] Augmenter "Email signups per hour" à 100
- [ ] Augmenter "Email sends per hour" à 100
- [ ] Cliquer sur "Save"
- [ ] Attendre 5 minutes
- [ ] Réessayer de créer un compte
- [ ] ✅ Ça marche !

---

## 🚀 Après avoir résolu le problème

### Tester l'inscription

1. Ouvrez l'application
2. Cliquez sur "Connexion"
3. Allez sur l'onglet "Inscription"
4. Remplissez le formulaire
5. Cliquez sur "Créer mon compte"
6. ✅ "Compte créé avec succès !"

### Confirmer l'email

1. Ouvrez votre boîte mail
2. Trouvez l'email de Supabase
3. Cliquez sur "Confirm your email"
4. Retournez sur l'application
5. Connectez-vous
6. ✅ Avatar affiché !

---

**Dernière mise à jour:** 17 Mai 2026  
**Statut:** ✅ Solution complète pour Rate Limit

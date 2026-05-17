# 🎨 Logos ARENAH

Ce document décrit les logos créés pour la plateforme ARENAH.

---

## 📁 Fichiers de logos

### 1. Logo principal (`logo-arenah.svg`)
- **Emplacement** : `/public/logo-arenah.svg`
- **Dimensions** : 200x200 px
- **Format** : SVG vectoriel
- **Utilisation** : Page de connexion (desktop), documents officiels

**Caractéristiques** :
- Cercle avec gradient violet-indigo
- Lettre "A" stylisée en blanc
- Effets de sparkle (étoiles)
- Arcs décoratifs
- Ombre portée

### 2. Logo icône (`logo-arenah-icon.svg`)
- **Emplacement** : `/public/logo-arenah-icon.svg`
- **Dimensions** : 64x64 px
- **Format** : SVG vectoriel
- **Utilisation** : Header, favicon, applications mobiles

**Caractéristiques** :
- Carré arrondi avec gradient violet-indigo
- Lettre "A" stylisée en blanc (version compacte)
- Petits sparkles
- Optimisé pour petites tailles

---

## 🎨 Palette de couleurs

### Gradient principal
```css
linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)
```

- **Violet** : `#8B5CF6` (violet-500)
- **Indigo** : `#6366F1` (indigo-500)

### Couleurs secondaires
- **Blanc** : `#FFFFFF` (texte et éléments)
- **Ombre** : `rgba(0, 0, 0, 0.3)` (effet de profondeur)

---

## 📐 Spécifications techniques

### Logo principal (200x200)
```svg
<svg width="200" height="200" viewBox="0 0 200 200">
  <!-- Cercle de fond avec gradient -->
  <circle cx="100" cy="100" r="95" fill="url(#logoGradient)"/>
  
  <!-- Lettre A stylisée -->
  <path d="M -35 40 L 0 -45 L 35 40..." fill="white"/>
  
  <!-- Sparkles décoratifs -->
  <circle cx="25" cy="-35" r="3" fill="white"/>
  
  <!-- Arcs décoratifs -->
  <path d="M 50 100 Q 50 50, 100 50" stroke="white"/>
</svg>
```

### Logo icône (64x64)
```svg
<svg width="64" height="64" viewBox="0 0 64 64">
  <!-- Rectangle arrondi avec gradient -->
  <rect width="64" height="64" rx="12" fill="url(#iconGradient)"/>
  
  <!-- Lettre A compacte -->
  <path d="M -11 13 L 0 -14 L 11 13..." fill="white"/>
  
  <!-- Sparkles minimalistes -->
  <circle cx="8" cy="-11" r="1" fill="white"/>
</svg>
```

---

## 💻 Utilisation dans le code

### Header (ClientHeader.tsx)
```tsx
<Link to="/" className="flex items-center gap-2">
  <img 
    src="/logo-arenah-icon.svg" 
    alt="ARENAH Logo" 
    className="w-9 h-9 rounded-xl shadow-trust-glow"
  />
  <div className="leading-none">
    <div className="font-bold text-[15px]">ARENAH</div>
    <div className="text-[10px] uppercase">Self-service</div>
  </div>
</Link>
```

### Page de connexion - Desktop (ClientLogin.tsx)
```tsx
<div className="flex items-center gap-4 mb-14">
  <img 
    src="/logo-arenah.svg" 
    alt="ARENAH Logo" 
    className="w-14 h-14 rounded-2xl shadow-2xl"
  />
  <div>
    <h1 className="text-3xl font-bold text-white">ARENAH</h1>
    <p className="text-white/80 text-sm">Votre plateforme tout-en-un</p>
  </div>
</div>
```

### Page de connexion - Mobile (ClientLogin.tsx)
```tsx
<div className="mobile-logo lg:hidden">
  <img 
    src="/logo-arenah-icon.svg" 
    alt="ARENAH Logo" 
    className="w-11 h-11 rounded-xl"
  />
  <div>
    <h1 className="text-2xl font-bold">ARENAH</h1>
    <p className="text-sm text-muted-foreground">Votre plateforme tout-en-un</p>
  </div>
</div>
```

---

## 🎯 Variantes et déclinaisons

### Tailles recommandées

| Contexte | Fichier | Taille |
|----------|---------|--------|
| Header desktop | `logo-arenah-icon.svg` | 36px |
| Header mobile | `logo-arenah-icon.svg` | 32px |
| Page login desktop | `logo-arenah.svg` | 56px |
| Page login mobile | `logo-arenah-icon.svg` | 44px |
| Favicon | `logo-arenah-icon.svg` | 32px, 64px |
| App icon iOS | `logo-arenah-icon.svg` | 180px |
| App icon Android | `logo-arenah-icon.svg` | 192px |

### Formats à générer (si besoin)

Pour les besoins spécifiques, générer depuis les SVG :

```bash
# PNG haute résolution
- logo-arenah-512.png (512x512)
- logo-arenah-256.png (256x256)
- logo-arenah-128.png (128x128)
- logo-arenah-64.png (64x64)
- logo-arenah-32.png (32x32)

# Favicon
- favicon-32x32.png
- favicon-16x16.png
- favicon.ico (multi-tailles)

# Apple Touch Icon
- apple-touch-icon.png (180x180)

# Android
- android-chrome-192x192.png
- android-chrome-512x512.png
```

---

## 🎨 Règles d'utilisation

### ✅ À faire
- Utiliser le logo sur fond clair ou foncé
- Respecter l'espace minimum autour du logo (10% de la taille)
- Utiliser les fichiers SVG quand possible (meilleure qualité)
- Maintenir les proportions originales

### ❌ À ne pas faire
- Ne pas déformer le logo (étirer ou compresser)
- Ne pas changer les couleurs du gradient
- Ne pas ajouter d'effets supplémentaires
- Ne pas utiliser sur fond trop chargé
- Ne pas placer du texte trop près du logo

---

## 📱 Favicon et métadonnées

### Mise à jour du HTML (index.html)
```html
<head>
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/logo-arenah-icon.svg" />
  <link rel="apple-touch-icon" href="/logo-arenah-icon.svg" />
  
  <!-- Métadonnées -->
  <meta name="theme-color" content="#8B5CF6" />
  <meta name="description" content="ARENAH - Votre plateforme self-service tout-en-un" />
  
  <!-- Open Graph -->
  <meta property="og:image" content="/logo-arenah.svg" />
  <meta property="og:title" content="ARENAH" />
  <meta property="og:description" content="Votre plateforme self-service tout-en-un" />
</head>
```

---

## 🔄 Historique des versions

### Version 1.0 (17 Mai 2026)
- ✅ Création du logo principal (200x200)
- ✅ Création du logo icône (64x64)
- ✅ Intégration dans le header
- ✅ Intégration dans la page de login
- ✅ Gradient violet-indigo
- ✅ Lettre "A" stylisée
- ✅ Effets sparkle

---

## 📞 Support

Pour toute question sur l'utilisation des logos :
- Consulter ce document
- Voir les exemples dans le code
- Contacter l'équipe design

---

**Créé le** : 17 Mai 2026  
**Dernière mise à jour** : 17 Mai 2026  
**Version** : 1.0.0

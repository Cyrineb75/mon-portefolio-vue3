# Style Guide - Portfolio

## 1. Fichiers importants
- `src/styles/_tokens.css` : variables de base (ne pas mettre de sélecteurs).
- `src/styles/_theme-dark.css` : surcharges thème sombre.
- `src/styles/_theme-light-sakura.css` : surcharges thème clair Sakura.
- `src/style.css` : styles globaux structure + imports thèmes.

## 2. Couleurs de base (tokens)
`--color-nuit`, `--color-violet-sombre`, `--color-violet-clair`, `--color-violet-median`, `--color-blanc`, `--color-violet-fluo`, `--color-rose-poudre`.

## 3. Palette utilisée (accents & effets)
`--c-rose-lumineux`, `--c-rose-vif`, `--c-violet-medium`, `--c-violet-bright`, `--c-purple-accent-2`, `--c-purple-modal-bg`, `--c-purple-heading`, `--c-button-base`, `--c-button-hover`, `--c-danger`, `--c-danger-light`, `--c-pink-hot`, `--c-pink-neon`, `--c-cyan-neon`, `--c-warm-light`, `--c-warm-edge`, `--c-pink-cloud`, `--c-pink-fog`, `--c-purple-deep`.

## 4. Variables thémables principales
- Fond global : `--c-bg-base`
- Panel / blocs : `--c-bg-panel`
- Texte principal / paragraphe : `--c-text-primary`, `--c-text-paragraph`
- Accents : `--c-accent-primary`, `--c-accent-secondary`
- Liens : `--c-link`, `--c-link-hover`
- Dégradé surface : `--c-gradient-surface`
- Header : `--c-header-bg`
- Titres : `--c-title-text`, `--c-title-bg`, `--c-title-border`, `--c-title-bar-gradient`, `--c-title-shadow`

## 5. Spécifique Sakura (définies dans le thème clair)
Ex: `--c-sakura-panel-from`, `--c-sakura-panel-to`, `--c-sakura-line`, `--c-sakura-accent`, `--c-sakura-accent-strong`, `--c-sakura-text`, `--c-sakura-text-soft`, `--c-sakura-glow`.

## 6. Ombres & transitions
`--shadow-panel`, `--shadow-glow-card`, `--shadow-focus-ring`, `--ease-standard`, `--transition-fast`, `--transition-medium`.

## 7. Classes utilitaires
| Classe | Rôle |
|--------|------|
| `.glow-text` | Accent lumineux décoratif |
| `.soft-panel` | Panneau translucide flouté |
| `.focus-ring` | Accessibilité focus cohérente |
| `.btn-glow` | Bouton avec glow renforcé |

## 8. Titres
`.section-title` utilise UNIQUEMENT les variables (pas de couleur en dur). Pour une variation vide: créer plus tard `.section-title--plain` (fond transparent).

## 9. Thèmes
Changement via classe sur `<body>`: `theme-dark` ou `theme-light`. Logique de bascule dans `App.vue` (localStorage + préférence système).

## 10. Ajouter une nouvelle couleur
1. Ajouter dans `_tokens.css` (nom clair).  
2. Si dépend du thème → override dans un fichier de thème.  
3. Utiliser la variable dans le composant (jamais d’hex direct).  
4. Mettre à jour cette doc si usage global.

## 11. Exemple section
```html
<section class="bloc">
  <div class="section-inner">
    <h2 class="section-title">Titre</h2>
    <p>Texte…</p>
  </div>
</section>
```

## 12. Idées futures
- Classe `.section-title--plain`
- Fichier `effects.css` (animations / néons)
- Thème "high-contrast"
- Media query `prefers-reduced-motion`

---
Dernière mise à jour : 2025-10-07

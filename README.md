# 🌸 Mon Portfolio – Vue 3 + Vite

Portfolio personnel réalisé dans le cadre de mon apprentissage.
Une vitrine interactive mêlant esthétique, technique et poésie :
intro animée (boîte à musique et ballerine), projets présentés avec soin, et un thème sombre prêt pour évoluer vers un mode clair.
---

## 🚀 Stack
- Vue 3 (Composition API – `<script setup>`)
- Vite
- Vue Router (navigation + 404 secrète)
- Design Tokens (couleurs / ombres / transitions)

---

## 🌗 Thème
- Auto : `prefers-color-scheme`
- Choix persistant : `localStorage` (`portfolio-theme`)
- Classes : `theme-dark` / `theme-light`
- Base visuelle : contraste doux + lisibilité

---

## 🎨 Design System
Voir [`STYLEGUIDE.md`](./STYLEGUIDE.md) : palette, ombres, transitions, conventions.

---

## 🧩 Composants
| Composant | Rôle |
|-----------|------|
| `Intro.vue` | Séquence d’accueil (musique + visuel) |
| `Header.vue` | Navigation sticky (IntersectionObserver) |
| `Home.vue` | Page principale (présentation, créations, contact) |
| `ProjectCard.vue` / `ProjectModal.vue` | Aperçu + détails projet |
| `Contactform.vue` | Formulaire (mailto) |
| `StarBackground.vue` | Fond étoilé |

---

## ♿ Accessibilité
- `alt` descriptifs
- `aria-label` interactifs
- Focus visibles
- `prefers-reduced-motion` (prévu)

---

## ▶️ Démarrer
```bash
npm install
npm run dev
```

## � Configuration
Créer un fichier `.env.local` à la racine :
```
VITE_CONTACT_EMAIL=ton.email@mail.com
```

---

## �🛠 Build
```bash
npm run build
npm run preview
```

---

## 📁 Structure
```
src/
  components/
  pages/
  router/
  styles/ (tokens)
public/
```

---

## ➕ Ajouter un projet
Dans `src/pages/Home.vue`, ajouter dans le tableau `projects` :
```js
{
  title: "Nom du projet",
  image: "src/assets/image/mon-image.png",
  date: "JJ/MM/AAAA",
  tech: ["HTML","CSS","…"],
  site: null, // ou URL
  repo: "https://github.com/utilisateur/mon-projet"
}
```

---

## 💡 Idées futures
- Thème haute lisibilité
- Mode animations réduites
- i18n (FR / EN)
- Tests (Vitest)
- PWA (offline)

---

## 🎵 Crédits 
Images / vidéos : personnels 
Sons : boîte à musique / clic (youtube converter reprise anastatia 'loin du froid de décembre)'
Logos : GitHub & LinkedIn (usage illustratif)

## 📄 Licence
Usage académique et personnel uniquement. Voir fichier [LICENSE](./LICENSE).  
Reproduction commerciale interdite sans accord écrit.  


---
© Cyrine – Portfolio académique & créatif.

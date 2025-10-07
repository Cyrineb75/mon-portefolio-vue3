<template>
  <!-- Barre de navigation principale du site -->
  <header class="header">
    <div class="logo logo-link" @click="scrollToTop">Mon Portefolio</div>
    <nav class="menu" aria-label="Navigation principale">
      <a href="#presentation" @click.prevent="scrollToSection('presentation')" :class="{ active: activeSection === 'presentation' }">Présentation</a>
      <a href="#creations" @click.prevent="scrollToSection('creations')" :class="{ active: activeSection === 'creations' }">Créations</a>
      <a href="#contact" @click.prevent="scrollToSection('contact')" :class="{ active: activeSection === 'contact' }">Contact</a>
    </nav>
    <div class="header-actions">
      <slot name="actions"></slot>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const activeSection = ref('presentation')

// Met à jour le menu pour afficher le lien actif selon la section visible à l'écran (présentation, créations, contact)
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { threshold: 0.5 }
  )

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section)
  })
})


// Fonction pour faire défiler vers le haut de la page lors du clic sur le logo
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Pour faire défiler vers une section du site depuis le menu
function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const headerEl = document.querySelector('.header')
  const offset = (headerEl?.offsetHeight || 0) + 12 // légère marge
  const rect = el.getBoundingClientRect()
  let target = rect.top + window.scrollY - offset
  if (target < 0) target = 0
  window.scrollTo({ top: target, behavior: 'smooth' })
  activeSection.value = id
}
</script>

<style scoped>
.header {
  display: grid;
  grid-template-columns: 200px 1fr 160px;
  align-items: center;
  padding: 14px 26px;
  background: var(--c-header-bg, var(--color-violet-median, #472a66));
  color: var(--color-blanc, #fff);
  box-shadow: 0 2px 12px #5e477744;
  border-bottom: 2px solid var(--color-rose-poudre, #e2b0ff);
  position: sticky;
  top: 0;
  z-index: 100;
}
.logo {
  cursor: pointer;
  font-family: 'Dancing Script', 'Playfair Display', cursive;
  font-size: 2rem;
  color: var(--color-rose-poudre, #e2b0ff);
  text-shadow: 0 0 8px var(--color-violet-fluo, #a400ff);
  transition: transform 0.2s;
}
/* Effet au survol du logo */
.logo:hover {
  transform: scale(1.08);
  text-shadow: 0 0 16px var(--color-rose-poudre, #e2b0ff);
}
.logo-link {
  color: var(--color-rose-poudre, #e2b0ff);
  cursor: pointer;
  transition: text-shadow 0.3s, color 0.3s;
}
.logo-link:hover {
  text-shadow: 0 0 12px var(--color-violet-fluo, #a400ff);
  color: var(--color-violet-fluo, #a400ff);
}
/* Style du menu de navigation */
.menu {
  display: flex;
  justify-content: center;
  gap: 8px;
}
.menu a {
  position: relative;
  margin: 0;
  color: var(--color-blanc, #fff);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.08em;
  padding: 6px 14px;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;
}
/* Zone actions droite */
.header-actions { display: flex; justify-content: flex-end; align-items: center; gap: 8px; }
.header-actions .theme-switch { position: static; top: auto; right: auto; box-shadow: none; }
.header-actions .theme-switch:hover { box-shadow: var(--shadow-glow-card); }

/* Soulignement animé sous les liens */
.menu a::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: -4px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-violet-fluo, #a400ff), var(--color-rose-poudre, #e2b0ff));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .25s ease;
  border-radius: 2px;
}
.menu a:hover::after,
.menu a.active::after {
  transform: scaleX(1);
}
.menu a:hover {
  background: var(--color-rose-poudre, #e2b0ff);
  color: var(--color-violet-fluo, #a400ff);
}
.menu a.active {
  border-bottom: 2px solid var(--color-rose-poudre, #e2b0ff);
  font-weight: bold;
  color: var(--color-rose-poudre, #e2b0ff);
}
/* Styles responsives pour petits écrans */
@media (max-width: 700px) {
  .header { grid-template-columns: 1fr; grid-auto-rows: auto; row-gap: 8px; padding: 10px 10px 14px; }
  .logo {
    font-size: 1.3rem;
    margin-bottom: 2px;
  }
  .menu { flex-wrap: wrap; }
  .menu a { font-size: .95em; padding: 4px 10px; }
  .menu a::after {
    bottom: -2px;
    height: 2px;
  }
  .header-actions { justify-content: center; }
}
</style>

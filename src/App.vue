<template>
  <div id="app">
    <!-- Transition d'apparition / disparition de l'intro -->
    <transition name="fade">
      <!-- Intro animée (masquée après entrée sur le site) -->
      <Intro v-if="!showSite" @ouvrir="entrerSite" />

      <!-- Site principal en onepage(affiché après l'intro) -->
      <div v-else>
        <Header>
          <template #actions>
            <button class="theme-switch" @click="toggleTheme" :aria-label="`Basculer en thème ${isLight ? 'sombre' : 'clair'}`">
              {{ isLight ? '🌙 Sombre' : '☀️ Clair' }}
            </button>
          </template>
        </Header>
        <router-view />
        <Footer />
      </div>
    </transition>
  </div>
</template>

<script setup>

import { ref } from 'vue'


import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Intro from './components/Intro.vue'
import { onMounted } from 'vue'


const showSite = ref(false)
const isLight = ref(false)

function applyTheme() {
  const body = document.body
  body.classList.remove('theme-light','theme-dark')
  body.classList.add(isLight.value ? 'theme-light' : 'theme-dark')
  localStorage.setItem('portfolio-theme', isLight.value ? 'light' : 'dark')
}

function toggleTheme() {
  isLight.value = !isLight.value
  applyTheme()
}

onMounted(() => {
  const saved = localStorage.getItem('portfolio-theme')
  if (saved === 'light') isLight.value = true
  else if (saved === 'dark') isLight.value = false
  else {
    // autodétection initiale
    isLight.value = window.matchMedia('(prefers-color-scheme: light)').matches
  }
  applyTheme()
})

/* Déclenché quand l'intro se termine ou est passée (bouton skip) */
function entrerSite() {
  showSite.value = true
}
</script>

<style>
/* Transition fondu */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Racine application */
#app {
  min-height: 100vh;
  background: var(--color-nuit, #0b0a1f);
}

.theme-switch {
  background: linear-gradient(135deg, var(--c-accent-primary), var(--c-accent-secondary));
  color: #fff;
  border: 1px solid var(--c-border-soft);
  padding: 6px 14px;
  border-radius: 18px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: .5px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.25);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), filter var(--transition-fast);
}
.theme-switch:hover { transform: translateY(-2px); box-shadow: 0 4px 18px var(--color-violet-fluo); filter: brightness(1.05); }
.theme-switch:focus { outline: none; box-shadow: var(--shadow-focus-ring); }

/* Header fixé en haut */
header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-violet-clair, #5e4777);
  box-shadow: 0 2px 12px #0003;
}

/* Footer fixé en bas */
footer {
  position: sticky;
  bottom: 0;
  z-index: 100;
  background: var(--color-violet-clair, #5e4777);
  box-shadow: 0 -2px 12px #0003;
}
</style>

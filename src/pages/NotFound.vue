<template>
  <div class="notfound-container page-width">
    <img src="../assets/image/chien-ballerine.png" alt="Chien en tutu" /> <!-- Image de la ballerine cosmique -->
    <h2>Oups ! Cette page n’existe pas ! <br>
      <span v-if="isSecret">Olala Eh ! Toi, il ne faut jamais cliquer sur "clique ici" ! 😅</span>
    </h2> <!-- Quand on clique sur un lien secret -->
    <button @click="goHome">Retour à l’accueil</button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const isSecret = route.query.secret === 'true'

// Fonction pour revenir à l'accueil et scroller vers la section présentation
function goHome() {
  router.push('/').then(() => {
    setTimeout(() => {
      const section = document.getElementById('presentation')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  })
}
</script>

<style scoped>
.notfound-container {
  text-align: center;
  margin: 80px auto 40px auto;
  padding: 0 24px;
  color: var(--color-violet-median, #472a66);
}

/* Style pour l'image de la ballerine cosmique */

.notfound-container img {
  max-width: 320px;
  border-radius: 18px;
  box-shadow: 0 4px 24px var(--color-violet-fluo, #a400ff);
  margin-bottom: 24px;
}

/* Style pour le texte */
.notfound-container h2 {
  font-size: 2rem;
  margin-bottom: 18px;
  color: var(--color-rose-poudre, #e2b0ff);
  text-shadow: 0 0 8px var(--color-violet-fluo, #a400ff);
}

/* Style pour le bouton */
.notfound-container a,
.notfound-container button {
  display: inline-block;
  margin-top: 20px;
  color: var(--color-violet-fluo, #a400ff);
  font-weight: bold;
  text-decoration: underline;
  background: var(--color-or-soft, #dbc858);
  padding: 10px 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px var(--color-rose-poudre, #e2b0ff);
  transition: background 0.2s, color 0.2s;
  border: none;
  cursor: pointer;
}

/* Effet au survol */
.notfound-container a:hover,
.notfound-container button:hover {
  background: var(--color-rose-poudre, #e2b0ff);
  color: var(--color-violet-median, #472a66);
  text-decoration: none;
}

@media (max-width: 640px) {
  .notfound-container h2 { font-size: 1.55rem; line-height: 1.3; }
  .notfound-container img { max-width: 260px; }
}
</style>

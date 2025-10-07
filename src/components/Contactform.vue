<template>
  <div :class="['contact-form-wrapper', embedded && 'contact-form-wrapper--embedded']">
  <h2 v-if="showTitle" class="section-title" style="margin-top:0">📩 Me Contacter</h2>
  <form class="contact-form" @submit.prevent="envoyerFormulaire" aria-label="Formulaire de contact">

  <!-- champs -->
      <label for="nom">
        👤 Nom
      </label>
      <input id="nom" v-model="nom" type="text" required />

      <label for="objet">
        📝 Objet
      </label>
      <input id="objet" v-model="objet" type="text" required />

      <label for="message">
        💬 Message
      </label>
      <textarea id="message" v-model="message" rows="4" required></textarea>

      <button type="submit">Envoyer</button>
    </form>

    <!-- Message de confirmation -->
    <div v-if="confirmation" class="confirmation">{{ confirmation }}</div>
  </div>
</template>

<script setup> 
import { ref, computed } from 'vue'
const props = defineProps({
  showTitle: { type: Boolean, default: true },
  embedded: { type: Boolean, default: false }
})
const { showTitle, embedded } = props

const nom = ref('')
const objet = ref('')
const message = ref('')
const confirmation = ref('')

// Adresse via variable d'environnement
const email = import.meta.env.VITE_CONTACT_EMAIL

// Lien mailto assemblé
const mailto = computed(() => {
  const body = `De: ${nom.value}\n\n${message.value}`
  return `mailto:${email || ''}?subject=${encodeURIComponent(objet.value)}&body=${encodeURIComponent(body)}`
})

function envoyerFormulaire() {
  if (!email) {
    confirmation.value = '⚠️ Adresse email non configurée (.env manquant).'
    return
  }
  const url = mailto.value

  // Détection mobile ou non
  // Sur mobile, on reste dans la même fenêtre pour ouvrir l'app mail
  // Sur desktop, on ouvre un nouvel onglet (plus sûr pour ne pas perdre la page)
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  const preferNewTab = !isMobile 
  // Création et clic sur un lien <a> pour ouvrir le client mail
  const a = document.createElement('a')
  a.href = url
  if (preferNewTab) {
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
  }
  document.body.appendChild(a)
  a.click()
  a.remove()

  confirmation.value = preferNewTab
    ? '📩 Brouillon ouvert (nouvel onglet/mail). Vérifie ton client.'
    : '📩 Ouverture du client mail…'

  // Reset des champs après l’action
  nom.value = ''
  objet.value = ''
  message.value = ''

  // Disparition douce après 6s si pas d’erreur
  setTimeout(() => { if (confirmation.value.startsWith('📩')) confirmation.value = '' }, 6000)
}
</script>


<style scoped>
/*dimensions et style du conteneur du formulaire*/
.contact-form-wrapper { 
  width: 100%;
  max-width: 100%;
  margin: 2em 0; 
  padding: 2.2em 2.4em;
  border-radius: 20px;
  background: var(--c-bg-panel);
  backdrop-filter: blur(14px);
  text-align: left;
  animation: fadeInUp 0.9s ease forwards;
  border: 2.5px solid var(--color-rose-poudre, #e2b0ff);
  box-shadow: 0 0 0 4px rgba(226, 176, 255, 0.15), 0 4px 20px rgba(0,0,0,0.4), 0 0 24px var(--color-violet-fluo);
}

.contact-form-wrapper--embedded {
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 0;
}
/*Version large */
@media (min-width: 1200px) {
  .contact-form-wrapper {
    max-width: 1000px; 
    margin-left: auto;
    margin-right: auto;
  }
}
@media (min-width: 820px) {
  .contact-form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.1em;
  }
  .contact-form label { margin-bottom: 0.3em; }
  .contact-form input,
  .contact-form textarea,
  .contact-form button { width: 100%; }
  .contact-form button {
    max-width: 420px;
    justify-self: center; 
    margin-left: auto;
    margin-right: auto;
  }
}

/* Titre du formulaire */
.section-title {
  font-size: 1.8rem;
  margin-bottom: 1.2em;
  color: var(--color-rose-poudre, #e2b0ff);
  text-align: left;
  text-shadow: 0 0 8px var(--color-violet-fluo, #a400ff);
  animation: glowText 2s ease-in-out infinite alternate;
}
/* Formulaire */
.contact-form label {
  display: flex;
  align-items: center;
  margin-bottom: 0.3em;
  font-weight: 500;
  color: var(--color-rose-poudre, #e2b0ff);
  opacity: 0.95;
  font-size: 1.08em;
  letter-spacing: 0.5px;
  gap: 0.5em;
  text-shadow: 0 0 6px var(--color-violet-fluo, #a400ff);
}

.contact-form label[for="nom"] {
  color: var(--color-or-doux, #ecda73); /* doré */
  text-shadow: 0 0 6px var(--color-or-doux, #ffd700);
}

.contact-form label[for="objet"] {
  color: var(--color-bleu-etoile, #3a86ff); /* bleu étoile */
  text-shadow: 0 0 6px var(--color-bleu-etoile, #3a86ff);
}

.contact-form label[for="message"] {
  color: var(--color-rose-poudre, #e2b0ff); /* rose poudré */
  text-shadow: 0 0 6px var(--color-rose-poudre, #e2b0ff);
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  margin-bottom: 1em;
  padding: 0.7em;
  border: 2px solid var(--color-violet-fluo, #a400ff); /* Bordure élégante flashy */
  border-radius: 10px;
  font-size: 1em;
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-blanc);
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
}

/* Effet lumineux différent selon le champ rempli */
.contact-form input:focus:valid {
  border-color: var(--color-or-doux, #ffd700);
  box-shadow: 0 0 10px var(--color-or-doux, #ffd700);
}
.contact-form input:focus:invalid {
  border-color: var(--color-violet-fluo, #a400ff);
  box-shadow: 0 0 10px var(--color-violet-fluo, #a400ff);
}
.contact-form textarea:focus:valid {
  border-color: var(--color-rose-poudre, #e2b0ff);
  box-shadow: 0 0 10px var(--color-rose-poudre, #e2b0ff);
}
.contact-form textarea:focus:invalid {
  border-color: var(--color-violet-fluo, #a400ff);
  box-shadow: 0 0 10px var(--color-violet-fluo, #a400ff);
}

/*Bouton d'envoi*/
.contact-form button {
  background: linear-gradient(135deg, var(--color-or-soft, #c5bd8e), var(--color-rose-poudre, #e2b0ff));
  color: var(--color-violet-sombre, #1d1145);
  border: 2px solid var(--color-rose-poudre, #e2b0ff);
  padding: 0.9em 2em;
  border-radius: 18px;
  font-weight: bold;
  font-size: 1.08em;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: 0 4px 16px var(--color-or-doux, #ffd700), 0 0 12px var(--color-rose-poudre, #e2b0ff);
  transition: background 0.3s, box-shadow 0.3s, transform 0.2s, border-color 0.2s;
  width: 100%;
  display: block;
  margin-top: 0.8em;
  position: relative;
  overflow: hidden;
}

/* Petite icône d'envoi sur le bouton */
.contact-form button::after {
  content: "✨";
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2em;
  opacity: 0.7;
  pointer-events: none;
}

/* Effet hover avec glow et légère augmentation de taille */
.contact-form button:hover {
  background: linear-gradient(135deg, var(--color-rose-poudre, #e2b0ff), var(--color-or-doux, #ffd700));
  box-shadow: 0 0 24px var(--color-rose-poudre, #e2b0ff), 0 0 40px var(--color-or-doux, #ffd700);
  border-color: var(--color-or-doux, #ffd700);
  transform: scale(1.06);
}

/* Message de confirmation */
.confirmation {
  margin-top: 1em;
  padding: 0.7em;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-blanc);
  font-weight: 500;
  text-align: center;
}
/* Animations */
@keyframes fadeInUp {
from {
opacity: 0;
transform: translateY(20px);
}
to {
opacity: 1;
transform: translateY(0);
}
}

@keyframes glowText {
  0% {
    text-shadow: 0 0 8px var(--color-violet-fluo, #a400ff);
  }
  100% {
    text-shadow: 0 0 16px var(--color-violet-fluo, #a400ff), 0 0 32px var(--color-violet-fluo, #a400ff);
  }
}
</style>

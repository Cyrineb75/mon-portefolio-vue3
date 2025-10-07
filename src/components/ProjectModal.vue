<template>
  <!-- Modale projet : affiche détail + liens -->
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="close-btn" @click="$emit('close')">×</button>
      <h2>{{ project.title }}</h2>
      <img
        v-if="project.image"
        :src="project.image"
        :alt="`Illustration détaillée du projet ${project.title}`"
        loading="lazy"
      />
      <p><strong>Date :</strong> {{ project.date }}</p>
      <div v-if="project.tech?.length">
        <strong>Technos :</strong>
        <span v-for="(t, i) in project.tech" :key="i" class="tag">{{ t }}</span>
      </div>
      <!-- Liens (repo / site si dispo) -->
      <div class="links">
        <a
          v-if="project.repo"
          :href="project.repo"
          target="_blank"
          rel="noopener"
          class="github-link"
          aria-label="Ouvrir le dépôt GitHub du projet"
        >
          <img src="../assets/image/github_icon.png" alt="GitHub" class="github-icon" />
        </a>
        <a
          v-if="project.site"
          :href="project.site"
          target="_blank"
          aria-label="Visiter la version en ligne du projet"
        >🌐 Site</a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: { type: Object, required: true }
})
defineEmits(['close'])
</script>

<style scoped>
/* Modal plein écran sombre */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Contenu principal */
.modal-content {
  background: linear-gradient(135deg, var(--c-rose-lumineux) 60%, var(--c-pink-soft-bg) 100%);
  color: var(--c-purple-modal-bg);
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 0 10px var(--color-violet-fluo);
  text-align: center;
  animation: fadeInUp 0.5s ease;
  position: relative;
  border: 2px solid var(--color-violet-fluo);
}

.modal-content h2,
.modal-content p,
.modal-content strong {
  color: var(--c-purple-heading);
  text-shadow: 0 2px 2px var(--c-rose-vif), 0 1px 0 var(--c-rose-vif);
}

.modal-content img {
  max-width: 320px;
  max-height: 220px;
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 1rem auto;
  box-shadow: 0 4px 16px rgba(0,0,0,0.4);
  display: block;
  object-fit: contain;
  background: var(--c-purple-modal-bg);
  padding: 8px;
}

/* Bouton fermer */
.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--color-blanc);
  cursor: pointer;
  transition: transform 0.25s, color 0.25s;
}
.close-btn:hover {
  transform: scale(1.15) rotate(6deg);
  color: var(--c-pink-hot);
}

/* Liens + tags */
.links {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}
.links a {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: #fff;
  background: var(--color-violet-fluo);
  font-weight: bold;
  text-decoration: none;
  transition: background 0.3s, box-shadow 0.3s, transform 0.25s;
  box-shadow: 0 2px 4px var(--color-violet-fluo, #a53ddd50);
}
.links a:hover {
  background: var(--c-rose-lumineux);
  color: var(--c-purple-modal-bg);
  transform: translateY(-3px);
  box-shadow: 0 6px 24px var(--c-rose-lumineux);
}

.tag {
  display: inline-block;
  margin: 0.25rem 0.35rem;
  padding: 0.35rem 0.7rem;
  background: var(--color-violet-fluo);
  color: var(--color-blanc);
  border-radius: 999px;
  font-size: 0.78rem;
  letter-spacing: .5px;
  box-shadow: 0 0 10px var(--color-violet-fluo);
}

/* Icône GitHub */
.github-link { display: inline-block; }
.github-icon {
  width: 45px !important;
  height: 45px !important;
  border: 2px solid var(--color-violet-fluo);
  border-radius: 50%;
  vertical-align: middle;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 0 5px var(--color-violet-fluo);
  background: var(--color-blanc);
}
.github-link:hover .github-icon {
  transform: scale(1.2) rotate(-8deg);
  box-shadow: 0 0 24px var(--c-pink-hot), 0 0 40px var(--color-violet-fluo);
}

/* Animation apparition */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

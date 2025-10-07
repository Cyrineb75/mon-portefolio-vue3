<template>
  <div class="project-card" @click="$emit('open', project)">

  <img :src="project.image" :alt="`Illustration du projet ${project.title}`" class="project-image" loading="lazy" />
   
    <h3>{{ project.title }}</h3>
 
    <p class="date">{{ project.date }}</p>

    <p v-if="project.tech && project.tech.length">
      <span v-for="(t, i) in project.tech" :key="i" class="tag">{{ t }}</span>
    </p>
  </div>
</template>

<script setup>
defineProps({
  project: Object
})
</script>

<style scoped>
.project-card {
  cursor: pointer;
  background: linear-gradient(120deg, var(--c-gradient-alt-start) 60%, var(--c-gradient-alt-end) 100%);
  color: var(--c-violet-bright);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 2px 2px 6px rgba(0,0,0,.15);
  transition: transform 0.2s, box-shadow 0.2s;
}
/* Effet au survol */
.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 6px 6px 16px rgba(0,0,0,.25);
}


.date {
  font-size: 0.85rem;
  color: #666;
  margin: 5px 0 10px;
}

.tag {
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 6px;
  background: var(--color-violet-sombre);
  color: var(--color-rose-poudre);
  text-shadow: 0 1px 4px var(--c-purple-heading)aa;
}
/* Image */
.project-image {
  width: 100%;
  max-width: 180px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px #0003;
  object-fit: cover;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 5px solid var(--c-purple-accent-2);
  box-shadow: 0 0 16px var(--c-rose-lumineux)88, 0 2px 8px #0003;
  transition: box-shadow 0.3s, border-color 0.3s;
}
/* Effet au survol de l'image */
.project-card:hover .project-image {
  border-color: #f855f0;
  box-shadow: 0 0 32px #a400ffcc, 0 2px 20px rgba(253, 243, 214, 0.767);
}
/* Titres et textes */
.project-card h3,
.project-card p,
.project-card .date {
  color: var(--color-violet-sombre);
  text-shadow: 0 2px 8px var(--c-purple-heading)55, 0 1px 0 var(--c-rose-vif)cc;
}
</style>

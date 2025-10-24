<template>
  <div class="main-container">
    <div class="page-width">
    <!-- Fond étoilé général -->
    <StarBackground />
  <!-- Partie Présentation -->
    <section id="presentation" class="bloc presentation">
      <div class="section-inner">
        <h2 class="section-title">Présentation</h2>
        <img
          src="../assets/image/photo-de-profil-moi-draw.JPG"
          alt="Portrait circulaire de Cyrine"
          class="avatar"
          loading="lazy"
          role="button"
          aria-label="Avatar – cliquer pour révéler un message secret"
          @click="showSecret = !showSecret"
        />
        <p>
          ✨ Bonjour, je m’appelle <strong>Cyrine</strong>.<br>
          Étudiante en droit et passionnée de développement web,<br>
          je cultive un univers où <em>rigueur</em> et <em>créativité</em> se rencontrent.
        </p>
        <p>
          À travers ce portfolio, je partage mes projets toujours animés par la volonté d’apprendre et de progresser.
        </p>
        <p>
          Bienvenue dans mon espace, où le code devient une musique<br>
          et chaque ligne une note qui construit mon avenir. 🎶💻
        </p>
        <div
          v-if="showSecret"
          class="secret-message"
          @click="goTo404"
          style="cursor:pointer;"
          title="Lien secret !"
        >
          🌟 Tu as trouvé la Ballerine cosmique ! Clique ici... 🌟
        </div>
      </div>
    </section>
    <!-- Partie Créations -->
    <section id="creations" class="bloc project-gallery">
      <div class="section-inner">
        <h2 class="section-title">Mes créations</h2>
        <div class="cards-row">
          <ProjectCard
            v-for="(item, index) in projects"
            :key="index"
            :project="item"
            @open="openModal"
          />
        </div>
        <ProjectModal
          v-if="showModal && selectedProject"
          :project="selectedProject"
          @close="closeModal"
        />
      </div>
    </section>
  <!-- Partie Contact -->
    <section id="contact" class="bloc contact">
      <div class="section-inner">
        <h2 class="section-title">Contact</h2>
        <ContactForm/>
      </div>
    </section>
    </div>
  </div>
</template>

<script setup>
import ProjectModal from '../components/ProjectModal.vue'
import ProjectCard from '../components/ProjectCard.vue'
import ContactForm from '../components/Contactform.vue'
import StarBackground from '../components/StarBackground.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

//Mes projets en phase Newbieeeee !
const projects = ref([
  {
    title: "Mon CV en HTML & CSS",
    image: "/Screenshot-mon-cv.png",
    date: "30/10/2024",
    tech: ["HTML", "CSS"],
    site: null,
    repo: "https://github.com/Cyrineb75/mon-devoir-cv"
  },
  {
    title: "Cahier des charges - La Socketerie",
    image: "/Screenshot-cahier-des-charges.png",
    date: "02/12/2024",
    tech: ["PDF", "Analyse", "Conception"],
    site: "./devoir-cahier-des-charges.pdf",
  },
  {
    title: "Dynamiser un espace commentaire",
    image: "/Screenshot-dynamiser-js.png",
    date: "11/08/2025",
    tech: ["HTML", "CSS", "JavaScript"],
    site: null,
    repo: "https://github.com/Cyrineb75/Dynamiser-avec-JS",
  },
])

//Gestion de la modal
const showModal = ref(false)
const selectedProject = ref(null)

function openModal(project) {
  selectedProject.value = project
  showModal.value = true
}
function closeModal() {
  showModal.value = false
  selectedProject.value = null
}

// Ballerine secret surprise ! 
const showSecret = ref(false)
const router = useRouter()

function goTo404() {
  router.push({ name: 'NotFound', query: { secret: 'true' } })
}

</script>

<style scoped>
/* Fond général */
.main-container {
  position: relative;
  padding: 32px 40px 0 40px;
  min-height: 100vh;
  border: 3px solid var(--color-violet-fluo, #a400ff);
  box-shadow: 0 0 32px var(--color-violet-fluo, #a400ff);
  border-radius: 24px;
  overflow: hidden;
  /* image de fond de l'intro nuit étoilé */
  background:
    url('../assets/image/stars.png') center/cover no-repeat,
    var(--c-gradient-surface);
}

/* Effet ciel étoilé */
.main-container::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}



/* Contraste texte*/
.bloc p,
.project-card p {
  color: var(--c-text-paragraph);
}


.cards-row {
  display: flex;
  gap: 32px;
  justify-content: center;
  align-items: stretch;
  margin-top: 28px;
  flex-wrap: wrap;
}

.avatar {
  display: block;
  margin: 0 0 0 auto ; 
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid var(--c-rose-lumineux);
  box-shadow: 0 2px 12px rgba(71,42,102,0.55);
  transition: transform 0.35s cubic-bezier(.4,1.8,.3,1), box-shadow 0.35s, border-color 0.35s;
  cursor: pointer;
}

.avatar:hover {
  transform: scale(1.07);
  border-color: var(--color-or-doux, #f1f395);
  box-shadow: 0 9px 58px rgba(164,0,255,0.45), 0 0 28px rgba(241,243,149,0.25);
}

/* Focus accessible (clavier) */
.avatar:focus-visible {
  outline: 3px solid var(--color-violet-fluo);
  outline-offset: 4px;
}


/* Cartes projets */
.project-card {
  /* Fond  clair cartes */
  background: linear-gradient(120deg, var(--c-violet-medium) 60%, var(--c-violet-bright) 100%);
  color: #fff;
  flex: 0 1 260px;
  max-width: 260px;
  border: 2px solid var(--color-violet-clair);
  cursor: pointer;
  transition: box-shadow .2s, transform .2s;
  padding: 22px 18px;
  border-radius: 14px;
  box-shadow: 0 2px 16px #0002;
  text-align: center;
}
.project-card:hover {
  box-shadow: 0 6px 32px var(--c-violet-medium)aa;
  transform: translateY(-6px) scale(1.03);
  border-color: var(--c-rose-lumineux);
}
.project-card img {
  width: 100%;
  max-width: 220px;
  border-radius: 10px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px #0003;
}
.project-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: var(--c-rose-lumineux);
  margin: 10px 0 6px 0;
}
.project-card p {
  font-size: 1rem;
  opacity: 0.85;
}


/* Présentation  */
.bloc.presentation {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 240px; /* texte | avatar */
  gap: 32px;
  align-items: start;
  overflow: visible;
}

/* Wrapper interne pour alignement commun des blocs de titres et contenu */
.bloc.presentation .section-inner {
  display: contents; 
}


/* Titre section présentation */
.bloc.presentation .section-title {
  grid-column: 1 / 2;
  margin: 0 0 18px 0;
  text-align: left;
  width: 100%;
  max-width: 520px;
}

.bloc.presentation::before {
  content: "";
  position: absolute;
  top: -28px;
  left: -28px;
  width: 160px;
  height: 160px;
  background: radial-gradient(circle at 40% 40%, rgba(226,182,255,0.55), rgba(164,0,255,0) 70%);
  filter: blur(6px);
  opacity: .6;
  pointer-events: none;
}


.bloc.presentation p {
  text-align: left;
  margin: 0 0 14px 0;
  font-size: 1.04rem;
  letter-spacing: .3px;
  grid-column: 1 / 2;
  max-width: 620px;
}

/* Avatar décoré */
.bloc.presentation .avatar {
  grid-column: 2 / 3;
  grid-row: 1 / span 5;
  justify-self: end;
  align-self: start;
  position: relative;
  z-index: 1;
  margin-top: 4px;
}
.bloc.presentation .avatar::after {
  content: "";
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  background: conic-gradient(from 120deg, rgba(164,0,255,.6), rgba(226,176,255,.1), rgba(164,0,255,.6));
  filter: blur(10px);
  opacity: .55;
  z-index: -1;
  animation: rotateAura 6s linear infinite;
}

@keyframes rotateAura {
  to { transform: rotate(360deg); }
}

/* Secret message aligné sous les paragraphes */
.bloc.presentation .secret-message { grid-column: 1; }

@media (max-width: 840px) {
  .bloc.presentation { grid-template-columns: 1fr; }
  .bloc.presentation .section-title { text-align: center; max-width: none; }
  .bloc.presentation p,
  .bloc.presentation .secret-message { text-align: center; grid-column: 1; }
  .bloc.presentation .avatar { margin: 0 auto 18px auto; grid-column: 1; grid-row: auto; }
}

/* Créations (galerie projets) */
.bloc.project-gallery {
  position: relative;
  overflow: visible;
  padding-top: 24px;
}

.bloc.project-gallery .section-title {
  margin: 0 0 18px 0;
  text-align: left;
  width: 100%;
  max-width: 520px;
}

.bloc.project-gallery::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 10%, rgba(164,0,255,0.18), transparent 70%),
              radial-gradient(circle at 10% 85%, rgba(226,176,255,0.15), transparent 75%);
  pointer-events: none;
  z-index: 0;
}


/* Alignement des cartes en ligne*/
.bloc.project-gallery .cards-row {
  position: relative;
  z-index: 1;
  margin-top: 24px;
  padding-top: 12px;
}

/* Accent en dessous des cartes */
.bloc.project-gallery .cards-row::before {
  content: "";
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-rose-poudre)88, transparent);
  pointer-events: none;
}

/* Ajustements visuels des project-card  */
:deep(.project-gallery .project-card) {
  border: 2px solid rgba(226,176,255,0.35);
  background: linear-gradient(150deg,  rgba(0, 255, 170, 0.35), rgba(247, 16, 247, 0.719));
  backdrop-filter: blur(8px);
  transition: transform .35s, box-shadow .35s, border-color .3s;
}

:deep(.project-gallery .project-card:hover) {
  border-color: var(--color-rose-poudre);
  box-shadow: 0 6px 20px var(--color-violet-fluo)55, 0 0 28px var(--color-rose-poudre)99;
}

@media (max-width: 880px) {
  .bloc.project-gallery { padding-top: 28px; }
  .bloc.project-gallery .section-title { text-align: center; }
  .bloc.project-gallery .cards-row { margin-top: 18px; }
}

/* Contact section */
.bloc.contact .section-title {
  text-align: left;
  width: 100%;
  max-width: 520px;
  margin: 0 0 16px 0;
}
.bloc.contact { position: relative; overflow: visible; }
.bloc.contact::before {
  content: "";
  position: absolute;
  top: -28px;
  left: -28px;
  width: 160px;
  height: 160px;
  background: radial-gradient(circle at 40% 40%, rgba(226,182,255,0.55), rgba(164,0,255,0) 70%);
  filter: blur(6px);
  opacity: .6;
  pointer-events: none;
  z-index: 0;
}
/* Wrapper interne générique pour les autres sections */
.bloc.project-gallery .section-inner,
.bloc.contact .section-inner { width: 100%; position: relative; }

.secret-message {
  margin-top: 18px;
  color: var(--color-or-soft, #dbc858);
  font-weight: bold;
  font-size: 1.1em;
  text-shadow: 0 0 8px var(--color-violet-fluo, #a400ff);
  animation: fadeInUp 0.7s;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px);}
  to { opacity: 1; transform: translateY(0);}
}

/* Styles responsives pour petits écrans */

@media (max-width: 700px) { }
</style>
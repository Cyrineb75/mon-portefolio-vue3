<template>
  <div class="intro-root">
  <!-- Intro d'accueil -->
  <div 
    class="intro-bg" 
    :class="{ 'fade-out': fadeOut }"
    v-if="visible"
  >
    <div class="stars"></div>

  <!-- Titre avant ouverture -->
    <h1 class="intro-title" v-if="!ballerineVisible">
      Mon Portfolio
    </h1>

  <!-- Bandeau texte -->
    <div 
      class="intro-message-top"
      :class="{ 'fade-out': lastVideoVisible }"
      v-if="showIntroMessage && ballerineVisible"
    >
      <p>
        Bienvenue,<br>
        Installez-vous confortablement.<br>
        Mon univers s’ouvre doucement,<br>
        au doux rythme d'une boîte à musique.<br>
        Ici, chaque projet est une petite danse,<br>
        disciplinée, imparfaite mais sincère.<br>
        Merci d’entrer dans mon portfolio !
      </p>
    </div>

  <!-- Boîte fermée -->
    <div class="music-box-bottom" v-if="!ballerineVisible">
      <img src="../assets/image/closebox.jpeg" alt="Boîte à musique" class="box-img-bottom" />
      <button class="open-btn" @click="ouvrirBoite">Ouvrir la boîte</button>
    </div>

  <!-- Image ballerine -->
    <transition name="fade">
      <img 
        v-if="ballerineVisible && !videoVisible" 
        src="../assets/image/ballerina.jpeg" 
        alt="Ballerine" 
        class="ballerine"
      />
    </transition>

  <!-- Première vidéo -->
    <transition name="fade">
      <video
        v-if="videoVisible && !lastVideoVisible"
        src="../assets/video/videoballerine.mp4"
        class="ballerine"
        autoplay
        muted
        loop
      ></video>
    </transition>

  <!-- Vidéo de fin -->
    <transition name="fade">
      <video
        v-if="lastVideoVisible"
        src="../assets/video/ballerineend.mp4"
        class="ballerine ballerine-end"
        autoplay
        muted
        @ended="afficherBienvenue" 
      ></video>
    </transition>

  <!-- Musique on/off -->
    <button 
      v-if="ballerineVisible" 
      class="mute-btn" 
      @click="toggleMusique"
    >
      {{ musiqueActive ? 'Couper la musique' : 'Activer la musique' }}
    </button>

  <!-- Passer l'intro -->
    <button 
      v-if="visible" 
      class="skip-btn" 
      @click="passerIntro"
    >
      Passer l'intro
    </button>

  <!-- Message final -->
    <div v-show="showWelcome" class="galaxy-welcome">
      <span>✨ BIENVENUE ✨</span>
    </div>
  </div>

  <!-- Rideau -->
  <div v-if="showRideau" class="rideau-transition">
    <img src="../assets/image/rideau.png" alt="Rideau rouge" class="img-rideau" />
  </div>
  </div>
</template>

<script setup>
import musiqueFond from '../assets/fond/son-boite-a-musique.mp3'
import clickSoundSrc from '../assets/son/old-radio-button-click.mp3'
import { ref } from 'vue'

const emit = defineEmits(['ouvrir'])

const audio = new Audio(musiqueFond)
audio.loop = true
const clickSound = new Audio(clickSoundSrc)

const ballerineVisible = ref(false)
const fadeOut = ref(false) // utilisé pour l'animation de sortie 
const videoVisible = ref(false)
const visible = ref(true)
const lastVideoVisible = ref(false)
const musiqueActive = ref(true)
const showWelcome = ref(false)
const showIntroMessage = ref(true)
const showRideau = ref(false)

// Ouverture de la boîte: image -> vidéo -> vidéo fin -> bienvenue
let tPhoto, tVideo, tSwitch
function ouvrirBoite() {
  clickSound.play()
  tPhoto = setTimeout(() => { audio.play(); }, 2000)
  ballerineVisible.value = true
  showIntroMessage.value = true
  tVideo = setTimeout(() => {
    videoVisible.value = true
    tSwitch = setTimeout(() => {
      videoVisible.value = false
      lastVideoVisible.value = true
      showIntroMessage.value = false
    }, 12000)
  }, 1000)
}

//fonction pour couper ou remettre la musique
function toggleMusique() {
  if (musiqueActive.value) {
    audio.pause()
    musiqueActive.value = false
  } else {
    audio.play()
    musiqueActive.value = true
  }
}

function clearAllTimers() {
  [tPhoto, tVideo, tSwitch, tBienvenue, tRideau].forEach(id => id && clearTimeout(id))
}

function passerIntro() {
  clearAllTimers()
  audio.pause()
  fadeOut.value = true
  // laisse la classe fade-out jouer puis cache
  setTimeout(() => {
    visible.value = false
    emit('ouvrir')
  }, 700)
}
// Affichage du "Bienvenue" après la dernière vidéo

// Puis transition rideau et fermeture
let tBienvenue, tRideau
function afficherBienvenue() {
  lastVideoVisible.value = false
  showWelcome.value = true
  tBienvenue = setTimeout(() => {
    showWelcome.value = false
    audio.pause()
    showRideau.value = true
    tRideau = setTimeout(() => {
      showRideau.value = false
      visible.value = false
      emit('ouvrir')
    }, 2000)
  }, 3000)
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.intro-root { position: relative; }
/* Fond intro */
.intro-bg {
  position: fixed; inset:0;
  background: var(--c-bg-intro);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  z-index: 2000;
  animation: fadeIn 1.5s ease forwards;
}
/* Disparition fondu */
.fade-out {
  animation: fadeOut 1s forwards;
}
/* animation Étoiles */
.stars {
  position: absolute; inset:0;
  background: transparent url('../assets/image/stars.png') repeat;
  animation: starsAnim 15s linear infinite;
}

@keyframes starsAnim {
  100% { background-position: 500px 500px; }
}

/* Bouton ouvrir la boîte */
.open-btn {
  padding: 13px 32px;
  font-size: 1.1rem;
  border-radius: 7px;
  border: none;
  background: var(--c-button-base);
  color: var(--color-blanc);
  transition: background var(--transition-fast), transform var(--transition-fast);
  cursor:pointer;
}
.open-btn:hover { background: var(--c-button-hover); transform: translateY(-3px); }

/* Ballerine légère balancement */
@keyframes balancement {
  0%, 100% { transform: translateX(-50%) rotate(0deg); }
  50% { transform: translateX(-50%) rotate(2deg); }
}

.ballerine {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 250px;
  animation: balancement 4s ease-in-out infinite;
}

/* Disparition globale */
@keyframes fadeOut {
  to { opacity: 0; visibility: hidden; }
}

/* Bouton mute */
.mute-btn {
  position: fixed;
  top: 30px;
  right: 40px;
  z-index: 3000;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  background: var(--c-danger);
  color: var(--color-blanc);
  transition: background var(--transition-fast), transform var(--transition-fast);
  cursor: pointer;
}
.mute-btn:hover { background: var(--c-danger-light); transform: scale(1.05); }

/* Bouton passer */
.skip-btn {
  position: fixed;
  top: 30px;
  left: 40px;
  z-index: 3000;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  background: var(--c-button-base);
  color: var(--color-blanc);
  cursor: pointer;
  transition: background var(--transition-fast), transform var(--transition-fast);
}
.skip-btn:hover { background: var(--c-button-hover); transform: translateY(-3px); }


/* Animation message d'introduction */

/* Bandeau principal */
.intro-message-top {
  position: absolute;
  top: 0;
  left: 50%;
  right: auto !important;
  transform: translateX(-50%) !important;
  width: 90vw;
  max-width: 700px;
  background: rgba(18,15,40,0.40);
  border-radius: 0 0 18px 18px;
  box-shadow:
    0 0 14px 4px rgba(255,255,255,0.85),
    0 0 40px 14px rgba(255,255,255,0.55),
    0 0 70px 26px rgba(255,255,255,0.30),
    0 0 100px 40px rgba(255,255,255,0.18);
  padding: 1.2em 2em;
  z-index: 10;
  text-align: center;
  animation: fadeInIntro 1.2s cubic-bezier(.6,.2,.4,1) both, moonWhitePulse 4s ease-in-out infinite alternate;
  transition: opacity 1s;
  border: 1px solid rgba(255,255,255,0.25);
}

/* Fade bandeau */
.intro-message-top.fade-out {
  opacity: 0;
}

/* Texte du bandeau */
.intro-message-top p {
  font-family: 'Orbitron', Arial, sans-serif;
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--c-text-glow);
  letter-spacing: 1px;
  margin: 0;
  text-shadow:
  0 0 20px var(--color-violet-fluo),
  0 4px 12px var(--c-purple-deep),
    0 0 2px #fff;
}

/* Apparition bandeau */
@keyframes fadeInIntro {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.98);
    filter: blur(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}


/* Boîte à musique fermé  avant ouverture */
.music-box-bottom {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
}

.box-img-bottom {
  width: 420px;
  margin-bottom: 1.2em;
}

/* Transitions fade (image/vidéos) */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

/* Texte "bienvenue" */
.galaxy-welcome {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  color: var(--c-text-glow);
  text-shadow:
  0 0 10px var(--color-violet-fluo),
  0 0 20px var(--c-cyan-neon),
  0 0 30px var(--c-cyan-neon),
  0 0 40px var(--c-cyan-neon);
  opacity: 1;
  transition: opacity 1s;
  animation: welcomeZoom 1.2s cubic-bezier(.6,.2,.4,1) both;
}
/* Zoom "bienvenue" */
@keyframes welcomeZoom {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    filter: blur(0);
  }
}


/* Titre principal */
.intro-title {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Orbitron', 'Montserrat', Arial, sans-serif;
  font-size: 2.7rem;
  color: #f5f6fa;
  letter-spacing: 2px;
  margin: 0;
  padding: 0.7em 1.5em;
  background: linear-gradient(90deg, rgba(40,31,170,0.27) 0%, rgba(172,67,149,0.27) 100%);
  border-radius: 16px;
  border: 2px solid var(--c-pink-soft-bg);
  z-index: 12;
  box-shadow:
    0 0 14px 4px rgba(255,255,255,0.85),
    0 0 40px 14px rgba(255,255,255,0.55),
    0 0 70px 26px rgba(255,255,255,0.30),
    0 0 100px 40px rgba(255,255,255,0.18);
  text-shadow:
    0 0 6px rgba(255,255,255,0.55),
    0 0 14px rgba(255,255,255,0.30),
    0 2px 6px rgba(0,0,0,0.35);
  /* halo animé doux */
  animation: moonWhitePulse 3.8s ease-in-out infinite alternate;
}

/* animation Halo blanc pulsé (titre + bandeau) */
@keyframes moonWhitePulse {
  0% {
    box-shadow:
      0 0 50px 3px rgba(255,255,255,0.90),
      0 0 26px 9px rgba(255,255,255,0.55),
      0 0 50px 18px rgba(255,255,255,0.28),
      0 0 80px 28px rgba(255,255,255,0.15);
  }
  100% {
    box-shadow:
      0 0 56px 10px rgba(255,255,255,0.98),
      0 0 40px 14px rgba(255,255,255,0.70),
      0 0 72px 30px rgba(255,255,255,0.35),
      0 0 70px 46px rgba(255,255,255,0.22);
  }
}


/* Effet néon boutons*/
.open-btn:active,
.open-btn:focus,
.mute-btn:active,
.mute-btn:focus,
.skip-btn:active,
.skip-btn:focus {
  outline: none;
  box-shadow:
    0 0 0 4px var(--c-pink-neon)88,
    0 0 12px 4px var(--color-violet-fluo)88,
    0 0 24px 8px var(--c-cyan-neon)55;
  border: 2px solid var(--c-pink-neon);
  transition: box-shadow 0.2s, border 0.2s;
}
/* Effet néon boutons au survol */
.open-btn:hover,
.open-btn:active,
.open-btn:focus,
.mute-btn:hover,
.mute-btn:active,
.mute-btn:focus,
.skip-btn:hover,
.skip-btn:active,
.skip-btn:focus {
  outline: none;
  border: 2px solid var(--c-pink-neon);
  box-shadow:
    0 0 12px 2px #ff4fd8,
    0 0 24px 6px #a400ff,
    0 0 48px 12px #00cfff,
    0 0 80px 24px #ff4fd8;
  animation: neonPulse 1.2s infinite alternate;
  transition: box-shadow 0.2s, border 0.2s;
}
/* Animation néon pulsante boutons */
@keyframes neonPulse {
  0% {
    box-shadow:
  0 0 12px 2px var(--c-pink-neon),
  0 0 24px 6px var(--color-violet-fluo),
  0 0 48px 12px var(--c-cyan-neon),
  0 0 80px 24px var(--c-pink-neon);
  }
  100% {
    box-shadow:
  0 0 24px 4px var(--c-pink-neon),
  0 0 48px 12px var(--color-violet-fluo),
  0 0 96px 24px var(--c-cyan-neon),
  0 0 160px 48px var(--c-pink-neon);
  }
}

/* Transition tombé du rideau */
.rideau-transition {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: transparent;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  pointer-events: none;
}

.img-rideau {
  width: 100%; 
  height: 100vh;
  max-width: 100%;
  object-fit: cover;
  animation: rideauClose 2s cubic-bezier(.6,.2,.4,1) forwards;
}

@keyframes rideauClose {
  from {
    transform: translateY(-100%);
    opacity: 0.7;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive (petits écrans) */
@media (max-width: 700px) {
  .intro-title {
    font-size: 2rem;
    padding: 0.6em 1em;
    top: 20px;
  }
  .intro-message-top {
    top: 86px; /* laisse la place au titre */
    width: 100%;
    max-width: 100%;
    border-radius: 0 0 16px 16px;
    padding: 0.9em 1.2em;
  }
  .intro-message-top p { font-size: 1.05rem; line-height: 1.55; }

  /* Boutons déplacés en bas pour ne pas recouvrir le titre / message */
  .mute-btn, .skip-btn {
    top: auto;
    bottom: 20px;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: calc(100% - 48px);
    max-width: 340px;
    font-size: 0.95rem;
    padding: 12px 16px;
  }
  .mute-btn { bottom: 78px; }

  /* Boîte à musique réduite */
  .box-img-bottom { width: 300px; }
  .ballerine { max-width: 80%; }
}

@media (max-width: 420px) {
  .intro-title { font-size: 1.7rem; letter-spacing: 1px; }
  .intro-message-top p { font-size: 0.95rem; }
  .mute-btn, .skip-btn { width: calc(100% - 36px); max-width: 320px; }
}
</style>
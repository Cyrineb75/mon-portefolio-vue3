<template>
  <div class="star-bg">
    <div class="shooting-star"></div>
  </div>
</template>

<style scoped>
/* Fond étoilé avec étoile filante */
.star-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  background: url('../assets/image/stars.png') center/cover no-repeat;
}
/* Étoile filante animée */
.shooting-star {
  position: absolute;
  top: 40%;
  left: 70%;
  width: 2px;
  height: 80px;
  background: linear-gradient(300deg, white 60%, transparent 100%);
  opacity: 0.7;
  border-radius: 2px;
  z-index: 1;
  animation: shooting 3s linear infinite;
}
@keyframes shooting {
  0% {
    opacity: 0;
    transform: translateX(0) translateY(0) rotate(45deg);
  }
  10% {
    opacity: 1;
  }
  80% {
    opacity: 1;
    transform: translateX(-400px) translateY(-200px) rotate(45deg);
  }
  100% {
    opacity: 0;
    transform: translateX(-500px) translateY(-250px) rotate(45deg);
  }
}
</style>
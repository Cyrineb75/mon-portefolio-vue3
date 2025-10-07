<template>
  <footer class="footer">
    <div>
  <!-- GitHub (lien vers mon profil) -->
      <a href="https://github.com/Cyrineb75" target="_blank" rel="noopener">
        <img src="/github-sign.png" alt="GitHub" class="footer-icon" /> GitHub
      </a>
  <!-- LinkedIn (je n'ai pas de compte) -->
      <a href="https://linkedin.com" target="_blank" rel="noopener">
        <img src="/linkedin.png" alt="LinkedIn" class="footer-icon" /> LinkedIn
      </a>
    </div>
    <small>Dernière mise à jour : {{ lastUpdate }}</small>
  </footer>
</template>

<script setup> 
const lastUpdate = new Date().toLocaleDateString("fr-FR")
</script>

<style scoped>
.footer {
  margin-top: 50px;
  padding: 20px;
  text-align: center;
  background: var(--color-violet-sombre, #1d1145); 
  border-top: 2px solid var(--color-rose-poudre, #e2b0ff);
  color: var(--color-or-soft, #dbc858);
  box-shadow: 0 -2px 16px var(--color-rose-poudre, #e2b0ff);
  font-size: 1.05em;
  letter-spacing: 0.5px;
}
/* Style des liens */
.footer a {
  margin: 0 10px;
  color: var(--color-violet-fluo, #a400ff);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
/* Effet au survol des liens */
.footer a:hover {
  color: var(--color-violet-median, #472a66);
  text-decoration: underline;
  text-shadow: 0 0 8px var(--color-rose-poudre, #e2b0ff);
}
/* Style pour la date de mise à jour */
.footer small {
  display: block;
  margin-top: 10px;
  color: var(--color-rose-poudre, #e2b0ff); 
  opacity: 0.95;
  font-weight: 500;
}
/* Style des icônes dans le footer */
.footer-icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-right: 8px;
  border: 2px solid var(--color-rose-poudre, #e2b0ff);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--color-rose-poudre, #e2b0ff);
  background: #fff;
}
</style>

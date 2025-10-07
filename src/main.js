// Point d'entrée principal de l'application Vue + configuration du routeur
import { createApp } from 'vue'
import App from '../src/App.vue'
import router from '../src/router'
import './style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')


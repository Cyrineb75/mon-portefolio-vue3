// Configuration du routeur principal de l’application
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import NotFound from '../pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
})

export default router

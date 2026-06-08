import { createRouter, createWebHistory } from 'vue-router';
import Landing from '../App.vue';
import Auth from '../pages/Auth.vue';
import Generate from '../pages/Generate.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Landing },
    { path: '/auth', component: Auth },
    { path: '/generate', component: Generate },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0 };
  },
});

export default router;

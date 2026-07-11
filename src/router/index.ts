import { createRouter, createWebHistory } from 'vue-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import Landing from '../pages/Landing.vue';
import Auth from '../pages/Auth.vue';
import Generate from '../pages/Generate.vue';
import Dashboard from '../pages/Dashboard.vue';
import DashboardMain from '../components/Dashboard/main.vue';
import ScheduledPosts from '../components/Dashboard/scheduledPosts.vue';
import ContentCalendar from '../components/Dashboard/contentCalendar.vue';
import BrandKit from '../components/Dashboard/brandKit.vue';
import Credits from '../components/Dashboard/credits.vue';
import Referrals from '../components/Dashboard/referrals.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Landing,
    },
    {
      path: '/auth',
      component: Auth,
    },
    {
      path: '/generate',
      component: Generate,
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard',
      component: Dashboard,
      redirect: '/dashboard/main',
      meta: { requiresAuth: true },
      children: [
        {
          path: 'main',
          component: DashboardMain,
        },
        {
          path: 'scheduled-posts',
          component: ScheduledPosts,
        },
        {
          path: 'calendar',
          component: ContentCalendar,
        },
        {
          path: 'brand-kit',
          component: BrandKit,
        },
        {
          path: 'credits',
          component: Credits,
        },
        {
          path: 'referrals',
          component: Referrals,
        },
      ],
    },
  ],

  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0 };
  },
});

let authInitialized = false;

function waitForAuth() {
  return new Promise((resolve) => {
    if (authInitialized) {
      resolve(auth.currentUser);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      authInitialized = true;
      unsubscribe();
      resolve(user);
    });
  });
}

// Global route guard
router.beforeEach(async (to) => {
  await waitForAuth();

  const user = auth.currentUser;

  if (to.meta.requiresAuth && !user) {
    return '/auth';
  }

  if (to.path === '/auth' && user) {
    return '/dashboard';
  }

  return true;
});

export default router;
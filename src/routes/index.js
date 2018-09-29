/* ============
 * Routes File
 * ============ */
import store from '@/store';

export default [
  {
    path: '/',
    name: 'home.index',
    component: () => import('@/views/Home/Index.vue')
  },

  {
    path: '/login',
    name: 'login.index',
    meta: {
      guest: true
    },
    component: () => import('@/views/Login/Index.vue')
  },

  {
    path: '/logout',
    name: 'logout',
    meta: {
      auth: true
    },
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('auth/logout');
      const authRequiredOnPreviousRoute = routeFrom.matched.some(
        route => route.meta.auth
      );
      // Navigate back to previous page, or home as a fallback
      next(
        authRequiredOnPreviousRoute ? { name: 'home.index' } : { ...routeFrom }
      );
    }
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  },

  {
    path: '*',
    redirect: '404'
  }
];

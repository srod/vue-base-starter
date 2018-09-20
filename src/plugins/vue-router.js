/* ============
 * Vue Router
 * ============ */

import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/routes";
import store from "@/store";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters["auth/loggedIn"];
  const authRequired = to.matched.some(route => route.meta.auth);

  if (authRequired && !loggedIn) {
    // If the user is not authenticated and visits
    // a page that requires authentication, redirect to the login page
    return redirectToLogin();
  }

  // If auth is required and the user is logged in...
  if (authRequired && loggedIn) {
    // Validate the local user token...
    return store.dispatch("auth/validate").then(validUser => {
      // Then continue if the token still represents a valid user,
      // otherwise redirect to login.
      validUser ? next() : redirectToLogin();
    });
  }

  if (to.matched.some(m => m.meta.guest) && loggedIn) {
    // If the user is authenticated and visits
    // a guest page, redirect to the dashboard page
    return next({
      name: "home.index"
    });
  }

  next();

  function redirectToLogin() {
    // Pass the original route to the login component
    next({ name: "home.index", query: { redirectFrom: to.fullPath } });
  }
});

Vue.router = router;

export default {
  router
};

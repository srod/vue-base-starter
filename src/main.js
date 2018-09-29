/* ============
 * Main File
 * ============ */

import Vue from 'vue';

/* ============
 * Plugins
 * ============ */

import { i18n, router } from './plugins';

/* ============
 * Main App
 * ============ */

import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');

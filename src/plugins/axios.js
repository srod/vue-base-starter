/* ============
 * Axios
 * ============ */

import Vue from 'vue';
import Axios from 'axios';
import store from '@/store';

Axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      store.dispatch('auth/logout');
    }

    return Promise.reject(error);
  }
);

// Bind Axios to Vue.
Vue.$http = Axios;
Object.defineProperty(Vue.prototype, '$http', {
  get() {
    return Axios;
  }
});

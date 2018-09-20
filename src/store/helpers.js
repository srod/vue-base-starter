import { mapState, mapGetters } from "vuex";
import Axios from "axios";

export const authComputed = {
  ...mapState("auth", {
    currentUser: state => state.currentUser
  }),
  ...mapGetters("auth", ["loggedIn"])
};

export function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}

export function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

export function setDefaultAuthHeaders(state) {
  Axios.defaults.headers.common.Authorization = state.currentUser
    ? `Bearer ${state.currentUser.token}`
    : "";
}

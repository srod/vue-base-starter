/* ============
 * Actions for the auth module
 * ============ */

// import Vue from "vue";
import { setDefaultAuthHeaders } from "@/store/helpers";

export const init = ({ state, dispatch }) => {
  setDefaultAuthHeaders(state);
  dispatch("validate");
};

export const register = ({ commit }) => {
  commit("login", "RandomGeneratedToken");
  // Vue.router.push({
  //   name: "home.index"
  // });
};

export const login = ({ commit, dispatch, getters }) => {
  if (getters.loggedIn) return dispatch("validate");
  commit("set_user", "RandomGeneratedToken");
  dispatch("account/find");
  // Vue.router.push({
  //   name: "home.index"
  // });
};

export const logout = ({ commit }) => {
  commit("set_user", null);
};

// Validates the current user's token and refreshes it
// with new data from the API.
export const validate = ({ state }) => {
  if (!state.currentUser) return Promise.resolve(null);
  // TODO:
  return Promise.resolve(true);
};

export default {
  init,
  register,
  login,
  logout,
  validate
};

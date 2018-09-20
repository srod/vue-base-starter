/* ============
 * Getters for the auth module
 * ============ */

export default {
  loggedIn(state) {
    return !!state.currentUser;
  }
};

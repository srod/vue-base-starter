/* ============
 * Mutations for the auth module
 * ============ */

import { saveState, setDefaultAuthHeaders } from "@/store/helpers";

export const set_user = (state, user) => {
  state.currentUser = user;
  saveState("auth.currentUser", user);
  setDefaultAuthHeaders(state);
};

export default {
  set_user
};

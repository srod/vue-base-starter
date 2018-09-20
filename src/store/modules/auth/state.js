/* ============
 * State of the auth module
 * ============ */
import { getSavedState } from "@/store/helpers";

export default {
  currentUser: getSavedState("auth.currentUser")
};

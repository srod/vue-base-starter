/* ============
 * Vuex Store
 * ============ */

import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

import modules from "./modules";

const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
  modules,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

// Automatically run the `init` action for every module,
// if one exists.
for (const moduleName of Object.keys(modules)) {
  if (modules[moduleName].actions && modules[moduleName].actions.init) {
    store.dispatch(`${moduleName}/init`);
  }
}

export default store;

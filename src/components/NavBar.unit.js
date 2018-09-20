import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Vuex from "vuex";

import NavBar from "./NavBar.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("@/compnents/NavBar.vue", () => {
  let actions;
  let mutations;
  let getters;
  let state;
  let store;

  beforeEach(() => {
    actions = {};
    mutations = {};
    getters = {
      loggedIn() {
        return true;
      }
    };
    state = { auth: { authenticated: false } };
    store = new Vuex.Store({
      modules: {
        auth: {
          namespaced: true,
          getters,
          actions,
          mutations,
          state
        }
      }
    });
  });

  test("should render be ok", () => {
    const wrapper = shallowMount(NavBar, {
      localVue,
      store,
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    expect(wrapper).toBeTruthy();
  });
});

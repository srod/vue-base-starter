import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";

import HomeIndex from "./Index.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: HomeIndex
  }
];
const router = new VueRouter({
  routes
});

describe("@/views/Home/Index.vue", () => {
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
    const wrapper = shallowMount(HomeIndex, { localVue, store, router });
    expect(wrapper).toBeTruthy();
  });
});

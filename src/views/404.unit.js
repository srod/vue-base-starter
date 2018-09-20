import { shallowMount } from "@vue/test-utils";

import NotFound from "./404.vue";

describe("@/views/404.vue", () => {
  test("should render be ok", () => {
    const wrapper = shallowMount(NotFound);
    expect(wrapper).toBeTruthy();
  });
});

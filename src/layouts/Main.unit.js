import { shallowMount } from "@vue/test-utils";

import MainLayout from "./Main.vue";

describe("@/layouts/Main", () => {
  test("should render be ok", () => {
    const slotContent = "<p>Hello!</p>";
    const { element } = shallowMount(MainLayout, {
      slots: {
        default: slotContent
      }
    });
    expect(element.innerHTML).toContain(slotContent);
  });
});

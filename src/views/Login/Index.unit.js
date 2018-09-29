import { shallowMount } from '@vue/test-utils';

import LoginIndex from './Index.vue';

describe('@/views/Login/Index.vue', () => {
  test('should render be ok', () => {
    const { element } = shallowMount(LoginIndex);
    expect(element.textContent).toBe('Login');
  });
});

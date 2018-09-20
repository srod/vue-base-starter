import state from "./state";
import mutations from "./mutations";

describe("@/store/modules/auth/mutations", () => {
  test("set_user without token", () => {
    mutations.set_user(state);
    expect(state.currentUser).toBe(undefined);
  });

  test("set_user with token", () => {
    const user = { token: "string_token" };
    mutations.set_user(state, user);
    expect(state.currentUser).toEqual(user);
    expect(JSON.parse(localStorage.getItem("auth.currentUser"))).toEqual(user);
  });
});

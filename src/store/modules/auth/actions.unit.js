import state from "./state";
import actions from "./actions";

describe("@/store/modules/auth/actions", () => {
  test("init", () => {
    const dispatch = jest.fn();
    actions.init({ state, dispatch });
    expect(dispatch).toBeCalled();
  });

  test("register", () => {
    const commit = jest.fn();
    actions.register({ commit });
    expect(commit).toBeCalled();
  });

  test("login", () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const getters = jest.fn();
    actions.login({ commit, dispatch, getters });
    expect(commit).toBeCalled();
  });

  test("login with already logged in", () => {
    const commit = jest.fn();
    const dispatch = jest.fn();
    const getters = { loggedIn: true };
    actions.login({ commit, dispatch, getters });
    expect(dispatch).toBeCalled();
  });

  test("logout", () => {
    const commit = jest.fn();
    actions.logout({ commit });
    expect(commit).toBeCalled();
  });

  test("validate sould return null", done => {
    actions.validate({ state }).then(data => {
      expect(data).toBe(null);
      done();
    });
  });

  test("validate should return true", done => {
    state.currentUser = {};
    actions.validate({ state }).then(data => {
      expect(data).toBe(true);
      done();
    });
  });
});

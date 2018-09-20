import Vue from "vue";
import Axios from "axios";
import MockAdapter from "axios-mock-adapter";

import BaseApi from "./Api.js";

Vue.$http = Axios;

const fixture = {
  baseURL: "http://google.com",
  headers: {
    "api-version": 2
  },
  parameters: {
    foo: "bar"
  },
  removeParameters: ["foo"],
  data: [
    { id: 1, firstName: "Fred", lastName: "Flintstone" },
    { id: 2, firstName: "Wilma", lastName: "Flintstone" }
  ]
};

describe("@/api/Api.js", () => {
  describe("BaseApi()", () => {
    test("should instantiation be ok", () => {
      const api = new BaseApi("", {});
      expect(api).toBeDefined();
    });
  });

  describe("setBaseURL()", () => {
    test("should set the base URL", () => {
      new BaseApi("", {}).setBaseURL(fixture.baseURL);
      expect(Vue.$http.defaults.baseURL).toBe(fixture.baseURL);
    });
  });

  describe("removeBaseURL()", () => {
    test("should remove the base URL", () => {
      expect(Vue.$http.defaults.baseURL).toBe(fixture.baseURL);
      new BaseApi("", {}).removeBaseURL();
      expect(Vue.$http.defaults.baseURL).toBeUndefined();
    });
  });

  describe("setHeaders()", () => {
    test("should set the headers", () => {
      new BaseApi("", {}).setHeaders(fixture.headers);
      expect(
        Vue.$http.defaults.headers.common[Object.keys(fixture.headers)[0]]
      ).toBe(Object.values(fixture.headers)[0]);
    });
  });

  describe("removeHeaders()", () => {
    test("should remove the headers", () => {
      expect(
        Vue.$http.defaults.headers.common[Object.keys(fixture.headers)[0]]
      ).toBe(Object.values(fixture.headers)[0]);
      new BaseApi("", {}).removeHeaders(fixture.headers);
      expect(
        Vue.$http.defaults.headers.common[Object.keys(fixture.headers)[0]]
      ).toBeUndefined();
    });
  });

  describe("setParameters()", () => {
    test("should set the query parameters", () => {
      expect(
        new BaseApi("", {}).setParameters(fixture.parameters)
      ).toBeTruthy();
    });
  });

  describe("removeParameters()", () => {
    test("should remove the query parameters", () => {
      expect(
        new BaseApi("", {}).removeParameters(fixture.removeParameters)
      ).toBeTruthy();
    });
  });

  describe("setParameter()", () => {
    test("should throw an error when no query parameter", () => {
      expect(() => new BaseApi("", {}).setParameter()).toThrow();
    });

    test("should set the query parameter", () => {
      expect(new BaseApi("", {}).setParameter(fixture.parameters)).toBeTruthy();
    });
  });

  describe("removeParameter()", () => {
    test("should throw an error when no query parameter", () => {
      expect(() => new BaseApi("", {}).removeParameter()).toThrow();
    });

    test("should remove the query parameter", () => {
      expect(
        new BaseApi("", {}).removeParameter(fixture.removeParameters)
      ).toBeTruthy();
    });
  });

  describe("submit()", () => {
    test("should throw an error when no requestType", () => {
      expect(() => new BaseApi("", {}).submit()).toThrow(
        "requestType is missing"
      );
    });

    test("should throw an error when no url", () => {
      expect(() => new BaseApi("", {}).submit("get")).toThrow("url is missing");
    });

    test("should not be ok", async () => {
      const mock = new MockAdapter(Axios);
      mock.onGet("/").reply(500, "Server error");

      try {
        await new BaseApi("", {}).submit("get", "/");
      } catch (error) {
        expect(error).toBe("Server error");
      }
    });

    test("should be ok", async () => {
      const mock = new MockAdapter(Axios);
      mock.onGet("/").reply(200, fixture.data);

      const data = await new BaseApi("", {}).submit("get", "/");
      expect(data).toBe(fixture.data);
    });
  });

  describe("all()", () => {
    test("should be ok", async () => {
      const mock = new MockAdapter(Axios);
      mock.onGet("/").reply(200, fixture.data);

      const data = await new BaseApi("", {}).all();
      expect(data).toBe(fixture.data);
    });
  });

  describe("find()", () => {
    test("should throw an error when no id", () => {
      expect(() => new BaseApi("", {}).find()).toThrow("id is missing");
    });

    test("should be ok", async () => {
      const mock = new MockAdapter(Axios);
      mock.onGet("//1").reply(200, fixture.data);

      const data = await new BaseApi("", {}).find(1);
      expect(data).toBe(fixture.data);
    });
  });

  describe("create()", () => {
    test("should throw an error when no item", () => {
      expect(() => new BaseApi("", {}).create()).toThrow("item is missing");
    });

    test("should be ok", async () => {
      const mock = new MockAdapter(Axios);
      mock.onPost("/").reply(200, fixture.data);

      const data = await new BaseApi("", {}).create(fixture.data);
      expect(data).toBe(fixture.data);
    });
  });

  describe("update()", () => {
    test("should throw an error when no id", () => {
      expect(() => new BaseApi("", {}).update()).toThrow("id is missing");
    });

    test("should throw an error when no item", () => {
      expect(() => new BaseApi("", {}).update(1)).toThrow("item is missing");
    });

    test("should be ok", async () => {
      const mock = new MockAdapter(Axios);
      mock.onPut("//1").reply(200, fixture.data);

      const data = await new BaseApi("", {}).update(1, fixture.data);
      expect(data).toBe(fixture.data);
    });
  });

  describe("destroy()", () => {
    test("should throw an error when no id", () => {
      expect(() => new BaseApi("", {}).destroy()).toThrow("id is missing");
    });

    test("should be ok", async () => {
      const mock = new MockAdapter(Axios);
      mock.onDelete("//1").reply(200, fixture.data);

      const data = await new BaseApi("", {}).destroy(1);
      expect(data).toBe(fixture.data);
    });
  });

  describe("getParameterString()", () => {
    test("should be ok", () => {
      const parameters = new BaseApi("", {}).getParameterString();
      expect(parameters).toBe("");
    });

    test("should be ok", () => {
      const parameters = new BaseApi("", { foo: "bar" }).getParameterString();
      expect(parameters).toBe("?foo=bar");
    });
  });
});

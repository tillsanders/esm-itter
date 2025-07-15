import { describe, it, expect } from "vitest";
import { ESMitter, ESMitterEvent } from "../src/ESMitter.js";

describe("ESMitter", function tests() {
  describe("listeners", function () {
    it("returns an empty array if no listeners are specified", function () {
      const e = new ESMitter<{
        foo: ESMitterEvent<[string]>;
      }>();

      expect(e.listeners("foo")).is.a("array");
      expect(e.listeners("foo").length).equals(0);
    });

    it("returns an array of listener functions", function () {
      const e = new ESMitter<{
        foo: ESMitterEvent<[string]>;
      }>();

      function foo() {}

      e.on("foo", foo);
      expect(e.listeners("foo")).is.a("array");
      expect(e.listeners("foo").length).equals(1);
      expect(e.listeners("foo")).deep.equals([foo]);
    });

    it("is not vulnerable to modifications", function () {
      const e = new ESMitter();

      function foo() {}

      e.on("foo", foo);

      expect(e.listeners("foo")).deep.equals([foo]);

      e.listeners("foo").length = 0;
      expect(e.listeners("foo")).deep.equals([foo]);
    });
  });
});

import { describe, it, expect } from "vitest";
import { ESMitter, ESMitterEvent } from "../src/ESMitter.js";

describe("ESMitter", function tests() {
  describe("listenerCount", function () {
    it("returns the number of listeners for a given event", function () {
      const e = new ESMitter<{
        foo: ESMitterEvent<[string]>;
      }>();

      expect(e.listenerCount("foo")).equals(0);

      e.on("foo", function () {});
      expect(e.listenerCount("foo")).equals(1);
      e.on("foo", function () {});
      expect(e.listenerCount("foo")).equals(2);
    });
  });
});

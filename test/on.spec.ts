import { describe, it, expect } from "vitest";
import { ESMitter, ESMitterEvent } from "../src/ESMitter.js";

describe("ESMitter", function tests() {
  describe("on", function () {
    it("adds a listener for the specified event", function () {
      const e = new ESMitter<{
        foo: ESMitterEvent<[string]>;
      }>();

      expect(e.listenerCount("foo")).equals(0);

      e.on("foo", function () {});
      expect(e.listenerCount("foo")).equals(1);
    });
  });
});

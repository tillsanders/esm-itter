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

    it("returns the total number of listeners across all events when called without an argument", function () {
      const e = new ESMitter<{
        foo: ESMitterEvent<[string]>;
        bar: ESMitterEvent<[]>;
      }>();

      expect(e.listenerCount()).equals(0);

      e.on("foo", function () {});
      expect(e.listenerCount()).equals(1);

      e.on("foo", function () {});
      expect(e.listenerCount()).equals(2);

      e.on("bar", function () {});
      expect(e.listenerCount()).equals(3);

      e.removeAllListeners("foo");
      expect(e.listenerCount()).equals(1);

      e.removeAllListeners();
      expect(e.listenerCount()).equals(0);
    });

    it("counts once listeners towards the total", function () {
      const e = new ESMitter<{
        foo: ESMitterEvent<[]>;
        bar: ESMitterEvent<[]>;
      }>();

      e.once("foo", function () {});
      e.on("bar", function () {});
      expect(e.listenerCount()).equals(2);
    });
  });
});

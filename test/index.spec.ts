import { describe, it, expect } from "vitest";
import { ESMitter, ESMitterEvent } from "../src/index.js";

describe("ESMitter", function tests() {
  describe("index", function () {
    it("exports ESMitter", function () {
      const e = new ESMitter<{
        foo: ESMitterEvent<[string]>;
      }>();

      expect(e).toBeInstanceOf(ESMitter);
    });
  });
});

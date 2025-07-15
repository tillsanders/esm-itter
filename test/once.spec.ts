import { describe, it, expect, vi } from "vitest";
import { ESMitter, ESMitterEvent } from "../src/ESMitter.js";

describe("ESMitter", function tests() {
  describe("once", function () {
    it("only emits it once", function () {
      const e = new ESMitter<{
        foo: ESMitterEvent<[]>;
      }>();
      let calls = 0;

      e.once("foo", function () {
        calls++;
      });

      e.emit("foo");
      e.emit("foo");

      expect(e.listeners("foo").length).equals(0);
      expect(calls).equals(1);
    });

    it("only emits once if emits are nested inside the listener", function () {
      const e = new ESMitter<{
        foo: ESMitterEvent<[]>;
      }>();
      let calls = 0;

      e.once("foo", function () {
        calls++;
        e.emit("foo");
      });

      e.emit("foo");
      expect(e.listeners("foo").length).equals(0);
      expect(calls).equals(1);
    });

    it("only emits once for multiple events", function () {
      const e = new ESMitter<{
        foo: ESMitterEvent<[]>;
      }>();
      let multi = 0;
      let foo = 0;
      let bar = 0;

      e.once("foo", function foo1() {
        foo++;
      });

      e.once("foo", function foo2() {
        bar++;
      });

      e.on("foo", function foo3() {
        multi++;
      });

      e.emit("foo");
      e.emit("foo");
      e.emit("foo");
      e.emit("foo");
      e.emit("foo");

      expect(e.listeners("foo").length).equals(1); // only the non-once listener remains
      expect(multi).equals(5);
      expect(foo).equals(1);
      expect(bar).equals(1);
    });

    it("only emits once with context", function () {
      const context = { contextInformation: "123" };

      const e = new ESMitter<{
        foo: ESMitterEvent<[string], { contextInformation: string }>;
      }>();

      const spy = vi.fn().mockImplementation(function () {
        expect(this.contextInformation).equals("123");
      });

      e.once("foo", spy, context);
      e.emit("foo", "baz");

      expect(spy).toHaveBeenCalledOnce();
      expect(spy).toHaveBeenCalledWith("baz");
    });
  });
});

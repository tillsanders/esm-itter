import { describe, it, expect, vi } from "vitest";
import { ESMitter, ESMitterEvent } from "../src/ESMitter.js";

describe("ESMitter", function tests() {
  describe("emit", function () {
    it("should return false when there are not events to emit", function () {
      const e = new ESMitter();

      expect(e.emit("foo")).equals(false);
      expect(e.emit("bar")).equals(false);
    });

    it("emits with context", function () {
      const context = { bar: "baz" };
      const e = new ESMitter<{
        foo: ESMitterEvent<[string], { bar: string }>;
      }>();

      e.on(
        "foo",
        function (bar) {
          expect(bar).equals("bar");
          expect(this).equals(context);
        },
        context,
      ).emit("foo", "bar");
    });

    it("can emit the function with multiple arguments, multiple listeners", function () {
      const e = new ESMitter<{
        foo: ESMitterEvent<[string], undefined>;
      }>();

      e.on("foo", function (bar) {
        expect(bar).equals("bar");
      });

      e.on("foo", function (bar) {
        expect(bar).equals("bar");
      });

      e.on("foo", function (bar) {
        expect(bar).equals("bar");
      });

      expect(e.listenerCount("foo")).toBe(3);

      e.emit("foo", "bar");
    });

    it("can emit the function with multiple arguments, multiple listeners and context", function () {
      const e = new ESMitter<{
        foo: ESMitterEvent<[string], { bar: string }>;
      }>();

      e.on(
        "foo",
        function (bar) {
          expect(bar).equals("bar");
          expect(this.bar).equals("baz1");
        },
        { bar: "baz1" },
      );

      e.on(
        "foo",
        function (bar) {
          expect(bar).equals("bar");
          expect(this.bar).equals("baz2");
        },
        { bar: "baz2" },
      );

      e.on(
        "foo",
        function (bar) {
          expect(bar).equals("bar");
          expect(this.bar).equals("baz3");
        },
        { bar: "baz3" },
      );

      expect(e.listenerCount("foo")).toBe(3);

      e.emit("foo", "bar");
    });

    it("should return true when there are events to emit", function () {
      const e = new ESMitter<{
        foo: ESMitterEvent<[string]>;
      }>();

      expect(e.emit("foo", "bar")).toBe(false);
      e.on("foo", function () {});
      expect(e.emit("foo", "bar")).toBe(true);
    });

    it("receives the emitted event arguments", function () {
      const e = new ESMitter<{
        data: ESMitterEvent<
          [string, ESMitter<never>, Date, undefined],
          undefined
        >;
      }>();

      const spy = vi.fn();

      e.on("data", spy);
      e.emit("data", "foo", e, new Date(), undefined);

      expect(spy).toHaveBeenCalledWith("foo", e, expect.any(Date), undefined);
    });

    it("emits to all event listeners", function () {
      const e = new ESMitter<{
        foo: ESMitterEvent<[string]>;
      }>();
      const spy1 = vi.fn();
      const spy2 = vi.fn();

      e.on("foo", spy1);
      e.on("foo", spy2);

      e.emit("foo", "bar");

      expect(spy1).toHaveBeenCalledWith("bar");
      expect(spy2).toHaveBeenCalledWith("bar");
    });
  });
});

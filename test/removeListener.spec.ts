import { describe, it, expect } from "vitest";
import { ESMitter } from "../src/ESMitter.js";

describe("ESMitter", function tests() {
  describe("removeListener", function () {
    it("removes all listeners when the listener is not specified", function () {
      const e = new ESMitter();

      e.on("foo", function () {});
      e.on("foo", function () {});

      expect(e.removeListener("foo")).equals(e);
      expect(e.listeners("foo")).eql([]);
    });

    it("removes only the listeners matching the specified listener", function () {
      const e = new ESMitter();

      function foo() {}
      function bar() {}
      function baz() {}

      e.on("foo", foo);
      e.on("bar", bar);
      e.on("bar", baz);

      expect(e.removeListener("foo", bar)).equals(e);
      expect(e.listeners("bar")).eql([bar, baz]);
      expect(e.listeners("foo")).eql([foo]);

      expect(e.removeListener("foo", foo)).equals(e);
      expect(e.listeners("bar")).eql([bar, baz]);
      expect(e.listeners("foo")).eql([]);

      expect(e.removeListener("bar", bar)).equals(e);
      expect(e.listeners("bar")).eql([baz]);

      expect(e.removeListener("bar", baz)).equals(e);
      expect(e.listeners("bar")).eql([]);

      e.on("foo", foo);
      e.on("foo", foo);
      e.on("bar", bar);

      expect(e.removeListener("foo", foo)).equals(e);
      expect(e.listeners("bar")).eql([bar]);
      expect(e.listeners("foo")).eql([]);
    });

    it("removes only the once listeners when using the once flag", function () {
      const e = new ESMitter();

      function foo() {}

      e.on("foo", foo);

      expect(e.removeListener("foo", function () {}, undefined, true)).equals(
        e,
      );
      expect(e.listeners("foo")).eql([foo]);

      expect(e.removeListener("foo", foo, undefined, true)).equals(e);
      expect(e.listeners("foo")).eql([foo]);

      expect(e.removeListener("foo", foo)).equals(e);
      expect(e.listeners("foo")).eql([]);

      e.once("foo", foo);
      e.on("foo", foo);

      expect(e.removeListener("foo", function () {}, undefined, true)).equals(
        e,
      );
      expect(e.listeners("foo")).eql([foo, foo]);

      expect(e.removeListener("foo", foo, undefined, true)).equals(e);
      expect(e.listeners("foo")).eql([foo]);

      e.once("foo", foo);

      expect(e.removeListener("foo", foo)).equals(e);
      expect(e.listeners("foo")).eql([]);
    });

    it("removes only the listeners matching the correct context", function () {
      const context = { foo: "bar" },
        e = new ESMitter();

      function foo() {}
      function bar() {}

      e.on("foo", foo, context);

      expect(e.removeListener("foo", function () {}, context)).equals(e);
      expect(e.listeners("foo")).eql([foo]);

      expect(e.removeListener("foo", foo, { baz: "quux" })).equals(e);
      expect(e.listeners("foo")).eql([foo]);

      expect(e.removeListener("foo", foo, context)).equals(e);
      expect(e.listeners("foo")).eql([]);

      e.on("foo", foo, context);
      e.on("foo", bar);

      expect(e.removeListener("foo", foo, { baz: "quux" })).equals(e);
      expect(e.listeners("foo")).eql([foo, bar]);

      expect(e.removeListener("foo", foo, context)).equals(e);
      expect(e.listeners("foo")).eql([bar]);

      e.on("foo", bar, context);

      expect(e.removeListener("foo", bar)).equals(e);
      expect(e.listeners("foo")).eql([]);
    });
  });
});

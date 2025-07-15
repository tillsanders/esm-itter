import { describe, it, expect } from "vitest";
import { ESMitter } from "../src/ESMitter.js";

describe("ESMitter", function tests() {
  describe("removeAllListeners", function () {
    it("removes all events for the specified events", function () {
      const e = new ESMitter();

      e.on("foo", function () {
        throw new Error("oops");
      });
      e.on("foo", function () {
        throw new Error("oops");
      });
      e.on("bar", function () {
        throw new Error("oops");
      });
      e.on("aaa", function () {
        throw new Error("oops");
      });

      expect(e.removeAllListeners("foo")).equals(e);
      expect(e.listeners("foo").length).equals(0);
      expect(e.listeners("bar").length).equals(1);
      expect(e.listeners("aaa").length).equals(1);

      expect(e.removeAllListeners("bar")).equals(e);
      expect(e.removeAllListeners("aaa")).equals(e);

      expect(e.emit("foo")).equals(false);
      expect(e.emit("bar")).equals(false);
      expect(e.emit("aaa")).equals(false);
    });

    it("just nukes the fuck out of everything", function () {
      const e = new ESMitter();

      e.on("foo", function () {
        throw new Error("oops");
      });
      e.on("foo", function () {
        throw new Error("oops");
      });
      e.on("bar", function () {
        throw new Error("oops");
      });
      e.on("aaa", function () {
        throw new Error("oops");
      });

      expect(e.removeAllListeners()).equals(e);
      expect(e.listeners("foo").length).equals(0);
      expect(e.listeners("bar").length).equals(0);
      expect(e.listeners("aaa").length).equals(0);

      expect(e.emit("foo")).equals(false);
      expect(e.emit("bar")).equals(false);
      expect(e.emit("aaa")).equals(false);
    });

    describe("eventNames", function () {
      it("returns an empty array when there are no events", function () {
        const e = new ESMitter();

        expect(e.eventNames()).eql([]);

        e.on("foo", function () {});
        e.removeAllListeners("foo");

        expect(e.eventNames()).eql([]);
      });

      it("returns an array listing the events that have listeners", function () {
        const e = new ESMitter();

        function bar() {}
        function foo() {}

        e.on("foo", foo);
        e.on("bar", bar);

        const original = e.eventNames();
        expect(original).to.be.an("array");
        expect(original.length).to.equal(2);
        expect(original).to.include("foo");
        expect(original).to.include("bar");
        expect(original).to.not.include("baz");
      });
    });
  });
});

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

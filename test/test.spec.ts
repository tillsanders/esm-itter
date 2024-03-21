import { describe, it, expect } from "vitest";
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
        foo: ESMitterEvent<[string]>;
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

    //   it('receives the emitted events', function (done) {
    //     const e = new ESMitter();

    //     e.on('data', function (a, b, c, d, undef) {
    //       expect(a).equals('foo');
    //       expect(b).equals(e);
    //       expect(c).is.instanceOf(Date);
    //       expect(undef).equals(undefined);
    //       expect(arguments.length).equals(3);

    //       done();
    //     });

    //     e.emit('data', 'foo', e, new Date());
    //   });

    //   it('emits to all event listeners', function () {
    //     const e = new ESMitter()
    //       , pattern = [];

    //     e.on('foo', function () {
    //       pattern.push('foo1');
    //     });

    //     e.on('foo', function () {
    //       pattern.push('foo2');
    //     });

    //     e.emit('foo');

    //     expect(pattern.join(';')).equals('foo1;foo2');
    //   });

    //   (function each(keys) {
    //     const key = keys.shift();

    //     if (!key) return;

    //     it('can store event which is a known property: '+ key, function (next) {
    //       const e = new ESMitter();

    //       e.on(key, function (k) {
    //         expect(k).equals(key);
    //         next();
    //       }).emit(key, key);
    //     });

    //     each(keys);
    //   })([
    //     'hasOwnProperty',
    //     'constructor',
    //     '__proto__',
    //     'toString',
    //     'toValue',
    //     'unwatch',
    //     'watch'
    //   ]);
    // });

    // describe('listeners', function () {
    //   it('returns an empty array if no listeners are specified', function () {
    //     const e = new ESMitter();

    //     expect(e.listeners('foo')).is.a('array');
    //     expect(e.listeners('foo').length).equals(0);
    //   });

    //   it('returns an array of function', function () {
    //     const e = new ESMitter();

    //     function foo() {}

    //     e.on('foo', foo);
    //     expect(e.listeners('foo')).is.a('array');
    //     expect(e.listeners('foo').length).equals(1);
    //     expect(e.listeners('foo')).deep.equals([foo]);
    //   });

    //   it('is not vulnerable to modifications', function () {
    //     const e = new ESMitter();

    //     function foo() {}

    //     e.on('foo', foo);

    //     expect(e.listeners('foo')).deep.equals([foo]);

    //     e.listeners('foo').length = 0;
    //     expect(e.listeners('foo')).deep.equals([foo]);
    //   });
    // });

    // describe('listenerCount', function () {
    //   it('returns the number of listeners for a given event', function () {
    //     const e = new ESMitter();

    //     expect(e.listenerCount()).equals(0);
    //     expect(e.listenerCount('foo')).equals(0);

    //     e.on('foo', function () {});
    //     expect(e.listenerCount('foo')).equals(1);
    //     e.on('foo', function () {});
    //     expect(e.listenerCount('foo')).equals(2);
    //   });
    // });

    // describe('on', function () {
    //   it('throws an error if the listener is not a function', function () {
    //     const e = new ESMitter();

    //     try {
    //       e.on('foo', 'bar');
    //     } catch (ex) {
    //       expect(ex).is.instanceOf(TypeError);
    //       expect(ex.message).equals('The listener must be a function');
    //       return;
    //     }

    //     throw new Error('oops');
    //   });
    // });

    // describe('once', function () {
    //   it('only emits it once', function () {
    //     const e = new ESMitter()
    //       , calls = 0;

    //     e.once('foo', function () {
    //       calls++;
    //     });

    //     e.emit('foo');
    //     e.emit('foo');
    //     e.emit('foo');
    //     e.emit('foo');
    //     e.emit('foo');

    //     expect(e.listeners('foo').length).equals(0);
    //     expect(calls).equals(1);
    //   });

    //   it('only emits once if emits are nested inside the listener', function () {
    //     const e = new ESMitter()
    //       , calls = 0;

    //     e.once('foo', function () {
    //       calls++;
    //       e.emit('foo');
    //     });

    //     e.emit('foo');
    //     expect(e.listeners('foo').length).equals(0);
    //     expect(calls).equals(1);
    //   });

    //   it('only emits once for multiple events', function () {
    //     const e = new ESMitter()
    //       , multi = 0
    //       , foo = 0
    //       , bar = 0;

    //     e.once('foo', function () {
    //       foo++;
    //     });

    //     e.once('foo', function () {
    //       bar++;
    //     });

    //     e.on('foo', function () {
    //       multi++;
    //     });

    //     e.emit('foo');
    //     e.emit('foo');
    //     e.emit('foo');
    //     e.emit('foo');
    //     e.emit('foo');

    //     expect(e.listeners('foo').length).equals(1);
    //     expect(multi).equals(5);
    //     expect(foo).equals(1);
    //     expect(bar).equals(1);
    //   });

    //   it('only emits once with context', function (done) {
    //     const context = { foo: 'bar' }
    //       , e = new ESMitter();

    //     e.once('foo', function (bar) {
    //       expect(this).equals(context);
    //       expect(bar).equals('bar');

    //       done();
    //     }, context).emit('foo', 'bar');
    //   });
    // });

    // describe('removeListener', function () {
    //   it('removes all listeners when the listener is not specified', function () {
    //     const e = new ESMitter();

    //     e.on('foo', function () {});
    //     e.on('foo', function () {});

    //     expect(e.removeListener('foo')).equals(e);
    //     expect(e.listeners('foo')).eql([]);
    //   });

    //   it('removes only the listeners matching the specified listener', function () {
    //     const e = new ESMitter();

    //     function foo() {}
    //     function bar() {}
    //     function baz() {}

    //     e.on('foo', foo);
    //     e.on('bar', bar);
    //     e.on('bar', baz);

    //     expect(e.removeListener('foo', bar)).equals(e);
    //     expect(e.listeners('bar')).eql([bar, baz]);
    //     expect(e.listeners('foo')).eql([foo]);
    //     expect(e.eventsCount).equals(2);

    //     expect(e.removeListener('foo', foo)).equals(e);
    //     expect(e.listeners('bar')).eql([bar, baz]);
    //     expect(e.listeners('foo')).eql([]);
    //     expect(e.eventsCount).equals(1);

    //     expect(e.removeListener('bar', bar)).equals(e);
    //     expect(e.listeners('bar')).eql([baz]);
    //     expect(e.eventsCount).equals(1);

    //     expect(e.removeListener('bar', baz)).equals(e);
    //     expect(e.listeners('bar')).eql([]);
    //     expect(e.eventsCount).equals(0);

    //     e.on('foo', foo);
    //     e.on('foo', foo);
    //     e.on('bar', bar);

    //     expect(e.removeListener('foo', foo)).equals(e);
    //     expect(e.listeners('bar')).eql([bar]);
    //     expect(e.listeners('foo')).eql([]);
    //     expect(e.eventsCount).equals(1);
    //   });

    //   it('removes only the once listeners when using the once flag', function () {
    //     const e = new ESMitter();

    //     function foo() {}

    //     e.on('foo', foo);

    //     expect(e.removeListener('foo', function () {}, undefined, true)).equals(e);
    //     expect(e.listeners('foo')).eql([foo]);
    //     expect(e.eventsCount).equals(1);

    //     expect(e.removeListener('foo', foo, undefined, true)).equals(e);
    //     expect(e.listeners('foo')).eql([foo]);
    //     expect(e.eventsCount).equals(1);

    //     expect(e.removeListener('foo', foo)).equals(e);
    //     expect(e.listeners('foo')).eql([]);
    //     expect(e.eventsCount).equals(0);

    //     e.once('foo', foo);
    //     e.on('foo', foo);

    //     expect(e.removeListener('foo', function () {}, undefined, true)).equals(e);
    //     expect(e.listeners('foo')).eql([foo, foo]);
    //     expect(e.eventsCount).equals(1);

    //     expect(e.removeListener('foo', foo, undefined, true)).equals(e);
    //     expect(e.listeners('foo')).eql([foo]);
    //     expect(e.eventsCount).equals(1);

    //     e.once('foo', foo);

    //     expect(e.removeListener('foo', foo)).equals(e);
    //     expect(e.listeners('foo')).eql([]);
    //     expect(e.eventsCount).equals(0);
    //   });

    //   it('removes only the listeners matching the correct context', function () {
    //     const context = { foo: 'bar' }
    //       , e = new ESMitter();

    //     function foo() {}
    //     function bar() {}

    //     e.on('foo', foo, context);

    //     expect(e.removeListener('foo', function () {}, context)).equals(e);
    //     expect(e.listeners('foo')).eql([foo]);
    //     expect(e.eventsCount).equals(1);

    //     expect(e.removeListener('foo', foo, { baz: 'quux' })).equals(e);
    //     expect(e.listeners('foo')).eql([foo]);
    //     expect(e.eventsCount).equals(1);

    //     expect(e.removeListener('foo', foo, context)).equals(e);
    //     expect(e.listeners('foo')).eql([]);
    //     expect(e.eventsCount).equals(0);

    //     e.on('foo', foo, context);
    //     e.on('foo', bar);

    //     expect(e.removeListener('foo', foo, { baz: 'quux' })).equals(e);
    //     expect(e.listeners('foo')).eql([foo, bar]);
    //     expect(e.eventsCount).equals(1);

    //     expect(e.removeListener('foo', foo, context)).equals(e);
    //     expect(e.listeners('foo')).eql([bar]);
    //     expect(e.eventsCount).equals(1);

    //     e.on('foo', bar, context);

    //     expect(e.removeListener('foo', bar)).equals(e);
    //     expect(e.listeners('foo')).eql([]);
    //     expect(e.eventsCount).equals(0);
    //   });
    // });

    // describe('removeAllListeners', function () {
    //   it('removes all events for the specified events', function () {
    //     const e = new ESMitter();

    //     e.on('foo', function () { throw new Error('oops'); });
    //     e.on('foo', function () { throw new Error('oops'); });
    //     e.on('bar', function () { throw new Error('oops'); });
    //     e.on('aaa', function () { throw new Error('oops'); });

    //     expect(e.removeAllListeners('foo')).equals(e);
    //     expect(e.listeners('foo').length).equals(0);
    //     expect(e.listeners('bar').length).equals(1);
    //     expect(e.listeners('aaa').length).equals(1);
    //     expect(e.eventsCount).equals(2);

    //     expect(e.removeAllListeners('bar')).equals(e);
    //     expect(e.eventsCount).equals(1);
    //     expect(e.removeAllListeners('aaa')).equals(e);
    //     expect(e.eventsCount).equals(0);

    //     expect(e.emit('foo')).equals(false);
    //     expect(e.emit('bar')).equals(false);
    //     expect(e.emit('aaa')).equals(false);
    //   });

    //   it('just nukes the fuck out of everything', function () {
    //     const e = new ESMitter();

    //     e.on('foo', function () { throw new Error('oops'); });
    //     e.on('foo', function () { throw new Error('oops'); });
    //     e.on('bar', function () { throw new Error('oops'); });
    //     e.on('aaa', function () { throw new Error('oops'); });

    //     expect(e.removeAllListeners()).equals(e);
    //     expect(e.listeners('foo').length).equals(0);
    //     expect(e.listeners('bar').length).equals(0);
    //     expect(e.listeners('aaa').length).equals(0);
    //     expect(e.eventsCount).equals(0);

    //     expect(e.emit('foo')).equals(false);
    //     expect(e.emit('bar')).equals(false);
    //     expect(e.emit('aaa')).equals(false);
    //   });
    // });

    // describe('eventNames', function () {
    //   it('returns an empty array when there are no events', function () {
    //     const e = new ESMitter();

    //     expect(e.eventNames()).eql([]);

    //     e.on('foo', function () {});
    //     e.removeAllListeners('foo');

    //     expect(e.eventNames()).eql([]);
    //   });

    //   it('returns an array listing the events that have listeners', function () {
    //     const e = new ESMitter()
    //       , original;

    //     function bar() {}

    //     if (Object.getOwnPropertySymbols) {
    //       //
    //       // Monkey patch `Object.getOwnPropertySymbols()` to increase coverage
    //       // on Node.js > 0.10.
    //       //
    //       original = Object.getOwnPropertySymbols;
    //       Object.getOwnPropertySymbols = undefined;
    //     }

    //     e.on('foo', function () {});
    //     e.on('bar', bar);

    //     try {
    //       expect(e.eventNames()).eql(['foo', 'bar']);
    //       e.removeListener('bar', bar);
    //       expect(e.eventNames()).eql(['foo']);
    //     } catch (ex) {
    //       throw ex;
    //     } finally {
    //       if (original) Object.getOwnPropertySymbols = original;
    //     }
    //   });

    //   it('does not return inherited property identifiers', function () {
    //     const e = new ESMitter();

    //     function Collection() {}
    //     Collection.prototype.foo = function () {
    //       return 'foo';
    //     };

    //     e._events = new Collection();

    //     expect(e._events.foo()).equal('foo');
    //     expect(e.eventNames()).eql([]);
    //   });

    //   if ('undefined' !== typeof Symbol) it('includes ES6 symbols', function () {
    //     const e = new ESMitter()
    //       , s = Symbol('s');

    //     function foo() {}

    //     e.on('foo', foo);
    //     e.on(s, function () {});

    //     expect(e.eventNames()).eql(['foo', s]);

    //     e.removeListener('foo', foo);

    //     expect(e.eventNames()).eql([s]);
    //   });
  });
});

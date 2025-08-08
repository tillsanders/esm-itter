import { ESMitterListener } from "./ESMitterListener.ts";

/**
 * Represents the name of an event in ESMitter. This can be a string or a symbol.
 */
export type ESMitterEventName = string | symbol;

/**
 * Describes an event, its arguments, and context. To be used when extending the ESMitter class.
 */
export interface ESMitterEvent<
  EventArguments extends unknown[],
  EventContext = undefined,
> {
  arguments: EventArguments;
  fn: (this: EventContext, ...args: EventArguments) => void;
  context: EventContext;
}

/**
 * Defines a mapping of event names to their corresponding event handler signatures. Used for
 * type-safe event registration and emission in ESMitter.
 */
export interface ESMitterEvents {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: ESMitterEventName]: ESMitterEvent<any[], any>;
}

/**
 * Event emitter to be used as a base class for creating event-driven systems. It allows for
 * registering listeners for events, emitting events, and managing listeners. It is designed
 * to be type-safe with TypeScript, allowing for specific event types and their corresponding
 * arguments and contexts. The API is very similar to Node.js's EventEmitter.
 *
 * @example
 * ```typescript
 * import { ESMitter, type ESMitterEvent } from "esm-itter";
 *
 * class MyClass extends ESMitter<{
 *   success: ESMitterEvent<[{ foo: string; bar: string }]>;
 *   error: ESMitterEvent<[number, string]>;
 * }> {}
 *
 * const instance = new MyClass();
 *
 * // Attach event listener
 * instance.on("success", ({ foo, bar }) => {
 *   console.log(`Success with foo: ${foo}, bar: ${bar}`);
 * });
 * ```
 * @see ESMitterEventName for the type of event names.
 * @see ESMitterEvent for the event type definition.
 * @see ESMitterEvents for the event mapping interface.
 */
export class ESMitter<Events extends ESMitterEvents> {
  private events = {} as Record<keyof Events, ESMitterListener[]>;
  private eventsCount = 0;

  constructor() {}

  /**
   * Add a listener for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} context The context to invoke the listener with.
   * @param {Boolean} once Specify if the listener is a one-time listener.
   * @returns {EventEmitter}
   * @example
   * ```typescript
   * instance.addListener("foo", () => {
   *   console.log("Foo event triggered");
   * });
   * ```
   */
  public addListener<EventName extends keyof Events>(
    event: EventName,
    fn: Events[EventName]["fn"],
    context?: ESMitterEvents[EventName]["context"],
    once = false,
  ): ESMitter<Events> {
    const listener = new ESMitterListener(
      fn as () => unknown,
      context || this,
      once,
    );
    if (this.events[event] === undefined) {
      this.events[event] = [];
      this.eventsCount++;
    }
    this.events[event].push(listener);
    return this;
  }

  /**
   * Clear event by name.
   *
   * @param {(String|Symbol)} event The Event name.
   * @private
   */
  private clearEvent<EventName extends keyof Events>(event: EventName) {
    delete this.events[event];
  }

  /**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   *
   * @returns {Array}
   * @example
   * ```typescript
   * const eventNames = instance.eventNames();
   * console.log(eventNames); // ['foo', 'bar']
   * ```
   */
  public eventNames(): ESMitterEventName[] {
    const names: ESMitterEventName[] = [];
    if (this.eventsCount === 0) return names;
    return Object.keys(this.events);
  }

  /**
   * Return the listeners registered for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Array} The registered listeners.
   * @example
   * ```typescript
   * const listeners = instance.listeners("foo");
   * console.log(listeners); // [Function, Function]
   * ```
   */
  public listeners<EventName extends keyof Events>(
    event: EventName,
  ): Array<Events[EventName]["fn"]> {
    const handlers = this.events[event];

    if (handlers === undefined) return [];
    return handlers.map((handler) => handler.fn);
  }

  /**
   * Return the number of listeners listening to a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Number} The number of listeners.
   * @example
   * ```typescript
   * const count = instance.listenerCount("foo");
   * console.log(count); // 2
   * ```
   */
  public listenerCount<EventName extends keyof Events>(
    event: EventName,
  ): number {
    const listeners = this.events[event];

    if (listeners === undefined) return 0;
    return listeners.length;
  }

  /**
   * Calls each of the listeners registered for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Boolean} `true` if the event had listeners, else `false`.
   * @example
   * ```typescript
   * const emitted = instance.emit("foo", "arg1", "arg2");
   * console.log(emitted); // true
   * ```
   */
  public emit<EventName extends keyof Events>(
    event: EventName,
    ...args: Events[EventName]["arguments"]
  ): boolean {
    if (this.events[event] === undefined) return false;

    const listeners = [...this.events[event]];

    listeners.forEach((listener) => {
      if (listener.once) {
        this.removeListener(event, listener.fn, undefined, true);
      }
      listener.fn.apply(listener.context, args as []);
    });
    return true;
  }

  /**
   * Add a listener for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   * @example
   * ```typescript
   * instance.on("foo", () => {
   *   console.log("Foo event triggered");
   * });
   * ```
   */
  public on<EventName extends keyof Events>(
    event: EventName,
    fn: Events[EventName]["fn"],
    context?: Events[EventName]["context"],
  ): ESMitter<Events> {
    return this.addListener(event, fn, context, false);
  }

  /**
   * Add a one-time listener for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   * @example
   * ```typescript
   * instance.once("foo", () => {
   *   console.log("Foo event triggered");
   * });
   * ```
   */
  public once<EventName extends keyof Events>(
    event: EventName,
    fn: Events[EventName]["fn"],
    context?: Events[EventName]["context"],
  ): ESMitter<Events> {
    return this.addListener(event, fn, context, true);
  }

  /**
   * Remove the listeners of a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn Only remove the listeners that match this function.
   * @param {*} context Only remove the listeners that have this context.
   * @param {Boolean} once Only remove one-time listeners.
   * @returns {EventEmitter} `this`.
   * @example
   * ```typescript
   * instance.removeListener("foo", fn);
   * instance.removeListener("foo", fn, context);
   * instance.removeListener("foo", fn, context, true); // Remove one-time listeners
   * instance.removeListener("foo"); // Remove all listeners for "foo"
   * ```
   */
  public removeListener<EventName extends keyof Events>(
    event: EventName,
    fn?: Events[EventName]["fn"],
    context?: Events[EventName]["context"],
    once?: boolean,
  ): ESMitter<Events> {
    if (this.events[event] === undefined) return this;
    if (fn === undefined) {
      this.clearEvent(event);
      return this;
    }

    const listeners = [...this.events[event]];

    this.events[event] = listeners.filter((listener) => {
      return (
        (fn !== undefined && listener.fn !== fn) ||
        (once !== undefined && listener.once !== once) ||
        (context !== undefined && listener.context !== context)
      );
    });

    if (this.events[event].length === 0) {
      this.clearEvent(event);
    }

    return this;
  }

  /**
   * Remove the listeners of a given event. Alias of removeListener().
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn Only remove the listeners that match this function.
   * @param {*} context Only remove the listeners that have this context.
   * @param {Boolean} once Only remove one-time listeners.
   * @returns {EventEmitter} `this`.
   */
  public off = this.removeListener;

  /**
   * Remove all listeners, or those of the specified event.
   *
   * @param {(String|Symbol)} [event] The event name.
   * @returns {EventEmitter} `this`.
   * @example
   * ```typescript
   * instance.removeAllListeners(); // Removes all listeners for all events
   * instance.removeAllListeners("foo"); // Removes all listeners for the event "foo"
   * ```
   */
  public removeAllListeners<EventName extends keyof Events>(
    event?: EventName,
  ): ESMitter<Events> {
    if (event !== undefined) {
      this.clearEvent(event);
    } else {
      this.events = {} as Record<keyof Events, ESMitterListener[]>;
      this.eventsCount = 0;
    }

    return this;
  }
}

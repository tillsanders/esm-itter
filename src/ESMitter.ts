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
  // Events are stored as either a single ESMitterListener (common case) or an
  // array of ESMitterListener when there are multiple listeners for one event.
  // This avoids an array allocation for the frequent single-listener pattern.
  private events = {} as Record<
    keyof Events,
    ESMitterListener | ESMitterListener[]
  >;
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
    const existing = this.events[event];
    if (existing === undefined) {
      this.events[event] = listener;
      this.eventsCount++;
    } else if (existing instanceof ESMitterListener) {
      this.events[event] = [existing, listener];
    } else {
      existing.push(listener);
    }
    return this;
  }

  /**
   * Clear event by name.
   *
   * @param {(String|Symbol)} event The Event name.
   * @private
   */
  private clearEvent<EventName extends keyof Events>(event: EventName) {
    if (--this.eventsCount === 0) {
      this.events = {} as Record<
        keyof Events,
        ESMitterListener | ESMitterListener[]
      >;
    } else {
      delete this.events[event];
    }
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
    if (this.eventsCount === 0) return [];
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
    const stored = this.events[event];
    if (stored === undefined) return [];
    if (stored instanceof ESMitterListener) return [stored.fn];
    return stored.map((handler) => handler.fn);
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
    const stored = this.events[event];
    if (stored === undefined) return 0;
    if (stored instanceof ESMitterListener) return 1;
    return stored.length;
  }

  /**
   * Invoke a single listener with argument-count-specialized call().
   * @private
   */
  private callListener(listener: ESMitterListener, args: unknown[]): void {
    const fn = listener.fn as (...a: unknown[]) => unknown;
    switch (args.length) {
      case 0:
        fn.call(listener.context);
        break;
      case 1:
        fn.call(listener.context, args[0]);
        break;
      case 2:
        fn.call(listener.context, args[0], args[1]);
        break;
      case 3:
        fn.call(listener.context, args[0], args[1], args[2]);
        break;
      default:
        fn.apply(listener.context, args as []);
    }
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
    const stored = this.events[event];
    if (stored === undefined) return false;

    // Single-listener fast path — no arrays, no scanning, no filtering.
    if (stored instanceof ESMitterListener) {
      if (stored.once) this.clearEvent(event);
      this.callListener(stored, args);
      return true;
    }

    // Multi-listener path: grab a reference to the current array and snapshot
    // its length. This is safe to iterate even if listeners are added/removed
    // during emission: removeListener and once-cleanup replace
    // this.events[event], so our local reference remains stable.
    const listeners = stored as ESMitterListener[];
    const len = listeners.length;

    let onceCount = 0;
    for (let i = 0; i < len; i++) {
      if (listeners[i].once) onceCount++;
    }

    if (onceCount > 0) {
      // Remove once-listeners from the live storage BEFORE calling any
      // listener, so recursive emits don't re-trigger them.
      if (onceCount === len) {
        this.clearEvent(event);
      } else {
        const remaining = listeners.filter((l) => !l.once);
        this.events[event] = remaining.length === 1 ? remaining[0] : remaining;
      }
    }

    for (let i = 0; i < len; i++) {
      this.callListener(listeners[i], args);
    }

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
    const stored = this.events[event];
    if (stored === undefined) return this;
    if (fn === undefined) {
      this.clearEvent(event);
      return this;
    }

    // Single-listener fast path.
    if (stored instanceof ESMitterListener) {
      if (
        stored.fn === fn &&
        (once === undefined || stored.once === once) &&
        (context === undefined || stored.context === context)
      ) {
        this.clearEvent(event);
      }
      return this;
    }

    // Multi-listener path.
    const remaining = stored.filter((listener) => {
      if (listener.fn !== fn) return true;
      if (once !== undefined && listener.once !== once) return true;
      if (context !== undefined && listener.context !== context) return true;
      return false;
    });

    if (remaining.length === 0) {
      this.clearEvent(event);
    } else if (remaining.length === 1) {
      this.events[event] = remaining[0];
    } else {
      this.events[event] = remaining;
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
  public off<EventName extends keyof Events>(
    event: EventName,
    fn?: Events[EventName]["fn"],
    context?: Events[EventName]["context"],
    once?: boolean,
  ): ESMitter<Events> {
    return this.removeListener(event, fn, context, once);
  }

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
      this.events = {} as Record<
        keyof Events,
        ESMitterListener | ESMitterListener[]
      >;
      this.eventsCount = 0;
    }

    return this;
  }
}

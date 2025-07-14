import { ESMitterListener } from "./ESMitterListener.js";

export type ESMitterEventName = string | symbol;

export interface ESMitterEvent<
  EventArguments extends unknown[],
  EventContext = undefined,
> {
  arguments: EventArguments;
  fn: (this: EventContext, ...args: EventArguments) => void;
  context: EventContext;
}

export interface ESMitterEvents {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: ESMitterEventName]: ESMitterEvent<any[], any>;
}

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
   */
  public addListener<EventName extends keyof Events>(
    event: EventName,
    fn: Events[EventName]["fn"],
    context?: ESMitterEvents[EventName]["context"],
    once = false,
  ) {
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
   */
  private clearEvent<EventName extends keyof Events>(event: EventName) {
    delete this.events[event];
  }

  /**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   *
   * @returns {Array}
   */
  public eventNames() {
    const names: ESMitterEventName[] = [];
    if (this.eventsCount === 0) return names;
    return Object.keys(this.events);
  }

  /**
   * Return the listeners registered for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Array} The registered listeners.
   */
  public listeners<EventName extends keyof Events>(event: EventName) {
    const handlers = this.events[event];

    if (handlers === undefined) return [];
    return handlers.map((handler) => handler.fn);
  }

  /**
   * Return the number of listeners listening to a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Number} The number of listeners.
   */
  public listenerCount<EventName extends keyof Events>(event: EventName) {
    const listeners = this.events[event];

    if (listeners === undefined) return 0;
    return listeners.length;
  }

  /**
   * Calls each of the listeners registered for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @returns {Boolean} `true` if the event had listeners, else `false`.
   */
  public emit<EventName extends keyof Events>(
    event: EventName,
    ...args: Events[EventName]["arguments"]
  ) {
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
   */
  public on<EventName extends keyof Events>(
    event: EventName,
    fn: Events[EventName]["fn"],
    context?: Events[EventName]["context"],
  ) {
    return this.addListener(event, fn, context, false);
  }

  /**
   * Add a one-time listener for a given event.
   *
   * @param {(String|Symbol)} event The event name.
   * @param {Function} fn The listener function.
   * @param {*} [context=this] The context to invoke the listener with.
   * @returns {EventEmitter} `this`.
   */
  public once<EventName extends keyof Events>(
    event: EventName,
    fn: Events[EventName]["fn"],
    context?: Events[EventName]["context"],
  ) {
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
   */
  public removeListener<EventName extends keyof Events>(
    event: EventName,
    fn?: Events[EventName]["fn"],
    context?: Events[EventName]["context"],
    once?: boolean,
  ) {
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
   */
  public removeAllListeners<EventName extends keyof Events>(event?: EventName) {
    if (event !== undefined) {
      this.clearEvent(event);
    } else {
      this.events = {} as Record<keyof Events, ESMitterListener[]>;
      this.eventsCount = 0;
    }

    return this;
  }
}

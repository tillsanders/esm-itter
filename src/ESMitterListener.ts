/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 */
export class ESMitterListener {
  constructor(
    public fn: () => unknown,
    public context: unknown,
    public once = false,
  ) {}

  /**
   * Returns a JSON representation of the listener. Implemented to avoid circular
   * references (end errors) when stringifying a class using ESMitterListener. When a listener is
   * added with a context that references the emitter itself (fallback), a circular reference is
   * created that cannot be stringified otherwise.
   * @returns {object}
   */
  toJSON(): { once: boolean } {
    return {
      once: this.once,
    };
  }
}

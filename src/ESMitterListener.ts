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
    public once = false
  ) {}
}
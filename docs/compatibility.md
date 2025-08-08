# Compatibility

ESMitter is a fork of the popular [EventEmitter3](https://github.com/primus/eventemitter3), but
natively TypeScript, ESM-only and with more modern tooling. The complete codebase has been converted
to TypeScript and EcmaScript module syntax (ESM). ESMitter is currently less performant than
EventEmitter3, but still **fast with millions of operations per second**.

## Compatibility with Node.js' EventEmitter

The module is API compatible with the EventEmitter that ships by default with Node.js but there are
some slight differences:

- Domain support has been removed.
- We do not `throw` an error when you emit an `error` event and nobody is
  listening.
- The `newListener` and `removeListener` events have been removed as they
  are useful only in some uncommon use-cases.
- The `setMaxListeners`, `getMaxListeners`, `prependListener` and
  `prependOnceListener` methods are not available.
- Support for custom context for events so there is no need to use `fn.bind`.
- The `removeListener` method removes all matching listeners, not only the
  first.

## Compatibility with EventEmitter3

ESMitter is designed to be a drop-in replacement for EventEmitter3, maintaining compatibility with
its API. Unlike EventEmitter3, ESMitter is strongly typed, so while your function calls can remain
unchanged, you will need to provide type definitions for your events.

### Known incompatibilities with EventEmitter3

- The `listenerCount()` method requires an event name as the first argument and will thus not
  return the number of listeners for all events combined.

### Benchmarks

The EventEmitter3 library comes with benchmarks that compare its performance with some
available alternatives. The results can be found here:
<https://github.com/tillsanders/esm-itter/blob/main/benchmarks/README.md>

## Compatibility with Deno

ESMitter is fully compatible with Deno, as it is written in TypeScript and uses EcmaScript modules.
It is available via the [jsr.io](https://jsr.io/@tillsanders/esm-itter) registry, allowing you to
seamlessly import it in your Deno projects.

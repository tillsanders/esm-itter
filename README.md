# ESMitter

ESMitter _(read: E-S-Emitter; a pun on ESM + emitter)_ is an event emitter compatible with Node.js
and modern browsers. It is a fork of [EventEmitter3](https://github.com/primus/eventemitter3), but
natively TypeScript, ESM-only and with more modern tooling. The complete codebase has been converted
to TypeScript and EcmaScript module syntax (ESM). ESMitter is currently less performant than
EventEmitter3, but still **fast with millions of operations per second**.

[![Version npm](https://img.shields.io/npm/v/esm-itter.svg)](https://www.npmjs.com/package/esm-itter)[![CI](https://img.shields.io/github/actions/workflow/status/tillsanders/esm-itter/ci.yml?branch=main&label=CI)](https://github.com/tillsanders/esm-itter/actions?query=workflow%3ACI+branch%3Amain)[![Coverage Status](https://img.shields.io/coveralls/tillsanders/esm-itter/main.svg)](https://coveralls.io/r/tillsanders/esm-itter?branch=main)

## Installation

```bash
$ npm install --save esm-itter
```

## Usage

After installation the only thing you need to do is import the module and use it as a parent class.
One of the main features of ESMitter (beside being ESM-only) is that it is strongly typed, so
you will need to provide type definitions for your events. Here is a simple example:

```typescript{10-17}
import { ESMitter, type ESMitterEvent } from "esm-itter";

class MyClass extends ESMitter<{
  'success': ESMitterEvent<[{ foo: string, bar: string }]>;
  'error': ESMitterEvent<[number, string]>;
}> {}

const instance = new MyClass();

// Attach event listener
instance.on('success', ({ foo, bar }) => { /* [...] */ })
```

### Tests and benchmarks

This module is well tested. You can run:

- `npm test` to run the tests under Node.js.
- `npm run coverage` to run the tests and generate a coverage report.

We also have a set of benchmarks to compare EventEmitter3 with some available
alternatives. To run the benchmarks run `npm run benchmark`.

Tests and benchmarks are not included in the npm package. If you want to play
with them you have to clone the GitHub repository.
Note that you will have to run an additional `npm i` in the benchmarks folder
before `npm run benchmark`.

## Known incompatibilities with EventEmitter3

- The `listenerCount()` method requires an event name as the first argument and will thus not
  return the number of listeners for all events combined.

## Status

This library has been tested using unit tests and has achieved excellent code coverage. It is being
used in production and is considered stable. Contributions are welcome to improve any aspect of the
library, including performance, documentation, and features.

## License & Authors

This module is licensed under [MIT](LICENSE).

It is a fork of the wonderful [EventEmitter3](https://github.com/primus/eventemitter3) by Arnout
Kazemier and has been converted to TypeScript and ESM by Till Sanders. For ES3 and CommonJS support,
as well as superior performance, please use EventEmitter3.

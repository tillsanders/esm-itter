# ESMitter

ESMitter _(read: E-S-Emitter; a pun on ESM + emitter)_ is an event emitter compatible with Node.js
and modern browsers. It is a fork of [EventEmitter3](https://github.com/primus/eventemitter3), but
natively TypeScript, ESM-only and with more modern tooling. ESMitter is currently in alpha stage.
The complete codebase has been converted to TypeScript and EcmaScript module syntax (ESM). ESMitter
is currently less performant than EventEmitter3, but still fast.

[![Version npm](https://img.shields.io/npm/v/esm-itter.svg)](https://www.npmjs.com/package/esm-itter)[![CI](https://img.shields.io/github/actions/workflow/status/tillsanders/esm-itter/ci.yml?branch=main&label=CI)](https://github.com/tillsanders/esm-itter/actions?query=workflow%3ACI+branch%3Amain)[![Coverage Status](https://img.shields.io/coveralls/tillsanders/esm-itter/main.svg)](https://coveralls.io/r/tillsanders/esm-itter?branch=main)

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

It's a drop in replacement for existing EventEmitters, but ESM-only.

## Installation

```bash
$ npm install --save esm-itter
```

## Usage

After installation the only thing you need to do is import the module:

```js
import { ESMitter } from "esm-itter";
```

### Tests and benchmarks

This module is well tested. You can run:

- `npm test` to run the tests under Node.js.
- `npm run test-browser` to run the tests in real browsers via Sauce Labs.

We also have a set of benchmarks to compare EventEmitter3 with some available
alternatives. To run the benchmarks run `npm run benchmark`.

Tests and benchmarks are not included in the npm package. If you want to play
with them you have to clone the GitHub repository.
Note that you will have to run an additional `npm i` in the benchmarks folder
before `npm run benchmark`.

## License & Authors

This module is licensed under [MIT](LICENSE).

It is a fork of the wonderful [EventEmitter3](https://github.com/primus/eventemitter3) by Arnout
Kazemier and has been converted to TypeScript and ESM by Till Sanders. For ES3 and CommonJS support,
as well as superior performance, please use EventEmitter3.

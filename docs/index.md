---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "ESMitter"
  text: "Modern, ESM-only, natively TypeScript event emitter for the browser and Node.js"
  tagline: ESMitter is a fork of the popular EventEmitter3 with a focus on EcmaScript module syntax, TypeScript and modern tooling.
  actions:
    - theme: brand
      text: Get Started
      link: /installation
    - theme: alt
      text: API Reference
      link: /api

features:
  - title: ESM-only
    details: No CommonJS/UMD/AMD, just a pure EcmaScript module with modern ES6+ syntax.
  - title: Natively TypeScript
    details: Rewritten in TypeScript, ESMitter offers strongly typed event context and listeners.
  - title: Great Developer Experience
    details: The latest tooling, Unit Tests, Code Coverage, Benchmarks and decent documentation.
---

::: warning ALPHA STAGE
This project is currently under development. Initial tests suggests, that it is working properly and
because I want to maintain compatibility with EventEmitter3 and the Node EventEmitter API, **no**
breaking changes are to be expected. However, the unit tests and documentation are unfinished.

Furthermore,
[initial performance tests](https://github.com/tillsanders/esm-itter/tree/main/benchmarks) show that
this implementation does not match the speed delivered by EventEmitter3. While I don't expect to
surpass EventEmitter3 in performance, I'm hopeful that this can be improved.
:::

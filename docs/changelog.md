# Changelog

## 1.1.0

No breaking changes. This release includes the following improvements:

- Performance optimizations across the board, with significant improvements in certain scenarios.
  See the [Performance](./performance.md) page for details.
- Closing compatibility gap with EventEmitter3: `listenerCount()` now supports the `event` parameter
- Dependency updates and codebase improvements.

## 1.0.5

- Prevent circular reference when classes are stringified to JSON. When a listener is added with a
  context that references the emitter itself (fallback), a circular reference is created that cannot
  be stringified otherwise.

## 1.0.4

_No changes to the implementation. This release is CI-related only._

## 1.0.3

_No changes to the implementation. This release is CI-related only._

## 1.0.2

- Add support for Deno and publish to jsr.io.

## 1.0.1

- Improve documentation around development and contribution.
- Fix homepage link in `package.json`.

## 1.0.0

Initial, production-ready release.

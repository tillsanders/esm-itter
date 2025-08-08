# Installation

ESMitter can be installed using your package manager of choice and is also available on [jsr.io](https://jsr.io/@tillsanders/esm-itter).

::: code-group

```sh [npm]
npm install esm-itter
```

```sh [yarn]
yarn add esm-itter
```

```sh [pnpm]
pnpm add esm-itter
```

```sh [deno]
deno add jsr:@tillsanders/esm-itter
```

:::

## Compatibility

ESMitter requires Node > v18 or a browser with EcmaScript modules (ESM) support and also supports
Deno.

## Import

ESMitter uses named exports. You can import the base class like this:

::: code-group

```typescript [Node.js / Browser]
import { ESMitter } from "esm-itter";
```

```typescript [Deno]
import { ESMitter } from "@tillsanders/esm-itter";
```

:::

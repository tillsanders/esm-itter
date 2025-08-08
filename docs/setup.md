# Setup

ESMitter is designed to be used as a parent class, so all the relevant methods will be available as
part of your own class. If you're looking for an event system that is standalone and works without
classes, you might want to look at [Mitt](https://github.com/developit/mitt).

::: code-group

```typescript [Node.js / Browser]
import { ESMitter } from "esm-itter";

class MyClass extends ESMitter {}
```

```typescript [Deno]
import { ESMitter } from "@tillsanders/esm-itter";

class MyClass extends ESMitter {}
```

:::

Since ESMitter is embracing TypeScript, we need to provide a list of known events as a generic type
to the ESMitter class:

::: code-group

```typescript [Node.js / Browser]
import { ESMitter, type ESMitterEvent } from "esm-itter";

class MyClass extends ESMitter<{
  success: ESMitterEvent<[{ foo: string; bar: string }]>;
  error: ESMitterEvent<[number, string]>;
}> {}
```

```typescript [Deno]
import { ESMitter, type ESMitterEvent } from "@tillsanders/esm-itter";

class MyClass extends ESMitter<{
  success: ESMitterEvent<[{ foo: string; bar: string }]>;
  error: ESMitterEvent<[number, string]>;
}> {}
```

:::

In the example above, we have now added the ESMitter event system with all it's logic and methods to
our own class (`MyClass`). We have also provided a list of events that we can emit: one is named
`'success'` and it's payload will return an object. The other event is named `'error'` and it's
payload will contain a number as the first parameter and a string as the second.

# Context

The context of an event listener refers to the value of `this` when a listener function is invoked.
This allows you to control what `this` points to inside your event handler, which can be useful for
maintaining state or accessing properties from a specific object.

## How context works

When you add a listener (using `on`, `once`, or `addListener`), you can provide an optional
`context` argument as the third parameter, usually an object.

When the event is emitted, the listener function is called with `this` set to the provided context.
If no context is provided, the ESMitter instance itself is used as the default context.

## Example

```typescript
import { ESMitter, type ESMitterEvent } from "esm-itter";

class MyClass extends ESMitter<{
  success: ESMitterEvent<[{ foo: string; bar: string }]>;
  error: ESMitterEvent<[number, string]>;
}> {}

const instance = new MyClass();

const context = { value: 42 };

function handler() {
  console.log(this.value); // Will log 42
}

instance.on("success", handler, context);
instance.emit("success"); // Logs: 42
```

### API Reference

- [`addListener(event, fn, context?, once?)`](/api/addListener)
- [`on(event, fn, context?)`](/api/on)
- [`once(event, fn, context?)`](/api/once)
- [`removeListener(event, fn?, context?, once?)`](/api/removeListener)

All these methods accept a `context` parameter to control the value of `this` inside the listener
function.

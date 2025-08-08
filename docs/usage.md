# Usage

In the [Setup](/setup), we've added two events to our class (`MyClass`). We're now ready
to attach event listeners and emit events.

## Adding Listeners

Listeners can be attached using the `on()`, `once()` and `addListener()` methods:

```typescript{10-17}
class MyClass extends ESMitter<{
  'success': ESMitterEvent<[{ foo: string, bar: string }]>;
  'error': ESMitterEvent<[number, string]>;
}> {}

const instance = new MyClass();

// Attach event listener using on()
instance.on('success', ({ foo, bar }) => { /* [...] */ })

// Attach event listener using addListener()
instance.addListener('success', ({ foo, bar }) => { /* [...] */ })

// Attach event listener using once()
instance.once('success', ({ foo, bar }) => { /* [...] */ })
```

Note that `on()` is merely an alias for `addListener()` and `once()` will make sure a listener is
only called once and the discarded.

The parameters passed to the listener are typed according to the list of events we provided to the
ESMitter class.

## Removing Listeners

Listeners can be removed using the `off()`, `removeListener()` and `removeAllListeners()` methods:

```typescript
// Remove all listeners for the 'success' event using off()
instance.off("success");

// Remove all listeners for the 'success' event using removeListener()
instance.removeListener("success");

// Remove all listeners for the 'success' event using removeAllListeners()
instance.removeAllListeners("success");

// Remove all listeners for all events (like a reset) using removeAllListeners()
instance.removeAllListeners();

// Remove a specific listener using off() and referencing the listener itself
const listener = ({ foo, bar }) => {
  /* [...] */
};
instance.on("success", listener);
instance.off("success", listener);
```

Note that `off()` (like `on()`, respectively) is merely an alias for `removeListener()`.

# addListener()

Attaches a listener function to an event, allowing it to be called when the event is emitted.

## Example

```typescript
instance.addListener("foo", () => {
  /* [...] */
});
```

Also read about providing a [context](/context) to control the value of `this` inside the listener
function.

## Parameters

| Parameter | Type             | Default   | Description                                                                   |
| --------- | ---------------- | --------- | ----------------------------------------------------------------------------- |
| event     | string \| symbol |           | The event name. Expects an [ESMitterEventName](/api/types#esmittereventname). |
| fn        | unknown          |           | The function that will be called then the event is emitted.                   |
| context   | unknown          | undefined | The [context](/context) to invoke the listener with.                          |
| once      | boolean          | false     | Specify if the listener is a one-time listener.                               |

## Returns

| Type     | Description                                          |
| -------- | ---------------------------------------------------- |
| ESMitter | The ESMitter instance, allowing for method chaining. |

## on()

The [`on()`](/api/on) method is almost an alias of `addListener()`, the only exception being the
missing `once` parameter. For this, use [`once()`](/api/once) instead.

# on()

Attaches a listener function to an event, allowing it to be called when the event is emitted.
This method is almost an alias of [`addListener()`](/api/addListener), but does not support the
`once` parameter.

## Example

```typescript
instance.on("foo", () => {
  /* [...] */
});
```

## Parameters

| Parameter | Type             | Default   | Description                                                                   |
| --------- | ---------------- | --------- | ----------------------------------------------------------------------------- |
| event     | string \| symbol |           | The event name. Expects an [ESMitterEventName](/api/types#esmittereventname). |
| fn        | unknown          |           | The function that will be called when the event is emitted.                   |
| context   | unknown          | undefined | The [context](/context) to invoke the listener with.                          |

## Returns

| Type     | Description                                          |
| -------- | ---------------------------------------------------- |
| ESMitter | The ESMitter instance, allowing for method chaining. |

## once()

To attach a one-time listener, use [`once()`](/api/once) instead.

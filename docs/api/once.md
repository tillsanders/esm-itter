# once()

Attaches a one-time listener function to an event, allowing it to be called only the next time the
event is emitted. After being called, the listener is automatically removed.

## Example

```typescript
instance.once("foo", () => {
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

## Notes

- The listener will be removed after it is called once.
- For persistent listeners, use [`on()`](/api/on) or [`addListener()`](/api/addListener).

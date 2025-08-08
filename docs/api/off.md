# off()

Removes listeners for a given event. This method is an alias of [`removeListener()`](/api/removeListener).

## Example

```typescript
instance.off("foo", fn);
instance.off("foo", fn, context);
instance.off("foo", fn, context, true); // Remove one-time listeners
instance.off("foo"); // Remove all listeners for "foo"
```

## Parameters

| Parameter | Type             | Default | Description                                                                   |
| --------- | ---------------- | ------- | ----------------------------------------------------------------------------- |
| event     | string \| symbol |         | The event name. Expects an [ESMitterEventName](/api/types#esmittereventname). |
| fn        | unknown          |         | Only remove listeners that match this function.                               |
| context   | unknown          |         | Only remove listeners that have this context.                                 |
| once      | boolean          |         | Only remove one-time listeners.                                               |

## Returns

| Type     | Description                                          |
| -------- | ---------------------------------------------------- |
| ESMitter | The ESMitter instance, allowing for method chaining. |

## Notes

- If no function is provided, all listeners for the event are removed.
- This method is functionally identical to [`removeListener()`](/api/removeListener).

# removeListener()

Removes listeners for a given event. You can specify a function, context, and/or whether to remove only one-time listeners.

## Example

```typescript
instance.removeListener("foo", fn);
instance.removeListener("foo", fn, context);
instance.removeListener("foo", fn, context, true); // Remove one-time listeners
instance.removeListener("foo"); // Remove all listeners for "foo"
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
- This method is aliased by [`off()`](/api/off).

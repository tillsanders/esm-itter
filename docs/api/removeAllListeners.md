# removeAllListeners()

Removes all listeners, or all listeners for a specified event.

## Example

```typescript
instance.removeAllListeners(); // Removes all listeners for all events
instance.removeAllListeners("foo"); // Removes all listeners for the event "foo"
```

## Parameters

| Parameter | Type             | Default   | Description                                                           |
| --------- | ---------------- | --------- | --------------------------------------------------------------------- |
| event     | string \| symbol | undefined | The event name. If omitted, all listeners for all events are removed. |

## Returns

| Type     | Description                                          |
| -------- | ---------------------------------------------------- |
| ESMitter | The ESMitter instance, allowing for method chaining. |

## Notes

- If no event is specified, all listeners for all events are removed.

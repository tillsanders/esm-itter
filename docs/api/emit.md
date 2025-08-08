# emit()

Calls each of the listeners registered for a given event, passing any arguments to the listeners.

## Example

```typescript
instance.emit("foo", arg1, arg2);
```

## Parameters

| Parameter | Type             | Description                                                                   |
| --------- | ---------------- | ----------------------------------------------------------------------------- |
| event     | string \| symbol | The event name. Expects an [ESMitterEventName](/api/types#esmittereventname). |
| ...args   | unknown[]        | Arguments to pass to the listeners.                                           |

## Returns

| Type    | Description                                      |
| ------- | ------------------------------------------------ |
| boolean | `true` if the event had listeners, else `false`. |

## Notes

- If a listener is registered as a one-time listener (using [`once()`](/api/once)), it will be removed after being called.
- Listeners are called with the provided arguments and their specified context.

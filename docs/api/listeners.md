# listeners()

Returns an array of listener functions registered for a given event.

## Example

```typescript
const handlers = instance.listeners("foo");
// handlers: [fn1, fn2]
```

## Parameters

| Parameter | Type             | Description                                                                   |
| --------- | ---------------- | ----------------------------------------------------------------------------- |
| event     | string \| symbol | The event name. Expects an [ESMitterEventName](/api/types#esmittereventname). |

## Returns

| Type       | Description                                              |
| ---------- | -------------------------------------------------------- |
| Function[] | An array of listener functions registered for the event. |

## Notes

- If no listeners are registered for the event, an empty array is returned.

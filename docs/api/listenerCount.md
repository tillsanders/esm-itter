# listenerCount()

Returns the number of listeners registered for a given event.

## Example

```typescript
const count = instance.listenerCount("foo");
// count: 2
```

## Parameters

| Parameter | Type             | Description                                                                   |
| --------- | ---------------- | ----------------------------------------------------------------------------- |
| event     | string \| symbol | The event name. Expects an [ESMitterEventName](/api/types#esmittereventname). |

## Returns

| Type   | Description                                       |
| ------ | ------------------------------------------------- |
| number | The number of listeners registered for the event. |

## Notes

- If no listeners are registered for the event, `0` is returned.
